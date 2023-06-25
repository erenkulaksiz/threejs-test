import { ObjectTypes } from "@/types/Object";

export interface ObjectSelectorProps {
  selectedBlock: ObjectTypes["id"];
  onBlockSelect: (id: ObjectTypes["id"]) => void;
}
