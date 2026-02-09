export const dynamic = "force-dynamic";

const PISTON_BASE =
  process.env.PISTON_BASE ??
  "https://k4l8m636-2000.inc1.devtunnels.ms/api/v2";

const allowedPaths = new Set(["runtimes", "execute"]);

const forward = async (
  req: Request,
  { params }: { params: { path?: string[] } },
) => {
  const path = params.path?.join("/") ?? "";
  if (!allowedPaths.has(path)) {
    return new Response("Not found", { status: 404 });
  }

  const url = `${PISTON_BASE}/${path}`;
  const headers = new Headers(req.headers);
  headers.delete("host");
  headers.delete("connection");
  headers.delete("content-length");

  const init: RequestInit = {
    method: req.method,
    headers,
    cache: "no-store",
  };

  if (req.method !== "GET" && req.method !== "HEAD") {
    init.body = await req.text();
  }

  const response = await fetch(url, init);
  const responseHeaders = new Headers(response.headers);
  responseHeaders.delete("content-encoding");

  return new Response(response.body, {
    status: response.status,
    headers: responseHeaders,
  });
};

export const GET = forward;
export const POST = forward;
