"use client"

import { useEffect, useState } from "react"
import { Wifi, WifiOff } from "lucide-react"

interface User {
  id: string
  name: string
  avatar: string
  status: "coding" | "idle" | "submitted"
  rank: number
  rating: number
  color: string
}

const statusConfig = {
  coding: { label: "CODING", dotClass: "bg-primary animate-pulse" },
  idle: { label: "IDLE", dotClass: "bg-muted-foreground" },
  submitted: { label: "DONE", dotClass: "bg-yellow-400" },
}

// Controlled by parent, no hardcoded users
export function UsersPanel({ users }: { users: User[] }) {
  return (
    <div className="flex flex-col rounded-sm border border-border bg-card">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border px-3 py-2">
        <span className="text-xs uppercase tracking-widest text-primary">
          Opponents
        </span>
        <div className="flex items-center gap-1">
          <Wifi className="h-3 w-3 text-primary" />
          <span className="text-xs text-muted-foreground">{users.length}</span>
        </div>
      </div>

      {/* User list */}
      <div className="flex flex-col">
        {users.length === 0 && (
          <div className="text-center text-xs text-muted-foreground py-2">No users</div>
        )}
        {users.map((user) => {
          const sc = statusConfig[user.status]
          return (
            <div
              key={user.id}
              className={`flex items-center gap-3 border-b border-border/50 px-3 py-2.5 last:border-b-0 ${
                user.id === "1" ? "bg-primary/5" : ""
              }`}
            >
              {/* Avatar */}
              <div
                className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-sm text-xs font-bold"
                style={{
                  backgroundColor: `${user.color}15`,
                  color: user.color,
                  border: `1px solid ${user.color}30`,
                }}
              >
                {user.avatar}
              </div>

              {/* Info */}
              <div className="flex flex-1 flex-col">
                <span
                  className={`text-xs font-bold ${
                    user.id === "1" ? "text-primary" : "text-foreground"
                  }`}
                >
                  {user.name}
                </span>
                <span className="text-xs text-muted-foreground">
                  {user.rating} ELO
                </span>
              </div>

              {/* Status */}
              <div className="flex items-center gap-1.5">
                <div className={`h-1.5 w-1.5 rounded-full ${sc.dotClass}`} />
                <span className="text-xs text-muted-foreground">{sc.label}</span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
