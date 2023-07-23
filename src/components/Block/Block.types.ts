import type { Vector3 } from "three";
import type { BlockItemTypes } from "@/types/BlockItem";
import { ThreeEvent } from "@react-three/fiber";

export interface BlockProps {
  pos: Vector3;
  objectId: string;
  hoverBlock?: boolean;
  blockId?: BlockItemTypes["id"];
  id?: string;
  onClick?: (event: ThreeEvent<MouseEvent>) => void;
}
