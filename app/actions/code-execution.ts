'use server';

import { getCurrentUser } from '@/lib/auth';
import { prisma } from '@/lib/db';

const JUDGE0_API_URL = process.env.JUDGE0_API_URL || 'https://judge0-ce.p.rapidapi.com';
const JUDGE0_API_KEY = process.env.JUDGE0_API_KEY;

// Language IDs for Judge0 (common ones)
export const LANGUAGE_IDS = {
  javascript: 63, // Node.js
  python: 71,     // Python 3
  java: 62,       // Java
  cpp: 54,        // C++ (GCC 9.2.0)
  c: 50,          // C (GCC 9.2.0)
  csharp: 51,     // C# (Mono 6.6.0.161)
  typescript: 74, // TypeScript
  go: 60,         // Go
  rust: 73,       // Rust
} as const;

export type LanguageKey = keyof typeof LANGUAGE_IDS;

interface TestCase {
  input: string;
  expectedOutput: string;
}

interface ExecutionResult {
  success: boolean;
  isPassing: boolean;
  executionTime?: number;
  memory?: number;
  output?: string;
  error?: string;
  testResults?: {
    passed: number;
    total: number;
    details: Array<{
      passed: boolean;
      input: string;
      expected: string;
      actual: string;
    }>;
  };
}

export async function executeCode(
  code: string,
  language: LanguageKey,
  testCases: TestCase[]
): Promise<ExecutionResult> {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return { success: false, isPassing: false, error: 'Not authenticated' };
    }

    const languageId = LANGUAGE_IDS[language];
    if (!languageId) {
      return { success: false, isPassing: false, error: 'Unsupported language' };
    }

    const results = [];
    let totalExecutionTime = 0;
    let totalMemory = 0;

    // Execute code against each test case
    for (const testCase of testCases) {
      const result = await runSingleTest(code, languageId, testCase);
      results.push(result);
      
      if (result.executionTime) totalExecutionTime += result.executionTime;
      if (result.memory) totalMemory += result.memory;
      
      // If any test fails, we can stop early
      if (!result.passed) {
        break;
      }
    }

    const passedTests = results.filter(r => r.passed).length;
    const isPassing = passedTests === testCases.length;

    return {
      success: true,
      isPassing,
      executionTime: totalExecutionTime / testCases.length,
      memory: totalMemory / testCases.length,
      testResults: {
        passed: passedTests,
        total: testCases.length,
        details: results.map((r, i) => ({
          passed: r.passed,
          input: testCases[i].input,
          expected: testCases[i].expectedOutput,
          actual: r.output || '',
        })),
      },
    };
  } catch (error) {
    console.error('Code execution error:', error);
    return { 
      success: false, 
      isPassing: false, 
      error: error instanceof Error ? error.message : 'An error occurred during code execution' 
    };
  }
}

async function runSingleTest(
  code: string,
  languageId: number,
  testCase: TestCase
): Promise<{ passed: boolean; output: string; executionTime?: number; memory?: number }> {
  try {
    // Create submission
    const submissionResponse = await fetch(`${JUDGE0_API_URL}/submissions?base64_encoded=true&wait=true`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-RapidAPI-Key': JUDGE0_API_KEY || '',
        'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com',
      },
      body: JSON.stringify({
        source_code: Buffer.from(code).toString('base64'),
        language_id: languageId,
        stdin: Buffer.from(testCase.input).toString('base64'),
      }),
    });

    if (!submissionResponse.ok) {
      throw new Error(`Judge0 API error: ${submissionResponse.status}`);
    }

    const submission = await submissionResponse.json();
    
    // Decode output
    const output = submission.stdout 
      ? Buffer.from(submission.stdout, 'base64').toString('utf-8').trim()
      : '';
    
    const stderr = submission.stderr
      ? Buffer.from(submission.stderr, 'base64').toString('utf-8')
      : '';
    
    const compileOutput = submission.compile_output
      ? Buffer.from(submission.compile_output, 'base64').toString('utf-8')
      : '';

    // Check if there were errors
    if (submission.status.id === 6) { // Compilation Error
      return { passed: false, output: compileOutput };
    }
    
    if (submission.status.id === 11 || submission.status.id === 12) { // Runtime Error
      return { passed: false, output: stderr || 'Runtime error' };
    }

    if (submission.status.id === 13) { // Internal Error
      return { passed: false, output: 'Internal error' };
    }

    // Compare output
    const expectedTrimmed = testCase.expectedOutput.trim();
    const actualTrimmed = output.trim();
    const passed = actualTrimmed === expectedTrimmed;

    return {
      passed,
      output: actualTrimmed,
      executionTime: submission.time ? parseFloat(submission.time) * 1000 : undefined, // Convert to ms
      memory: submission.memory ? parseInt(submission.memory) : undefined,
    };
  } catch (error) {
    console.error('Test execution error:', error);
    return { 
      passed: false, 
      output: error instanceof Error ? error.message : 'Test execution failed' 
    };
  }
}

export async function submitSolution(
  gameId: string,
  code: string,
  language: LanguageKey
): Promise<{ success: boolean; error?: string; submission?: any }> {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return { success: false, error: 'Not authenticated' };
    }

    // Get game and challenge
    const game = await prisma.game.findUnique({
      where: { id: gameId },
      include: { challenge: true },
    });

    if (!game) {
      return { success: false, error: 'Game not found' };
    }

    if (game.status !== 'IN_PROGRESS') {
      return { success: false, error: 'Game is not in progress' };
    }

    // Check if time has expired
    if (game.startTime) {
      const elapsedMinutes = (Date.now() - game.startTime.getTime()) / (1000 * 60);
      if (elapsedMinutes >= game.durationMinutes) {
        return { success: false, error: 'Game time has expired' };
      }
    }

    // Parse test cases
    const testCases: TestCase[] = JSON.parse(game.challenge.testCases);

    // Execute code
    const result = await executeCode(code, language, testCases);

    if (!result.success) {
      return { success: false, error: result.error };
    }

    // Create submission
    const submission = await prisma.submission.create({
      data: {
        gameId,
        userId: user.userId,
        code,
        language,
        isPassing: result.isPassing,
        executionTime: result.executionTime,
        codeLength: code.length,
      },
    });

    // If this is a passing solution and it's the first one, they might win
    if (result.isPassing && game.format === 'FASTEST_CODE') {
      // Check if this is the first passing submission
      const firstPassing = await prisma.submission.findFirst({
        where: {
          gameId,
          isPassing: true,
        },
        orderBy: {
          submittedAt: 'asc',
        },
      });

      if (firstPassing?.id === submission.id) {
        // This player wins!
        await prisma.game.update({
          where: { id: gameId },
          data: {
            status: 'COMPLETED',
            winnerId: user.userId,
            endTime: new Date(),
          },
        });

        // Update participant score
        await prisma.gameParticipant.updateMany({
          where: {
            gameId,
            userId: user.userId,
          },
          data: {
            placement: 1,
            score: 100,
          },
        });

        // Update user stats
        await prisma.user.update({
          where: { id: user.userId },
          data: {
            gamesPlayed: { increment: 1 },
            gamesWon: { increment: 1 },
            rating: { increment: 25 },
          },
        });
      }
    }

    return {
      success: true,
      submission: {
        ...submission,
        testResults: result.testResults,
      },
    };
  } catch (error) {
    console.error('Submit solution error:', error);
    return { success: false, error: 'An error occurred during submission' };
  }
}
