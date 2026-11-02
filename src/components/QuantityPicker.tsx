import { Minus, Plus } from "lucide-react";

interface QuantityPickerProps {
  value: number;
  min?: number;
  onChange: (value: number) => void;
}

const QuantityPicker = ({ value, min = 1, onChange }: QuantityPickerProps) => (
  <div className="inline-flex items-center bg-foreground/10">
    <button
      type="button"
      onClick={() => onChange(value - 1)}
      disabled={value <= min}
      aria-label="Quitar uno"
      className="p-2.5 hover:bg-foreground/10 disabled:opacity-30 transition-colors"
    >
      <Minus className="w-3.5 h-3.5" />
    </button>
    <span className="w-8 text-center texto-cuerpo" aria-live="polite">{value}</span>
    <button
      type="button"
      onClick={() => onChange(value + 1)}
      aria-label="Añadir uno"
      className="p-2.5 hover:bg-foreground/10 transition-colors"
    >
      <Plus className="w-3.5 h-3.5" />
    </button>
  </div>
);

export default QuantityPicker;
