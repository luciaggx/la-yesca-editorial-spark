import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface Wine {
  name: string;
  variety: string;
  origin: string;
  glass?: string;
  bottle: string;
}

interface WineCategory {
  title: string;
  wines: Wine[];
}

export const wineData: WineCategory[] = [
  {
    title: "Espumosos",
    wines: [
      { name: "Recaredo Terrers", variety: "Xarel·lo, Macabeo", origin: "Alt Penedès", glass: "6", bottle: "28" },
      { name: "Raventós i Blanc", variety: "Xarel·lo, Parellada", origin: "Conca del Riu Anoia", bottle: "32" },
    ],
  },
  {
    title: "Blancos",
    wines: [
      { name: "Ossian", variety: "Verdejo", origin: "Segovia", glass: "5", bottle: "26" },
      { name: "Godelia", variety: "Godello", origin: "Bierzo", glass: "5.5", bottle: "28" },
      { name: "Pazo Señorans", variety: "Albariño", origin: "Rías Baixas", bottle: "30" },
    ],
  },
  {
    title: "Rosados",
    wines: [
      { name: "Muga Rosado", variety: "Garnacha, Viura", origin: "Rioja", glass: "4.5", bottle: "22" },
    ],
  },
  {
    title: "Tintos",
    wines: [
      { name: "Artadi Quintana", variety: "Tempranillo", origin: "Rioja", glass: "5", bottle: "25" },
      { name: "Pago de Carraovejas", variety: "Tinto Fino, Cabernet", origin: "Ribera del Duero", bottle: "38" },
      { name: "Clunia", variety: "Tempranillo", origin: "Castilla y León", glass: "5.5", bottle: "27" },
      { name: "Comando G — La Bruja", variety: "Garnacha", origin: "Sierra de Gredos", bottle: "32" },
    ],
  },
  {
    title: "Generosos",
    wines: [
      { name: "Tío Pepe", variety: "Palomino", origin: "Jerez", glass: "4", bottle: "20" },
      { name: "Lustau Amontillado", variety: "Palomino", origin: "Jerez", glass: "5", bottle: "24" },
    ],
  },
  {
    title: "Dulces",
    wines: [
      { name: "Jorge Ordóñez Nº2", variety: "Moscatel", origin: "Málaga", glass: "6", bottle: "30" },
    ],
  },
];

const WineCategory = ({ category, index }: { category: WineCategory; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 25 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.08 }}
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
                  <span className="font-body text-sm text-muted-foreground whitespace-nowrap">
                    {wine.glass}€ <span className="text-xs">copa</span>
                  </span>
                )}
                <span className="font-body text-base text-foreground whitespace-nowrap">
                  {wine.bottle}€
                </span>
              </div>
            </div>
            <p className="text-xs tracking-wide text-muted-foreground mt-0.5 pl-1">
              {wine.variety} · {wine.origin}
            </p>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

const WineSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="vinos" ref={ref} className="py-20 md:py-32 px-6">
      <div className="max-w-2xl mx-auto">
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
          className="font-display text-4xl md:text-5xl text-foreground text-center mb-4"
        >
          Vinos
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-center text-muted-foreground font-body text-lg mb-16 italic"
        >
          Selección de bodegas peninsulares
        </motion.p>

        {wineData.map((category, i) => (
          <WineCategory key={category.title} category={category} index={i} />
        ))}
      </div>
    </section>
  );
};

export default WineSection;
