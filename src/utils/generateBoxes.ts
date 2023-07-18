import { Vector3 } from "three";
import guid from "./guid";
import type { BoxTypes } from "@/types/Box";

export default function generateBoxes() {
  let _boxes: BoxTypes[] = [];
  for (let i = 0; i < 15; i++) {
    for (let j = 0; j < 15; j++) {
      _boxes.push({
        id: guid(),
        pos: new Vector3(Math.round(i - 7), -0.5, Math.round(j - 7)),
        blockId: 1,
      });
    }
  }
  return _boxes;
}
