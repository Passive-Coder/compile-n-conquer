// ============================================================
// GET /api/match/[matchId] — Get match details
// POST /api/match/[matchId] — Start the match (transition to IN_PROGRESS)
// ============================================================

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getUserFromRequest } from "@/lib/auth";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ matchId: string }> }
) {
  const payload = getUserFromRequest(req);
  if (!payload) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const { matchId } = await params;

  try {
    const viewer = await prisma.user.findUnique({
      where: { id: payload.userId },
      select: { username: true, displayName: true },
    });
    const viewerName = viewer?.displayName || viewer?.username || payload.username;

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
                skillTier: true,
                elo: true,
              },
            },
          },
        },
        questions: {
          include: { question: true },
          orderBy: { order: "asc" },
        },
        submissions: {
          where: { userId: viewerName },
          select: {
            id: true,
            questionId: true,
            language: true,
            submittedAt: true,
            testsPassed: true,
            testsTotal: true,
          },
        },
      },
    });

    if (!match) {
      return NextResponse.json({ error: "Match not found" }, { status: 404 });
    }

    // Verify user is a player in this match
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

    return NextResponse.json({ match });
  } catch (error) {
    console.error("Match fetch error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// Start match — any player can trigger this, transitions WAITING → IN_PROGRESS
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
    const match = await prisma.match.findUnique({
      where: { id: matchId },
      include: { players: true },
    });

    if (!match) {
      return NextResponse.json({ error: "Match not found" }, { status: 404 });
    }

    if (match.status !== "WAITING") {
      return NextResponse.json(
        { error: `Match is already ${match.status}` },
        { status: 400 }
      );
    }

    const updated = await prisma.match.update({
      where: { id: matchId },
      data: {
        status: "IN_PROGRESS",
        startedAt: new Date(),
      },
    });

    return NextResponse.json({ match: updated });
  } catch (error) {
    console.error("Match start error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
