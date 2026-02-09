"use client";

import { useEffect, useMemo, useState } from "react";

const PISTON_BASE = "/api/piston";

interface PistonRuntime {
  language: string;
  version: string;
  aliases: string[];
  runtime?: string;
}

interface PistonStageResult {
  stdout: string;
  stderr: string;
  output: string;
  code: number | null;
  signal: string | null;
}

interface PistonExecuteResponse {
  language: string;
  version: string;
  run: PistonStageResult;
  compile?: PistonStageResult;
}

const jsonGuard = async <T,>(res: Response): Promise<T> => {
  const contentType = res.headers.get("content-type") ?? "";
  const text = await res.text();

  if (!res.ok) {
    throw new Error(
      `Piston returned ${res.status}. ${text.slice(0, 160) || "Empty body"}`,
    );
  }

  if (!contentType.toLowerCase().includes("application/json")) {
    throw new Error(
      `Piston responded with non-JSON (content-type: ${contentType || "unknown"}). Body starts with: ${text
        .replace(/\\s+/g, " ")
        .slice(0, 160)}`,
    );
  }

  try {
    return JSON.parse(text) as T;
  } catch (err) {
    throw new Error(
      `Failed to parse Piston JSON: ${(err as Error).message}. Body starts with: ${text
        .replace(/\\s+/g, " ")
        .slice(0, 160)}`,
    );
  }
};

const baseHeaders = {
  Accept: "application/json",
};

const starterSnippets: Record<string, string> = {
  python: 'print("Hello, Piston!")',
  javascript: 'console.log("Hello, Piston!");',
  typescript: 'console.log("Hello, Piston!");',
  java: `public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, Piston!");
    }
}`,
  c: `#include <stdio.h>

int main() {
    printf("Hello, Piston!\\n");
    return 0;
}`,
  cpp: `#include <bits/stdc++.h>
using namespace std;

int main() {
    cout << "Hello, Piston!" << "\\n";
    return 0;
}`,
  go: `package main

import "fmt"

func main() {
    fmt.Println("Hello, Piston!")
}`,
  rust: `fn main() {
    println!("Hello, Piston!");
}`,
  bash: "echo \"Hello, Piston!\"",
};

const runtimeKey = (runtime: PistonRuntime) =>
  `${runtime.language}:${runtime.version}:${runtime.runtime ?? "default"}`;

const normalizeLanguage = (language: string) =>
  language.trim().toLowerCase();

const snippetForLanguage = (language: string) => {
  const key = normalizeLanguage(language);
  if (key.includes("python")) return starterSnippets.python;
  if (key.includes("typescript") || key === "ts") return starterSnippets.typescript;
  if (key.includes("javascript") || key === "js" || key.includes("node")) {
    return starterSnippets.javascript;
  }
  if (key === "java") return starterSnippets.java;
  if (key === "c") return starterSnippets.c;
  if (key.includes("c++") || key.includes("cpp")) return starterSnippets.cpp;
  if (key.includes("go")) return starterSnippets.go;
  if (key.includes("rust")) return starterSnippets.rust;
  if (key === "bash" || key === "sh" || key === "shell") return starterSnippets.bash;
  return undefined;
};

const fileNameForLanguage = (language: string) => {
  const key = normalizeLanguage(language);
  if (key.includes("python")) return "main.py";
  if (key.includes("typescript") || key === "ts") return "main.ts";
  if (key.includes("javascript") || key === "js" || key.includes("node")) {
    return "main.js";
  }
  if (key === "java") return "Main.java";
  if (key === "c") return "main.c";
  if (key.includes("c++") || key.includes("cpp")) return "main.cpp";
  if (key.includes("go")) return "main.go";
  if (key.includes("rust")) return "main.rs";
  if (key === "bash" || key === "sh" || key === "shell") return "main.sh";
  return undefined;
};

export default function Home() {
  const [code, setCode] = useState<string>(starterSnippets.python);
  const [stdin, setStdin] = useState<string>("");
  const [runtimes, setRuntimes] = useState<PistonRuntime[]>([]);
  const [selectedRuntimeKey, setSelectedRuntimeKey] = useState<string>("");
  const [result, setResult] = useState<PistonExecuteResponse | null>(null);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [runtimeError, setRuntimeError] = useState<string | null>(null);
  const [isLoadingRuntimes, setIsLoadingRuntimes] = useState<boolean>(true);

  const selectedRuntime = useMemo(() => {
    return runtimes.find((runtime) => runtimeKey(runtime) === selectedRuntimeKey) ?? null;
  }, [runtimes, selectedRuntimeKey]);

  useEffect(() => {
    let isActive = true;

    const loadRuntimes = async () => {
      setIsLoadingRuntimes(true);
      setRuntimeError(null);
      try {
        const response = await fetch(`${PISTON_BASE}/runtimes`, {
          cache: "no-store",
          headers: baseHeaders,
        });
        const data = await jsonGuard<PistonRuntime[]>(response);

        if (!isActive) return;
        setRuntimes(data);

        const defaultRuntime =
          data.find((runtime) => normalizeLanguage(runtime.language) === "python") ??
          data[0];
        if (defaultRuntime) {
          const defaultKey = runtimeKey(defaultRuntime);
          setSelectedRuntimeKey(defaultKey);
          const snippet = snippetForLanguage(defaultRuntime.language);
          if (snippet) {
            setCode((prev) =>
              prev.trim() && prev !== starterSnippets.python ? prev : snippet,
            );
          }
        }
      } catch (err: unknown) {
        if (!isActive) return;
        const message =
          err instanceof Error ? err.message : "Failed to load runtimes.";
        setRuntimeError(message);
        setRuntimes([]);
        setSelectedRuntimeKey("");
      } finally {
        if (isActive) setIsLoadingRuntimes(false);
      }
    };

    loadRuntimes();

    return () => {
      isActive = false;
    };
  }, []);

  const statusTone = useMemo(() => {
    if (isRunning) return "running" as const;
    if (error) return "error" as const;
    if (!result) return "idle" as const;

    const compileFailed = result.compile && result.compile.code !== 0;
    const runFailed = result.run.signal || (result.run.code ?? 0) !== 0;
    if (compileFailed || runFailed) return "error" as const;

    return "success" as const;
  }, [isRunning, error, result]);

  const statusText = useMemo(() => {
    if (isLoadingRuntimes) return "Loading runtimes";
    if (isRunning) return "Running";
    if (error) return "Error";
    if (!result) return "Idle";

    const compileFailed = result.compile && result.compile.code !== 0;
    if (compileFailed) return "Compile failed";
    const runFailed = result.run.signal || (result.run.code ?? 0) !== 0;
    if (runFailed) return "Runtime error";

    return "Completed";
  }, [isLoadingRuntimes, isRunning, error, result]);

  const statusColor = useMemo(() => {
    if (statusTone === "success") {
      return "bg-emerald-500/20 text-emerald-200 border-emerald-500/30";
    }
    if (statusTone === "error") {
      return "bg-rose-500/15 text-rose-200 border-rose-500/30";
    }
    if (statusTone === "running") {
      return "bg-amber-500/20 text-amber-200 border-amber-500/30";
    }
    return "bg-slate-500/20 text-slate-200 border-slate-500/30";
  }, [statusTone]);

  const handleLanguageChange = (key: string) => {
    setSelectedRuntimeKey(key);
    const runtime = runtimes.find((item) => runtimeKey(item) === key);
    if (!runtime) return;
    const snippet = snippetForLanguage(runtime.language);
    if (snippet) setCode(snippet);
  };

  const handleRun = async () => {
    if (!selectedRuntime) {
      setError("Please choose a runtime before running.");
      return;
    }
    if (!code.trim()) {
      setError("Please add some code before running.");
      return;
    }

    setIsRunning(true);
    setError(null);
    setResult(null);

    try {
      const fileName = fileNameForLanguage(selectedRuntime.language);
      const submissionRes = await fetch(`${PISTON_BASE}/execute`, {
        method: "POST",
        headers: {
          ...baseHeaders,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          language: selectedRuntime.language,
          version: selectedRuntime.version,
          files: [
            {
              ...(fileName ? { name: fileName } : {}),
              content: code,
            },
          ],
          stdin,
        }),
      });

      const execution = await jsonGuard<PistonExecuteResponse>(submissionRes);
      setResult(execution);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Something went wrong.";
      setError(message);
    } finally {
      setIsRunning(false);
    }
  };

  const renderOutput = () => {
    if (error) return error;
    if (!result) return "Output will appear here once the run finishes.";

    const compileOutput = result.compile?.output?.trim();
    if (compileOutput) return compileOutput;

    const runOutput = result.run.output?.trim();
    if (runOutput) return runOutput;

    if (result.run.stderr) return result.run.stderr;
    if (result.run.stdout) return result.run.stdout;
    return "No output produced.";
  };

  const runtimeLabel = (runtime: PistonRuntime) => {
    const runtimeSuffix = runtime.runtime ? `, runtime: ${runtime.runtime}` : "";
    return `${runtime.language} (${runtime.version}${runtimeSuffix})`;
  };

  const canRun = Boolean(selectedRuntime && code.trim()) && !isRunning;

  const compileSummary = result?.compile
    ? result.compile.code === 0
      ? "ok"
      : `code ${result.compile.code ?? "?"}`
    : "n/a";

  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-50 overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,161,22,0.08),transparent_35%),radial-gradient(circle_at_80%_0%,rgba(255,255,255,0.05),transparent_25%)]" />
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-amber-500/10 via-transparent to-transparent" />

      <div className="relative z-10 mx-auto max-w-6xl px-6 pb-16 pt-10">
        <header className="flex flex-col gap-4 pb-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500 text-slate-950 font-bold shadow-lg shadow-amber-500/20">
              LC
            </div>
            <div>
              <p className="text-xl font-semibold text-amber-400">LeetCode Lab</p>
              <p className="text-sm text-slate-400">Piston-powered code runner</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <div className="text-xs uppercase tracking-wide text-slate-400">Status</div>
            <span
              className={`rounded-full border px-3 py-1 text-sm font-medium ${statusColor}`}
            >
              {statusText}
            </span>
          </div>
        </header>

        <main className="grid gap-6 lg:grid-cols-[1.65fr,1fr]">
          <section className="rounded-2xl border border-white/5 bg-slate-900/70 p-5 shadow-2xl shadow-black/40 backdrop-blur">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="flex flex-col gap-1">
                <label className="text-xs uppercase tracking-wide text-slate-400">
                  Runtime
                </label>
                <select
                  className="w-64 rounded-lg border border-white/10 bg-slate-800/80 px-3 py-2 text-sm text-slate-50 focus:border-amber-400 focus:outline-none"
                  value={selectedRuntimeKey}
                  onChange={(e) => handleLanguageChange(e.target.value)}
                >
                  {!runtimes.length && (
                    <option value="">
                      {isLoadingRuntimes ? "Loading runtimes..." : "No runtimes"}
                    </option>
                  )}
                  {runtimes.map((runtime) => (
                    <option key={runtimeKey(runtime)} value={runtimeKey(runtime)}>
                      {runtimeLabel(runtime)}
                    </option>
                  ))}
                </select>
                {runtimeError && (
                  <p className="text-xs text-rose-300">{runtimeError}</p>
                )}
              </div>
              <button
                onClick={handleRun}
                disabled={!canRun}
                className="group relative inline-flex items-center gap-3 rounded-lg bg-amber-500 px-5 py-2.5 text-slate-950 font-semibold shadow-lg shadow-amber-500/20 transition hover:translate-y-[1px] hover:shadow-amber-500/30 disabled:cursor-not-allowed disabled:opacity-70"
              >
                <span className="inline-block h-2 w-2 rounded-full bg-slate-950 animate-pulse group-disabled:animate-none" />
                {isRunning ? "Running" : "Run / Compile"}
              </button>
            </div>

            <div className="mt-6 space-y-3">
              <label className="text-sm font-medium text-amber-200">Code</label>
              <textarea
                className="h-80 w-full resize-none rounded-xl border border-white/10 bg-slate-950/70 px-4 py-3 font-mono text-sm leading-6 text-slate-100 shadow-inner shadow-black/50 focus:border-amber-400 focus:outline-none"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                spellCheck={false}
              />
            </div>

            <div className="mt-5 space-y-3">
              <label className="text-sm font-medium text-slate-200">Custom Input (stdin)</label>
              <textarea
                className="h-20 w-full resize-none rounded-xl border border-white/10 bg-slate-950/50 px-4 py-3 font-mono text-sm text-slate-100 shadow-inner shadow-black/50 focus:border-amber-400 focus:outline-none"
                value={stdin}
                onChange={(e) => setStdin(e.target.value)}
                placeholder="Optional: provide input for your program"
              />
            </div>
          </section>

          <section className="rounded-2xl border border-white/5 bg-slate-900/70 p-5 shadow-2xl shadow-black/40 backdrop-blur">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-wide text-slate-400">Label</p>
                <h2 className="text-lg font-semibold text-amber-200">Output</h2>
              </div>
              {result && (
                <span
                  className={`rounded-full border px-3 py-1 text-xs font-semibold ${statusColor}`}
                >
                  {statusText}
                </span>
              )}
            </div>

            <div className="mt-4 rounded-xl border border-white/10 bg-slate-950/70 p-4 font-mono text-sm text-slate-100 shadow-inner shadow-black/50">
              <pre className="whitespace-pre-wrap break-words">{renderOutput()}</pre>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-3 text-center text-xs text-slate-300">
              <div className="rounded-lg border border-white/10 bg-slate-950/40 px-3 py-2">
                <p className="text-slate-400">Runtime</p>
                <p className="text-amber-200 font-semibold">
                  {result ? `${result.language} ${result.version}` : "-"}
                </p>
              </div>
              <div className="rounded-lg border border-white/10 bg-slate-950/40 px-3 py-2">
                <p className="text-slate-400">Run code</p>
                <p className="text-amber-200 font-semibold">
                  {result?.run.code ?? "-"}
                </p>
              </div>
              <div className="rounded-lg border border-white/10 bg-slate-950/40 px-3 py-2">
                <p className="text-slate-400">Compile</p>
                <p className="text-amber-200 font-semibold">{compileSummary}</p>
              </div>
            </div>

            {error && (
              <p className="mt-3 rounded-lg border border-rose-500/40 bg-rose-900/40 px-3 py-2 text-sm text-rose-100">
                {error}
              </p>
            )}
          </section>
        </main>
      </div>
    </div>
  );
}
