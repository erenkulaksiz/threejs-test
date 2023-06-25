import type { Vector3 } from "three";
import type { ObjectTypes } from "@/types/Object";

export interface BoxProps {
  pos: Vector3;
  objectId: string;
  hoverBlock?: boolean;
  blockId?: ObjectTypes["id"];
  id?: string;
  onClick?: () => void;
}
