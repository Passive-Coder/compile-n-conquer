# Compile-n-Conquer Backend Documentation

This document provides an overview of all server actions available in the backend.

## Table of Contents

1. [Authentication](#authentication)
2. [Code Execution](#code-execution)
3. [Matchmaking](#matchmaking)
4. [Game Management](#game-management)
5. [Challenges](#challenges)
6. [Profile & Stats](#profile--stats)

## Setup

### Environment Variables

Create a `.env` file based on `.env.example`:

```bash
cp .env.example .env
```

Required environment variables:
- `DATABASE_URL`: PostgreSQL connection string
- `JWT_SECRET`: Secret key for JWT token generation
- `JUDGE0_API_URL`: Judge0 API endpoint
- `JUDGE0_API_KEY`: Judge0 API key (from RapidAPI)

### Database Setup

```bash
# Generate Prisma Client
npx prisma generate

# Run migrations
npx prisma migrate dev
```

## Authentication

### `app/actions/auth.ts`

#### `signup(formData: FormData)`
Creates a new user account.

**Parameters:**
- `username`: 3-20 characters, alphanumeric + underscore
- `email`: Valid email address
- `password`: Minimum 6 characters

**Returns:**
```typescript
{
  success: boolean;
  error?: string;
  user?: {
    id: string;
    username: string;
    email: string;
    rating: number;
  };
}
```

#### `login(formData: FormData)`
Authenticates a user.

**Parameters:**
- `email`: User's email
- `password`: User's password

**Returns:** Same as `signup()`

#### `logout()`
Logs out the current user.

#### `getUser()`
Gets the currently authenticated user's information.

## Code Execution

### `app/actions/code-execution.ts`

#### `executeCode(code: string, language: LanguageKey, testCases: TestCase[])`
Executes code against test cases using Judge0.

**Supported Languages:**
- JavaScript (Node.js)
- Python 3
- Java
- C++
- C
- C#
- TypeScript
- Go
- Rust

**Parameters:**
```typescript
{
  code: string;
  language: 'javascript' | 'python' | 'java' | 'cpp' | 'c' | 'csharp' | 'typescript' | 'go' | 'rust';
  testCases: Array<{
    input: string;
    expectedOutput: string;
  }>;
}
```

**Returns:**
```typescript
{
  success: boolean;
  isPassing: boolean;
  executionTime?: number;
  memory?: number;
  error?: string;
  testResults?: {
    passed: number;
    total: number;
    details: Array<{
      passed: boolean;
      input: string;
      expected: string;
      actual: string;
    }>;
  };
}
```

#### `submitSolution(gameId: string, code: string, language: LanguageKey)`
Submits a solution to a game. Automatically determines winner for FASTEST_CODE format.

## Matchmaking

### `app/actions/matchmaking.ts`

#### `findMatch(format: GameFormat, difficulty?: Difficulty)`
Finds or creates a game match.

**Game Formats:**
- `FASTEST_CODE`: First to solve wins
- `SHORTEST_CODE`: Shortest solution wins
- `FIX_CODE`: Fix broken code fastest

**Difficulty Levels:**
- `EASY`
- `MEDIUM`
- `HARD`

**Returns:**
```typescript
{
  success: boolean;
  error?: string;
  gameId?: string;
  joined?: boolean;
}
```

#### `cancelMatchmaking(gameId: string)`
Cancels matchmaking for a waiting game.

#### `getQueueStatus()`
Gets current user's queue status if they're waiting for a match.

## Game Management

### `app/actions/game.ts`

#### `getGameDetails(gameId: string)`
Gets complete details about a game including challenge, participants, and submissions.

#### `getGameHistory(userId?: string)`
Gets game history for a user (defaults to current user).

#### `leaveGame(gameId: string)`
Leaves a game. Awards win to opponent if game is in progress.

#### `getLeaderboard(limit: number = 100)`
Gets the top players by rating.

**Returns:**
```typescript
{
  success: boolean;
  leaderboard: Array<{
    rank: number;
    id: string;
    username: string;
    rating: number;
    gamesPlayed: number;
    gamesWon: number;
    winRate: number;
  }>;
}
```

#### `getCurrentGame()`
Gets the current user's active game (WAITING or IN_PROGRESS).

## Challenges

### `app/actions/challenges.ts`

#### `getChallenges(difficulty?: Difficulty, topicId?: string)`
Gets list of challenges with optional filters.

#### `getChallenge(challengeId: string)`
Gets detailed information about a specific challenge.

#### `getTopics()`
Gets all topics with challenge counts.

#### `getUserSubmissions(gameId?: string)`
Gets user's submission history.

#### `createChallenge(data)`
Creates a new challenge (admin function).

**Parameters:**
```typescript
{
  title: string;
  description: string;
  difficulty: 'EASY' | 'MEDIUM' | 'HARD';
  topicId: string;
  testCases: Array<{
    input: string;
    expectedOutput: string;
  }>;
  starterCode?: string;
}
```

#### `createTopic(data)`
Creates a new topic (admin function).

#### `getGameSubmissions(gameId: string)`
Gets all submissions for a game. Only shows code to submission owner.

## Profile & Stats

### `app/actions/profile.ts`

#### `getUserProfile(userId?: string)`
Gets user profile with stats and recent games.

**Returns:**
```typescript
{
  success: boolean;
  profile: {
    id: string;
    username: string;
    email?: string; // Only for own profile
    createdAt: Date;
    stats: {
      totalGames: number;
      wins: number;
      losses: number;
      winRate: number;
      rating: number;
    };
    recentGames: Array<...>;
  };
}
```

#### `updateProfile(data)`
Updates user profile.

**Parameters:**
```typescript
{
  username?: string;
  email?: string;
}
```

#### `getStats()`
Gets platform-wide statistics.

## Usage Examples

### Client-Side Usage

```typescript
'use client';

import { signup, login } from '@/app/actions/auth';
import { findMatch } from '@/app/actions/matchmaking';
import { submitSolution } from '@/app/actions/code-execution';

// Signup
async function handleSignup(formData: FormData) {
  const result = await signup(formData);
  if (result.success) {
    console.log('Welcome!', result.user);
  } else {
    console.error(result.error);
  }
}

// Find match
async function handleFindMatch() {
  const result = await findMatch('FASTEST_CODE', 'MEDIUM');
  if (result.success) {
    router.push(`/game/${result.gameId}`);
  }
}

// Submit solution
async function handleSubmit() {
  const result = await submitSolution(gameId, code, 'javascript');
  if (result.success) {
    console.log('Submitted!', result.submission);
  }
}
```

## Authentication Helper Functions

### `lib/auth.ts`

Available helper functions:
- `hashPassword(password: string)`: Hash a password
- `verifyPassword(password: string, hash: string)`: Verify a password
- `generateToken(payload: JWTPayload)`: Generate JWT token
- `verifyToken(token: string)`: Verify JWT token
- `getCurrentUser()`: Get current authenticated user
- `setAuthCookie(token: string)`: Set auth cookie
- `removeAuthCookie()`: Remove auth cookie

## Database Client

### `lib/db.ts`

Use the exported `prisma` client for database operations:

```typescript
import { prisma } from '@/lib/db';

// Example: Get all users
const users = await prisma.user.findMany();
```

## Error Handling

All server actions follow a consistent error handling pattern:

```typescript
{
  success: boolean;
  error?: string;
  // ... other data
}
```

Always check the `success` field before accessing data.

## Security Notes

1. All server actions validate authentication using `getCurrentUser()`
2. Passwords are hashed using bcrypt with 10 rounds
3. JWT tokens expire after 7 days
4. Cookies are httpOnly and secure in production
5. Input validation using Zod schemas
6. SQL injection protection via Prisma

## Judge0 Setup

### Using RapidAPI (Recommended for development)

1. Sign up at [RapidAPI](https://rapidapi.com/)
2. Subscribe to [Judge0 CE](https://rapidapi.com/judge0-official/api/judge0-ce)
3. Copy your API key to `.env`

### Self-Hosted Judge0

For production, consider self-hosting Judge0:

```bash
# Using Docker
docker run -d -p 2358:2358 judge0/judge0:latest
```

Update `.env`:
```
JUDGE0_API_URL="http://localhost:2358"
JUDGE0_API_KEY=""
```

## Rate Limiting

Consider implementing rate limiting for:
- Code execution (prevent spam)
- Matchmaking requests
- Login attempts

Use packages like `express-rate-limit` or implement custom Redis-based rate limiting.

## WebSockets (Future Enhancement)

For real-time features like live game updates, consider adding WebSockets using:
- Socket.io
- Pusher
- Ably
- Or native WebSocket API

This would enable:
- Real-time opponent code submissions
- Live leaderboard updates
- Match notifications
- In-game chat
