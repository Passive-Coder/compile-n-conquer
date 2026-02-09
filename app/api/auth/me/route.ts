// ============================================================
// POST /api/auth/signout — Clear auth cookie
// GET  /api/auth/me — Get current user from JWT
// ============================================================

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getUserFromRequest } from "@/lib/auth";
import { getSocketServer } from "@/lib/socket";
import { listAvailableMatches } from "@/lib/lobby";

export async function GET(req: NextRequest) {
  const payload = getUserFromRequest(req);

  if (!payload) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
      select: {
        id: true,
        username: true,
        email: true,
        displayName: true,
        title: true,
        skillTier: true,
        elo: true,
        totalWins: true,
        totalMatches: true,
        totalXP: true,
        streak: true,
        createdAt: true,
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ user });
  } catch (error) {
    console.error("Me error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  const payload = getUserFromRequest(req);

  if (payload) {
    try {
      const userId = payload.userId;
      const entries = await prisma.matchPlayer.findMany({
        where: { userId },
        select: { matchId: true },
      });

      const matchIds = Array.from(
        new Set(entries.map((entry) => entry.matchId)),
      );

      if (matchIds.length > 0) {
        await prisma.matchPlayer.deleteMany({ where: { userId } });

        const updatedMatches: any[] = [];
        const deletedMatchIds: string[] = [];

        for (const matchId of matchIds) {
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
                      elo: true,
                    },
                  },
                },
              },
            },
          });

          if (!match) continue;

          const playerCount = match.players.length;

          if (playerCount === 0) {
            if (match.status === "WAITING") {
              await prisma.match.delete({ where: { id: matchId } });
              deletedMatchIds.push(matchId);
              continue;
            }

            await prisma.match.update({
              where: { id: matchId },
              data: { status: "CANCELLED", endedAt: new Date() },
            });
            continue;
          }

          updatedMatches.push(match);
        }

        const io = getSocketServer();
        if (io) {
          const matches = await listAvailableMatches();
          io.emit("lobby:list", matches);
          updatedMatches.forEach((match) => {
            io.emit("lobby:update", match);
          });
          deletedMatchIds.forEach((matchId) => {
            io.emit("lobby:deleted", { matchId });
          });
        }
      }
    } catch (error) {
      console.error("Signout cleanup error:", error);
    }
  }

  // Sign out: clear the cookie
  const response = NextResponse.json({ success: true });
  response.cookies.set("token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 0,
    path: "/",
  });
  return response;
}
