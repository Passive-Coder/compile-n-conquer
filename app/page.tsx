import { Navbar } from "@/components/landing/navbar"
import { Hero } from "@/components/landing/hero"
import { Features } from "@/components/landing/features"
import { GameModes } from "@/components/landing/game-modes"
import { Footer } from "@/components/landing/footer"

export default function Page() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <Features />
      <GameModes />
      <Footer />
    </main>
  )
}
