"use client";

export default function Page() {
  const scores = JSON.parse(localStorage.getItem("scores") || "[]");

  return (
    <div className="p-6 text-center space-y-4">
      <h1 className="text-3xl font-bold">🏆 Leaderboard</h1>

      {scores.map((s: any, i: number) => (
        <div key={i} className="border p-2 rounded">
          #{i + 1} - {s.score}
        </div>
      ))}
    </div>
  );
}