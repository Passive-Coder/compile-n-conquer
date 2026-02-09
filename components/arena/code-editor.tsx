"use client"

import { useState } from "react"
import dynamic from "next/dynamic"
import { Play, RotateCcw, Send, ChevronDown } from "lucide-react"

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

const MonacoEditor = dynamic(() => import("@monaco-editor/react"), { ssr: false })

const problemStatement = {
  title: "Two Sum",
  difficulty: "Easy",
  tag: "Q1 / 5",
  description:
    "Given an array of integers nums and an integer target, return the indices of the two numbers such that they add up to target. You may assume that each input would have exactly one solution.",
  examples: [
    { input: "nums = [2,7,11,15], target = 9", output: "[0, 1]" },
    { input: "nums = [3,2,4], target = 6", output: "[1, 2]" },
  ],
  constraints: [
    "2 <= nums.length <= 10^4",
    "-10^9 <= nums[i] <= 10^9",
    "Only one valid answer exists.",
  ],
}

export function CodeEditor() {
  const [code, setCode] = useState(defaultCode)
  const [activeTab, setActiveTab] = useState<"problem" | "output">("problem")
  const [language, setLanguage] = useState("python")
  const supportedLanguages = [
    "python", "cpp", "java", "javascript", "typescript", "c", "csharp", "go", "ruby", "rust", "php", "swift", "kotlin", "scala", "perl", "r", "dart", "haskell"
  ]
  const [showLangDropdown, setShowLangDropdown] = useState(false)
  const [output, setOutput] = useState("")

  const handleRun = () => {
    setActiveTab("output")
    setOutput("Running...\n")
      const generateMockOutput = (src: string, lang: string) => {
        // Try to capture obvious prints/logs
        try {
          if (lang.includes("python")) {
            const m = src.match(/print\(([^)]+)\)\s*$/m)
            if (m && m[1]) {
              // return the literal inside print if it's a simple literal
              const inner = m[1].trim()
              if (/^\[.*\]$/.test(inner) || /^\".*\"$/.test(inner) || /^\'.*\'$/.test(inner) || /^\d+$/.test(inner)) {
                return inner.replace(/^\"|\"$|^\'|\'$/g, "")
              }
              // special-case common problem call
              if (inner.includes("two_sum")) return "[0, 1]"
            }
          }

          if (lang.includes("javascript") || lang.includes("typescript") || lang === "cpp") {
            const m = src.match(/console\.log\(([^)]+)\)\s*$/m) || src.match(/System\.out\.println\(([^)]+)\)\s*$/m) || src.match(/std::cout\s*<<\s*([^;]+);\s*$/m)
            if (m && m[1]) return m[1].replace(/^\"|\"$|^\'|\'$/g, "")
          }

          // fallback: look for a trailing literal on the last non-empty line
          const lines = src.split(/\r?\n/).map(l => l.trim()).filter(Boolean)
          const last = lines[lines.length - 1] || ""
          const lit = last.match(/^[\[\{\"\'0-9].*/)
          if (lit) return last
        } catch (e) {}
        return "[Mocked output] All test cases passed."
      }

      setTimeout(() => {
        const mock = generateMockOutput(code, language)
        setOutput(
          `> Running code in ${language}\n\n${mock}\n\n---\nTest Case 1: PASSED\nTest Case 2: PASSED\n\nExecution time: 4ms\nMemory: 14.2 MB`
        )
      }, 600)
  }

  const handleSubmit = () => {
    setActiveTab("output")
    setOutput("Submitting...\n")
    setTimeout(() => {
      setOutput(
        `$ submit solution.py\n\n[ACCEPTED]\n\nRuntime: 4ms (faster than 95.2%)\nMemory: 14.2 MB (less than 88.1%)\n\nTime Complexity: O(n)\nSpace Complexity: O(n)\n\nCode Quality Score: 87/100\n  - Naming: 9/10\n  - Readability: 9/10\n  - Efficiency: 10/10\n  - Clean Code: 8.7/10\n\n+150 XP | +25 Speed Bonus | First Blood: +50 XP`
      )
    }, 1500)
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
            onClick={() => setActiveTab("output")}
            className={`flex-1 px-4 py-2 text-xs uppercase tracking-widest transition-colors ${
              activeTab === "output"
                ? "border-b-2 border-primary bg-secondary/50 text-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Output
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto p-4">
          {activeTab === "problem" ? (
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <span className="text-xs text-primary">{problemStatement.tag}</span>
                <h2 className="text-lg font-bold text-foreground">
                  {problemStatement.title}
                </h2>
                <span className="rounded-sm border border-primary/30 bg-primary/10 px-2 py-0.5 text-xs text-primary">
                  {problemStatement.difficulty}
                </span>
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {problemStatement.description}
              </p>
              <div className="flex flex-col gap-3">
                <span className="text-xs uppercase tracking-widest text-primary">
                  {"Examples"}
                </span>
                {problemStatement.examples.map((ex, i) => (
                  <div
                    key={i}
                    className="rounded-sm border border-border bg-secondary/50 p-3"
                  >
                    <div className="text-xs text-muted-foreground">
                      <span className="text-primary">{"Input: "}</span>
                      {ex.input}
                    </div>
                    <div className="mt-1 text-xs text-muted-foreground">
                      <span className="text-primary">{"Output: "}</span>
                      {ex.output}
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-xs uppercase tracking-widest text-primary">
                  {"Constraints"}
                </span>
                <ul className="flex flex-col gap-1">
                  {problemStatement.constraints.map((c) => (
                    <li key={c} className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span className="text-primary">{">"}</span>
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <pre className="whitespace-pre-wrap text-xs leading-relaxed text-foreground">
              {output || "No output yet. Run your code to see results."}
            </pre>
          )}
        </div>
      </div>

      {/* Right panel: Code Editor */}
      <div className="flex flex-1 flex-col">
        {/* Toolbar */}
        <div className="flex items-center justify-between border-b border-border px-4 py-2">
          <div className="relative">
            <button
              onClick={() => setShowLangDropdown(!showLangDropdown)}
              className="flex items-center gap-1 text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground"
            >
              {language}
              <ChevronDown className="h-3 w-3" />
            </button>
            {showLangDropdown && (
              <div className="absolute left-0 top-full z-20 mt-1 rounded-sm border border-border bg-card py-1 shadow-lg">
                {supportedLanguages.map((lang) => (
                  <button
                    key={lang}
                    onClick={() => {
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
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCode(defaultCode)}
              className="rounded-sm border border-border p-1.5 text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground"
              aria-label="Reset code"
            >
              <RotateCcw className="h-3.5 w-3.5" />
            </button>
            <button
              onClick={handleRun}
              className="flex items-center gap-1.5 rounded-sm border border-border bg-secondary px-3 py-1.5 text-xs uppercase tracking-widest text-foreground transition-all hover:border-primary/50"
            >
              <Play className="h-3 w-3 text-primary" />
              Run
            </button>
            <button
              onClick={handleSubmit}
              className="flex items-center gap-1.5 rounded-sm border border-primary bg-primary px-3 py-1.5 text-xs uppercase tracking-widest text-primary-foreground transition-all hover:bg-primary/90"
            >
              <Send className="h-3 w-3" />
              Submit
            </button>
          </div>
        </div>

          {/* Monaco Code Editor */}
          <div className="flex-1 min-h-0">
            <MonacoEditor
              height="100%"
              defaultLanguage={language}
              language={language}
              value={code}
              onChange={(value) => setCode(value || "")}
              theme="vs-dark"
              options={{
                fontSize: 14,
                minimap: { enabled: false },
                wordWrap: "on",
                scrollBeyondLastLine: false,
                automaticLayout: true,
                lineNumbers: "on",
                fontFamily: 'Menlo, Monaco, "Fira Mono", monospace',
                renderLineHighlight: "all",
                scrollbar: {
                  vertical: "auto",
                  horizontal: "auto"
                },
                tabSize: 4,
                padding: { top: 12, bottom: 12 },
                overviewRulerLanes: 0,
                hideCursorInOverviewRuler: true,
                renderValidationDecorations: "on",
                fixedOverflowWidgets: true,
                smoothScrolling: true,
              }}
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
