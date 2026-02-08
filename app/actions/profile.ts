'use server';

import { prisma } from '@/lib/db';
import { getCurrentUser } from '@/lib/auth';

export async function getUserProfile(userId?: string) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return { success: false, error: 'Not authenticated' };
    }

    const targetUserId = userId || currentUser.userId;

    const user = await prisma.user.findUnique({
      where: { id: targetUserId },
      select: {
        id: true,
        username: true,
        email: targetUserId === currentUser.userId, // Only show email for own profile
        rating: true,
        gamesPlayed: true,
        gamesWon: true,
        createdAt: true,
      },
    });

    if (!user) {
      return { success: false, error: 'User not found' };
    }

    // Get recent games
    const recentGames = await prisma.game.findMany({
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
      take: 10,
    });

    const stats = {
      totalGames: user.gamesPlayed,
      wins: user.gamesWon,
      losses: user.gamesPlayed - user.gamesWon,
      winRate: user.gamesPlayed > 0 ? (user.gamesWon / user.gamesPlayed) * 100 : 0,
      rating: user.rating,
    };

    return {
      success: true,
      profile: {
        id: user.id,
        username: user.username,
        email: user.email,
        createdAt: user.createdAt,
        stats,
        recentGames: recentGames.map(g => ({
          id: g.id,
          challengeTitle: g.challenge.title,
          difficulty: g.challenge.difficulty,
          endTime: g.endTime,
          placement: g.participants[0]?.placement,
          score: g.participants[0]?.score,
          isWinner: g.winnerId === targetUserId,
        })),
      },
    };
  } catch (error) {
    console.error('Get user profile error:', error);
    return { success: false, error: 'An error occurred' };
  }
}

export async function updateProfile(data: {
  username?: string;
  email?: string;
}) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return { success: false, error: 'Not authenticated' };
    }

    // Check if username/email is already taken
    if (data.username || data.email) {
      const existing = await prisma.user.findFirst({
        where: {
          AND: [
            { id: { not: user.userId } },
            {
              OR: [
                data.username ? { username: data.username } : {},
                data.email ? { email: data.email } : {},
              ].filter(obj => Object.keys(obj).length > 0),
            },
          ],
        },
      });

      if (existing) {
        if (existing.username === data.username) {
          return { success: false, error: 'Username already taken' };
        }
        if (existing.email === data.email) {
          return { success: false, error: 'Email already registered' };
        }
      }
    }

    const updateData: any = {};
    if (data.username) updateData.username = data.username;
    if (data.email) updateData.email = data.email;

    const updatedUser = await prisma.user.update({
      where: { id: user.userId },
      data: updateData,
    });

    return {
      success: true,
      user: {
        id: updatedUser.id,
        username: updatedUser.username,
        email: updatedUser.email,
      },
    };
  } catch (error) {
    console.error('Update profile error:', error);
    return { success: false, error: 'An error occurred' };
  }
}

export async function getStats() {
  try {
    const [totalUsers, totalGames, totalSubmissions] = await Promise.all([
      prisma.user.count(),
      prisma.game.count(),
      prisma.submission.count(),
    ]);

    const activeGames = await prisma.game.count({
      where: {
        status: 'IN_PROGRESS',
      },
    });

    return {
      success: true,
      stats: {
        totalUsers,
        totalGames,
        totalSubmissions,
        activeGames,
      },
    };
  } catch (error) {
    console.error('Get stats error:', error);
    return { success: false, error: 'An error occurred' };
  }
}
