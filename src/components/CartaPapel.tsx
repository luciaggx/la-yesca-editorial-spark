/* Carta con aspecto de documento impreso (como la carta en papel del local).
   Para cambiar platos o precios, editar `paginas`. */

interface Plato {
  nombre: string;
  precio?: string;
  detalle?: string;   /* línea pequeña debajo (p. ej. bodega de un vino) */
}

interface Apartado {
  titulo: string;
  platos: Plato[];
  nota?: string;
}

const paginas: Apartado[][] = [
  [
    {
      titulo: "Para empezar",
      platos: [
        { nombre: "Paté de campaña (pato y faisán)", precio: "13€ / 22€" },
        { nombre: "Codorniz en escabeche", precio: "9€ / 15€" },
        { nombre: "Gilda de pato", precio: "3,80€" },
        { nombre: "Ensaladilla, perdiz, piparras", precio: "3,50€ / 8€ / 15€" },
        { nombre: "Croquetas de jamón hechas en casa", precio: "2,80€ / (6 und) 15€" },
        { nombre: "Ensalada de pimientos asados y bacalao", precio: "13€ / 24€" },
        { nombre: "Antxoa y mantequilla", precio: "4€" },
        { nombre: "Trucha, mantequilla con encurtidos", precio: "4€" },
        { nombre: "Salmorejo, tomates y queso de La Cabezuela", precio: "14€" },
      ],
    },
    {
      titulo: "Del terruño",
      platos: [
        { nombre: "Albóndigas de corzo", precio: "13€ / 25€" },
        { nombre: "Jarrete de ciervo", precio: "21€" },
        { nombre: "Lomo de venado a la brasa", precio: "27€" },
        { nombre: "Perdiz (guiso y brasa)", precio: "27€" },
        { nombre: "Chuletillas de jabalí a la brasa", precio: "24€" },
        { nombre: "Ancas de rana a la brasa", precio: "19€" },
        { nombre: "Lentejas con pato azulón", precio: "30€" },
        { nombre: "Pluma ibérica de bellota a la brasa", precio: "26€" },
      ],
    },
    {
      titulo: "Esta semana y hasta acabar existencias",
      platos: [
        { nombre: "Bacalao a la brasa con piperrada", precio: "21€" },
        { nombre: "Setas a la segoviana", precio: "16€" },
        { nombre: "Callos de La Yesca", precio: "23€" },
      ],
      nota: "Pan del obrador de Abantos con mantequilla · 2€",
    },
  ],
  [
    {
      titulo: "Para rematar",
      platos: [
        { nombre: "Flan con nata", precio: "6€" },
        { nombre: "Tarta de queso con fresas", precio: "7€" },
        { nombre: "Helado de boletus y tierra de bellota", precio: "9€" },
        { nombre: "Tabla de quesos de La Cabezuela", precio: "14€ / 26€" },
      ],
    },
    {
      titulo: "Cafés",
      platos: [
        { nombre: "Café solo / cortado", precio: "2,30€" },
        { nombre: "Café con leche de vaca / americano", precio: "2,50€" },
        { nombre: "Café doble carga", precio: "4,60€" },
      ],
    },
    {
      titulo: "Licores caseros",
      platos: [
        { nombre: "Recolectados y macerados en casa", precio: "4€" },
      ],
    },
    {
      titulo: "Vinos dulces",
      platos: [
        { nombre: "Pan Caliente", precio: "6€", detalle: "Jesús Soto · Soto Manrique · Ávila · Albillo Real" },
        { nombre: "Sauvignon Dulce Menade", precio: "6€", detalle: "Familia Sanz · Menade · Valladolid · Sauvignon Blanc" },
        { nombre: "Uretzi", precio: "7€", detalle: "Garikoitz Ríos · Itsasmendi · Vizcaya · Hondarrabi Zuri Zerratie" },
      ],
    },
    {
      titulo: "Combinados",
      platos: [
        { nombre: "Combinados", precio: "9€" },
        { nombre: "Combinados premium", precio: "12€" },
      ],
    },
  ],
];

const roboto = { fontFamily: "'Roboto', sans-serif" };

const Linea = ({ plato }: { plato: Plato }) => (
  <li className={plato.detalle ? "mb-3" : ""}>
    <div className="flex items-baseline gap-1">
      <span className="uppercase">{plato.nombre}</span>
      <span className="flex-1 min-w-[1.5rem] border-b border-dotted border-neutral-500/70 translate-y-[-0.25em]" />
      <span className="whitespace-nowrap">{plato.precio}</span>
    </div>
    {plato.detalle && (
      <p className="text-[0.92em] text-neutral-600 normal-case mt-0.5">{plato.detalle}</p>
    )}
  </li>
);

const Hoja = ({ apartados, numero, total, conTitulo }: {
  apartados: Apartado[]; numero: number; total: number; conTitulo: boolean;
}) => (
  <article
    className="relative mx-auto w-full max-w-[640px] px-6 py-10 sm:px-12 sm:py-14 md:px-16 md:py-16 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.35)] text-neutral-900"
    style={{ ...roboto, backgroundColor: "hsl(48 33% 96%)" }}
  >
    {conTitulo && (
      <h3 className="text-center text-xl md:text-2xl tracking-[0.08em] mb-10 md:mb-12" style={{ fontWeight: 500 }}>
        LA YESCA
      </h3>
    )}

    <div className="space-y-8 md:space-y-10 text-[12px] sm:text-[13px] md:text-[14px] leading-snug">
      {apartados.map((a) => (
        <section key={a.titulo}>
          <h4 className="uppercase underline underline-offset-4 decoration-1 text-[1.15em] mb-4" style={{ fontWeight: 500 }}>
            {a.titulo}:
          </h4>
          <ul className="space-y-1.5">
            {a.platos.map((p) => <Linea key={p.nombre} plato={p} />)}
          </ul>
          {a.nota && (
            <p className="uppercase mt-5 text-neutral-700">(**{a.nota})</p>
          )}
        </section>
      ))}
    </div>

    <p className="mt-12 text-center text-[10px] tracking-[0.3em] text-neutral-400">
      {numero} / {total}
    </p>
  </article>
);

const CartaPapel = () => (
  <div className="flex flex-col gap-8 md:gap-10 -mx-2 sm:mx-0">
    {paginas.map((apartados, i) => (
      <Hoja key={i} apartados={apartados} numero={i + 1} total={paginas.length} conTitulo={i === 0} />
    ))}
  </div>
);

export default CartaPapel;
