export function saveScore(game: string, score: number) {
  const old = JSON.parse(localStorage.getItem("scores") || "{}");

  old[game] = Math.max(old[game] || 0, score);

  localStorage.setItem("scores", JSON.stringify(old));
}

export function getScores() {
  return JSON.parse(localStorage.getItem("scores") || "{}");
}