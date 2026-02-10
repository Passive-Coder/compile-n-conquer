"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { Play, RotateCcw, ChevronDown } from "lucide-react"
import dynamic from "next/dynamic"
import { getAuthHeaders } from "@/lib/client-auth"

const MonacoEditor = dynamic(
  () => import("@monaco-editor/react").then((mod) => mod.default),
  { ssr: false },
)

const PISTON_BASE = "https://emkc.org/api/v2/piston"

interface PistonRuntime {
  language: string
  version: string
  aliases: string[]
  runtime?: string
}

interface PistonStageResult {
  stdout: string
  stderr: string
  output: string
  code: number | null
  signal: string | null
}

interface PistonExecuteResponse {
  language: string
  version: string
  run: PistonStageResult
  compile?: PistonStageResult
}

const jsonGuard = async <T,>(res: Response): Promise<T> => {
  const contentType = res.headers.get("content-type") ?? ""
  const text = await res.text()

  if (!res.ok) {
    throw new Error(
      `Piston returned ${res.status}. ${text.slice(0, 160) || "Empty body"}`,
    )
  }

  if (!contentType.toLowerCase().includes("application/json")) {
    throw new Error(
      `Piston responded with non-JSON (content-type: ${contentType || "unknown"}). Body starts with: ${text
        .replace(/\s+/g, " ")
        .slice(0, 160)}`,
    )
  }

  try {
    return JSON.parse(text) as T
  } catch (err) {
    throw new Error(
      `Failed to parse Piston JSON: ${(err as Error).message}. Body starts with: ${text
        .replace(/\s+/g, " ")
        .slice(0, 160)}`,
    )
  }
}

const baseHeaders = {
  Accept: "application/json",
}

const defaultCode = `def two_sum(nums, target):
    """
    Given an array of integers nums and
    an integer target, return indices of
    the two numbers that add up to target.
    """
    seen = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i
    return []

# Test
print(two_sum([2, 7, 11, 15], 9))
`

const starterSnippets: Record<string, string> = {
  python: defaultCode,
  javascript: 'console.log("Hello, Piston!");',
  java: `public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, Piston!");
    }
}`,
  "c++": `#include <bits/stdc++.h>
using namespace std;

int main() {
    cout << "Hello, Piston!" << "\\n";
    return 0;
}`,
}

const normalizeLanguage = (language: string) => language.trim().toLowerCase()

const snippetForLanguage = (language: string) => {
  const key = normalizeLanguage(language)
  if (key.includes("python")) return starterSnippets.python
  if (key.includes("javascript") || key === "js" || key.includes("node")) {
    return starterSnippets.javascript
  }
  if (key === "java") return starterSnippets.java
  if (key.includes("c++") || key.includes("cpp")) return starterSnippets["c++"]
  return undefined
}

const fileNameForLanguage = (language: string) => {
  const key = normalizeLanguage(language)
  if (key.includes("python")) return "main.py"
  if (key.includes("javascript") || key === "js" || key.includes("node")) {
    return "main.js"
  }
  if (key === "java") return "Main.java"
  if (key.includes("c++") || key.includes("cpp")) return "main.cpp"
  return undefined
}

const matchesLanguage = (runtime: PistonRuntime, selection: string) => {
  const target = normalizeLanguage(selection)
  const runtimeName = normalizeLanguage(runtime.language)
  const aliases = runtime.aliases?.map(normalizeLanguage) ?? []

  if (target === "c++") {
    return (
      runtimeName.includes("c++") ||
      runtimeName.includes("cpp") ||
      aliases.includes("c++") ||
      aliases.includes("cpp")
    )
  }
  if (target === "javascript") {
    return (
      runtimeName.includes("javascript") ||
      runtimeName.includes("node") ||
      aliases.includes("javascript") ||
      aliases.includes("node")
    )
  }
  return runtimeName === target || aliases.includes(target)
}

const outputFromResult = (result: PistonExecuteResponse) => {
  const compileOutput = result.compile?.output?.trim()
  if (compileOutput) return compileOutput

  const runOutput = result.run.output?.trim()
  if (runOutput) return runOutput

  if (result.run.stderr) return result.run.stderr
  if (result.run.stdout) return result.run.stdout
  return "No output produced."
}

type CodeEditorProblem = {
  title: string
  difficulty?: string
  tag?: string
  description: string
  examples?: { input: string; output: string }[]
  hiddenTests?: { input: string; output: string }[]
  constraints?: string[]
}

type CodeEditorProps = {
  problem?: CodeEditorProblem
  matchId?: string | null
  questionId?: string | null
  problemTitle?: string
  onSubmissionRecorded?: (payload: {
    questionId: string
    testsPassed: number
    testsTotal: number
  }) => void
  onCodeChange?: (code: string) => void
  onLanguageChange?: (language: string) => void
}

type SubmissionCacheItem = {
  problemTitle: string
  codeDescription: string
  submittedAt: string
  testsPassed: string
}

export function CodeEditor({
  problem,
  matchId,
  questionId,
  problemTitle,
  onSubmissionRecorded,
  onCodeChange,
  onLanguageChange,
}: CodeEditorProps) {
  const [code, setCode] = useState(defaultCode)
  const [activeTab, setActiveTab] = useState<"problem" | "input">("problem")
  const [language, setLanguage] = useState("python")
  const [showLangDropdown, setShowLangDropdown] = useState(false)
  const [output, setOutput] = useState("")
  const [customInput, setCustomInput] = useState("")
  const [runtimes, setRuntimes] = useState<PistonRuntime[]>([])
  const [runtimeError, setRuntimeError] = useState<string | null>(null)
  const [isLoadingRuntimes, setIsLoadingRuntimes] = useState(false)
  const [isRunning, setIsRunning] = useState(false)
  const [isRunningSamples, setIsRunningSamples] = useState(false)
  const [sampleError, setSampleError] = useState<string | null>(null)
  const [sampleResults, setSampleResults] = useState<
    Array<{
      input: string
      expected: string
      actual?: string
      status: "pass" | "fail" | "error" | "idle"
    }>
  >([])
  const [isRunningHidden, setIsRunningHidden] = useState(false)
  const [hiddenError, setHiddenError] = useState<string | null>(null)
  const [hiddenResults, setHiddenResults] = useState<
    Array<{
      status: "pass" | "fail" | "error" | "idle"
    }>
  >([])
  const [submissionCache, setSubmissionCache] = useState<SubmissionCacheItem[]>(
    [],
  )
  const activeProblem = problem
  const problemTag = activeProblem?.tag
  const problemDifficulty = activeProblem?.difficulty
  const activeTitle = activeProblem?.title ?? "Problem"
  const activeDescription =
    activeProblem?.description ?? "Loading problem..."
  const activeExamples = activeProblem?.examples ?? []
  const activeHiddenTests = activeProblem?.hiddenTests ?? []
  const activeConstraints = activeProblem?.constraints ?? []
  const difficultyClass = (() => {
    const normalized = problemDifficulty?.toLowerCase()
    if (normalized === "easy") {
      return "border-emerald-500/40 bg-emerald-500/10 text-emerald-300"
    }
    if (normalized === "medium") {
      return "border-amber-500/40 bg-amber-500/10 text-amber-300"
    }
    if (normalized === "hard") {
      return "border-rose-500/40 bg-rose-500/10 text-rose-300"
    }
    return "border-primary/30 bg-primary/10 text-primary"
  })()
  const saveTimerRef = useRef<number | null>(null)
  const lastTitleRef = useRef<string | null>(null)

  const storageTitle = problemTitle ?? activeProblem?.title ?? ""

  useEffect(() => {
    if (!storageTitle) return
    if (lastTitleRef.current !== storageTitle) {
      const isFirstLoad = lastTitleRef.current === null
      lastTitleRef.current = storageTitle
      if (typeof window !== "undefined") {
        const cached = window.localStorage.getItem(storageTitle)
        if (cached !== null) {
          setCode(cached)
        } else if (!isFirstLoad) {
          setCode("")
        }
      }
    }
  }, [storageTitle])
  useEffect(() => {
    if (onCodeChange) {
      onCodeChange(code)
    }
  }, [code, onCodeChange])

  useEffect(() => {
    if (onLanguageChange) {
      onLanguageChange(language)
    }
  }, [language, onLanguageChange])

  useEffect(() => {
    if (!storageTitle) return
    if (saveTimerRef.current) {
      window.clearTimeout(saveTimerRef.current)
    }
    saveTimerRef.current = window.setTimeout(() => {
      if (typeof window === "undefined") return
      window.localStorage.setItem(storageTitle, code)
    }, 3000)
    return () => {
      if (saveTimerRef.current) {
        window.clearTimeout(saveTimerRef.current)
      }
    }
  }, [code, storageTitle])

  const handleEditorWillMount = (monaco: any) => {
    monaco.editor.defineTheme("black-green", {
      base: "vs-dark",
      inherit: false,
      semanticHighlighting: false,
      rules: [
        { token: "", foreground: "FFFFFF", background: "000000" },
        { token: "comment", foreground: "FFFFFF" },
        { token: "string", foreground: "FFFFFF" },
        { token: "number", foreground: "FFFFFF" },
        { token: "keyword", foreground: "FFFFFF" },
        { token: "identifier", foreground: "FFFFFF" },
        { token: "delimiter", foreground: "FFFFFF" },
        { token: "type", foreground: "FFFFFF" },
        { token: "function", foreground: "FFFFFF" },
      ],
      colors: {
        "editor.background": "#000000",
        "editor.foreground": "#FFFFFF",
        "editorLineNumber.foreground": "#5AAA5A",
        "editorCursor.foreground": "#FFFFFF",
        "editor.selectionBackground": "#0B2A0B",
        "editor.inactiveSelectionBackground": "#082008",
        "editor.lineHighlightBackground": "#081B08",
        "editorIndentGuide.background": "#123312",
        "editorIndentGuide.activeBackground": "#39FF14",
      },
    })
  }

  const selectedRuntime = useMemo(() => {
    return runtimes.find((runtime) => matchesLanguage(runtime, language)) ?? null
  }, [language, runtimes])

  useEffect(() => {
    let isActive = true

    const loadRuntimes = async () => {
      setIsLoadingRuntimes(true)
      setRuntimeError(null)
      try {
        const response = await fetch(`${PISTON_BASE}/runtimes`, {
          cache: "no-store",
          headers: baseHeaders,
        })
        const data = await jsonGuard<PistonRuntime[]>(response)
        if (!isActive) return
        setRuntimes(data)
      } catch (err: unknown) {
        if (!isActive) return
        const message = err instanceof Error ? err.message : "Failed to load runtimes."
        setRuntimeError(message)
        setRuntimes([])
      } finally {
        if (isActive) setIsLoadingRuntimes(false)
      }
    }

    loadRuntimes()

    return () => {
      isActive = false
    }
  }, [])

  const handleRun = async () => {
    setActiveTab("input")
    setOutput("Running...\n")
    setIsRunning(true)

    if (!selectedRuntime) {
      setOutput("No runtime available for the selected language.")
      setIsRunning(false)
      return
    }

    try {
      const fileName = fileNameForLanguage(language)
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
          stdin: customInput,
        }),
      })

      const execution = await jsonGuard<PistonExecuteResponse>(submissionRes)
      setOutput(outputFromResult(execution))
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to run code."
      setOutput(`Error: ${message}`)
    } finally {
      setIsRunning(false)
    }
  }

  const handleRunSamples = async () => {
    setSampleError(null)
    const examples = activeExamples

    if (!examples || examples.length === 0) {
      setSampleError("No sample tests available for this question.")
      return
    }

    if (!selectedRuntime) {
      setSampleError("No runtime available for the selected language.")
      return
    }

    setIsRunningSamples(true)
    setSampleResults(
      examples.map((ex) => ({
        input: ex.input,
        expected: ex.output,
        status: "idle",
      })),
    )

    const fileName = fileNameForLanguage(language)
    const results: Array<{
      input: string
      expected: string
      actual?: string
      status: "pass" | "fail" | "error" | "idle"
    }> = []

    for (const ex of examples) {
      try {
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
            stdin: ex.input ?? "",
          }),
        })

        const execution = await jsonGuard<PistonExecuteResponse>(submissionRes)
        const actual = (execution.run.stdout || execution.run.output || "")
          .trim()
        const expected = (ex.output ?? "").trim()
        const status = actual === expected ? "pass" : "fail"
        results.push({
          input: ex.input,
          expected: ex.output,
          actual,
          status,
        })
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "Execution failed."
        results.push({
          input: ex.input,
          expected: ex.output,
          actual: message,
          status: "error",
        })
      }
      setSampleResults([...results])
    }

    setIsRunningSamples(false)
  }

  const handleRunHidden = async () => {
    setHiddenError(null)
    const hiddenTests = activeHiddenTests
    if (!hiddenTests || hiddenTests.length === 0) {
      setHiddenError("No hidden tests available for this question.")
      return
    }

    if (!selectedRuntime) {
      setHiddenError("No runtime available for the selected language.")
      return
    }

    setIsRunningHidden(true)
    setHiddenResults(
      hiddenTests.map(() => ({
        status: "idle",
      })),
    )

    const fileName = fileNameForLanguage(language)
    const results: Array<{
      status: "pass" | "fail" | "error" | "idle"
    }> = []

    for (const test of hiddenTests) {
      try {
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
            stdin: test.input ?? "",
          }),
        })

        const execution = await jsonGuard<PistonExecuteResponse>(submissionRes)
        const actual = (execution.run.stdout || execution.run.output || "").trim()
        const expected = (test.output ?? "").trim()
        const status = actual === expected ? "pass" : "fail"
        results.push({
          status,
        })
      } catch {
        results.push({
          status: "error",
        })
      }
      setHiddenResults([...results])
    }

    setIsRunningHidden(false)
  }

  const handleSubmit = async () => {
    setActiveTab("input")
    setOutput("Submitting...\n")

    if (!matchId || !questionId) {
      setOutput("Missing match or question context. Unable to submit.")
      return
    }

    try {
      const res = await fetch(`/api/match/${matchId}/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json", ...getAuthHeaders() },
        body: JSON.stringify({
          questionId,
          code,
          language,
        }),
      })
      const payload = await res.json().catch(() => ({}))
      if (!res.ok) {
        setOutput(payload?.error || "Submission failed.")
        return
      }

      const testsPassed = payload?.submission?.testsPassed ?? 0
      const testsTotal = payload?.submission?.testsTotal ?? 0
      const outputText =
        payload?.submission?.stdout ||
        payload?.submission?.stderr ||
        "Submitted."

      setOutput(
        `${outputText}\n\nTests: ${testsPassed}/${testsTotal}\nSubmission recorded.`,
      )

      const cacheItem: SubmissionCacheItem = {
        problemTitle: problemTitle ?? activeTitle,
        codeDescription: code,
        submittedAt: new Date().toISOString(),
        testsPassed: `${testsPassed}/${testsTotal}`,
      }

      setSubmissionCache((prev) => {
        const next = [cacheItem, ...prev]
        if (typeof window !== "undefined") {
          window.localStorage.setItem(
            "cnc.submissions",
            JSON.stringify(next),
          )
        }
        return next
      })

      if (onSubmissionRecorded && questionId) {
        onSubmissionRecorded({ questionId, testsPassed, testsTotal })
      }
    } catch (err) {
      setOutput(err instanceof Error ? err.message : "Submission failed.")
    }
  }

  return (
    <div className="flex flex-1 flex-col overflow-hidden rounded-sm border border-border bg-card lg:flex-row">
      {/* Left panel: Problem + Output */}
      <div className="flex flex-col border-b border-border lg:w-2/5 lg:border-b-0 lg:border-r">
        {/* Tabs */}
        <div className="flex border-b border-border">
          <button
            onClick={() => setActiveTab("problem")}
            className={`flex-1 px-4 py-2 text-xs uppercase tracking-widest transition-colors ${
              activeTab === "problem"
                ? "border-b-2 border-primary bg-secondary/50 text-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Problem
          </button>
          <button
            onClick={() => setActiveTab("input")}
            className={`flex-1 px-4 py-2 text-xs uppercase tracking-widest transition-colors ${
              activeTab === "input"
                ? "border-b-2 border-primary bg-secondary/50 text-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Custom Input
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto p-4">
          {activeTab === "problem" ? (
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <span className="text-xs text-primary">{problemTag}</span>
                <h2 className="text-lg font-bold text-foreground">
                  {activeTitle}
                </h2>
                {problemDifficulty && (
                  <span className={`rounded-sm border px-2 py-0.5 text-xs ${difficultyClass}`}>
                    {problemDifficulty}
                  </span>
                )}
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {activeDescription}
              </p>
              <div className="flex flex-col gap-3">
                <span className="text-xs uppercase tracking-widest text-primary">
                  {"Examples"}
                </span>
                  {activeExamples.map((ex, i) => (
                    <div
                      key={i}
                      className="rounded-sm border border-border bg-secondary/50 p-3"
                    >
                    <div className="text-xs text-primary">Input</div>
                    <pre className="mt-1 whitespace-pre-wrap text-xs text-muted-foreground">
                      {ex.input}
                    </pre>
                    <div className="mt-2 text-xs text-primary">Output</div>
                    <pre className="mt-1 whitespace-pre-wrap text-xs text-muted-foreground">
                      {ex.output}
                    </pre>
                  </div>
                ))}
              </div>
              {activeConstraints.length > 0 && (
                  <div className="flex flex-col gap-2">
                    <span className="text-xs uppercase tracking-widest text-primary">
                      {"Constraints"}
                    </span>
                    <ul className="flex flex-col gap-1">
                      {activeConstraints.map((c) => (
                        <li key={c} className="flex items-center gap-2 text-xs text-muted-foreground">
                          <span className="text-primary">{">"}</span>
                          {c}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

              <div className="mt-2 flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-widest text-primary">
                    {"Sample tests"}
                  </span>
                  <button
                    onClick={handleRunSamples}
                    disabled={isRunningSamples || isLoadingRuntimes}
                    className="rounded-sm border border-border bg-secondary px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-foreground transition hover:border-primary hover:text-primary disabled:opacity-70"
                  >
                    {isRunningSamples ? "Running..." : "Run Samples"}
                  </button>
                </div>

                {sampleError && (
                  <div className="rounded-sm border border-destructive/30 bg-destructive/10 px-3 py-2 text-xs text-destructive">
                    {sampleError}
                  </div>
                )}

                <div className="space-y-2">
                  {(sampleResults.length > 0
                    ? sampleResults
                    : activeExamples.map((ex) => ({
                        input: ex.input,
                        expected: ex.output,
                        status: "idle" as const,
                      }))
                  ).map((result, index) => (
                    <div
                      key={`${result.input}-${index}`}
                      className="rounded-sm border border-border bg-secondary/40 p-3 text-xs"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs uppercase tracking-widest text-muted-foreground">
                          {"Case " + (index + 1)}
                        </span>
                        <span
                          className={`rounded-sm border px-2 py-0.5 text-[10px] uppercase tracking-widest ${
                            result.status === "pass"
                              ? "border-primary/30 bg-primary/10 text-primary"
                              : result.status === "fail"
                              ? "border-yellow-500/30 bg-yellow-500/10 text-yellow-300"
                              : result.status === "error"
                              ? "border-rose-500/30 bg-rose-500/10 text-rose-300"
                              : "border-border bg-secondary/60 text-muted-foreground"
                          }`}
                        >
                          {result.status === "pass"
                            ? "PASS"
                            : result.status === "fail"
                            ? "FAIL"
                            : result.status === "error"
                            ? "ERROR"
                            : "NOT RUN"}
                        </span>
                      </div>
                      <div className="mt-2 text-xs text-primary">Input</div>
                      <pre className="mt-1 whitespace-pre-wrap text-xs text-muted-foreground">
                        {result.input}
                      </pre>
                      <div className="mt-2 text-xs text-primary">Expected</div>
                      <pre className="mt-1 whitespace-pre-wrap text-xs text-muted-foreground">
                        {result.expected}
                      </pre>
                      {result.status !== "idle" && (
                        <>
                          <div className="mt-2 text-xs text-primary">Actual</div>
                          <pre className="mt-1 whitespace-pre-wrap text-xs text-muted-foreground">
                            {result.actual ?? ""}
                          </pre>
                        </>
                      )}
                    </div>
                  ))}
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <span className="text-xs uppercase tracking-widest text-primary">
                    {"Hidden tests"}
                  </span>
                  <button
                    onClick={handleRunHidden}
                    disabled={isRunningHidden || isLoadingRuntimes}
                    className="rounded-sm border border-border bg-secondary px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-foreground transition hover:border-primary hover:text-primary disabled:opacity-70"
                  >
                    {isRunningHidden ? "Running..." : "Run Hidden"}
                  </button>
                </div>

                {hiddenError && (
                  <div className="rounded-sm border border-destructive/30 bg-destructive/10 px-3 py-2 text-xs text-destructive">
                    {hiddenError}
                  </div>
                )}

                <div className="space-y-2">
                  {(hiddenResults.length > 0
                    ? hiddenResults
                    : activeHiddenTests.map(() => ({
                        status: "idle" as const,
                      }))
                  ).map((result, index) => (
                    <div
                      key={`hidden-${index}`}
                      className="rounded-sm border border-border bg-secondary/40 p-3 text-xs"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs uppercase tracking-widest text-muted-foreground">
                          {"Hidden Case " + (index + 1)}
                        </span>
                        <span
                          className={`rounded-sm border px-2 py-0.5 text-[10px] uppercase tracking-widest ${
                            result.status === "pass"
                              ? "border-primary/30 bg-primary/10 text-primary"
                              : result.status === "fail"
                              ? "border-yellow-500/30 bg-yellow-500/10 text-yellow-300"
                              : result.status === "error"
                              ? "border-rose-500/30 bg-rose-500/10 text-rose-300"
                              : "border-border bg-secondary/60 text-muted-foreground"
                          }`}
                        >
                          {result.status === "pass"
                            ? "PASS"
                            : result.status === "fail"
                            ? "FAIL"
                            : result.status === "error"
                            ? "ERROR"
                            : "NOT RUN"}
                        </span>
                      </div>
                      <div className="mt-2 text-xs text-primary">Input</div>
                      <pre className="mt-1 whitespace-pre-wrap text-xs text-muted-foreground">
                        Hidden
                      </pre>
                    </div>
                  ))}
                  {!activeHiddenTests.length && (
                    <div className="rounded-sm border border-border bg-secondary/40 p-3 text-xs text-muted-foreground">
                      No hidden tests configured.
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-widest text-primary">
                  {"Custom input"}
                </span>
                <span className="text-[10px] uppercase tracking-widest text-muted-foreground">
                  {"stdin"}
                </span>
              </div>
              <textarea
                className="h-24 w-full resize-none rounded-sm border border-border bg-secondary/40 px-3 py-2 text-xs text-foreground focus:border-primary focus:outline-none"
                value={customInput}
                onChange={(event) => setCustomInput(event.target.value)}
                placeholder="Provide input for your program (optional)"
              />
              <div className="flex flex-col gap-2">
                <span className="text-xs uppercase tracking-widest text-primary">
                  {"Last output"}
                </span>
                <div className="rounded-sm border border-border bg-secondary/40 p-3">
                  <pre className="whitespace-pre-wrap text-xs leading-relaxed text-foreground">
                    {output || "No output yet. Run your code to see results."}
                  </pre>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Right panel: Code Editor */}
      <div className="flex flex-1 flex-col">
        {/* Toolbar */}
        <div className="flex items-center justify-between border-b border-border px-4 py-2">
          <div className="relative flex flex-col">
            <button
              onClick={() => setShowLangDropdown(!showLangDropdown)}
              className="flex items-center gap-1 text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground"
            >
              {language}
              <ChevronDown className="h-3 w-3" />
            </button>
            {showLangDropdown && (
              <div className="absolute left-0 top-full z-20 mt-1 rounded-sm border border-border bg-card py-1 shadow-lg">
                {["python", "c++", "java", "javascript"].map((lang) => (
                  <button
                    key={lang}
                    onClick={() => {
                      const nextSnippet = snippetForLanguage(lang)
                      const currentSnippet = snippetForLanguage(language)
                      if (
                        nextSnippet &&
                        (code.trim() === "" || code === currentSnippet)
                      ) {
                        setCode(nextSnippet)
                      }
                      setLanguage(lang)
                      setShowLangDropdown(false)
                    }}
                    className={`block w-full px-4 py-1.5 text-left text-xs uppercase tracking-widest ${
                      language === lang ? "text-primary" : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            )}
            {runtimeError && (
              <span className="mt-1 text-[10px] text-destructive">
                {runtimeError}
              </span>
            )}
            {!runtimeError && isLoadingRuntimes && (
              <span className="mt-1 text-[10px] text-muted-foreground">
                Loading runtimes...
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setCode(snippetForLanguage(language) ?? defaultCode)
              }}
              className="rounded-sm border border-border p-1.5 text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground"
              aria-label="Reset code"
            >
              <RotateCcw className="h-3.5 w-3.5" />
            </button>
            <button
              onClick={handleRun}
              disabled={isRunning || isLoadingRuntimes}
              className="flex items-center gap-1.5 rounded-sm border border-border bg-secondary px-3 py-1.5 text-xs uppercase tracking-widest text-foreground transition-all hover:border-primary/50"
            >
              <Play className="h-3 w-3 text-primary" />
              {isRunning ? "Running" : "Run"}
            </button>
            {/* Submit moved to scoreboard */}
          </div>
        </div>

        {/* Monaco Code Editor */}
        <div className="flex-1 min-h-0">
          <MonacoEditor
            height="100%"
            defaultLanguage={language === "c++" ? "cpp" : language}
            language={language === "c++" ? "cpp" : language}
            value={code}
            onChange={(value) => setCode(value || "")}
            theme="black-green"
            options={{
              fontSize: 14,
              minimap: { enabled: false },
              wordWrap: "on",
              scrollBeyondLastLine: false,
              automaticLayout: true,
            }}
            beforeMount={handleEditorWillMount}
          />
        </div>

        {/* Complexity analyzer */}
        <div className="border-t border-border px-4 py-2">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-widest text-primary">
              {"Complexity Analyzer"}
            </span>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">{"Time:"}</span>
                <span className="text-xs font-bold text-primary">{"O(n)"}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">{"Space:"}</span>
                <span className="text-xs font-bold text-primary">{"O(n)"}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
