"use client";

import { useEffect, useState } from "react";
import { getScores } from "@/utils/score";

export default function Leaderboard() {
  const [scores, setScores] = useState<Record<string, number>>({});

  useEffect(() => {
    const data = getScores(); // runs ONLY in browser
    setScores(data);
  }, []);

  return (
    <div>
      <h1>🏆 Leaderboard</h1>
    </div>
  );
}