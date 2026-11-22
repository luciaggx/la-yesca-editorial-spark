import { ArrowUpRight } from "lucide-react";
import patioDeLosReyes from "@/assets/mundo/patio-de-los-reyes.jpg";
import Reveal from "./Reveal";

const EMAIL = "layescataberna@gmail.com";
/* Teléfono para reservas de eventos, p. ej. "+34 600 000 000". Si está vacío no se muestra */
const TELEFONO: string = "";

/* El correo llega ya con el asunto y los datos que hacen falta para preparar el evento */
const asunto = "Reserva de evento en La Yesca";
const cuerpo = "Hola,\n\nMe gustaría reservar un evento.\n\nTipo de evento:\nFecha:\nNúmero de personas:\nNombre y teléfono de contacto:\n\nGracias.";
const mailto = `mailto:${EMAIL}?subject=${encodeURIComponent(asunto)}&body=${encodeURIComponent(cuerpo)}`;

/* Dibujos de línea con el trazo y los colores del dibujo de la fachada */
const MORADO = "#8B6BC4";
const ROSADO = "#C27A80";

const Llama = ({ x, y }: { x: number; y: number }) => (
  <path d={`M${x} ${y} C${x - 2.6} ${y - 2.6} ${x - 1.2} ${y - 5.4} ${x} ${y - 7.4} C${x + 1.2} ${y - 5.4} ${x + 2.6} ${y - 2.6} ${x} ${y} Z`} fill={ROSADO} stroke="none" />
);

const Tarta = () => (
  <>
    <path d="M22.5 24.8 L22 15.5 M32 24.5 L32.3 15 M41.5 24.6 L42 15.5" />
    <Llama x={22} y={13.5} />
    <Llama x={32.3} y={13} />
    <Llama x={42} y={13.5} />
    <path d="M15 25.5 L49 24.6 L49.5 36 L14.5 36.4 Z" />
    <path d="M15 29 Q18.5 32.5 22 29 Q26 33 30 29 Q34 32.5 38 29 Q42 33 46 29 L49 29" />
    <path d="M9 36.6 L55 36 L55.6 52 L8.6 52.4 Z" />
    {[17, 27, 37, 47].map((x, i) => (
      <circle key={x} cx={x} cy={i % 2 ? 45 : 44} r={1.7} fill={MORADO} stroke="none" />
    ))}
    <path d="M4 55.2 L60 54.6" />
  </>
);

const PlatoConVela = () => (
  <>
    <ellipse cx={26} cy={44} rx={21} ry={7.2} />
    <ellipse cx={26} cy={43.6} rx={12.5} ry={4} />
    <path d="M6 46.5 Q26 57 46 46.5" />
    <path d="M51.2 52.4 L51 27 M57 52.4 L57.2 27 M50.6 26.8 L57.6 26.6" />
    <path d="M54.2 26.6 L54.2 23.4" />
    <Llama x={54.2} y={21.6} />
    <path d="M46.5 53 Q54 56.6 62 53" />
  </>
);

const Copas = () => (
  <>
    <g transform="rotate(7 20 51)">
      <path d="M11.6 22.5 C12.6 29.4 16.2 32.6 20 32.6 C23.8 32.6 27.4 29.4 28.4 22.5 Z" fill={ROSADO} stroke="none" opacity={0.85} />
      <path d="M11 14 C11 28 15 33 20 33 C25 33 29 28 29 14 M20 33 L20 50 M13 51 Q20 49.2 27 51" />
    </g>
    <g transform="rotate(-7 44 51)">
      <path d="M35.6 22.5 C36.6 29.4 40.2 32.6 44 32.6 C47.8 32.6 51.4 29.4 52.4 22.5 Z" fill={ROSADO} stroke="none" opacity={0.85} />
      <path d="M35 14 C35 28 39 33 44 33 C49 33 53 28 53 14 M44 33 L44 50 M37 51 Q44 49.2 51 51" />
    </g>
    <path d="M32 3.5 L32 8.5 M25 5.5 L27.4 9.6 M39 5.5 L36.6 9.6" stroke={MORADO} />
  </>
);

const Dibujo = ({ children }: { children: React.ReactNode }) => (
  <svg
    viewBox="0 0 64 60"
    className="w-12 h-auto md:w-16"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.6}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    {children}
  </svg>
);

const eventos = [
  {
    titulo: "Celebraciones y cumpleaños",
    dibujo: <Tarta />,
    descripcion: "Un menú a medida, con los sabores del monte y la brasa como protagonistas.",
  },
  {
    titulo: "Cenas privadas",
    dibujo: <PlatoConVela />,
    descripcion: "El espacio solo para vosotros: menú cerrado, vinos elegidos y hasta 30 personas.",
  },
  {
    titulo: "Eventos de empresa",
    dibujo: <Copas />,
    descripcion: "Comidas de trabajo y presentaciones con el carácter de La Yesca.",
  },
];

const EventosSection = () => (
  <section id="eventos" className="seccion bg-tono hero-texto">
    <div className="marco grid md:grid-cols-12 gap-x-6 gap-y-8 md:gap-y-16">
      <Reveal className="md:col-span-5">
        <p className="font-['Jost'] font-light text-[12px] md:text-[13px] tracking-[0.22em] uppercase mb-4 md:mb-6">
          Eventos privados
        </p>
        <h2 className="texto-titulo mb-4 md:mb-6">Eventos La Yesca</h2>
        <p className="texto-lead italic max-w-[22ch]">Momentos que merecen algo más que una comida</p>
        <img
          src={patioDeLosReyes}
          alt="Grabado antiguo del Patio de los Reyes del monasterio de San Lorenzo de El Escorial"
          loading="lazy"
          className="hidden md:block w-full max-w-[420px] aspect-[4/5] object-cover mt-14"
        />
      </Reveal>

      <div className="md:col-span-6 md:col-start-7 flex flex-col gap-10 md:gap-16 md:self-center">
        <ol className="border-t border-[#1A1D15]/25">
          {eventos.map((ev, i) => (
            <li key={ev.titulo} className="border-b border-[#1A1D15]/25">
              <Reveal delay={0.08 + i * 0.06} className="grid grid-cols-[48px_minmax(0,1fr)] md:grid-cols-[64px_minmax(0,1fr)] items-center gap-x-5 md:gap-x-8 py-5 md:py-7">
                <Dibujo>{ev.dibujo}</Dibujo>
                <div>
                  <h3 className="texto-subtitulo">{ev.titulo}</h3>
                  <p className="texto-cuerpo mt-1 md:mt-2 opacity-80">{ev.descripcion}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>

        {/* Reserva directa: correo con los datos ya preparados o llamada */}
        <Reveal delay={0.3} className="bg-[#2A3320] text-[#E9E6D4] p-6 md:p-10">
          <h3 className="texto-subtitulo mb-1.5">Reserva tu evento</h3>
          <p className="texto-small text-[#C9D1B4] mb-6 md:mb-8">
            Cuéntanos fecha, número de personas y qué celebras. Te respondemos con una propuesta.
          </p>

          <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3">
            <a href={mailto} className="hero-boton !bg-[#E9E6D4] !text-[#2A3320] hover:!bg-[#C9D1B4] text-center">
              Reservar por email
            </a>
            {TELEFONO && (
              <a
                href={`tel:${TELEFONO.replace(/\s/g, "")}`}
                className="hero-boton !bg-transparent border border-[#E9E6D4]/50 hover:!bg-[#E9E6D4]/10 text-center"
              >
                Llamar · {TELEFONO}
              </a>
            )}
          </div>

          <a href={`mailto:${EMAIL}`} className="group inline-flex items-center gap-1.5 mt-5 texto-small text-[#C9D1B4] hover:text-[#E9E6D4] transition-colors">
            {EMAIL}
            <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
          </a>
        </Reveal>
      </div>
    </div>
  </section>
);

export default EventosSection;
