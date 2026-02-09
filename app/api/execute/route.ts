// ============================================================
// POST /api/execute — Run code via Piston (standalone, no match)
// GET /api/execute — Get available runtimes
// ============================================================
// Useful for testing code before submitting in a match.

import { NextRequest, NextResponse } from "next/server";
import { getUserFromRequest } from "@/lib/auth";
import { runCode, getRuntimes } from "@/lib/piston";

export async function POST(req: NextRequest) {
  const payload = getUserFromRequest(req);
  if (!payload) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { language, code, stdin = "" } = body;

    if (!language || !code) {
      return NextResponse.json(
        { error: "language and code are required" },
        { status: 400 }
      );
    }

    const result = await runCode(language, code, stdin);

    return NextResponse.json({
      stdout: result.run.stdout,
      stderr: result.run.stderr,
      exitCode: result.run.code,
      output: result.run.output,
    });
  } catch (error: any) {
    console.error("Execute error:", error);
    return NextResponse.json(
      { error: error.message || "Execution failed" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const runtimes = await getRuntimes();
    return NextResponse.json({ runtimes });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to fetch runtimes" },
      { status: 500 }
    );
  }
}
