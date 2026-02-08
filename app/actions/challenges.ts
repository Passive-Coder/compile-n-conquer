'use server';

import { getCurrentUser } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { Difficulty } from '@prisma/client';

export async function getChallenges(difficulty?: Difficulty, topicId?: string) {
  try {
    const where: any = {};
    if (difficulty) where.difficulty = difficulty;
    if (topicId) where.topicId = topicId;

    const challenges = await prisma.challenge.findMany({
      where,
      include: {
        topic: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return {
      success: true,
      challenges: challenges.map(c => ({
        id: c.id,
        title: c.title,
        description: c.description,
        difficulty: c.difficulty,
        topic: {
          id: c.topic.id,
          name: c.topic.name,
        },
        createdAt: c.createdAt,
      })),
    };
  } catch (error) {
    console.error('Get challenges error:', error);
    return { success: false, error: 'An error occurred' };
  }
}

export async function getChallenge(challengeId: string) {
  try {
    const challenge = await prisma.challenge.findUnique({
      where: { id: challengeId },
      include: {
        topic: true,
      },
    });

    if (!challenge) {
      return { success: false, error: 'Challenge not found' };
    }

    return {
      success: true,
      challenge: {
        id: challenge.id,
        title: challenge.title,
        description: challenge.description,
        difficulty: challenge.difficulty,
        topic: {
          id: challenge.topic.id,
          name: challenge.topic.name,
          description: challenge.topic.description,
        },
        starterCode: challenge.starterCode,
        testCases: JSON.parse(challenge.testCases),
        createdAt: challenge.createdAt,
      },
    };
  } catch (error) {
    console.error('Get challenge error:', error);
    return { success: false, error: 'An error occurred' };
  }
}

export async function getTopics() {
  try {
    const topics = await prisma.topic.findMany({
      include: {
        _count: {
          select: { challenges: true },
        },
      },
      orderBy: {
        name: 'asc',
      },
    });

    return {
      success: true,
      topics: topics.map(t => ({
        id: t.id,
        name: t.name,
        description: t.description,
        challengeCount: t._count.challenges,
      })),
    };
  } catch (error) {
    console.error('Get topics error:', error);
    return { success: false, error: 'An error occurred' };
  }
}

export async function getUserSubmissions(gameId?: string) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return { success: false, error: 'Not authenticated' };
    }

    const where: any = {
      userId: user.userId,
    };
    if (gameId) where.gameId = gameId;

    const submissions = await prisma.submission.findMany({
      where,
      include: {
        game: {
          include: {
            challenge: {
              select: {
                title: true,
                difficulty: true,
              },
            },
          },
        },
      },
      orderBy: {
        submittedAt: 'desc',
      },
      take: 50,
    });

    return {
      success: true,
      submissions: submissions.map(s => ({
        id: s.id,
        gameId: s.gameId,
        code: s.code,
        language: s.language,
        isPassing: s.isPassing,
        executionTime: s.executionTime,
        codeLength: s.codeLength,
        submittedAt: s.submittedAt,
        challengeTitle: s.game.challenge.title,
        difficulty: s.game.challenge.difficulty,
      })),
    };
  } catch (error) {
    console.error('Get user submissions error:', error);
    return { success: false, error: 'An error occurred' };
  }
}

// Admin function to create a challenge
export async function createChallenge(data: {
  title: string;
  description: string;
  difficulty: Difficulty;
  topicId: string;
  testCases: Array<{ input: string; expectedOutput: string }>;
  starterCode?: string;
}) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return { success: false, error: 'Not authenticated' };
    }

    // In a real app, you'd check if user is admin here
    // For now, any authenticated user can create challenges

    const challenge = await prisma.challenge.create({
      data: {
        title: data.title,
        description: data.description,
        difficulty: data.difficulty,
        topicId: data.topicId,
        testCases: JSON.stringify(data.testCases),
        starterCode: data.starterCode,
      },
    });

    return {
      success: true,
      challenge: {
        id: challenge.id,
        title: challenge.title,
      },
    };
  } catch (error) {
    console.error('Create challenge error:', error);
    return { success: false, error: 'An error occurred' };
  }
}

// Admin function to create a topic
export async function createTopic(data: {
  name: string;
  description?: string;
}) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return { success: false, error: 'Not authenticated' };
    }

    const topic = await prisma.topic.create({
      data: {
        name: data.name,
        description: data.description,
      },
    });

    return {
      success: true,
      topic: {
        id: topic.id,
        name: topic.name,
      },
    };
  } catch (error) {
    console.error('Create topic error:', error);
    return { success: false, error: 'An error occurred' };
  }
}

export async function getGameSubmissions(gameId: string) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return { success: false, error: 'Not authenticated' };
    }

    const submissions = await prisma.submission.findMany({
      where: { gameId },
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
    });

    return {
      success: true,
      submissions: submissions.map(s => ({
        id: s.id,
        userId: s.user.id,
        username: s.user.username,
        language: s.language,
        isPassing: s.isPassing,
        executionTime: s.executionTime,
        codeLength: s.codeLength,
        submittedAt: s.submittedAt,
        // Only show code to the submission owner or after game is complete
        code: s.userId === user.userId ? s.code : undefined,
      })),
    };
  } catch (error) {
    console.error('Get game submissions error:', error);
    return { success: false, error: 'An error occurred' };
  }
}
