import { Zap, Shield, Eye, Code, Timer, Trophy } from "lucide-react"

const features = [
  {
    icon: Zap,
    title: "Live Progress Arena",
    description:
      "Real-time race bars with live avatars. Watch opponents pass test cases in real time.",
  },
  {
    icon: Code,
    title: "Integrated IDE",
    description:
      "Side-by-side code editor with built-in complexity analyzer. Real-time feedback on your logic.",
  },
  {
    icon: Shield,
    title: "Comprehensive Grading",
    description:
      "Evaluated on efficiency, execution speed, code quality, and clean code heuristics.",
  },
  {
    icon: Eye,
    title: "Reverse Engineering",
    description:
      "Deduce algorithms from I/O sets. A unique mode that tests deep understanding.",
  },
  {
    icon: Timer,
    title: "First Blood Bonuses",
    description:
      "Be the first to solve and earn bonus points. Speed matters as much as quality.",
  },
  {
    icon: Trophy,
    title: "Ranked Leaderboards",
    description:
      "Climb the global rankings. Track your win rate, efficiency score, and code quality rating.",
  },
]

export function Features() {
  return (
    <section id="features" className="relative px-4 py-24">
      <div className="mx-auto max-w-6xl">
        {/* Section header */}
        <div className="mb-16 flex flex-col items-center gap-4 text-center">
          <span className="text-xs uppercase tracking-widest text-primary">
            {"// system_capabilities"}
          </span>
          <h2 className="text-balance text-3xl font-bold text-foreground md:text-4xl">
            {"Built for Competitive Coders"}
          </h2>
          <p className="max-w-lg text-muted-foreground">
            {"Every feature is designed to test your skills, reward clean code, and create an electrifying competitive experience."}
          </p>
        </div>

        {/* Features grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group rounded-sm border border-border bg-card p-6 transition-all hover:border-primary/50 hover:shadow-[0_0_15px_hsl(120_100%_50%_/_0.05)]"
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-sm border border-border bg-secondary">
                <feature.icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="mb-2 text-sm font-bold uppercase tracking-wider text-foreground">
                {feature.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
