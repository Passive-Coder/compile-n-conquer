// ============================================================
// POST /api/match/[matchId]/submit — Submit code for a question
// ============================================================
// Runs code against test cases via Piston, stores results.

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getUserFromRequest } from "@/lib/auth";
import { runCode, type PistonResult } from "@/lib/piston";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ matchId: string }> }
) {
  const payload = getUserFromRequest(req);
  if (!payload) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const { matchId } = await params;

  try {
    const body = await req.json();
    const { questionId, code, language } = body;

    if (!questionId || !code || !language) {
      return NextResponse.json(
        { error: "questionId, code, and language are required" },
        { status: 400 }
      );
    }

    // Verify match exists and is in progress
    const match = await prisma.match.findUnique({
      where: { id: matchId },
      include: {
        players: true,
        questions: { include: { question: true } },
      },
    });

    if (!match) {
      return NextResponse.json({ error: "Match not found" }, { status: 404 });
    }

    if (match.status !== "IN_PROGRESS") {
      return NextResponse.json(
        { error: `Match is ${match.status}, not accepting submissions` },
        { status: 400 }
      );
    }

    // Verify user is a player
    const isPlayer = match.players.some((p) => p.userId === payload.userId);
    if (!isPlayer) {
      return NextResponse.json(
        { error: "You are not a player in this match" },
        { status: 403 }
      );
    }

    // Find the question
    const matchQuestion = match.questions.find(
      (mq) => mq.questionId === questionId
    );
    if (!matchQuestion) {
      return NextResponse.json(
        { error: "Question not part of this match" },
        { status: 400 }
      );
    }

    const question = matchQuestion.question;

    // Run code against test cases via Piston
    let testsPassed = 0;
    let testsTotal = 0;
    let lastStdout = "";
    let lastStderr = "";
    let lastExitCode = 0;
    let execTimeMs = 0;

    const testCases = (question.testCases as Array<{
      input: string;
      expectedOutput: string;
    }>) || [];

    testsTotal = testCases.length;

    if (testsTotal > 0) {
      for (const tc of testCases) {
        const result: PistonResult = await runCode(language, code, tc.input);

        lastStdout = result.run.stdout;
        lastStderr = result.run.stderr;
        lastExitCode = result.run.code;

        // Compare output (trim whitespace)
        const actual = result.run.stdout.trim();
        const expected = tc.expectedOutput.trim();

        if (actual === expected) {
          testsPassed++;
        }
      }
    } else {
      // No test cases — just run the code once
      const result: PistonResult = await runCode(language, code);
      lastStdout = result.run.stdout;
      lastStderr = result.run.stderr;
      lastExitCode = result.run.code;
    }

    // Save submission
    const submission = await prisma.submission.create({
      data: {
        matchId,
        userId: payload.userId,
        questionId,
        code,
        language,
        charCount: code.length,
        stdout: lastStdout,
        stderr: lastStderr,
        exitCode: lastExitCode,
        execTimeMs,
        testsPassed,
        testsTotal,
      },
    });

    return NextResponse.json({
      submission: {
        id: submission.id,
        testsPassed,
        testsTotal,
        stdout: lastStdout,
        stderr: lastStderr,
        exitCode: lastExitCode,
      },
    });
  } catch (error) {
    console.error("Submit error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
