"use client"

import { Terminal, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function AuthPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [isSignUp, setIsSignUp] = useState(false)
  const [error, setError] = useState("")

  // Form fields
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const endpoint = isSignUp ? "/api/auth/signup" : "/api/auth/signin"
      const body = isSignUp
        ? { username, email, password }
        : { login: username || email, password }

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || "Authentication failed")
        return
      }

      // Store token in localStorage for client-side access
      if (data.token) {
        localStorage.setItem("token", data.token)
        localStorage.setItem("user", JSON.stringify(data.user))
      }

      // Redirect to arena
      router.push("/arena")
    } catch (err) {
      setError("Network error. Try again.")
    } finally {
      setIsLoading(false)
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
                {isSignUp ? "Register Terminal" : "Access Terminal"}
              </h1>
              <p className="mt-1 text-xs text-muted-foreground">
                {isSignUp
                  ? "// create your operative profile"
                  : "// authenticate to enter the arena"}
              </p>
            </div>
          </div>

          {/* Terminal-style status */}
          <div className="mb-6 rounded-sm border border-border bg-secondary/50 p-3">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span className="text-primary">{"$"}</span>
              <span>{isSignUp ? "system.register --new" : "system.auth --status"}</span>
            </div>
            <div className="mt-1 flex items-center gap-2 text-xs">
              <span className="text-primary">{">"}</span>
              <span className="text-foreground">{"Awaiting credentials..."}</span>
              <span className="animate-blink text-primary">{"_"}</span>
            </div>
          </div>

          {/* Error message */}
          {error && (
            <div className="mb-4 rounded-sm border border-red-500/30 bg-red-500/10 p-3 text-xs text-red-400">
              <span className="text-red-500">{"ERROR: "}</span>
              {error}
            </div>
          )}

          {/* Auth form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label
                htmlFor="username"
                className="mb-1 block text-xs uppercase tracking-widest text-muted-foreground"
              >
                Handle{isSignUp ? "" : " / Email"}
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="your_callsign"
                required
                className="w-full rounded-sm border border-border bg-input px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>

            {isSignUp && (
              <div>
                <label
                  htmlFor="email"
                  className="mb-1 block text-xs uppercase tracking-widest text-muted-foreground"
                >
                  Comm Channel (Email)
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="operative@domain.com"
                  required
                  className="w-full rounded-sm border border-border bg-input px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
            )}

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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="**************"
                required
                minLength={6}
                className="w-full rounded-sm border border-border bg-input px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="animate-pulse-glow w-full rounded-sm border border-primary bg-primary px-4 py-2.5 text-sm font-bold uppercase tracking-widest text-primary-foreground transition-all hover:bg-primary/90 disabled:opacity-50"
            >
              {isLoading
                ? "Connecting..."
                : isSignUp
                  ? "Create Operative"
                  : "Initialize Session"}
            </button>
          </form>

          {/* Toggle signup/signin */}
          <p className="mt-6 text-center text-xs text-muted-foreground">
            {isSignUp ? "Already an operative? " : "New operative? "}
            <button
              onClick={() => {
                setIsSignUp(!isSignUp)
                setError("")
              }}
              className="text-primary hover:underline"
            >
              {isSignUp ? "Sign In" : "Request Access"}
            </button>
          </p>
        </div>
      </div>
    </main>
  )
}
