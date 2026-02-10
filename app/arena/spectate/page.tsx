"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Terminal, Eye } from "lucide-react"
import { io, type Socket } from "socket.io-client"
import { getAuthHeaders } from "@/lib/client-auth"

type MatchQuestion = {
  questionId: string
  question: {
    title: string
  }
}

type MatchPlayer = {
  userId: string
  user: {
    id: string
    username: string
    displayName: string | null
    elo: number
  }
}

type MatchDetails = {
  id: string
  players: MatchPlayer[]
  questions: MatchQuestion[]
}

type CodePayload = {
  matchId: string
  userId: string
  questionId?: string
  code?: string
}

export default function SpectatePage() {
  const searchParams = useSearchParams()
  const matchId = searchParams.get("match")
  const [match, setMatch] = useState<MatchDetails | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null)
  const [codeByUser, setCodeByUser] = useState<
    Record<string, { code: string; questionId?: string }>
  >({})
  const socketRef = useRef<Socket | null>(null)

  useEffect(() => {
    if (!matchId) return
    let active = true

    const loadMatch = async () => {
      try {
        const res = await fetch(`/api/match/${matchId}`, {
          headers: getAuthHeaders(),
        })
        const payload = await res.json().catch(() => ({}))
        if (!res.ok) {
          throw new Error(payload?.error || "Failed to load match.")
        }
        if (!active) return
        setMatch(payload.match as MatchDetails)
        const first = payload.match?.players?.[0]?.userId ?? null
        setSelectedUserId((prev) => prev ?? first)
      } catch (err) {
        if (!active) return
        setError(err instanceof Error ? err.message : "Failed to load match.")
      }
    }

    loadMatch()

    return () => {
      active = false
    }
  }, [matchId])

  useEffect(() => {
    if (!matchId) return
    let active = true

    const initSocket = async () => {
      await fetch("/api/socket", { headers: getAuthHeaders() })
      const socket = io({ path: "/api/socket" })
      socketRef.current = socket

      socket.on("arena:code", (payload: CodePayload) => {
        if (!active || payload.matchId !== matchId) return
        setCodeByUser((prev) => ({
          ...prev,
          [payload.userId]: {
            code: payload.code ?? "",
            questionId: payload.questionId,
          },
        }))
      })
    }

    initSocket()

    return () => {
      active = false
      socketRef.current?.disconnect()
      socketRef.current = null
    }
  }, [matchId])

  const selectedPlayer = match?.players.find(
    (player) => player.userId === selectedUserId,
  )

  const selectedName = selectedPlayer
    ? selectedPlayer.user.displayName || selectedPlayer.user.username
    : "Select a player"

  const selectedCode = selectedUserId
    ? codeByUser[selectedUserId]?.code ?? ""
    : ""

  const selectedQuestionTitle = useMemo(() => {
    if (!selectedUserId || !match) return "Waiting for activity..."
    const questionId = codeByUser[selectedUserId]?.questionId
    if (!questionId) return "Waiting for activity..."
    const question = match.questions.find((q) => q.questionId === questionId)
    return question?.question.title ?? "Working on a question..."
  }, [codeByUser, match, selectedUserId])

  return (
    <main className="relative min-h-screen bg-background px-4 py-8">
      <div className="mx-auto w-full max-w-5xl">
        <Link
          href="/arena/lobby"
          className="mb-6 inline-flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground transition-colors hover:text-primary"
        >
          <ArrowLeft className="h-3 w-3" />
          Back to Lobby
        </Link>

        <div className="rounded-sm border border-border bg-card p-6">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-sm border border-border bg-secondary">
              <Terminal className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h1 className="text-lg font-bold uppercase tracking-widest text-foreground">
                Spectate Arena
              </h1>
              <p className="text-xs text-muted-foreground">
                Watch any player in real time.
              </p>
            </div>
          </div>

          {error && (
            <div className="mb-4 rounded-sm border border-destructive/30 bg-destructive/10 px-3 py-2 text-xs text-destructive">
              {error}
            </div>
          )}

          {!matchId && (
            <div className="rounded-sm border border-border bg-secondary/40 px-3 py-2 text-xs text-muted-foreground">
              No match selected.
            </div>
          )}

          {matchId && (
            <div className="grid gap-4 lg:grid-cols-[260px,1fr]">
              <div className="rounded-sm border border-border bg-secondary/40 p-3">
                <div className="mb-3 flex items-center gap-2 text-xs uppercase tracking-widest text-primary">
                  <Eye className="h-4 w-4" />
                  Players
                </div>
                <div className="space-y-2">
                  {(match?.players ?? []).map((player) => {
                    const display =
                      player.user.displayName || player.user.username
                    const isActive = player.userId === selectedUserId
                    return (
                      <button
                        key={player.userId}
                        type="button"
                        onClick={() => setSelectedUserId(player.userId)}
                        className={`flex w-full items-center justify-between rounded-sm border px-3 py-2 text-xs transition ${
                          isActive
                            ? "border-primary/40 bg-primary/10 text-primary"
                            : "border-border bg-card text-foreground hover:border-primary/30"
                        }`}
                      >
                        <span className="font-semibold">{display}</span>
                        <span className="text-muted-foreground">
                          {player.user.elo} ELO
                        </span>
                      </button>
                    )
                  })}
                  {match && match.players.length === 0 && (
                    <p className="text-xs text-muted-foreground">
                      No players connected.
                    </p>
                  )}
                </div>
              </div>

              <div className="rounded-sm border border-border bg-secondary/40 p-4">
                <div className="mb-3 flex items-center justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-widest text-muted-foreground">
                      Watching
                    </p>
                    <h2 className="text-lg font-semibold text-foreground">
                      {selectedName}
                    </h2>
                  </div>
                  <span className="text-xs uppercase tracking-widest text-primary">
                    Live
                  </span>
                </div>

                <div className="mb-4 rounded-sm border border-border bg-card px-3 py-2 text-xs text-muted-foreground">
                  {selectedQuestionTitle}
                </div>

                <div className="rounded-sm border border-border bg-black/60 p-3">
                  <pre className="min-h-[280px] whitespace-pre-wrap text-xs text-foreground">
                    {selectedCode || "Waiting for code updates..."}
                  </pre>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
