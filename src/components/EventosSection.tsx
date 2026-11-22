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

const eventos = [
  {
    titulo: "Celebraciones y cumpleaños",
    descripcion: "Un menú a medida, con los sabores del monte y la brasa como protagonistas.",
  },
  {
    titulo: "Cenas privadas",
    descripcion: "El espacio solo para vosotros: menú cerrado, vinos elegidos y hasta 30 personas.",
  },
  {
    titulo: "Eventos de empresa",
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
              <Reveal delay={0.08 + i * 0.06} className="grid grid-cols-[40px_minmax(0,1fr)] md:grid-cols-[64px_minmax(0,1fr)] gap-x-2 py-5 md:py-7">
                <span className="font-['Jost'] font-light text-[13px] tracking-[0.14em] pt-1.5 md:pt-2.5">
                  {String(i + 1).padStart(2, "0")}
                </span>
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
