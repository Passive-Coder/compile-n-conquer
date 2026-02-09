import { runMatch, deterministicCompare } from './match.js';

// ─── EXAMPLE PAYLOADS ───────────────────────────────────────────

// Player thread input example (what gets sent to each player's thread):
const examplePlayerThreadInput = {
  submissions: [
    {
      Question1: 'Given an array of integers, return indices of the two numbers that add up to a target.',
      Answer1: 'function twoSum(nums, target) { const map = {}; for (let i = 0; i < nums.length; i++) { const complement = target - nums[i]; if (map[complement] !== undefined) return [map[complement], i]; map[nums[i]] = i; } }',
    },
    {
      Question2: 'Reverse a linked list.',
      Answer2: 'function reverseList(head) { let prev = null; let curr = head; while (curr) { const next = curr.next; curr.next = prev; prev = curr; curr = next; } return prev; }',
    },
    {
      Question3: 'Find the maximum subarray sum.',
      Answer3: 'function maxSubArray(nums) { let max = nums[0]; let current = nums[0]; for (let i = 1; i < nums.length; i++) { current = Math.max(nums[i], current + nums[i]); max = Math.max(max, current); } return max; }',
    },
  ],
};

// Player thread output example (what the assistant returns):
const examplePlayerThreadOutput = [
  { TC: 'O(n)', SC: 'O(n)', Context: 1 },
  { TC: 'O(n)', SC: 'O(1)', Context: 1 },
  { TC: 'O(n)', SC: 'O(1)', Context: 1 },
];

// Comparison thread input example (aggregated from all player threads):
const exampleComparisonInput = {
  Player1: [
    { TC: 'O(n)', SC: 'O(n)' },
    { TC: 'O(n)', SC: 'O(1)' },
    { TC: 'O(n)', SC: 'O(1)' },
  ],
  Player2: [
    { TC: 'O(n^2)', SC: 'O(1)' },
    { TC: 'O(n)', SC: 'O(n)' },
    { TC: 'O(inf)', SC: 'O(inf)' }, // Context was 0
  ],
  Player3: [
    { TC: 'O(n log n)', SC: 'O(n)' },
    { TC: 'O(n^2)', SC: 'O(1)' },
    { TC: 'O(n)', SC: 'O(n)' },
  ],
};

// Comparison thread output example:
const exampleComparisonOutput = {
  Player1: [5, 5, 6],
  Player2: [4, 4, 0],
  Player3: [3, 3, 4],
};

// ─── DETERMINISTIC COMPARISON DEMO ──────────────────────────────

console.log('=== Deterministic Comparison Demo ===');
console.log('Input:', JSON.stringify(exampleComparisonInput, null, 2));

const result = deterministicCompare(exampleComparisonInput);
console.log('Output:', JSON.stringify(result, null, 2));

// ─── FULL MATCH EXAMPLE ─────────────────────────────────────────

async function exampleMatch() {
  const matchId = 'match-001';

  const players = [
    {
      name: 'Player1',
      answers: [
        {
          question: 'Given an array of integers, return indices of two numbers that add up to a target.',
          answer: 'function twoSum(nums, t) { const m = {}; for (let i = 0; i < nums.length; i++) { if (m[t - nums[i]] !== undefined) return [m[t-nums[i]], i]; m[nums[i]] = i; } }',
        },
        {
          question: 'Reverse a linked list.',
          answer: 'function rev(h) { let p = null, c = h; while(c) { let n = c.next; c.next = p; p = c; c = n; } return p; }',
        },
        {
          question: 'Find the maximum subarray sum.',
          answer: 'function maxSub(a) { let m = a[0], c = a[0]; for (let i=1;i<a.length;i++) { c = Math.max(a[i], c+a[i]); m = Math.max(m,c); } return m; }',
        },
      ],
    },
    {
      name: 'Player2',
      answers: [
        {
          question: 'Given an array of integers, return indices of two numbers that add up to a target.',
          answer: 'function twoSum(nums, target) { for (let i=0;i<nums.length;i++) for (let j=i+1;j<nums.length;j++) if (nums[i]+nums[j]===target) return [i,j]; }',
        },
        {
          question: 'Reverse a linked list.',
          answer: 'function rev(head) { let p=null,c=head; while(c){let n=c.next;c.next=p;p=c;c=n;} return p; }',
        },
        {
          question: 'Find the maximum subarray sum.',
          answer: 'I like turtles', // Incorrect — will get Context=0
        },
      ],
    },
    {
      name: 'Player3',
      answers: [
        {
          question: 'Given an array of integers, return indices of two numbers that add up to a target.',
          answer: 'function twoSum(nums, t) { nums.sort((a,b)=>a-b); let l=0,r=nums.length-1; while(l<r){let s=nums[l]+nums[r]; if(s===t) return [l,r]; s<t?l++:r--;} }',
        },
        {
          question: 'Reverse a linked list.',
          answer: 'function rev(h) { if(!h||!h.next) return h; let r=rev(h.next); h.next.next=h; h.next=null; return r; }',
        },
        {
          question: 'Find the maximum subarray sum.',
          answer: 'function maxSub(a) { let m=-Infinity; for(let i=0;i<a.length;i++) { let s=0; for(let j=i;j<a.length;j++){s+=a[j]; m=Math.max(m,s);}} return m; }',
        },
      ],
    },
  ];

  try {
    const result = await runMatch(matchId, players);
    console.log('\n=== Match Result ===');
    console.log('Assistant ID:', result.assistantId);
    console.log('Player Results:', JSON.stringify(result.playerResults, null, 2));
    console.log('Grades:', JSON.stringify(result.grades, null, 2));
  } catch (err) {
    console.error('Match failed:', err.message);
  }
}

// Uncomment to run full match (requires valid API key):
// exampleMatch();
