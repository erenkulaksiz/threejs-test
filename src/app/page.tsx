"use client";
import { useEffect, useRef, useState } from "react";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { Stats, OrbitControls, Line } from "@react-three/drei";
import Pixelation from "@/components/Pixelation";
import { EffectComposer } from "@react-three/postprocessing";
import { Vector3, Vector2, BufferGeometry } from "three";
import Box from "@/components/Box";

const boxes = [
  { id: "0", pos: [0, 0, 0] },
  { id: "1", pos: [0, 5, 0] },
];

function Raycast() {
  const [pos, setPos] = useState<[number, number, number]>([0, 0, 0]);
  const { raycaster, scene, camera } = useThree();

  raycaster.setFromCamera(new Vector2(0, 0), camera);
  const intersects = raycaster.intersectObjects(scene.children);
  console.log(intersects);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      raycaster.setFromCamera(
        new Vector2(
          (e.clientX / window.innerWidth) * 2 - 1,
          -(e.clientY / window.innerHeight) * 2 + 1
        ),
        camera
      );
      const intersects = raycaster.intersectObjects(scene.children);

      if (intersects[0]?.object.userData.id === "box") return;
      setPos([
        intersects[0]?.point.x,
        intersects[0]?.point.y,
        intersects[0]?.point.z,
      ]);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <>
      <Line
        points={[
          [0, 0, 0],
          [0, 5, 0],
        ]}
        color="#00ff00"
        lineWidth={5}
      />
      <mesh
        position={new Vector3(pos[0], pos[1], pos[2])}
        userData={{ id: "box" }}
      >
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="blue" />
      </mesh>
    </>
  );
}

export default function Home() {
  const [clickedBox, setClickedBox] = useState<string>("-1");

  return (
    <Canvas shadows gl={{ antialias: false }}>
      <ambientLight intensity={1} />
      <pointLight position={[10, 10, 10]} intensity={1} castShadow />
      {/*boxes.map((box) => (
        <Box
          position={[box.pos[0], box.pos[1], box.pos[2]]}
          castShadow
          boxId={box.id}
          onBoxClick={(id) => setClickedBox(id === clickedBox ? "-1" : id)}
          isClicked={box.id === clickedBox}
          key={box.id}
        />
      ))*/}
      <OrbitControls />
      <Stats />
      <Raycast />
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
