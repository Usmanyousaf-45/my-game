"use client";

import { useEffect, useState } from "react";

export default function SlidingPuzzle() {
  const [tiles, setTiles] = useState<number[]>([]);

  useEffect(() => {
    initGame();
  }, []);

  function initGame() {
    const arr = [1, 2, 3, 4, 5, 6, 7, 8, 0];
    setTiles(shuffle(arr));
  }

  function shuffle(array: number[]) {
    return [...array].sort(() => Math.random() - 0.5);
  }

  function move(index: number) {
    const emptyIndex = tiles.indexOf(0);

    const validMoves = [
      emptyIndex - 1,
      emptyIndex + 1,
      emptyIndex - 3,
      emptyIndex + 3,
    ];

    if (validMoves.includes(index)) {
      const newTiles = [...tiles];

      [newTiles[index], newTiles[emptyIndex]] = [
        newTiles[emptyIndex],
        newTiles[index],
      ];

      setTiles(newTiles);
    }
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <button
        onClick={initGame}
        className="px-4 py-2 bg-blue-600 rounded-lg"
      >
        Restart Game
      </button>

      <div className="grid grid-cols-3 gap-2 w-64">
        {tiles.map((num, i) => (
          <div
            key={i}
            onClick={() => move(i)}
            className="h-20 flex items-center justify-center bg-gray-800 text-xl cursor-pointer rounded"
          >
            {num !== 0 ? num : ""}
          </div>
        ))}
      </div>
    </div>
  );
}