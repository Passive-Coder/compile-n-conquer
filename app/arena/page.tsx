"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { useSearchParams } from "next/navigation"
import { CodeEditor } from "@/components/arena/code-editor"
import { UsersPanel } from "@/components/arena/users-panel"
import { PointsPanel } from "@/components/arena/points-panel"
import { Terminal, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { io, type Socket } from "socket.io-client"

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
  const [isSubmittingAll, setIsSubmittingAll] = useState(false)
  const [submitAllError, setSubmitAllError] = useState<string | null>(null)
  const [currentUserId, setCurrentUserId] = useState<string | null>(null)
  const [activeQuestionId, setActiveQuestionId] = useState<string | null>(null)
  const [seenQuestionIds, setSeenQuestionIds] = useState<string[]>([])
  const [codeForBroadcast, setCodeForBroadcast] = useState("")
  const [currentLanguage, setCurrentLanguage] = useState("python")
  const socketRef = useRef<Socket | null>(null)
  const broadcastTimer = useRef<number | null>(null)

  useEffect(() => {
    if (typeof window === "undefined") return
    setCurrentUserId(window.localStorage.getItem("cnc.userId"))
  }, [])

  useEffect(() => {
    if (!matchId) return
    let active = true

    const initSocket = async () => {
      await fetch("/api/socket")
      const socket = io({ path: "/api/socket" })
      socketRef.current = socket

      socket.on("connect", () => {
        if (!active) return
      })
    }

    initSocket()

    return () => {
      active = false
      socketRef.current?.disconnect()
      socketRef.current = null
    }
  }, [matchId])

  useEffect(() => {
    if (!socketRef.current || !matchId || !currentUserId || !activeQuestionId) {
      return
    }

    if (broadcastTimer.current) {
      window.clearTimeout(broadcastTimer.current)
    }

    broadcastTimer.current = window.setTimeout(() => {
      socketRef.current?.emit("arena:code", {
        matchId,
        userId: currentUserId,
        questionId: activeQuestionId,
        code: codeForBroadcast,
      })
    }, 400)

    return () => {
      if (broadcastTimer.current) {
        window.clearTimeout(broadcastTimer.current)
      }
    }
  }, [activeQuestionId, codeForBroadcast, currentUserId, matchId])

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

  useEffect(() => {
    if (!match?.questions?.length) {
      setActiveQuestionId(null)
      setSeenQuestionIds([])
      return
    }
    const firstId = match.questions[0].questionId
    setActiveQuestionId(firstId)
    setSeenQuestionIds([firstId])
  }, [match?.id])

  useEffect(() => {
    if (!activeQuestionId) return
    setSeenQuestionIds((prev) =>
      prev.includes(activeQuestionId) ? prev : [...prev, activeQuestionId],
    )
  }, [activeQuestionId, match?.questions])

  const submissionStatus = useMemo(() => {
    const attempted = new Set<string>()
    const solved = new Set<string>()
    if (match?.submissions && match?.questions) {
      const titleToId = new Map(
        match.questions.map((q) => [q.question.title, q.questionId]),
      )
      match.submissions.forEach((s) => {
        const key = titleToId.get(s.questionId) ?? s.questionId
        attempted.add(key)
        if (s.testsTotal > 0 && s.testsPassed === s.testsTotal) {
          solved.add(key)
        }
      })
    }
    return { attempted, solved }
  }, [match?.questions, match?.submissions])

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
      let status: "solved" | "attempted" | "seen" | "locked" = "locked"
      if (submissionStatus.solved.has(mq.questionId)) {
        status = "solved"
      } else if (submissionStatus.attempted.has(mq.questionId)) {
        status = "attempted"
      } else if (seenQuestionIds.includes(mq.questionId)) {
        status = "seen"
      }

      const maxPoints =
        difficultyPoints[mq.question.difficulty] ??
        difficultyPoints.MEDIUM
      const points = status === "solved" ? maxPoints : 0

      return {
        id: index + 1,
        questionId: mq.questionId,
        title: mq.question.title,
        status,
        points,
        maxPoints,
        bonuses: [],
      }
    })
  }, [match, seenQuestionIds, submissionStatus])

  const activeQuestion =
    match?.questions.find((q) => q.questionId === activeQuestionId)?.question ??
    match?.questions?.[0]?.question
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
      {submitAllError && (
        <div className="border-b border-border bg-destructive/10 px-4 py-2 text-xs text-destructive">
          {submitAllError}
        </div>
      )}

      {/* Main content area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Code editor - center/left */}
        <div className="relative flex flex-1 flex-col overflow-hidden p-2">
          <CodeEditor
            problem={problem}
            matchId={match?.id ?? matchId}
            questionId={activeQuestionId}
            problemTitle={activeQuestion?.title}
            onCodeChange={(next) => setCodeForBroadcast(next)}
            onLanguageChange={(next) => setCurrentLanguage(next)}
            onSubmissionRecorded={({ questionId, testsPassed, testsTotal }) => {
              setMatch((prev) => {
                if (!prev) return prev
                const existing = prev.submissions.find(
                  (s) => s.questionId === questionId,
                )
                const nextSubmission = {
                  questionId,
                  testsPassed,
                  testsTotal,
                }
                const submissions = existing
                  ? prev.submissions.map((s) =>
                      s.questionId === questionId ? nextSubmission : s,
                    )
                  : [...prev.submissions, nextSubmission]

                const ordered = [...prev.questions].sort(
                  (a, b) => a.order - b.order,
                )
                const currentIndex = ordered.findIndex(
                  (q) => q.questionId === questionId,
                )
                const attempted = new Set(
                  submissions.map((s) => s.questionId),
                )

                let nextId: string | null = null
                for (let i = currentIndex + 1; i < ordered.length; i += 1) {
                  if (!attempted.has(ordered[i].questionId)) {
                    nextId = ordered[i].questionId
                    break
                  }
                }
                if (!nextId) {
                  for (let i = 0; i < ordered.length; i += 1) {
                    if (!attempted.has(ordered[i].questionId)) {
                      nextId = ordered[i].questionId
                      break
                    }
                  }
                }

                if (nextId) {
                  setActiveQuestionId(nextId)
                } else {
                  if (matchId) {
                    window.location.href = `/arena/spectate?match=${matchId}`
                  } else {
                    window.location.href = "/arena/spectate"
                  }
                }

                return { ...prev, submissions }
              })
            }}
          />
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
            activeQuestionId={activeQuestionId}
            onSelectQuestion={(questionId) => setActiveQuestionId(questionId)}
            actionLabel="Submit All Codes"
            actionDisabled={isSubmittingAll}
            actionLoading={isSubmittingAll}
            onAction={async () => {
              if (!matchId || !match) {
                setSubmitAllError("Match not loaded.")
                return
              }
              setSubmitAllError(null)
              setIsSubmittingAll(true)
              try {
                let codeCache: Record<string, string> = {}
                let userName = ""
                if (typeof window !== "undefined") {
                  if (activeQuestionId && activeQuestion?.title) {
                    window.localStorage.setItem(
                      activeQuestion.title,
                      codeForBroadcast,
                    )
                  }

                  codeCache = (match.questions || []).reduce(
                    (acc, item) => {
                      const title = item.question.title
                      acc[title] = window.localStorage.getItem(title) ?? ""
                      return acc
                    },
                    {} as Record<string, string>,
                  )

                  const currentPlayer = match.players.find(
                    (player) => player.userId === currentUserId,
                  )
                  userName =
                    currentPlayer?.user.displayName ||
                    currentPlayer?.user.username ||
                    ""

                  window.localStorage.clear()
                  if (currentUserId) {
                    window.localStorage.setItem("cnc.userId", currentUserId)
                  }
                  if (userName) {
                    window.localStorage.setItem("cnc.userName", userName)
                  }
                }

                const ordered = [...match.questions].sort(
                  (a, b) => a.order - b.order,
                )
                const submissions: MatchSubmission[] = []
                const failures: string[] = []

                const placeholderForLanguage = (lang: string) => {
                  const key = lang.toLowerCase()
                  if (key.includes("python")) return "# no code submitted\n"
                  if (key.includes("javascript") || key === "js")
                    return "// no code submitted\n"
                  if (key.includes("typescript") || key === "ts")
                    return "// no code submitted\n"
                  if (key === "java")
                    return "public class Main { public static void main(String[] args) {} }\n"
                  if (key.includes("c++") || key.includes("cpp"))
                    return "#include <bits/stdc++.h>\nint main(){return 0;}\n"
                  if (key === "c") return "#include <stdio.h>\nint main(){return 0;}\n"
                  if (key.includes("go"))
                    return "package main\nfunc main(){}\n"
                  if (key.includes("rust"))
                    return "fn main() {}\n"
                  return "// no code submitted\n"
                }

                for (const item of ordered) {
                  const title = item.question.title
                  const code =
                    typeof window !== "undefined" ? codeCache[title] ?? "" : ""
                  const finalCode =
                    code.trim().length > 0
                      ? code
                      : placeholderForLanguage(currentLanguage || "python")

                  const res = await fetch(`/api/match/${matchId}/submit`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                      questionId: item.questionId,
                      code: finalCode,
                      language: currentLanguage || "python",
                    }),
                  })
                  const payload = await res.json().catch(() => ({}))
                  if (!res.ok) {
                    failures.push(
                      `${title}: ${payload?.error || "submit failed"}`,
                    )
                    continue
                  }
                  submissions.push({
                    questionId: item.questionId,
                    testsPassed: payload?.submission?.testsPassed ?? 0,
                    testsTotal: payload?.submission?.testsTotal ?? 0,
                  })
                }

                if (submissions.length > 0) {
                  setMatch((prev) =>
                    prev ? { ...prev, submissions } : prev,
                  )
                }

                if (failures.length > 0) {
                  setSubmitAllError(
                    `Some submissions failed: ${failures.join(", ")}`,
                  )
                  return
                }

                window.location.href = `/arena/submitted?match=${matchId}`
              } catch (err) {
                setSubmitAllError(
                  err instanceof Error ? err.message : "Submit all failed.",
                )
              } finally {
                setIsSubmittingAll(false)
              }
            }}
          />
        </div>
      </div>
    </main>
  )
}
