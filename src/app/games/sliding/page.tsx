"use client";

import { useState } from "react";

export default function SlidingPuzzle() {
  const [tiles, setTiles] = useState(
    [1,2,3,4,5,6,7,8,0].sort(() => Math.random() - 0.5)
  );

  function move(i: number) {
    const empty = tiles.indexOf(0);
    const valid = [empty - 1, empty + 1, empty - 3, empty + 3];

    if (!valid.includes(i)) return;

    const newTiles = [...tiles];
    [newTiles[i], newTiles[empty]] = [newTiles[empty], newTiles[i]];
    setTiles(newTiles);
  }

  return (
    <div className="text-center space-y-4">
      <h1 className="text-2xl font-bold">🧩 Sliding Puzzle</h1>

      <div className="grid grid-cols-3 gap-2 w-60 mx-auto">
        {tiles.map((n, i) => (
          <div
            key={i}
            onClick={() => move(i)}
            className="h-16 flex items-center justify-center bg-white/10 border border-white/10 rounded-lg"
          >
            {n !== 0 ? n : ""}
          </div>
        ))}
      </div>
    </div>
  );
}