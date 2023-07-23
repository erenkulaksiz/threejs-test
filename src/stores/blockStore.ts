import { create } from "zustand";
import generateBlocks from "@/utils/generateBlocks";
import type { BlockTypes } from "@/types/Block";

interface BlockStore {
  blocks: BlockTypes[];
  selectedBlock: number;
  actions: {
    setSelectedBlock: (blockId: number) => void;
    setBlocks: (blocks: BlockTypes[]) => void;
    addBlock: (block: BlockTypes) => void;
    removeBlock: (blockId: BlockTypes["id"]) => void;
    onSaveBlocks: () => void;
    onLoadBlocks: () => void;
    onResetBlocks: () => void;
  };
}

export const useBlockStore = create<BlockStore>((set) => ({
  blocks: [],
  selectedBlock: 0,
  actions: {
    setSelectedBlock: (blockId) => {
      set(() => ({
        selectedBlock: blockId,
      }));
    },
    setBlocks: (blocks) => {
      set(() => ({
        blocks,
      }));
    },
    addBlock: (block) => {
      set((state) => ({
        blocks: [...state.blocks, block],
      }));
    },
    removeBlock: (blockId) => {
      set((state) => ({
        blocks: state.blocks.filter((block) => block.id !== blockId),
      }));
    },
    onSaveBlocks: () => {
      localStorage.setItem(
        "blocks",
        JSON.stringify(useBlockStore.getState().blocks)
      );
    },
    onLoadBlocks: () => {
      const blocks = localStorage.getItem("blocks");
      if (blocks) {
        set(() => ({
          blocks: JSON.parse(blocks),
        }));
      }
    },
    onResetBlocks: () => {
      set(() => ({
        blocks: generateBlocks(),
      }));
    },
  },
}));
