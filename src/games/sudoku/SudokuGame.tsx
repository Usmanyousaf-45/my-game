"use client";

import { useEffect, useState } from "react";

type Difficulty = "easy" | "medium" | "hard";

const solvedBoard = [
  [5,3,4,6,7,8,9,1,2],
  [6,7,2,1,9,5,3,4,8],
  [1,9,8,3,4,2,5,6,7],
  [8,5,9,7,6,1,4,2,3],
  [4,2,6,8,5,3,7,9,1],
  [7,1,3,9,2,4,8,5,6],
  [9,6,1,5,3,7,2,8,4],
  [2,8,7,4,1,9,6,3,5],
  [3,4,5,2,8,6,1,7,9],
];

function clone(b: number[][]) {
  return b.map(r => [...r]);
}

function generatePuzzle(difficulty: Difficulty) {
  const board = clone(solvedBoard);
  let remove = difficulty === "easy" ? 35 : difficulty === "medium" ? 45 : 58;

  while (remove > 0) {
    const r = Math.floor(Math.random() * 9);
    const c = Math.floor(Math.random() * 9);
    if (board[r][c] !== 0) {
      board[r][c] = 0;
      remove--;
    }
  }

  return board;
}

function isConflict(grid: number[][], r: number, c: number, val: number) {
  for (let i = 0; i < 9; i++) {
    if (i !== c && grid[r][i] === val) return true;
    if (i !== r && grid[i][c] === val) return true;
  }

  const sr = Math.floor(r / 3) * 3;
  const sc = Math.floor(c / 3) * 3;

  for (let i = sr; i < sr + 3; i++) {
    for (let j = sc; j < sc + 3; j++) {
      if ((i !== r || j !== c) && grid[i][j] === val) return true;
    }
  }

  return false;
}

export default function SudokuGame() {
  const [difficulty, setDifficulty] = useState<Difficulty>("easy");
  const [initialBoard, setInitialBoard] = useState(() => generatePuzzle("easy"));
  const [grid, setGrid] = useState<number[][]>(() => clone(initialBoard));

  const [time, setTime] = useState(0);
  const [hintUsed, setHintUsed] = useState(0);
  const [win, setWin] = useState(false);

  // TIMER
  useEffect(() => {
    if (win) return;
    const t = setInterval(() => setTime(prev => prev + 1), 1000);
    return () => clearInterval(t);
  }, [win]);

  function startGame(level: Difficulty) {
    const newBoard = generatePuzzle(level);
    setDifficulty(level);
    setInitialBoard(newBoard);
    setGrid(clone(newBoard));
    setTime(0);
    setHintUsed(0);
    setWin(false);
  }

  function checkWin(board: number[][]) {
    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 9; c++) {
        if (board[r][c] !== solvedBoard[r][c]) return false;
      }
    }
    return true;
  }

  function handleChange(r: number, c: number, val: string) {
    if (!/^[1-9]?$/.test(val)) return;
    if (initialBoard[r][c] !== 0) return;

    const num = val === "" ? 0 : Number(val);

    const newGrid = grid.map((row, i) =>
      row.map((cell, j) => (i === r && j === c ? num : cell))
    );

    setGrid(newGrid);

    if (checkWin(newGrid)) setWin(true);
  }

  function giveHint() {
    if (win) return;

    const newGrid = clone(grid);

    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 9; c++) {
        if (newGrid[r][c] === 0) {
          newGrid[r][c] = solvedBoard[r][c];
          setHintUsed(h => h + 1);
          setGrid(newGrid);
          if (checkWin(newGrid)) setWin(true);
          return;
        }
      }
    }
  }

  function autoSolve() {
    setGrid(clone(solvedBoard));
    setWin(true);
  }

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <div className="flex gap-2 flex-wrap">
        <button onClick={() => startGame("easy")} className="px-3 py-1 bg-green-600 text-white rounded">Easy</button>
        <button onClick={() => startGame("medium")} className="px-3 py-1 bg-yellow-600 text-white rounded">Medium</button>
        <button onClick={() => startGame("hard")} className="px-3 py-1 bg-red-600 text-white rounded">Hard</button>
        <button onClick={giveHint} className="px-3 py-1 bg-blue-600 text-white rounded">Hint</button>
        <button onClick={autoSolve} className="px-3 py-1 bg-purple-600 text-white rounded">Auto Solve</button>
      </div>

      <div className="text-sm">
        ⏱ Time: {time}s | 💡 Hints: {hintUsed} | {win ? "🏆 You Win!" : "Playing..."}
      </div>

      <div className="grid grid-cols-9 gap-1 border p-2">
        {grid.map((row, r) =>
          row.map((cell, c) => {
            const locked = initialBoard[r][c] !== 0;
            const conflict = cell !== 0 && isConflict(grid, r, c, cell);

            return (
              <input
                key={`${r}-${c}`}
                value={cell === 0 ? "" : cell}
                onChange={(e) => handleChange(r, c, e.target.value)}
                maxLength={1}
                disabled={locked || win}
                className={`w-10 h-10 text-center border bg-white/10 ${
                  locked ? "bg-gray-800 font-bold" : ""
                } ${conflict ? "border-red-500 bg-red-200" : ""}`}
              />
            );
          })
        )}
      </div>

      {win && <div className="text-green-500 font-bold">🎉 Congratulations! Puzzle Solved</div>}
    </div>
  );
}
