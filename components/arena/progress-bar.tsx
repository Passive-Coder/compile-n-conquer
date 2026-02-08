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

// Minimal, scalable, controlled by parent
export function ProgressBar({ players }: { players: Player[] }) {
  return (
    <div className="w-full rounded border border-border bg-card py-1">
      <div className="mb-1 flex items-center gap-2 px-2">
        <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
        <span className="text-[10px] uppercase tracking-widest text-primary font-semibold">
          Progress
        </span>
      </div>
      <div className="flex flex-col gap-1 px-2">
        {players.length === 0 && (
          <div className="text-center text-xs text-muted-foreground py-2">No progress yet</div>
        )}
        {players.map((player) => (
          <div key={player.id} className="flex items-center gap-2">
            <div
              className="flex h-4 w-4 flex-shrink-0 items-center justify-center rounded text-[10px] font-bold"
              style={{
                backgroundColor: `${player.color}20`,
                color: player.color,
                border: `1px solid ${player.color}40`,
              }}
            >
              {player.avatar}
            </div>
            <span
              className={`w-12 truncate text-[10px] ${
                player.id === "1" ? "font-bold text-primary" : "text-muted-foreground"
              }`}
            >
              {player.name}
            </span>
            <div className="relative h-1.5 flex-1 overflow-hidden rounded bg-secondary">
              <div
                className="h-full rounded transition-all duration-1000 ease-out"
                style={{
                  width: `${player.progress}%`,
                  backgroundColor: player.color,
                  opacity: 0.8,
                }}
              />
            </div>
            <span className="w-8 text-right text-[10px] text-muted-foreground">
              {player.solved}/{player.total}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
