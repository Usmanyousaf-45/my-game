// utils/score.ts

const STORAGE_KEY = "scores";

function isClient() {
  return typeof window !== "undefined";
}

type Scores = Record<string, number>;

export function saveScore(game: string, score: number) {
  if (!isClient()) return;

  try {
    const old: Scores = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");

    old[game] = Math.max(old[game] || 0, score);

    localStorage.setItem(STORAGE_KEY, JSON.stringify(old));
  } catch (err) {
    console.error("Failed to save score:", err);
  }
}

export function getScores(): Scores {
  if (!isClient()) return {};

  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
  } catch (err) {
    console.error("Failed to get scores:", err);
    return {};
  }
}

export function clearScores() {
  if (!isClient()) return;

  localStorage.removeItem(STORAGE_KEY);
}