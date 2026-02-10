// ============================================================
// POST /api/queue — Join the matchmaking queue
// DELETE /api/queue — Leave the queue
// GET /api/queue — Check queue status
// ============================================================
// When 8 players are in the queue, a match is automatically created.

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getUserFromRequest } from "@/lib/auth";
import { GameMode } from "@prisma/client";

const PLAYERS_PER_MATCH = 8;

// ---- Join Queue ----
export async function POST(req: NextRequest) {
  const payload = getUserFromRequest(req);
  if (!payload) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  try {
    // Check if already in queue
    const existing = await prisma.queueEntry.findFirst({
      where: { userId: payload.userId, active: true },
    });

    if (existing) {
      return NextResponse.json(
        { message: "Already in queue", queueEntry: existing },
        { status: 200 }
      );
    }

    // Check if already in an active match
    const activeMatch = await prisma.matchPlayer.findFirst({
      where: {
        userId: payload.userId,
        match: { status: { in: ["WAITING", "IN_PROGRESS"] } },
      },
      include: { match: true },
    });

    if (activeMatch) {
      return NextResponse.json(
        {
          message: "Already in an active match",
          matchId: activeMatch.matchId,
        },
        { status: 200 }
      );
    }

    // Add to queue
    const queueEntry = await prisma.queueEntry.create({
      data: { userId: payload.userId },
    });

    // Check if we have enough players to start a match
    const match = await tryCreateMatch();

    if (match) {
      return NextResponse.json(
        {
          message: "Match found!",
          matchId: match.id,
          status: "matched",
        },
        { status: 201 }
      );
    }

    // Count current queue size
    const queueSize = await prisma.queueEntry.count({
      where: { active: true },
    });

    return NextResponse.json(
      {
        message: "Added to queue",
        queueEntry,
        queueSize,
        playersNeeded: PLAYERS_PER_MATCH - queueSize,
        status: "waiting",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Queue join error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// ---- Leave Queue ----
export async function DELETE(req: NextRequest) {
  const payload = getUserFromRequest(req);
  if (!payload) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  try {
    await prisma.queueEntry.updateMany({
      where: { userId: payload.userId, active: true },
      data: { active: false },
    });

    return NextResponse.json({ message: "Left queue" });
  } catch (error) {
    console.error("Queue leave error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// ---- Queue Status ----
export async function GET(req: NextRequest) {
  const payload = getUserFromRequest(req);
  if (!payload) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  try {
    const myEntry = await prisma.queueEntry.findFirst({
      where: { userId: payload.userId, active: true },
    });

    const queueSize = await prisma.queueEntry.count({
      where: { active: true },
    });

    return NextResponse.json({
      inQueue: !!myEntry,
      queueSize,
      playersNeeded: Math.max(0, PLAYERS_PER_MATCH - queueSize),
    });
  } catch (error) {
    console.error("Queue status error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// ---- Helper: Try to form a match from queued players ----

async function tryCreateMatch() {
  // Get the first N players (FIFO order)
  const queueEntries = await prisma.queueEntry.findMany({
    where: { active: true },
    orderBy: { joinedAt: "asc" },
    take: PLAYERS_PER_MATCH,
    include: { user: true },
  });

  if (queueEntries.length < PLAYERS_PER_MATCH) {
    return null;
  }

  // Pick random game mode
  const modes: GameMode[] = ["FASTEST", "SHORTEST", "REVERSE", "DEBUGGING"];
  const mode = modes[Math.floor(Math.random() * modes.length)];

  // Pick random questions for this mode (1-3 questions)
  const questionCount = Math.floor(Math.random() * 3) + 1;
  const questions = await prisma.question.findMany({
    where: { mode },
    take: questionCount,
  });

  // Fallback: pick any questions if none exist for this mode
  const finalQuestions =
    questions.length > 0
      ? questions
      : await prisma.question.findMany({ take: questionCount });

  // Create the match with players and questions in a transaction
  const match = await prisma.$transaction(async (tx) => {
    const newMatch = await tx.match.create({
      data: {
        mode,
        status: "WAITING",
        players: {
          create: queueEntries.map((entry) => ({
            userId: entry.userId,
          })),
        },
        questions: {
          create: finalQuestions.map((q, i) => ({
            questionId: q.id,
            order: i,
          })),
        },
      },
      include: {
        players: { include: { user: { select: { id: true, username: true, displayName: true, skillTier: true } } } },
        questions: { include: { question: true } },
      },
    });

    // Deactivate queue entries for matched players
    await tx.queueEntry.updateMany({
      where: {
        id: { in: queueEntries.map((e) => e.id) },
      },
      data: { active: false },
    });

    return newMatch;
  });

  return match;
}
