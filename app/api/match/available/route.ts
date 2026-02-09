// ============================================================
// GET /api/match/available — List waiting matches (lobbies)
// ============================================================

import { NextRequest, NextResponse } from "next/server"
import { getUserFromRequest } from "@/lib/auth"
import { listAvailableMatches } from "@/lib/lobby"

export async function GET(req: NextRequest) {
  const payload = getUserFromRequest(req)
  if (!payload) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
  }

  try {
    const matches = await listAvailableMatches()
    return NextResponse.json({ matches })
  } catch (error) {
    console.error("Match list error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    )
  }
}
