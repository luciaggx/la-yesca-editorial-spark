import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { bodegaData, type Wine } from "@/data/bodega";

const STORAGE_KEY = "la-yesca-carrito";
const wines = bodegaData.flatMap(c => c.wines);

type Quantities = Record<string, number>;

export interface CartLine {
  wine: Wine;
  qty: number;
}

interface CartContextValue {
  lines: CartLine[];
  count: number;
  total: number;
  hasUnpriced: boolean;
  open: boolean;
  setOpen: (open: boolean) => void;
  add: (wine: Wine, qty: number) => void;
  setQty: (wine: Wine, qty: number) => void;
}

const CartContext = createContext<CartContextValue | null>(null);

const readStored = (): Quantities => {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "{}");
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
};

export const formatEuros = (value: number) =>
  `${value.toLocaleString("es-ES", { maximumFractionDigits: 2 })} €`;

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [quantities, setQuantities] = useState<Quantities>(readStored);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(quantities));
    } catch {
      /* Sin almacenamiento el carrito dura solo mientras la página esté abierta */
    }
  }, [quantities]);

  const add = useCallback((wine: Wine, qty: number) => {
    setQuantities(q => ({ ...q, [wine.name]: (q[wine.name] ?? 0) + qty }));
  }, []);

  const setQty = useCallback((wine: Wine, qty: number) => {
    setQuantities(q => {
      const { [wine.name]: _removed, ...rest } = q;
      return qty > 0 ? { ...rest, [wine.name]: qty } : rest;
    });
  }, []);

  const value = useMemo(() => {
    const lines = wines.flatMap(wine => {
      const qty = quantities[wine.name];
      return Number.isInteger(qty) && qty > 0 ? [{ wine, qty }] : [];
    });
    return {
      lines,
      count: lines.reduce((sum, l) => sum + l.qty, 0),
      total: lines.reduce((sum, l) => sum + (l.wine.bottle ? Number(l.wine.bottle) * l.qty : 0), 0),
      hasUnpriced: lines.some(l => !l.wine.bottle),
      open,
      setOpen,
      add,
      setQty,
    };
  }, [quantities, open, add, setQty]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart debe usarse dentro de CartProvider");
  return context;
};
