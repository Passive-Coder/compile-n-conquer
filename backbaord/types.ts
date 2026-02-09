// ============================================================
// Compile-n-Conquer — Evaluation Pipeline Types
// ============================================================

// ---- Input Types ----

export interface Question {
  id: string;
  title: string;
  description: string;
  difficulty: "easy" | "medium" | "hard";
}

export interface UserResponse {
  questionId: string;
  code: string;
  language: string;
  submittedAt: string; // ISO timestamp
}

export interface UserSubmission {
  userId: string;
  responses: UserResponse[];
}

export interface RoundSubmissions {
  roundId: string;
  questions: Question[];
  submissions: UserSubmission[];
}

// ---- Metric Result Types ----

export interface ComplexityResult {
  questionId: string;
  complexity: string; // e.g. "O(n)", "O(n log n)"
  score: number;      // 1-100
  reasoning: string;
}

export interface OriginalityResult {
  questionId: string;
  originalityScore: number;  // 1-10
  relevanceScore: number;    // 1-10
  commentDensity: number;    // percentage
  flags: string[];
  reasoning: string;
}

export interface MetricResults<T> {
  roundId: string;
  metric: "time_complexity" | "space_complexity" | "originality";
  results: Record<string, T[]>; // userId -> per-question results
}

export type TimeComplexityResults = MetricResults<ComplexityResult>;
export type SpaceComplexityResults = MetricResults<ComplexityResult>;
export type OriginalityResults = MetricResults<OriginalityResult>;

// ---- Test Case Types ----

export interface TestCaseResult {
  passed: number;
  total: number;
}

export type TestCaseResults = Record<string, TestCaseResult>; // userId -> result

// ---- Scoring & Ranking Types ----

export interface ScoringWeights {
  timeComplexity: number;  // e.g. 0.25
  spaceComplexity: number; // e.g. 0.20
  originality: number;     // e.g. 0.15
  testCases: number;       // e.g. 0.40
}

export const DEFAULT_WEIGHTS: ScoringWeights = {
  timeComplexity: 0.25,
  spaceComplexity: 0.20,
  originality: 0.15,
  testCases: 0.40,
};

export interface ScoreBreakdown {
  timeComplexity: { avgScore: number; weighted: number };
  spaceComplexity: { avgScore: number; weighted: number };
  originality: { avgScore: number; weighted: number };
  testCases: { passRate: number; weighted: number };
}

export interface RankedUser {
  rank: number;
  userId: string;
  finalScore: number;
  breakdown: ScoreBreakdown;
  timeTakenMs: number;
}

export interface RoundEvaluation {
  roundId: string;
  evaluationId: string;
  rankings: RankedUser[];
  threadIds: {
    timeComplexity: string;
    spaceComplexity: string;
    originality: string;
    ranking: string;
  };
  evaluatedAt: string;
}

// ---- Tiebreaker ----

export type TiebreakerData = Record<string, number>; // userId -> timeTakenMs

// ---- Memory / Skill Tier Types ----

export type SkillTier = "beginner" | "intermediate" | "advanced" | "pro";

export interface PlayerProfile {
  userId: string;
  skillTier: SkillTier;
  avgScore: number;
  roundHistory: RoundScore[];
  commonErrors: string[];
  preferredAlgorithms: string[];
  promotionHistory: TierChange[];
}

export interface RoundScore {
  roundId: string;
  finalScore: number;
  rank: number;
  evaluatedAt: string;
}

export interface TierChange {
  from: SkillTier;
  to: SkillTier;
  reason: string;
  changedAt: string;
}

// ---- Backboard Tool Definitions ----

export interface BackboardToolDef {
  type: "function";
  function: {
    name: string;
    description: string;
    parameters: {
      type: "object";
      properties: Record<string, { type: string; description: string }>;
      required: string[];
    };
  };
}

// ---- Evaluation Pipeline Config ----

export interface EvaluationConfig {
  llmProvider: string;
  modelName: string;
  weights: ScoringWeights;
  maxRetries: number;
}

export const DEFAULT_EVAL_CONFIG: EvaluationConfig = {
  llmProvider: "google",
  modelName: "gemini-2.5-flash",
  weights: DEFAULT_WEIGHTS,
  maxRetries: 2,
};
