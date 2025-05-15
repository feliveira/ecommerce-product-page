import { ProductColorVariant } from "@/types"

interface ColorSelectorProps {
  colors: ProductColorVariant[],
  selectedColor: ProductColorVariant,
  onSelectColor: (color: ProductColorVariant) => void
}

export default function ColorSelector({
  colors,
  selectedColor,
  onSelectColor,
}: ColorSelectorProps) {
  return (
    <div className="mt-6 flex flex-col">
      <p className="text-lg text-zinc-900">
        Cor: <span className="font-bold">{selectedColor.name}</span>
      </p>
      <div className="flex items-center gap-3 mt-3">
        {colors.map((color: ProductColorVariant) => (
          <button
            key={color.value}
            onClick={() => onSelectColor(color)}
            className={`relative -m-0.5 flex items-center justify-center rounded-full p-0.5 focus:outline-none transition-all duration-150 ease-in-out
                          ${
                            selectedColor.value === color.value
                              ? "ring-2 ring-offset-1 ring-zinc-900"
                              : "hover:ring-1 hover:ring-zinc-400"
                          }`}
            title={color.name}
            aria-label={`Select color ${color.name}`}
            aria-pressed={selectedColor.value === color.value}
          >
            <span
              style={{ backgroundColor: color.hex }}
              className="h-8 w-8 rounded-full border border-black border-opacity-10"
            />
          </button>
        ))}
      </div>
    </div>
  )
}
