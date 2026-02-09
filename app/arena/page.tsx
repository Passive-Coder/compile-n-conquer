"use client"

import { ProgressBar } from "@/components/arena/progress-bar"
import { CodeEditor } from "@/components/arena/code-editor"
import { UsersPanel } from "@/components/arena/users-panel"
import { PointsPanel } from "@/components/arena/points-panel"
import { Terminal, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function ArenaPage() {
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

      {/* Progress bar section */}
      <div className="border-b border-border px-4 py-2">
        <ProgressBar players={[]} roundLabel="" timerLabel="" />
      </div>

      {/* Main content area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Code editor - center/left */}
        <div className="flex flex-1 flex-col overflow-hidden p-2">
          <CodeEditor />
        </div>

        {/* Right sidebar: Users + Points */}
        <div className="hidden w-72 flex-col gap-2 overflow-auto border-l border-border p-2 xl:flex">
          <UsersPanel users={[]} />
          <PointsPanel questions={[]} />
        </div>
      </div>
    </main>
  )
}
