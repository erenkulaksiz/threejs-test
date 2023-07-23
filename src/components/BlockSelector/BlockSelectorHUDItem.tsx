export default function BlockSelectorHUDItem({
  id,
  onSelect,
  isSelected,
  keyboardKey,
  image,
  block,
}: {
  id: number;
  onSelect: (id: number) => void;
  isSelected: boolean;
  keyboardKey: number;
  image: string;
  block: string;
}) {
  return (
    <div key={id}>
      <input
        type="radio"
        name="block"
        id={`block_${id}`}
        className="hidden peer"
        checked={isSelected}
        onChange={() => onSelect(id)}
      />
      <label
        className="relative bg-black flex h-10 w-10 text-black items-center justify-center"
        htmlFor={`block_${id}`}
      >
        {isSelected && (
          <div className="absolute inset-0 border-4 border-white/40"></div>
        )}
        <img src={`/${image}`} alt={block} />
        <div className="absolute inset-0 flex items-center justify-center text-white">
          {keyboardKey}
        </div>
      </label>
    </div>
  );
}
