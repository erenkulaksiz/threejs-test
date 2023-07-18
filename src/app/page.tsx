"use client";
import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Stats } from "@react-three/drei";
import { EffectComposer } from "@react-three/postprocessing";
import Pixelation from "@/components/Pixelation";
import Blocks from "@/components/Blocks";
import ObjectSelector from "@/components/ObjectSelector";
import PlayerCam from "@/components/PlayerCam";

export default function Home() {
  const [selectedBlock, setSelectedBlock] = useState<number>(0);

  return (
    <>
      <ObjectSelector
        selectedBlock={selectedBlock}
        onBlockSelect={(blockId) => setSelectedBlock(blockId)}
      />
      <Canvas shadows="basic" style={{ backgroundColor: "black" }}>
        <ambientLight intensity={1} />
        <pointLight position={[10, 10, 10]} intensity={1} castShadow />
        <PlayerCam />
        <Stats />
        <Blocks selectedBlock={selectedBlock} />
        <EffectComposer>
          <Pixelation />
        </EffectComposer>
      </Canvas>
    </>
  );
}
