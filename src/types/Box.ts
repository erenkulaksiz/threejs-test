import type { Vector3 } from "three";
import type { ObjectTypes } from "./Object";

export interface BoxTypes {
  id: string;
  blockId: ObjectTypes["id"];
  pos: Vector3;
}
