import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { bodegaData } from "@/data/bodega";
import { giftMenus } from "@/data/regalos";

const STORAGE_KEY = "la-yesca-carrito";

type Quantities = Record<string, number>;

interface Product {
  kind: "vino" | "menu";
  name: string;
  /* Sin precio el total queda "a confirmar" */
  price?: number;
  image?: string;
}

export interface CartLine extends Product {
  qty: number;
}

const products: Product[] = [
  ...bodegaData.flatMap(c => c.wines).map((wine): Product => ({
    kind: "vino",
    name: wine.name,
    price: wine.bottle ? Number(wine.bottle) : undefined,
    image: wine.image,
  })),
  ...giftMenus.map((menu): Product => ({ kind: "menu", name: menu.name, price: menu.price })),
];

interface CartContextValue {
  lines: CartLine[];
  count: number;
  total: number;
  hasUnpriced: boolean;
  open: boolean;
  setOpen: (open: boolean) => void;
  add: (name: string, qty: number) => void;
  setQty: (name: string, qty: number) => void;
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

  const add = useCallback((name: string, qty: number) => {
    setQuantities(q => ({ ...q, [name]: (q[name] ?? 0) + qty }));
  }, []);

  const setQty = useCallback((name: string, qty: number) => {
    setQuantities(q => {
      const { [name]: _removed, ...rest } = q;
      return qty > 0 ? { ...rest, [name]: qty } : rest;
    });
  }, []);

  const value = useMemo(() => {
    const lines = products.flatMap(product => {
      const qty = quantities[product.name];
      return Number.isInteger(qty) && qty > 0 ? [{ ...product, qty }] : [];
    });
    return {
      lines,
      count: lines.reduce((sum, l) => sum + l.qty, 0),
      total: lines.reduce((sum, l) => sum + (l.price ?? 0) * l.qty, 0),
      hasUnpriced: lines.some(l => l.price === undefined),
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
