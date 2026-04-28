import { useEffect, useState } from "react";

export function useGame() {
  const [trains, setTrains] = useState<any[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTrains((prev) => [
        ...prev,
        {
          id: Math.random(),
          position: [Math.random() > 0.5 ? 1.5 : -1.5, 0, -50],
        },
      ]);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return { trains };
}