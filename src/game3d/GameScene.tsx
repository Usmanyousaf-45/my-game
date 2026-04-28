"use client";

import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import Player from "./Player";
import Train from "./Train";
import { useGame } from "./useGame";

export default function GameScene() {
  const { trains } = useGame();

  return (
    <Canvas camera={{ position: [0, 3, 8], fov: 60 }}>
      <ambientLight intensity={1} />

      {/* 🌍 Ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[10, 200]} />
        <meshStandardMaterial color="gray" />
      </mesh>

      {/* 👤 Player */}
      <Player />

      {/* 🚆 Trains */}
      {trains.map((t: any) => (
        <Train key={t.id} position={t.position} />
      ))}

      <Environment preset="city" />
    </Canvas>
  );
}