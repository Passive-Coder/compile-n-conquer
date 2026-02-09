import { BackboardClient } from 'backboard-sdk';
import { pickRandomQuestions } from './questions.js'

let _client = null;
function getClient() {
  if (!_client) {
    _client = new BackboardClient({
      apiKey: process.env.BACKBOARD_API_KEY,
    });
  }
  return _client;
}

// ─── HELPERS ────────────────────────────────────────────────────

function stripMarkdownFences(text) {
  // Remove ```json ... ``` or ``` ... ``` wrappers
  return text.replace(/^```(?:json)?\s*/i, '').replace(/\s*```\s*$/i, '').trim();
}

// ─── SYSTEM PROMPTS ─────────────────────────────────────────────

const PLAYER_THREAD_SYSTEM_PROMPT = `You are a code analysis engine. You receive exactly 3 question-answer pairs.

For each pair, return ONLY a JSON array of 3 objects with this exact schema:
[
  { "TC": "<Big-O string>", "SC": "<Big-O string>", "Context": <1 or 0> },
  { "TC": "<Big-O string>", "SC": "<Big-O string>", "Context": <1 or 0> },
  { "TC": "<Big-O string>", "SC": "<Big-O string>", "Context": <1 or 0> }
]

Rules:
- TC = time complexity as Big-O string (e.g. "O(n)", "O(n log n)", "O(1)")
- SC = space complexity as Big-O string
- Context = 1 if the solution logically solves the given question
- Context = 0 if incorrect or unrelated
- If Context = 0, set TC = "O(inf)" and SC = "O(inf)"
- Return ONLY the JSON array. No explanations, no markdown, no extra text.`;

const COMPARISON_THREAD_SYSTEM_PROMPT = `You are a deterministic grading engine. You receive a JSON object with N players, each having 3 {TC, SC} pairs.

For each question index (0, 1, 2), independently rank players on TC, then on SC.

Ranking rules per metric (TC or SC) per question:
- Parse complexities and rank from best (lowest) to worst (highest).
- Assign points based on rank position: best gets N points, next gets N-1, ..., worst gets 1.
- If players are tied on a metric, all tied players receive the same score: the average of the positions they span, floored. If ALL players are equal, each gets floor((N+1)/2) points.
- Any player with "O(inf)" gets 0 points for that metric and is excluded from ranking.

GrQx = TC_points + SC_points for question x.

Output ONLY a JSON object:
{
  "Player1": [GrQ1, GrQ2, GrQ3],
  "Player2": [GrQ1, GrQ2, GrQ3],
  ...
}

No explanations, no markdown, no extra text. ONLY the JSON object.`;

// ─── COMPLEXITY RANKING ─────────────────────────────────────────

const COMPLEXITY_ORDER = [
  'O(1)',
  'O(log n)',
  'O(sqrt(n))',
  'O(n)',
  'O(n log n)',
  'O(n^2)',
  'O(n^3)',
  'O(2^n)',
  'O(n!)',
  'O(inf)',
];

function complexityRank(bigO) {
  const normalized = bigO.replace(/\s+/g, '').toLowerCase();
  const idx = COMPLEXITY_ORDER.findIndex(
    (c) => c.replace(/\s+/g, '').toLowerCase() === normalized
  );
  return idx === -1 ? COMPLEXITY_ORDER.length - 1 : idx;
}

// ─── DETERMINISTIC COMPARISON (APP-SIDE FALLBACK) ───────────────

function deterministicCompare(playersData) {
  // playersData: { Player1: [{TC,SC},{TC,SC},{TC,SC}], ... }
  const playerNames = Object.keys(playersData);
  const N = playerNames.length;
  const numQuestions = 3;

  const result = {};
  playerNames.forEach((p) => (result[p] = []));

  for (let q = 0; q < numQuestions; q++) {
    // Rank TC
    const tcPoints = rankMetric(playerNames, playersData, q, 'TC', N);
    // Rank SC
    const scPoints = rankMetric(playerNames, playersData, q, 'SC', N);

    playerNames.forEach((p) => {
      result[p].push(tcPoints[p] + scPoints[p]);
    });
  }

  return result;
}

function rankMetric(playerNames, playersData, questionIdx, metric, N) {
  const points = {};
  playerNames.forEach((p) => (points[p] = 0));

  // Separate O(inf) players (0 points) from valid players
  const validPlayers = [];
  playerNames.forEach((p) => {
    const val = playersData[p][questionIdx][metric];
    if (val === 'O(inf)') {
      points[p] = 0;
    } else {
      validPlayers.push({ name: p, value: val, rank: complexityRank(val) });
    }
  });

  if (validPlayers.length === 0) return points;

  // Sort by rank ascending (best first)
  validPlayers.sort((a, b) => a.rank - b.rank);

  // Assign points: best gets validPlayers.length points down to 1
  // Handle ties: tied players share the average of their positions
  let i = 0;
  while (i < validPlayers.length) {
    let j = i;
    // Find all players tied with the same rank
    while (j < validPlayers.length && validPlayers[j].rank === validPlayers[i].rank) {
      j++;
    }
    // Positions i..j-1 are tied
    // Points for position k (0-indexed) = N_valid - k  (so best=N_valid, worst=1)
    // But we use validPlayers.length instead of N so excluded O(inf) don't take slots
    const N_valid = validPlayers.length;
    let sumPoints = 0;
    for (let k = i; k < j; k++) {
      sumPoints += N_valid - k;
    }
    const sharedPoints = Math.floor(sumPoints / (j - i));

    for (let k = i; k < j; k++) {
      points[validPlayers[k].name] = sharedPoints;
    }
    i = j;
  }

  return points;
}

// ─── MATCH ENGINE ───────────────────────────────────────────────

/**
 * Creates a match assistant and returns its ID.
 */
async function createMatchAssistant(matchId) {
  const assistant = await getClient().createAssistant({
    name: `Match-${matchId}`,
    system_prompt: 'Match coordinator assistant',
  });
  return assistant.assistantId;
}

/**
 * Creates a player thread within the match assistant.
 * Returns { threadId, playerName }.
 */
async function createPlayerThread(assistantId, playerName) {
  const thread = await getClient().createThread(assistantId);
  return { threadId: thread.threadId, playerName };
}

/**
 * Creates the comparison thread within the match assistant.
 */
async function createComparisonThread(assistantId) {
  const thread = await getClient().createThread(assistantId);
  return thread.threadId;
}

/**
 * Sends a player's 3 Q&A pairs to their thread and returns parsed verdict.
 * Input: answers = [ {question, answer}, {question, answer}, {question, answer} ]
 * Output: [ {TC, SC, Context}, {TC, SC, Context}, {TC, SC, Context} ]
 */
async function evaluatePlayer(threadId, answers) {
  const messageContent = JSON.stringify({
    submissions: answers.map((a, i) => ({
      [`Question${i + 1}`]: a.question,
      [`Answer${i + 1}`]: a.answer,
    })),
  });

  const response = await getClient().addMessage(threadId, {
    content: `${PLAYER_THREAD_SYSTEM_PROMPT}\n\nInput:\n${messageContent}`,
    llm_provider: 'openai',
    model_name: 'gpt-4o',
    stream: false,
  });

  const parsed = JSON.parse(stripMarkdownFences(response.content));

  // Enforce Context=0 → O(inf) rule
  return parsed.map((entry) => {
    if (entry.Context === 0) {
      return { TC: 'O(inf)', SC: 'O(inf)', Context: 0 };
    }
    return { TC: entry.TC, SC: entry.SC, Context: entry.Context };
  });
}

/**
 * Sends aggregated results to comparison thread and returns grades.
 * Also runs app-side deterministic comparison as the canonical result.
 *
 * Input: playerResults = { Player1: [{TC,SC,Context},...], ... }
 * Output: { Player1: [GrQ1, GrQ2, GrQ3], ... }
 */
async function compareAndGrade(comparisonThreadId, playerResults) {
  // Strip Context field — comparison only needs TC and SC
  const comparisonPayload = {};
  for (const [player, results] of Object.entries(playerResults)) {
    comparisonPayload[player] = results.map((r) => ({ TC: r.TC, SC: r.SC }));
  }

  // App-side deterministic comparison (canonical source of truth)
  const deterministicResult = deterministicCompare(comparisonPayload);

  // Also send to comparison thread for cross-validation (optional)
  const messageContent = JSON.stringify(comparisonPayload);

  await getClient().addMessage(comparisonThreadId, {
    content: `${COMPARISON_THREAD_SYSTEM_PROMPT}\n\nInput:\n${messageContent}`,
    llm_provider: 'openai',
    model_name: 'gpt-4o',
    stream: false,
  });

  // Use deterministic app-side result as the canonical output
  return deterministicResult;
}

// ─── FULL MATCH FLOW ────────────────────────────────────────────

/**
 * Runs a complete match.
 *
 * Input:
 *   matchId: string
 *   players: [
 *     {
 *       name: "Player1",
 *       answers: [
 *         { question: "...", answer: "..." },
 *         { question: "...", answer: "..." },
 *         { question: "...", answer: "..." }
 *       ]
 *     },
 *     ...
 *   ]
 *
 * Output:
 *   {
 *     assistantId: string,
 *     playerResults: { Player1: [{TC,SC,Context},...], ... },
 *     grades: { Player1: [GrQ1, GrQ2, GrQ3], ... }
 *   }
 */
async function runMatch(matchId, players) {
  // 1. Create match assistant
  const assistantId = await createMatchAssistant(matchId);

  // 1.5 Assign questions to this match (select 3 random questions)
  const assignedQuestions = pickRandomQuestions(3)

  // 2. Create player threads + comparison thread in parallel
  const playerThreadPromises = players.map((p) =>
    createPlayerThread(assistantId, p.name)
  );
  const comparisonThreadPromise = createComparisonThread(assistantId);

  const playerThreads = await Promise.all(playerThreadPromises);
  const comparisonThreadId = await comparisonThreadPromise;

  // 3. Evaluate all players in parallel
  const evaluationPromises = players.map((p, i) =>
    evaluatePlayer(playerThreads[i].threadId, p.answers)
  );
  const evaluations = await Promise.all(evaluationPromises);

  // 4. Aggregate results
  const playerResults = {};
  players.forEach((p, i) => {
    playerResults[p.name] = evaluations[i];
  });

  // 5. Run comparison
  const grades = await compareAndGrade(comparisonThreadId, playerResults);

  return { assistantId, playerResults, grades, questions: assignedQuestions };
}

export {
  createMatchAssistant,
  createPlayerThread,
  createComparisonThread,
  evaluatePlayer,
  compareAndGrade,
  deterministicCompare,
  runMatch,
};
