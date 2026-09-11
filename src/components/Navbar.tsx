import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

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

/* Botones CTA centrales — los más importantes */
const ctaItems = [
  { label: "Reservar", id: "reservas" },
  { label: "Regala",   id: "regala"   },
  { label: "La Carta", id: "carta"    },
];

/* Hamburguesa — tres rayas */
const HamburgerIcon = () => (
  <svg width="22" height="14" viewBox="0 0 22 14" fill="none" aria-hidden="true">
    <line x1="0" y1="1"  x2="22" y2="1"  stroke="currentColor" strokeWidth="1.5"/>
    <line x1="0" y1="7"  x2="22" y2="7"  stroke="currentColor" strokeWidth="1.5"/>
    <line x1="0" y1="13" x2="22" y2="13" stroke="currentColor" strokeWidth="1.5"/>
  </svg>
);

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  /* Sobre el hero (oscuro) → texto blanco. Con fondo crema → texto oliva. */
  const light = !scrolled && !menuOpen;

  const navBg = scrolled || menuOpen
    ? "bg-background/96 backdrop-blur-md border-b border-foreground/10 shadow-sm"
    : "bg-transparent";

  const logoColor    = light ? "text-stone-100"      : "text-foreground";
  const ctaBorder    = light ? "border-stone-100/55"  : "border-foreground/35";
  const ctaText      = light ? "text-stone-100"       : "text-foreground";
  const ctaHover     = light ? "hover:bg-white/10"    : "hover:bg-foreground/8";
  const iconColor    = light ? "text-stone-100"       : "text-foreground";

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, delay: 0.3 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${navBg}`}
      >
        <div className="flex items-center justify-between h-16 px-5 md:px-10">

          {/* ── Logo ── */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className={`font-display text-sm md:text-base tracking-[0.32em] uppercase transition-colors duration-500 ${logoColor}`}
            style={{ fontFamily: "'Roboto', sans-serif", fontWeight: 100 }}
          >
            LA YESCA
          </button>

          {/* ── CTAs centrales (ocultos en móvil muy pequeño) ── */}
          <div className="hidden sm:flex items-center gap-2 md:gap-3 absolute left-1/2 -translate-x-1/2">
            {ctaItems.map((cta) => (
              <button
                key={cta.id}
                onClick={() => scrollTo(cta.id)}
                className={`font-body text-[10px] md:text-xs tracking-[0.22em] uppercase px-3 md:px-5 py-2 border transition-all duration-300 ${ctaBorder} ${ctaText} ${ctaHover}`}
                style={{ borderStyle: "dashed" }}
              >
                {cta.label}
              </button>
            ))}
          </div>

          {/* ── Hamburguesa ── */}
          <button
            onClick={() => setMenuOpen(v => !v)}
            className={`transition-colors duration-300 ${iconColor} p-1`}
            aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
          >
            {menuOpen
              ? <X className="w-5 h-5" />
              : <HamburgerIcon />
            }
          </button>

        </div>
      </motion.nav>

      {/* ── Menú desplegable — todas las secciones ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed top-16 left-0 right-0 z-40 bg-background/98 backdrop-blur-md border-b border-foreground/10 shadow-xl"
          >
            <nav className="max-w-lg mx-auto flex flex-col py-3">
              {navItems.map((item, i) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2, delay: i * 0.04 }}
                  onClick={() => scrollTo(item.id)}
                  className="group text-left px-8 py-4 font-body text-sm tracking-[0.18em] uppercase text-foreground/55 hover:text-foreground transition-all duration-200 border-b border-foreground/8 last:border-0 flex items-center justify-between"
                >
                  <span>{item.label}</span>
                  <span className="text-foreground/20 group-hover:text-amber-700 transition-colors text-xs tracking-widest">→</span>
                </motion.button>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
