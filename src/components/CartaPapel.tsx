import type { Apartado, Plato } from "@/data/carta";
import { useCarta } from "@/hooks/use-carta";

/* Carta con aspecto de documento impreso (como la carta en papel del local).
   Los platos y precios vienen de la hoja de Google: ver src/data/carta.ts */

const roboto = { fontFamily: "'Roboto', sans-serif" };

const Linea = ({ plato }: { plato: Plato }) => (
  <li className={plato.detalle ? "mb-3" : ""}>
    <div className="flex items-baseline gap-1">
      <span className="uppercase">{plato.nombre}</span>
      <span className="flex-1 min-w-[1.5rem] border-b border-dotted border-neutral-500/70 translate-y-[-0.25em]" />
      <span className="whitespace-nowrap">{plato.precio}</span>
    </div>
    {plato.detalle && (
      <p className="text-[13px] text-neutral-600 normal-case mt-0.5">{plato.detalle}</p>
    )}
  </li>
);

const Hoja = ({ apartados, numero, total, conTitulo }: {
  apartados: Apartado[]; numero: number; total: number; conTitulo: boolean;
}) => (
  <article
    className="relative mx-auto w-full max-w-[640px] px-5 py-6 sm:px-12 sm:py-14 md:px-14 md:py-16 text-neutral-900"
    style={{ ...roboto, backgroundColor: "hsl(48 33% 96%)" }}
  >
    {conTitulo && (
      <h3 className="text-center text-xl md:text-2xl tracking-[0.08em] mb-5 md:mb-12" style={{ fontWeight: 500 }}>
        LA YESCA
      </h3>
    )}

    <div className="space-y-5 md:space-y-10 text-[13px] sm:text-[14px] leading-snug">
      {apartados.map((a) => (
        <section key={a.titulo}>
          <h4 className="uppercase underline underline-offset-4 decoration-1 text-[1.15em] mb-2.5 md:mb-4" style={{ fontWeight: 500 }}>
            {a.titulo}:
          </h4>
          <ul className="space-y-1 md:space-y-1.5">
            {a.platos.map((p, i) => <Linea key={i} plato={p} />)}
          </ul>
          {a.nota && (
            <p className="uppercase mt-3 md:mt-5 text-neutral-700">(**{a.nota})</p>
          )}
        </section>
      ))}
    </div>

    <p className="mt-5 md:mt-12 text-center text-[13px] text-neutral-600">
      {numero} / {total}
    </p>
  </article>
);

const CartaPapel = () => {
  const paginas = useCarta();

  return (
    <div className="grid lg:grid-cols-2 gap-3 md:gap-8 lg:gap-6 lg:items-start -mx-2 sm:mx-0">
      {paginas.map((apartados, i) => (
        <Hoja key={i} apartados={apartados} numero={i + 1} total={paginas.length} conTitulo={i === 0} />
      ))}
    </div>
  );
};

export default CartaPapel;
