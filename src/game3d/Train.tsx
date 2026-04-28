"use client";

export default function Train({ position }: any) {
  return (
    <mesh position={position}>
      <boxGeometry args={[1, 1, 3]} />
      <meshStandardMaterial color="red" />
    </mesh>
  );
}