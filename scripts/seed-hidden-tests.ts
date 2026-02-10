import { PrismaClient } from "../prisma/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import fs from "fs";
import path from "path";

type HiddenTest = { input: string; expectedOutput: string };

const hiddenByTitle: Record<string, HiddenTest[]> = {
  "Two Sum": [
    { input: "1 2 3 4\n5", expectedOutput: "0 3" },
    { input: "4 5 1 8\n9", expectedOutput: "0 1" },
    { input: "0 4 3 0\n0", expectedOutput: "0 3" },
    { input: "-3 4 3 90\n0", expectedOutput: "0 2" },
    { input: "2 7 11 15\n18", expectedOutput: "1 2" },
    { input: "5 75 25\n100", expectedOutput: "1 2" },
  ],
  "Valid Parentheses": [
    { input: "([])", expectedOutput: "true" },
    { input: "([{}])", expectedOutput: "true" },
    { input: "(((())))", expectedOutput: "true" },
    { input: "(((", expectedOutput: "false" },
    { input: "{[}]", expectedOutput: "false" },
    { input: "(){[()]}[]", expectedOutput: "true" },
  ],
  "Longest Substring Without Repeating Characters": [
    { input: "dvdf", expectedOutput: "3" },
    { input: "abba", expectedOutput: "2" },
    { input: "anviaj", expectedOutput: "5" },
    { input: "tmmzuxt", expectedOutput: "5" },
    { input: "abcde", expectedOutput: "5" },
    { input: "aab", expectedOutput: "2" },
  ],
  "Merge Intervals": [
    { input: "1 4\n2 3", expectedOutput: "1 4" },
    { input: "1 2\n3 4\n5 6", expectedOutput: "1 2\n3 4\n5 6" },
    { input: "1 10\n2 5\n6 9", expectedOutput: "1 10" },
    { input: "1 3\n4 6\n5 7", expectedOutput: "1 3\n4 7" },
    { input: "0 0\n1 1", expectedOutput: "0 0\n1 1" },
    { input: "1 5\n2 4\n6 8\n7 9", expectedOutput: "1 5\n6 9" },
  ],
  "FizzBuzz": [
    { input: "1", expectedOutput: "1" },
    { input: "3", expectedOutput: "1\n2\nFizz" },
    { input: "5", expectedOutput: "1\n2\nFizz\n4\nBuzz" },
    { input: "6", expectedOutput: "1\n2\nFizz\n4\nBuzz\nFizz" },
    { input: "10", expectedOutput: "1\n2\nFizz\n4\nBuzz\nFizz\n7\n8\nFizz\nBuzz" },
    {
      input: "16",
      expectedOutput:
        "1\n2\nFizz\n4\nBuzz\nFizz\n7\n8\nFizz\nBuzz\n11\nFizz\n13\n14\nFizzBuzz\n16",
    },
  ],
  "Reverse a String": [
    { input: "openai", expectedOutput: "ianepo" },
    { input: "palindrome", expectedOutput: "emordnilap" },
    { input: "abc123", expectedOutput: "321cba" },
    { input: "xyz", expectedOutput: "zyx" },
    { input: "hello", expectedOutput: "olleh" },
    { input: "world", expectedOutput: "dlrow" },
  ],
  "Fibonacci Sequence": [
    { input: "1", expectedOutput: "0" },
    { input: "2", expectedOutput: "0 1" },
    { input: "3", expectedOutput: "0 1 1" },
    { input: "4", expectedOutput: "0 1 1 2" },
    { input: "6", expectedOutput: "0 1 1 2 3 5" },
    { input: "10", expectedOutput: "0 1 1 2 3 5 8 13 21 34" },
  ],
  "Mystery Pattern": [
    { input: "1", expectedOutput: "*" },
    { input: "2", expectedOutput: "*\n**" },
    { input: "3", expectedOutput: "*\n**\n***" },
    { input: "4", expectedOutput: "*\n**\n***\n****" },
    { input: "5", expectedOutput: "*\n**\n***\n****\n*****" },
    { input: "6", expectedOutput: "*\n**\n***\n****\n*****\n******" },
  ],
  "Decode This Output": [
    { input: "1", expectedOutput: "1" },
    { input: "2", expectedOutput: "1\n1 2" },
    { input: "3", expectedOutput: "1\n1 2\n1 2 3" },
    { input: "4", expectedOutput: "1\n1 2\n1 2 3\n1 2 3 4" },
    { input: "5", expectedOutput: "1\n1 2\n1 2 3\n1 2 3 4\n1 2 3 4 5" },
    { input: "6", expectedOutput: "1\n1 2\n1 2 3\n1 2 3 4\n1 2 3 4 5\n1 2 3 4 5 6" },
  ],
  "Fix the Sort": [
    { input: "2 1", expectedOutput: "1 2" },
    { input: "5 4 3 2 1", expectedOutput: "1 2 3 4 5" },
    { input: "1 2 3", expectedOutput: "1 2 3" },
    { input: "9 8 7 6 5 4", expectedOutput: "4 5 6 7 8 9" },
    { input: "10 -1 2 3", expectedOutput: "-1 2 3 10" },
    { input: "3 1 4 1 5 9", expectedOutput: "1 1 3 4 5 9" },
  ],
  "Fix the Binary Search": [
    { input: "1 2 3 4 5\n4", expectedOutput: "3" },
    { input: "1 2 3 4 5\n1", expectedOutput: "0" },
    { input: "1 2 3 4 5\n5", expectedOutput: "4" },
    { input: "1 2 3 4 5\n6", expectedOutput: "-1" },
    { input: "10 20 30 40 50\n30", expectedOutput: "2" },
    { input: "-5 -2 0 3 8\n-2", expectedOutput: "1" },
  ],
};

const ensureCount = (cases: HiddenTest[], count: number): HiddenTest[] => {
  if (!cases || cases.length === 0) return [];
  const out: HiddenTest[] = [];
  for (let i = 0; out.length < count; i += 1) {
    out.push(cases[i % cases.length]);
  }
  return out.slice(0, count);
};

const toHiddenTests = (cases: unknown): HiddenTest[] => {
  if (!Array.isArray(cases) || cases.length === 0) return [];
  return cases.map((tc: any) => ({
    input: String(tc?.input ?? ""),
    expectedOutput: String(tc?.expectedOutput ?? ""),
  }));
};

const uniqueCases = (cases: HiddenTest[]): HiddenTest[] => {
  const seen = new Set<string>();
  const out: HiddenTest[] = [];
  for (const item of cases) {
    const key = `${item.input}::${item.expectedOutput}`;
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(item);
  }
  return out;
};

const loadEnvFile = (filePath: string) => {
  if (!fs.existsSync(filePath)) return;
  const content = fs.readFileSync(filePath, "utf8");
  content.split("\n").forEach((line) => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) return;
    const idx = trimmed.indexOf("=");
    if (idx === -1) return;
    const key = trimmed.slice(0, idx).trim();
    const value = trimmed.slice(idx + 1).trim();
    if (!process.env[key]) {
      process.env[key] = value.replace(/^\"|\"$/g, "");
    }
  });
};

async function main() {
  const cwd = process.cwd();
  loadEnvFile(path.join(cwd, ".env.local"));
  loadEnvFile(path.join(cwd, ".env"));

  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    throw new Error("DATABASE_URL is not set");
  }
  const url = new URL(databaseUrl);
  const isLocalhost =
    url.hostname === "localhost" || url.hostname === "127.0.0.1";
  const pool = new Pool({
    connectionString: databaseUrl,
    ssl: isLocalhost ? undefined : { rejectUnauthorized: false },
  });
  const adapter = new PrismaPg(pool);
  const prisma = new PrismaClient({ adapter });
  const questions = await prisma.question.findMany({
    select: { id: true, title: true, testCases: true },
  });

  for (const question of questions) {
    const preset = hiddenByTitle[question.title] ?? [];
    const existingSamples = toHiddenTests(question.testCases);
    const combined = uniqueCases([...existingSamples, ...preset]);

    const totalNeeded = 14; // 2 sample + 12 hidden
    const safeCombined =
      combined.length > 0
        ? combined.length >= totalNeeded
          ? combined
          : ensureCount(combined, totalNeeded)
        : Array.from({ length: totalNeeded }, () => ({
            input: "",
            expectedOutput: "",
          }));

    const sampleCases = safeCombined.slice(0, 2);
    const hiddenCases = safeCombined.slice(2);

    const paddedHidden =
      hiddenCases.length >= 12 ? hiddenCases : ensureCount(hiddenCases, 12);

    await prisma.question.update({
      where: { id: question.id },
      data: {
        testCases: sampleCases,
        hiddenTestCases: paddedHidden,
      },
    });
  }

  console.log(`✅ Updated hidden tests for ${questions.length} questions.`);
  await prisma.$disconnect();
}

main().catch((err) => {
  console.error("Hidden test seed error:", err);
  process.exit(1);
});
