import { useState } from "react";
import { Trash2 } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Sheet, SheetContent, SheetDescription, SheetTitle } from "@/components/ui/sheet";
import { formatEuros, useCart, type CartLine } from "@/hooks/use-cart";
import QuantityPicker from "./QuantityPicker";

const ORDER_EMAIL = "layescataberna@gmail.com";

const buildOrderLink = (lines: CartLine[], total: number, hasUnpriced: boolean) => {
  const items = lines.map(({ kind, name, price, qty }) => {
    const unidad = kind === "menu" ? "menú para regalar" : "botella";
    return `${qty} x ${name}${price !== undefined ? ` (${formatEuros(price)} / ${unidad})` : ""}`;
  });
  const body = [
    "Hola, me gustaría hacer este pedido para recoger en La Yesca:",
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
  return `mailto:${ORDER_EMAIL}?subject=${encodeURIComponent("Pedido de La Yesca")}&body=${encodeURIComponent(body)}`;
};

const CartSheet = () => {
  const { lines, total, hasUnpriced, open, setOpen, setQty } = useCart();
  const [isAdult, setIsAdult] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent className="z-[85] w-full sm:max-w-md p-0 flex flex-col gap-0 border-0">
        <div className="px-6 pt-6 pb-2">
          <SheetTitle className="font-display !text-[clamp(34px,3.4vw,48px)] !leading-tight font-normal">
            Tu carrito
          </SheetTitle>
          <SheetDescription className="sr-only">Vinos y menús que has elegido para tu pedido</SheetDescription>
        </div>

        {lines.length === 0 ? (
          <p className="flex-1 p-6 texto-cuerpo">
            Todavía no has añadido nada.
          </p>
        ) : (
          <>
            <ul className="flex-1 overflow-y-auto px-6">
              {lines.map(({ kind, name, price, image, qty }) => (
                <li key={name} className="flex gap-4 py-4">
                  {image && (
                    <img src={image} alt="" className="w-14 h-[93px] object-cover flex-shrink-0" />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="texto-cuerpo leading-snug mb-1">{name}</p>
                    <p className="texto-small mb-2">
                      {kind === "menu" && "Para regalar · "}
                      {price !== undefined ? formatEuros(price * qty) : "Precio a confirmar"}
                    </p>
                    <div className="flex items-center justify-between">
                      <QuantityPicker value={qty} onChange={(value) => setQty(name, value)} />
                      <button
                        type="button"
                        onClick={() => setQty(name, 0)}
                        aria-label={`Quitar ${name} del carrito`}
                        className="p-2 hover:opacity-70 transition-opacity"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="px-6 py-5 bg-tono">
              <div className="flex items-baseline justify-between mb-4">
                <span className="texto-cuerpo">Total</span>
                <span className="texto-subtitulo tabular-nums">
                  {hasUnpriced ? "A confirmar" : formatEuros(total)}
                </span>
              </div>

              <label className="flex items-start gap-3 mb-4 texto-cuerpo cursor-pointer">
                <Checkbox
                  checked={isAdult}
                  onCheckedChange={(checked) => setIsAdult(checked === true)}
                  className="mt-1"
                />
                Confirmo que soy mayor de 18 años
              </label>

              <button
                type="button"
                disabled={!isAdult}
                onClick={() => { window.location.href = buildOrderLink(lines, total, hasUnpriced); }}
                className="boton w-full disabled:opacity-40"
              >
                Enviar pedido por correo
              </button>

              <p className="texto-small mt-3">
                Aún no se paga nada. Te confirmamos disponibilidad y precio, y pagas al recoger tu pedido en La Yesca.
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
