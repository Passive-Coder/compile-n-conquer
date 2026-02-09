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

interface UsersPanelProps {
  users: User[]
}

export function UsersPanel({ users }: UsersPanelProps) {
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
      {users.length === 0 ? (
        <div className="text-xs text-muted-foreground p-2 text-center">No users yet.</div>
      ) : (
        <div className="flex flex-col gap-2 p-2">
        </div>
      )}
    </div>
  )
}