import ciervo from "@/assets/mundo/ciervo-tinta.webp";
import { irASeccion } from "@/lib/scroll";
import Reveal from "./Reveal";

const enlaces = [
  { label: "La Carta", id: "carta" },
  { label: "La Bodega", id: "bodega" },
];

const QueEsSection = () => (
  <section
    id="que-es"
    className="bg-tono text-[#1A1D15] scroll-mt-16 pt-12 md:pt-11 pb-[clamp(64px,7vw,120px)]"
  >
    <div className="marco-hero">
      <div className="grid md:grid-cols-2 items-center gap-x-[clamp(32px,5vw,80px)] gap-y-10">
        <div>
          <Reveal>
            <h2 className="text-[clamp(44px,5.3vw,84px)] leading-none tracking-[-0.015em] mb-7">
              ¿Qué es La Yesca?
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="text-[clamp(21px,1.9vw,28px)] leading-[1.4] max-w-[620px]">
              La Yesca es una pequeña taberna en San Lorenzo de El Escorial que nace con una idea muy
              sencilla: recuperar el espíritu de la cocina de siempre.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.12}>
          <img
            src={ciervo}
            alt="Grabado antiguo de un ciervo junto a un árbol"
            width={980}
            height={760}
            loading="lazy"
            className="w-full max-w-[480px] mx-auto"
          />
        </Reveal>
      </div>

      <div className="mt-[clamp(40px,6vw,96px)] pt-[clamp(40px,4.6vw,72px)] border-t border-[#1A1D15]/20 grid md:grid-cols-2 lg:grid-cols-3 gap-x-[clamp(32px,7vw,112px)] gap-y-6 texto-cuerpo !leading-[1.75]">
        <Reveal className="space-y-6">
          <p>
            Creemos en el producto, en el territorio y en la cercanía. En cocinar sin artificios,
            con respeto y con el conocimiento que dan los años de oficio. Nuestro chef, Jorge
            Asenjo, lleva dos décadas dedicándose a este mundo y esa experiencia está detrás
            de cada plato, de cada elaboración y de cada decisión que tomamos.
          </p>
          <p>
            Nuestra gran seña de identidad es la cocina de caza. Corzo, ciervo, gamo, jabalí,
            pato o liebre forman parte de una despensa que sentimos profundamente ligada a la
            Sierra de Guadarrama.
          </p>
        </Reveal>

        <Reveal delay={0.08} className="space-y-6">
          <p>
            Creemos en la caza como un producto sostenible y en la responsabilidad de
            aprovecharla de principio a fin. No se trata solo de cocinar caza, sino de entenderla,
            respetarla y transformarla en guisos, fondos hechos a fuego lento, embutidos,
            patés…
          </p>
          <p>
            Y si algo acompaña bien a una buena mesa, es un buen vino. Nuestra bodega
            reúne más de 70 productores, algunos conocidos y otros prácticamente
            desconocidos para el gran público. No buscamos nombres ni etiquetas por prestigio:
            buscamos vinos seleccionados a conciencia, vinos con personalidad, con historia y,
            sobre todo, vinos que nos emocionan y que queremos compartir.
          </p>
        </Reveal>

        <Reveal delay={0.16} className="self-end mt-4 lg:mt-0 md:col-span-2 lg:col-span-1">
          {enlaces.map(({ label, id }) => (
            <button key={id} type="button" onClick={() => irASeccion(id)} className="enlace-seccion">
              {label}
              <span aria-hidden="true">→</span>
            </button>
          ))}
        </Reveal>
      </div>

      <Reveal className="mt-[clamp(64px,7.5vw,120px)]">
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

export default QueEsSection;
