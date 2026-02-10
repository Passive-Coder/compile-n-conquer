import { NextRequest, NextResponse } from 'next/server';
import { BackboardClient } from 'backboard-sdk';

// Type for non-streamed message responses
type BBMessageResponse = {
  content: string;
  status: string;
  threadId: string;
  memoryOperationId?: string;
};

// Mock/Placeholder for user database operations (replace with actual Prisma calls later)
const mockUserData = {
  getUserProfile: (userId: string) => ({
    id: userId,
    username: `user_${userId}`,
    pastPerformance: "Student at VIT, intermediate competitive programmer",
    commonErrors: [
      "Off-by-one errors in array indexing",
      "Inefficient nested loops leading to O(n²) complexity",
      "Missing edge case handling for empty inputs"
    ],
    preferredAlgorithms: [
      "Dynamic Programming",
      "Binary Search",
      "Two Pointers technique"
    ],
    skillLevel: "intermediate",
    totalMatches: 15,
    winRate: 0.67,
    averageComplexity: "O(n log n)",
    learningGoals: [
      "Improve graph algorithm understanding",
      "Master advanced DP patterns",
      "Reduce time complexity in solutions"
    ]
  }),
  updateUserMemorySession: (userId: string, memoryData: any) => {
    console.log(`Mock: Updated memory session for user ${userId}`, memoryData);
    return { success: true, lastUpdated: new Date().toISOString() };
  }
};

export async function POST(req: NextRequest) {
  try {
    // Parse request body
    const body = await req.json();
    const { userId, action, memoryContext } = body;

    // Validate required fields
    if (!userId || !action) {
      return NextResponse.json(
        { error: 'Missing required fields: userId, action' },
        { status: 400 }
      );
    }

    // Validate action type
    if (!['update', 'initialize', 'retrieve'].includes(action)) {
      return NextResponse.json(
        { error: 'Invalid action. Must be: update, initialize, or retrieve' },
        { status: 400 }
      );
    }

    if (!process.env.BACKBOARD_API_KEY) {
      return NextResponse.json(
        { error: 'Backboard API key not configured' },
        { status: 500 }
      );
    }

    // Initialize Backboard client
    const client = new BackboardClient({
      apiKey: process.env.BACKBOARD_API_KEY
    });

    // Create or retrieve assistant for memory management
    const assistant = await client.createAssistant({
      name: "Compile-n-Conquer Player Profile Manager",
      system_prompt: `You are the Player Profile Manager for Compile-n-Conquer. 
      You maintain persistent memory about each player's:
      - Coding patterns and preferred algorithms
      - Common mistakes and learning areas
      - Performance history and skill progression
      - Personalized coaching recommendations
      
      Use this information to provide personalized feedback and adaptive difficulty.
      Always maintain context about the player's journey and growth areas.`
    });

    // Mock: Get user profile data (replace with actual Prisma call)
    const userProfile = mockUserData.getUserProfile(userId);

    let result;

    switch (action) {
      case 'initialize':
      case 'update':
        // Create a thread for memory management
        const thread = await client.createThread(assistant.assistantId);

        // Prepare memory context
        const contextToStore = memoryContext || {
          userProfile,
          timestamp: new Date().toISOString(),
          sessionType: 'profile_update'
        };

        // Build comprehensive memory message
        const memoryMessage = `
Player Profile Update for User ${userId}:

**Background:** ${userProfile.pastPerformance}

**Skill Assessment:**
- Level: ${userProfile.skillLevel}
- Total Matches: ${userProfile.totalMatches}
- Win Rate: ${(userProfile.winRate * 100).toFixed(1)}%
- Average Complexity: ${userProfile.averageComplexity}

**Common Challenges:**
${userProfile.commonErrors.map(error => `- ${error}`).join('\n')}

**Strengths & Preferences:**
${userProfile.preferredAlgorithms.map(algo => `- ${algo}`).join('\n')}

**Learning Goals:**
${userProfile.learningGoals.map(goal => `- ${goal}`).join('\n')}

Remember this context for personalized coaching and adaptive difficulty in future interactions.
`;

        // Store memory with Backboard's memory feature
        const memoryResponse = await client.addMessage(thread.threadId, {
          content: memoryMessage,
          memory: "Auto", // Enable automatic memory saving
          stream: false
        }) as BBMessageResponse;

        // Mock: Update local database with memory session info
        const updateResult = mockUserData.updateUserMemorySession(userId, {
          threadId: thread.threadId,
          memoryOperationId: memoryResponse.memoryOperationId,
          contextStored: contextToStore
        });

        result = {
          action: 'updated',
          userId,
          threadId: thread.threadId,
          memoryOperationId: memoryResponse.memoryOperationId,
          userProfile,
          updateResult
        };
        break;

      case 'retrieve':
        // Create a new thread to test memory recall
        const retrieveThread = await client.createThread(assistant.assistantId);
        
        // Query what the assistant remembers about this user
        const recallResponse = await client.addMessage(retrieveThread.threadId, {
          content: `What do you remember about user ${userId}? Provide a comprehensive summary of their profile, strengths, weaknesses, and learning journey.`,
          memory: "Auto", // Search and retrieve saved memories
          stream: false
        }) as BBMessageResponse;

        result = {
          action: 'retrieved',
          userId,
          threadId: retrieveThread.threadId,
          memorizedProfile: recallResponse.content,
          currentProfile: userProfile
        };
        break;
    }

    return NextResponse.json({
      success: true,
      ...result,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Memory API Error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to process memory operation',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}