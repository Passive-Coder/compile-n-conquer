// ============================================================
// POST /api/match/[matchId]/evaluate — Trigger LLM evaluation
// ============================================================
// Called when all players have submitted (or time is up).
// Runs the Backboard evaluation pipeline and updates rankings.

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getUserFromRequest } from "@/lib/auth";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ matchId: string }> }
) {
  const payload = getUserFromRequest(req);
  if (!payload) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
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

    if (match.status !== "IN_PROGRESS") {
      return NextResponse.json(
        { error: `Match is ${match.status}, cannot evaluate` },
        { status: 400 }
      );
    }

    // Transition to EVALUATING
    await prisma.match.update({
      where: { id: matchId },
      data: { status: "EVALUATING" },
    });

    // Build the RoundSubmissions payload for Backboard
    const roundSubmissions = {
      roundId: matchId,
      questions: match.questions.map((mq) => ({
        id: mq.question.title,
        title: mq.question.title,
        description: mq.question.description,
        difficulty: mq.question.difficulty.toLowerCase() as "easy" | "medium" | "hard",
      })),
      submissions: match.players.map((player) => ({
        userId: player.user.displayName || player.user.username,
        responses: match.submissions
          .filter(
            (s) =>
              s.userId === (player.user.displayName || player.user.username),
          )
          .map((s) => ({
            questionId: s.questionId,
            code: s.code,
            language: s.language,
            submittedAt: s.submittedAt.toISOString(),
          })),
      })),
    };

    // For now, compute rankings based on test case results
    // The full Backboard LLM pipeline can be triggered async
    const playerScores = match.players.map((player) => {
      const playerName = player.user.displayName || player.user.username;
      const playerSubmissions = match.submissions.filter(
        (s) => s.userId === playerName
      );

      // Calculate average test pass rate
      const totalPassed = playerSubmissions.reduce(
        (sum, s) => sum + s.testsPassed,
        0
      );
      const totalTests = playerSubmissions.reduce(
        (sum, s) => sum + s.testsTotal,
        0
      );
      const passRate = totalTests > 0 ? totalPassed / totalTests : 0;

      // For SHORTEST mode, factor in code length
      const avgCharCount =
        playerSubmissions.length > 0
          ? playerSubmissions.reduce((sum, s) => sum + (s.charCount || 0), 0) /
            playerSubmissions.length
          : Infinity;

      // For FASTEST mode, factor in submission time
      const avgTime =
        playerSubmissions.length > 0
          ? playerSubmissions.reduce(
              (sum, s) => sum + s.submittedAt.getTime(),
              0
            ) / playerSubmissions.length
          : Infinity;

      let score = passRate * 100;

      // Mode-specific scoring adjustments
      if (match.mode === "SHORTEST") {
        // Lower char count = higher bonus (max 20 points)
        const charBonus = Math.max(0, 20 - avgCharCount / 50);
        score += charBonus;
      }

      return {
        playerId: player.id,
        userId: player.userId,
        score,
        avgTime,
      };
    });

    // Sort by score (desc), then by time (asc) for tiebreaker
    playerScores.sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return a.avgTime - b.avgTime;
    });

    // Update rankings in a transaction
    await prisma.$transaction(async (tx) => {
      for (let i = 0; i < playerScores.length; i++) {
        await tx.matchPlayer.update({
          where: { id: playerScores[i].playerId },
          data: {
            rank: i + 1,
            score: playerScores[i].score,
          },
        });

        // Update user stats
        const isWinner = i === 0;
        await tx.user.update({
          where: { id: playerScores[i].userId },
          data: {
            totalMatches: { increment: 1 },
            ...(isWinner ? { totalWins: { increment: 1 } } : {}),
          },
        });
      }

      // Mark match as completed
      await tx.match.update({
        where: { id: matchId },
        data: {
          status: "COMPLETED",
          endedAt: new Date(),
        },
      });
    });

    // Return final rankings
    const finalMatch = await prisma.match.findUnique({
      where: { id: matchId },
      include: {
        players: {
          include: {
            user: {
              select: {
                id: true,
                username: true,
                displayName: true,
              },
            },
          },
          orderBy: { rank: "asc" },
        },
      },
    });

    return NextResponse.json({
      message: "Evaluation complete",
      rankings: finalMatch?.players.map((p) => ({
        rank: p.rank,
        userId: p.userId,
        username: p.user.username,
        displayName: p.user.displayName,
        score: p.score,
      })),
      roundSubmissions, // For debugging / Backboard integration
    });
  } catch (error) {
    console.error("Evaluate error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
