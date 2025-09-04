import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";

export default function WaterPlane({ level = 1 }) {
  // ref for slight wave animation
  const ref = useRef();

  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.z = Math.sin(Date.now() / 4000) * 0.001;
    }
  });

  return (
    <mesh
      ref={ref}
      position={[0, -0.05 + level * 0.4, 0]}
      rotation={[-Math.PI / 2, 0, 0]}
    >
      <planeGeometry args={[12, 12]} />
      <meshStandardMaterial
        transparent
        opacity={0.5 + level * 0.4}
        roughness={0.2}
        metalness={0.1}
        color="#2b6cb0"
      />
    </mesh>
  );
}
