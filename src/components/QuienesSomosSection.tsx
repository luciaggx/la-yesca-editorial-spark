import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface Persona {
  nombre: string;
  rol: string;
  parrafos: string[];
}

const equipo: Persona[] = [
  {
    nombre: "Jorge Asenjo",
    rol: "Chef",
    parrafos: [
      "Jorge Asenjo es un cocinero segoviano con más de dos décadas de trayectoria profesional y una relación muy especial con la cocina de territorio, la naturaleza y, especialmente, la caza.",
      "Se inició en la cocina con tan solo 16 años y se formó en Segovia y San Sebastián (País Vasco), pasando por cocinas como Casa Duque, Cándido y Mirador de Ulía, además de trabajar muy joven como jefe de cocina en Zumaia.",
      "Más adelante abrió su propio proyecto, Galerna, en San Sebastián (País Vasco), momento en el que fue nominado a Cocinero Revelación en Madrid Fusión y obtuvo numerosos premios como el Sol Repsol o el Bib Gourmand de la Guía Michelin. Tras Galerna, continuó su recorrido por restaurantes como Erro, Venta Moncalvillo, Montia o Barro, en Ávila, donde ejerció como jefe de cocina.",
      "Su cocina siempre ha estado muy vinculada a la naturaleza. Las setas, las hierbas silvestres, los productos del entorno y, sobre todo, la carne de caza forman parte de su manera de entender la gastronomía. Para Jorge, cocinar no consiste únicamente en transformar un producto, sino en conocerlo, respetarlo y sacar todo lo que puede ofrecer.",
      "En 2025 fue proclamado Mejor Cocinero de Carne de Caza de España en la primera edición del Concurso Cocinero del Año Especial Carne de Caza.",
    ],
  },
  {
    nombre: "Jorge Casado",
    rol: "Operaciones",
    parrafos: [
      "Jorge Casado es cocinero, formado en Le Cordon Bleu, y una de las piezas fundamentales de La Yesca. Al frente de las operaciones, es quien se ocupa de que cada engranaje de la casa funcione: la gestión administrativa, la organización y el orden empresarial que hay detrás de nuestro día a día.",
      "Su experiencia y su capacidad para poner estructura a un proyecto gastronómico hacen de él un verdadero pilar de La Yesca. Una figura imprescindible para que todo lo que ocurre de puertas hacia dentro pueda después convertirse en la experiencia que queremos ofrecer a nuestros clientes.",
      "Jorge compagina esta responsabilidad con su propio proyecto, La Desmedida, su hamburguesería situada en pleno corazón de nuestro pueblo, San Lorenzo de El Escorial.",
      "Tenemos la enorme suerte de contar con él. Porque detrás de una buena cocina también hace falta alguien que cuide cada detalle, que mantenga el rumbo y que haga que las cosas sucedan. Jorge es, sin duda, una de esas personas imprescindibles que sostienen La Yesca.",
    ],
  },
  {
    nombre: "Ana Lázaro",
    rol: "Anfitriona y sala",
    parrafos: [
      "Ana Lázaro es cocinera, periodista y comunicadora gastronómica, natural de San Lorenzo de El Escorial. Tras trabajar 10 años como periodista y corresponsal fuera de España, estudió cocina y su formación y experiencia la llevaron a pasar por cocinas de gran prestigio, entre ellas Club Allard, L’Atelier de Joël Robuchon, Montia, Barro y Hisa Franko, donde fue construyendo una identidad propia basada en el producto, la técnica y una mirada muy personal sobre la cocina. Pasión que hoy en día compagina con el periodismo gastronómico.",
      "En 2023 recibió el reconocimiento como Mejor Cocinera de la Comunidad de Madrid, y en 2025 consiguió uno de los grandes hitos de su carrera al ganar el Concurso de Cocina Creativa de la Gamba Roja de Dénia, imponiéndose con una propuesta que unía el Mediterráneo con los paisajes y sabores de la meseta castellana.",
      "En La Yesca, Ana es nuestra anfitriona y la persona que está al frente de la sala. Su papel va mucho más allá del servicio: aporta sensibilidad, creatividad y una mirada propia, pero, sobre todo, una manera muy especial de recibir y cuidar a quien se sienta a nuestra mesa. Ana sabe contar la historia que hay detrás de cada plato y transmitirla con cercanía, haciendo que cada persona que nos visita se sienta, desde el primer momento, como en casa.",
    ],
  },
];

const PersonaBlock = ({ persona, index }: { persona: Persona; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay: index * 0.05 }}
      className="px-6 py-10 md:px-12 md:py-14"
      style={{ backgroundColor: "hsl(50 28% 95%)" }}
    >
      <div className="text-center mb-8">
        <div className="w-6 h-px bg-amber-500/50 mx-auto mb-5" />
        <h3
          className="font-display text-2xl md:text-3xl uppercase text-foreground"
          style={{ fontWeight: 300, letterSpacing: "0.12em" }}
        >
          {persona.nombre}
        </h3>
        <p className="font-body text-xs tracking-[0.25em] uppercase text-amber-700/80 mt-2">
          {persona.rol}
        </p>
      </div>
      <div className="space-y-4 font-body text-base md:text-lg text-foreground/75 leading-relaxed">
        {persona.parrafos.map((p, i) => <p key={i}>{p}</p>)}
      </div>
    </motion.article>
  );
};

const QuienesSomosSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="quienes-somos" ref={ref} className="py-24 md:py-36 px-6 bg-background">
      <div className="max-w-3xl mx-auto">

        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 1 }}
          className="h-px w-10 bg-amber-500/50 mx-auto mb-10 origin-center"
        />

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9 }}
          className="font-display text-4xl md:text-6xl text-foreground text-center mb-16"
          style={{ fontWeight: 100, letterSpacing: "0.1em" }}
        >
          ¿Quiénes somos?
        </motion.h2>

        <div className="flex flex-col gap-px" style={{ backgroundColor: "hsl(85 14% 72%)" }}>
          {equipo.map((persona, i) => (
            <PersonaBlock key={persona.nombre} persona={persona} index={i} />
          ))}
        </div>

      </div>
    </section>
  );
};

export default QuienesSomosSection;
