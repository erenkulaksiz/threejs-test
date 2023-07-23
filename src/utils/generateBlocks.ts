import { Vector3 } from "three";
import guid from "./guid";
import type { BlockTypes } from "@/types/Block";

export default function generateBlocks() {
  let _blocks: BlockTypes[] = [];
  for (let i = 0; i < 15; i++) {
    for (let j = 0; j < 15; j++) {
      _blocks.push({
        id: guid(),
        pos: new Vector3(Math.round(i - 7), -0.5, Math.round(j - 7)),
        blockId: 1,
      });
    }
  }
  return _blocks;
}
