"use client";

import { useEffect, useState } from "react";

const allEmojis = [
  "😀","😎","🔥","🚀","🎮","🐱","🍕","⚽",
  "🐶","🍔","🌈","🎵","🚗","🍩","🎯","👑",
  "🐼","🍓","⚡","🧩","🎲","🚴","🦄","🍉"
];

export default function MemoryGame() {
  const [level, setLevel] = useState<"easy" | "medium" | "hard">("easy");
  const [cards, setCards] = useState<string[]>([]);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [matched, setMatched] = useState<number[]>([]);

  useEffect(() => {
    generateCards();
  }, [level]);

  function generateCards() {
    let count = 6; // easy

    if (level === "medium") count = 10;
    if (level === "hard") count = 14;

    const selected = allEmojis.slice(0, count);

    const shuffled = [...selected, ...selected]
      .sort(() => Math.random() - 0.5);

    setCards(shuffled);
    setFlipped([]);
    setMatched([]);
  }

  function flip(i: number) {
    if (flipped.length === 2 || flipped.includes(i)) return;

    const newFlip = [...flipped, i];
    setFlipped(newFlip);

    if (newFlip.length === 2) {
      const [a, b] = newFlip;

      if (cards[a] === cards[b]) {
        setMatched((m) => [...m, a, b]);
      }

      setTimeout(() => setFlipped([]), 600);
    }
  }

  return (
    <div className="text-center space-y-4">

      {/* LEVEL SELECT */}
      <div className="flex justify-center gap-2">
        <button
          onClick={() => setLevel("easy")}
          className={`px-3 py-1 rounded ${level==="easy" ? "bg-green-600" : "bg-white/10"}`}
        >
          Easy
        </button>

        <button
          onClick={() => setLevel("medium")}
          className={`px-3 py-1 rounded ${level==="medium" ? "bg-yellow-600" : "bg-white/10"}`}
        >
          Medium
        </button>

        <button
          onClick={() => setLevel("hard")}
          className={`px-3 py-1 rounded ${level==="hard" ? "bg-red-600" : "bg-white/10"}`}
        >
          Hard
        </button>
      </div>

      {/* GRID */}
      <div
        className={`grid gap-2 mx-auto ${
          level === "easy"
            ? "grid-cols-4 max-w-sm"
            : level === "medium"
            ? "grid-cols-5 max-w-md"
            : "grid-cols-6 max-w-lg"
        }`}
      >
        {cards.map((card, i) => (
          <div
            key={i}
            onClick={() => flip(i)}
            className="h-14 flex items-center justify-center bg-blue-600 text-white rounded cursor-pointer active:scale-90 transition"
          >
            {flipped.includes(i) || matched.includes(i) ? card : "❓"}
          </div>
        ))}
      </div>

      {/* STATUS */}
      <div className="text-sm">
        ✅ {matched.length / 2} pairs found
      </div>

    </div>
  );
}