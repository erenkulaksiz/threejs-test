import { BoxProps } from "./Box.types";

export default function Box({
  boxId,
  onBoxClick,
  isClicked,
  ...props
}: BoxProps) {
  return (
    <mesh {...props} onClick={() => onBoxClick(boxId)}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={isClicked ? "hotpink" : "orange"} />
    </mesh>
  );
}
