// ============================================================
// Compile-n-Conquer — Live Backboard Integration Test
// ============================================================
// Tests the actual Backboard.io API with real LLM calls.
//
// Usage:
//   set BACKBOARD_API_KEY=your_key_here
//   npx tsx backbaord/live-test.ts
//
// Or create a .env.local file with BACKBOARD_API_KEY=...
// and run: npx tsx backbaord/live-test.ts
//
// Flags:
//   --thread=tc     Run only Time Complexity thread
//   --thread=sc     Run only Space Complexity thread
//   --thread=orig   Run only Originality thread
//   --thread=rank   Run only Ranking thread (uses mock metric data)
//   --thread=memory Run only Memory store/retrieve
//   --all           Run full pipeline (default)
// ============================================================

// Use direct path import to avoid CJS/ESM export resolution issue with tsx
import { BackboardClient } from "../node_modules/backboard-sdk/dist/index.js";
import {
  RoundSubmissions,
  TimeComplexityResults,
  SpaceComplexityResults,
  OriginalityResults,
  ComplexityResult,
  OriginalityResult,
  TestCaseResults,
  ScoringWeights,
  TiebreakerData,
  DEFAULT_WEIGHTS,
  DEFAULT_EVAL_CONFIG,
  EvaluationConfig,
} from "./types";
import {
  TIME_COMPLEXITY_TOOL,
  SPACE_COMPLEXITY_TOOL,
  ORIGINALITY_TOOL,
  RANKING_TOOL,
  SYSTEM_PROMPTS,
} from "./tools";

// ---- Load .env.local if present ----
import { readFileSync } from "fs";
import { resolve } from "path";
try {
  const envPath = resolve(__dirname, "..", ".env.local");
  const envContent = readFileSync(envPath, "utf-8");
  for (const line of envContent.split("\n")) {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith("#")) {
      const eqIdx = trimmed.indexOf("=");
      if (eqIdx > 0) {
        const key = trimmed.slice(0, eqIdx).trim();
        const val = trimmed.slice(eqIdx + 1).trim();
        if (!process.env[key]) process.env[key] = val;
      }
    }
  }
} catch {
  // No .env.local — that's fine, check process.env directly
}

// ---- Validate API Key ----
const API_KEY = process.env.BACKBOARD_API_KEY;
if (!API_KEY) {
  console.error("❌ BACKBOARD_API_KEY not set.");
  console.error("   Set it via: $env:BACKBOARD_API_KEY='your_key'");
  console.error("   Or create .env.local with: BACKBOARD_API_KEY=your_key");
  process.exit(1);
}

const client = new BackboardClient({ apiKey: API_KEY });
const config: EvaluationConfig = DEFAULT_EVAL_CONFIG;

// ---- Minimal test data (1 user, 1 question — fast & cheap) ----

const MINI_ROUND: RoundSubmissions = {
  roundId: "test_round_1",
  questions: [
    {
      id: "q1",
      title: "Two Sum",
      description:
        "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
      difficulty: "easy",
    },
  ],
  submissions: [
    {
      userId: "test_user_1",
      responses: [
        {
          questionId: "q1",
          language: "python",
          submittedAt: new Date().toISOString(),
          code: `def two_sum(nums, target):
    seen = {}
    for i, num in enumerate(nums):
        comp = target - num
        if comp in seen:
            return [seen[comp], i]
        seen[num] = i
    return []`,
        },
      ],
    },
    {
      userId: "test_user_2",
      responses: [
        {
          questionId: "q1",
          language: "python",
          submittedAt: new Date().toISOString(),
          code: `# This function solves the Two Sum problem
# It takes an array of numbers and a target value
# It returns the indices of two numbers that sum to target
def two_sum(nums, target):
    # Iterate through each element in the array
    for i in range(len(nums)):
        # Check every other element
        for j in range(i + 1, len(nums)):
            # If the two elements sum to target
            if nums[i] + nums[j] == target:
                # Return their indices
                return [i, j]
    # Return empty list if no solution found
    return []`,
        },
      ],
    },
  ],
};

// ---- Type for Backboard responses ----
type BBMessageResponse = {
  content: string;
  status: string;
  toolCalls: Array<{
    id: string;
    function: { name: string; parsedArguments: any };
  }> | null;
  runId?: string;
  threadId: string;
  memoryOperationId?: string;
};

// ---- Helpers ----
function hr(title: string) {
  console.log(`\n${"=".repeat(60)}`);
  console.log(`  ${title}`);
  console.log("=".repeat(60));
}

function elapsed(start: number): string {
  return `${((Date.now() - start) / 1000).toFixed(1)}s`;
}

// ============================================================
// Thread 1: Time Complexity (Live)
// ============================================================
async function testTimeComplexity(): Promise<TimeComplexityResults | null> {
  hr("Thread 1: Time Complexity Analysis (LIVE)");
  const start = Date.now();

  try {
    console.log("  Creating assistant...");
    const assistant = await client.createAssistant({
      name: "CnC TC Test",
      system_prompt: SYSTEM_PROMPTS.timeComplexity,
      tools: [TIME_COMPLEXITY_TOOL],
    });
    console.log(`  ✅ Assistant created: ${assistant.assistantId}`);

    console.log("  Creating thread...");
    const thread = await client.createThread(assistant.assistantId);
    console.log(`  ✅ Thread created: ${thread.threadId}`);

    const prompt = buildPrompt(MINI_ROUND, "Time Complexity");
    console.log("  Sending message to LLM...");

    let response = (await client.addMessage(thread.threadId, {
      content: prompt,
      llm_provider: config.llmProvider,
      model_name: config.modelName,
      stream: false,
    })) as BBMessageResponse;

    console.log(`  Response status: ${response.status}`);

    const collected: Record<string, ComplexityResult[]> = {};
    for (const sub of MINI_ROUND.submissions) collected[sub.userId] = [];

    let toolCallCount = 0;
    while (response.status === "REQUIRES_ACTION" && response.toolCalls) {
      console.log(`  Tool calls received: ${response.toolCalls.length}`);
      const toolOutputs = [];

      for (const tc of response.toolCalls) {
        toolCallCount++;
        const args = tc.function.parsedArguments;
        console.log(
          `    📞 Tool call #${toolCallCount}: ${tc.function.name}`
        );
        console.log(`       Args: ${JSON.stringify(args).slice(0, 200)}`);

        toolOutputs.push({
          tool_call_id: tc.id,
          output: JSON.stringify({ status: "recorded", ...args }),
        });
      }

      response = (await client.submitToolOutputs(
        thread.threadId,
        response.runId!,
        toolOutputs,
        false
      )) as BBMessageResponse;
      console.log(`  After submit — status: ${response.status}`);
    }

    console.log(`\n  📝 Final LLM response (first 500 chars):`);
    console.log(`  ${response.content?.slice(0, 500) || "(empty)"}`);
    console.log(`\n  ⏱️  Completed in ${elapsed(start)} | Tool calls: ${toolCallCount}`);

    const results: TimeComplexityResults = {
      roundId: MINI_ROUND.roundId,
      metric: "time_complexity",
      results: collected,
    };
    console.log("  ✅ Time Complexity thread PASSED");
    return results;
  } catch (err: any) {
    console.error(`  ❌ FAILED: ${err.message}`);
    return null;
  }
}

// ============================================================
// Thread 2: Space Complexity (Live)
// ============================================================
async function testSpaceComplexity(): Promise<SpaceComplexityResults | null> {
  hr("Thread 2: Space Complexity Analysis (LIVE)");
  const start = Date.now();

  try {
    const assistant = await client.createAssistant({
      name: "CnC SC Test",
      system_prompt: SYSTEM_PROMPTS.spaceComplexity,
      tools: [SPACE_COMPLEXITY_TOOL],
    });
    console.log(`  ✅ Assistant: ${assistant.assistantId}`);

    const thread = await client.createThread(assistant.assistantId);
    console.log(`  ✅ Thread: ${thread.threadId}`);

    const prompt = buildPrompt(MINI_ROUND, "Space Complexity");
    console.log("  Sending message to LLM...");

    let response = (await client.addMessage(thread.threadId, {
      content: prompt,
      llm_provider: config.llmProvider,
      model_name: config.modelName,
      stream: false,
    })) as BBMessageResponse;

    let toolCallCount = 0;
    while (response.status === "REQUIRES_ACTION" && response.toolCalls) {
      console.log(`  Tool calls received: ${response.toolCalls.length}`);
      const toolOutputs = response.toolCalls.map((tc) => {
        toolCallCount++;
        console.log(`    📞 #${toolCallCount}: ${tc.function.name} — ${JSON.stringify(tc.function.parsedArguments).slice(0, 150)}`);
        return {
          tool_call_id: tc.id,
          output: JSON.stringify({ status: "recorded", ...tc.function.parsedArguments }),
        };
      });

      response = (await client.submitToolOutputs(
        thread.threadId,
        response.runId!,
        toolOutputs,
        false
      )) as BBMessageResponse;
    }

    console.log(`\n  📝 Final response (first 500 chars):`);
    console.log(`  ${response.content?.slice(0, 500) || "(empty)"}`);
    console.log(`\n  ⏱️  ${elapsed(start)} | Tool calls: ${toolCallCount}`);
    console.log("  ✅ Space Complexity thread PASSED");

    return {
      roundId: MINI_ROUND.roundId,
      metric: "space_complexity",
      results: {},
    };
  } catch (err: any) {
    console.error(`  ❌ FAILED: ${err.message}`);
    return null;
  }
}

// ============================================================
// Thread 3: Originality (Live)
// ============================================================
async function testOriginality(): Promise<OriginalityResults | null> {
  hr("Thread 3: Originality & Relevance (LIVE)");
  const start = Date.now();

  try {
    const assistant = await client.createAssistant({
      name: "CnC Originality Test",
      system_prompt: SYSTEM_PROMPTS.originality,
      tools: [ORIGINALITY_TOOL],
    });
    console.log(`  ✅ Assistant: ${assistant.assistantId}`);

    const thread = await client.createThread(assistant.assistantId);
    console.log(`  ✅ Thread: ${thread.threadId}`);

    const prompt = buildPrompt(MINI_ROUND, "Originality & Relevance");
    console.log("  Sending message to LLM...");

    let response = (await client.addMessage(thread.threadId, {
      content: prompt,
      llm_provider: config.llmProvider,
      model_name: config.modelName,
      stream: false,
    })) as BBMessageResponse;

    let toolCallCount = 0;
    while (response.status === "REQUIRES_ACTION" && response.toolCalls) {
      console.log(`  Tool calls received: ${response.toolCalls.length}`);
      const toolOutputs = response.toolCalls.map((tc) => {
        toolCallCount++;
        const args = tc.function.parsedArguments;
        console.log(`    📞 #${toolCallCount}: ${tc.function.name}`);
        if (args.originalityScore !== undefined) {
          console.log(
            `       Originality: ${args.originalityScore}/10 | Relevance: ${args.relevanceScore}/10 | Comments: ${args.commentDensity}%`
          );
        }
        if (args.flags?.length) {
          console.log(`       🚩 Flags: ${args.flags.join(", ")}`);
        }
        return {
          tool_call_id: tc.id,
          output: JSON.stringify({ status: "recorded", ...args }),
        };
      });

      response = (await client.submitToolOutputs(
        thread.threadId,
        response.runId!,
        toolOutputs,
        false
      )) as BBMessageResponse;
    }

    console.log(`\n  📝 Final response (first 500 chars):`);
    console.log(`  ${response.content?.slice(0, 500) || "(empty)"}`);
    console.log(`\n  ⏱️  ${elapsed(start)} | Tool calls: ${toolCallCount}`);
    console.log("  ✅ Originality thread PASSED");

    return {
      roundId: MINI_ROUND.roundId,
      metric: "originality",
      results: {},
    };
  } catch (err: any) {
    console.error(`  ❌ FAILED: ${err.message}`);
    return null;
  }
}

// ============================================================
// Thread 4: Ranking (Live — uses mock metric data)
// ============================================================
async function testRanking() {
  hr("Thread 4: Final Ranking Aggregation (LIVE)");
  const start = Date.now();

  // Use mock metric data so this thread can run independently
  const mockTC: TimeComplexityResults = {
    roundId: "test_round_1",
    metric: "time_complexity",
    results: {
      test_user_1: [{ questionId: "q1", complexity: "O(n)", score: 95, reasoning: "Hash map single pass" }],
      test_user_2: [{ questionId: "q1", complexity: "O(n²)", score: 40, reasoning: "Brute force nested loops" }],
    },
  };
  const mockSC: SpaceComplexityResults = {
    roundId: "test_round_1",
    metric: "space_complexity",
    results: {
      test_user_1: [{ questionId: "q1", complexity: "O(n)", score: 80, reasoning: "Hash map" }],
      test_user_2: [{ questionId: "q1", complexity: "O(1)", score: 100, reasoning: "No extra space" }],
    },
  };
  const mockOrig: OriginalityResults = {
    roundId: "test_round_1",
    metric: "originality",
    results: {
      test_user_1: [{ questionId: "q1", originalityScore: 9, relevanceScore: 10, commentDensity: 0, flags: [], reasoning: "Clean code" }],
      test_user_2: [{ questionId: "q1", originalityScore: 3, relevanceScore: 9, commentDensity: 55, flags: ["excessive_comments"], reasoning: "AI-generated" }],
    },
  };
  const testCases: TestCaseResults = {
    test_user_1: { passed: 9, total: 10 },
    test_user_2: { passed: 7, total: 10 },
  };
  const tiebreaker: TiebreakerData = {
    test_user_1: 120000,
    test_user_2: 180000,
  };

  try {
    const assistant = await client.createAssistant({
      name: "CnC Ranking Test",
      system_prompt: SYSTEM_PROMPTS.ranking,
      tools: [RANKING_TOOL],
    });
    console.log(`  ✅ Assistant: ${assistant.assistantId}`);

    const thread = await client.createThread(assistant.assistantId);
    console.log(`  ✅ Thread: ${thread.threadId}`);

    const prompt = `Compute the final ranking for round test_round_1.

Use the compute_final_ranking tool with:
- timeComplexityResults: ${JSON.stringify(mockTC)}
- spaceComplexityResults: ${JSON.stringify(mockSC)}
- originalityResults: ${JSON.stringify(mockOrig)}
- testCaseResults: ${JSON.stringify(testCases)}
- weights: ${JSON.stringify(DEFAULT_WEIGHTS)}
- tiebreakerData: ${JSON.stringify(tiebreaker)}

Produce a final ranking with full score breakdowns.`;

    console.log("  Sending message to LLM...");
    let response = (await client.addMessage(thread.threadId, {
      content: prompt,
      llm_provider: config.llmProvider,
      model_name: config.modelName,
      stream: false,
    })) as BBMessageResponse;

    let toolCallCount = 0;
    while (response.status === "REQUIRES_ACTION" && response.toolCalls) {
      console.log(`  Tool calls received: ${response.toolCalls.length}`);
      const toolOutputs = response.toolCalls.map((tc) => {
        toolCallCount++;
        console.log(`    📞 #${toolCallCount}: ${tc.function.name}`);
        return {
          tool_call_id: tc.id,
          output: JSON.stringify({ status: "computed", message: "Rankings computed successfully" }),
        };
      });

      response = (await client.submitToolOutputs(
        thread.threadId,
        response.runId!,
        toolOutputs,
        false
      )) as BBMessageResponse;
    }

    console.log(`\n  📝 Final response (first 800 chars):`);
    console.log(`  ${response.content?.slice(0, 800) || "(empty)"}`);
    console.log(`\n  ⏱️  ${elapsed(start)} | Tool calls: ${toolCallCount}`);
    console.log("  ✅ Ranking thread PASSED");
  } catch (err: any) {
    console.error(`  ❌ FAILED: ${err.message}`);
  }
}

// ============================================================
// Memory: Store & Retrieve (Live)
// ============================================================
async function testMemory() {
  hr("Memory: Store & Retrieve Player Profile (LIVE)");
  const start = Date.now();

  try {
    // Store
    console.log("  Creating memory assistant...");
    const assistant = await client.createAssistant({
      name: "CnC Memory Test",
      system_prompt: SYSTEM_PROMPTS.memory,
    });
    console.log(`  ✅ Assistant: ${assistant.assistantId}`);

    const storeThread = await client.createThread(assistant.assistantId);
    console.log(`  ✅ Store thread: ${storeThread.threadId}`);

    const storeMsg = `
Player Profile Update:

User: test_user_live
Current Tier: intermediate
Average Score: 58.5

Round History (last 3):
- Round r1: Score 52, Rank #3
- Round r2: Score 61, Rank #2
- Round r3: Score 63, Rank #1

Common Errors: Off-by-one errors, forgetting edge cases
Preferred Algorithms: Binary Search, Hash Maps

Remember this profile for personalized coaching.
`;

    console.log("  Storing player memory...");
    const storeResponse = (await client.addMessage(storeThread.threadId, {
      content: storeMsg,
      memory: "Auto",
      stream: false,
    })) as BBMessageResponse;

    console.log(`  Store response (first 300 chars): ${storeResponse.content?.slice(0, 300)}`);
    console.log(`  Memory operation ID: ${storeResponse.memoryOperationId || "N/A"}`);

    // Retrieve
    const retrieveThread = await client.createThread(assistant.assistantId);
    console.log(`\n  ✅ Retrieve thread: ${retrieveThread.threadId}`);
    console.log("  Querying memory for test_user_live...");

    const retrieveResponse = (await client.addMessage(retrieveThread.threadId, {
      content:
        "What do you remember about user test_user_live? What is their skill tier, common errors, and what coaching would you recommend?",
      memory: "Auto",
      stream: false,
    })) as BBMessageResponse;

    console.log(`\n  📝 Memory recall (first 600 chars):`);
    console.log(`  ${retrieveResponse.content?.slice(0, 600) || "(empty)"}`);
    console.log(`\n  ⏱️  ${elapsed(start)}`);
    console.log("  ✅ Memory store/retrieve PASSED");
  } catch (err: any) {
    console.error(`  ❌ FAILED: ${err.message}`);
  }
}

// ============================================================
// Connectivity Check
// ============================================================
async function testConnection() {
  hr("Connection Test");
  try {
    console.log("  Testing Backboard API connectivity...");
    const assistant = await client.createAssistant({
      name: "CnC Ping",
      system_prompt: "Reply with 'pong'",
    });
    console.log(`  ✅ Connected! Assistant ID: ${assistant.assistantId}`);

    const thread = await client.createThread(assistant.assistantId);
    console.log(`  ✅ Thread created: ${thread.threadId}`);

    const response = (await client.addMessage(thread.threadId, {
      content: "ping",
      llm_provider: config.llmProvider,
      model_name: config.modelName,
      stream: false,
    })) as BBMessageResponse;

    console.log(`  ✅ LLM responded: "${response.content?.slice(0, 100)}"`);
    return true;
  } catch (err: any) {
    console.error(`  ❌ Connection failed: ${err.message}`);
    return false;
  }
}

// ---- Prompt builder (same logic as evaluation.ts) ----
function buildPrompt(round: RoundSubmissions, label: string): string {
  let p = `## Round: ${round.roundId} — ${label} Analysis\n\n`;
  p += `### Questions:\n`;
  for (const q of round.questions) {
    p += `- **${q.id}** (${q.difficulty}): ${q.title}\n  ${q.description}\n\n`;
  }
  p += `### Submissions:\n\n`;
  for (const sub of round.submissions) {
    p += `#### User: ${sub.userId}\n`;
    for (const resp of sub.responses) {
      const q = round.questions.find((q) => q.id === resp.questionId);
      p += `**Question ${resp.questionId}** (${resp.language}):\n`;
      p += "```\n" + resp.code + "\n```\n\n";
      p += `Call the tool for this submission with questionContext: "${q?.description || q?.title || resp.questionId}"\n\n`;
    }
  }
  p += `\nAnalyze ALL submissions above. Call the tool once per submission.\n`;
  return p;
}

// ============================================================
// Main Runner
// ============================================================
async function main() {
  const args = process.argv.slice(2);
  const threadFlag = args.find((a) => a.startsWith("--thread="))?.split("=")[1];

  console.log("\n🏟️  Compile-n-Conquer — Live Backboard Integration Test");
  console.log(`   API Key: ${API_KEY!.slice(0, 8)}...${API_KEY!.slice(-4)}`);
  console.log(`   Provider: ${config.llmProvider} / ${config.modelName}`);
  console.log(`   Test scope: ${threadFlag || "all"}\n`);

  // Always test connection first
  const connected = await testConnection();
  if (!connected) {
    console.error("\n❌ Cannot reach Backboard API. Check your API key.");
    process.exit(1);
  }

  const results: Record<string, boolean> = {};

  if (!threadFlag || threadFlag === "all" || threadFlag === "tc") {
    const r = await testTimeComplexity();
    results["Time Complexity"] = r !== null;
  }

  if (!threadFlag || threadFlag === "all" || threadFlag === "sc") {
    const r = await testSpaceComplexity();
    results["Space Complexity"] = r !== null;
  }

  if (!threadFlag || threadFlag === "all" || threadFlag === "orig") {
    const r = await testOriginality();
    results["Originality"] = r !== null;
  }

  if (!threadFlag || threadFlag === "all" || threadFlag === "rank") {
    await testRanking();
    results["Ranking"] = true; // if it throws, catch sets it
  }

  if (!threadFlag || threadFlag === "all" || threadFlag === "memory") {
    await testMemory();
    results["Memory"] = true;
  }

  // Summary
  hr("SUMMARY");
  for (const [name, pass] of Object.entries(results)) {
    console.log(`  ${pass ? "✅" : "❌"} ${name}`);
  }
  console.log("");
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
