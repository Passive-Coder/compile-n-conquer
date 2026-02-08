import { Trophy, Zap, Star, Clock } from "lucide-react"

interface QuestionResult {
  id: number
  title: string
  status: "solved" | "attempted" | "locked"
  points: number
  maxPoints: number
  bonuses: string[]
}

const statusStyles = {
  solved: "border-primary/30 bg-primary/5 text-primary",
  attempted: "border-yellow-500/30 bg-yellow-500/5 text-yellow-400",
  locked: "border-border bg-secondary/30 text-muted-foreground",
}

const statusLabels = {
  solved: "SOLVED",
  attempted: "IN PROGRESS",
  locked: "LOCKED",
}

export function PointsPanel({
  questions = [],
  rank = "#0",
  time = "--:--",
  xpBonus = 0,
}: {
  questions?: QuestionResult[]
  rank?: string
  time?: string
  xpBonus?: number
}) {
  const totalPoints = questions.reduce((sum, q) => sum + q.points, 0)
  const maxPoints = questions.reduce((sum, q) => sum + q.maxPoints, 0)

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
        {questions.length === 0 && (
          <div className="text-center text-xs text-muted-foreground py-2">No questions</div>
        )}
        {questions.map((q) => (
          <div
            key={q.id}
            className={`flex flex-col gap-1.5 border-b border-border/50 px-3 py-2.5 last:border-b-0 ${
              q.status === "locked" ? "opacity-40" : ""
            }`}
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
              <div className="relative h-1.5 flex-1 overflow-hidden rounded-sm bg-secondary">
                <div
                  className="h-full rounded-sm bg-primary transition-all"
                  style={{ width: `${(q.points / q.maxPoints) * 100}%` }}
                />
              </div>
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
          </div>
        ))}
      </div>

      {/* Summary footer */}
      <div className="flex items-center justify-between border-t border-border px-3 py-2">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <Star className="h-3 w-3 text-primary" />
            <span className="text-xs text-muted-foreground">Rank: {rank}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">{time}</span>
          </div>
        </div>
        <span className="text-xs font-bold text-primary">+{xpBonus} XP bonus</span>
      </div>
    </div>
  )
}
