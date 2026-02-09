import { prisma } from "@/lib/db"

export const listAvailableMatches = async () => {
  const matches = await prisma.match.findMany({
    where: { status: "WAITING" },
    orderBy: { createdAt: "desc" },
    include: {
      players: {
        include: {
          user: {
            select: {
              id: true,
              username: true,
              displayName: true,
              elo: true,
            },
          },
        },
      },
    },
    take: 20,
  })

  return matches.map((match) => ({
    id: match.id,
    status: match.status,
    maxPlayers: match.maxPlayers ?? 3,
    createdAt: match.createdAt,
    players: match.players.map((p) => ({
      userId: p.userId,
      user: p.user,
    })),
  }))
}
