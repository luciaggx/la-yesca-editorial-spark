import { useState } from "react";
import { Trash2 } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Sheet, SheetContent, SheetDescription, SheetTitle } from "@/components/ui/sheet";
import { formatEuros, useCart, type CartLine } from "@/hooks/use-cart";
import QuantityPicker from "./QuantityPicker";

const ORDER_EMAIL = "layescataberna@gmail.com";

const buildOrderLink = (lines: CartLine[], total: number, hasUnpriced: boolean) => {
  const items = lines.map(({ wine, qty }) =>
    `${qty} x ${wine.name}${wine.bottle ? ` (${formatEuros(Number(wine.bottle))} / botella)` : ""}`);
  const body = [
    "Hola, me gustaría hacer este pedido de vinos para recoger en La Yesca:",
    "",
    ...items,
    "",
    hasUnpriced ? "Total: a confirmar" : `Total: ${formatEuros(total)}`,
    "",
    "Nombre:",
    "Teléfono:",
    "",
    "Confirmo que soy mayor de 18 años.",
  ].join("\n");
  return `mailto:${ORDER_EMAIL}?subject=${encodeURIComponent("Pedido de vinos")}&body=${encodeURIComponent(body)}`;
};

const CartSheet = () => {
  const { lines, total, hasUnpriced, open, setOpen, setQty } = useCart();
  const [isAdult, setIsAdult] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent className="z-[85] w-full sm:max-w-md p-0 flex flex-col gap-0">
        <div className="px-6 py-5 border-b border-foreground/10">
          <SheetTitle className="font-display text-2xl text-foreground" style={{ fontWeight: 200 }}>
            Tu carrito
          </SheetTitle>
          <SheetDescription className="sr-only">Vinos que has elegido para tu pedido</SheetDescription>
        </div>

        {lines.length === 0 ? (
          <p className="flex-1 p-6 font-body text-sm italic text-foreground/60">
            Todavía no has añadido ningún vino.
          </p>
        ) : (
          <>
            <ul className="flex-1 overflow-y-auto px-6">
              {lines.map(({ wine, qty }) => (
                <li key={wine.name} className="flex gap-4 py-4 border-b border-foreground/10">
                  {wine.image && (
                    <img src={wine.image} alt="" className="w-14 h-[93px] object-cover rounded-sm flex-shrink-0" />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="font-body text-sm text-foreground leading-snug mb-1">{wine.name}</p>
                    <p className="font-body text-xs text-foreground/55 mb-2">
                      {wine.bottle ? formatEuros(Number(wine.bottle) * qty) : "Precio a confirmar"}
                    </p>
                    <div className="flex items-center justify-between">
                      <QuantityPicker value={qty} onChange={(value) => setQty(wine, value)} />
                      <button
                        type="button"
                        onClick={() => setQty(wine, 0)}
                        aria-label={`Quitar ${wine.name} del carrito`}
                        className="p-2 text-foreground/45 hover:text-foreground transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="px-6 py-5 border-t border-foreground/10">
              <div className="flex items-baseline justify-between mb-4">
                <span className="font-body text-xs tracking-[0.18em] uppercase text-foreground/55">Total</span>
                <span className="font-display text-2xl text-foreground" style={{ fontWeight: 300 }}>
                  {hasUnpriced ? "A confirmar" : formatEuros(total)}
                </span>
              </div>

              <label className="flex items-start gap-3 mb-4 font-body text-sm text-foreground/80 cursor-pointer">
                <Checkbox
                  checked={isAdult}
                  onCheckedChange={(checked) => setIsAdult(checked === true)}
                  className="mt-0.5"
                />
                Confirmo que soy mayor de 18 años
              </label>

              <button
                type="button"
                disabled={!isAdult}
                onClick={() => { window.location.href = buildOrderLink(lines, total, hasUnpriced); }}
                className="w-full px-4 py-3 bg-foreground text-background rounded-sm font-body text-xs tracking-[0.18em] uppercase hover:opacity-85 disabled:opacity-40 disabled:hover:opacity-40 transition-opacity"
              >
                Enviar pedido por correo
              </button>

              <p className="font-body text-xs text-foreground/55 leading-relaxed mt-3">
                Aún no se paga nada. Te confirmamos disponibilidad y precio, y pagas al recogerlo en La Yesca.
                Si no se abre tu correo, escríbenos a {ORDER_EMAIL}.
              </p>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartSheet;
