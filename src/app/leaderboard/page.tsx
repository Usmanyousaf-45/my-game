"use client";

import { useEffect, useState } from "react";
import { getScores } from "@/utils/score";

export default function Leaderboard() {
  const [scores, setScores] = useState<Record<string, number>>({});

  useEffect(() => {
    setScores(getScores());
  }, []);

  return (
    <div>
      <h1>Leaderboard</h1>
    </div>
  );
}