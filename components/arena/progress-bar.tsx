"use client"

import { useEffect, useState } from "react"

export interface Player {
  id: string
  name: string
  avatar: string
  progress: number
  solved: number
  total: number
  color: string
}

interface ProgressBarProps {
  players: Player[]
  roundLabel: string
  timerLabel: string
}

export function ProgressBar({ players, roundLabel, timerLabel }: ProgressBarProps) {
  const sorted = [...players].sort((a, b) => b.progress - a.progress)
  return (
    <div className="rounded-sm border border-border bg-card p-1">
      {/* Header */}
      <div className="mb-1 flex items-center justify-between">
        <div className="flex items-center gap-1">
          <div className="h-2 w-2 animate-pulse rounded-full bg-primary" />
          <span className="text-xs uppercase tracking-widest text-primary">
            Live Progress
          </span>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-xs text-muted-foreground">{roundLabel}</span>
          <span className="text-xs text-muted-foreground">{timerLabel}</span>
        </div>
      </div>

      {/* Progress tracks */}
      <div className="flex flex-col gap-1">
        {sorted.length === 0 ? (
          <div className="text-xs text-muted-foreground p-2 text-center">No players yet.</div>
        ) : (
          sorted.map((player, index) => (
            <div key={player.id} className="flex items-center gap-2">
              {/* Rank */}
              <span className="w-4 text-right text-xs text-muted-foreground">
                {index + 1}
              </span>

              {/* Avatar */}
              <div
                className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-sm text-xs font-bold"
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
                className={`w-20 truncate text-xs ${
                  player.id === "1" ? "font-bold text-primary" : "text-muted-foreground"}
                `}
              >
                {player.name}
              </span>

              {/* Bar */}
              <div className="relative h-2 flex-1 overflow-hidden rounded-sm bg-secondary">
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
              <span className="w-10 text-right text-xs text-muted-foreground">
                {player.solved}/{player.total}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
