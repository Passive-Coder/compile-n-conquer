"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Terminal, ChevronRight } from "lucide-react"

export function Hero() {
  const [displayText, setDisplayText] = useState("")
  const fullText = "CompileNConquer"
  const [showCursor, setShowCursor] = useState(true)

  useEffect(() => {
    let i = 0
    const interval = setInterval(() => {
      if (i <= fullText.length) {
        setDisplayText(fullText.slice(0, i))
        i++
      } else {
        clearInterval(interval)
      }
    }, 100)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor((prev) => !prev)
    }, 530)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4">
      {/* Scanline overlay */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="animate-scanline absolute left-0 h-px w-full bg-primary/10" />
      </div>

      {/* Grid background */}
      <div
        className="pointer-events-none absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            "linear-gradient(hsl(120 100% 50% / 0.1) 1px, transparent 1px), linear-gradient(90deg, hsl(120 100% 50% / 0.1) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative z-10 flex max-w-4xl flex-col items-center gap-8 text-center">
        {/* Terminal badge */}
        <div className="flex items-center gap-2 rounded-sm border border-border bg-card px-4 py-2">
          <Terminal className="h-4 w-4 text-primary" />
          <span className="text-xs uppercase tracking-widest text-muted-foreground">
            {"v1.0.0 // live arena"}
          </span>
        </div>

        {/* Main title */}
        <h1 className="text-balance text-5xl font-bold tracking-tight text-primary md:text-7xl lg:text-8xl">
          <span className="animate-flicker">{displayText}</span>
          <span
            className={`inline-block w-3 bg-primary ${showCursor ? "opacity-100" : "opacity-0"}`}
            style={{ height: "0.8em", marginLeft: "2px" }}
          />
        </h1>

        {/* Subtitle */}
        <p className="max-w-2xl text-balance text-lg leading-relaxed text-muted-foreground md:text-xl">
          {"Real-time competitive coding. Race opponents head-to-head. Write the fastest, cleanest code. Climb the leaderboard."}
        </p>

        {/* Terminal prompt */}
        <div className="w-full max-w-lg rounded-sm border border-border bg-card p-4 text-left">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span className="text-primary">{">"}</span>
            <span>{"Modes: Debug // Scratch // Reverse Engineering"}</span>
          </div>
          <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
            <span className="text-primary">{">"}</span>
            <span>{"Metrics: Speed + Efficiency + Code Quality"}</span>
          </div>
          <div className="mt-2 flex items-center gap-2 text-sm">
            <span className="text-primary">{">"}</span>
            <span className="text-foreground">{"Ready to compile?"}</span>
            <span className="animate-blink text-primary">{"_"}</span>
          </div>
        </div>

        {/* CTA buttons */}
        <div className="flex flex-col gap-4 sm:flex-row">
          <Link
            href="/auth"
            className="animate-pulse-glow flex items-center gap-2 rounded-sm border border-primary bg-primary px-8 py-3 text-sm font-bold uppercase tracking-widest text-primary-foreground transition-all hover:bg-primary/90"
          >
            Enter Arena
            <ChevronRight className="h-4 w-4" />
          </Link>
          <Link
            href="#features"
            className="flex items-center gap-2 rounded-sm border border-border bg-transparent px-8 py-3 text-sm font-bold uppercase tracking-widest text-foreground transition-all hover:border-primary hover:text-primary"
          >
            Recon
          </Link>
        </div>

        {/* Stats bar removed */}
      </div>
    </section>
  )
}
