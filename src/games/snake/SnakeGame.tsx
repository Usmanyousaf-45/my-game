"use client";

import { useEffect, useRef, useState } from "react";

const SIZE = 400;
const CELL = 20;

type Point = { x: number; y: number };

export default function SnakeGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [snake, setSnake] = useState<Point[]>([
    { x: 10, y: 10 },
    { x: 9, y: 10 },
  ]);
  const [food, setFood] = useState<Point>({ x: 5, y: 5 });
  const [dir, setDir] = useState<Point>({ x: 1, y: 0 });
  const [running, setRunning] = useState(true);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState<"easy" | "medium" | "hard">("easy");

  // 🎵 SOUND
  function playEatSound() {
    const audio = new Audio(
      "https://actions.google.com/sounds/v1/cartoon/wood_plank_flicks.ogg"
    );
    audio.play();
  }

  // ⚡ SPEED BASED ON LEVEL
  const speed =
    level === "easy" ? 140 : level === "medium" ? 100 : 70;

  // 🎮 GAME LOOP
  useEffect(() => {
    if (!running) return;

    const interval = setInterval(() => {
      setSnake((prev) => {
        const head = { ...prev[0] };
        head.x += dir.x;
        head.y += dir.y;

        // collision
        if (
          head.x < 0 ||
          head.y < 0 ||
          head.x >= SIZE / CELL ||
          head.y >= SIZE / CELL ||
          prev.some((s) => s.x === head.x && s.y === head.y)
        ) {
          setRunning(false);
          return prev;
        }

        const newSnake = [head, ...prev];

        // eat
        if (head.x === food.x && head.y === food.y) {
          setScore((s) => s + 10);
          playEatSound();

          setFood({
            x: Math.floor(Math.random() * (SIZE / CELL)),
            y: Math.floor(Math.random() * (SIZE / CELL)),
          });
        } else {
          newSnake.pop();
        }

        return newSnake;
      });
    }, speed);

    return () => clearInterval(interval);
  }, [dir, running, food, level]);

  // 🎨 DRAW
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!ctx) return;

    // background
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, SIZE, SIZE);

    // grid glow
    ctx.strokeStyle = "#111";
    for (let i = 0; i < SIZE; i += CELL) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, SIZE);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(SIZE, i);
      ctx.stroke();
    }

    // snake
    snake.forEach((s, i) => {
      ctx.shadowColor = "#00ffcc";
      ctx.shadowBlur = 15;

      ctx.fillStyle = i === 0 ? "#00ffff" : "#00cc99";
      ctx.fillRect(s.x * CELL, s.y * CELL, CELL, CELL);

      ctx.shadowBlur = 0;
    });

    // food glow
    ctx.shadowColor = "red";
    ctx.shadowBlur = 20;
    ctx.fillStyle = "red";
    ctx.fillRect(food.x * CELL, food.y * CELL, CELL, CELL);
    ctx.shadowBlur = 0;
  }, [snake, food]);

  // ⌨️ keyboard
  useEffect(() => {
    function handle(e: KeyboardEvent) {
      if (e.key === "ArrowUp") setDir({ x: 0, y: -1 });
      if (e.key === "ArrowDown") setDir({ x: 0, y: 1 });
      if (e.key === "ArrowLeft") setDir({ x: -1, y: 0 });
      if (e.key === "ArrowRight") setDir({ x: 1, y: 0 });
    }
    window.addEventListener("keydown", handle);
    return () => window.removeEventListener("keydown", handle);
  }, []);

  // 📱 swipe
  useEffect(() => {
    let startX = 0;
    let startY = 0;

    function touchStart(e: TouchEvent) {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
    }

    function touchEnd(e: TouchEvent) {
      const dx = e.changedTouches[0].clientX - startX;
      const dy = e.changedTouches[0].clientY - startY;

      if (Math.abs(dx) > Math.abs(dy)) {
        setDir(dx > 0 ? { x: 1, y: 0 } : { x: -1, y: 0 });
      } else {
        setDir(dy > 0 ? { x: 0, y: 1 } : { x: 0, y: -1 });
      }
    }

    window.addEventListener("touchstart", touchStart);
    window.addEventListener("touchend", touchEnd);

    return () => {
      window.removeEventListener("touchstart", touchStart);
      window.removeEventListener("touchend", touchEnd);
    };
  }, []);

  function restart() {
    setSnake([{ x: 10, y: 10 }, { x: 9, y: 10 }]);
    setFood({ x: 5, y: 5 });
    setDir({ x: 1, y: 0 });
    setScore(0);
    setRunning(true);
  }

  return (
    <div className="text-center space-y-4">

      <h1 className="text-2xl font-bold text-cyan-400">
        🐍 Neon Snake
      </h1>

      {/* LEVEL SELECT */}
      <div className="flex justify-center gap-2">
        {["easy", "medium", "hard"].map((l) => (
          <button
            key={l}
            onClick={() => setLevel(l as any)}
            className={`px-3 py-1 rounded ${
              level === l ? "bg-cyan-500" : "bg-white/10"
            }`}
          >
            {l}
          </button>
        ))}
      </div>

      <div className="flex justify-between px-6">
        <span>🏆 {score}</span>
        <span>⚡ {level}</span>
      </div>

      <canvas
        ref={canvasRef}
        width={SIZE}
        height={SIZE}
        className="mx-auto border rounded"
      />

      {!running && (
        <div className="text-red-500 font-bold">
          💀 Game Over
        </div>
      )}

      <button
        onClick={restart}
        className="px-4 py-2 bg-cyan-600 rounded"
      >
        Restart
      </button>

    </div>
  );
}