import { ArrowUpRight } from "lucide-react";
import Reveal from "./Reveal";

const GOOGLE_RESERVE_URL = "https://www.google.com/maps/reserve/v/dine/c/FMTRRPP6q6A?source=pa&hl=es-ES";
const THEFORK_URL        = "https://www.thefork.es/restaurante/la-yesca-taberna-r860597";

const platforms = [
  { name: "Google Reserve", description: "Reserva desde Google Maps o tu buscador", url: GOOGLE_RESERVE_URL },
  { name: "TheFork", description: "Reserva y acumula puntos YUMS", url: THEFORK_URL },
];

const ReservationSection = () => (
  <section id="reservas" className="seccion">
    <div className="marco grid md:grid-cols-12 gap-x-6 gap-y-10 md:items-start">
      <Reveal className="md:col-span-5">
        <h2 className="texto-titulo mb-5">Reservas</h2>
        <p className="texto-lead">Elige tu plataforma preferida</p>
      </Reveal>

      <Reveal delay={0.1} className="md:col-span-4 md:col-start-9">
        <div className="space-y-7">
          {platforms.map((platform) => (
            <a
              key={platform.name}
              href={platform.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group block"
            >
              <span className="flex items-center gap-2 texto-subtitulo">
                <span className="enlace-texto">{platform.name}</span>
                <ArrowUpRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" aria-hidden="true" />
              </span>
              <span className="block texto-cuerpo mt-1">{platform.description}</span>
            </a>
          ))}
        </div>
        <p className="texto-cuerpo mt-9">
          ¿Sois más de 6 personas?{" "}
          <a href="mailto:layescataberna@gmail.com" className="enlace">
            Escríbenos para grupos
          </a>
        </p>
      </Reveal>
    </div>
  </section>
);

export default ReservationSection;
