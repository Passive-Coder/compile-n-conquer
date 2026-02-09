// ============================================================
// Compile-n-Conquer — Mock Test Suite
// ============================================================
// Run: npx tsx backbaord/mock-test.ts

// NOTE: We import types directly and scoring/memory functions inline
// to avoid pulling in backboard-sdk (which has ESM export issues in tsx).
// In production, use the barrel export from ./index.ts

import {
  RoundSubmissions,
  TimeComplexityResults,
  SpaceComplexityResults,
  OriginalityResults,
  TestCaseResults,
  ScoringWeights,
  TiebreakerData,
  DEFAULT_WEIGHTS,
  PlayerProfile,
  RoundScore,
  RankedUser,
  ScoreBreakdown,
  SkillTier,
} from "./types";

// ---- Inline: computeRankingLocally (from evaluation.ts) ----

function computeRankingLocally(
  tcResults: TimeComplexityResults,
  scResults: SpaceComplexityResults,
  origResults: OriginalityResults,
  testCaseResults: TestCaseResults,
  weights: ScoringWeights,
  tiebreakerData: TiebreakerData
): RankedUser[] {
  const userIds = Object.keys(tcResults.results);
  const scored: Array<{
    userId: string;
    finalScore: number;
    breakdown: ScoreBreakdown;
    timeTakenMs: number;
  }> = [];

  for (const userId of userIds) {
    const tcScores = tcResults.results[userId] || [];
    const scScores = scResults.results[userId] || [];
    const origScores = origResults.results[userId] || [];
    const testCase = testCaseResults[userId] || { passed: 0, total: 1 };

    const avgTcScore =
      tcScores.length > 0
        ? tcScores.reduce((sum, r) => sum + r.score, 0) / tcScores.length
        : 0;
    const avgScScore =
      scScores.length > 0
        ? scScores.reduce((sum, r) => sum + r.score, 0) / scScores.length
        : 0;
    const avgOrigScore =
      origScores.length > 0
        ? origScores.reduce(
            (sum, r) =>
              sum + ((r.originalityScore + r.relevanceScore) / 2) * 10,
            0
          ) / origScores.length
        : 0;
    const testCaseScore =
      testCase.total > 0 ? (testCase.passed / testCase.total) * 100 : 0;

    const finalScore =
      avgTcScore * weights.timeComplexity +
      avgScScore * weights.spaceComplexity +
      avgOrigScore * weights.originality +
      testCaseScore * weights.testCases;

    scored.push({
      userId,
      finalScore: Math.round(finalScore * 100) / 100,
      breakdown: {
        timeComplexity: {
          avgScore: Math.round(avgTcScore * 100) / 100,
          weighted: Math.round(avgTcScore * weights.timeComplexity * 100) / 100,
        },
        spaceComplexity: {
          avgScore: Math.round(avgScScore * 100) / 100,
          weighted: Math.round(avgScScore * weights.spaceComplexity * 100) / 100,
        },
        originality: {
          avgScore: Math.round(avgOrigScore * 100) / 100,
          weighted: Math.round(avgOrigScore * weights.originality * 100) / 100,
        },
        testCases: {
          passRate: testCase.total > 0 ? testCase.passed / testCase.total : 0,
          weighted: Math.round(testCaseScore * weights.testCases * 100) / 100,
        },
      },
      timeTakenMs: tiebreakerData[userId] || Infinity,
    });
  }

  scored.sort((a, b) => {
    if (b.finalScore !== a.finalScore) return b.finalScore - a.finalScore;
    return a.timeTakenMs - b.timeTakenMs;
  });

  return scored.map((s, i) => ({ rank: i + 1, ...s }));
}

// ---- Inline: Tier functions (from memory.ts) ----

const TIER_THRESHOLDS: Record<SkillTier, { min: number; max: number }> = {
  beginner: { min: 0, max: 30 },
  intermediate: { min: 30, max: 60 },
  advanced: { min: 60, max: 85 },
  pro: { min: 85, max: 100 },
};

function classifyTier(avgScore: number): SkillTier {
  if (avgScore >= TIER_THRESHOLDS.pro.min) return "pro";
  if (avgScore >= TIER_THRESHOLDS.advanced.min) return "advanced";
  if (avgScore >= TIER_THRESHOLDS.intermediate.min) return "intermediate";
  return "beginner";
}

function evaluateTierChange(
  currentTier: SkillTier,
  roundHistory: RoundScore[]
): { newTier: SkillTier; changed: boolean; reason: string } {
  if (roundHistory.length === 0) {
    return { newTier: currentTier, changed: false, reason: "No round history" };
  }
  const tierOrder: SkillTier[] = ["beginner", "intermediate", "advanced", "pro"];
  const currentIdx = tierOrder.indexOf(currentTier);

  if (currentIdx < tierOrder.length - 1) {
    const nextTier = tierOrder[currentIdx + 1];
    const nextThreshold = TIER_THRESHOLDS[nextTier].min;
    const recentForPromotion = roundHistory.slice(-3);
    if (
      recentForPromotion.length >= 3 &&
      recentForPromotion.every((r) => r.finalScore >= nextThreshold)
    ) {
      return {
        newTier: nextTier,
        changed: true,
        reason: `3 consecutive rounds with avg score ≥ ${nextThreshold} → promoted to ${nextTier}`,
      };
    }
  }

  if (currentIdx > 0) {
    const currentThreshold = TIER_THRESHOLDS[currentTier].min;
    const recentForDemotion = roundHistory.slice(-2);
    if (
      recentForDemotion.length >= 2 &&
      recentForDemotion.every((r) => r.finalScore < currentThreshold)
    ) {
      const prevTier = tierOrder[currentIdx - 1];
      return {
        newTier: prevTier,
        changed: true,
        reason: `2 consecutive rounds with avg score < ${currentThreshold} → demoted to ${prevTier}`,
      };
    }
  }

  return { newTier: currentTier, changed: false, reason: "No tier change" };
}

function updatePlayerProfile(
  profile: PlayerProfile,
  roundScore: RoundScore
): PlayerProfile {
  const updatedHistory = [...profile.roundHistory, roundScore];
  const recentRounds = updatedHistory.slice(-5);
  const avgScore =
    recentRounds.reduce((sum, r) => sum + r.finalScore, 0) / recentRounds.length;
  const tierResult = evaluateTierChange(profile.skillTier, updatedHistory);
  const promotionHistory = [...profile.promotionHistory];
  if (tierResult.changed) {
    promotionHistory.push({
      from: profile.skillTier,
      to: tierResult.newTier,
      reason: tierResult.reason,
      changedAt: new Date().toISOString(),
    });
  }
  return {
    ...profile,
    skillTier: tierResult.newTier,
    avgScore: Math.round(avgScore * 100) / 100,
    roundHistory: updatedHistory,
    promotionHistory,
  };
}

// ============================================================
// TEST DATA — 3 users, 3 questions, 1 round
// ============================================================

const MOCK_ROUND: RoundSubmissions = {
  roundId: "round_1",
  questions: [
    {
      id: "q1",
      title: "Two Sum",
      description: "Given an array of integers and a target, return indices of two numbers that add up to the target.",
      difficulty: "easy",
    },
    {
      id: "q2",
      title: "Longest Substring Without Repeating Characters",
      description: "Find the length of the longest substring without repeating characters.",
      difficulty: "medium",
    },
    {
      id: "q3",
      title: "Merge K Sorted Lists",
      description: "Merge k sorted linked lists into one sorted linked list.",
      difficulty: "hard",
    },
  ],
  submissions: [
    {
      userId: "user_1",
      responses: [
        {
          questionId: "q1",
          language: "python",
          submittedAt: "2026-02-09T10:05:00Z",
          code: `def two_sum(nums, target):
    seen = {}
    for i, num in enumerate(nums):
        comp = target - num
        if comp in seen:
            return [seen[comp], i]
        seen[num] = i
    return []`,
        },
        {
          questionId: "q2",
          language: "python",
          submittedAt: "2026-02-09T10:15:00Z",
          code: `def length_of_longest_substring(s):
    char_set = set()
    l = 0
    result = 0
    for r in range(len(s)):
        while s[r] in char_set:
            char_set.remove(s[l])
            l += 1
        char_set.add(s[r])
        result = max(result, r - l + 1)
    return result`,
        },
        {
          questionId: "q3",
          language: "python",
          submittedAt: "2026-02-09T10:30:00Z",
          code: `import heapq
def merge_k_lists(lists):
    heap = []
    for i, l in enumerate(lists):
        if l:
            heapq.heappush(heap, (l.val, i, l))
    dummy = ListNode(0)
    curr = dummy
    while heap:
        val, i, node = heapq.heappop(heap)
        curr.next = node
        curr = curr.next
        if node.next:
            heapq.heappush(heap, (node.next.val, i, node.next))
    return dummy.next`,
        },
      ],
    },
    {
      userId: "user_2",
      responses: [
        {
          questionId: "q1",
          language: "cpp",
          submittedAt: "2026-02-09T10:03:00Z",
          code: `vector<int> twoSum(vector<int>& nums, int target) {
    // This function finds two numbers that sum to target
    // It uses a brute force approach to check all pairs
    // Time complexity: O(n^2)
    // Space complexity: O(1)
    for (int i = 0; i < nums.size(); i++) {
        // Iterate through each element
        for (int j = i + 1; j < nums.size(); j++) {
            // Check if the pair sums to target
            if (nums[i] + nums[j] == target) {
                // Return the indices
                return {i, j};
            }
        }
    }
    // Return empty if no pair found
    return {};
}`,
        },
        {
          questionId: "q2",
          language: "cpp",
          submittedAt: "2026-02-09T10:18:00Z",
          code: `int lengthOfLongestSubstring(string s) {
    unordered_set<char> chars;
    int l = 0, res = 0;
    for (int r = 0; r < s.size(); r++) {
        while (chars.count(s[r])) {
            chars.erase(s[l]);
            l++;
        }
        chars.insert(s[r]);
        res = max(res, r - l + 1);
    }
    return res;
}`,
        },
        {
          questionId: "q3",
          language: "cpp",
          submittedAt: "2026-02-09T10:28:00Z",
          code: `ListNode* mergeKLists(vector<ListNode*>& lists) {
    auto cmp = [](ListNode* a, ListNode* b) { return a->val > b->val; };
    priority_queue<ListNode*, vector<ListNode*>, decltype(cmp)> pq(cmp);
    for (auto l : lists) if (l) pq.push(l);
    ListNode dummy(0);
    ListNode* curr = &dummy;
    while (!pq.empty()) {
        curr->next = pq.top(); pq.pop();
        curr = curr->next;
        if (curr->next) pq.push(curr->next);
    }
    return dummy.next;
}`,
        },
      ],
    },
    {
      userId: "user_3",
      responses: [
        {
          questionId: "q1",
          language: "javascript",
          submittedAt: "2026-02-09T10:08:00Z",
          code: `/**
 * @param {number[]} nums - Array of integers
 * @param {number} target - Target sum
 * @returns {number[]} - Indices of two numbers
 * @description This function implements the Two Sum algorithm
 * using a hash map for O(n) time complexity
 */
function twoSum(nums, target) {
    // Create a hash map to store values and their indices
    const map = new Map();
    // Iterate through each number in the array
    for (let i = 0; i < nums.length; i++) {
        // Calculate the complement
        const complement = target - nums[i];
        // Check if complement exists in our map
        if (map.has(complement)) {
            // Return the pair of indices
            return [map.get(complement), i];
        }
        // Store current number and its index
        map.set(nums[i], i);
    }
    // Return empty array if no solution found
    return [];
}`,
        },
        {
          questionId: "q2",
          language: "javascript",
          submittedAt: "2026-02-09T10:22:00Z",
          code: `function lengthOfLongestSubstring(s) {
    let max = 0;
    for (let i = 0; i < s.length; i++) {
        let seen = new Set();
        for (let j = i; j < s.length; j++) {
            if (seen.has(s[j])) break;
            seen.add(s[j]);
            max = Math.max(max, j - i + 1);
        }
    }
    return max;
}`,
        },
        {
          questionId: "q3",
          language: "javascript",
          submittedAt: "2026-02-09T10:40:00Z",
          code: `// didnt finish this one
function mergeKLists(lists) {
    if (!lists.length) return null;
    return lists[0]; // just returning first list lol
}`,
        },
      ],
    },
  ],
};

// ---- Mock LLM Outputs (what Threads 1-3 would return) ----

const MOCK_TC_RESULTS: TimeComplexityResults = {
  roundId: "round_1",
  metric: "time_complexity",
  results: {
    user_1: [
      { questionId: "q1", complexity: "O(n)", score: 95, reasoning: "Single-pass hash map approach" },
      { questionId: "q2", complexity: "O(n)", score: 92, reasoning: "Sliding window, each char processed at most twice" },
      { questionId: "q3", complexity: "O(N log k)", score: 90, reasoning: "Min-heap with k elements" },
    ],
    user_2: [
      { questionId: "q1", complexity: "O(n²)", score: 40, reasoning: "Brute force nested loops" },
      { questionId: "q2", complexity: "O(n)", score: 92, reasoning: "Sliding window technique" },
      { questionId: "q3", complexity: "O(N log k)", score: 90, reasoning: "Priority queue approach" },
    ],
    user_3: [
      { questionId: "q1", complexity: "O(n)", score: 95, reasoning: "Hash map single pass" },
      { questionId: "q2", complexity: "O(n²)", score: 35, reasoning: "Brute force nested loop approach" },
      { questionId: "q3", complexity: "O(1)", score: 5, reasoning: "No real solution, just returns first list" },
    ],
  },
};

const MOCK_SC_RESULTS: SpaceComplexityResults = {
  roundId: "round_1",
  metric: "space_complexity",
  results: {
    user_1: [
      { questionId: "q1", complexity: "O(n)", score: 80, reasoning: "Hash map stores up to n elements" },
      { questionId: "q2", complexity: "O(min(n,m))", score: 85, reasoning: "Set bounded by alphabet size" },
      { questionId: "q3", complexity: "O(k)", score: 90, reasoning: "Heap of size k" },
    ],
    user_2: [
      { questionId: "q1", complexity: "O(1)", score: 100, reasoning: "No extra space" },
      { questionId: "q2", complexity: "O(min(n,m))", score: 85, reasoning: "Set for window chars" },
      { questionId: "q3", complexity: "O(k)", score: 90, reasoning: "Priority queue of size k" },
    ],
    user_3: [
      { questionId: "q1", complexity: "O(n)", score: 80, reasoning: "Map stores values" },
      { questionId: "q2", complexity: "O(n)", score: 70, reasoning: "New set per iteration, up to n" },
      { questionId: "q3", complexity: "O(1)", score: 100, reasoning: "No extra space (but no real solution)" },
    ],
  },
};

const MOCK_ORIG_RESULTS: OriginalityResults = {
  roundId: "round_1",
  metric: "originality",
  results: {
    user_1: [
      { questionId: "q1", originalityScore: 9, relevanceScore: 10, commentDensity: 0, flags: [], reasoning: "Clean, human-style competitive code" },
      { questionId: "q2", originalityScore: 9, relevanceScore: 10, commentDensity: 0, flags: [], reasoning: "Idiomatic sliding window" },
      { questionId: "q3", originalityScore: 8, relevanceScore: 10, commentDensity: 0, flags: [], reasoning: "Standard heap approach, well-written" },
    ],
    user_2: [
      { questionId: "q1", originalityScore: 3, relevanceScore: 9, commentDensity: 55, flags: ["excessive_comments", "boilerplate_docstrings"], reasoning: "Every line has an explanatory comment — strong GPT signal" },
      { questionId: "q2", originalityScore: 8, relevanceScore: 10, commentDensity: 0, flags: [], reasoning: "Clean competitive code" },
      { questionId: "q3", originalityScore: 8, relevanceScore: 10, commentDensity: 0, flags: [], reasoning: "Concise and idiomatic" },
    ],
    user_3: [
      { questionId: "q1", originalityScore: 2, relevanceScore: 10, commentDensity: 62, flags: ["excessive_comments", "boilerplate_docstrings", "generic_variable_names"], reasoning: "JSDoc + line-by-line comments strongly suggest AI generation" },
      { questionId: "q2", originalityScore: 7, relevanceScore: 8, commentDensity: 0, flags: [], reasoning: "Human-style brute force" },
      { questionId: "q3", originalityScore: 6, relevanceScore: 1, commentDensity: 10, flags: [], reasoning: "Honest comment about not finishing, but doesn't solve the problem" },
    ],
  },
};

const MOCK_TEST_CASES: TestCaseResults = {
  user_1: { passed: 28, total: 30 },
  user_2: { passed: 25, total: 30 },
  user_3: { passed: 15, total: 30 },
};

const MOCK_TIEBREAKER: TiebreakerData = {
  user_1: 1500000, // 25 min
  user_2: 1500000, // 25 min (same as user_1 to test tiebreaker)
  user_3: 1920000, // 32 min
};

// ============================================================
// TEST RUNNER
// ============================================================

function assert(condition: boolean, message: string) {
  if (condition) {
    console.log(`  ✅ PASS: ${message}`);
  } else {
    console.error(`  ❌ FAIL: ${message}`);
    process.exitCode = 1;
  }
}

function section(title: string) {
  console.log(`\n${"=".repeat(60)}`);
  console.log(`  ${title}`);
  console.log("=".repeat(60));
}

// ---- Test 1: Local Ranking Computation ----

function testRankingComputation() {
  section("Test 1: Ranking Computation with Default Weights");

  const rankings = computeRankingLocally(
    MOCK_TC_RESULTS,
    MOCK_SC_RESULTS,
    MOCK_ORIG_RESULTS,
    MOCK_TEST_CASES,
    DEFAULT_WEIGHTS,
    MOCK_TIEBREAKER
  );

  console.log("\n  Rankings:");
  for (const r of rankings) {
    console.log(
      `  #${r.rank} ${r.userId} — Score: ${r.finalScore} | TC: ${r.breakdown.timeComplexity.weighted} | SC: ${r.breakdown.spaceComplexity.weighted} | Orig: ${r.breakdown.originality.weighted} | Tests: ${r.breakdown.testCases.weighted}`
    );
  }

  assert(rankings.length === 3, "3 users ranked");
  assert(rankings[0].rank === 1, "Rank 1 assigned");
  assert(rankings[1].rank === 2, "Rank 2 assigned");
  assert(rankings[2].rank === 3, "Rank 3 assigned");
  assert(rankings[0].finalScore >= rankings[1].finalScore, "Rank 1 score ≥ Rank 2 score");
  assert(rankings[1].finalScore >= rankings[2].finalScore, "Rank 2 score ≥ Rank 3 score");
  assert(rankings[0].userId === "user_1", "User 1 should be ranked first (best overall)");
  assert(rankings[2].userId === "user_3", "User 3 should be ranked last (incomplete submission)");

  return rankings;
}

// ---- Test 2: Tiebreaker Logic ----

function testTiebreaker() {
  section("Test 2: Tiebreaker — Same Scores, Different Times");

  // Create identical scores for two users
  const identicalTC: TimeComplexityResults = {
    roundId: "round_tie",
    metric: "time_complexity",
    results: {
      user_a: [{ questionId: "q1", complexity: "O(n)", score: 80, reasoning: "" }],
      user_b: [{ questionId: "q1", complexity: "O(n)", score: 80, reasoning: "" }],
    },
  };
  const identicalSC: SpaceComplexityResults = {
    roundId: "round_tie",
    metric: "space_complexity",
    results: {
      user_a: [{ questionId: "q1", complexity: "O(1)", score: 90, reasoning: "" }],
      user_b: [{ questionId: "q1", complexity: "O(1)", score: 90, reasoning: "" }],
    },
  };
  const identicalOrig: OriginalityResults = {
    roundId: "round_tie",
    metric: "originality",
    results: {
      user_a: [{ questionId: "q1", originalityScore: 8, relevanceScore: 9, commentDensity: 5, flags: [], reasoning: "" }],
      user_b: [{ questionId: "q1", originalityScore: 8, relevanceScore: 9, commentDensity: 5, flags: [], reasoning: "" }],
    },
  };
  const identicalTests: TestCaseResults = {
    user_a: { passed: 9, total: 10 },
    user_b: { passed: 9, total: 10 },
  };

  // user_b was faster
  const tiebreaker: TiebreakerData = {
    user_a: 300000, // 5 min
    user_b: 180000, // 3 min — faster
  };

  const rankings = computeRankingLocally(
    identicalTC,
    identicalSC,
    identicalOrig,
    identicalTests,
    DEFAULT_WEIGHTS,
    tiebreaker
  );

  console.log("\n  Tied Rankings:");
  for (const r of rankings) {
    console.log(`  #${r.rank} ${r.userId} — Score: ${r.finalScore} | Time: ${r.timeTakenMs}ms`);
  }

  assert(rankings[0].finalScore === rankings[1].finalScore, "Scores are identical");
  assert(rankings[0].userId === "user_b", "Faster user (user_b) wins tiebreaker");
  assert(rankings[1].userId === "user_a", "Slower user (user_a) ranks second");
}

// ---- Test 3: Weight Sensitivity ----

function testWeightSensitivity() {
  section("Test 3: Weight Sensitivity — Test Cases Dominate");

  const heavyTestWeights: ScoringWeights = {
    timeComplexity: 0.05,
    spaceComplexity: 0.05,
    originality: 0.05,
    testCases: 0.85, // test cases heavily weighted
  };

  const rankings = computeRankingLocally(
    MOCK_TC_RESULTS,
    MOCK_SC_RESULTS,
    MOCK_ORIG_RESULTS,
    MOCK_TEST_CASES,
    heavyTestWeights,
    MOCK_TIEBREAKER
  );

  console.log("\n  With heavy test-case weight (85%):");
  for (const r of rankings) {
    console.log(
      `  #${r.rank} ${r.userId} — Score: ${r.finalScore} | Tests: ${r.breakdown.testCases.weighted} (${(r.breakdown.testCases.passRate * 100).toFixed(0)}%)`
    );
  }

  assert(rankings[0].userId === "user_1", "User 1 still first (highest test pass rate)");
  assert(
    rankings[0].breakdown.testCases.weighted > rankings[0].breakdown.timeComplexity.weighted,
    "Test case contribution dominates TC contribution"
  );
}

// ---- Test 4: Edge Case — Single User ----

function testSingleUser() {
  section("Test 4: Edge Case — Single User Round");

  const singleTC: TimeComplexityResults = {
    roundId: "round_solo",
    metric: "time_complexity",
    results: {
      solo_user: [{ questionId: "q1", complexity: "O(n)", score: 70, reasoning: "" }],
    },
  };
  const singleSC: SpaceComplexityResults = {
    roundId: "round_solo",
    metric: "space_complexity",
    results: {
      solo_user: [{ questionId: "q1", complexity: "O(1)", score: 100, reasoning: "" }],
    },
  };
  const singleOrig: OriginalityResults = {
    roundId: "round_solo",
    metric: "originality",
    results: {
      solo_user: [{ questionId: "q1", originalityScore: 7, relevanceScore: 8, commentDensity: 8, flags: [], reasoning: "" }],
    },
  };

  const rankings = computeRankingLocally(
    singleTC,
    singleSC,
    singleOrig,
    { solo_user: { passed: 10, total: 10 } },
    DEFAULT_WEIGHTS,
    { solo_user: 120000 }
  );

  assert(rankings.length === 1, "Single user in rankings");
  assert(rankings[0].rank === 1, "Solo user is rank 1");
  assert(rankings[0].finalScore > 0, "Score is positive");
  console.log(`  Solo user score: ${rankings[0].finalScore}`);
}

// ---- Test 5: Edge Case — Empty/Zero Submissions ----

function testZeroScores() {
  section("Test 5: Edge Case — All Zero Scores");

  const zeroTC: TimeComplexityResults = {
    roundId: "round_zero",
    metric: "time_complexity",
    results: {
      user_x: [{ questionId: "q1", complexity: "unknown", score: 0, reasoning: "No code" }],
    },
  };
  const zeroSC: SpaceComplexityResults = {
    roundId: "round_zero",
    metric: "space_complexity",
    results: {
      user_x: [{ questionId: "q1", complexity: "unknown", score: 0, reasoning: "No code" }],
    },
  };
  const zeroOrig: OriginalityResults = {
    roundId: "round_zero",
    metric: "originality",
    results: {
      user_x: [{ questionId: "q1", originalityScore: 0, relevanceScore: 0, commentDensity: 0, flags: [], reasoning: "Empty" }],
    },
  };

  const rankings = computeRankingLocally(
    zeroTC,
    zeroSC,
    zeroOrig,
    { user_x: { passed: 0, total: 10 } },
    DEFAULT_WEIGHTS,
    { user_x: 600000 }
  );

  assert(rankings.length === 1, "User still ranked");
  assert(rankings[0].finalScore === 0, "Score is zero");
}

// ---- Test 6: Tier Classification ----

function testTierClassification() {
  section("Test 6: Skill Tier Classification");

  assert(classifyTier(15) === "beginner", "Score 15 → beginner");
  assert(classifyTier(29) === "beginner", "Score 29 → beginner");
  assert(classifyTier(30) === "intermediate", "Score 30 → intermediate");
  assert(classifyTier(59) === "intermediate", "Score 59 → intermediate");
  assert(classifyTier(60) === "advanced", "Score 60 → advanced");
  assert(classifyTier(84) === "advanced", "Score 84 → advanced");
  assert(classifyTier(85) === "pro", "Score 85 → pro");
  assert(classifyTier(100) === "pro", "Score 100 → pro");
}

// ---- Test 7: Tier Promotion ----

function testTierPromotion() {
  section("Test 7: Tier Promotion Logic");

  const history: RoundScore[] = [
    { roundId: "r1", finalScore: 65, rank: 1, evaluatedAt: "" },
    { roundId: "r2", finalScore: 70, rank: 1, evaluatedAt: "" },
    { roundId: "r3", finalScore: 72, rank: 2, evaluatedAt: "" },
  ];

  const result = evaluateTierChange("intermediate", history);
  assert(result.changed === true, "Should be promoted");
  assert(result.newTier === "advanced", "Promoted to advanced");
  console.log(`  Reason: ${result.reason}`);
}

// ---- Test 8: Tier Demotion ----

function testTierDemotion() {
  section("Test 8: Tier Demotion Logic");

  const history: RoundScore[] = [
    { roundId: "r1", finalScore: 88, rank: 1, evaluatedAt: "" },
    { roundId: "r2", finalScore: 50, rank: 3, evaluatedAt: "" },
    { roundId: "r3", finalScore: 55, rank: 3, evaluatedAt: "" },
  ];

  const result = evaluateTierChange("advanced", history);
  assert(result.changed === true, "Should be demoted");
  assert(result.newTier === "intermediate", "Demoted to intermediate");
  console.log(`  Reason: ${result.reason}`);
}

// ---- Test 9: No Tier Change ----

function testNoTierChange() {
  section("Test 9: No Tier Change — Inconsistent Performance");

  const history: RoundScore[] = [
    { roundId: "r1", finalScore: 70, rank: 1, evaluatedAt: "" },
    { roundId: "r2", finalScore: 50, rank: 2, evaluatedAt: "" }, // dips below
    { roundId: "r3", finalScore: 75, rank: 1, evaluatedAt: "" },
  ];

  const result = evaluateTierChange("intermediate", history);
  assert(result.changed === false, "No change with inconsistent scores");
}

// ---- Test 10: Full Profile Update Flow ----

function testProfileUpdate() {
  section("Test 10: Full Player Profile Update");

  const profile: PlayerProfile = {
    userId: "test_user",
    skillTier: "intermediate",
    avgScore: 55,
    roundHistory: [
      { roundId: "r1", finalScore: 62, rank: 2, evaluatedAt: "" },
      { roundId: "r2", finalScore: 68, rank: 1, evaluatedAt: "" },
    ],
    commonErrors: ["Off-by-one errors"],
    preferredAlgorithms: ["Binary Search"],
    promotionHistory: [],
  };

  const newRound: RoundScore = {
    roundId: "r3",
    finalScore: 71,
    rank: 1,
    evaluatedAt: new Date().toISOString(),
  };

  const updated = updatePlayerProfile(profile, newRound);

  console.log(`  Before: ${profile.skillTier} (avg: ${profile.avgScore})`);
  console.log(`  After:  ${updated.skillTier} (avg: ${updated.avgScore})`);
  console.log(`  Rounds: ${updated.roundHistory.length}`);

  assert(updated.roundHistory.length === 3, "Round added to history");
  assert(updated.skillTier === "advanced", "Promoted to advanced after 3 rounds ≥ 60");
  assert(updated.promotionHistory.length === 1, "Promotion recorded");
  console.log(`  Promotion: ${updated.promotionHistory[0].reason}`);
}

// ---- Test 11: Score Breakdown Integrity ----

function testScoreBreakdownIntegrity() {
  section("Test 11: Score Breakdown Adds Up to Final Score");

  const rankings = computeRankingLocally(
    MOCK_TC_RESULTS,
    MOCK_SC_RESULTS,
    MOCK_ORIG_RESULTS,
    MOCK_TEST_CASES,
    DEFAULT_WEIGHTS,
    MOCK_TIEBREAKER
  );

  for (const r of rankings) {
    const sumOfWeighted =
      r.breakdown.timeComplexity.weighted +
      r.breakdown.spaceComplexity.weighted +
      r.breakdown.originality.weighted +
      r.breakdown.testCases.weighted;

    const diff = Math.abs(sumOfWeighted - r.finalScore);
    assert(
      diff < 0.02, // allow tiny floating point drift
      `${r.userId}: breakdown sum (${sumOfWeighted.toFixed(2)}) ≈ finalScore (${r.finalScore})`
    );
  }
}

// ============================================================
// RUN ALL TESTS
// ============================================================

console.log("\n🏟️  Compile-n-Conquer — Evaluation Pipeline Mock Tests\n");

testRankingComputation();
testTiebreaker();
testWeightSensitivity();
testSingleUser();
testZeroScores();
testTierClassification();
testTierPromotion();
testTierDemotion();
testNoTierChange();
testProfileUpdate();
testScoreBreakdownIntegrity();

section("SUMMARY");
console.log(
  process.exitCode
    ? "  ⚠️  Some tests FAILED. Check output above."
    : "  🎉 All tests PASSED!"
);
console.log("");
