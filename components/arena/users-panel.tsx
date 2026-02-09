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
  solved: number
  total: number
  color: string
}

const initialUsers: User[] = [
  { id: "1", name: "you", avatar: "Y", status: "coding", rank: 1, rating: 1847, solved: 2, total: 5, color: "hsl(120 100% 50%)" },
  { id: "2", name: "n3x_byte", avatar: "N", status: "coding", rank: 2, rating: 2103, solved: 3, total: 5, color: "hsl(45 100% 50%)" },
  { id: "3", name: "z3r0_day", avatar: "Z", status: "idle", rank: 3, rating: 1956, solved: 2, total: 5, color: "hsl(200 100% 50%)" },
  { id: "4", name: "c0d3_wr4ith", avatar: "C", status: "submitted", rank: 4, rating: 2241, solved: 4, total: 5, color: "hsl(0 80% 55%)" },
  { id: "5", name: "algo_gh0st", avatar: "A", status: "coding", rank: 5, rating: 1724, solved: 1, total: 5, color: "hsl(280 80% 60%)" },
]

const statusConfig = {
  coding: { label: "CODING", dotClass: "bg-primary animate-pulse" },
  idle: { label: "IDLE", dotClass: "bg-muted-foreground" },
  submitted: { label: "DONE", dotClass: "bg-yellow-400" },
}

type UsersPanelProps = {
  users?: User[]
}

export function UsersPanel({ users: usersProp }: UsersPanelProps) {
  const hasProvidedUsers = Boolean(usersProp && usersProp.length > 0)
  const [users, setUsers] = useState<User[]>(
    hasProvidedUsers ? (usersProp as User[]) : initialUsers,
  )

  useEffect(() => {
    if (hasProvidedUsers) {
      setUsers(usersProp as User[])
      return
    }
    setUsers(initialUsers)
  }, [hasProvidedUsers, usersProp])

  // Simulate status changes
  useEffect(() => {
    if (hasProvidedUsers) return
    const interval = setInterval(() => {
      setUsers((prev) =>
        prev.map((u) => {
          if (u.id === "1") return u
          const r = Math.random()
          if (r > 0.92) return { ...u, status: "submitted" as const }
          if (r > 0.85) return { ...u, status: "idle" as const }
          return { ...u, status: "coding" as const }
        })
      )
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const sortedUsers = [...users].sort((a, b) => {
    if (b.solved !== a.solved) return b.solved - a.solved
    return b.rating - a.rating
  })

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
        {sortedUsers.map((user) => {
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
              <div className="ml-2 text-xs text-muted-foreground">
                {user.solved}/{user.total}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
