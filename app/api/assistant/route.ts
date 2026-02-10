import { NextRequest, NextResponse } from 'next/server';
import { BackboardClient } from 'backboard-sdk';

const bb = new BackboardClient({
  apiKey: process.env.BACKBOARD_API_KEY!,
});

// Type for non-streamed message responses
type BBMessageResponse = {
  content: string;
  status: string;
  toolCalls: Array<{ id: string; function: { name: string; parsed_arguments: any } }> | null;
  runId?: string;
  threadId: string;
  memoryOperationId?: string;
};

// Mock/Placeholder for database operations
const mockMatchData = {
  getMatch: (matchId: string) => ({
    id: matchId,
    threadId: null as string | null // Replace with real DB lookup
  }),
  updateMatchThread: (matchId: string, threadId: string) => {
    console.log(`Mock DB: Saved thread ${threadId} for match ${matchId}`);
  }
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { matchId, code, language, userId } = body;

    if (!matchId || !code || !language || !userId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // 1. Get or Create Assistant (Logic simplified)
    // In production, store ASSISTANT_ID in an env var to avoid re-creating
    const assistant = await bb.createAssistant({
      name: "Compile-n-Conquer GM",
      system_prompt: "You are a competitive coding Game Master. Analyze complexity and efficiency.",
      tools: [{
        type: "function",
        function: {
          name: "analyze_code_complexity",
          description: "Analyze Big O complexity",
          parameters: {
            type: "object",
            properties: {
              complexity: { type: "string" },
              score: { type: "number" }
            }
          }
        }
      }]
    });

    // 2. Thread Management
    const match = mockMatchData.getMatch(matchId);
    let threadId: string = match.threadId ?? '';

    if (!threadId) {
      const thread = await bb.createThread(assistant.assistantId);
      threadId = thread.threadId;
      mockMatchData.updateMatchThread(matchId, threadId);
    }

    // 3. Send Message & Handle Interaction
    let response = await bb.addMessage(threadId, {
      content: `User ${userId} submitted ${language} code:\n\`\`\`\n${code}\n\`\`\``,
      llm_provider: "openai",
      model_name: "gpt-4o",
      stream: false
    }) as BBMessageResponse;

    // 4. Handle Tool Calls (If LLM triggers the analyzer)
    if (response.status === "REQUIRES_ACTION" && response.toolCalls) {
      const toolOutputs = response.toolCalls.map((tc) => ({
        tool_call_id: tc.id,
        output: JSON.stringify({ complexity: "O(n)", score: 85 }) // Mock analysis logic
      }));

      const toolResponse = await bb.submitToolOutputs(
        threadId,
        response.runId!,
        toolOutputs,
        false
      ) as BBMessageResponse;
      response = toolResponse;
    }

    return NextResponse.json({
      success: true,
      evaluation: response.content,
      threadId
    });

  } catch (error: any) {
    console.error('API Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}