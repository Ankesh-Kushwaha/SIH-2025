import React, { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";

export default function PollutionParticles({ intensity = 0 }) {
  const group = useRef();

  const particles = useMemo(
    () =>
      new Array(40).fill().map(() => ({
        pos: [
          (Math.random() - 0.5) * 10,
          Math.random() * 3 + 0.5,
          (Math.random() - 0.5) * 10,
        ],
        speed: 0.0005 + Math.random() * 0.0015,
        size: 0.02 + Math.random() * 0.06,
      })),
    []
  );

  useFrame(() => {
    if (!group.current) return;
    group.current.children.forEach((c, i) => {
      c.position.y += particles[i].speed * (1 + intensity * 6);
      if (c.position.y > 4) c.position.y = 0.2;
    });
  });

  return (
    <group ref={group}>
      {particles.map((p, i) => (
        <mesh key={i} position={p.pos} scale={[p.size, p.size, p.size]}>
          <sphereGeometry args={[1, 8, 8]} />
          <meshStandardMaterial
            color={`rgba(${120 + intensity * 80}, ${120 - intensity * 40}, ${
              80 - intensity * 50
            }, ${0.25 + intensity * 0.35})`}
            transparent
          />
        </mesh>
      ))}
    </group>
  );
}
