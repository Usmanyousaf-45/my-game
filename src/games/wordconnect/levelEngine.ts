export const WORDS = [
  "CAT","DOG","CODE","GAME","NEXT","REACT","NODE",
  "CAR","TREE","FIRE","WATER","EARTH","AIR",
  "APPLE","MANGO","GRAPE","ORANGE","PEACH"
];

export function generateLevel(level: number) {
  const size = Math.min(3 + Math.floor(level / 2), 6);

  const shuffled = [...WORDS].sort(() => Math.random() - 0.5);

  const words = shuffled.slice(0, size);

  const letters = words
    .join("")
    .split("")
    .sort(() => Math.random() - 0.5);

  return { words, letters, level };
}