// ============================================================
// POST /api/match/[matchId]/evaluate — Trigger LLM evaluation
// ============================================================
// Called when all players have submitted (or time is up).
// Runs the Backboard evaluation pipeline and updates rankings.

import { NextRequest, NextResponse } from "next/server";
import { BackboardClient } from "backboard-sdk";
import { prisma } from "@/lib/db";
import { getUserFromRequest } from "@/lib/auth";

type PlayerAnswer = { question: string; answer: string };

type PlayerEntry = {
  name: string;
  answers: PlayerAnswer[];
};

type BBMessageResponse = {
  content: string;
  status: string;
  threadId: string;
};

const COMPARISON_THREAD_SYSTEM_PROMPT =
  "You are a deterministic grading engine. You receive a JSON object keyed by question index. For each question, rank players on TC then SC. Points: best=3, middle=2, worst=1. If all non-O(inf) values are equal, all receive 2. Any O(inf) gets 0 and is excluded. Return ONLY a JSON object mapping each player to an array of grades by question index. No prose, no markdown.";

const stripMarkdownFences = (text: string) =>
  text.replace(/^```(?:json)?\s*/i, "").replace(/\s*```\s*$/i, "").trim();

const createMatchAssistant = async (
  client: BackboardClient,
  matchId: string,
) => {
  const assistant = await client.createAssistant({
    name: `Match-${matchId}`,
    system_prompt: "Match coordinator assistant",
  });
  return assistant.assistantId;
};

const createPlayerThread = async (
  client: BackboardClient,
  assistantId: string,
  playerName: string,
) => {
  const thread = await client.createThread(assistantId);
  return { threadId: thread.threadId, playerName };
};

// Thread input format per user:
// { submissions: [ { Question1, Answer1 }, { Question2, Answer2 }, { Question3, Answer3 } ] }
const buildThreadPayload = (answers: PlayerAnswer[]) => ({
  submissions: answers.map((a, index) => ({
    [`Question${index + 1}`]: a.question,
    [`Answer${index + 1}`]: a.answer,
  })),
});

const getPlayersForMatch = (match: {
  players: Array<{
    user: { username: string; displayName: string | null };
  }>;
  submissions: Array<{
    userId: string;
    questionId: string;
    code: string;
    submittedAt: Date;
  }>;
}): PlayerEntry[] => {
  const playerNames = match.players
    .map((player) => player.user.displayName || player.user.username)
    .filter((name): name is string => Boolean(name))
    .sort((a, b) => a.localeCompare(b));

  const playerNameSet = new Set(playerNames);
  const orderedSubmissions = [...match.submissions].sort((a, b) => {
    const nameCompare = a.userId.localeCompare(b.userId);
    if (nameCompare !== 0) return nameCompare;
    return a.submittedAt.getTime() - b.submittedAt.getTime();
  });

  const playersMap = new Map<string, PlayerEntry>();
  for (const entry of orderedSubmissions) {
    if (!playerNameSet.has(entry.userId)) continue;
    if (!playersMap.has(entry.userId)) {
      playersMap.set(entry.userId, { name: entry.userId, answers: [] });
    }
    playersMap.get(entry.userId)?.answers.push({
      question: entry.questionId,
      answer: entry.code,
    });
  }

  return playerNames
    .map((name) => playersMap.get(name))
    .filter((player): player is PlayerEntry => Boolean(player));
};

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ matchId: string }> }
) {
  const payload = getUserFromRequest(req);
  if (!payload) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  if (!process.env.BACKBOARD_API_KEY) {
    return NextResponse.json(
      { error: "Backboard API key not configured" },
      { status: 500 }
    );
  }


  const { matchId } = await params;

  try {
    // Get match with all data needed for evaluation
    const match = await prisma.match.findUnique({
      where: { id: matchId },
      include: {
        players: { include: { user: true } },
        questions: { include: { question: true } },
        submissions: true,
      },
    });

    if (!match) {
      return NextResponse.json({ error: "Match not found" }, { status: 404 });
    }

    const allowedStatuses = new Set(["IN_PROGRESS", "COMPLETED", "EVALUATING"]);
    if (!allowedStatuses.has(match.status)) {
      return NextResponse.json(
        { error: `Match is ${match.status}, cannot evaluate` },
        { status: 400 }
      );
    }

    if (match.status === "IN_PROGRESS") {
      // Transition to EVALUATING
      await prisma.match.update({
        where: { id: matchId },
        data: { status: "EVALUATING" },
      });
    }

    // Prepare PLAYERS payload and dispatch to existing Backboard threads
    const players = getPlayersForMatch(match);
    if (players.length === 0) {
      return NextResponse.json(
        { error: "No submissions found for this match" },
        { status: 400 }
      );
    }

    const client = new BackboardClient({
      apiKey: process.env.BACKBOARD_API_KEY,
    });

    const assistantId = await createMatchAssistant(client, matchId);

    const playerResults: Record<
      string,
      Array<{ TC: string; SC: string; Context: number }>
    > = {};

    for (const player of players) {
      const { threadId } = await createPlayerThread(
        client,
        assistantId,
        player.name,
      );

      const response = (await client.addMessage(threadId, {
        content: JSON.stringify(buildThreadPayload(player.answers)),
        llm_provider: "openai",
        model_name: "gpt-4o",
        stream: false,
      })) as BBMessageResponse;

      // Thread response format: [{ TC, SC, Context }, { TC, SC, Context }, { TC, SC, Context }]
      const parsed = JSON.parse(stripMarkdownFences(response.content)) as Array<{
        TC: string;
        SC: string;
        Context: number;
      }>;

      playerResults[player.name] = parsed.map((entry) => {
        if (entry.Context === 0) {
          return { TC: "O(inf)", SC: "O(inf)", Context: 0 };
        }
        return { TC: entry.TC, SC: entry.SC, Context: entry.Context };
      });
    }

    const comparisonThreadId = match.threadRanking;
    if (!comparisonThreadId) {
      return NextResponse.json(
        { error: "Comparison thread not configured" },
        { status: 500 }
      );
    }

    const playerNames = Object.keys(playerResults);
    const questionCount = Math.max(
      ...playerNames.map((name) => playerResults[name].length),
      0,
    );

    const comparisonPayload: Record<
      string,
      Record<string, { TC: string; SC: string }>
    > = {};

    for (let i = 0; i < questionCount; i += 1) {
      const key = `Question${i}`;
      comparisonPayload[key] = {};
      for (const name of playerNames) {
        const entry = playerResults[name][i];
        const tc = entry?.Context === 0 ? "O(inf)" : entry?.TC ?? "O(inf)";
        const sc = entry?.Context === 0 ? "O(inf)" : entry?.SC ?? "O(inf)";
        comparisonPayload[key][name] = { TC: tc, SC: sc };
      }
    }

    const comparisonResponse = (await client.addMessage(
      comparisonThreadId,
      {
        content: `${COMPARISON_THREAD_SYSTEM_PROMPT}\n\nInput:\n${JSON.stringify(
          comparisonPayload,
        )}`,
        llm_provider: "openai",
        model_name: "gpt-4o",
        stream: false,
      },
    )) as BBMessageResponse;

    let perQuestionGrades: Record<string, number[]>;
    try {
      perQuestionGrades = JSON.parse(
        stripMarkdownFences(comparisonResponse.content),
      ) as Record<string, number[]>;
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

    return NextResponse.json({
      perQuestionGrades,
      totals,
    });
  } catch (error) {
    console.error("Evaluate error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
