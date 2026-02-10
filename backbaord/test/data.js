// ─── QUESTIONS ──────────────────────────────────────────────────

const QUESTIONS = [
  'Given an array of integers, return indices of the two numbers that add up to a specific target.',
  'Reverse a singly linked list.',
  'Find the contiguous subarray with the largest sum.',
];

// ─── PLAYER SUBMISSIONS ─────────────────────────────────────────
// Each player has a name and 3 answers (one per question).
// This is the ONLY input the system needs.

const PLAYERS = [
  {
    name: 'Player1', 
    answers: [
      {
        question: QUESTIONS[0],
        answer:
          'function twoSum(nums, target) { const map = {}; for (let i = 0; i < nums.length; i++) { const c = target - nums[i]; if (map[c] !== undefined) return [map[c], i]; map[nums[i]] = i; } }',
      },
      {
        question: QUESTIONS[1],
        answer:
          'function reverseList(head) { let prev = null, curr = head; while (curr) { const next = curr.next; curr.next = prev; prev = curr; curr = next; } return prev; }',
      },
      {
        question: QUESTIONS[2],
        answer:
          'function maxSubArray(nums) { let max = nums[0], cur = nums[0]; for (let i = 1; i < nums.length; i++) { cur = Math.max(nums[i], cur + nums[i]); max = Math.max(max, cur); } return max; }',
      },
    ],
  },
  {
    name: 'Player2',
    answers: [
      {
        question: QUESTIONS[0],
        answer:
          'function twoSum(nums, target) { for (let i = 0; i < nums.length; i++) for (let j = i+1; j < nums.length; j++) if (nums[i]+nums[j] === target) return [i,j]; }',
      },
      {
        question: QUESTIONS[1],
        answer:
          'function reverseList(head) { let prev = null, curr = head; while (curr) { const next = curr.next; curr.next = prev; prev = curr; curr = next; } return prev; }',
      },
      {
        question: QUESTIONS[2],
        answer: 'I have no idea what a subarray is, here is a poem about trees.',
      },
    ],
  },
  {
    name: 'Player3',
    answers: [
      {
        question: QUESTIONS[0],
        answer:
          'function twoSum(nums, target) { nums.sort((a,b) => a-b); let l = 0, r = nums.length-1; while (l < r) { const s = nums[l]+nums[r]; if (s === target) return [l,r]; s < target ? l++ : r--; } }',
      },
      {
        question: QUESTIONS[1],
        answer:
          'function reverseList(head) { if (!head || !head.next) return head; const rest = reverseList(head.next); head.next.next = head; head.next = null; return rest; }',
      },
      {
        question: QUESTIONS[2],
        answer:
          'function maxSubArray(nums) { let max = -Infinity; for (let i = 0; i < nums.length; i++) { let sum = 0; for (let j = i; j < nums.length; j++) { sum += nums[j]; if (sum > max) max = sum; } } return max; }',
      },
    ],
  },
];

export { QUESTIONS, PLAYERS };
