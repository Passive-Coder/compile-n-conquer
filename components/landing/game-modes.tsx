"use client"

import { useState } from "react"
import { Bug, Code2, Shuffle } from "lucide-react"

const modes = [
  {
    id: "debug",
    icon: Bug,
    name: "Debugging",
    tag: "MODE_01",
    description:
      "Fix a broken codebase with the fewest changes possible. Surgical precision is rewarded.",
    details: [
      "Identify bugs in existing code",
      "Minimize number of changes",
      "Fewest edits wins tiebreaker",
    ],
  },
  {
    id: "scratch",
    icon: Code2,
    name: "Code from Scratch",
    tag: "MODE_02",
    description:
      "Standard competitive coding. Implement the solution from a problem statement, fast and clean.",
    details: [
      "Full implementation required",
      "Graded on speed + quality",
      "Time & space complexity matters",
    ],
  },
  {
    id: "reverse",
    icon: Shuffle,
    name: "Reverse Engineering",
    tag: "MODE_03",
    description:
      "Given input/output sets, deduce and write the underlying algorithm. Think backwards to go forward.",
    details: [
      "Analyze I/O patterns",
      "Deduce the algorithm",
      "Write the hidden function",
    ],
  },
]

export function GameModes() {
  const [activeMode, setActiveMode] = useState("debug")

  const active = modes.find((m) => m.id === activeMode)!

  return (
    <section className="relative px-4 py-24">
      <div className="mx-auto max-w-6xl">
        {/* Section header */}
        <div className="mb-16 flex flex-col items-center gap-4 text-center">
          <span className="text-xs uppercase tracking-widest text-primary">
            {"// game_modes"}
          </span>
          <h2 className="text-balance text-3xl font-bold text-foreground md:text-4xl">
            {"Choose Your Battle"}
          </h2>
        </div>

        {/* Mode selector tabs */}
        <div className="mb-8 flex flex-wrap justify-center gap-2">
          {modes.map((mode) => (
            <button
              key={mode.id}
              onClick={() => setActiveMode(mode.id)}
              className={`flex items-center gap-2 rounded-sm border px-4 py-2 text-xs uppercase tracking-widest transition-all ${
                activeMode === mode.id
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card text-muted-foreground hover:border-primary/50 hover:text-foreground"
              }`}
            >
              <mode.icon className="h-4 w-4" />
              {mode.name}
            </button>
          ))}
        </div>

        {/* Active mode display */}
        <div className="rounded-sm border border-border bg-card p-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-start md:gap-12">
            <div className="flex-1">
              <div className="mb-2 flex items-center gap-3">
                <span className="text-xs text-primary">{active.tag}</span>
                <span className="text-xs text-muted-foreground">{"//"}</span>
                <span className="text-xs uppercase tracking-wider text-muted-foreground">
                  {"active"}
                </span>
              </div>
              <h3 className="mb-4 text-2xl font-bold text-foreground">
                {active.name}
              </h3>
              <p className="leading-relaxed text-muted-foreground">
                {active.description}
              </p>
            </div>
            <div className="flex-1">
              <div className="rounded-sm border border-border bg-secondary/50 p-4">
                <div className="mb-3 text-xs uppercase tracking-widest text-primary">
                  {"> objectives"}
                </div>
                <ul className="flex flex-col gap-3">
                  {active.details.map((detail) => (
                    <li
                      key={detail}
                      className="flex items-center gap-3 text-sm text-foreground"
                    >
                      <span className="text-primary">{"["}</span>
                      <span>{detail}</span>
                      <span className="text-primary">{"]"}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
