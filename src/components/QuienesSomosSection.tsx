import fotoJorgeAsenjo from "@/assets/jorge-asenjo.jpg";
import fotoAnaLazaro from "@/assets/ana-lazaro.jpg";
import fotoDelantales from "@/assets/delantales.jpg";
import Reveal from "./Reveal";

interface Persona {
  nombre: string;
  rol: string;
  foto?: string;
  parrafos: string[];
}

const equipo: Persona[] = [
  {
    nombre: "Jorge Asenjo",
    rol: "Chef",
    foto: fotoJorgeAsenjo,
    parrafos: [
      "Cocinero segoviano con más de veinte años de oficio. Se formó en Segovia y San Sebastián, en casas como Casa Duque, Cándido o Mirador de Ulía.",
      "Con su restaurante Galerna, en San Sebastián, logró el Sol Repsol y el Bib Gourmand de la Guía Michelin. En 2025 fue elegido Mejor Cocinero de Carne de Caza de España. Su cocina gira en torno a la naturaleza: setas, hierbas silvestres y, sobre todo, caza.",
    ],
  },
  {
    nombre: "Jorge Casado",
    rol: "Operaciones",
    parrafos: [
      "Cocinero formado en Le Cordon Bleu. Lleva las operaciones de La Yesca: la gestión, la organización y todo lo que hace que la casa funcione.",
      "Lo compagina con La Desmedida, su hamburguesería en el centro de San Lorenzo de El Escorial.",
    ],
  },
  {
    nombre: "Ana Lázaro",
    rol: "Anfitriona y sala",
    foto: fotoAnaLazaro,
    parrafos: [
      "Cocinera y periodista gastronómica de San Lorenzo de El Escorial. Tras diez años como corresponsal, se formó en cocinas como Club Allard, L’Atelier de Joël Robuchon o Hisa Franko.",
      "Mejor Cocinera de la Comunidad de Madrid en 2023 y ganadora del Concurso de Cocina Creativa de la Gamba Roja de Dénia en 2025. En La Yesca está al frente de la sala: recibe, cuenta la historia de cada plato y hace que te sientas en casa.",
    ],
  },
];

const PersonaBlock = ({ persona, index }: { persona: Persona; index: number }) => {
  const foto = persona.foto ?? fotoDelantales;
  const izquierda = index % 2 === 0;

  return (
    /* En móvil la foto va pequeña junto al nombre y la biografía debajo */
    <article className="grid grid-cols-[92px_minmax(0,1fr)] md:grid-cols-12 items-center gap-x-4 md:gap-x-6 gap-y-4 md:gap-y-8 md:items-start">
      <Reveal className={`md:sticky md:top-24 ${
        izquierda ? "md:col-span-5" : persona.foto ? "md:col-span-4 md:col-start-9 md:order-2" : "md:col-span-3 md:col-start-10 md:order-2"
      }`}>
        <img
          src={foto}
          alt={persona.foto ? persona.nombre : "Delantales de La Yesca colgados en una pared de piedra"}
          width={800}
          height={1000}
          loading="lazy"
          className="w-full aspect-[4/5] object-cover"
        />
      </Reveal>
      <div className={`contents md:block ${izquierda ? "md:col-span-6 md:col-start-7" : "md:col-span-7 md:col-start-1"}`}>
        <Reveal delay={0.08}>
          <h3 className="texto-titulo">{persona.nombre}</h3>
          <p className="text-[12px] md:text-[13px] tracking-[0.22em] uppercase mt-2 md:mb-8">{persona.rol}</p>
        </Reveal>
        <Reveal delay={0.14} className="col-span-2 space-y-3 md:space-y-5 texto-cuerpo">
          {persona.parrafos.map((p, i) => <p key={i}>{p}</p>)}
        </Reveal>
      </div>
    </article>
  );
};

const QuienesSomosSection = () => (
  <section id="quienes-somos" className="seccion hero-texto">
    <div className="marco">
      <Reveal>
        <p className="font-light text-[12px] md:text-[13px] tracking-[0.22em] uppercase mb-4 md:mb-6">El equipo</p>
        <h2 className="texto-titulo mb-6 md:mb-20">¿Quiénes somos?</h2>
      </Reveal>
      <div className="flex flex-col gap-9 md:gap-28">
        {equipo.map((persona, i) => (
          <PersonaBlock key={persona.nombre} persona={persona} index={i} />
        ))}
      </div>
    </div>
  </section>
);

export default QuienesSomosSection;
