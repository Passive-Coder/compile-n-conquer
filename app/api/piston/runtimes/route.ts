import { NextResponse } from "next/server";

const PISTON_BASE =
  process.env.PISTON_BASE_URL ??
  "https://k4l8m636-2000.inc1.devtunnels.ms/api/v2";

export async function GET() {
  const upstream = await fetch(`${PISTON_BASE}/runtimes`, {
    cache: "no-store",
    headers: {
      Accept: "application/json",
      "ngrok-skip-browser-warning": "true",
    },
  });

  const body = await upstream.text();
  return new NextResponse(body, {
    status: upstream.status,
    headers: {
      "Content-Type": upstream.headers.get("content-type") ?? "application/json",
    },
  });
}
