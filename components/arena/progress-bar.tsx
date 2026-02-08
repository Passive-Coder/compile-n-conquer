"use client"

import { useEffect, useState } from "react"

interface Player {
  id: string
  name: string
  avatar: string
  progress: number
  solved: number
  total: number
  color: string
}

const initialPlayers: Player[] = [
  { id: "1", name: "you", avatar: "Y", progress: 45, solved: 2, total: 5, color: "hsl(120 100% 50%)" },
  { id: "2", name: "n3x_byte", avatar: "N", progress: 62, solved: 3, total: 5, color: "hsl(45 100% 50%)" },
  { id: "3", name: "z3r0_day", avatar: "Z", progress: 38, solved: 2, total: 5, color: "hsl(200 100% 50%)" },
  { id: "4", name: "c0d3_wr4ith", avatar: "C", progress: 55, solved: 3, total: 5, color: "hsl(0 80% 55%)" },
  { id: "5", name: "algo_gh0st", avatar: "A", progress: 28, solved: 1, total: 5, color: "hsl(280 80% 60%)" },
]

export function ProgressBar() {
  const [players, setPlayers] = useState(initialPlayers)

  // Simulate live progress updates
  useEffect(() => {
    const interval = setInterval(() => {
      setPlayers((prev) =>
        prev.map((p) => ({
          ...p,
          progress: p.id === "1" ? p.progress : Math.min(100, p.progress + Math.random() * 3 - 0.5),
        }))
      )
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  const sorted = [...players].sort((a, b) => b.progress - a.progress)

  return (
    <div className="rounded-sm border border-border bg-card p-3">
      {/* Header */}
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 animate-pulse rounded-full bg-primary" />
          <span className="text-xs uppercase tracking-widest text-primary">
            Live Progress
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">{"Round 1 / 5"}</span>
          <span className="text-xs text-muted-foreground">{"04:32"}</span>
        </div>
      </div>

      {/* Progress tracks */}
      <div className="flex flex-col gap-2">
        {sorted.map((player, index) => (
          <div key={player.id} className="flex items-center gap-3">
            {/* Rank */}
            <span className="w-4 text-right text-xs text-muted-foreground">
              {index + 1}
            </span>

            {/* Avatar */}
            <div
              className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-sm text-xs font-bold"
              style={{
                backgroundColor: `${player.color}20`,
                color: player.color,
                border: `1px solid ${player.color}40`,
              }}
            >
              {player.avatar}
            </div>

            {/* Name */}
            <span
              className={`w-24 truncate text-xs ${
                player.id === "1" ? "font-bold text-primary" : "text-muted-foreground"
              }`}
            >
              {player.name}
            </span>

            {/* Bar */}
            <div className="relative h-3 flex-1 overflow-hidden rounded-sm bg-secondary">
              <div
                className="h-full rounded-sm transition-all duration-1000 ease-out"
                style={{
                  width: `${player.progress}%`,
                  backgroundColor: player.color,
                  opacity: 0.8,
                  boxShadow: `0 0 8px ${player.color}40`,
                }}
              />
            </div>

            {/* Score */}
            <span className="w-12 text-right text-xs text-muted-foreground">
              {player.solved}/{player.total}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
