export function shuffleArray<T>(array: T[]): T[] {
  return [...array].sort(() => Math.random() - 0.5);
}

export function isEqual(a: any, b: any) {
  return JSON.stringify(a) === JSON.stringify(b);
}