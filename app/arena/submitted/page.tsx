"use client"

import Link from "next/link"
import { ArrowLeft, Terminal } from "lucide-react"

export default function ArenaSubmittedPage() {
  return (
    <main className="relative flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-lg rounded-sm border border-border bg-card p-6 text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-sm border border-border bg-secondary">
          <Terminal className="h-6 w-6 text-primary" />
        </div>
        <h1 className="text-lg font-bold uppercase tracking-widest text-foreground">
          All Codes Submitted
        </h1>
        <p className="mt-2 text-xs text-muted-foreground">
          Your solutions have been recorded. You can head back to your profile.
        </p>

        <Link
          href="/profile"
          className="mt-6 inline-flex w-full items-center justify-center rounded-sm border border-primary bg-primary px-4 py-2 text-xs font-bold uppercase tracking-widest text-primary-foreground transition hover:bg-primary/90"
        >
          Go to Profile
        </Link>

        <Link
          href="/arena/lobby"
          className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-sm border border-border bg-secondary px-4 py-2 text-xs uppercase tracking-widest text-foreground transition hover:border-primary/40"
        >
          <ArrowLeft className="h-3 w-3" />
          Back to Lobby
        </Link>
      </div>
    </main>
  )
}
