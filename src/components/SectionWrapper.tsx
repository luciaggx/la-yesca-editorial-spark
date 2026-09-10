import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const sectionOrder = [
  "que-es", "quienes-somos", "carta", "eventos",
  "regala", "boutique", "reservas", "contacto",
];

const sectionLabel: Record<string, string> = {
  "que-es":        "Qué es La Yesca",
  "quienes-somos": "Quiénes somos",
  "carta":         "La Carta",
  "eventos":       "Eventos",
  "regala":        "Regala La Yesca",
  "boutique":      "La Yesca Boutique",
  "reservas":      "Reservas",
  "contacto":      "Contacto",
};

interface SectionWrapperProps {
  id: string;
  onBack: () => void;
  onNavigate: (id: string) => void;
  children: React.ReactNode;
}

const SectionWrapper = ({ id, onBack, onNavigate, children }: SectionWrapperProps) => {
  const idx  = sectionOrder.indexOf(id);
  const prev = idx > 0                       ? sectionOrder[idx - 1] : null;
  const next = idx < sectionOrder.length - 1 ? sectionOrder[idx + 1] : null;

  return (
    <motion.div
      key={id}
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -18 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="min-h-screen bg-background flex flex-col"
    >
      {/* Barra de navegación fija */}
      <header className="sticky top-0 z-50 flex items-center justify-between px-5 py-3.5 bg-background/95 backdrop-blur-md border-b border-foreground/8">

        {/* Volver al hub */}
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 font-body text-xs tracking-[0.18em] uppercase text-foreground/40 hover:text-foreground transition-colors duration-300"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
          La Yesca
        </button>

        {/* Sección actual */}
        <span
          className="font-display text-sm text-foreground/60 tracking-[0.1em]"
          style={{ fontWeight: 300 }}
        >
          {sectionLabel[id]}
        </span>

        {/* Prev / Next */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => prev && onNavigate(prev)}
            disabled={!prev}
            className="text-foreground/30 hover:text-foreground disabled:opacity-20 transition-colors duration-200"
            aria-label="Sección anterior"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => next && onNavigate(next)}
            disabled={!next}
            className="text-foreground/30 hover:text-foreground disabled:opacity-20 transition-colors duration-200"
            aria-label="Sección siguiente"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Contenido */}
      <div className="flex-1">
        {children}
      </div>
    </motion.div>
  );
};

export default SectionWrapper;
