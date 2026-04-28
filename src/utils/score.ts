const STORAGE_KEY = "scores";

function isClient() {
  return typeof window !== "undefined";
}

export function getScores() {
  if (!isClient()) return {};

  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
  } catch {
    return {};
  }
}

export function saveScore(game: string, score: number) {
  if (!isClient()) return;

  try {
    const old = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");

    old[game] = Math.max(old[game] || 0, score);

    localStorage.setItem(STORAGE_KEY, JSON.stringify(old));
  } catch {}
}