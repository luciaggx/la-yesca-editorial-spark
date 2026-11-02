import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { formatEuros, useCart } from "@/hooks/use-cart";
import type { Wine, WineType } from "@/data/bodega";
import QuantityPicker from "./QuantityPicker";

const typeLabel: Record<WineType, string> = {
  espumoso: "Espumoso",
  blanco:   "Blanco",
  naranja:  "Naranja",
  rosado:   "Rosado",
  tinto:    "Tinto",
  generoso: "Generoso",
  vermut:   "Vermut",
  dulce:    "Dulce",
};

interface WineDialogProps {
  wine: Wine | null;
  onClose: () => void;
}

const WineDialog = ({ wine, onClose }: WineDialogProps) => {
  const { add, setOpen } = useCart();
  const [qty, setQty] = useState(1);

  useEffect(() => {
    if (wine) setQty(1);
  }, [wine]);

  if (!wine) return null;

  const details = [
    ["Tipo", typeLabel[wine.type]],
    ["Bodega", wine.bodega],
    ["Variedad", wine.variety],
    ["Origen", wine.origin],
  ].filter(([, value]) => value);

  const addToCart = () => {
    add(wine.name, qty);
    onClose();
    toast(`${wine.name} añadido al carrito`, {
      position: "top-center",
      action: { label: "Ver carrito", onClick: () => setOpen(true) },
    });
  };

  return (
    <Dialog open onOpenChange={(open) => { if (!open) onClose(); }}>
      <DialogContent className="z-[85] w-[calc(100%-2rem)] max-w-3xl max-h-[90vh] overflow-y-auto p-0 gap-0 border-0 rounded-none sm:rounded-none md:grid-cols-2">
        <div className="overflow-hidden" style={{ backgroundColor: "hsl(240 5% 86%)" }}>
          {wine.image && (
            <motion.img
              src={wine.image}
              alt={wine.name}
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="mx-auto h-[45vh] aspect-[3/5] object-cover [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)] md:w-full md:h-full md:[mask-image:none]"
            />
          )}
        </div>

        <div className="p-6 md:p-8 flex flex-col">
          <DialogTitle
            className="font-display !text-[clamp(34px,3.4vw,48px)] !leading-tight !tracking-normal mb-6 pr-6 font-normal"
          >
            {wine.name}
          </DialogTitle>
          <DialogDescription className="sr-only">Ficha del vino y compra</DialogDescription>

          <dl className="texto-cuerpo mb-6">
            {details.map(([label, value]) => (
              <div key={label} className="flex justify-between gap-6 py-1.5">
                <dt className="opacity-70">{label}</dt>
                <dd className="text-right">{value}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-auto">
            <div className="flex items-baseline justify-between gap-4 mb-5">
              {wine.bottle ? (
                <>
                  {wine.glass ? (
                    <span className="texto-cuerpo">
                      <span className="mr-1">Copa en sala</span>
                      {formatEuros(Number(wine.glass))}
                    </span>
                  ) : <span />}
                  <span className="texto-subtitulo tabular-nums">
                    {formatEuros(Number(wine.bottle))}
                  </span>
                </>
              ) : (
                <span className="texto-cuerpo">Precio a confirmar con tu pedido</span>
              )}
            </div>

            <div className="flex items-stretch gap-3">
              <QuantityPicker value={qty} onChange={setQty} />
              <button
                type="button"
                onClick={addToCart}
                className="boton flex-1"
              >
                Añadir al carrito
              </button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WineDialog;
