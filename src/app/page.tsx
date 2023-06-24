"use client";
import { Canvas } from "@react-three/fiber";
import { Stats, OrbitControls } from "@react-three/drei";
import Pixelation from "@/components/Pixelation";
import { EffectComposer } from "@react-three/postprocessing";
import Raycast from "@/components/Raycast";

export default function Home() {
  return (
    <Canvas
      shadows
      gl={{ antialias: false }}
      style={{ backgroundColor: "black" }}
    >
      <ambientLight intensity={1} />
      <pointLight position={[10, 10, 10]} intensity={1} castShadow />
      <OrbitControls maxPolarAngle={Math.PI / 2} />
      <Stats />
      <Raycast />
      {/*<mesh position={[0, -1, 0]} castShadow userData={{ id: "plane" }}>
        <boxGeometry args={[101, 0.01, 101]} />
        <meshStandardMaterial color="white" />
  </mesh>*/}
      <EffectComposer>
        <Pixelation />
      </EffectComposer>
    </Canvas>
  );
}
