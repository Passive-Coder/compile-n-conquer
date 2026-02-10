import { NextRequest, NextResponse } from "next/server";
import { BackboardClient } from "backboard-sdk";

type Entry = { TC: string; SC: string; Context: number };

type Aggregated = Record<string, Entry[]>;

type ComparisonPayload = Record<
  string,
  Record<string, { TC: string; SC: string }>
>;

type BBMessageResponse = { content: string; status: string; threadId: string };

const ANALYSIS_THREAD_SYSTEM_PROMPT =
  "Return ONLY the JSON array provided in Input. No prose, no markdown.";

const COMPARISON_THREAD_SYSTEM_PROMPT =
  "You are a deterministic grading engine. You receive a JSON object keyed by question index. For each question, rank players on TC then SC. Points: best=3, middle=2, worst=1. If all non-O(inf) values are equal, all receive 2. Any O(inf) gets 0 and is excluded. Return ONLY a JSON object mapping each player to an array of grades by question index. No prose, no markdown.";

const stripMarkdownFences = (text: string) =>
  text.replace(/^```(?:json)?\s*/i, "").replace(/\s*```\s*$/i, "").trim();

const createTestAssistant = async (client: BackboardClient) => {
  const assistant = await client.createAssistant({
    name: `Backboard-Test-${Date.now()}`,
    system_prompt: "Backboard evaluation test assistant",
  });
  return assistant.assistantId;
};

const buildComparisonPayload = (input: Aggregated): ComparisonPayload => {
  const players = Object.keys(input);
  const questionCount = Math.max(...players.map((p) => input[p].length), 0);
  const payload: ComparisonPayload = {};

  for (let i = 0; i < questionCount; i += 1) {
    const key = `Question${i}`;
    payload[key] = {};
    for (const player of players) {
      const entry = input[player][i] ?? {
        TC: "O(inf)",
        SC: "O(inf)",
        Context: 0,
      };
      const tc = entry.Context === 0 ? "O(inf)" : entry.TC;
      const sc = entry.Context === 0 ? "O(inf)" : entry.SC;
      payload[key][player] = { TC: tc, SC: sc };
    }
  }

  return payload;
};

export async function POST(req: NextRequest) {
  if (!process.env.BACKBOARD_API_KEY) {
    return NextResponse.json(
      { error: "Backboard API key not configured" },
      { status: 500 }
    );
  }

  const body = await req.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { aggregated } = body as {
    aggregated?: Aggregated;
  };

  if (!aggregated || typeof aggregated !== "object") {
    return NextResponse.json(
      { error: "aggregated is required" },
      { status: 400 }
    );
  }

  const client = new BackboardClient({
    apiKey: process.env.BACKBOARD_API_KEY,
  });

  const assistantId = await createTestAssistant(client);
  const players = Object.keys(aggregated);

  const playerThreadIds: Record<string, string> = {};
  for (const player of players) {
    const thread = await client.createThread(assistantId);
    playerThreadIds[player] = thread.threadId;
  }

  const comparisonThread = await client.createThread(assistantId);
  const comparisonThreadId = comparisonThread.threadId;

  const playerResults: Aggregated = {};
  for (const player of players) {
    const entries = aggregated[player];
    const response = (await client.addMessage(playerThreadIds[player], {
      content: `${ANALYSIS_THREAD_SYSTEM_PROMPT}\n\nInput:\n${JSON.stringify(
        entries,
      )}`,
      llm_provider: "openai",
      model_name: "gpt-4o",
      stream: false,
    })) as BBMessageResponse;

    try {
      playerResults[player] = JSON.parse(
        stripMarkdownFences(response.content),
      ) as Entry[];
    } catch {
      return NextResponse.json(
        { error: `Invalid analysis response for ${player}` },
        { status: 500 }
      );
    }
  }

  const payload = buildComparisonPayload(playerResults);

  const response = (await client.addMessage(comparisonThreadId, {
    content: `${COMPARISON_THREAD_SYSTEM_PROMPT}\n\nInput:\n${JSON.stringify(
      payload,
    )}`,
    llm_provider: "openai",
    model_name: "gpt-4o",
    stream: false,
  })) as BBMessageResponse;

  let perQuestionGrades: Record<string, number[]>;
  try {
    perQuestionGrades = JSON.parse(stripMarkdownFences(response.content)) as Record<
      string,
      number[]
    >;
  } catch {
    return NextResponse.json(
      { error: "Invalid comparison response" },
      { status: 500 }
    );
  }

  const totals: Record<string, number> = {};
  for (const [name, grades] of Object.entries(perQuestionGrades)) {
    totals[name] = grades.reduce((sum, value) => sum + value, 0);
  }

  return NextResponse.json({ perQuestionGrades, totals });
}
