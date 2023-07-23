import { useEffect } from "react";
import blocks from "@/constants/blocks";
import { useBlockStore } from "@/stores/blockStore";
import controls from "@/constants/controls";
import BlockSelectorHUDItem from "./BlockSelectorHUDItem";

export default function BlockSelector() {
  const selectedBlock = useBlockStore((state) => state.selectedBlock);
  const { setSelectedBlock, onLoadBlocks, onSaveBlocks, onResetBlocks } =
    useBlockStore((state) => state.actions);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code == controls.SAVEBLOCKS.code) {
        onSaveBlocks();
      } else if (event.code == controls.LOADBLOCKS.code) {
        onLoadBlocks();
      }

      if (event.code == controls.RESETBLOCKS.code) {
        onResetBlocks();
      }

      Object.keys(blocks).forEach((block) => {
        const key = blocks[block].key as keyof typeof blocks;
        const id = blocks[block].id;
        if (key == event.key) {
          setSelectedBlock(id);
        }
      });
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="absolute left-0 bottom-0 text-white z-10 mb-5 ml-5 flex justify-center align-center gap-2">
      {Object.keys(blocks).map((block) => {
        const {
          id,
          image,
          isVisibleOnSelector,
          key: keyboardKey,
        } = blocks[block];

        if (!isVisibleOnSelector) return;

        return (
          <BlockSelectorHUDItem
            key={id}
            id={id}
            onSelect={setSelectedBlock}
            isSelected={selectedBlock == id}
            keyboardKey={keyboardKey}
            image={image}
            block={block}
          />
        );
      })}
      <button className="flex flex-col items-center" onClick={onSaveBlocks}>
        <span>Save</span>
        <span className="text-xs">(c)</span>
      </button>
      <button className="flex flex-col items-center" onClick={onLoadBlocks}>
        <span>Load</span>
        <span className="text-xs">(v)</span>
      </button>
      <button className="flex flex-col items-center" onClick={onLoadBlocks}>
        <span>Reset</span>
        <span className="text-xs">(r)</span>
      </button>
    </div>
  );
}
