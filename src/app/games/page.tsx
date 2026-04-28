import Link from "next/link";

const games = [
  { name: "🧠 Memory Game", path: "/games/memory" },
  { name: "🧩 Sudoku", path: "/games/sudoku" },
  { name: "🎮 Sliding Puzzle", path: "/games/sliding" },
  { name: "🐍 Snake Game", path: "/games/snake" },
];

export default function GamesPage() {
  return (
    <div className="p-6 space-y-6 text-center">
      
      <h1 className="text-3xl font-bold">
        🎮 All Games
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md mx-auto">
        {games.map((game) => (
          <Link
            key={game.path}
            href={game.path}
            className="block p-4 bg-white/10 border rounded hover:bg-white/20"
          >
            {game.name}
          </Link>
        ))}
      </div>

    </div>
  );
}