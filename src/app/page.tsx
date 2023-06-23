"use client";
import { useState } from "react";
import { Canvas, MeshProps } from "@react-three/fiber";
import { Stats, OrbitControls, Stage } from "@react-three/drei";
import Pixelation from "@/components/Pixelation";
import { EffectComposer } from "@react-three/postprocessing";

interface IBox extends MeshProps {
  boxId: string;
  onBoxClick: (id: string) => void;
  isClicked: boolean;
}

function Box({ boxId, onBoxClick, isClicked, ...props }: IBox) {
  return (
    <mesh {...props} onClick={() => onBoxClick(boxId)}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={isClicked ? "hotpink" : "orange"} />
    </mesh>
  );
}

const boxes = [
  { id: "0", pos: [0, 0, 0] },
  { id: "1", pos: [0, 5, 0] },
];

export default function Home() {
  const [clickedBox, setClickedBox] = useState<string>("-1");

  return (
    <Canvas shadows gl={{ antialias: false }}>
      <ambientLight intensity={1} />
      <pointLight position={[10, 10, 10]} intensity={1} castShadow />
      {boxes.map((box) => (
        <Box
          position={[box.pos[0], box.pos[1], box.pos[2]]}
          castShadow
          boxId={box.id}
          onBoxClick={(id) => setClickedBox(id === clickedBox ? "-1" : id)}
          isClicked={box.id === clickedBox}
          key={box.id}
        />
      ))}
      <OrbitControls />
      <Stats />
      <mesh position={[0, -1, 0]} castShadow>
        <boxGeometry args={[10, 0.2, 10]} />
        <meshStandardMaterial color="white" />
      </mesh>
      <EffectComposer>
        <Pixelation />
      </EffectComposer>
    </Canvas>
  );
}
