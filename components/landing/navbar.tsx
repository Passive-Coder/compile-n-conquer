"use client"

import Link from "next/link"
import { Terminal, Menu, X } from "lucide-react"
import { useState } from "react"

export function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2">
          <Terminal className="h-5 w-5 text-primary" />
          <span className="text-sm font-bold uppercase tracking-widest text-foreground">
            CnC
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-6 md:flex">
          <Link
            href="#features"
            className="text-xs uppercase tracking-widest text-muted-foreground transition-colors hover:text-primary"
          >
            Features
          </Link>
          <Link
            href="#features"
            className="text-xs uppercase tracking-widest text-muted-foreground transition-colors hover:text-primary"
          >
            Modes
          </Link>
          <Link
            href="/arena/lobby"
            className="text-xs uppercase tracking-widest text-muted-foreground transition-colors hover:text-primary"
          >
            Arena
          </Link>
          <Link
            href="/auth"
            className="rounded-sm border border-primary bg-primary px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-primary-foreground transition-all hover:bg-primary/90"
          >
            Sign In
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="text-foreground md:hidden"
          aria-label="Toggle navigation menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {/* Mobile nav */}
      {open && (
        <div className="border-t border-border bg-background px-4 py-4 md:hidden">
          <div className="flex flex-col gap-4">
            <Link
              href="#features"
              onClick={() => setOpen(false)}
              className="text-xs uppercase tracking-widest text-muted-foreground transition-colors hover:text-primary"
            >
              Features
            </Link>
            <Link
              href="#features"
              onClick={() => setOpen(false)}
              className="text-xs uppercase tracking-widest text-muted-foreground transition-colors hover:text-primary"
            >
              Modes
            </Link>
            <Link
              href="/arena/lobby"
              onClick={() => setOpen(false)}
              className="text-xs uppercase tracking-widest text-muted-foreground transition-colors hover:text-primary"
            >
              Arena
            </Link>
            <Link
              href="/auth"
              onClick={() => setOpen(false)}
              className="rounded-sm border border-primary bg-primary px-4 py-1.5 text-center text-xs font-bold uppercase tracking-widest text-primary-foreground"
            >
              Sign In
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
