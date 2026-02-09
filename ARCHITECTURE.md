# Compile-n-Conquer — Evaluation Pipeline Architecture

## Overview

A competitive coding platform where users compete in rounds by solving coding questions. Submissions are evaluated by an LLM pipeline (via Backboard.io) across multiple metrics, scored with configurable weights, and ranked with tiebreaker logic.

---

## Core Concepts

| Term | Definition |
|---|---|
| **Round** | A competitive session containing N questions |
| **Submission** | A single user's code answer to one question |
| **Evaluation Thread** | A dedicated Backboard.io LLM thread for one scoring metric |
| **Memory** | Persistent Backboard.io memory tracking user skill level over time |

---

## Input Format

All submissions for a round are batched into a structured payload:

```json
{
  "roundId": "round_1",
  "questions": [
    { "id": "q1", "title": "Two Sum", "description": "...", "difficulty": "medium" },
    { "id": "q2", "title": "...", "description": "...", "difficulty": "..." },
    { "id": "q3", "title": "...", "description": "...", "difficulty": "..." }
  ],
  "submissions": [
    {
      "userId": "user_1",
      "responses": [
        { "questionId": "q1", "code": "...", "language": "python", "submittedAt": "ISO-timestamp" },
        { "questionId": "q2", "code": "...", "language": "cpp", "submittedAt": "ISO-timestamp" },
        { "questionId": "q3", "code": "...", "language": "javascript", "submittedAt": "ISO-timestamp" }
      ]
    },
    {
      "userId": "user_2",
      "responses": [/* ... */]
    },
    {
      "userId": "user_3",
      "responses": [/* ... */]
    }
  ]
}
```

---

## Evaluation Pipeline (4 LLM Threads via Backboard.io)

### Thread 1 — Time Complexity Analysis

**Purpose:** Determine the Big-O time complexity for every submission.

**Backboard Tool Definition:**
```
name: "analyze_time_complexity"
description: "Analyze and return the Big-O time complexity of the submitted code relative to the problem it solves. Return the complexity class and a numeric efficiency score (1-100) where 100 is optimal."
parameters:
  - code (string, required): The submitted source code
  - language (string, required): Programming language
  - questionContext (string, required): The problem statement for context
output:
  - complexity (string): e.g. "O(n)", "O(n log n)", "O(n²)"
  - score (number 1-100): Efficiency rating
  - reasoning (string): Brief justification
```

**Output Format:**
```json
{
  "roundId": "round_1",
  "metric": "time_complexity",
  "results": {
    "user_1": [
      { "questionId": "q1", "complexity": "O(n)", "score": 92, "reasoning": "..." },
      { "questionId": "q2", "complexity": "O(n log n)", "score": 85, "reasoning": "..." },
      { "questionId": "q3", "complexity": "O(n²)", "score": 40, "reasoning": "..." }
    ],
    "user_2": [/* ... */],
    "user_3": [/* ... */]
  }
}
```

---

### Thread 2 — Space Complexity Analysis

**Purpose:** Determine the Big-O space complexity for every submission.

**Backboard Tool Definition:**
```
name: "analyze_space_complexity"
description: "Analyze and return the Big-O space complexity of the submitted code. Consider auxiliary space used (not input space). Return the complexity class and a numeric efficiency score (1-100)."
parameters:
  - code (string, required): The submitted source code
  - language (string, required): Programming language
  - questionContext (string, required): The problem statement for context
output:
  - complexity (string): e.g. "O(1)", "O(n)", "O(n²)"
  - score (number 1-100): Efficiency rating
  - reasoning (string): Brief justification
```

**Output Format:** Same structure as Thread 1, with `"metric": "space_complexity"`.

---

### Thread 3 — Originality & Context Relevance Analysis

**Purpose:** Detect likely GPT-generated / copy-pasted code and evaluate how relevant the solution is to the actual question.

**Scoring Criteria:**
- **Comment density:** Excessive/formulaic comments → likely AI-generated (penalize)
- **Code style consistency:** Unusual variable naming patterns, overly verbose docstrings
- **Relevance:** Does the code actually solve the given problem, or is it tangential?
- **Pattern detection:** Boilerplate patterns common in LLM outputs

**Backboard Tool Definition:**
```
name: "analyze_originality"
description: "Analyze code for originality signals. Check comment density (high = likely AI-generated), code style patterns, and relevance to the problem. Return an originality score (1-10) and a relevance score (1-10)."
parameters:
  - code (string, required): The submitted source code
  - language (string, required): Programming language
  - questionContext (string, required): The problem statement
output:
  - originalityScore (number 1-10): 10 = clearly human-written, 1 = clearly AI-generated
  - relevanceScore (number 1-10): 10 = perfectly solves the problem, 1 = completely unrelated
  - commentDensity (number): Comments-to-code ratio percentage
  - flags (string[]): e.g. ["excessive_comments", "boilerplate_docstrings", "generic_variable_names"]
  - reasoning (string): Brief justification
```

**Output Format:**
```json
{
  "roundId": "round_1",
  "metric": "originality",
  "results": {
    "user_1": [
      {
        "questionId": "q1",
        "originalityScore": 8,
        "relevanceScore": 9,
        "commentDensity": 12.5,
        "flags": [],
        "reasoning": "..."
      }
    ]
  }
}
```

---

### Thread 4 — Final Ranking (Aggregation Thread)

**Purpose:** Consume the outputs of Threads 1-3, apply weights, integrate test-case pass rates from DB, and produce final rankings.

**Backboard Tool Definition:**
```
name: "compute_final_ranking"
description: "Given all metric scores for all users in a round, compute weighted final scores and produce a ranking. Apply the provided weights. In case of a tie, use the tiebreaker metric (time taken)."
parameters:
  - timeComplexityResults (object, required): Output from Thread 1
  - spaceComplexityResults (object, required): Output from Thread 2
  - originalityResults (object, required): Output from Thread 3
  - testCaseResults (object, required): { userId: { passed: N, total: M } } from DB
  - weights (object, required): { timeComplexity, spaceComplexity, originality, testCases }
  - tiebreakerData (object, required): { userId: timeTakenMs } for each user
output:
  - rankings (array): Ordered list of { userId, rank, finalScore, breakdown }
```

---

## Scoring Formula

```
finalScore = (TC_score × W_tc) + (SC_score × W_sc) + (originality_score × W_orig) + (testCase_score × W_test)
```

**Default Weights:**
| Metric | Weight | Max Raw Score | Normalized To |
|---|---|---|---|
| Time Complexity | 25% | 100 per question | 0-25 |
| Space Complexity | 20% | 100 per question | 0-20 |
| Originality + Relevance | 15% | 10 per question | 0-15 |
| Test Cases Passed | 40% | 100% pass rate | 0-40 |

**Total Max Score:** 100 per question, averaged across all questions in the round.

**Tiebreaker:** If two users have the same final score, the user who submitted in less total time ranks higher.

---

## Memory System (`/memory`)

Tracks persistent user profiles across rounds for adaptive difficulty and skill classification.

**Skill Tiers:**
| Tier | Criteria |
|---|---|
| Beginner | Avg score < 30, struggles with basic DS |
| Intermediate | Avg score 30-60, consistent O(n²) or better |
| Advanced | Avg score 60-85, uses optimal approaches often |
| Pro | Avg score 85+, consistently optimal TC/SC |

**Memory stores:**
- Historical round scores and progression trend
- Common error patterns (off-by-one, TLE, MLE)
- Preferred algorithms and languages
- Skill tier + promotion/demotion history
- Personalized coaching recommendations

**Promotion Logic:**
- 3 consecutive rounds with avg score in next tier → promote
- 2 consecutive rounds below current tier threshold → demote
- Memory is queried at round start to set adaptive difficulty

---

## API Endpoints

### `POST /api/assistant` — Evaluation Pipeline

**Request:**
```json
{
  "roundId": "round_1",
  "action": "evaluate",
  "submissions": [/* full round submissions payload */],
  "weights": { "timeComplexity": 0.25, "spaceComplexity": 0.20, "originality": 0.15, "testCases": 0.40 },
  "testCaseResults": { "user_1": { "passed": 8, "total": 10 }, ... },
  "tiebreakerData": { "user_1": 145000, ... }
}
```

**Response:**
```json
{
  "success": true,
  "roundId": "round_1",
  "evaluationId": "eval_xxx",
  "rankings": [
    {
      "rank": 1,
      "userId": "user_2",
      "finalScore": 87.5,
      "breakdown": {
        "timeComplexity": { "avgScore": 90, "weighted": 22.5 },
        "spaceComplexity": { "avgScore": 85, "weighted": 17.0 },
        "originality": { "avgScore": 8.5, "weighted": 12.75 },
        "testCases": { "passRate": 0.9, "weighted": 36.0 }
      },
      "timeTakenMs": 120000
    }
  ],
  "threadIds": {
    "timeComplexity": "thread_tc_xxx",
    "spaceComplexity": "thread_sc_xxx",
    "originality": "thread_orig_xxx",
    "ranking": "thread_rank_xxx"
  }
}
```

### `POST /api/memory` — Player Profile Memory

**Actions:** `initialize`, `update`, `retrieve`, `classify`

---

## Execution Flow Diagram

```
Round Ends → Collect All Submissions
       │
       ├──→ Thread 1: Time Complexity Analysis ──→ Store TC Results
       ├──→ Thread 2: Space Complexity Analysis ──→ Store SC Results
       ├──→ Thread 3: Originality Analysis ────────→ Store Orig Results
       │         (Threads 1-3 run in parallel)
       │
       ▼
  Thread 4: Aggregation & Ranking
       │
       ├── Fetch test case pass rates from DB
       ├── Apply scoring weights
       ├── Handle tiebreakers (time taken)
       │
       ▼
  Final Rankings Published
       │
       ▼
  /memory: Update user profiles & skill tiers
```

---

## Mock Testing Strategy

All evaluation logic is testable without live Backboard API calls:

1. **Unit tests for scoring math** — Weight application, normalization, tiebreaker logic
2. **Mock LLM responses** — Predefined tool call outputs for each thread
3. **End-to-end pipeline test** — Full round with 3 mock users, 3 questions, verify ranking order
4. **Edge cases** — Tied scores, empty submissions, single user, all-zero scores
5. **Memory classification test** — Verify tier promotion/demotion with historical mock data
