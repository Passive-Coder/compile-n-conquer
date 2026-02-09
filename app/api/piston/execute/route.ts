import { NextResponse } from "next/server";

const PISTON_BASE =
  process.env.PISTON_BASE_URL ??
  "https://k4l8m636-2000.inc1.devtunnels.ms/api/v2";

export async function POST(request: Request) {
  const payload = await request.text();
  const upstream = await fetch(`${PISTON_BASE}/execute`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": request.headers.get("content-type") ?? "application/json",
      "ngrok-skip-browser-warning": "true",
    },
    body: payload,
  });

  const body = await upstream.text();
  return new NextResponse(body, {
    status: upstream.status,
    headers: {
      "Content-Type": upstream.headers.get("content-type") ?? "application/json",
    },
  });
}
