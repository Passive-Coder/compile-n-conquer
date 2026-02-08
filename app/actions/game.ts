'use server';

import { getCurrentUser } from '@/lib/auth';
import { prisma } from '@/lib/db';

export async function getGameDetails(gameId: string) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return { success: false, error: 'Not authenticated' };
    }

    // Check and update game time expiration
    await checkGameTimeExpiration(gameId);

    const game = await prisma.game.findUnique({
      where: { id: gameId },
      include: {
        challenge: true,
        participants: {
          include: {
            user: {
              select: {
                id: true,
                username: true,
                rating: true,
              },
            },
          },
        },
        submissions: {
          include: {
            user: {
              select: {
                id: true,
                username: true,
              },
            },
          },
          orderBy: {
            submittedAt: 'asc',
          },
        },
      },
    });

    if (!game) {
      return { success: false, error: 'Game not found' };
    }

    return {
      success: true,
      game: {
        id: game.id,
        format: game.format,
        status: game.status,
        durationMinutes: game.durationMinutes,
        startTime: game.startTime,
        endTime: game.endTime,
        winnerId: game.winnerId,
        timeRemaining: game.startTime && game.status === 'IN_PROGRESS'
          ? Math.max(0, game.durationMinutes * 60 - Math.floor((Date.now() - game.startTime.getTime()) / 1000))
          : null,
        challenge: {
          id: game.challenge.id,
          title: game.challenge.title,
          description: game.challenge.description,
          difficulty: game.challenge.difficulty,
          starterCode: game.challenge.starterCode,
          testCases: JSON.parse(game.challenge.testCases),
        },
        participants: game.participants.map(p => ({
          id: p.id,
          userId: p.user.id,
          username: p.user.username,
          rating: p.user.rating,
          joinedAt: p.joinedAt,
          placement: p.placement,
          score: p.score,
        })),
        submissions: game.submissions.map(s => ({
          id: s.id,
          userId: s.user.id,
          username: s.user.username,
          code: s.code,
          language: s.language,
          isPassing: s.isPassing,
          executionTime: s.executionTime,
          codeLength: s.codeLength,
          submittedAt: s.submittedAt,
        })),
      },
    };
  } catch (error) {
    console.error('Get game details error:', error);
    return { success: false, error: 'An error occurred' };
  }
}

export async function getGameHistory(userId?: string) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return { success: false, error: 'Not authenticated' };
    }

    const targetUserId = userId || user.userId;

    const games = await prisma.game.findMany({
      where: {
        participants: {
          some: {
            userId: targetUserId,
          },
        },
        status: 'COMPLETED',
      },
      include: {
        challenge: {
          select: {
            title: true,
            difficulty: true,
          },
        },
        participants: {
          where: {
            userId: targetUserId,
          },
          select: {
            placement: true,
            score: true,
          },
        },
      },
      orderBy: {
        endTime: 'desc',
      },
      take: 50,
    });

    return {
      success: true,
      games: games.map(g => ({
        id: g.id,
        format: g.format,
        challengeTitle: g.challenge.title,
        difficulty: g.challenge.difficulty,
        startTime: g.startTime,
        endTime: g.endTime,
        placement: g.participants[0]?.placement,
        score: g.participants[0]?.score,
        isWinner: g.winnerId === targetUserId,
      })),
    };
  } catch (error) {
    console.error('Get game history error:', error);
    return { success: false, error: 'An error occurred' };
  }
}

export async function leaveGame(gameId: string) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return { success: false, error: 'Not authenticated' };
    }

    const game = await prisma.game.findUnique({
      where: { id: gameId },
      include: {
        participants: true,
      },
    });

    if (!game) {
      return { success: false, error: 'Game not found' };
    }

    if (game.status === 'COMPLETED') {
      return { success: false, error: 'Game already completed' };
    }

    // Remove participant
    await prisma.gameParticipant.deleteMany({
      where: {
        gameId,
        userId: user.userId,
      },
    });

    // If game was in progress, mark it as cancelled
    if (game.status === 'IN_PROGRESS') {
      await prisma.game.update({
        where: { id: gameId },
        data: {
          status: 'CANCELLED',
          endTime: new Date(),
        },
      });

      // Update remaining participants
      const remainingParticipants = game.participants.filter(p => p.userId !== user.userId);
      if (remainingParticipants.length === 1) {
        // Other player wins by forfeit
        await prisma.game.update({
          where: { id: gameId },
          data: {
            winnerId: remainingParticipants[0].userId,
          },
        });

        await prisma.gameParticipant.updateMany({
          where: {
            gameId,
            userId: remainingParticipants[0].userId,
          },
          data: {
            placement: 1,
            score: 100,
          },
        });

        // Update winner stats
        await prisma.user.update({
          where: { id: remainingParticipants[0].userId },
          data: {
            gamesPlayed: { increment: 1 },
            gamesWon: { increment: 1 },
            rating: { increment: 15 },
          },
        });
      }

      // Update leaving player's stats (loss)
      await prisma.user.update({
        where: { id: user.userId },
        data: {
          gamesPlayed: { increment: 1 },
          rating: { decrement: 10 },
        },
      });
    } else {
      // If waiting, just remove from game
      const remainingCount = await prisma.gameParticipant.count({
        where: { gameId },
      });

      if (remainingCount === 0) {
        await prisma.game.delete({
          where: { id: gameId },
        });
      }
    }

    return { success: true };
  } catch (error) {
    console.error('Leave game error:', error);
    return { success: false, error: 'An error occurred' };
  }
}

export async function getLeaderboard(limit: number = 100) {
  try {
    const users = await prisma.user.findMany({
      orderBy: {
        rating: 'desc',
      },
      take: limit,
      select: {
        id: true,
        username: true,
        rating: true,
        gamesPlayed: true,
        gamesWon: true,
      },
    });

    return {
      success: true,
      leaderboard: users.map((u, index) => ({
        rank: index + 1,
        ...u,
        winRate: u.gamesPlayed > 0 ? (u.gamesWon / u.gamesPlayed) * 100 : 0,
      })),
    };
  } catch (error) {
    console.error('Get leaderboard error:', error);
    return { success: false, error: 'An error occurred' };
  }
}

async function checkGameTimeExpiration(gameId: string) {
  const game = await prisma.game.findUnique({
    where: { id: gameId },
    include: {
      participants: true,
      submissions: {
        where: { isPassing: true },
        orderBy: { submittedAt: 'asc' },
        take: 1,
      },
    },
  });

  if (!game || game.status !== 'IN_PROGRESS' || !game.startTime) {
    return;
  }

  const elapsedMinutes = (Date.now() - game.startTime.getTime()) / (1000 * 60);
  
  if (elapsedMinutes >= game.durationMinutes) {
    // Time expired - determine winner based on format
    let winnerId: string | null = null;

    if (game.format === 'FASTEST_CODE' && game.submissions.length > 0) {
      // Winner is whoever submitted first passing solution
      winnerId = game.submissions[0].userId;
    } else if (game.format === 'SHORTEST_CODE') {
      // Find shortest passing solution
      const shortestSubmission = await prisma.submission.findFirst({
        where: {
          gameId,
          isPassing: true,
        },
        orderBy: {
          codeLength: 'asc',
        },
      });
      winnerId = shortestSubmission?.userId || null;
    }

    // Update game status
    await prisma.game.update({
      where: { id: gameId },
      data: {
        status: 'COMPLETED',
        endTime: new Date(),
        winnerId,
      },
    });

    // Update participants
    if (winnerId) {
      await prisma.gameParticipant.updateMany({
        where: { gameId, userId: winnerId },
        data: { placement: 1, score: 100 },
      });

      await prisma.user.update({
        where: { id: winnerId },
        data: {
          gamesPlayed: { increment: 1 },
          gamesWon: { increment: 1 },
          rating: { increment: 25 },
        },
      });

      // Update other participants as losers
      const loserIds = game.participants
        .filter(p => p.userId !== winnerId)
        .map(p => p.userId);

      for (const loserId of loserIds) {
        await prisma.gameParticipant.updateMany({
          where: { gameId, userId: loserId },
          data: { placement: 2, score: 0 },
        });

        await prisma.user.update({
          where: { id: loserId },
          data: {
            gamesPlayed: { increment: 1 },
            rating: { decrement: 10 },
          },
        });
      }
    } else {
      // No winner - it's a draw
      await prisma.gameParticipant.updateMany({
        where: { gameId },
        data: { placement: 1, score: 50 },
      });

      for (const participant of game.participants) {
        await prisma.user.update({
          where: { id: participant.userId },
          data: { gamesPlayed: { increment: 1 } },
        });
      }
    }
  }
}

export async function getGameTimeStatus(gameId: string) {
  try {
    const game = await prisma.game.findUnique({
      where: { id: gameId },
      select: {
        status: true,
        durationMinutes: true,
        startTime: true,
        endTime: true,
      },
    });

    if (!game) {
      return { success: false, error: 'Game not found' };
    }

    let timeRemaining = null;
    let isExpired = false;

    if (game.startTime && game.status === 'IN_PROGRESS') {
      const elapsedSeconds = Math.floor((Date.now() - game.startTime.getTime()) / 1000);
      const totalSeconds = game.durationMinutes * 60;
      timeRemaining = Math.max(0, totalSeconds - elapsedSeconds);
      isExpired = timeRemaining === 0;

      // Trigger expiration check if time is up
      if (isExpired) {
        await checkGameTimeExpiration(gameId);
      }
    }

    return {
      success: true,
      status: game.status,
      durationMinutes: game.durationMinutes,
      startTime: game.startTime,
      endTime: game.endTime,
      timeRemaining,
      isExpired,
    };
  } catch (error) {
    console.error('Get game time status error:', error);
    return { success: false, error: 'An error occurred' };
  }
}

export async function getCurrentGame() {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return null;
    }

    const participant = await prisma.gameParticipant.findFirst({
      where: {
        userId: user.userId,
        game: {
          status: {
            in: ['WAITING', 'IN_PROGRESS'],
          },
        },
      },
      include: {
        game: {
          include: {
            challenge: true,
            participants: {
              include: {
                user: {
                  select: {
                    id: true,
                    username: true,
                    rating: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!participant) {
      return null;
    }

    const timeRemaining = participant.game.startTime && participant.game.status === 'IN_PROGRESS'
      ? Math.max(0, participant.game.durationMinutes * 60 - Math.floor((Date.now() - participant.game.startTime.getTime()) / 1000))
      : null;

    return {
      id: participant.game.id,
      format: participant.game.format,
      status: participant.game.status,
      durationMinutes: participant.game.durationMinutes,
      startTime: participant.game.startTime,
      timeRemaining,
      challenge: {
        id: participant.game.challenge.id,
        title: participant.game.challenge.title,
        description: participant.game.challenge.description,
        difficulty: participant.game.challenge.difficulty,
        starterCode: participant.game.challenge.starterCode,
      },
      participants: participant.game.participants.map(p => ({
        userId: p.user.id,
        username: p.user.username,
        rating: p.user.rating,
        joinedAt: p.joinedAt,
      })),
    };
  } catch (error) {
    console.error('Get current game error:', error);
    return null;
  }
}
