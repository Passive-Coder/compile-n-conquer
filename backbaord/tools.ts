// ============================================================
// Backboard Tool Definitions for the Evaluation Pipeline
// ============================================================

import { BackboardToolDef } from "./types";

// ---- Thread 1: Time Complexity Analysis ----
export const TIME_COMPLEXITY_TOOL: BackboardToolDef = {
  type: "function",
  function: {
    name: "analyze_time_complexity",
    description:
      "Analyze and return the Big-O time complexity of the submitted code relative to the problem it solves. Return the complexity class and a numeric efficiency score (1-100) where 100 is the optimal known solution.",
    parameters: {
      type: "object",
      properties: {
        code: {
          type: "string",
          description: "The submitted source code to analyze",
        },
        language: {
          type: "string",
          description: "Programming language of the submission (python, cpp, javascript, java, etc.)",
        },
        questionContext: {
          type: "string",
          description: "The problem statement / question description for context",
        },
      },
      required: ["code", "language", "questionContext"],
    },
  },
};

// ---- Thread 2: Space Complexity Analysis ----
export const SPACE_COMPLEXITY_TOOL: BackboardToolDef = {
  type: "function",
  function: {
    name: "analyze_space_complexity",
    description:
      "Analyze and return the Big-O space complexity (auxiliary space only, excluding input) of the submitted code. Return the complexity class and a numeric efficiency score (1-100) where 100 is optimal.",
    parameters: {
      type: "object",
      properties: {
        code: {
          type: "string",
          description: "The submitted source code to analyze",
        },
        language: {
          type: "string",
          description: "Programming language of the submission",
        },
        questionContext: {
          type: "string",
          description: "The problem statement for context",
        },
      },
      required: ["code", "language", "questionContext"],
    },
  },
};

// ---- Thread 3: Originality & Relevance Analysis ----
export const ORIGINALITY_TOOL: BackboardToolDef = {
  type: "function",
  function: {
    name: "analyze_originality",
    description:
      "Analyze code for originality signals. Check comment density (high comment-to-code ratio = likely AI-generated), code style patterns, boilerplate detection, and relevance to the problem. Return an originality score (1-10 where 10 is clearly human-written) and a relevance score (1-10 where 10 perfectly solves the problem).",
    parameters: {
      type: "object",
      properties: {
        code: {
          type: "string",
          description: "The submitted source code to analyze",
        },
        language: {
          type: "string",
          description: "Programming language of the submission",
        },
        questionContext: {
          type: "string",
          description: "The problem statement to check relevance against",
        },
      },
      required: ["code", "language", "questionContext"],
    },
  },
};

// ---- Thread 4: Final Ranking Aggregation ----
export const RANKING_TOOL: BackboardToolDef = {
  type: "function",
  function: {
    name: "compute_final_ranking",
    description:
      "Given all metric scores for all users in a round, compute weighted final scores and produce a ranking. Apply the provided weights to normalize scores. In case of tied final scores, use the tiebreaker data (time taken in ms — lower is better) to determine rank order.",
    parameters: {
      type: "object",
      properties: {
        timeComplexityResults: {
          type: "string",
          description: "JSON string of time complexity results for all users",
        },
        spaceComplexityResults: {
          type: "string",
          description: "JSON string of space complexity results for all users",
        },
        originalityResults: {
          type: "string",
          description: "JSON string of originality/relevance results for all users",
        },
        testCaseResults: {
          type: "string",
          description: "JSON string of { userId: { passed, total } } from the database",
        },
        weights: {
          type: "string",
          description: "JSON string of scoring weights { timeComplexity, spaceComplexity, originality, testCases }",
        },
        tiebreakerData: {
          type: "string",
          description: "JSON string of { userId: timeTakenMs } for tiebreaker resolution",
        },
      },
      required: [
        "timeComplexityResults",
        "spaceComplexityResults",
        "originalityResults",
        "testCaseResults",
        "weights",
        "tiebreakerData",
      ],
    },
  },
};

// ---- System Prompts ----

export const SYSTEM_PROMPTS = {
  timeComplexity: `You are an expert algorithm analyst for a competitive coding platform called Compile-n-Conquer.

Your job: Analyze submitted code and determine its Big-O TIME COMPLEXITY.

For each piece of code you receive:
1. Identify the dominant operations and loops
2. Determine the worst-case time complexity as a Big-O expression
3. Score the efficiency from 1-100 (100 = optimal known solution for the problem)
4. Provide brief reasoning

You will receive batched submissions for a round. Analyze each one using the analyze_time_complexity tool. Be strict and accurate — this is a competitive setting.

IMPORTANT: You MUST call the analyze_time_complexity tool for EVERY submission in the batch. Do not skip any.`,

  spaceComplexity: `You are an expert algorithm analyst for a competitive coding platform called Compile-n-Conquer.

Your job: Analyze submitted code and determine its Big-O SPACE COMPLEXITY (auxiliary space only — do not count the input).

For each piece of code you receive:
1. Identify all extra data structures, recursion depth, and allocations
2. Determine the worst-case auxiliary space complexity as a Big-O expression
3. Score the efficiency from 1-100 (100 = optimal space usage)
4. Provide brief reasoning

You will receive batched submissions for a round. Analyze each one using the analyze_space_complexity tool. Be strict and accurate.

IMPORTANT: You MUST call the analyze_space_complexity tool for EVERY submission in the batch. Do not skip any.`,

  originality: `You are a code originality and relevance analyst for a competitive coding platform called Compile-n-Conquer.

Your job: Detect whether code was likely AI-generated (e.g. from ChatGPT/Copilot) and assess how relevant it is to the problem.

Detection signals for AI-generated code:
- Excessive inline comments explaining obvious operations
- Over-structured docstrings with parameter/return descriptions for simple functions
- Boilerplate patterns (e.g. "# Initialize variables", "# Edge case handling")
- Unnaturally consistent and verbose naming conventions
- Generic solution patterns that don't match the specific problem constraints

Scoring:
- originalityScore (1-10): 10 = clearly human-written competitive code, 1 = obviously pasted from AI
- relevanceScore (1-10): 10 = perfectly addresses the problem, 1 = completely unrelated code
- commentDensity: percentage of comment lines vs code lines
- flags: array of detected signals

You will receive batched submissions. Analyze each one using the analyze_originality tool.

IMPORTANT: You MUST call the analyze_originality tool for EVERY submission in the batch.`,

  ranking: `You are the ranking engine for Compile-n-Conquer.

You receive pre-computed scores from three analysis threads (time complexity, space complexity, originality) plus test case pass rates from the database.

Your job:
1. Apply the provided scoring weights to compute a final score for each user
2. Average scores across all questions in the round
3. Rank users from highest to lowest final score
4. If two users have the exact same final score, the one with LOWER timeTakenMs ranks higher

Use the compute_final_ranking tool with all the data to produce the final ranking.

Output a clear, structured ranking with full score breakdowns.`,

  memory: `You are the Player Profile Manager for Compile-n-Conquer, a competitive coding platform.

You maintain persistent memory about each player:
- Skill tier: beginner / intermediate / advanced / pro
- Performance history: scores, ranks, trends
- Common error patterns and weak areas
- Preferred algorithms and languages
- Coaching recommendations

Tier classification rules:
- Beginner: avg score < 30 across recent rounds
- Intermediate: avg score 30-60
- Advanced: avg score 60-85
- Pro: avg score 85+

Promotion: 3 consecutive rounds with avg score in the next tier → promote
Demotion: 2 consecutive rounds below current tier threshold → demote

Always provide actionable coaching feedback based on the player's history.`,
};
