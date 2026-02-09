// ============================================================
// Compile-n-Conquer — Evaluation Pipeline Engine
// ============================================================
// Orchestrates the 4-thread LLM evaluation pipeline via Backboard.io

import { BackboardClient } from "backboard-sdk";
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
  RankedUser,
  RoundEvaluation,
  ScoreBreakdown,
  EvaluationConfig,
  DEFAULT_EVAL_CONFIG,
} from "./types";
import {
  TIME_COMPLEXITY_TOOL,
  SPACE_COMPLEXITY_TOOL,
  ORIGINALITY_TOOL,
  RANKING_TOOL,
  SYSTEM_PROMPTS,
} from "./tools";

// Type for Backboard message responses
type BBMessageResponse = {
  content: string;
  status: string;
  toolCalls: Array<{
    id: string;
    function: { name: string; parsedArguments: any };
  }> | null;
  runId?: string;
  threadId: string;
};

// ---- Helper: Build the batch prompt for a metric thread ----

function buildBatchPrompt(
  round: RoundSubmissions,
  metricLabel: string
): string {
  let prompt = `## Round: ${round.roundId} — ${metricLabel} Analysis\n\n`;
  prompt += `### Questions in this round:\n`;
  for (const q of round.questions) {
    prompt += `- **${q.id}** (${q.difficulty}): ${q.title}\n  ${q.description}\n\n`;
  }

  prompt += `### Submissions:\n\n`;
  for (const sub of round.submissions) {
    prompt += `#### User: ${sub.userId}\n`;
    for (const resp of sub.responses) {
      const question = round.questions.find((q) => q.id === resp.questionId);
      prompt += `**Question ${resp.questionId}** (${resp.language}):\n`;
      prompt += "```\n" + resp.code + "\n```\n\n";
      prompt += `Call the tool for this submission with questionContext: "${question?.description || question?.title || resp.questionId}"\n\n`;
    }
  }

  prompt += `\nAnalyze ALL submissions above. Call the tool once per submission.\n`;
  return prompt;
}

// ---- Thread 1: Time Complexity ----

export async function evaluateTimeComplexity(
  client: BackboardClient,
  round: RoundSubmissions,
  config: EvaluationConfig = DEFAULT_EVAL_CONFIG
): Promise<{ results: TimeComplexityResults; threadId: string }> {
  const assistant = await client.createAssistant({
    name: "CnC Time Complexity Analyzer",
    system_prompt: SYSTEM_PROMPTS.timeComplexity,
    tools: [TIME_COMPLEXITY_TOOL],
  });

  const thread = await client.createThread(assistant.assistantId);
  const prompt = buildBatchPrompt(round, "Time Complexity");

  let response = (await client.addMessage(thread.threadId, {
    content: prompt,
    llm_provider: config.llmProvider,
    model_name: config.modelName,
    stream: false,
  })) as BBMessageResponse;

  // Handle tool calls — collect all TC results
  const results: Record<string, ComplexityResult[]> = {};
  for (const sub of round.submissions) {
    results[sub.userId] = [];
  }

  while (response.status === "REQUIRES_ACTION" && response.toolCalls) {
    const toolOutputs = [];

    for (const tc of response.toolCalls) {
      if (tc.function.name === "analyze_time_complexity") {
        const args = tc.function.parsedArguments;

        // The LLM analyzed it — we acknowledge and capture
        // In production, we could run our own static analysis here too
        const analysisResult: ComplexityResult = {
          questionId: args.questionContext || "unknown",
          complexity: args.complexity || "unknown",
          score: args.score || 50,
          reasoning: args.reasoning || "No reasoning provided",
        };

        toolOutputs.push({
          tool_call_id: tc.id,
          output: JSON.stringify({
            status: "recorded",
            ...analysisResult,
          }),
        });
      }
    }

    response = (await client.submitToolOutputs(
      thread.threadId,
      response.runId!,
      toolOutputs,
      false
    )) as BBMessageResponse;
  }

  // Parse the final response content for structured results
  const parsedResults = parseComplexityFromContent(
    response.content,
    round,
    results
  );

  return {
    results: {
      roundId: round.roundId,
      metric: "time_complexity",
      results: parsedResults,
    },
    threadId: thread.threadId,
  };
}

// ---- Thread 2: Space Complexity ----

export async function evaluateSpaceComplexity(
  client: BackboardClient,
  round: RoundSubmissions,
  config: EvaluationConfig = DEFAULT_EVAL_CONFIG
): Promise<{ results: SpaceComplexityResults; threadId: string }> {
  const assistant = await client.createAssistant({
    name: "CnC Space Complexity Analyzer",
    system_prompt: SYSTEM_PROMPTS.spaceComplexity,
    tools: [SPACE_COMPLEXITY_TOOL],
  });

  const thread = await client.createThread(assistant.assistantId);
  const prompt = buildBatchPrompt(round, "Space Complexity");

  let response = (await client.addMessage(thread.threadId, {
    content: prompt,
    llm_provider: config.llmProvider,
    model_name: config.modelName,
    stream: false,
  })) as BBMessageResponse;

  const results: Record<string, ComplexityResult[]> = {};
  for (const sub of round.submissions) {
    results[sub.userId] = [];
  }

  while (response.status === "REQUIRES_ACTION" && response.toolCalls) {
    const toolOutputs = [];

    for (const tc of response.toolCalls) {
      if (tc.function.name === "analyze_space_complexity") {
        const args = tc.function.parsedArguments;
        const analysisResult: ComplexityResult = {
          questionId: args.questionContext || "unknown",
          complexity: args.complexity || "unknown",
          score: args.score || 50,
          reasoning: args.reasoning || "No reasoning provided",
        };

        toolOutputs.push({
          tool_call_id: tc.id,
          output: JSON.stringify({ status: "recorded", ...analysisResult }),
        });
      }
    }

    response = (await client.submitToolOutputs(
      thread.threadId,
      response.runId!,
      toolOutputs,
      false
    )) as BBMessageResponse;
  }

  const parsedResults = parseComplexityFromContent(
    response.content,
    round,
    results
  );

  return {
    results: {
      roundId: round.roundId,
      metric: "space_complexity",
      results: parsedResults,
    },
    threadId: thread.threadId,
  };
}

// ---- Thread 3: Originality & Relevance ----

export async function evaluateOriginality(
  client: BackboardClient,
  round: RoundSubmissions,
  config: EvaluationConfig = DEFAULT_EVAL_CONFIG
): Promise<{ results: OriginalityResults; threadId: string }> {
  const assistant = await client.createAssistant({
    name: "CnC Originality Analyzer",
    system_prompt: SYSTEM_PROMPTS.originality,
    tools: [ORIGINALITY_TOOL],
  });

  const thread = await client.createThread(assistant.assistantId);
  const prompt = buildBatchPrompt(round, "Originality & Relevance");

  let response = (await client.addMessage(thread.threadId, {
    content: prompt,
    llm_provider: config.llmProvider,
    model_name: config.modelName,
    stream: false,
  })) as BBMessageResponse;

  const results: Record<string, OriginalityResult[]> = {};
  for (const sub of round.submissions) {
    results[sub.userId] = [];
  }

  while (response.status === "REQUIRES_ACTION" && response.toolCalls) {
    const toolOutputs = [];

    for (const tc of response.toolCalls) {
      if (tc.function.name === "analyze_originality") {
        const args = tc.function.parsedArguments;
        const analysisResult: OriginalityResult = {
          questionId: args.questionContext || "unknown",
          originalityScore: args.originalityScore || 5,
          relevanceScore: args.relevanceScore || 5,
          commentDensity: args.commentDensity || 0,
          flags: args.flags || [],
          reasoning: args.reasoning || "No reasoning provided",
        };

        toolOutputs.push({
          tool_call_id: tc.id,
          output: JSON.stringify({ status: "recorded", ...analysisResult }),
        });
      }
    }

    response = (await client.submitToolOutputs(
      thread.threadId,
      response.runId!,
      toolOutputs,
      false
    )) as BBMessageResponse;
  }

  const parsedResults = parseOriginalityFromContent(
    response.content,
    round,
    results
  );

  return {
    results: {
      roundId: round.roundId,
      metric: "originality",
      results: parsedResults,
    },
    threadId: thread.threadId,
  };
}

// ---- Thread 4: Final Ranking ----

export async function computeRanking(
  client: BackboardClient,
  tcResults: TimeComplexityResults,
  scResults: SpaceComplexityResults,
  origResults: OriginalityResults,
  testCaseResults: TestCaseResults,
  weights: ScoringWeights,
  tiebreakerData: TiebreakerData,
  config: EvaluationConfig = DEFAULT_EVAL_CONFIG
): Promise<{ rankings: RankedUser[]; threadId: string }> {
  const assistant = await client.createAssistant({
    name: "CnC Ranking Engine",
    system_prompt: SYSTEM_PROMPTS.ranking,
    tools: [RANKING_TOOL],
  });

  const thread = await client.createThread(assistant.assistantId);

  const prompt = `Compute the final ranking for round ${tcResults.roundId}.

Use the compute_final_ranking tool with the following data:
- timeComplexityResults: ${JSON.stringify(tcResults)}
- spaceComplexityResults: ${JSON.stringify(scResults)}
- originalityResults: ${JSON.stringify(origResults)}
- testCaseResults: ${JSON.stringify(testCaseResults)}
- weights: ${JSON.stringify(weights)}
- tiebreakerData: ${JSON.stringify(tiebreakerData)}

Produce a final ranking with full score breakdowns for each user.`;

  let response = (await client.addMessage(thread.threadId, {
    content: prompt,
    llm_provider: config.llmProvider,
    model_name: config.modelName,
    stream: false,
  })) as BBMessageResponse;

  while (response.status === "REQUIRES_ACTION" && response.toolCalls) {
    const toolOutputs = [];

    for (const tc of response.toolCalls) {
      if (tc.function.name === "compute_final_ranking") {
        // Let the LLM compute the ranking via tool — we can also verify locally
        const localRanking = computeRankingLocally(
          tcResults,
          scResults,
          origResults,
          testCaseResults,
          weights,
          tiebreakerData
        );

        toolOutputs.push({
          tool_call_id: tc.id,
          output: JSON.stringify({ rankings: localRanking }),
        });
      }
    }

    response = (await client.submitToolOutputs(
      thread.threadId,
      response.runId!,
      toolOutputs,
      false
    )) as BBMessageResponse;
  }

  // Use local computation as source of truth (LLM is for validation)
  const rankings = computeRankingLocally(
    tcResults,
    scResults,
    origResults,
    testCaseResults,
    weights,
    tiebreakerData
  );

  return { rankings, threadId: thread.threadId };
}

// ---- Local Scoring Engine (deterministic, no LLM needed) ----

export function computeRankingLocally(
  tcResults: TimeComplexityResults,
  scResults: SpaceComplexityResults,
  origResults: OriginalityResults,
  testCaseResults: TestCaseResults,
  weights: ScoringWeights,
  tiebreakerData: TiebreakerData
): RankedUser[] {
  const userIds = Object.keys(tcResults.results);
  const scored: Array<{
    userId: string;
    finalScore: number;
    breakdown: ScoreBreakdown;
    timeTakenMs: number;
  }> = [];

  for (const userId of userIds) {
    const tcScores = tcResults.results[userId] || [];
    const scScores = scResults.results[userId] || [];
    const origScores = origResults.results[userId] || [];
    const testCase = testCaseResults[userId] || { passed: 0, total: 1 };

    // Average TC score (out of 100)
    const avgTcScore =
      tcScores.length > 0
        ? tcScores.reduce((sum, r) => sum + r.score, 0) / tcScores.length
        : 0;

    // Average SC score (out of 100)
    const avgScScore =
      scScores.length > 0
        ? scScores.reduce((sum, r) => sum + r.score, 0) / scScores.length
        : 0;

    // Average originality score: combine originality (1-10) and relevance (1-10) → normalize to 100
    const avgOrigScore =
      origScores.length > 0
        ? origScores.reduce(
            (sum, r) =>
              sum + ((r.originalityScore + r.relevanceScore) / 2) * 10,
            0
          ) / origScores.length
        : 0;

    // Test case pass rate → scale to 100
    const testCaseScore =
      testCase.total > 0 ? (testCase.passed / testCase.total) * 100 : 0;

    // Weighted final score
    const finalScore =
      avgTcScore * weights.timeComplexity +
      avgScScore * weights.spaceComplexity +
      avgOrigScore * weights.originality +
      testCaseScore * weights.testCases;

    scored.push({
      userId,
      finalScore: Math.round(finalScore * 100) / 100,
      breakdown: {
        timeComplexity: {
          avgScore: Math.round(avgTcScore * 100) / 100,
          weighted:
            Math.round(avgTcScore * weights.timeComplexity * 100) / 100,
        },
        spaceComplexity: {
          avgScore: Math.round(avgScScore * 100) / 100,
          weighted:
            Math.round(avgScScore * weights.spaceComplexity * 100) / 100,
        },
        originality: {
          avgScore: Math.round(avgOrigScore * 100) / 100,
          weighted:
            Math.round(avgOrigScore * weights.originality * 100) / 100,
        },
        testCases: {
          passRate: testCase.total > 0 ? testCase.passed / testCase.total : 0,
          weighted:
            Math.round(testCaseScore * weights.testCases * 100) / 100,
        },
      },
      timeTakenMs: tiebreakerData[userId] || Infinity,
    });
  }

  // Sort: highest score first, then lowest time (tiebreaker)
  scored.sort((a, b) => {
    if (b.finalScore !== a.finalScore) return b.finalScore - a.finalScore;
    return a.timeTakenMs - b.timeTakenMs; // lower time wins
  });

  return scored.map((s, i) => ({
    rank: i + 1,
    ...s,
  }));
}

// ---- Full Pipeline Orchestrator ----

export async function runEvaluationPipeline(
  round: RoundSubmissions,
  testCaseResults: TestCaseResults,
  tiebreakerData: TiebreakerData,
  weights: ScoringWeights,
  config: EvaluationConfig = DEFAULT_EVAL_CONFIG
): Promise<RoundEvaluation> {
  const client = new BackboardClient({
    apiKey: process.env.BACKBOARD_API_KEY!,
  });

  // Threads 1-3 run in parallel
  const [tcResult, scResult, origResult] = await Promise.all([
    evaluateTimeComplexity(client, round, config),
    evaluateSpaceComplexity(client, round, config),
    evaluateOriginality(client, round, config),
  ]);

  // Thread 4: aggregation (depends on 1-3)
  const rankingResult = await computeRanking(
    client,
    tcResult.results,
    scResult.results,
    origResult.results,
    testCaseResults,
    weights,
    tiebreakerData,
    config
  );

  return {
    roundId: round.roundId,
    evaluationId: `eval_${round.roundId}_${Date.now()}`,
    rankings: rankingResult.rankings,
    threadIds: {
      timeComplexity: tcResult.threadId,
      spaceComplexity: scResult.threadId,
      originality: origResult.threadId,
      ranking: rankingResult.threadId,
    },
    evaluatedAt: new Date().toISOString(),
  };
}

// ---- Content Parsers (extract structured data from LLM final response) ----

function parseComplexityFromContent(
  content: string,
  round: RoundSubmissions,
  fallback: Record<string, ComplexityResult[]>
): Record<string, ComplexityResult[]> {
  // Try to parse JSON from LLM response
  try {
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      const parsed = JSON.parse(jsonMatch[0]);
      if (parsed.results) return parsed.results;
    }
  } catch {
    // Fall through to fallback
  }

  // If parsing fails, return whatever was collected from tool calls
  // or generate defaults
  for (const sub of round.submissions) {
    if (!fallback[sub.userId] || fallback[sub.userId].length === 0) {
      fallback[sub.userId] = sub.responses.map((r) => ({
        questionId: r.questionId,
        complexity: "unknown",
        score: 50,
        reasoning: "Could not extract from LLM response",
      }));
    }
  }
  return fallback;
}

function parseOriginalityFromContent(
  content: string,
  round: RoundSubmissions,
  fallback: Record<string, OriginalityResult[]>
): Record<string, OriginalityResult[]> {
  try {
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      const parsed = JSON.parse(jsonMatch[0]);
      if (parsed.results) return parsed.results;
    }
  } catch {
    // Fall through
  }

  for (const sub of round.submissions) {
    if (!fallback[sub.userId] || fallback[sub.userId].length === 0) {
      fallback[sub.userId] = sub.responses.map((r) => ({
        questionId: r.questionId,
        originalityScore: 5,
        relevanceScore: 5,
        commentDensity: 0,
        flags: [],
        reasoning: "Could not extract from LLM response",
      }));
    }
  }
  return fallback;
}
