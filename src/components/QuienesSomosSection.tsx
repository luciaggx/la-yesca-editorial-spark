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
    foto: fotoAnaLazaro,
    parrafos: [
      "Ana Lázaro es cocinera, periodista y comunicadora gastronómica, natural de San Lorenzo de El Escorial. Tras trabajar 10 años como periodista y corresponsal fuera de España, estudió cocina y su formación y experiencia la llevaron a pasar por cocinas de gran prestigio, entre ellas Club Allard, L’Atelier de Joël Robuchon, Montia, Barro y Hisa Franko, donde fue construyendo una identidad propia basada en el producto, la técnica y una mirada muy personal sobre la cocina. Pasión que hoy en día compagina con el periodismo gastronómico.",
      "En 2023 recibió el reconocimiento como Mejor Cocinera de la Comunidad de Madrid, y en 2025 consiguió uno de los grandes hitos de su carrera al ganar el Concurso de Cocina Creativa de la Gamba Roja de Dénia, imponiéndose con una propuesta que unía el Mediterráneo con los paisajes y sabores de la meseta castellana.",
      "En La Yesca, Ana es nuestra anfitriona y la persona que está al frente de la sala. Su papel va mucho más allá del servicio: aporta sensibilidad, creatividad y una mirada propia, pero, sobre todo, una manera muy especial de recibir y cuidar a quien se sienta a nuestra mesa. Ana sabe contar la historia que hay detrás de cada plato y transmitirla con cercanía, haciendo que cada persona que nos visita se sienta, desde el primer momento, como en casa.",
    ],
  },
];

const PersonaBlock = ({ persona, index }: { persona: Persona; index: number }) => {
  const foto = persona.foto ?? fotoDelantales;
  const izquierda = index % 2 === 0;

  return (
    <article className="grid md:grid-cols-12 gap-x-6 gap-y-8 md:items-start">
      <Reveal className={`md:sticky md:top-24 ${
        izquierda ? "md:col-span-5 w-full" : persona.foto ? "md:col-span-4 md:col-start-9 md:order-2 w-3/4 ml-auto md:w-full" : "md:col-span-3 md:col-start-10 md:order-2 w-3/5 ml-auto md:w-full"
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
      <div className={izquierda ? "md:col-span-6 md:col-start-7" : "md:col-span-7 md:col-start-1"}>
        <Reveal delay={0.08}>
          <h3 className="texto-titulo">{persona.nombre}</h3>
          <p className="texto-lead mt-1 mb-8">{persona.rol}</p>
        </Reveal>
        <Reveal delay={0.14} className="space-y-5 texto-cuerpo">
          {persona.parrafos.map((p, i) => <p key={i}>{p}</p>)}
        </Reveal>
      </div>
    </article>
  );
};

const QuienesSomosSection = () => (
  <section id="quienes-somos" className="seccion !pb-0">
    <div className="marco">
      <Reveal>
        <h2 className="texto-titulo mb-16 md:mb-24">¿Quiénes somos?</h2>
      </Reveal>
      <div className="flex flex-col gap-24 md:gap-40">
        {equipo.map((persona, i) => (
          <PersonaBlock key={persona.nombre} persona={persona} index={i} />
        ))}
      </div>
    </div>
  </section>
);

export default QuienesSomosSection;
