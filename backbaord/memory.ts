// ============================================================
// Compile-n-Conquer — Memory / Skill Tier Engine
// ============================================================

import { BackboardClient } from "backboard-sdk";
import {
  PlayerProfile,
  SkillTier,
  RoundScore,
  TierChange,
  EvaluationConfig,
  DEFAULT_EVAL_CONFIG,
} from "./types";
import { SYSTEM_PROMPTS } from "./tools";

// ---- Skill Tier Thresholds ----

const TIER_THRESHOLDS: Record<SkillTier, { min: number; max: number }> = {
  beginner: { min: 0, max: 30 },
  intermediate: { min: 30, max: 60 },
  advanced: { min: 60, max: 85 },
  pro: { min: 85, max: 100 },
};

const PROMOTION_STREAK = 3; // consecutive rounds needed to promote
const DEMOTION_STREAK = 2;  // consecutive rounds needed to demote

// ---- Classify Tier from Score ----

export function classifyTier(avgScore: number): SkillTier {
  if (avgScore >= TIER_THRESHOLDS.pro.min) return "pro";
  if (avgScore >= TIER_THRESHOLDS.advanced.min) return "advanced";
  if (avgScore >= TIER_THRESHOLDS.intermediate.min) return "intermediate";
  return "beginner";
}

// ---- Check Promotion / Demotion ----

export function evaluateTierChange(
  currentTier: SkillTier,
  roundHistory: RoundScore[]
): { newTier: SkillTier; changed: boolean; reason: string } {
  if (roundHistory.length === 0) {
    return { newTier: currentTier, changed: false, reason: "No round history" };
  }

  const tierOrder: SkillTier[] = ["beginner", "intermediate", "advanced", "pro"];
  const currentIdx = tierOrder.indexOf(currentTier);

  // Check promotion (last N rounds all qualify for next tier)
  if (currentIdx < tierOrder.length - 1) {
    const nextTier = tierOrder[currentIdx + 1];
    const nextThreshold = TIER_THRESHOLDS[nextTier].min;
    const recentForPromotion = roundHistory.slice(-PROMOTION_STREAK);

    if (
      recentForPromotion.length >= PROMOTION_STREAK &&
      recentForPromotion.every((r) => r.finalScore >= nextThreshold)
    ) {
      return {
        newTier: nextTier,
        changed: true,
        reason: `${PROMOTION_STREAK} consecutive rounds with avg score ≥ ${nextThreshold} → promoted to ${nextTier}`,
      };
    }
  }

  // Check demotion (last N rounds all fall below current tier)
  if (currentIdx > 0) {
    const currentThreshold = TIER_THRESHOLDS[currentTier].min;
    const recentForDemotion = roundHistory.slice(-DEMOTION_STREAK);

    if (
      recentForDemotion.length >= DEMOTION_STREAK &&
      recentForDemotion.every((r) => r.finalScore < currentThreshold)
    ) {
      const prevTier = tierOrder[currentIdx - 1];
      return {
        newTier: prevTier,
        changed: true,
        reason: `${DEMOTION_STREAK} consecutive rounds with avg score < ${currentThreshold} → demoted to ${prevTier}`,
      };
    }
  }

  return { newTier: currentTier, changed: false, reason: "No tier change" };
}

// ---- Update Player Profile After a Round ----

export function updatePlayerProfile(
  profile: PlayerProfile,
  roundScore: RoundScore
): PlayerProfile {
  const updatedHistory = [...profile.roundHistory, roundScore];

  // Recalculate avg score from last 5 rounds
  const recentRounds = updatedHistory.slice(-5);
  const avgScore =
    recentRounds.reduce((sum, r) => sum + r.finalScore, 0) /
    recentRounds.length;

  // Check tier change
  const tierResult = evaluateTierChange(profile.skillTier, updatedHistory);

  const promotionHistory = [...profile.promotionHistory];
  if (tierResult.changed) {
    promotionHistory.push({
      from: profile.skillTier,
      to: tierResult.newTier,
      reason: tierResult.reason,
      changedAt: new Date().toISOString(),
    });
  }

  return {
    ...profile,
    skillTier: tierResult.newTier,
    avgScore: Math.round(avgScore * 100) / 100,
    roundHistory: updatedHistory,
    promotionHistory,
  };
}

// ---- Store Memory via Backboard ----

export async function storePlayerMemory(
  client: BackboardClient,
  profile: PlayerProfile,
  config: EvaluationConfig = DEFAULT_EVAL_CONFIG
): Promise<{ threadId: string; memoryOperationId?: string }> {
  const assistant = await client.createAssistant({
    name: "CnC Player Memory Manager",
    system_prompt: SYSTEM_PROMPTS.memory,
  });

  const thread = await client.createThread(assistant.assistantId);

  const memoryMessage = `
Player Profile Update:

User: ${profile.userId}
Current Tier: ${profile.skillTier}
Average Score: ${profile.avgScore}

Round History (last 5):
${profile.roundHistory
  .slice(-5)
  .map((r) => `- Round ${r.roundId}: Score ${r.finalScore}, Rank #${r.rank}`)
  .join("\n")}

Common Errors: ${profile.commonErrors.join(", ") || "None recorded"}
Preferred Algorithms: ${profile.preferredAlgorithms.join(", ") || "None recorded"}

Tier Changes:
${
  profile.promotionHistory.length > 0
    ? profile.promotionHistory
        .slice(-3)
        .map((tc) => `- ${tc.from} → ${tc.to}: ${tc.reason}`)
        .join("\n")
    : "No tier changes yet"
}

Remember this profile for personalized coaching and adaptive difficulty.
`;

  const response = (await client.addMessage(thread.threadId, {
    content: memoryMessage,
    memory: "Auto",
    stream: false,
  })) as any;

  return {
    threadId: thread.threadId,
    memoryOperationId: response.memoryOperationId,
  };
}

// ---- Retrieve Player Context from Memory ----

export async function retrievePlayerMemory(
  client: BackboardClient,
  userId: string,
  config: EvaluationConfig = DEFAULT_EVAL_CONFIG
): Promise<{ content: string; threadId: string }> {
  const assistant = await client.createAssistant({
    name: "CnC Player Memory Manager",
    system_prompt: SYSTEM_PROMPTS.memory,
  });

  const thread = await client.createThread(assistant.assistantId);

  const response = (await client.addMessage(thread.threadId, {
    content: `Retrieve everything you remember about user ${userId}. Provide their current skill tier, recent performance trends, areas for improvement, and personalized coaching recommendations.`,
    memory: "Auto",
    stream: false,
  })) as any;

  return {
    content: response.content,
    threadId: thread.threadId,
  };
}
