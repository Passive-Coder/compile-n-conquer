'use server';

import { getCurrentUser } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { GameFormat, Difficulty } from '@prisma/client';

export type MatchmakingResult = {
  success: boolean;
  error?: string;
  gameId?: string;
  joined?: boolean;
};

export async function findMatch(
  format: GameFormat,
  difficulty?: Difficulty,
  durationMinutes: number = 10
): Promise<MatchmakingResult> {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return { success: false, error: 'Not authenticated' };
    }

    // Check if user is already in an active game
    const activeGame = await prisma.gameParticipant.findFirst({
      where: {
        userId: user.userId,
        game: {
          status: {
            in: ['WAITING', 'IN_PROGRESS'],
          },
        },
      },
      include: {
        game: true,
      },
    });

    if (activeGame) {
      return {
        success: true,
        gameId: activeGame.gameId,
        joined: true,
      };
    }

    // Look for an available game with the same format
    const availableGame = await prisma.game.findFirst({
      where: {
        format,
        status: 'WAITING',
        participants: {
          some: {},
        },
      },
      include: {
        participants: true,
        challenge: true,
      },
    });

    if (availableGame && availableGame.participants.length < availableGame.maxPlayers) {
      // Join existing game
      await prisma.gameParticipant.create({
        data: {
          gameId: availableGame.id,
          userId: user.userId,
        },
      });

      // If game is now full, start it
      if (availableGame.participants.length + 1 >= availableGame.maxPlayers) {
        await prisma.game.update({
          where: { id: availableGame.id },
          data: {
            status: 'IN_PROGRESS',
            startTime: new Date(),
          },
        });
      }

      return {
        success: true,
        gameId: availableGame.id,
        joined: true,
      };
    }

    // Create a new game
    // First, find a suitable challenge
    const challengeWhere = difficulty
      ? { difficulty }
      : {};

    const challenges = await prisma.challenge.findMany({
      where: challengeWhere,
    });

    if (challenges.length === 0) {
      return { success: false, error: 'No challenges available' };
    }

    // Pick a random challenge
    const challenge = challenges[Math.floor(Math.random() * challenges.length)];

    // Create game
    const game = await prisma.game.create({
      data: {
        format,
        challengeId: challenge.id,
        maxPlayers: 2,
        durationMinutes,
      },
    });

    // Join the game
    await prisma.gameParticipant.create({
      data: {
        gameId: game.id,
        userId: user.userId,
      },
    });

    return {
      success: true,
      gameId: game.id,
      joined: true,
    };
  } catch (error) {
    console.error('Matchmaking error:', error);
    return { success: false, error: 'An error occurred during matchmaking' };
  }
}

export async function cancelMatchmaking(gameId: string): Promise<{ success: boolean; error?: string }> {
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

    if (game.status !== 'WAITING') {
      return { success: false, error: 'Cannot cancel a game in progress' };
    }

    // Remove participant
    await prisma.gameParticipant.deleteMany({
      where: {
        gameId,
        userId: user.userId,
      },
    });

    // If no participants left, delete the game
    const remainingParticipants = await prisma.gameParticipant.count({
      where: { gameId },
    });

    if (remainingParticipants === 0) {
      await prisma.game.delete({
        where: { id: gameId },
      });
    }

    return { success: true };
  } catch (error) {
    console.error('Cancel matchmaking error:', error);
    return { success: false, error: 'An error occurred while canceling' };
  }
}

export async function getQueueStatus() {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return null;
    }

    const participant = await prisma.gameParticipant.findFirst({
      where: {
        userId: user.userId,
        game: {
          status: 'WAITING',
        },
      },
      include: {
        game: {
          include: {
            participants: true,
            challenge: true,
          },
        },
      },
    });

    if (!participant) {
      return null;
    }

    return {
      gameId: participant.game.id,
      format: participant.game.format,
      currentPlayers: participant.game.participants.length,
      maxPlayers: participant.game.maxPlayers,
      challengeTitle: participant.game.challenge.title,
      difficulty: participant.game.challenge.difficulty,
    };
  } catch (error) {
    console.error('Get queue status error:', error);
    return null;
  }
}
