// ============================================================
// Piston Code Execution Client
// ============================================================
// Runs user code against the Piston API (self-hosted or public).

const PISTON_URL = process.env.PISTON_URL || "https://emkc.org/api/v2/piston";

// Language → Piston runtime mapping
const LANGUAGE_MAP: Record<string, { language: string; version: string }> = {
  python: { language: "python", version: "3.10.0" },
  python3: { language: "python", version: "3.10.0" },
  javascript: { language: "javascript", version: "18.15.0" },
  js: { language: "javascript", version: "18.15.0" },
  typescript: { language: "typescript", version: "5.0.3" },
  ts: { language: "typescript", version: "5.0.3" },
  cpp: { language: "c++", version: "10.2.0" },
  "c++": { language: "c++", version: "10.2.0" },
  c: { language: "c", version: "10.2.0" },
  java: { language: "java", version: "15.0.2" },
  go: { language: "go", version: "1.16.2" },
  rust: { language: "rust", version: "1.68.2" },
};

export interface PistonResult {
  run: {
    stdout: string;
    stderr: string;
    code: number;
    signal: string | null;
    output: string;
  };
  compile?: {
    stdout: string;
    stderr: string;
    code: number;
    signal: string | null;
    output: string;
  };
  language: string;
  version: string;
}

export async function runCode(
  language: string,
  code: string,
  stdin: string = ""
): Promise<PistonResult> {
  const runtime = LANGUAGE_MAP[language.toLowerCase()];

  if (!runtime) {
    throw new Error(
      `Unsupported language: ${language}. Supported: ${Object.keys(LANGUAGE_MAP).join(", ")}`
    );
  }

  const response = await fetch(`${PISTON_URL}/api/v2/execute`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      language: runtime.language,
      version: runtime.version,
      files: [{ name: `main`, content: code }],
      stdin,
      run_timeout: 10000, // 10 second timeout
      compile_timeout: 10000,
      compile_memory_limit: 256000000, // 256MB
      run_memory_limit: 256000000,
    }),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Piston execution failed (${response.status}): ${text}`);
  }

  return response.json();
}

// Get available runtimes from Piston
export async function getRuntimes(): Promise<
  Array<{ language: string; version: string; aliases: string[] }>
> {
  const response = await fetch(`${PISTON_URL}/api/v2/runtimes`);
  if (!response.ok) {
    throw new Error(`Failed to fetch runtimes: ${response.status}`);
  }
  return response.json();
}
