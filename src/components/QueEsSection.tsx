import { useState } from "react";
import fachada from "@/assets/la-yesca-fachada.webp";
import { irASeccion } from "@/lib/scroll";
import LeerMas from "./LeerMas";
import Reveal from "./Reveal";

const enlaces = [
  { label: "La Carta", id: "carta" },
  { label: "La Bodega", id: "bodega" },
];

const parrafos = [
  "Creemos en el producto, en el territorio y en la cercanía. En cocinar sin artificios, con respeto y con el conocimiento que dan los años de oficio. Nuestro chef, Jorge Asenjo, lleva dos décadas dedicándose a este mundo y esa experiencia está detrás de cada plato, de cada elaboración y de cada decisión que tomamos.",
  "Nuestra gran seña de identidad es la cocina de caza. Corzo, ciervo, gamo, jabalí, pato o liebre forman parte de una despensa que sentimos profundamente ligada a la Sierra de Guadarrama.",
  "Creemos en la caza como un producto sostenible y en la responsabilidad de aprovecharla de principio a fin. No se trata solo de cocinar caza, sino de entenderla, respetarla y transformarla en guisos, fondos hechos a fuego lento, embutidos, patés…",
  "Y si algo acompaña bien a una buena mesa, es un buen vino. Nuestra bodega reúne más de 70 productores, algunos conocidos y otros prácticamente desconocidos para el gran público. No buscamos nombres ni etiquetas por prestigio: buscamos vinos seleccionados a conciencia, vinos con personalidad, con historia y, sobre todo, vinos que nos emocionan y que queremos compartir.",
];

const QueEsSection = () => {
  const [abierto, setAbierto] = useState(false);

  return (
    <section id="que-es" className="seccion bg-tono hero-texto scroll-mt-16">
      <div className="marco">
        {/* Cabecera: título a la izquierda, idea principal a la derecha */}
        <div className="grid md:grid-cols-12 gap-x-6 gap-y-4 md:items-end">
          <Reveal className="md:col-span-5">
            <p className="font-['Jost'] font-light text-[12px] md:text-[13px] tracking-[0.22em] uppercase mb-4 md:mb-6">
              La taberna
            </p>
            <h2 className="texto-titulo">¿Qué es La Yesca?</h2>
          </Reveal>
          <Reveal delay={0.08} className="md:col-span-6 md:col-start-7">
            <p className="texto-lead">
              Una pequeña taberna en San Lorenzo de El Escorial que nace con una idea muy
              sencilla: recuperar el espíritu de la cocina de siempre.
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

        {/* Texto: enlaces a la izquierda, una sola columna de lectura a la derecha */}
        <div className="grid md:grid-cols-12 gap-x-6 gap-y-6 mt-8 md:mt-[clamp(48px,6vw,96px)] pt-6 md:pt-[clamp(40px,4.6vw,72px)] border-t border-[#1A1D15]/20">
          <Reveal delay={0.12} className="md:col-span-6 md:col-start-7 space-y-4 md:space-y-6 texto-cuerpo md:!leading-[1.7]">
            {parrafos.map((p, i) => (
              <p key={i} className={i > 0 && !abierto ? "hidden md:block" : ""}>{p}</p>
            ))}
            <LeerMas abierto={abierto} onToggle={() => setAbierto((v) => !v)} />
          </Reveal>

          <Reveal delay={0.16} className="md:col-span-4 md:row-start-1 md:sticky md:top-24 md:self-start">
            {enlaces.map(({ label, id }) => (
              <button key={id} type="button" onClick={() => irASeccion(id)} className="enlace-seccion">
                {label}
                <span aria-hidden="true">→</span>
              </button>
            ))}
          </Reveal>
        </div>

        {/* La cita final solo en ordenador: en móvil alarga y recarga la sección */}
        <Reveal className="hidden md:block mt-[clamp(64px,7.5vw,120px)]">
          <p className="max-w-[1040px] mx-auto text-center italic text-[clamp(28px,3vw,46px)] leading-[1.27]">
            En La Yesca creemos que comer bien no tiene por qué ser complicado. Tiene que
            ser honesto. Una cocina de territorio, de temporada y de memoria; una cocina
            cercana que respeta lo que somos y que pone en valor los sabores de siempre en
            un ambiente casero, familiar y sin formalidades.
          </p>
        </Reveal>
      </div>
    </section>
  );
};

export default QueEsSection;
