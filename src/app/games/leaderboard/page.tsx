"use client";

import { getScores } from "@/lib/localLeaderboard";

export default function Page() {
  const scores = getScores();

  return (
    <div className="p-6 text-center space-y-4">
      <h1 className="text-3xl font-bold">🏆 Leaderboard</h1>

      {scores.map((s: any, i: number) => (
        <div key={i} className="border p-2 rounded">
          #{i + 1} - {s.score}
        </div>
      ))}
    </div>
  );
}