/**
 * index.js — Match Runner
 *
 * Runs a full competitive coding match via the Backboard API.
 * Input: questions + player answers (defined in data.js)
 * Output: AI-evaluated TC/SC/Context + deterministic grades + ranking
 *
 * Run: node backboard/test/index.js
 */

import dotenv from 'dotenv';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: resolve(__dirname, '../../.env.local') });

import CONFIG from './config.js';
import { PLAYERS } from './data.js';
import { runMatch } from '../match.js';

// ─── FORMATTING ─────────────────────────────────────────────────

function divider(label) {
  const line = '─'.repeat(56);
  console.log(`\n${line}`);
  if (label) console.log(`  ${label}`);
  console.log(line);
}

function pad(str, len) {
  return String(str).padEnd(len);
}

// ─── MAIN ───────────────────────────────────────────────────────

async function main() {
  if (!process.env.BACKBOARD_API_KEY) {
    console.error('ERROR: BACKBOARD_API_KEY not set. Add it to .env.local');
    process.exit(1);
  }

  divider(`MATCH: ${CONFIG.MATCH_ID}  |  Players: ${PLAYERS.length}`);
  console.log('  Calling Backboard API — waiting for AI evaluation...\n');

  // ── Single call: questions + answers in, grades out ───────────
  const { assistantId, playerResults, grades } = await runMatch(CONFIG.MATCH_ID, PLAYERS);

  console.log(`  Assistant: ${assistantId}`);

  // ── AI Verdicts ───────────────────────────────────────────────
  divider('AI VERDICTS (TC / SC / Context)');

  for (const [name, results] of Object.entries(playerResults)) {
    console.log(`\n  ${name}:`);
    results.forEach((v, q) => {
      const ctx = v.Context === 1 ? 'VALID' : 'INVALID';
      console.log(`    Q${q + 1}:  TC=${pad(v.TC, 12)} SC=${pad(v.SC, 12)} ${ctx}`);
    });
  }

  // ── Grades ────────────────────────────────────────────────────
  divider('SCORES');

  const playerNames = Object.keys(grades);
  console.log(`  ${pad('Player', 12)}${pad('Q1', 8)}${pad('Q2', 8)}${pad('Q3', 8)}TOTAL`);
  console.log('  ' + '─'.repeat(44));

  playerNames.forEach((name) => {
    const scores = grades[name];
    const total = scores.reduce((a, b) => a + b, 0);
    console.log(`  ${pad(name, 12)}${scores.map((s) => pad(s, 8)).join('')}${total}`);
  });

  // ── Ranking ───────────────────────────────────────────────────
  divider('RANKING');

  const ranked = playerNames
    .map((name) => ({ name, total: grades[name].reduce((a, b) => a + b, 0) }))
    .sort((a, b) => b.total - a.total);

  ranked.forEach((r, i) => {
    console.log(`  #${i + 1}  ${pad(r.name, 12)} ${r.total} pts`);
  });

  divider();
}

main().catch((err) => {
  console.error('MATCH FAILED:', err);
  process.exit(1);
});
