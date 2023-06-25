import objects from "@/constants/objects";
import type { ObjectSelectorProps } from "./ObjectSelector.types";

export default function ObjectSelector({
  selectedBlock,
  onBlockSelect,
}: ObjectSelectorProps) {
  return (
    <div className="absolute left-0 bottom-0 text-white z-10 mb-5 ml-5 flex justify-center align-center gap-2">
      {Object.keys(objects).map((key) => {
        const { id, image } = objects[key];
        return (
          <div key={id}>
            <input
              type="radio"
              name="block"
              id={`block_${id}`}
              className="hidden peer"
              checked={selectedBlock == id}
              onChange={() => onBlockSelect(id)}
            />
            <label
              className="relative bg-black flex h-10 w-10 text-black items-center justify-center"
              htmlFor={`block_${id}`}
            >
              {selectedBlock == id && (
                <div className="absolute inset-0 border-4 border-white/60"></div>
              )}
              <img src={`/${image}`} alt={key} />
            </label>
          </div>
        );
      })}
    </div>
  );
}
