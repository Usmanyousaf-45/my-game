"use client";

import { useEffect, useState } from "react";
import { getScores } from "@/utils/score";

export default function Leaderboard() {
  const [scores, setScores] = useState<any>({});

  useEffect(() => {
    setScores(getScores());
  }, []);

  return (
    <div>
      <h1 className="text-3xl mb-4">🏆 Leaderboard</h1>

      <div className="space-y-3">
        {Object.keys(scores).length === 0 ? (
          <p>No scores yet</p>
        ) : (
          Object.entries(scores).map(([game, score]: any) => (
            <div key={game} className="bg-gray-800 p-4 rounded-xl">
              {game} → {score} pts
            </div>
          ))
        )}
      </div>
    </div>
  );
}