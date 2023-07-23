"use client";
import { useEffect, useState } from "react";
import { ThreeEvent, useFrame, useThree } from "@react-three/fiber";
import { Vector3, Vector2 } from "three";
import Block from "@/components/Block";
import generateBlocks from "@/utils/generateBlocks";
import guid from "@/utils/guid";
import { useBlockStore } from "@/stores/blockStore";
import type { BlockTypes } from "@/types/Block";

export default function Blocks() {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [pos, setPos] = useState<Vector3>(new Vector3(0, -0.5, 0));
  const [hovered, setHovered] = useState<BlockTypes["id"] | null>(null);
  const { raycaster, scene, camera } = useThree();

  const selectedBlock = useBlockStore((state) => state.selectedBlock);
  const blocks = useBlockStore((state) => state.blocks);
  const { setBlocks, removeBlock, addBlock } = useBlockStore(
    (state) => state.actions
  );

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
      (el) => el.object.userData.objectId != "addBlock"
    )?.[0];

    const isHoveredBlock =
      firstIntersect?.object.userData.objectId == "block" &&
      firstIntersect?.object.userData.id != hovered;

    if (isHoveredBlock) {
      setHovered(firstIntersect?.object.userData.id);
    } else if (firstIntersect?.object.userData.objectId != "block") {
      setHovered(null);
    }

    const object = intersects.find(
      (obj) => obj.object.userData.objectId === "block"
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
    setBlocks(generateBlocks());
  }, []);

  function onClick(event: ThreeEvent<MouseEvent>) {
    if (event.button == 2) {
      if (!hovered) return;
      removeBlock(hovered);
      return;
    }

    const position = new Vector3(
      Math.round(pos.x),
      Math.round(pos.y) - 0.5,
      Math.round(pos.z)
    );

    const block = blocks.find(
      (block) =>
        block.pos.x === position.x &&
        block.pos.y === position.y &&
        block.pos.z === position.z
    );
    if (block) return;

    const id = guid();

    addBlock({
      id,
      pos,
      blockId: selectedBlock,
    });
    setHovered(id);
  }

  return (
    <>
      {isIntersecting && (
        <Block
          pos={pos}
          objectId="addBlock"
          onClick={onClick}
          blockId={selectedBlock}
          hoverBlock
        />
      )}
      {blocks.map((block) => (
        <Block
          key={block.id}
          id={block.id}
          objectId="block"
          pos={block.pos}
          blockId={block.blockId}
        />
      ))}
    </>
  );
}
