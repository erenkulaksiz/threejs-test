import { TextureLoader, Vector3 } from "three";
import { useLoader } from "@react-three/fiber";
import objects from "@/constants/blocks";
import type { BlockProps } from "./Block.types";

export default function Block({
  pos,
  objectId,
  blockId,
  id,
  onClick,
  hoverBlock,
  ...props
}: BlockProps) {
  const objectKey =
    Object.keys(objects).find((obj) => objects[obj].id == blockId) || "plank";

  const { image } = objects[objectKey];
  const texture = useLoader(TextureLoader, image);

  return (
    <mesh
      key={objectId}
      userData={{ objectId, id }}
      position={new Vector3(pos.x, pos.y, pos.z)}
      onClick={typeof onClick === "function" ? onClick : undefined}
      {...props}
      castShadow
      receiveShadow
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshPhongMaterial
        map={texture}
        shininess={0}
        opacity={hoverBlock ? 0.6 : 1}
        transparent={hoverBlock ? true : false}
      />
    </mesh>
  );
}
