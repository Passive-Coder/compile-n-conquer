// ============================================================
// POST /api/match/join — Join an existing match by code
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
  const matchId = body?.matchId ? String(body.matchId) : null

  if (!matchId) {
    return NextResponse.json(
      { error: "matchId is required" },
      { status: 400 },
    )
  }

  try {
    const { hydrated, shouldStart } = await prisma.$transaction(async (tx) => {
      const match = await tx.match.findUnique({
        where: { id: matchId },
        include: { players: true },
      })

      if (!match) {
        throw new Error("MATCH_NOT_FOUND")
      }

      if (match.status !== "WAITING") {
        throw new Error(`MATCH_STATUS:${match.status}`)
      }

      const alreadyInMatch = match.players.some(
        (p) => p.userId === payload.userId,
      )

      const maxPlayers = match.maxPlayers ?? 3
      if (!alreadyInMatch && match.players.length >= maxPlayers) {
        throw new Error("MATCH_FULL")
      }

      if (!alreadyInMatch) {
        await tx.matchPlayer.create({
          data: {
            matchId: match.id,
            userId: payload.userId,
          },
        })
      }

      const totalPlayers = await tx.matchPlayer.count({
        where: { matchId: match.id },
      })
      if (totalPlayers > maxPlayers) {
        if (!alreadyInMatch) {
          await tx.matchPlayer.deleteMany({
            where: { matchId: match.id, userId: payload.userId },
          })
        }
        throw new Error("MATCH_FULL")
      }
      const shouldStart = totalPlayers >= maxPlayers

      if (shouldStart) {
        await tx.match.update({
          where: { id: match.id },
          data: {
            status: "IN_PROGRESS",
            startedAt: new Date(),
          },
        })
      }

      const hydrated = await tx.match.findUnique({
        where: { id: match.id },
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

      return { hydrated, shouldStart }
    })

    if (!hydrated) {
      return NextResponse.json({ error: "Match not found" }, { status: 404 })
    }

    const safeMatch = {
      ...hydrated,
      maxPlayers: hydrated.maxPlayers ?? 3,
    }

    const io = getSocketServer()
    if (io) {
      const matches = await listAvailableMatches()
      io.emit("lobby:list", matches)
      io.emit("lobby:update", safeMatch)
      if (shouldStart) {
        io.emit("lobby:started", { matchId: safeMatch.id })
      }
    }

    return NextResponse.json({
      match: safeMatch,
      started: shouldStart,
    })
  } catch (error) {
    const message = error instanceof Error ? error.message : ""
    if (message === "MATCH_NOT_FOUND") {
      return NextResponse.json({ error: "Match not found" }, { status: 404 })
    }
    if (message === "MATCH_FULL") {
      return NextResponse.json({ error: "Match is full" }, { status: 400 })
    }
    if (message.startsWith("MATCH_STATUS:")) {
      const status = message.split(":")[1] || "IN_PROGRESS"
      return NextResponse.json(
        { error: `Match already ${status}` },
        { status: 400 },
      )
    }

    console.error("Match join error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    )
  }
}
