import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="p-4 flex justify-between bg-black/40 backdrop-blur-md border-b border-white/10">
      <Link href="/" className="font-bold text-xl">
        🎮 Puzzle Hub
      </Link>

      <div className="flex gap-4 text-sm">
        <Link href="/">Home</Link>
        <Link href="/games">Games</Link>
        <Link href="/leaderboard">Leaderboard</Link>
      </div>
    </nav>
  );
}