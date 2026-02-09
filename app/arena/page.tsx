"use client"

import { useEffect, useMemo, useState } from "react"
import { useSearchParams } from "next/navigation"
import { CodeEditor } from "@/components/arena/code-editor"
import { UsersPanel } from "@/components/arena/users-panel"
import { PointsPanel } from "@/components/arena/points-panel"
import { Terminal, ArrowLeft } from "lucide-react"
import Link from "next/link"

type MatchQuestion = {
  questionId: string
  order: number
  question: {
    id: string
    title: string
    description: string
    difficulty: "EASY" | "MEDIUM" | "HARD"
    testCases?: Array<{ input: string; expectedOutput: string }>
  }
}

type MatchSubmission = {
  questionId: string
  testsPassed: number
  testsTotal: number
}

type MatchPlayer = {
  userId: string
  rank: number | null
  user: {
    id: string
    username: string
    displayName: string | null
    elo: number
  }
}

type MatchDetails = {
  id: string
  status: string
  mode: string
  players: MatchPlayer[]
  questions: MatchQuestion[]
  submissions: MatchSubmission[]
}

const difficultyPoints: Record<string, number> = {
  EASY: 150,
  MEDIUM: 200,
  HARD: 250,
}

const playerColors = [
  "hsl(120 100% 50%)",
  "hsl(45 100% 50%)",
  "hsl(200 100% 50%)",
  "hsl(0 80% 55%)",
  "hsl(280 80% 60%)",
]

const formatDifficulty = (difficulty?: string) => {
  if (!difficulty) return undefined
  return difficulty[0] + difficulty.slice(1).toLowerCase()
}

export default function ArenaPage() {
  const searchParams = useSearchParams()
  const matchId = searchParams.get("match")
  const [match, setMatch] = useState<MatchDetails | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [currentUserId, setCurrentUserId] = useState<string | null>(null)

  useEffect(() => {
    if (typeof window === "undefined") return
    setCurrentUserId(window.localStorage.getItem("cnc.userId"))
  }, [])

  useEffect(() => {
    if (!matchId) return
    let active = true

    const loadMatch = async () => {
      setIsLoading(true)
      setError(null)
      try {
        const res = await fetch(`/api/match/${matchId}`, {
          credentials: "include",
        })
        const payload = await res.json().catch(() => ({}))
        if (!res.ok) {
          throw new Error(payload?.error || "Failed to load match.")
        }
        if (!active) return
        setMatch(payload.match as MatchDetails)
      } catch (err) {
        if (!active) return
        setError(err instanceof Error ? err.message : "Failed to load match.")
      } finally {
        if (active) setIsLoading(false)
      }
    }

    loadMatch()

    return () => {
      active = false
    }
  }, [matchId])

  const submissionStatus = useMemo(() => {
    const attempted = new Set<string>()
    const solved = new Set<string>()
    if (match?.submissions) {
      match.submissions.forEach((s) => {
        attempted.add(s.questionId)
        if (s.testsTotal > 0 && s.testsPassed === s.testsTotal) {
          solved.add(s.questionId)
        }
      })
    }
    return { attempted, solved }
  }, [match?.submissions])

  const totalQuestions = match?.questions?.length ?? 0
  const solvedCount = useMemo(() => {
    if (!match) return 0
    return match.questions.reduce((count, mq) => {
      if (submissionStatus.solved.has(mq.questionId)) {
        return count + 1
      }
      return count
    }, 0)
  }, [match, submissionStatus])

  const users = useMemo(() => {
    if (!match) return undefined
    return match.players.map((player, index) => {
      const display = player.user.displayName || player.user.username
      const avatar = display?.trim()?.[0]?.toUpperCase() || "U"
      const isCurrent = currentUserId === player.userId
      return {
        id: player.userId,
        name: display,
        avatar,
        status: "coding" as const,
        rank: player.rank ?? index + 1,
        rating: player.user.elo,
        solved: isCurrent ? solvedCount : 0,
        total: totalQuestions,
        color: playerColors[index % playerColors.length],
      }
    })
  }, [currentUserId, match, solvedCount, totalQuestions])

  const scoreboardQuestions = useMemo(() => {
    if (!match) return undefined
    return match.questions.map((mq, index) => {
      let status: "solved" | "attempted" | "locked" = "locked"
      if (submissionStatus.solved.has(mq.questionId)) {
        status = "solved"
      } else if (submissionStatus.attempted.has(mq.questionId)) {
        status = "attempted"
      }

      const maxPoints =
        difficultyPoints[mq.question.difficulty] ??
        difficultyPoints.MEDIUM
      const points = status === "solved" ? maxPoints : 0

      return {
        id: index + 1,
        title: mq.question.title,
        status,
        points,
        maxPoints,
        bonuses: [],
      }
    })
  }, [match, submissionStatus])

  const activeQuestion = match?.questions?.[0]?.question
  const activeExamples = Array.isArray(activeQuestion?.testCases)
    ? activeQuestion?.testCases
    : []
  const problem = activeQuestion
    ? {
        title: activeQuestion.title,
        description: activeQuestion.description,
        difficulty: formatDifficulty(activeQuestion.difficulty),
        tag: `Q1 / ${totalQuestions || 1}`,
        examples: activeExamples.slice(0, 2).map((tc) => ({
          input: String(tc.input),
          output: String(tc.expectedOutput),
        })),
        constraints: [],
      }
    : undefined

  return (
    <main className="flex h-screen flex-col overflow-hidden bg-background">
      {/* Top bar */}
      <header className="flex items-center justify-between border-b border-border px-4 py-2">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="flex items-center gap-1.5 text-muted-foreground transition-colors hover:text-primary"
            aria-label="Back to home"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
          </Link>
          <div className="flex items-center gap-2">
            <Terminal className="h-4 w-4 text-primary" />
            <span className="text-xs font-bold uppercase tracking-widest text-foreground">
              CnC Arena
            </span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 animate-pulse rounded-full bg-primary" />
            <span className="text-xs uppercase tracking-widest text-primary">
              Live
            </span>
          </div>
          <span className="text-xs text-muted-foreground">
            Mode: Code from Scratch
          </span>
          <Link
            href="/profile"
            className="flex h-7 w-7 items-center justify-center rounded-sm border border-primary/30 bg-primary/10 text-xs font-bold text-primary"
          >
            Y
          </Link>
        </div>
      </header>

      {error && (
        <div className="border-b border-border bg-destructive/10 px-4 py-2 text-xs text-destructive">
          {error}
        </div>
      )}

      {/* Main content area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Code editor - center/left */}
        <div className="relative flex flex-1 flex-col overflow-hidden p-2">
          <CodeEditor problem={problem} />
          {isLoading && (
            <div className="absolute bottom-4 left-4 rounded-sm border border-border bg-card px-3 py-1.5 text-xs text-muted-foreground">
              Loading match...
            </div>
          )}
        </div>

        {/* Right sidebar: Users + Points */}
        <div className="hidden w-72 flex-col gap-2 overflow-auto border-l border-border p-2 xl:flex">
          <UsersPanel users={users} />
          <PointsPanel
            questions={
              scoreboardQuestions && scoreboardQuestions.length > 0
                ? scoreboardQuestions
                : undefined
            }
          />
        </div>
      </div>
    </main>
  )
}
