"use client";
import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stats } from "@react-three/drei";
import { EffectComposer } from "@react-three/postprocessing";
import Pixelation from "@/components/Pixelation";
import Raycast from "@/components/Raycast";
import ObjectSelector from "@/components/ObjectSelector";

export default function Home() {
  const [selectedBlock, setSelectedBlock] = useState<number>(0);

  return (
    <>
      <ObjectSelector
        selectedBlock={selectedBlock}
        onBlockSelect={(blockId) => setSelectedBlock(blockId)}
      />
      <Canvas
        shadows
        gl={{ antialias: false }}
        style={{ backgroundColor: "black" }}
      >
        <ambientLight intensity={1} />
        <pointLight position={[10, 10, 10]} intensity={1} castShadow />
        <OrbitControls />
        <Stats />
        <Raycast selectedBlock={selectedBlock} />
        <EffectComposer>
          <Pixelation />
        </EffectComposer>
      </Canvas>
    </>
  );
}
