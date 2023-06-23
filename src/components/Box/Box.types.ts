import { MeshProps } from "@react-three/fiber";

export interface BoxProps extends MeshProps {
  boxId: string;
  onBoxClick: (id: string) => void;
  isClicked: boolean;
}
