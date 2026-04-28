export function saveScore(score: number) {
  const data = JSON.parse(localStorage.getItem("leaderboard") || "[]");

  data.push({ score, date: Date.now() });

  data.sort((a: any, b: any) => b.score - a.score);

  localStorage.setItem("leaderboard", JSON.stringify(data.slice(0, 10)));
}

export function getScores() {
  return JSON.parse(localStorage.getItem("leaderboard") || "[]");
}