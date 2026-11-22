import { toast } from "sonner";
import { giftMenus } from "@/data/regalos";
import { useCart } from "@/hooks/use-cart";
import DibujoGildas from "./DibujoGildas";
import Reveal from "./Reveal";

const GiftExperienceSection = () => {
  const { add, setOpen } = useCart();

  const addToCart = (name: string) => {
    add(name, 1);
    toast(`${name} añadido al carrito`, {
      position: "top-center",
      action: { label: "Ver carrito", onClick: () => setOpen(true) },
    });
  };

  return (
    <section id="regala" className="seccion bg-cream hero-texto">
      <div className="marco grid md:grid-cols-12 gap-x-6 gap-y-6 md:gap-y-12">
        <Reveal className="md:col-span-5 md:sticky md:top-24 md:self-start">
          <p className="font-['Jost'] font-light text-[12px] md:text-[13px] tracking-[0.22em] uppercase mb-4 md:mb-6">
            Para regalar
          </p>
          <h2 className="texto-titulo mb-4 md:mb-6">Regala La Yesca</h2>
          <p className="texto-lead max-w-[24ch]">Dale a alguien especial un momento inolvidable</p>
        </Reveal>

        <ul className="md:col-span-6 md:col-start-7 border-t border-[#1A1D15]/25">
          {giftMenus.map((menu, i) => (
            <li key={menu.name} className="border-b border-[#1A1D15]/25">
              <Reveal delay={0.08 + i * 0.06} className="py-6 md:py-10">
                <h3 className="flex items-baseline justify-between gap-6 texto-subtitulo">
                  <span>{menu.name}</span>
                  <span className="tabular-nums">{menu.price}€</span>
                </h3>
                {menu.description && <p className="texto-cuerpo mt-2 opacity-80">{menu.description}</p>}
                {menu.items && (
                  <div className="flex items-center justify-between gap-4 md:gap-8 mt-3">
                    <ul className="texto-cuerpo space-y-1">
                      {menu.items.map((item) => <li key={item}>{item}</li>)}
                    </ul>
                    {menu.dibujo === "gildas" && <DibujoGildas className="shrink-0 w-[72px] md:w-[110px] h-auto" />}
                  </div>
                )}
                {menu.nota && <p className="texto-small mt-3 opacity-80">{menu.nota}</p>}
                <button type="button" onClick={() => addToCart(menu.name)} className="hero-boton mt-5 md:mt-7">
                  Añadir al carrito
                </button>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default GiftExperienceSection;
