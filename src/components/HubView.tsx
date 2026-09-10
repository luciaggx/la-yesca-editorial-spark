import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const sections = [
  { id: "que-es",        label: "Qué es La Yesca",   sub: "El origen" },
  { id: "quienes-somos", label: "Quiénes somos",      sub: "Nuestro equipo" },
  { id: "carta",         label: "La Carta",            sub: "Menú & Vinos" },
  { id: "eventos",       label: "Eventos",             sub: "Celebraciones & empresa" },
  { id: "regala",        label: "Regala La Yesca",     sub: "Bonos regalo" },
  { id: "boutique",      label: "La Yesca Boutique",   sub: "Productos" },
  { id: "reservas",      label: "Reservas",            sub: "Google & TheFork" },
  { id: "contacto",      label: "Contacto",            sub: "Dónde estamos" },
];

interface HubViewProps {
  onSelect: (id: string) => void;
}

const HubView = ({ onSelect }: HubViewProps) => (
  <div className="min-h-screen bg-background flex flex-col">

    {/* Logo header */}
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="flex flex-col items-center justify-center pt-16 pb-10 px-6"
    >
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="h-px w-10 bg-amber-500/40 mb-8 origin-center"
      />
      <h1
        className="font-display text-5xl md:text-7xl tracking-[0.25em] text-foreground uppercase"
        style={{ fontWeight: 100 }}
      >
        LA YESCA
      </h1>
      <p className="font-body text-xs tracking-[0.4em] uppercase text-foreground/35 mt-3">
        Taberna · San Lorenzo de El Escorial
      </p>
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="h-px w-10 bg-amber-500/40 mt-8 origin-center"
      />
    </motion.header>

    {/* Section list */}
    <nav className="flex-1 max-w-2xl w-full mx-auto px-6 pb-16">
      {sections.map((s, i) => (
        <motion.button
          key={s.id}
          onClick={() => onSelect(s.id)}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 + i * 0.07 }}
          className="group w-full flex items-center justify-between gap-4 py-5 border-b border-foreground/8 hover:pl-3 transition-all duration-300 text-left"
        >
          <div className="flex items-baseline gap-5">
            <span className="font-body text-xs text-amber-500/40 tabular-nums w-5 flex-shrink-0">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div>
              <p
                className="font-display text-xl md:text-2xl text-foreground/85 group-hover:text-amber-400 transition-colors duration-300"
                style={{ fontWeight: 300, letterSpacing: "0.07em" }}
              >
                {s.label}
              </p>
              <p className="font-body text-xs text-foreground/35 italic mt-0.5">
                {s.sub}
              </p>
            </div>
          </div>
          <ArrowUpRight className="w-4 h-4 text-foreground/20 group-hover:text-amber-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300 flex-shrink-0" />
        </motion.button>
      ))}
    </nav>

  </div>
);

export default HubView;
