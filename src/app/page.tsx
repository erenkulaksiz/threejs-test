"use client";
import { useEffect, useState } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { Stats, OrbitControls, Line } from "@react-three/drei";
import Pixelation from "@/components/Pixelation";
import { EffectComposer } from "@react-three/postprocessing";
import { Vector3, Vector2 } from "three";

interface Box {
  id: string;
  color: string;
  pos: [number, number, number];
}

function Raycast() {
  const [pos, setPos] = useState<[number, number, number]>([0, 0, 0]);
  const [boxes, setBoxes] = useState<Box[]>([]);
  const [hovered, setHovered] = useState<Box["id"] | null>(null);
  const { raycaster, scene, camera } = useThree();

  raycaster.setFromCamera(new Vector2(0, 0), camera);

  useEffect(() => {
    function handleMouseMove(e: MouseEvent) {
      raycaster.setFromCamera(
        new Vector2(
          (e.clientX / window.innerWidth) * 2 - 1,
          -(e.clientY / window.innerHeight) * 2 + 1
        ),
        camera
      );

      const intersects = raycaster.intersectObjects(scene.children);

      const object = intersects.find(
        (obj) => obj.object.userData.id === "plane"
      );

      if (!object) return;

      setPos([
        Math.round(object.point.x),
        Math.round(object.point.y) + 0.5,
        Math.round(object.point.z),
      ]);
    }

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useEffect(() => {
    if (!hovered) return;

    function handleRightClick() {
      console.log("test");
      console.log("hovered", hovered);
      if (!hovered) return;
      setBoxes((prev) => {
        const box = prev.find((box) => box.id === hovered);
        if (!box) return prev;
        return prev.filter((box) => box.id !== hovered);
      });
      setHovered(null);
    }

    window.addEventListener("contextmenu", handleRightClick);
    return () => {
      window.removeEventListener("contextmenu", handleRightClick);
    };
  }, [hovered]);

  function createBox() {
    const position = [
      Math.round(pos[0]),
      Math.round(pos[1]) - 0.5,
      Math.round(pos[2]),
    ];
    const box = boxes.find(
      (box) =>
        box.pos[0] === position[0] &&
        box.pos[1] === position[1] &&
        box.pos[2] === position[2]
    );

    if (box) return;
    const newBox: Box = {
      id: Math.random().toString(),
      pos,
      color: "red",
    };
    setBoxes((prev) => [...prev, newBox]);
  }

  function onBoxHover(box: Box) {
    setHovered(box.id);
  }

  function onBoxUnhover() {
    setHovered(null);
  }

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
        onClick={createBox}
      >
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="blue" />
      </mesh>
      {boxes.map((box) => (
        <mesh
          key={box.id}
          position={new Vector3(box.pos[0], box.pos[1], box.pos[2])}
          onPointerEnter={() => onBoxHover(box)}
          onPointerMove={() => onBoxHover(box)}
          onPointerLeave={() => onBoxUnhover()}
        >
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial
            color={hovered == box.id ? "hotpink" : box.color}
          />
        </mesh>
      ))}
    </>
  );
}

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
      <mesh position={[0, -1, 0]} castShadow userData={{ id: "plane" }}>
        <boxGeometry args={[100, 0.01, 100]} />
        <meshStandardMaterial color="white" />
      </mesh>
      <EffectComposer>
        <Pixelation />
      </EffectComposer>
    </Canvas>
  );
}
