"use client";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

export default function Player() {
  const ref = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (!ref.current) return;
    ref.current.position.z -= 0.05; // auto run forward
  });

  return (
    <mesh ref={ref} position={[0, 0.5, 0]}>
      <boxGeometry args={[0.5, 1, 0.5]} />
      <meshStandardMaterial color="green" />
    </mesh>
  );
}