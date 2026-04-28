"use client";

import { useEffect, useState } from "react";

export function useGameTimer(active: boolean) {
  const [time, setTime] = useState(0);

  useEffect(() => {
    if (!active) return;

    const interval = setInterval(() => {
      setTime((t) => t + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [active]);

  return time;
}