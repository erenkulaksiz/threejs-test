"use client";
import { useEffect, useState } from "react";
import { useThree } from "@react-three/fiber";
import { Line } from "@react-three/drei";
import { Vector3, Vector2 } from "three";

interface Box {
  id: string;
  color: string;
  pos: [number, number, number];
}

export default function Raycast() {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [pos, setPos] = useState<[number, number, number]>([0, -0.5, 0]);
  const [boxes, setBoxes] = useState<Box[]>([]);
  const [hovered, setHovered] = useState<Box["id"] | null>(null);
  const { raycaster, scene, camera } = useThree();

  raycaster.setFromCamera(new Vector2(0, 0), camera);

  useEffect(() => {
    generateBoxes();

    function handleMouseMove(e: MouseEvent) {
      raycaster.setFromCamera(
        new Vector2(
          (e.clientX / window.innerWidth) * 2 - 1,
          -(e.clientY / window.innerHeight) * 2 + 1
        ),
        camera
      );

      const intersects = raycaster.intersectObjects(scene.children);

      if (intersects.length == 0) {
        setIsIntersecting(false);
        return setHovered(null);
      } else {
        setIsIntersecting(true);
      }

      const firstIntersect = intersects.filter(
        (el) => el.object.userData.id != "addBox"
      )?.[0];

      if (
        firstIntersect?.object.userData.id == "box" &&
        firstIntersect?.object.userData._id != hovered
      ) {
        setHovered(firstIntersect?.object.userData._id);
      } else if (firstIntersect?.object.userData.id != "box") {
        setHovered(null);
      }

      const object = intersects.find((obj) => obj.object.userData.id === "box");

      if (!object) return;
      if (!firstIntersect?.face?.normal) return;

      setPos([
        Math.round(
          firstIntersect.object.position.x + firstIntersect?.face?.normal?.x
        ),
        Math.round(
          firstIntersect.object.position.y + firstIntersect?.face?.normal?.y
        ) - 0.5,
        Math.round(
          firstIntersect.object.position.z + firstIntersect?.face?.normal?.z
        ),
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

  function generateBoxes() {
    let _boxes: Box[] = [];
    for (let i = 0; i < 15; i++) {
      for (let j = 0; j < 15; j++) {
        _boxes.push({
          id: Math.random().toString(),
          pos: [Math.round(i - 7), -0.5, Math.round(j - 7)],
          //color: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
          color: "orange",
        });
      }
    }
    setBoxes((prev) => [...prev, ..._boxes]);
  }

  return (
    <>
      {/*<Line
        points={[
          [0, 0, 0],
          [0, 5, 0],
        ]}
        color="#00ff00"
        lineWidth={5}
      />*/}
      {isIntersecting && (
        <mesh
          position={new Vector3(pos[0], pos[1], pos[2])}
          userData={{ id: "addBox" }}
          onClick={createBox}
        >
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="blue" />
        </mesh>
      )}
      {boxes.map((box) => (
        <mesh
          key={box.id}
          userData={{ id: "box", _id: box.id }}
          position={new Vector3(box.pos[0], box.pos[1], box.pos[2])}
          //onPointerEnter={() => onBoxHover(box)}
          //onPointerMove={() => onBoxHover(box)}
          //onPointerLeave={() => onBoxUnhover()}
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
