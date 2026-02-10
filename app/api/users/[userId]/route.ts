// ============================================================
// GET /api/users/:userId — Fetch user profile by id
// ============================================================

import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/db"

export async function GET(
  _req: NextRequest,
  { params }: { params: { userId: string } },
) {
  const resolvedParams = await Promise.resolve(params)
  const { userId } = resolvedParams

  if (!userId) {
    return NextResponse.json({ error: "userId is required" }, { status: 400 })
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
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
    })

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    const recentPlayers = await prisma.matchPlayer.findMany({
      where: { userId },
      include: {
        match: {
          select: {
            id: true,
            mode: true,
            endedAt: true,
            createdAt: true,
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
          },
        },
      },
      orderBy: { joinedAt: "desc" },
      take: 5,
    })

    const recentMatches = recentPlayers.map((player) => {
      const opponent = player.match.players.find(
        (p) => p.userId !== userId,
      )
      const opponentName =
        opponent?.user.displayName || opponent?.user.username || "Unknown"

      return {
        matchId: player.match.id,
        opponent: opponentName,
        result: player.result ?? "PENDING",
        mode: player.match.mode,
        xpDelta: player.xpDelta,
        endedAt: player.match.endedAt ?? player.match.createdAt,
      }
    })

    const winRate =
      user.totalMatches > 0
        ? Math.round((user.totalWins / user.totalMatches) * 100)
        : 0

    return NextResponse.json({
      user,
      stats: {
        battles: user.totalMatches,
        winRate,
        xp: user.totalXP,
        streak: user.streak,
        elo: user.elo,
      },
      recentMatches,
    })
  } catch (error) {
    console.error("User fetch error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
