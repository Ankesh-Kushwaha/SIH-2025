import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";

export default function Tree({ position = [0, 0, 0], health = 1 }) {
  const ref = useRef();
  useFrame(() => {
    if (ref.current)
      ref.current.rotation.y = Math.sin(Date.now() / 2000) * 0.02;
  });

  const scale = 0.8 + health * 0.8;
  const color = `rgb(${50 - 20 * (1 - health)}, ${120 + 80 * health}, 50)`;

  return (
    <group ref={ref} position={position} scale={[scale, scale, scale]}>
      {/* trunk */}
      <mesh position={[0, 0.45, 0]}>
        <cylinderGeometry args={[0.08, 0.12, 0.9, 12]} />
        <meshStandardMaterial color="#6b3e15" />
      </mesh>

      {/* canopy */}
      <mesh position={[0, 1.0, 0]}>
        <sphereGeometry args={[0.6, 24, 24]} />
        <meshStandardMaterial color={color} metalness={0.1} roughness={0.7} />
      </mesh>
    </group>
  );
}
