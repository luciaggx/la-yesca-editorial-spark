import { toast } from "sonner";
import lamina from "@/assets/yesca-lamina.webp";
import { giftMenus } from "@/data/regalos";
import { useCart } from "@/hooks/use-cart";
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
    <section id="regala" className="seccion bg-cream">
      <div className="marco grid md:grid-cols-12 gap-x-6 gap-y-7 md:gap-y-12">
        <Reveal className="md:col-span-4">
          <h2 className="texto-titulo mb-5">Regala La Yesca</h2>
          <p className="texto-lead">Dale a alguien especial un momento inolvidable</p>
          <img
            src={lamina}
            alt="Lámina de la yesca"
            width={608}
            height={630}
            loading="lazy"
            className="hidden md:block w-full mt-16"
          />
        </Reveal>

        <div className="md:col-span-7 md:col-start-6 space-y-9 md:space-y-20">
          {giftMenus.map((menu, i) => (
            <Reveal key={menu.name} delay={0.08 + i * 0.06}>
              <h3 className="flex items-baseline justify-between gap-6 texto-subtitulo">
                <span>{menu.name}</span>
                <span className="tabular-nums">{menu.price}€</span>
              </h3>
              {menu.description && <p className="texto-cuerpo mt-2">{menu.description}</p>}
              {menu.items && (
                <ul className="texto-cuerpo mt-3 space-y-1">
                  {menu.items.map((item) => <li key={item}>{item}</li>)}
                </ul>
              )}
              {menu.nota && <p className="texto-small mt-3">{menu.nota}</p>}
              <button type="button" onClick={() => addToCart(menu.name)} className="boton mt-5">
                Añadir al carrito
              </button>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GiftExperienceSection;
