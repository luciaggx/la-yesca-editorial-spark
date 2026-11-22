import fachada from "@/assets/la-yesca-fachada.webp";
import { irASeccion } from "@/lib/scroll";
import Reveal from "./Reveal";

const enlaces = [
  { label: "La Carta", id: "carta" },
  { label: "La Bodega", id: "bodega" },
];

/* Lo que es La Yesca en tres ideas cortas */
const ideas = [
  {
    titulo: "Cocina de caza",
    texto: "Corzo, ciervo, jabalí, perdiz o liebre de la Sierra de Guadarrama, aprovechados de principio a fin.",
  },
  {
    titulo: "Oficio",
    texto: "Más de veinte años de cocina del chef Jorge Asenjo detrás de cada plato. Sin artificios.",
  },
  {
    titulo: "Bodega",
    texto: "Más de 70 productores, elegidos porque nos emocionan, no por la etiqueta.",
  },
];

const QueEsSection = () => (
  <section id="que-es" className="seccion bg-tono hero-texto scroll-mt-16">
    <div className="marco">
      {/* Cabecera: título a la izquierda, la idea principal a la derecha */}
      <div className="grid md:grid-cols-12 gap-x-6 gap-y-4 md:items-end">
        <Reveal className="md:col-span-5">
          <p className="font-light text-[12px] md:text-[13px] tracking-[0.22em] uppercase mb-4 md:mb-6">
            La taberna
          </p>
          <h2 className="texto-titulo">
            ¿Qué es La Yesca?
          </h2>
        </Reveal>
        <Reveal delay={0.08} className="md:col-span-6 md:col-start-7">
          <p className="texto-lead">
            Una taberna de cocina de caza en San Lorenzo de El Escorial. Cocina de siempre,
            hecha con producto de la sierra.
          </p>
        </Reveal>
      </div>

      {/* El dibujo de la fachada, a lo ancho: es apaisado y necesita espacio */}
      <Reveal delay={0.1} className="mt-8 md:mt-[clamp(48px,6vw,96px)]">
        <img
          src={fachada}
          alt="Dibujo de la fachada de La Yesca, con barricas, flores y mesas preparadas con copas de vino"
          width={1710}
          height={1194}
          loading="lazy"
          className="w-full max-w-[1080px] mx-auto"
        />
      </Reveal>

      {/* Tres ideas en columnas */}
      <div className="grid md:grid-cols-3 gap-x-[clamp(24px,4vw,64px)] mt-8 md:mt-[clamp(48px,6vw,96px)] border-t border-[#1A1D15]/20">
        {ideas.map((idea, i) => (
          <Reveal
            key={idea.titulo}
            delay={0.08 + i * 0.06}
            className="py-5 md:pt-8 md:pb-0 border-b md:border-b-0 border-[#1A1D15]/20"
          >
            <h3 className="text-[12px] md:text-[13px] tracking-[0.22em] uppercase mb-2 md:mb-3">{idea.titulo}</h3>
            <p className="text-[16px] md:text-[18px] leading-[1.5]">{idea.texto}</p>
          </Reveal>
        ))}
      </div>

      {/* Cierre: la frase de la casa y los enlaces */}
      <div className="grid md:grid-cols-12 gap-x-6 gap-y-6 md:items-end mt-8 md:mt-[clamp(56px,6vw,96px)]">
        <Reveal className="md:col-span-7">
          <p className="font-light text-[24px] md:text-[clamp(28px,2.6vw,40px)] leading-[1.25]">
            Comer bien no tiene por qué ser complicado. Tiene que ser honesto.
          </p>
        </Reveal>
        <Reveal delay={0.08} className="md:col-span-4 md:col-start-9">
          {enlaces.map(({ label, id }) => (
            <button key={id} type="button" onClick={() => irASeccion(id)} className="enlace-seccion">
              {label}
              <span aria-hidden="true">→</span>
            </button>
          ))}
        </Reveal>
      </div>
    </div>
  </section>
);

export default QueEsSection;
