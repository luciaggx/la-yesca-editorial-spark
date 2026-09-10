import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const navItems = [
  { label: "Qué es La Yesca",   id: "que-es" },
  { label: "Quiénes somos",     id: "quienes-somos" },
  { label: "La Carta",          id: "carta" },
  { label: "Eventos",           id: "eventos" },
  { label: "Regala La Yesca",   id: "regala" },
  { label: "La Yesca Boutique", id: "boutique" },
  { label: "Reservas",          id: "reservas" },
  { label: "Contacto",          id: "contacto" },
];

/* Separador decorativo */
const Sep = () => (
  <span className="inline-block mx-5 text-amber-500/40 select-none" aria-hidden="true">·</span>
);

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [paused,   setPaused]   = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  // Duplicamos los items: el keyframe mueve -50% (= exactamente un set),
  // consiguiendo el loop perfecto en cualquier pantalla.
  const track = [...navItems, ...navItems];

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, delay: 0.4 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        scrolled
          ? "bg-background/95 backdrop-blur-md border-b border-foreground/8"
          : "bg-transparent"
      }`}
    >
      <div className="flex items-center h-14">

        {/* Logo fijo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex-shrink-0 pl-5 pr-4 font-display text-sm tracking-[0.3em] uppercase text-foreground whitespace-nowrap"
          style={{ fontFamily: "'Roboto', sans-serif", fontWeight: 100 }}
        >
          LA YESCA
        </button>

        {/* Separador vertical */}
        <div className="flex-shrink-0 h-4 w-px bg-foreground/15" />

        {/* Zona del ticker */}
        <div
          className="flex-1 overflow-hidden"
          style={{
            maskImage: "linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)",
          }}
          /* Pausa en hover (desktop) */
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/*
            El truco del loop perfecto:
            - Renderizamos el array 2× (track = navItems × 2)
            - El keyframe desplaza exactamente -50% del ancho total
              → al llegar al final del primer set ya estamos al inicio del segundo,
                que es idéntico → salto invisible
            - Funciona en cualquier viewport sin calcular píxeles con JS
          */}
          <div
            className="flex items-center w-max"
            style={{
              animation: "navticker 28s linear infinite",
              animationPlayState: paused ? "paused" : "running",
              willChange: "transform",
            }}
          >
            {track.map((item, i) => (
              <span key={`${item.id}-${i}`} className="inline-flex items-center">
                <button
                  onClick={() => scrollTo(item.id)}
                  className="font-body text-xs tracking-[0.2em] uppercase text-foreground/45 hover:text-amber-400 active:text-amber-400 transition-colors duration-300 whitespace-nowrap px-1 py-1"
                >
                  {item.label}
                </button>
                <Sep />
              </span>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes navticker {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </motion.nav>
  );
};

export default Navbar;
