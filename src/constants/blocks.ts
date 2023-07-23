import { BlockItemTypes } from "@/types/BlockItem";

const blocks: { [key: string]: BlockItemTypes } = {
  stone: {
    id: 0,
    name: "stone",
    color: "#999999",
    image: "stone.png",
    key: 1,
    isVisibleOnSelector: true,
  },
  plank: {
    id: 1,
    name: "plank",
    color: "#c2b280",
    image: "plank.png",
    key: 2,
    isVisibleOnSelector: true,
  },
  dirt: {
    id: 2,
    name: "dirt",
    color: "#8b4513",
    image: "dirt.png",
    key: 3,
    isVisibleOnSelector: true,
  },
};

export default blocks;
