"use client";

import MemoryGame from "@/games/memory/MemoryGame";

export default function Page() {
  return (
    <div className="p-6 text-center space-y-4">
      <h1 className="text-3xl font-bold">🧠 Memory Game</h1>
      <MemoryGame />
    </div>
  );
}