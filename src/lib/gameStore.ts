export function getCoins() {
  return Number(localStorage.getItem("coins") || 100);
}

export function setCoins(c: number) {
  localStorage.setItem("coins", String(c));
}

export function addCoins(c: number) {
  const current = getCoins();
  setCoins(current + c);
}

export function useDailyReward() {
  const last = localStorage.getItem("daily");
  const today = new Date().toDateString();

  if (last !== today) {
    localStorage.setItem("daily", today);
    addCoins(50);
    return true;
  }
  return false;
}