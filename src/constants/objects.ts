import { ObjectTypes } from "@/types/Object";

const objects: { [key: string]: ObjectTypes } = {
  stone: {
    id: 0,
    name: "stone",
    color: "#999999",
    image: "stone.png",
  },
  plank: {
    id: 1,
    name: "plank",
    color: "#c2b280",
    image: "plank.png",
  },
};

export default objects;