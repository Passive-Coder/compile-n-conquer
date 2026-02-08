# Game Timing System

## Overview

Games now have a dynamic duration system with a default of 10 minutes. The timing is enforced on the backend and automatically determines winners when time expires.

## Features

### 1. Dynamic Game Duration

Games can be created with custom durations:

```typescript
import { findMatch } from '@/app/actions/matchmaking';

// Default 10 minutes
await findMatch('FASTEST_CODE', 'MEDIUM');

// Custom 15 minutes
await findMatch('FASTEST_CODE', 'MEDIUM', 15);

// Custom 5 minutes
await findMatch('FASTEST_CODE', 'EASY', 5);
```

### 2. Automatic Time Expiration

When game time expires, the system automatically:

- **FASTEST_CODE**: Winner is whoever submitted the first passing solution
- **SHORTEST_CODE**: Winner is whoever has the shortest passing solution
- **No passing solutions**: Game ends in a draw

### 3. Time Tracking

The system tracks:
- `durationMinutes`: Total game duration (default 10)
- `startTime`: When the game started
- `endTime`: When the game ended
- `timeRemaining`: Seconds remaining (calculated in real-time)

## API Changes

### Updated Server Actions

#### `findMatch(format, difficulty?, durationMinutes?)`

```typescript
const result = await findMatch('FASTEST_CODE', 'MEDIUM', 15);
// Creates a game with 15-minute duration
```

#### `getGameDetails(gameId)`

Now returns additional time information:

```typescript
{
  success: true,
  game: {
    // ... other fields
    durationMinutes: 10,
    timeRemaining: 345, // seconds remaining (null if not in progress)
    startTime: Date,
    endTime: Date | null,
  }
}
```

#### `getGameTimeStatus(gameId)` - NEW

Get real-time timing information:

```typescript
const timeStatus = await getGameTimeStatus(gameId);
// Returns:
{
  success: true,
  status: 'IN_PROGRESS',
  durationMinutes: 10,
  startTime: Date,
  endTime: null,
  timeRemaining: 345, // seconds
  isExpired: false
}
```

#### `getCurrentGame()`

Now includes time remaining:

```typescript
{
  id: string,
  format: 'FASTEST_CODE',
  status: 'IN_PROGRESS',
  durationMinutes: 10,
  timeRemaining: 345, // seconds
  // ... other fields
}
```

#### `submitSolution(gameId, code, language)`

Now validates time hasn't expired:

```typescript
const result = await submitSolution(gameId, code, 'javascript');
// Returns error if time expired:
// { success: false, error: 'Game time has expired' }
```

## Time Expiration Logic

### When Time Expires

The `checkGameTimeExpiration()` function is called:
1. When fetching game details
2. When checking game time status
3. Automatically marks game as COMPLETED
4. Determines winner based on game format

### Winner Determination

**FASTEST_CODE:**
- Winner = First player with a passing solution
- If no passing solutions = Draw

**SHORTEST_CODE:**
- Winner = Player with shortest passing solution (by character count)
- If no passing solutions = Draw

**FIX_CODE:**
- Winner = First player with a passing solution
- If no passing solutions = Draw

### Rating Changes

**Winner:**
- +25 rating
- +1 game won
- +1 game played

**Loser:**
- -10 rating
- +1 game played

**Draw:**
- No rating change
- +1 game played
- 50 points awarded to all participants

## Frontend Integration

### Display Timer

```typescript
'use client';
import { useState, useEffect } from 'react';
import { getGameTimeStatus } from '@/app/actions/game';

export function GameTimer({ gameId }: { gameId: string }) {
  const [timeRemaining, setTimeRemaining] = useState<number | null>(null);

  useEffect(() => {
    const checkTime = async () => {
      const status = await getGameTimeStatus(gameId);
      if (status.success) {
        setTimeRemaining(status.timeRemaining);
      }
    };

    checkTime();
    const interval = setInterval(checkTime, 1000); // Update every second

    return () => clearInterval(interval);
  }, [gameId]);

  if (timeRemaining === null) return null;

  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;

  return (
    <div className={timeRemaining < 60 ? 'text-red-500' : ''}>
      {minutes}:{seconds.toString().padStart(2, '0')}
    </div>
  );
}
```

### Polling for Time Updates

For real-time updates without WebSockets:

```typescript
useEffect(() => {
  const interval = setInterval(async () => {
    const game = await getCurrentGame();
    if (game) {
      setTimeRemaining(game.timeRemaining);
      
      // Redirect if game ended
      if (game.status === 'COMPLETED') {
        router.push(`/game/${game.id}/results`);
      }
    }
  }, 1000); // Poll every second

  return () => clearInterval(interval);
}, []);
```

## Database Schema

```prisma
model Game {
  id              String      @id @default(cuid())
  format          GameFormat
  challengeId     String
  status          GameStatus  @default(WAITING)
  maxPlayers      Int         @default(2)
  durationMinutes Int         @default(10) // NEW FIELD
  startTime       DateTime?
  endTime         DateTime?
  winnerId        String?
  createdAt       DateTime    @default(now())
  updatedAt       DateTime    @updatedAt
  
  challenge       Challenge   @relation(fields: [challengeId], references: [id])
  participants    GameParticipant[]
  submissions     Submission[]
}
```

## Example Use Cases

### Standard 10-minute game
```typescript
await findMatch('FASTEST_CODE', 'MEDIUM'); // Uses default 10 minutes
```

### Quick 5-minute game
```typescript
await findMatch('FASTEST_CODE', 'EASY', 5);
```

### Extended 20-minute challenge
```typescript
await findMatch('SHORTEST_CODE', 'HARD', 20);
```

## Best Practices

1. **Client-side polling**: Poll `getGameTimeStatus()` every 1-2 seconds for real-time updates
2. **Visual warnings**: Show red/flashing UI when < 60 seconds remain
3. **Auto-redirect**: Redirect to results page when time expires
4. **Disable submissions**: Disable code submission button when time expires
5. **Show progress**: Display progress bar showing elapsed/remaining time

## Future Enhancements

Consider adding:
- WebSocket support for real-time time updates
- Time extensions/power-ups
- Different time formats per game format
- Time bonuses for early completion
- Pause functionality (for emergencies)
