import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import WineSection from "./WineSection";

interface MenuItem {
  name: string;
  prices: string[];
}

interface MenuCategory {
  title: string;
  columns?: string[];
  items: MenuItem[];
}

const menuData: MenuCategory[] = [
  {
    title: "Para Picar",
    columns: ["Bocado", "Media", "Entera"],
    items: [
      { name: "Caldo de la sierra", prices: ["4", "6", "—"] },
      { name: "Ostra francesa", prices: ["4", "—", "—"] },
      { name: "Gilda de pato", prices: ["3.5", "—", "—"] },
      { name: "Gilda de atún", prices: ["3.5", "—", "—"] },
      { name: "Croqueta de jamón", prices: ["2.5", "—", "—"] },
      { name: "Tabla de embutidos ibéricos", prices: ["—", "12", "18"] },
    ],
  },
  {
    title: "De la Mar",
    items: [
      { name: "Mejillones a la brasa", prices: ["14"] },
      { name: "Gamba de Huelva a la plancha", prices: ["18"] },
      { name: "Calamares en su tinta", prices: ["16"] },
    ],
  },
  {
    title: "Del Terruño",
    items: [
      { name: "Ensalada de corujas", prices: ["12"] },
      { name: "Setas y huevo a baja temperatura", prices: ["14"] },
      { name: "Cogollo a la brasa con anchoa", prices: ["11"] },
    ],
  },
  {
    title: "Del Campo",
    items: [
      { name: "Pluma ibérica a la brasa", prices: ["17"] },
      { name: "Albóndigas de ciervo en salsa", prices: ["16"] },
      { name: "Jarrete de jabalí confitado", prices: ["22"] },
    ],
  },
  {
    title: "Para Rematar",
    items: [
      { name: "Flan de la casa", prices: ["6"] },
      { name: "Corte helado de bellota", prices: ["7"] },
      { name: "Tabla de quesos artesanos", prices: ["14"] },
    ],
  },
];

const MenuCategoryBlock = ({ category, index }: { category: MenuCategory; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.1 }}
      className="mb-14"
    >
      <h3 className="font-display text-2xl md:text-3xl text-foreground mb-6 text-center">
        {category.title}
      </h3>

      {category.columns && (
        <div className="flex justify-end mb-3 px-2">
          <div className="flex gap-6 md:gap-8">
            {category.columns.map((col) => (
              <span
                key={col}
                className="text-xs tracking-[0.15em] uppercase text-foreground/70 w-14 text-center"
              >
                {col}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="space-y-3">
        {category.items.map((item) => (
          <div key={item.name} className="flex items-baseline">
            <span className="font-body text-base md:text-lg text-foreground whitespace-nowrap">
              {item.name}
            </span>
            <span className="menu-dots" />
            <div className="flex gap-6 md:gap-8">
              {item.prices.map((price, i) => (
                <span
                  key={i}
                  className="font-body text-base md:text-lg text-foreground w-14 text-center"
                >
                  {price !== "—" ? `${price}€` : "—"}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

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
  <div>
    <p className="font-body text-base text-foreground/60 text-center mb-10">
      Para grupos de más de 6 personas. Consulta disponibilidad y precio cerrado contactando con nosotros.
    </p>
    {groupMenuData.map((category, i) => (
      <motion.div
        key={category.title}
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: i * 0.1 }}
        className="mb-12"
      >
        <h3 className="font-display text-xl md:text-2xl text-foreground mb-5 text-center">
          {category.title}
        </h3>
        <div className="space-y-3">
          {category.items.map((item) => (
            <div key={item.name} className="flex items-baseline">
              <span className="font-body text-base md:text-lg text-foreground whitespace-nowrap">
                {item.name}
              </span>
              <span className="menu-dots" />
            </div>
          ))}
        </div>
      </motion.div>
    ))}
    <div className="mt-10 text-center">
      <a
        href="#contacto"
        onClick={(e) => { e.preventDefault(); document.getElementById("contacto")?.scrollIntoView({ behavior: "smooth" }); }}
        className="inline-block py-3 px-8 border border-foreground/30 rounded-sm font-body text-sm tracking-[0.2em] uppercase text-foreground hover:bg-foreground hover:text-background transition-all duration-300"
      >
        Consultar disponibilidad
      </a>
    </div>
  </div>
);

const MenuSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [tab, setTab] = useState<"carta" | "vinos" | "grupos">("carta");

  return (
    <section id="carta" ref={ref} className="pt-4 pb-20 md:pb-32 px-6">
      <div className="max-w-2xl mx-auto">
        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 1 }}
          className="h-px w-20 bg-primary mx-auto mb-12 origin-center"
        />

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="font-display text-4xl md:text-5xl text-foreground text-center mb-10"
        >
          {tab === "carta" ? "La Carta" : tab === "vinos" ? "Vinos" : "Menú Grupos"}
        </motion.h2>

        {/* Tab switcher */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex justify-center mb-14"
        >
          <div className="inline-flex border border-foreground/30 rounded-sm overflow-hidden">
            <button
              onClick={() => setTab("carta")}
              className={`px-6 py-2.5 font-body text-sm tracking-[0.2em] uppercase transition-all duration-300 ${
                tab === "carta"
                  ? "bg-foreground text-background"
                  : "text-foreground/70 hover:text-foreground"
              }`}
            >
              Carta
            </button>
            <div className="w-px bg-foreground/30" />
            <button
              onClick={() => setTab("vinos")}
              className={`px-6 py-2.5 font-body text-sm tracking-[0.2em] uppercase transition-all duration-300 ${
                tab === "vinos"
                  ? "bg-foreground text-background"
                  : "text-foreground/70 hover:text-foreground"
              }`}
            >
              Vinos
            </button>
            <div className="w-px bg-foreground/30" />
            <button
              onClick={() => setTab("grupos")}
              className={`px-6 py-2.5 font-body text-sm tracking-[0.2em] uppercase transition-all duration-300 ${
                tab === "grupos"
                  ? "bg-foreground text-background"
                  : "text-foreground/70 hover:text-foreground"
              }`}
            >
              Grupos
            </button>
          </div>
        </motion.div>

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
              {menuData.map((category, i) => (
                <MenuCategoryBlock key={category.title} category={category} index={i} />
              ))}
            </motion.div>
          ) : tab === "vinos" ? (
            <motion.div
              key="vinos"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
            >
              <WineSectionInline />
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

/* ── Inline wine list (reuses data, avoids full WineSection wrapper) ── */
import { wineData } from "./WineSection";

const WineSectionInline = () => (
  <div>
    {wineData.map((category, i) => (
      <motion.div
        key={category.title}
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: i * 0.08 }}
        className="mb-12"
      >
        <h3 className="font-display text-xl md:text-2xl text-foreground mb-5 text-center italic">
          {category.title}
        </h3>
        <div className="space-y-4">
          {category.wines.map((wine) => (
            <div key={wine.name}>
              <div className="flex items-baseline">
                <span className="font-body text-base md:text-lg text-foreground whitespace-nowrap">
                  {wine.name}
                </span>
                <span className="menu-dots" />
                <div className="flex gap-4 items-baseline">
                  {wine.glass && (
                    <span className="font-body text-sm text-foreground/70 whitespace-nowrap">
                      {wine.glass}€ <span className="text-xs">copa</span>
                    </span>
                  )}
                  <span className="font-body text-base text-foreground whitespace-nowrap">
                    {wine.bottle}€
                  </span>
                </div>
              </div>
              <p className="text-xs tracking-wide text-foreground/60 mt-0.5 pl-1">
                {wine.variety} · {wine.origin}
              </p>
            </div>
          ))}
        </div>
      </motion.div>
    ))}
  </div>
);

export default MenuSection;
