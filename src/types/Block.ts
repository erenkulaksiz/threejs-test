import type { Vector3 } from "three";
import type { BlockItemTypes } from "./BlockItem";

export interface BlockTypes {
  id: string;
  blockId: BlockItemTypes["id"];
  pos: Vector3;
}
