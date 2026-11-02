import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, X } from "lucide-react";
import { useCart } from "@/hooks/use-cart";

const navItems = [
  { label: "Qué es La Yesca",   id: "que-es" },
  { label: "Quiénes somos",     id: "quienes-somos" },
  { label: "La Carta",          id: "carta" },
  { label: "Eventos",           id: "eventos" },
  { label: "Regala La Yesca",   id: "regala" },
  { label: "La Yesca Boutique", id: "boutique" },
  { label: "La Bodega",         id: "bodega" },
  { label: "Reservas",          id: "reservas" },
  { label: "Contacto",          id: "contacto" },
];

const ctaItems = [
  { label: "La Carta",  id: "carta"  },
  { label: "La Bodega", id: "bodega" },
  { label: "Regala La Yesca", id: "regala" },
];

const HamburgerIcon = () => (
  <svg width="22" height="14" viewBox="0 0 22 14" fill="none" aria-hidden="true">
    <line x1="0" y1="1"  x2="22" y2="1"  stroke="currentColor" strokeWidth="1.5"/>
    <line x1="0" y1="7"  x2="22" y2="7"  stroke="currentColor" strokeWidth="1.5"/>
    <line x1="0" y1="13" x2="22" y2="13" stroke="currentColor" strokeWidth="1.5"/>
  </svg>
);

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { count, setOpen: setCartOpen } = useCart();

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

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, delay: 0.3 }}
        className="fixed top-0 left-0 right-0 z-50 bg-background"
      >
        <div className="marco-hero flex items-center justify-between h-16">

          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="wordmark text-[15px] text-[#1A1D15]"
          >
            LA YESCA
          </button>

          <div className="flex items-center gap-4 md:gap-9">
            {ctaItems.map((cta) => (
              <button
                key={cta.id}
                onClick={() => scrollTo(cta.id)}
                className="hidden lg:block texto-cuerpo text-[#1A1D15] hover:text-[#4A5530] transition-colors"
              >
                {cta.label}
              </button>
            ))}
            <button
              onClick={() => scrollTo("reservas")}
              className="hidden sm:block texto-cuerpo text-[#1A1D15] border-b border-[#1A1D15] pb-0.5 hover:text-[#4A5530] transition-colors"
            >
              Reservas
            </button>

            {/* Carrito */}
            <button
              onClick={() => setCartOpen(true)}
              className="text-foreground p-1 relative"
              aria-label={count > 0 ? `Abrir carrito, ${count} ${count === 1 ? "artículo" : "artículos"}` : "Abrir carrito"}
            >
              <ShoppingBag className="w-5 h-5" strokeWidth={1.5} />
              {count > 0 && (
                <span className="absolute -top-1.5 -right-2 min-w-5 h-5 px-1 rounded-full bg-foreground text-background font-body text-[13px] leading-5 text-center">
                  {count}
                </span>
              )}
            </button>

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
              className="fixed inset-0 z-[55] bg-black/30"
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
              <div className="flex items-center justify-between px-7 h-16">
                <span className="wordmark text-sm text-foreground">LA YESCA</span>
                <button
                  onClick={() => setMenuOpen(false)}
                  className="text-foreground hover:opacity-70 transition-opacity p-1"
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
                    className="group text-left px-7 py-3 texto-subtitulo text-foreground hover:bg-foreground/5 transition-colors duration-200 flex items-center justify-between"
                  >
                    <span>{item.label}</span>
                    <span className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">
                      →
                    </span>
                  </motion.button>
                ))}
              </nav>

              {/* Pie del panel */}
              <div className="px-7 py-6">
                <p className="texto-small text-foreground">
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
