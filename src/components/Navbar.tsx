import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

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

const Sep = () => (
  <span className="inline-block mx-5 text-amber-700/40 select-none" aria-hidden="true">·</span>
);

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [paused,   setPaused]   = useState(false);
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

  const ticker = [...navItems, ...navItems];

  const navBg = scrolled || menuOpen
    ? "bg-background/95 backdrop-blur-md border-b border-foreground/10 shadow-sm"
    : "bg-transparent";

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, delay: 0.4 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${navBg}`}
      >
        <div className="flex items-center h-14 px-4 md:px-6">

          {/* ── MÓVIL: Reservar (izq) + Logo (centro) + Hamburguesa (der) ── */}
          <div className="flex items-center justify-between w-full lg:hidden">

            <button
              onClick={() => scrollTo("reservas")}
              className="font-body text-[10px] tracking-[0.22em] uppercase px-3 py-1.5 border border-amber-700/40 text-amber-800 hover:bg-amber-700/10 transition-colors duration-300 rounded-sm"
            >
              Reservar
            </button>

            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="font-display text-sm tracking-[0.3em] uppercase text-foreground absolute left-1/2 -translate-x-1/2"
              style={{ fontFamily: "'Roboto', sans-serif", fontWeight: 100 }}
            >
              LA YESCA
            </button>

            <button
              onClick={() => setMenuOpen(v => !v)}
              className="p-1.5 text-foreground/60 hover:text-foreground transition-colors"
              aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

          {/* ── ESCRITORIO: Logo + ticker ── */}
          <div className="hidden lg:flex items-center w-full">

            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="flex-shrink-0 pr-4 font-display text-sm tracking-[0.3em] uppercase text-foreground whitespace-nowrap"
              style={{ fontFamily: "'Roboto', sans-serif", fontWeight: 100 }}
            >
              LA YESCA
            </button>

            <div className="flex-shrink-0 h-4 w-px bg-foreground/20" />

            <div
              className="flex-1 overflow-hidden ml-2"
              style={{
                maskImage: "linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)",
                WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)",
              }}
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
            >
              <div
                className="flex items-center w-max"
                style={{
                  animation: "navticker 28s linear infinite",
                  animationPlayState: paused ? "paused" : "running",
                  willChange: "transform",
                }}
              >
                {ticker.map((item, i) => (
                  <span key={`${item.id}-${i}`} className="inline-flex items-center">
                    <button
                      onClick={() => scrollTo(item.id)}
                      className="font-body text-xs tracking-[0.2em] uppercase text-foreground/50 hover:text-amber-800 active:text-amber-800 transition-colors duration-300 whitespace-nowrap px-1 py-1"
                    >
                      {item.label}
                    </button>
                    <Sep />
                  </span>
                ))}
              </div>
            </div>
          </div>

        </div>
      </motion.nav>

      {/* ── Menú desplegable móvil ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.22 }}
            className="fixed top-14 left-0 right-0 z-40 bg-background/98 backdrop-blur-md border-b border-foreground/10 shadow-lg lg:hidden"
          >
            <nav className="flex flex-col py-2">
              {navItems.map((item, i) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.18, delay: i * 0.04 }}
                  onClick={() => scrollTo(item.id)}
                  className="text-left px-7 py-3.5 font-body text-sm tracking-[0.18em] uppercase text-foreground/60 hover:text-foreground hover:bg-foreground/5 transition-all duration-200 border-b border-foreground/8 last:border-0"
                >
                  {item.label}
                </motion.button>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @keyframes navticker {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </>
  );
};

export default Navbar;
