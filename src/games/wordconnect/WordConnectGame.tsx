"use client";

import { useEffect, useState } from "react";
import { generateLevel } from "./levelEngine";

export default function WordConnectGame() {
  const [data, setData] = useState<any>(null);
  const [input, setInput] = useState("");
  const [found, setFound] = useState<string[]>([]);

  useEffect(() => {
    setData(generateLevel(1));
  }, []);

  if (!data) return <p>Loading...</p>;

  function check() {
    if (data.words.includes(input) && !found.includes(input)) {
      setFound([...found, input]);
    }
    setInput("");
  }

  return (
    <div className="text-center space-y-4">

      <div className="flex flex-wrap justify-center gap-2">
        {data.words.map((w: string, i: number) => (
          <span key={i} className="px-3 py-1 bg-white/10 rounded">
            {found.includes(w) ? w : "____"}
          </span>
        ))}
      </div>

      <div className="text-2xl">{input || "_"}</div>

      <div className="flex flex-wrap justify-center gap-2">
        {data.letters.map((l: string, i: number) => (
          <button
            key={i}
            onClick={() => setInput((prev) => prev + l)}
            className="w-10 h-10 bg-blue-600 text-white rounded"
          >
            {l}
          </button>
        ))}
      </div>

      <button
        onClick={check}
        className="px-4 py-2 bg-green-600 rounded"
      >
        Check
      </button>

    </div>
  );
}