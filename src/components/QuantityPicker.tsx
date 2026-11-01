import { Minus, Plus } from "lucide-react";

interface QuantityPickerProps {
  value: number;
  min?: number;
  onChange: (value: number) => void;
}

const QuantityPicker = ({ value, min = 1, onChange }: QuantityPickerProps) => (
  <div className="inline-flex items-center border border-foreground/25 rounded-sm">
    <button
      type="button"
      onClick={() => onChange(value - 1)}
      disabled={value <= min}
      aria-label="Quitar una botella"
      className="p-2.5 text-foreground/70 hover:text-foreground disabled:opacity-30 transition-colors"
    >
      <Minus className="w-3.5 h-3.5" />
    </button>
    <span className="w-8 text-center font-body text-sm text-foreground" aria-live="polite">{value}</span>
    <button
      type="button"
      onClick={() => onChange(value + 1)}
      aria-label="Añadir una botella"
      className="p-2.5 text-foreground/70 hover:text-foreground transition-colors"
    >
      <Plus className="w-3.5 h-3.5" />
    </button>
  </div>
);

export default QuantityPicker;
