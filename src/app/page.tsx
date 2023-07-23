"use client";
import { Canvas } from "@react-three/fiber";
import { Stats } from "@react-three/drei";
import { EffectComposer } from "@react-three/postprocessing";
import Pixelation from "@/components/Pixelation";
import Blocks from "@/components/Blocks";
import PlayerCam from "@/components/PlayerCam";
import BlockSelector from "@/components/BlockSelector";

export default function Home() {
  return (
    <>
      <BlockSelector />
      <Canvas shadows="basic" style={{ backgroundColor: "black" }}>
        <ambientLight intensity={1} />
        <pointLight position={[10, 10, 10]} intensity={1} castShadow />
        <PlayerCam />
        <Stats />
        <Blocks />
        <EffectComposer>
          <Pixelation />
        </EffectComposer>
      </Canvas>
    </>
  );
}
