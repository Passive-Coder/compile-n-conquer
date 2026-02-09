import { Terminal } from "lucide-react"
import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t border-border px-4 py-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 text-center">
        <div className="flex items-center gap-2">
          <Terminal className="h-4 w-4 text-primary" />
          <span className="text-xs font-bold uppercase tracking-widest text-foreground">
            CompileNConquer
          </span>
        </div>
        <div className="flex flex-wrap justify-center gap-6">
          <Link
            href="#features"
            className="text-xs uppercase tracking-widest text-muted-foreground transition-colors hover:text-primary"
          >
            Features
          </Link>
          <Link
            href="/arena/lobby"
            className="text-xs uppercase tracking-widest text-muted-foreground transition-colors hover:text-primary"
          >
            Arena
          </Link>
          <Link
            href="/profile"
            className="text-xs uppercase tracking-widest text-muted-foreground transition-colors hover:text-primary"
          >
            Profile
          </Link>
        </div>
        <p className="text-xs text-muted-foreground">
          {"// 2026 CompileNConquer. All systems operational."}
        </p>
      </div>
    </footer>
  )
}
