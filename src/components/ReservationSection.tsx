import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";

const GOOGLE_RESERVE_URL = "https://www.google.com/maps/reserve/v/dine/c/FMTRRPP6q6A?source=pa&hl=es-ES";
const THEFORK_URL        = "https://www.thefork.es/restaurante/la-yesca-taberna-r860597";

const platforms = [
  {
    name: "Google Reserve",
    description: "Reserva desde Google Maps o tu buscador",
    url: GOOGLE_RESERVE_URL,
    logo: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" aria-hidden="true">
        <path fill="#EA4335" d="M12 4.75c1.77 0 3.36.61 4.61 1.8l3.43-3.43C17.95 1.19 15.15 0 12 0 7.31 0 3.26 2.69 1.28 6.61l4 3.1C6.22 6.9 8.9 4.75 12 4.75z"/>
        <path fill="#4285F4" d="M23.49 12.27c0-.79-.07-1.54-.19-2.27H12v4.51h6.47c-.29 1.48-1.14 2.74-2.4 3.59l3.86 3c2.26-2.09 3.56-5.18 3.56-8.83z"/>
        <path fill="#FBBC05" d="M5.26 14.29A7.25 7.25 0 0 1 4.75 12c0-.79.14-1.56.38-2.29l-4-3.1A11.97 11.97 0 0 0 0 12c0 1.93.46 3.76 1.28 5.39l3.98-3.1z"/>
        <path fill="#34A853" d="M12 24c3.24 0 5.95-1.07 7.93-2.91l-3.86-3c-1.08.72-2.49 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96l-3.98 3.1C3.26 21.31 7.31 24 12 24z"/>
      </svg>
    ),
  },
  {
    name: "TheFork",
    description: "Reserva y acumula puntos YUMS",
    url: THEFORK_URL,
    logo: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" aria-hidden="true">
        <rect width="24" height="24" rx="5" fill="#00665A"/>
        <path
          d="M7.5 5 L7.5 10 Q7.5 12.5 10 13 L10 19 Q10 20 11 20 L13 20 Q14 20 14 19 L14 13 Q16.5 12.5 16.5 10 L16.5 5 Q16.5 4 15.5 4 Q14.5 4 14.5 5 L14.5 9 L13.5 9 L13.5 5 Q13.5 4 12 4 Q10.5 4 10.5 5 L10.5 9 L9.5 9 L9.5 5 Q9.5 4 8.5 4 Q7.5 4 7.5 5Z"
          fill="white"
        />
      </svg>
    ),
  },
];

const ReservationSection = () => {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="reservas" ref={ref} className="py-24 md:py-36 px-6">
      <div className="max-w-xl mx-auto">

        {/* Cabecera */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 1 }}
            className="h-px w-10 bg-amber-500/50 mx-auto mb-10 origin-center"
          />
          <h2 className="font-display text-4xl md:text-5xl text-foreground tracking-wide mb-4"
            style={{ fontWeight: 100 }}>
            Reservas
          </h2>
          <p className="font-body text-base text-foreground/45 italic">
            Elige tu plataforma preferida
          </p>
        </motion.div>

        {/* Plataformas — filas editoriales */}
        <div className="border-t border-foreground/10">
          {platforms.map((platform, i) => (
            <motion.a
              key={platform.name}
              href={platform.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, x: -16 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 + i * 0.15 }}
              className="group flex items-center justify-between gap-6 py-8 border-b border-foreground/10 transition-all duration-400 hover:px-3"
            >
              {/* Izquierda: logo + textos */}
              <div className="flex items-center gap-5">
                <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 border border-foreground/10 group-hover:border-amber-500/40 transition-colors duration-300"
                  style={{ backgroundColor: "hsl(155 16% 13%)" }}>
                  {platform.logo}
                </div>
                <div>
                  <p className="font-display text-lg md:text-xl text-foreground/90 group-hover:text-amber-400 transition-colors duration-300"
                    style={{ fontWeight: 300, letterSpacing: "0.06em" }}>
                    {platform.name}
                  </p>
                  <p className="font-body text-sm text-foreground/40 italic mt-0.5">
                    {platform.description}
                  </p>
                </div>
              </div>

              {/* Derecha: flecha */}
              <ArrowUpRight
                className="w-5 h-5 text-foreground/25 group-hover:text-amber-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300 flex-shrink-0"
              />
            </motion.a>
          ))}
        </div>

        {/* Nota grupos */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center font-body text-sm text-foreground/35 mt-10 italic"
        >
          ¿Sois más de 6 personas?{" "}
          <a
            href="mailto:info@layesca.com"
            className="text-foreground/55 hover:text-amber-400 underline underline-offset-4 transition-colors duration-300 not-italic"
          >
            Escríbenos para grupos
          </a>
        </motion.p>

      </div>
    </section>
  );
};

export default ReservationSection;
