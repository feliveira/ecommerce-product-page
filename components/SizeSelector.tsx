interface SizeSelectorProps {
  sizes: string[];
  selectedSize: string;
  onSelectSize: (size: string) => void;
}

export default function SizeSelector({
  sizes,
  selectedSize,
  onSelectSize,
}: SizeSelectorProps) {
  return (
    <div className="mt-2 flex flex-col">
      <p className="text-lg text-zinc-900">
        Tamanho: <span className="font-bold">{selectedSize}</span>
      </p>
      <div className="flex items-center gap-3 mt-3">
        {sizes.map((size: string) => (
          <button
            key={size}
            onClick={() => onSelectSize(size)}
            className={`flex items-center justify-center px-4 py-2 rounded-lg transition-colors delay-100 cursor-pointer
                          ${
                            selectedSize === size
                              ? "bg-zinc-900 text-zinc-100"
                              : "bg-zinc-100 text-zinc-900"
                          }`}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
}
