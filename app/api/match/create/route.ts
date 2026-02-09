// ============================================================
// POST /api/match/create — Create a new match (lobby)
// ============================================================

import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import { getUserFromRequest } from "@/lib/auth"
import { listAvailableMatches } from "@/lib/lobby"
import { getSocketServer } from "@/lib/socket"

export async function POST(req: NextRequest) {
  const payload = getUserFromRequest(req)
  if (!payload) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
  }

  const body = await req.json().catch(() => ({}))
  const mode = body?.mode || "FASTEST"

  try {
    const result = await prisma.$transaction(async (tx) => {
      const match = await tx.match.create({
        data: {
          mode,
          status: "WAITING",
        },
      })

      await tx.matchPlayer.create({
        data: {
          matchId: match.id,
          userId: payload.userId,
        },
      })

      const questions = await tx.$queryRaw<{ id: string }[]>
        `SELECT id FROM "questions" ORDER BY RANDOM() LIMIT 3`

      if (questions.length < 3) {
        throw new Error("Not enough questions to start a match")
      }

      await tx.matchQuestion.createMany({
        data: questions.map((q, index) => ({
          matchId: match.id,
          questionId: q.id,
          order: index,
        })),
      })

      return match
    })

    const hydrated = await prisma.match.findUnique({
      where: { id: result.id },
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
    })

    const io = getSocketServer()
    if (io) {
      const matches = await listAvailableMatches()
      io.emit("lobby:list", matches)
      io.emit("lobby:update", hydrated)
    }

    const safeMatch = hydrated
      ? { ...hydrated, maxPlayers: hydrated.maxPlayers ?? 3 }
      : hydrated

    return NextResponse.json({
      match: safeMatch,
    })
  } catch (error: any) {
    console.error("Match create error:", error)
    const message =
      error instanceof Error ? error.message : "Internal server error"
    const status = message.includes("Not enough questions") ? 400 : 500
    return NextResponse.json({ error: message }, { status })
  }
}
