"use client"

import { Terminal, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function AuthPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [handle, setHandle] = useState("")
  const [accessKey, setAccessKey] = useState("")
  const [status, setStatus] = useState("Awaiting credentials...")
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const cacheUserId = (userId: string) => {
    if (typeof window === "undefined") return
    window.localStorage.setItem("cnc.userId", userId)
  }

  const handleGoogleSignIn = () => {
    setIsLoading(true)
    // Mock: In production, redirect to Supabase Google OAuth
    setTimeout(() => {
      setIsLoading(false)
    }, 2000)
  }

  const handleSignup = async () => {
    setError(null)

    const username = handle.trim()
    if (!username) {
      setError("Handle is required.")
      return
    }
    if (!accessKey.trim()) {
      setError("Access key is required.")
      return
    }

    const slug =
      username
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, ".")
        .replace(/^\.+|\.+$/g, "") || "user"
    const email = `${slug}@cnc.local`

    setIsSubmitting(true)
    setStatus("Initializing session...")
    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password: accessKey,
          displayName: username,
        }),
      })

      const payload = await response.json().catch(() => ({}))
      if (!response.ok) {
        setStatus("Awaiting credentials...")
        setError(payload?.error || "Signup failed.")
        return
      }

      if (!payload?.user?.id) {
        setStatus("Awaiting credentials...")
        setError("Signup succeeded but user id was missing.")
        return
      }
      cacheUserId(payload.user.id)
      setStatus("Session initialized.")
      router.push("/profile")
    } catch (err) {
      setStatus("Awaiting credentials...")
      setError(err instanceof Error ? err.message : "Signup failed.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleSignIn = async () => {
    setError(null)

    const login = handle.trim()
    if (!login) {
      setError("Handle is required.")
      return
    }
    if (!accessKey.trim()) {
      setError("Access key is required.")
      return
    }

    setIsSubmitting(true)
    setStatus("Accessing terminal...")
    try {
      const response = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          login,
          password: accessKey,
        }),
      })

      const payload = await response.json().catch(() => ({}))
      if (!response.ok) {
        setStatus("Awaiting credentials...")
        setError(payload?.error || "Sign in failed.")
        return
      }

      if (!payload?.user?.id) {
        setStatus("Awaiting credentials...")
        setError("Sign in succeeded but user id was missing.")
        return
      }
      cacheUserId(payload.user.id)
      setStatus("Access granted.")
      router.push("/profile")
    } catch (err) {
      setStatus("Awaiting credentials...")
      setError(err instanceof Error ? err.message : "Sign in failed.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center px-4">
      {/* Grid background */}
      <div
        className="pointer-events-none absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            "linear-gradient(hsl(120 100% 50% / 0.1) 1px, transparent 1px), linear-gradient(90deg, hsl(120 100% 50% / 0.1) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Scanline */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="animate-scanline absolute left-0 h-px w-full bg-primary/10" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Back link */}
        <Link
          href="/"
          className="mb-8 flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground transition-colors hover:text-primary"
        >
          <ArrowLeft className="h-3 w-3" />
          Back to Home
        </Link>

        {/* Auth card */}
        <div className="rounded-sm border border-border bg-card p-8">
          {/* Header */}
          <div className="mb-8 flex flex-col items-center gap-4 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-sm border border-border bg-secondary">
              <Terminal className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-bold uppercase tracking-wider text-foreground">
                {"Access Terminal"}
              </h1>
              <p className="mt-1 text-xs text-muted-foreground">
                {"// authenticate to enter the arena"}
              </p>
            </div>
          </div>

          {/* Terminal-style status */}
          <div className="mb-6 rounded-sm border border-border bg-secondary/50 p-3">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span className="text-primary">{"$"}</span>
              <span>{"system.auth --status"}</span>
            </div>
            <div className="mt-1 flex items-center gap-2 text-xs">
              <span className="text-primary">{">"}</span>
              <span className="text-foreground">{status}</span>
              <span className="animate-blink text-primary">{"_"}</span>
            </div>
          </div>

          {/* Google Sign In button */}
          <button
            onClick={handleGoogleSignIn}
            disabled={isLoading}
            className="flex w-full items-center justify-center gap-3 rounded-sm border border-border bg-secondary px-4 py-3 text-sm font-bold uppercase tracking-widest text-foreground transition-all hover:border-primary hover:text-primary disabled:opacity-50"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            {isLoading ? "Connecting..." : "Sign in with Google"}
          </button>

          {/* Divider */}
          <div className="my-6 flex items-center gap-4">
            <div className="h-px flex-1 bg-border" />
            <span className="text-xs text-muted-foreground">{"or"}</span>
            <div className="h-px flex-1 bg-border" />
          </div>

          {/* Username/Email mock fields */}
          <div className="flex flex-col gap-4">
            <div>
              <label
                htmlFor="username"
                className="mb-1 block text-xs uppercase tracking-widest text-muted-foreground"
              >
                Handle
              </label>
              <input
                id="username"
                type="text"
                placeholder="your_callsign"
                value={handle}
                onChange={(e) => setHandle(e.target.value)}
                className="w-full rounded-sm border border-border bg-input px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="mb-1 block text-xs uppercase tracking-widest text-muted-foreground"
              >
                Access Key
              </label>
              <input
                id="password"
                type="password"
                placeholder="**************"
                value={accessKey}
                onChange={(e) => setAccessKey(e.target.value)}
                className="w-full rounded-sm border border-border bg-input px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
            <div className="flex flex-col gap-2">
              <button
                onClick={handleSignup}
                disabled={isSubmitting}
                className="animate-pulse-glow w-full rounded-sm border border-primary bg-primary px-4 py-2.5 text-sm font-bold uppercase tracking-widest text-primary-foreground transition-all hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSubmitting ? "Initializing..." : "Initialize Session"}
              </button>
              <button
                onClick={handleSignIn}
                disabled={isSubmitting}
                className="w-full rounded-sm border border-border bg-secondary px-4 py-2.5 text-xs font-bold uppercase tracking-widest text-foreground transition-all hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSubmitting ? "Accessing..." : "Access Existing"}
              </button>
            </div>
            {error && (
              <p className="rounded-sm border border-destructive/30 bg-destructive/10 px-3 py-2 text-xs text-destructive">
                {error}
              </p>
            )}
          </div>

          {/* Footer text */}
          <p className="mt-6 text-center text-xs text-muted-foreground">
            {"New operative? "}
            <Link href="/auth" className="text-primary hover:underline">
              {"Request Access"}
            </Link>
          </p>
        </div>
      </div>
    </main>
  )
}
