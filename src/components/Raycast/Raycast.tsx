"use client";
import { useEffect, useState } from "react";
import { useThree } from "@react-three/fiber";
import { Vector3, Vector2 } from "three";
import Box from "@/components/Box";
import type { BoxTypes } from "@/types/Box";
import type { RaycastProps } from "./Raycast.types";

export default function Raycast({ selectedBlock }: RaycastProps) {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [pos, setPos] = useState<Vector3>(new Vector3(0, -0.5, 0));
  const [boxes, setBoxes] = useState<BoxTypes[]>([]);
  const [hovered, setHovered] = useState<BoxTypes["id"] | null>(null);
  const { raycaster, scene, camera } = useThree();

  raycaster.setFromCamera(new Vector2(0, 0), camera);

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
      (el) => el.object.userData.objectId != "addBox"
    )?.[0];

    if (
      firstIntersect?.object.userData.objectId == "box" &&
      firstIntersect?.object.userData.id != hovered
    ) {
      setHovered(firstIntersect?.object.userData.id);
    } else if (firstIntersect?.object.userData.objectId != "box") {
      setHovered(null);
    }

    const object = intersects.find(
      (obj) => obj.object.userData.objectId === "box"
    );

    if (!object) return;
    if (!firstIntersect?.face?.normal) return;

    setPos(
      new Vector3(
        Math.round(
          firstIntersect.object.position.x + firstIntersect?.face?.normal?.x
        ),
        Math.round(
          firstIntersect.object.position.y + firstIntersect?.face?.normal?.y
        ) - 0.5,
        Math.round(
          firstIntersect.object.position.z + firstIntersect?.face?.normal?.z
        )
      )
    );
  }

  useEffect(() => {
    generateBoxes();
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useEffect(() => {
    window.addEventListener("contextmenu", handleRightClick);

    if (!hovered) return;

    function handleRightClick() {
      if (!hovered) return;
      setBoxes((prev) => {
        const box = prev.find((box) => box.id === hovered);
        if (!box) return prev;
        return prev.filter((box) => box.id !== hovered);
      });
    }

    return () => {
      window.removeEventListener("contextmenu", handleRightClick);
    };
  }, [hovered]);

  function createBox() {
    const position = new Vector3(
      Math.round(pos.x),
      Math.round(pos.y) - 0.5,
      Math.round(pos.z)
    );

    const box = boxes.find(
      (box) =>
        box.pos.x === position.x &&
        box.pos.y === position.y &&
        box.pos.z === position.z
    );

    const id = Math.random().toString();

    if (box) return;

    const newBox: BoxTypes = {
      id,
      pos,
      blockId: selectedBlock,
    };

    setBoxes((prev) => [...prev, newBox]);
    setHovered(id);
  }

  function generateBoxes() {
    let _boxes: BoxTypes[] = [];
    for (let i = 0; i < 15; i++) {
      for (let j = 0; j < 15; j++) {
        _boxes.push({
          id: Math.random().toString(),
          pos: new Vector3(Math.round(i - 7), -0.5, Math.round(j - 7)),
          blockId: 1,
          //color: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
        });
      }
    }
    setBoxes((prev) => [...prev, ..._boxes]);
  }

  return (
    <>
      {isIntersecting && (
        <Box
          pos={pos}
          objectId="addBox"
          onClick={createBox}
          blockId={selectedBlock}
          hoverBlock
        />
      )}
      {boxes.map((box) => (
        <Box
          key={box.id}
          id={box.id}
          objectId="box"
          pos={box.pos}
          blockId={box.blockId}
        />
      ))}
    </>
  );
}
