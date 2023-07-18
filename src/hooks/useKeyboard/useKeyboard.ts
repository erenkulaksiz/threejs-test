import { useEffect, useState } from "react";

export default function useKeyboard() {
  const [keys, setKeys] = useState<Set<string>>(new Set());

  function handleKeyDown(event: KeyboardEvent) {
    setKeys(keys.add(event.code));
  }

  function handleKeyUp(event: KeyboardEvent) {
    keys.delete(event.code);
    setKeys(keys);
  }

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  return keys;
}
