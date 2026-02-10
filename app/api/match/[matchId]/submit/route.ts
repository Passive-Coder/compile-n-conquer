// ============================================================
// POST /api/match/[matchId]/submit — Submit code for a question
// ============================================================
// Stores submission without running code.

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
    const body = await req.json();
    const { questionId, code, language } = body;

    if (!questionId || !code || !language) {
      return NextResponse.json(
        { error: "questionId, code, and language are required" },
        { status: 400 }
      );
    }

    // Verify match exists and is in progress
    const match = await prisma.match.findUnique({
      where: { id: matchId },
      include: {
        players: true,
        questions: { include: { question: true } },
      },
    });

    if (!match) {
      return NextResponse.json({ error: "Match not found" }, { status: 404 });
    }

    if (match.status !== "IN_PROGRESS") {
      return NextResponse.json(
        { error: `Match is ${match.status}, not accepting submissions` },
        { status: 400 }
      );
    }

    // Verify user is a player
    const isPlayer = match.players.some((p) => p.userId === payload.userId);
    if (!isPlayer) {
      return NextResponse.json(
        { error: "You are not a player in this match" },
        { status: 403 }
      );
    }

    // Find the question
    const matchQuestion = match.questions.find(
      (mq) => mq.questionId === questionId
    );
    if (!matchQuestion) {
      return NextResponse.json(
        { error: "Question not part of this match" },
        { status: 400 }
      );
    }

    // Save submission (no execution required)
    const submission = await prisma.submission.create({
      data: {
        matchId,
        userId: payload.userId,
        questionId,
        code,
        language,
        charCount: code.length,
      },
    });

    return NextResponse.json({
      submission: {
        id: submission.id,
        testsPassed: submission.testsPassed,
        testsTotal: submission.testsTotal,
        stdout: submission.stdout,
        stderr: submission.stderr,
        exitCode: submission.exitCode,
      },
    });
  } catch (error) {
    console.error("Submit error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
