import { Trophy, Zap, Star, Clock } from "lucide-react"

interface QuestionResult {
  id: number
  questionId?: string
  title: string
  status: "solved" | "attempted" | "seen" | "locked"
  points: number
  maxPoints: number
  bonuses: string[]
}

const questions: QuestionResult[] = [
  {
    id: 1,
    title: "Two Sum",
    status: "solved",
    points: 150,
    maxPoints: 150,
    bonuses: ["First Blood +50"],
  },
  {
    id: 2,
    title: "Valid Parentheses",
    status: "solved",
    points: 120,
    maxPoints: 150,
    bonuses: [],
  },
  {
    id: 3,
    title: "Merge Intervals",
    status: "attempted",
    points: 0,
    maxPoints: 200,
    bonuses: [],
  },
  {
    id: 4,
    title: "LRU Cache",
    status: "locked",
    points: 0,
    maxPoints: 250,
    bonuses: [],
  },
  {
    id: 5,
    title: "Binary Tree Paths",
    status: "locked",
    points: 0,
    maxPoints: 200,
    bonuses: [],
  },
]

const statusStyles = {
  solved: "border-primary/30 bg-primary/5 text-primary",
  attempted: "border-yellow-500/30 bg-yellow-500/5 text-yellow-400",
  seen: "border-border bg-secondary/50 text-foreground",
  locked: "border-border bg-secondary/30 text-muted-foreground",
}

const statusLabels = {
  solved: "SOLVED",
  attempted: "IN PROGRESS",
  seen: "SEEN",
  locked: "NOT SEEN",
}

type PointsPanelProps = {
  questions?: QuestionResult[]
  activeQuestionId?: string | null
  onSelectQuestion?: (questionId: string) => void
  actionLabel?: string
  onAction?: () => void
  actionDisabled?: boolean
  actionLoading?: boolean
}

export function PointsPanel({
  questions: questionsProp,
  activeQuestionId,
  onSelectQuestion,
  actionLabel,
  onAction,
  actionDisabled,
  actionLoading,
}: PointsPanelProps) {
  const resolvedQuestions =
    questionsProp && questionsProp.length > 0 ? questionsProp : questions
  const totalPoints = resolvedQuestions.reduce((sum, q) => sum + q.points, 0)
  const maxPoints = resolvedQuestions.reduce((sum, q) => sum + q.maxPoints, 0)

  return (
    <div className="flex flex-col rounded-sm border border-border bg-card">
      {/* Header with total */}
      <div className="flex items-center justify-between border-b border-border px-3 py-2">
        <span className="text-xs uppercase tracking-widest text-primary">
          Scoreboard
        </span>
        <div className="flex items-center gap-1.5">
          <Trophy className="h-3 w-3 text-primary" />
          <span className="text-sm font-bold text-primary">{totalPoints}</span>
          <span className="text-xs text-muted-foreground">/ {maxPoints}</span>
        </div>
      </div>

      {/* Question breakdown */}
      <div className="flex flex-col">
        {resolvedQuestions.map((q) => {
          const isActive = Boolean(
            activeQuestionId && q.questionId === activeQuestionId,
          )
          const canSelect = Boolean(onSelectQuestion && q.questionId)
          return (
          <button
            key={q.id}
            type="button"
            onClick={() => {
              if (canSelect && q.questionId) {
                onSelectQuestion(q.questionId)
              }
            }}
            disabled={!canSelect}
            className={`flex w-full flex-col gap-1.5 border-b border-border/50 px-3 py-2.5 text-left transition focus:outline-none focus-visible:ring-1 focus-visible:ring-primary last:border-b-0 ${
              isActive ? "bg-primary/10" : "hover:bg-primary/5"
            } ${!canSelect ? "cursor-default" : ""}`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">
                  {"Q" + q.id}
                </span>
                <span className="text-xs font-bold text-foreground">
                  {q.title}
                </span>
              </div>
              <span
                className={`rounded-sm border px-1.5 py-0.5 text-xs ${statusStyles[q.status]}`}
              >
                {statusLabels[q.status]}
              </span>
            </div>

            {/* Points bar */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">
                {q.points}/{q.maxPoints}
              </span>
            </div>

            {/* Bonuses */}
            {q.bonuses.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {q.bonuses.map((b) => (
                  <span
                    key={b}
                    className="flex items-center gap-1 rounded-sm border border-primary/20 bg-primary/5 px-1.5 py-0.5 text-xs text-primary"
                  >
                    <Zap className="h-2.5 w-2.5" />
                    {b}
                  </span>
                ))}
              </div>
            )}
          </button>
          )
        })}
      </div>

      {/* Summary footer */}
      <div className="flex items-center justify-between border-t border-border px-3 py-2">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <Star className="h-3 w-3 text-primary" />
            <span className="text-xs text-muted-foreground">Rank: #2</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">12:48</span>
          </div>
        </div>
        <span className="text-xs font-bold text-primary">+85 XP bonus</span>
      </div>

      {actionLabel && onAction && (
        <div className="border-t border-border px-3 py-3">
          <button
            type="button"
            onClick={onAction}
            disabled={actionDisabled || actionLoading}
            className="w-full rounded-sm border border-primary bg-primary px-3 py-2 text-xs font-bold uppercase tracking-widest text-primary-foreground transition hover:bg-primary/90 disabled:opacity-60"
          >
            {actionLoading ? "Submitting..." : actionLabel}
          </button>
        </div>
      )}
    </div>
  )
}
