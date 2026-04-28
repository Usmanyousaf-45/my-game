import Link from "next/link";
import GameCard from "@/components/GameCard";
import GameScene from "@/game3d/GameScene";

export default function Home() {
  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold mb-6">🧩 Puzzle Game Hub</h1>

      <div className="grid md:grid-cols-3 gap-6">
        <GameCard title="Memory Game" link="/games/memory" />
        <GameCard title="Sudoku" link="/games/sudoku" />
        <GameCard title="Sliding Puzzle" link="/games/sliding" />
        <GameCard title="Snake Game" link="/games/snake" />
      </div>
    </div>
  );
}