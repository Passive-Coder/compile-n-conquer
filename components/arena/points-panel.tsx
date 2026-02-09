import { Trophy, Zap, Star, Clock } from "lucide-react"

const questions: QuestionResult[] = [
  {
    id: 1,
    title: "Two Sum",
    status: "solved",
    points: 150,
    maxPoints: 150,
    bonuses: ["First Blood +50", "Clean Code +20"],
  },
  {
    id: 2,
    title: "Valid Parentheses",
    status: "solved",
    points: 120,
    maxPoints: 150,
    bonuses: ["Speed +15"],
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


export interface QuestionResult {
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

interface PointsPanelProps {
  questions: QuestionResult[]
}

export function PointsPanel({ questions }: PointsPanelProps) {
  return (
    <div className="flex flex-col rounded-sm border border-border bg-card">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border px-3 py-2">
        <span className="text-xs uppercase tracking-widest text-primary">
          Points
        </span>
      </div>
      {questions.length === 0 ? (
        <div className="text-xs text-muted-foreground p-2 text-center">No questions yet.</div>
      ) : (
        <div className="flex flex-col gap-2 p-2">
          {questions.map((q) => (
            <div
              key={q.id}
              className={`rounded-sm border p-2 flex items-center justify-between ${statusStyles[q.status]}`}
            >
              <div>
                <div className="text-sm font-bold">{q.title}</div>
                <div className="text-xs text-muted-foreground">{q.points}/{q.maxPoints} pts</div>
              </div>
              <div className="text-xs text-right">
                {q.bonuses.length ? q.bonuses.join(", ") : <span className="text-muted-foreground">—</span>}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
