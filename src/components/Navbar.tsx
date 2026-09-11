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

const ctaItems = [
  { label: "Reservar", id: "reservas" },
  { label: "Regala",   id: "regala"   },
  { label: "La Carta", id: "carta"    },
];

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

  /* Bloquea el scroll del body cuando el panel está abierto */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }, 300);
  };

  const navBg = scrolled
    ? "bg-background/92 backdrop-blur-md border-b border-foreground/10 shadow-sm"
    : "bg-transparent";

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, delay: 0.3 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${navBg}`}
      >
        <div className="flex items-center justify-between h-16 px-5 md:px-10">

          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="font-display text-sm md:text-base tracking-[0.32em] uppercase text-foreground"
            style={{ fontFamily: "'Roboto', sans-serif", fontWeight: 100 }}
          >
            LA YESCA
          </button>

          {/* CTAs centrales */}
          <div className="hidden sm:flex items-center gap-2 md:gap-3 absolute left-1/2 -translate-x-1/2">
            {ctaItems.map((cta) => (
              <button
                key={cta.id}
                onClick={() => scrollTo(cta.id)}
                className="font-body text-[10px] md:text-xs tracking-[0.22em] uppercase px-3 md:px-5 py-2 border border-foreground/30 text-foreground hover:bg-foreground/6 transition-all duration-300"
                style={{ borderStyle: "dashed" }}
              >
                {cta.label}
              </button>
            ))}
          </div>

          {/* Hamburguesa */}
          <button
            onClick={() => setMenuOpen(v => !v)}
            className="text-foreground p-1 z-[60] relative"
            aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
          >
            {menuOpen
              ? <X className="w-5 h-5" />
              : <HamburgerIcon />
            }
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Fondo semitransparente — clic cierra */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-[55] bg-black/20 backdrop-blur-[2px]"
              onClick={() => setMenuOpen(false)}
            />

            {/* Panel lateral derecho */}
            <motion.aside
              key="side-panel"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
              className="fixed top-0 right-0 bottom-0 z-[60] w-72 bg-card shadow-2xl flex flex-col"
            >
              {/* Cabecera del panel */}
              <div className="flex items-center justify-between px-7 h-16 border-b border-foreground/10">
                <span
                  className="font-display text-xs tracking-[0.3em] uppercase text-foreground/40"
                  style={{ fontFamily: "'Roboto', sans-serif", fontWeight: 300 }}
                >
                  Menú
                </span>
                <button
                  onClick={() => setMenuOpen(false)}
                  className="text-foreground/50 hover:text-foreground transition-colors p-1"
                  aria-label="Cerrar menú"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Lista de secciones */}
              <nav className="flex-1 flex flex-col py-4 overflow-y-auto">
                {navItems.map((item, i) => (
                  <motion.button
                    key={item.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.22, delay: 0.1 + i * 0.05 }}
                    onClick={() => scrollTo(item.id)}
                    className="group text-left px-7 py-4 font-body text-sm tracking-[0.16em] uppercase text-foreground/55 hover:text-foreground hover:bg-foreground/5 transition-all duration-200 border-b border-foreground/8 last:border-0 flex items-center justify-between"
                  >
                    <span>{item.label}</span>
                    <span className="text-foreground/20 group-hover:text-amber-700 transition-colors">
                      →
                    </span>
                  </motion.button>
                ))}
              </nav>

              {/* Pie del panel */}
              <div className="px-7 py-6 border-t border-foreground/10">
                <p className="font-body text-[10px] tracking-[0.2em] uppercase text-foreground/25">
                  La Yesca Taberna · San Lorenzo de El Escorial
                </p>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
