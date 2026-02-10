// ============================================================
// Prisma Seed Script — Populate questions for all game modes
// ============================================================
// Run: npx tsx prisma/seed.ts

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding questions...\n");

  // ---- FASTEST MODE ----
  await prisma.question.createMany({
    data: [
      {
        title: "Two Sum",
        description:
          "Given an array of integers `nums` and an integer `target`, return the indices of the two numbers that add up to `target`. You may assume each input has exactly one solution.",
        difficulty: "EASY",
        mode: "FASTEST",
        testCases: [
          { input: "2 7 11 15\n9", expectedOutput: "0 1" },
          { input: "3 2 4\n6", expectedOutput: "1 2" },
          { input: "3 3\n6", expectedOutput: "0 1" },
        ],
      },
      {
        title: "Valid Parentheses",
        description:
          "Given a string `s` containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid. Print 'true' or 'false'.",
        difficulty: "EASY",
        mode: "FASTEST",
        testCases: [
          { input: "()", expectedOutput: "true" },
          { input: "()[]{}", expectedOutput: "true" },
          { input: "(]", expectedOutput: "false" },
          { input: "([)]", expectedOutput: "false" },
        ],
      },
      {
        title: "Longest Substring Without Repeating Characters",
        description:
          "Given a string `s`, find the length of the longest substring without repeating characters. Print the length.",
        difficulty: "MEDIUM",
        mode: "FASTEST",
        testCases: [
          { input: "abcabcbb", expectedOutput: "3" },
          { input: "bbbbb", expectedOutput: "1" },
          { input: "pwwkew", expectedOutput: "3" },
        ],
      },
      {
        title: "Merge Intervals",
        description:
          "Given an array of intervals where intervals[i] = [start_i, end_i], merge all overlapping intervals and print the merged intervals, one per line as 'start end'.",
        difficulty: "MEDIUM",
        mode: "FASTEST",
        testCases: [
          { input: "1 3\n2 6\n8 10\n15 18", expectedOutput: "1 6\n8 10\n15 18" },
          { input: "1 4\n4 5", expectedOutput: "1 5" },
        ],
      },
    ],
    skipDuplicates: true,
  });

  // ---- SHORTEST MODE ----
  await prisma.question.createMany({
    data: [
      {
        title: "FizzBuzz",
        description:
          "Print numbers from 1 to N. For multiples of 3 print 'Fizz', for multiples of 5 print 'Buzz', for multiples of both print 'FizzBuzz'. Read N from stdin.",
        difficulty: "EASY",
        mode: "SHORTEST",
        testCases: [
          {
            input: "15",
            expectedOutput:
              "1\n2\nFizz\n4\nBuzz\nFizz\n7\n8\nFizz\nBuzz\n11\nFizz\n13\n14\nFizzBuzz",
          },
        ],
      },
      {
        title: "Reverse a String",
        description: "Read a string from stdin and print it reversed.",
        difficulty: "EASY",
        mode: "SHORTEST",
        testCases: [
          { input: "hello", expectedOutput: "olleh" },
          { input: "world", expectedOutput: "dlrow" },
        ],
      },
      {
        title: "Fibonacci Sequence",
        description:
          "Read N from stdin and print the first N Fibonacci numbers, space-separated. F(0)=0, F(1)=1.",
        difficulty: "EASY",
        mode: "SHORTEST",
        testCases: [
          { input: "5", expectedOutput: "0 1 1 2 3" },
          { input: "8", expectedOutput: "0 1 1 2 3 5 8 13" },
        ],
      },
    ],
    skipDuplicates: true,
  });

  // ---- REVERSE MODE ----
  await prisma.question.createMany({
    data: [
      {
        title: "Mystery Pattern",
        description:
          "Write code that produces the following output exactly. Read N from stdin.",
        difficulty: "MEDIUM",
        mode: "REVERSE",
        expectedOutput: "*\n**\n***\n****\n*****",
        testCases: [
          { input: "5", expectedOutput: "*\n**\n***\n****\n*****" },
          { input: "3", expectedOutput: "*\n**\n***" },
        ],
      },
      {
        title: "Decode This Output",
        description:
          "Write code that reads a number N and produces this exact output pattern.",
        difficulty: "HARD",
        mode: "REVERSE",
        expectedOutput: "1\n1 2\n1 2 3\n1 2 3 4",
        testCases: [
          { input: "4", expectedOutput: "1\n1 2\n1 2 3\n1 2 3 4" },
          { input: "2", expectedOutput: "1\n1 2" },
        ],
      },
    ],
    skipDuplicates: true,
  });

  // ---- DEBUGGING MODE ----
  await prisma.question.createMany({
    data: [
      {
        title: "Fix the Sort",
        description:
          "The following code is supposed to sort an array in ascending order, but it has bugs. Fix it so it reads space-separated integers from stdin and prints them sorted.",
        difficulty: "EASY",
        mode: "DEBUGGING",
        brokenCode: `def sort_array(arr):
    for i in range(len(arr)):
        for j in range(len(arr)):  # Bug: should be len(arr)-1-i
            if arr[j] > arr[j+1]:  # Bug: index out of range
                arr[j], arr[j+1] = arr[j], arr[j+1]  # Bug: not swapping
    return arr

nums = list(map(int, input().split()))
print(' '.join(map(str, sort_array(nums))))`,
        brokenLanguage: "python",
        testCases: [
          { input: "3 1 4 1 5 9", expectedOutput: "1 1 3 4 5 9" },
          { input: "5 3 1", expectedOutput: "1 3 5" },
        ],
      },
      {
        title: "Fix the Binary Search",
        description:
          "This binary search has bugs. Fix it so it reads a sorted array and a target, and prints the index (or -1).",
        difficulty: "MEDIUM",
        mode: "DEBUGGING",
        brokenCode: `function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length; // Bug: should be arr.length - 1
  while (left < right) { // Bug: should be left <= right
    let mid = (left + right) / 2; // Bug: should use Math.floor
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) left = mid; // Bug: should be mid + 1
    else right = mid; // Bug: should be mid - 1
  }
  return -1;
}
const lines = require('fs').readFileSync('/dev/stdin','utf8').trim().split('\\n');
const arr = lines[0].split(' ').map(Number);
const target = Number(lines[1]);
console.log(binarySearch(arr, target));`,
        brokenLanguage: "javascript",
        testCases: [
          { input: "1 3 5 7 9\n5", expectedOutput: "2" },
          { input: "1 3 5 7 9\n4", expectedOutput: "-1" },
        ],
      },
    ],
    skipDuplicates: true,
  });

  const count = await prisma.question.count();
  console.log(`✅ Seeded ${count} questions across all game modes.`);
}

main()
  .catch((e) => {
    console.error("Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
