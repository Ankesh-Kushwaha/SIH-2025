import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Html } from "@react-three/drei";
import Tree from "./Tree";
import WaterPlane from "./WaterPlane";
import PollutionParticles from "./PollutionParticles";

export default function EnvScene({ health = 1 }) {
  const treeHealth = health;
  const waterLevel = 0.2 + health * 0.8;
  const pollution = 1 - health;

  return (
    <Canvas
      camera={{ position: [6, 4, 6], fov: 50 }}
      style={{ height: 420, borderRadius: 16 }}
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 10, 5]} intensity={0.8} />
      <pointLight position={[-5, 3, -5]} intensity={0.4} />

      {/* ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]}>
        <planeGeometry args={[12, 12]} />
        <meshStandardMaterial color={health > 0.5 ? "#a7f3d0" : "#cbd5e1"} />
      </mesh>

      {/* multiple trees */}
      {new Array(6).fill().map((_, i) => {
        const x = -3 + (i % 3) * 3;
        const z = -1 + Math.floor(i / 3) * 3;
        return <Tree key={i} position={[x, 0, z]} health={treeHealth} />;
      })}

      <WaterPlane level={waterLevel} />
      <PollutionParticles intensity={pollution} />
      <OrbitControls enablePan enableZoom enableRotate />

      <Html position={[0, 1.8, 0]} center>
        <div className="text-center p-1 rounded-md bg-white/60 backdrop-blur-sm shadow-sm">
          <strong className="text-sm">
            Environment Health: {(health * 100).toFixed(0)}%
          </strong>
        </div>
      </Html>
    </Canvas>
  );
}
