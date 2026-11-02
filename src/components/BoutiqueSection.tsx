import aceite from "@/assets/aceite-pinar.jpg";
import Reveal from "./Reveal";

/* TODO: reemplazar con los productos reales y sus precios */
const productos = [
  {
    nombre: "Aceite de oliva La Yesca",
    descripcion: "AOVE de producción propia, prensado en frío. Edición limitada.",
    precio: "18 €",
    unidad: "500 ml",
  },
  {
    nombre: "Conservas de caza",
    descripcion: "Jabalí en escabeche, ciervo en aceite. Elaboradas en nuestras cocinas.",
    precio: "12 €",
    unidad: "frasco 250 g",
  },
  {
    nombre: "Vino de la casa",
    descripcion: "Selección exclusiva embotellada bajo la etiqueta La Yesca.",
    precio: "22 €",
    unidad: "botella 75 cl",
  },
  {
    nombre: "Kit de encendido",
    descripcion: "Yesca, pedernal y raspador. El origen de todo, en una caja de regalo.",
    precio: "35 €",
    unidad: "set completo",
  },
];

const BoutiqueSection = () => (
  <section id="boutique" className="seccion">
    <div className="marco grid md:grid-cols-12 gap-x-6 gap-y-12">
      <Reveal className="md:col-span-6 md:row-span-2">
        <img
          src={aceite}
          alt="Botella de aceite entre ramas de pino y piñas"
          width={593}
          height={750}
          loading="lazy"
          className="w-full aspect-[4/5] object-cover"
        />
      </Reveal>

      <Reveal delay={0.08} className="md:col-span-5 md:col-start-8 md:row-start-1">
        <h2 className="texto-titulo mb-4">La Yesca Boutique</h2>
        <p className="texto-lead">Llévate un pedazo del monte a casa</p>
      </Reveal>

      <div className="md:col-span-5 md:col-start-8 md:row-start-2 space-y-8">
        {productos.map((p, i) => (
          <Reveal key={p.nombre} delay={0.12 + i * 0.06}>
            <h3 className="flex items-baseline justify-between gap-4 texto-subtitulo">
              <span>{p.nombre}</span>
              <span className="whitespace-nowrap tabular-nums">{p.precio}</span>
            </h3>
            <p className="texto-cuerpo mt-1">{p.descripcion}</p>
            <p className="texto-small mt-1">{p.unidad}</p>
          </Reveal>
        ))}
        <Reveal delay={0.4}>
          <p className="texto-cuerpo">
            Disponible en el local y próximamente online.{" "}
            <a href="mailto:layescataberna@gmail.com" className="enlace">Consultar pedidos</a>
          </p>
        </Reveal>
      </div>
    </div>
  </section>
);

export default BoutiqueSection;
