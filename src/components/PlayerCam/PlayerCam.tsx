import { useEffect } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import { Vector3 } from "three";
import useKeyboard from "@/hooks/useKeyboard/useKeyboard";
import controls from "@/constants/controls";
import { PointerLockControls } from "@react-three/drei";

export default function PlayerCam() {
  const keyboard = useKeyboard();
  const { camera } = useThree();

  useEffect(() => {
    camera.position.set(0, 1.5, 0);
    camera.rotation.set(0, 0, 0);
  }, []);

  useFrame(() => {
    const move = new Vector3(0, 0, 0);
    let shiftModifier = 1;

    if (keyboard.has(controls.SHIFT.code)) {
      shiftModifier = controls.SHIFT.modifier;
    }

    if (keyboard.has(controls.FORWARD.code)) {
      move.z -= controls.FORWARD.modifier * shiftModifier;
    }
    if (keyboard.has(controls.BACKWARD.code)) {
      move.z += controls.BACKWARD.modifier * shiftModifier;
    }
    if (keyboard.has(controls.LEFT.code)) {
      move.x -= controls.LEFT.modifier * shiftModifier;
    }
    if (keyboard.has(controls.RIGHT.code)) {
      move.x += controls.RIGHT.modifier * shiftModifier;
    }

    const direction = camera.getWorldDirection(new Vector3());
    camera.position.addScaledVector(direction, move.z * -1);
    camera.position.addScaledVector(
      direction.cross(new Vector3(0, 1, 0)),
      move.x
    );
  }, 1);

  return <PointerLockControls />;
}
