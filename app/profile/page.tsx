"use client"

import { useEffect, useMemo, useState } from "react"
import { Terminal, ArrowLeft, Trophy, Zap, Code, Target, Clock, TrendingUp } from "lucide-react"
import Link from "next/link"
import { getAuthHeaders, getCachedUserId } from "@/lib/client-auth"

type ProfileUser = {
  id: string
  username: string
  email: string
  displayName: string | null
  title: string
  skillTier: string
  elo: number
  totalWins: number
  totalMatches: number
  totalXP: number
  streak: number
  createdAt: string
}

type ProfileStats = {
  battles: number
  winRate: number
  xp: number
  streak: number
  elo: number
}

type RecentMatch = {
  matchId: string
  opponent: string
  result: "WIN" | "LOSS" | "DRAW" | "PENDING"
  mode: string
  xpDelta: number
  endedAt: string
}

const recentMatches = [
  { opponent: "n3x_byte", result: "WIN", points: "+175", mode: "Scratch", date: "2 hrs ago" },
  { opponent: "c0d3_wr4ith", result: "LOSS", points: "-50", mode: "Debug", date: "5 hrs ago" },
  { opponent: "z3r0_day", result: "WIN", points: "+200", mode: "Reverse", date: "1 day ago" },
  { opponent: "algo_gh0st", result: "WIN", points: "+150", mode: "Scratch", date: "1 day ago" },
  { opponent: "byteB1aster", result: "WIN", points: "+180", mode: "Debug", date: "2 days ago" },
]

const toDisplayMatch = (match: RecentMatch) => {
  const points = match.xpDelta >= 0 ? `+${match.xpDelta}` : `${match.xpDelta}`
  const date = new Date(match.endedAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  })
  return {
    opponent: match.opponent,
    result: match.result === "PENDING" ? "LOSS" : match.result,
    points: `${points} XP`,
    mode: match.mode,
    date,
  }
}

const skillBreakdown = [
  { skill: "DSA", level: 78, color: "hsl(120 100% 50%)" },
  { skill: "Clean Code", level: 85, color: "hsl(45 100% 50%)" },
  { skill: "Speed", level: 62, color: "hsl(200 100% 50%)" },
  { skill: "Debugging", level: 71, color: "hsl(0 80% 55%)" },
  { skill: "Efficiency", level: 90, color: "hsl(120 80% 60%)" },
]

export default function ProfilePage() {
  const [user, setUser] = useState<ProfileUser | null>(null)
  const [stats, setStats] = useState<ProfileStats | null>(null)
  const [matches, setMatches] = useState<RecentMatch[]>([])
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const cachedId = getCachedUserId()

    if (!cachedId) {
      setError("No cached user found. Please sign in.")
      setLoading(false)
      return
    }

    const loadProfile = async () => {
      try {
        const response = await fetch(`/api/users/${cachedId}`, {
          headers: getAuthHeaders(),
        })
        const payload = await response.json().catch(() => ({}))
        if (!response.ok) {
          setError(payload?.error || "Failed to load profile.")
          setLoading(false)
          return
        }
        setUser(payload.user as ProfileUser)
        setStats(payload.stats as ProfileStats)
        setMatches((payload.recentMatches as RecentMatch[]) ?? [])
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load profile.")
      } finally {
        setLoading(false)
      }
    }

    loadProfile()
  }, [])

  const derived = useMemo(() => {
    const displayName = user?.displayName || user?.username || "you"
    const rating = stats?.elo ?? user?.elo ?? 0
    const totalBattles = stats?.battles ?? user?.totalMatches ?? 0
    const wins = user?.totalWins ?? 0
    const losses = Math.max(totalBattles - wins, 0)
    const winRate = stats
      ? `${stats.winRate}%`
      : totalBattles > 0
        ? `${Math.round((wins / totalBattles) * 100)}%`
        : "0%"
    const joined = user?.createdAt
      ? new Date(user.createdAt).toLocaleDateString("en-US", {
          month: "short",
          year: "numeric",
        })
      : "-"
    const title = user?.title || "Code Warrior"
    const totalXP = stats?.xp ?? user?.totalXP ?? 0
    const streak = stats?.streak ?? user?.streak ?? 0

    return {
      displayName,
      rating,
      rank: "Unranked",
      title,
      joined,
      totalBattles,
      wins,
      losses,
      winRate,
      totalXP,
      streak,
    }
  }, [user])

  const statCards = [
    { label: "Battles", value: String(derived.totalBattles), icon: Target },
    { label: "Win Rate", value: derived.winRate, icon: TrendingUp },
    { label: "XP", value: derived.totalXP.toLocaleString("en-US"), icon: Zap },
    { label: "Streak", value: String(derived.streak), icon: Trophy },
  ]

  const hasRecentMatches = matches.length > 0
  const displayMatches = hasRecentMatches
    ? matches.map(toDisplayMatch)
    : recentMatches

  return (
    <main className="min-h-screen bg-background">
      {/* Top bar */}
      <header className="border-b border-border px-4 py-3">
        <div className="mx-auto flex max-w-5xl items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="flex items-center gap-1.5 text-muted-foreground transition-colors hover:text-primary"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
            </Link>
            <div className="flex items-center gap-2">
              <Terminal className="h-4 w-4 text-primary" />
              <span className="text-xs font-bold uppercase tracking-widest text-foreground">
                Profile Terminal
              </span>
            </div>
          </div>
          <Link
            href="/arena/lobby"
            className="rounded-sm border border-primary bg-primary px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-primary-foreground transition-all hover:bg-primary/90"
          >
            Enter Arena
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-4 py-8">
        {loading && (
          <div className="mb-6 rounded-sm border border-border bg-card p-4 text-xs text-muted-foreground">
            Loading profile...
          </div>
        )}
        {error && !loading && (
          <div className="mb-6 rounded-sm border border-destructive/30 bg-destructive/10 p-4 text-xs text-destructive">
            {error}
          </div>
        )}
        {/* Profile header */}
        <div className="mb-8 flex flex-col gap-6 md:flex-row md:items-center md:gap-8">
          <div className="flex h-20 w-20 items-center justify-center rounded-sm border border-primary/30 bg-primary/10 text-3xl font-bold text-primary">
            {derived.displayName.slice(0, 1).toUpperCase()}
          </div>
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-2xl font-bold text-foreground">{derived.displayName}</h1>
              <span className="rounded-sm border border-primary/30 bg-primary/10 px-2 py-0.5 text-xs text-primary">
                {derived.title}
              </span>
            </div>
            <div className="mt-2 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
              <span>ELO: <span className="font-bold text-primary">{derived.rating}</span></span>
              <span>Global Rank: <span className="font-bold text-foreground">{derived.rank}</span></span>
              <span>Joined: {derived.joined}</span>
            </div>
          </div>
        </div>

        {/* Stats grid */}
        <div className="mb-8 grid grid-cols-2 gap-3 md:grid-cols-4">
          {statCards.map((stat) => (
            <div key={stat.label} className="rounded-sm border border-border bg-card p-4">
              <div className="mb-2 flex items-center gap-2">
                <stat.icon className="h-4 w-4 text-primary" />
                <span className="text-xs uppercase tracking-widest text-muted-foreground">
                  {stat.label}
                </span>
              </div>
              <span className="text-2xl font-bold text-foreground">{stat.value}</span>
            </div>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Skill breakdown */}
          <div className="rounded-sm border border-border bg-card p-4">
            <div className="mb-4 flex items-center gap-2">
              <Code className="h-4 w-4 text-primary" />
              <span className="text-xs uppercase tracking-widest text-primary">
                Skill Breakdown
              </span>
            </div>
            <p className="mb-4 text-xs text-muted-foreground">
              Skill metrics are coming soon. Sample bars shown below.
            </p>
            <div className="flex flex-col gap-4">
              {skillBreakdown.map((s) => (
                <div key={s.skill} className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-foreground">{s.skill}</span>
                    <span className="text-xs text-muted-foreground">{s.level}%</span>
                  </div>
                  <div className="relative h-2 overflow-hidden rounded-sm bg-secondary">
                    <div
                      className="h-full rounded-sm transition-all"
                      style={{
                        width: `${s.level}%`,
                        backgroundColor: s.color,
                        opacity: 0.8,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent matches */}
          <div className="rounded-sm border border-border bg-card p-4">
            <div className="mb-4 flex items-center gap-2">
              <Clock className="h-4 w-4 text-primary" />
              <span className="text-xs uppercase tracking-widest text-primary">
                Recent Matches
              </span>
            </div>
            {!hasRecentMatches && (
              <p className="mb-3 text-xs text-muted-foreground">
                No matches found yet. Sample history shown below.
              </p>
            )}
            <div className="flex flex-col">
              {displayMatches.map((match, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between border-b border-border/50 py-3 last:border-b-0"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`rounded-sm px-1.5 py-0.5 text-xs font-bold ${
                        match.result === "WIN"
                          ? "border border-primary/30 bg-primary/10 text-primary"
                          : "border border-destructive/30 bg-destructive/10 text-destructive"
                      }`}
                    >
                      {match.result}
                    </span>
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-foreground">
                        vs {match.opponent}
                      </span>
                      <span className="text-xs text-muted-foreground">{match.mode}</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <span
                      className={`text-xs font-bold ${
                        match.points.startsWith("+") ? "text-primary" : "text-destructive"
                      }`}
                    >
                      {match.points} XP
                    </span>
                    <span className="text-xs text-muted-foreground">{match.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
