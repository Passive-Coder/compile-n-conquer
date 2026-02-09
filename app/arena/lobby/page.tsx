"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Terminal, ArrowLeft, Users, PlusCircle } from "lucide-react"
import { io, type Socket } from "socket.io-client"

type LobbyPlayer = {
  userId: string
  user: {
    id: string
    username: string
    displayName: string | null
    elo: number
  }
}

type LobbyMatch = {
  id: string
  status: string
  maxPlayers: number
  players: LobbyPlayer[]
}

const sampleLobbies: LobbyMatch[] = [
  {
    id: "sample-1",
    status: "WAITING",
    maxPlayers: 3,
    players: [
      {
        userId: "u1",
        user: { id: "u1", username: "n3x_byte", displayName: "n3x_byte", elo: 2103 },
      },
    ],
  },
  {
    id: "sample-2",
    status: "WAITING",
    maxPlayers: 3,
    players: [
      {
        userId: "u2",
        user: { id: "u2", username: "c0d3_wr4ith", displayName: "c0d3_wr4ith", elo: 2241 },
      },
      {
        userId: "u3",
        user: { id: "u3", username: "z3r0_day", displayName: "z3r0_day", elo: 1956 },
      },
    ],
  },
  {
    id: "sample-3",
    status: "WAITING",
    maxPlayers: 3,
    players: [],
  },
]

export default function LobbyPage() {
  const router = useRouter()
  const [available, setAvailable] = useState<LobbyMatch[]>([])
  const [match, setMatch] = useState<LobbyMatch | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [isSocketConnected, setIsSocketConnected] = useState(false)
  const socketRef = useRef<Socket | null>(null)

  const playersCount = match?.players.length ?? 0
  const lobbyReady = match?.status === "IN_PROGRESS"

  useEffect(() => {
    let active = true

    const initSocket = async () => {
      await fetch("/api/socket")
      const socket = io({ path: "/api/socket" })
      socketRef.current = socket

      socket.on("connect", () => {
        if (!active) return
        setIsSocketConnected(true)
      })

      socket.on("disconnect", () => {
        if (!active) return
        setIsSocketConnected(false)
      })

      socket.on("lobby:list", (matches: LobbyMatch[]) => {
        if (!active) return
        setAvailable(matches)
      })

      socket.on("lobby:update", (updated: LobbyMatch) => {
        if (!active || !updated) return
        setMatch((prev) => (prev?.id === updated.id ? updated : prev))
        setAvailable((prev) => {
          const exists = prev.some((m) => m.id === updated.id)
          if (updated.status !== "WAITING") {
            return prev.filter((m) => m.id !== updated.id)
          }
          if (exists) {
            return prev.map((m) => (m.id === updated.id ? updated : m))
          }
          return [updated, ...prev]
        })
      })

      socket.on("lobby:started", (payload: { matchId: string }) => {
        if (!active) return
        setMatch((prev) => {
          if (payload?.matchId && prev?.id === payload.matchId) {
            router.push(`/arena?match=${payload.matchId}`)
          }
          return prev
        })
      })

      socket.on("lobby:deleted", (payload: { matchId: string }) => {
        if (!active || !payload?.matchId) return
        setAvailable((prev) => prev.filter((lobby) => lobby.id !== payload.matchId))
        setMatch((prev) => (prev?.id === payload.matchId ? null : prev))
      })
    }

    initSocket()

    return () => {
      active = false
      socketRef.current?.disconnect()
      socketRef.current = null
    }
  }, [router])

  const refreshAvailable = async () => {
    try {
      const res = await fetch("/api/match/available")
      if (!res.ok) return
      const payload = await res.json().catch(() => ({}))
      if (payload?.matches) {
        setAvailable(payload.matches as LobbyMatch[])
      }
    } catch {
      // ignore
    }
  }

  const refreshMatch = async (matchId: string) => {
    try {
      const res = await fetch(`/api/match/${matchId}`)
      if (!res.ok) return
      const payload = await res.json().catch(() => ({}))
      if (payload?.match) {
        setMatch(payload.match as LobbyMatch)
      }
    } catch {
      // ignore
    }
  }

  useEffect(() => {
    refreshAvailable()
  }, [])

  useEffect(() => {
    if (isSocketConnected) return
    const interval = setInterval(() => {
      refreshAvailable()
      if (match?.id) {
        refreshMatch(match.id)
      }
    }, 4000)
    return () => clearInterval(interval)
  }, [isSocketConnected, match?.id])

  useEffect(() => {
    if (lobbyReady && match?.id) {
      router.push(`/arena?match=${match.id}`)
    }
  }, [lobbyReady, match?.id, router])

  const handleCreate = async () => {
    setError(null)
    setLoading(true)
    try {
      const res = await fetch("/api/match/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
      })
      const payload = await res.json().catch(() => ({}))
      if (!res.ok) {
        setError(payload?.error || "Failed to create contest.")
        return
      }
      if (payload?.match) {
        setMatch(payload.match as LobbyMatch)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create contest.")
    } finally {
      setLoading(false)
    }
  }

  const handleJoin = async (matchId: string) => {
    setError(null)
    setLoading(true)
    try {
      const res = await fetch("/api/match/join", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ matchId }),
      })
      const payload = await res.json().catch(() => ({}))
      if (!res.ok) {
        setError(payload?.error || "Failed to join contest.")
        return
      }
      if (payload?.match) {
        setMatch(payload.match as LobbyMatch)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to join contest.")
    } finally {
      setLoading(false)
    }
  }

  const statusLabel = match?.status ?? "IDLE"

  const playerRows = useMemo(() => {
    if (!match?.players?.length) return []
    return match.players.map((p) => ({
      id: p.userId,
      name: p.user.displayName || p.user.username,
      elo: p.user.elo,
    }))
  }, [match?.players])

  const listIsSample = available.length === 0
  const displayLobbies = listIsSample ? sampleLobbies : available

  return (
    <main className="relative min-h-screen bg-background px-4 py-10">
      <div className="mx-auto w-full max-w-3xl">
        <Link
          href="/"
          className="mb-6 inline-flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground transition-colors hover:text-primary"
        >
          <ArrowLeft className="h-3 w-3" />
          Back to Home
        </Link>

        <div className="rounded-sm border border-border bg-card p-6">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-sm border border-border bg-secondary">
              <Terminal className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h1 className="text-lg font-bold uppercase tracking-widest text-foreground">
                Arena Lobby
              </h1>
              <p className="text-xs text-muted-foreground">
                Create a contest or join an open lobby. Max 3 players.
              </p>
            </div>
          </div>

          {!match && (
            <div className="flex flex-col gap-6">
              <div className="rounded-sm border border-border bg-secondary/40 p-4">
                <div className="mb-3 flex items-center gap-2 text-xs uppercase tracking-widest text-primary">
                  <PlusCircle className="h-4 w-4" />
                  Create Contest
                </div>
                <p className="mb-4 text-xs text-muted-foreground">
                  Spin up a lobby and wait for up to 2 opponents.
                </p>
                <button
                  onClick={handleCreate}
                  disabled={loading}
                  className="w-full rounded-sm border border-primary bg-primary px-4 py-2 text-xs font-bold uppercase tracking-widest text-primary-foreground transition hover:bg-primary/90 disabled:opacity-70"
                >
                  {loading ? "Creating..." : "Create Lobby"}
                </button>
              </div>

              <div className="rounded-sm border border-border bg-secondary/40 p-4">
                <div className="mb-3 flex items-center gap-2 text-xs uppercase tracking-widest text-primary">
                  <Users className="h-4 w-4" />
                  Available Contests
                </div>
                <p className="mb-4 text-xs text-muted-foreground">
                  Pick a lobby to join. List updates every few seconds.
                </p>
                <div className="space-y-2">
                  {listIsSample && (
                    <p className="text-xs text-muted-foreground">
                      No open contests yet. Sample lobbies shown below.
                    </p>
                  )}
                  {displayLobbies.map((lobby) => {
                    const maxPlayers = lobby.maxPlayers ?? 3
                    const isFull = lobby.players.length >= maxPlayers
                    return (
                      <div
                        key={lobby.id}
                        className="flex w-full items-center justify-between rounded-sm border border-border bg-card px-3 py-2 text-xs font-semibold text-foreground"
                      >
                        <div className="flex items-center gap-3">
                          <span className="tracking-widest text-muted-foreground">
                            #{lobby.id.slice(0, 6).toUpperCase()}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {lobby.players.length}/{maxPlayers} players
                          </span>
                        </div>
                        <button
                          onClick={() => handleJoin(lobby.id)}
                          disabled={loading || listIsSample || isFull}
                          className="rounded-sm border border-border bg-secondary px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-foreground transition hover:border-primary hover:text-primary disabled:opacity-70"
                        >
                          {isFull ? "Full" : "Join"}
                        </button>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          )}

          {match && (
            <div className="rounded-sm border border-border bg-secondary/40 p-4">
              <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-xs uppercase tracking-widest text-muted-foreground">
                    Lobby
                  </p>
                  <p className="text-lg font-bold text-primary">
                    #{match.id.slice(0, 6).toUpperCase()}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs uppercase tracking-widest text-muted-foreground">
                    Status
                  </p>
                  <p className="text-sm font-semibold text-primary">
                    {statusLabel}
                  </p>
                </div>
              </div>

              <div className="mb-4 flex items-center gap-2 text-xs text-muted-foreground">
                <Users className="h-4 w-4 text-primary" />
                Players {playersCount}/{match.maxPlayers}
              </div>

              <div className="space-y-2">
                {playerRows.length === 0 && (
                  <p className="text-xs text-muted-foreground">
                    Waiting for players to join...
                  </p>
                )}
                {playerRows.map((player) => (
                  <div
                    key={player.id}
                    className="flex items-center justify-between rounded-sm border border-border bg-card px-3 py-2 text-xs"
                  >
                    <span className="font-semibold text-foreground">
                      {player.name}
                    </span>
                    <span className="text-muted-foreground">
                      {player.elo} ELO
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {error && (
            <p className="mt-4 rounded-sm border border-destructive/30 bg-destructive/10 px-3 py-2 text-xs text-destructive">
              {error}
            </p>
          )}
        </div>
      </div>
    </main>
  )
}
