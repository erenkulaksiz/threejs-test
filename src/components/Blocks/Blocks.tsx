"use client";
import { useEffect, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Vector3, Vector2 } from "three";
import Box from "@/components/Box";
import generateBoxes from "@/utils/generateBoxes";
import guid from "@/utils/guid";
import type { BoxTypes } from "@/types/Box";
import type { BlocksProps } from "./Blocks.types";

export default function Blocks({ selectedBlock }: BlocksProps) {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [pos, setPos] = useState<Vector3>(new Vector3(0, -0.5, 0));
  const [boxes, setBoxes] = useState<BoxTypes[]>([]);
  const [hovered, setHovered] = useState<BoxTypes["id"] | null>(null);
  const { raycaster, scene, camera } = useThree();

  useFrame(() => {
    raycaster.setFromCamera(new Vector2(0, 0), camera);

    const intersects = raycaster.intersectObjects(scene.children);

    if (intersects.length == 0) {
      setIsIntersecting(false);
      setHovered(null);
      return;
    } else {
      setIsIntersecting(true);
    }

    const firstIntersect = intersects.filter(
      (el) => el.object.userData.objectId != "addBox"
    )?.[0];

    const isHoveredBox =
      firstIntersect?.object.userData.objectId == "box" &&
      firstIntersect?.object.userData.id != hovered;

    if (isHoveredBox) {
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
  });

  useEffect(() => {
    const boxes = generateBoxes();
    setBoxes(boxes);
  }, []);

  useEffect(() => {
    window.addEventListener("contextmenu", handleRightClick);

    function handleRightClick(event: MouseEvent) {
      event.preventDefault();
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
    if (box) return;

    const id = guid();
    const newBox: BoxTypes = {
      id,
      pos,
      blockId: selectedBlock,
    };

    setBoxes((prev) => [...prev, newBox]);
    setHovered(id);
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
