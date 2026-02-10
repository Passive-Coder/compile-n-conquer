"use client";

import { useMemo, useState } from "react";

type Entry = { TC: string; SC: string; Context: number };

type PlayerInput = {
  name: string;
  entries: Entry[];
};

const emptyEntry = (): Entry => ({ TC: "", SC: "", Context: 1 });

export default function TestEvalPage() {
  const [players, setPlayers] = useState<PlayerInput[]>([
    {
      name: "Player1",
      entries: [
        { TC: "O(n)", SC: "O(1)", Context: 1 },
        { TC: "O(n log n)", SC: "O(n)", Context: 1 },
        { TC: "O(inf)", SC: "O(inf)", Context: 0 },
      ],
    },
    {
      name: "Player2",
      entries: [
        { TC: "O(1)", SC: "O(1)", Context: 1 },
        { TC: "O(n)", SC: "O(1)", Context: 1 },
        { TC: "O(n^2)", SC: "O(n)", Context: 1 },
      ],
    },
    {
      name: "Player3",
      entries: [
        { TC: "O(log n)", SC: "O(1)", Context: 1 },
        { TC: "O(n)", SC: "O(n)", Context: 1 },
        { TC: "O(n log n)", SC: "O(1)", Context: 1 },
      ],
    },
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [perQuestionGrades, setPerQuestionGrades] = useState<
    Record<string, number[]>
  >({});
  const [totals, setTotals] = useState<Record<string, number>>({});

  const questionCount = useMemo(
    () => players[0]?.entries.length ?? 0,
    [players],
  );

  const updatePlayer = (index: number, next: Partial<PlayerInput>) => {
    setPlayers((prev) =>
      prev.map((player, i) =>
        i === index ? { ...player, ...next } : player,
      ),
    );
  };

  const updateEntry = (playerIndex: number, questionIndex: number, next: Entry) => {
    setPlayers((prev) =>
      prev.map((player, i) => {
        if (i !== playerIndex) return player;
        const entries = player.entries.map((entry, q) =>
          q === questionIndex ? next : entry,
        );
        return { ...player, entries };
      }),
    );
  };

  const addPlayer = () => {
    setPlayers((prev) => [
      ...prev,
      { name: "", entries: prev[0]?.entries.map(() => emptyEntry()) ?? [] },
    ]);
  };

  const addQuestion = () => {
    setPlayers((prev) =>
      prev.map((player) => ({
        ...player,
        entries: [...player.entries, emptyEntry()],
      })),
    );
  };

  const removeQuestion = () => {
    setPlayers((prev) =>
      prev.map((player) => ({
        ...player,
        entries: player.entries.slice(0, -1),
      })),
    );
  };

  const buildAggregated = () => {
    const aggregated: Record<string, Entry[]> = {};
    for (const player of players) {
      if (!player.name.trim()) continue;
      aggregated[player.name.trim()] = player.entries.map((entry) => ({
        TC: entry.TC.trim(),
        SC: entry.SC.trim(),
        Context: Number(entry.Context),
      }));
    }
    return aggregated;
  };

  const handleSubmit = async () => {
    setError(null);
    setPerQuestionGrades({});
    setTotals({});

    const aggregated = buildAggregated();
    if (Object.keys(aggregated).length === 0) {
      setError("At least one player with a name is required.");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/test/compare", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          aggregated,
        }),
      });
      const payload = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(payload?.error || "Comparison failed.");
      }
      setPerQuestionGrades(payload.perQuestionGrades || {});
      setTotals(payload.totals || {});
    } catch (err) {
      setError(err instanceof Error ? err.message : "Comparison failed.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="mx-auto flex w-full max-w-5xl flex-col gap-6 p-6">
      <header className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold">Backboard Evaluation Test</h1>
        <p className="text-sm text-muted-foreground">
          Enter per-player TC/SC/Context values and send them to the comparison
          thread.
        </p>
      </header>

      <section className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="rounded border border-border px-3 py-1 text-sm"
            onClick={addPlayer}
          >
            Add player
          </button>
          <button
            type="button"
            className="rounded border border-border px-3 py-1 text-sm"
            onClick={addQuestion}
          >
            Add question
          </button>
          <button
            type="button"
            className="rounded border border-border px-3 py-1 text-sm"
            onClick={removeQuestion}
            disabled={questionCount <= 1}
          >
            Remove question
          </button>
        </div>

        <div className="flex flex-col gap-6">
          {players.map((player, playerIndex) => (
            <div
              key={`player-${playerIndex}`}
              className="rounded border border-border p-4"
            >
              <div className="mb-3 flex flex-col gap-2">
                <label className="text-sm font-medium">Player name</label>
                <input
                  className="w-full rounded border border-border bg-background px-3 py-2 text-sm"
                  value={player.name}
                  onChange={(event) =>
                    updatePlayer(playerIndex, { name: event.target.value })
                  }
                  placeholder={`Player${playerIndex + 1}`}
                />
              </div>

              <div className="grid gap-3 md:grid-cols-3">
                {player.entries.map((entry, questionIndex) => (
                  <div
                    key={`q-${questionIndex}`}
                    className="rounded border border-border p-3"
                  >
                    <div className="mb-2 text-xs font-semibold uppercase text-muted-foreground">
                      Question {questionIndex + 1}
                    </div>
                    <div className="flex flex-col gap-2">
                      <input
                        className="w-full rounded border border-border bg-background px-2 py-1 text-sm"
                        value={entry.TC}
                        onChange={(event) =>
                          updateEntry(playerIndex, questionIndex, {
                            ...entry,
                            TC: event.target.value,
                          })
                        }
                        placeholder="TC (e.g. O(n))"
                      />
                      <input
                        className="w-full rounded border border-border bg-background px-2 py-1 text-sm"
                        value={entry.SC}
                        onChange={(event) =>
                          updateEntry(playerIndex, questionIndex, {
                            ...entry,
                            SC: event.target.value,
                          })
                        }
                        placeholder="SC (e.g. O(1))"
                      />
                      <input
                        className="w-full rounded border border-border bg-background px-2 py-1 text-sm"
                        value={entry.Context}
                        onChange={(event) =>
                          updateEntry(playerIndex, questionIndex, {
                            ...entry,
                            Context: Number(event.target.value),
                          })
                        }
                        placeholder="Context (0 or 1)"
                        type="number"
                        min={0}
                        max={1}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {error && (
        <div className="rounded border border-destructive/40 bg-destructive/10 px-4 py-2 text-sm text-destructive">
          {error}
        </div>
      )}

      <button
        type="button"
        className="w-full rounded bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground disabled:opacity-50"
        onClick={handleSubmit}
        disabled={isSubmitting}
      >
        {isSubmitting ? "Running comparison..." : "Run comparison"}
      </button>

      <section className="rounded border border-border p-4">
        <h2 className="mb-3 text-base font-semibold">Leaderboard</h2>
        {Object.keys(perQuestionGrades).length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No results yet.
          </p>
        ) : (
          <div className="flex flex-col gap-2 text-sm">
            {Object.entries(perQuestionGrades).map(([name, grades]) => (
              <div
                key={name}
                className="flex flex-wrap items-center justify-between gap-2 rounded border border-border px-3 py-2"
              >
                <div className="font-medium">{name}</div>
                <div className="flex flex-wrap gap-2">
                  {grades.map((grade, index) => (
                    <span
                      key={`${name}-q-${index}`}
                      className="rounded bg-muted px-2 py-1"
                    >
                      Q{index + 1}: {grade}
                    </span>
                  ))}
                </div>
                <div className="font-semibold">
                  Total: {totals[name] ?? 0}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
