import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { bodegaData } from "@/data/bodega";
import CartaPapel from "./CartaPapel";

export type CartaTab = "carta" | "vinos" | "grupos";

interface MenuItem {
  name: string;
  prices: string[];
}

interface MenuCategory {
  title: string;
  columns?: string[];
  items: MenuItem[];
}

const groupMenuData: MenuCategory[] = [
  {
    title: "Menú Grupos — Entrantes",
    items: [
      { name: "Tabla de embutidos ibéricos", prices: ["—"] },
      { name: "Caldo de la sierra", prices: ["—"] },
      { name: "Croquetas de jamón (4 uds)", prices: ["—"] },
      { name: "Ensalada de corujas", prices: ["—"] },
    ],
  },
  {
    title: "Menú Grupos — Principales",
    items: [
      { name: "Pluma ibérica a la brasa", prices: ["—"] },
      { name: "Jarrete de jabalí confitado", prices: ["—"] },
      { name: "Gamba de Huelva a la plancha", prices: ["—"] },
    ],
  },
  {
    title: "Menú Grupos — Postres",
    items: [
      { name: "Flan de la casa", prices: ["—"] },
      { name: "Tabla de quesos artesanos", prices: ["—"] },
    ],
  },
];

const GroupMenuSection = () => (
  <div className="grid md:grid-cols-12 gap-x-6 gap-y-12">
    <p className="texto-lead md:col-span-4">
      Para grupos de más de 6 personas. Consulta disponibilidad y precio cerrado contactando con nosotros.
    </p>
    <div className="md:col-span-7 md:col-start-6 space-y-10">
      {groupMenuData.map((category) => (
        <div key={category.title}>
          <h3 className="texto-subtitulo mb-3">{category.title}</h3>
          <ul className="texto-cuerpo space-y-1">
            {category.items.map((item) => <li key={item.name}>{item.name}</li>)}
          </ul>
        </div>
      ))}
      <a
        href="#contacto"
        onClick={(e) => {
          e.preventDefault();
          const el = document.getElementById("contacto");
          /* En la vista "solo carta" (QR) no hay contacto: abre la web completa */
          if (el) el.scrollIntoView({ behavior: "smooth" });
          else window.location.hash = "contacto";
        }}
        className="boton"
      >
        Consultar disponibilidad
      </a>
    </div>
  </div>
);

/* ── Vinos en la carta: solo los nombres (fotos y precios en la sección La Bodega) ── */
const WineList = () => (
  <div className="md:columns-2 xl:columns-3 gap-x-16">
    {bodegaData.map((category, i) => (
      <motion.div
        key={category.title}
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: i * 0.08 }}
        className="break-inside-avoid mb-10"
      >
        <h3 className="texto-subtitulo mb-3">{category.title}</h3>
        <ul className="texto-cuerpo space-y-0.5">
          {category.wines.map((wine) => <li key={wine.name}>{wine.name}</li>)}
        </ul>
      </motion.div>
    ))}
  </div>
);

const tabs: { id: CartaTab; label: string; title: string }[] = [
  { id: "carta",  label: "Carta",     title: "La Carta" },
  { id: "vinos",  label: "Vinos",     title: "Vinos" },
  { id: "grupos", label: "Grupos",    title: "Menú Grupos" },
];

const MenuSection = ({ initialTab = "carta" }: { initialTab?: CartaTab }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const [tab, setTab] = useState<CartaTab>(initialTab);

  return (
    <section id="carta" ref={ref} className="seccion">
      <div className="marco">
        <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-6 mb-12 md:mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="texto-titulo"
          >
            {tabs.find(t => t.id === tab)?.title}
          </motion.h2>

          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex"
          >
            {tabs.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                aria-pressed={tab === t.id}
                className={`px-5 py-2.5 texto-cuerpo transition-colors duration-300 ${
                  tab === t.id
                    ? "bg-foreground text-background"
                    : "text-foreground hover:bg-foreground/10"
                }`}
              >
                {t.label}
              </button>
            ))}
          </motion.div>
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          {tab === "carta" ? (
            <motion.div
              key="carta"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
            >
              <CartaPapel />
            </motion.div>
          ) : tab === "vinos" ? (
            <motion.div
              key="vinos"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
            >
              <WineList />
            </motion.div>
          ) : (
            <motion.div
              key="grupos"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
            >
              <GroupMenuSection />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default MenuSection;
