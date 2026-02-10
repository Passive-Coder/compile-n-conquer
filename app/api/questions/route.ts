// ============================================================
// GET /api/questions — List questions (optionally filter by mode)
// POST /api/questions — Create a new question
// ============================================================

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getUserFromRequest } from "@/lib/auth";
import { GameMode, Difficulty } from "@prisma/client";

export async function GET(req: NextRequest) {
  const payload = getUserFromRequest(req);
  if (!payload) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const mode = searchParams.get("mode") as GameMode | null;
  const difficulty = searchParams.get("difficulty") as Difficulty | null;

  try {
    const questions = await prisma.question.findMany({
      where: {
        ...(mode ? { mode } : {}),
        ...(difficulty ? { difficulty } : {}),
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ questions });
  } catch (error) {
    console.error("Questions list error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  const payload = getUserFromRequest(req);
  if (!payload) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const {
      title,
      description,
      difficulty = "MEDIUM",
      mode = "FASTEST",
      testCases,
      brokenCode,
      brokenLanguage,
      expectedOutput,
    } = body;

    if (!title || !description) {
      return NextResponse.json(
        { error: "title and description are required" },
        { status: 400 }
      );
    }

    const question = await prisma.question.create({
      data: {
        title,
        description,
        difficulty: difficulty as Difficulty,
        mode: mode as GameMode,
        testCases: testCases || null,
        brokenCode: brokenCode || null,
        brokenLanguage: brokenLanguage || null,
        expectedOutput: expectedOutput || null,
      },
    });

    return NextResponse.json({ question }, { status: 201 });
  } catch (error) {
    console.error("Question create error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
