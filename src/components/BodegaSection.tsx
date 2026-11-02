import { Fragment, useEffect, useRef, useState } from "react";
import { bodegaData } from "@/data/bodega";
import { formatEuros, useCart } from "@/hooks/use-cart";

const CATEGORIA_INICIAL = "Tintos";
const VINO_INICIAL = "Xérico";

const BodegaSection = () => {
  const { lines, count, add, setOpen } = useCart();
  const [categoria, setCategoria] = useState(CATEGORIA_INICIAL);
  const [nombre, setNombre] = useState(VINO_INICIAL);
  const [anadido, setAnadido] = useState(false);
  const temporizador = useRef<ReturnType<typeof setTimeout>>();
  const tiraRef = useRef<HTMLDivElement>(null);
  const activoRef = useRef<HTMLButtonElement>(null);

  const vinos = bodegaData.find((c) => c.title === categoria)?.wines ?? [];
  const indice = Math.max(0, vinos.findIndex((v) => v.name === nombre));
  const vino = vinos[indice];
  const enCarrito = lines.find((l) => l.name === vino.name)?.qty ?? 0;

  const datos = [
    ["Bodega", vino.bodega],
    ["Variedad", vino.variety],
    ["Origen", vino.origin],
  ].filter(([, valor]) => valor);
  const ficha = datos.length ? datos : [["Tipo", categoria]];

  const elegir = (name: string) => {
    clearTimeout(temporizador.current);
    setAnadido(false);
    setNombre(name);
  };

  const cambiarCategoria = (title: string) => {
    const primero = bodegaData.find((c) => c.title === title)?.wines[0];
    setCategoria(title);
    if (primero) elegir(primero.name);
  };

  const mover = (paso: number) => elegir(vinos[(indice + paso + vinos.length) % vinos.length].name);

  const anadir = () => {
    add(vino.name, 1);
    setAnadido(true);
    clearTimeout(temporizador.current);
    temporizador.current = setTimeout(() => setAnadido(false), 1200);
  };

  useEffect(() => () => clearTimeout(temporizador.current), []);

  /* Con las flechas, la botella elegida puede quedar fuera de la tira: la trae a la vista */
  useEffect(() => {
    const tira = tiraRef.current;
    const activo = activoRef.current;
    if (!tira || !activo) return;
    const a = activo.getBoundingClientRect();
    const t = tira.getBoundingClientRect();
    if (a.left < t.left) tira.scrollLeft += a.left - t.left;
    else if (a.right > t.right) tira.scrollLeft += a.right - t.right;
  }, [nombre, categoria]);

  return (
    <section
      id="bodega"
      className="marco-hero scroll-mt-16 flex flex-col gap-5 md:gap-[clamp(40px,5vw,64px)] bg-[#2A3320] text-[#E9E6D4] pt-11 md:pt-[clamp(64px,8vw,112px)] pb-9 md:pb-[clamp(56px,6vw,88px)]"
    >
      <div className="flex flex-wrap items-end justify-between gap-x-12 gap-y-3">
        <div className="flex flex-col gap-2.5">
          <h2 className="text-[34px] md:text-[clamp(44px,5vw,72px)] leading-none">La Bodega</h2>
          <p className="text-[clamp(19px,1.6vw,23px)] italic text-[#C9D1B4]">
            Vinos elegidos para acompañar la brasa. Llévatelos a casa.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="font-['Jost'] text-[13px] tracking-[0.18em] uppercase border border-[#E9E6D4]/40 px-3.5 py-2 md:px-[18px] md:py-3 transition-colors hover:bg-[#E9E6D4]/10"
        >
          Carrito · {count}
        </button>
      </div>

      <div role="group" aria-label="Tipo de vino" className="flex md:flex-wrap gap-1.5 overflow-x-auto md:overflow-visible [scrollbar-width:none] border-b border-[#E9E6D4]/20 pb-3 md:pb-5">
        {bodegaData.map((c) => (
          <button
            key={c.title}
            type="button"
            onClick={() => cambiarCategoria(c.title)}
            aria-pressed={c.title === categoria}
            className={`shrink-0 whitespace-nowrap text-[18px] px-3.5 py-[7px] transition-colors ${
              c.title === categoria ? "bg-[#E9E6D4] text-[#2A3320]" : "hover:bg-[#E9E6D4]/10"
            }`}
          >
            {c.title}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-[40%_minmax(0,1fr)] md:grid-cols-[minmax(0,min(38%,380px))_minmax(0,1fr)] items-start md:items-center gap-x-4 md:gap-x-[clamp(40px,6vw,96px)]">
        <div className="bg-[#E9E6D4]">
          <img
            src={vino.image}
            alt={vino.name}
            width={900}
            height={1500}
            className="block w-full h-auto mix-blend-multiply brightness-[1.12] contrast-[1.05]"
          />
        </div>

        <div className="flex flex-col gap-2.5 md:gap-[26px] min-w-0">
          <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
            <span className="font-['Jost'] text-[11px] md:text-[13px] tracking-[0.14em] md:tracking-[0.22em] uppercase text-[#B9CEA1]">
              {categoria} · {indice + 1} de {vinos.length}
            </span>
            <div className="flex gap-1.5 font-['Jost'] text-[18px]">
              <button
                type="button"
                onClick={() => mover(-1)}
                aria-label="Vino anterior"
                className="w-10 h-10 md:w-11 md:h-11 border border-[#E9E6D4]/35 transition-colors hover:bg-[#E9E6D4]/10"
              >
                ←
              </button>
              <button
                type="button"
                onClick={() => mover(1)}
                aria-label="Vino siguiente"
                className="w-10 h-10 md:w-11 md:h-11 border border-[#E9E6D4]/35 transition-colors hover:bg-[#E9E6D4]/10"
              >
                →
              </button>
            </div>
          </div>

          <h3 className="text-[26px] md:text-[clamp(44px,5vw,72px)] leading-none [text-wrap:balance]">{vino.name}</h3>

          <dl className="grid grid-cols-[66px_minmax(0,1fr)] md:grid-cols-[110px_1fr] gap-x-2 md:gap-x-5 gap-y-1 md:gap-y-3 text-[16px] leading-snug md:text-[21px] md:leading-normal border-t border-[#E9E6D4]/20 pt-2.5 md:pt-6">
            {ficha.map(([etiqueta, valor]) => (
              <Fragment key={etiqueta}>
                <dt className="font-['Jost'] text-[10px] md:text-[12px] tracking-[0.1em] md:tracking-[0.18em] uppercase text-[#B9CEA1] pt-1 md:pt-1.5">{etiqueta}</dt>
                <dd>{valor}</dd>
              </Fragment>
            ))}
          </dl>

          <div className="flex flex-wrap items-center gap-x-7 gap-y-2 md:gap-y-[18px] border-t border-[#E9E6D4]/20 pt-2.5 md:pt-6">
            {vino.bottle ? (
              <span className="text-[40px] whitespace-nowrap tabular-nums">{formatEuros(Number(vino.bottle))}</span>
            ) : (
              <span className="text-[18px] md:text-[24px] italic whitespace-nowrap">Precio a confirmar</span>
            )}
            <button
              type="button"
              onClick={anadir}
              className="font-['Jost'] w-full md:w-auto text-[11px] md:text-[13px] tracking-[0.14em] md:tracking-[0.22em] uppercase bg-[#E9E6D4] text-[#2A3320] px-2 py-3 md:px-8 md:py-[18px] transition-colors hover:bg-[#B9CEA1]"
            >
              {anadido ? "Añadido" : "Añadir al carrito"}
            </button>
            <span className="font-['Jost'] text-[11px] md:text-[13px] tracking-[0.14em] uppercase text-[#B9CEA1]">
              En carrito · {enCarrito}
            </span>
          </div>
        </div>
      </div>

      <div
        ref={tiraRef}
        className="flex gap-3 overflow-x-auto border-t border-[#E9E6D4]/20 pt-4 md:pt-7 pb-2 [scrollbar-width:thin] [scrollbar-color:rgba(233,230,212,0.3)_transparent]"
      >
        {vinos.map((v) => {
          const activo = v.name === vino.name;
          return (
            <button
              key={v.name}
              ref={activo ? activoRef : undefined}
              type="button"
              onClick={() => elegir(v.name)}
              aria-pressed={activo}
              className={`flex-none w-[76px] md:w-[clamp(96px,9vw,128px)] flex flex-col gap-2 text-left transition-opacity hover:opacity-100 ${
                activo ? "opacity-100" : "opacity-60"
              }`}
            >
              <div className="bg-[#E9E6D4] aspect-[3/4] w-full overflow-hidden flex justify-center">
                <img
                  src={v.image}
                  alt=""
                  loading="lazy"
                  className="w-auto max-w-none h-[118%] -mt-[6%] mix-blend-multiply brightness-[1.12]"
                />
              </div>
              <span className={`text-[13px] md:text-[15px] leading-[1.2] border-t pt-1.5 ${activo ? "border-[#E9E6D4]" : "border-transparent"}`}>
                {v.name}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
};

export default BodegaSection;
