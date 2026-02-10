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
        },
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
    const isPlayer = match.players.some(
      (p) =>
        p.userId === payload.userId ||
        p.user.username === payload.username ||
        p.user.displayName === payload.username,
    );
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

    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
      select: { username: true, displayName: true },
    });
    const userName = user?.displayName || user?.username || payload.username;

    // Save submission (no execution required)
    const submission = await prisma.submission.create({
      data: {
        matchId,
        userId: userName,
        questionId: matchQuestion.question.title,
        code,
        language,
        charCount: code.length,
      },
    });

    const questionTitles = match.questions.map((mq) => mq.question.title);
    const questionTitleSet = new Set(questionTitles);
    const playerNames = match.players.map(
      (player) => player.user.displayName || player.user.username,
    );

    if (playerNames.length > 0 && questionTitles.length > 0) {
      const submissions = await prisma.submission.findMany({
        where: {
          matchId,
          userId: { in: playerNames },
        },
        select: {
          userId: true,
          questionId: true,
        },
      });

      const progress = new Map<string, Set<string>>();
      for (const entry of submissions) {
        if (!questionTitleSet.has(entry.questionId)) continue;
        if (!progress.has(entry.userId)) {
          progress.set(entry.userId, new Set());
        }
        progress.get(entry.userId)?.add(entry.questionId);
      }

      const allCompleted = playerNames.every(
        (name) => (progress.get(name)?.size ?? 0) >= questionTitles.length,
      );

      if (allCompleted) {
        await prisma.match.update({
          where: { id: matchId },
          data: {
            status: "COMPLETED",
            endedAt: new Date(),
          },
        });
      }
    }

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
