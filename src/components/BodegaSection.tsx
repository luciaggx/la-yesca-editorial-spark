import { motion } from "framer-motion";

type WineType = "espumoso" | "blanco" | "rosado" | "tinto" | "dulce";

interface Wine {
  name: string;
  bodega: string;
  variety: string;
  origin: string;
  type: WineType;
  glass?: string;
  bottle: string;
  /* Foto real del vino: importarla de src/assets y ponerla aquí.
     Sin foto se muestra una botella dibujada. */
  image?: string;
}

interface WineCategory {
  title: string;
  wines: Wine[];
}

/* ── Ejemplos inventados: sustituir por los vinos reales ── */
const bodegaData: WineCategory[] = [
  {
    title: "Espumosos",
    wines: [
      { name: "Brut Nature de la Sierra", bodega: "Cava Los Abantos", variety: "Xarel·lo, Macabeo", origin: "Penedès", type: "espumoso", glass: "6", bottle: "29" },
    ],
  },
  {
    title: "Blancos",
    wines: [
      { name: "Piedra Caballera", bodega: "Viñas del Alberche", variety: "Albillo Real", origin: "Sierra de Gredos", type: "blanco", glass: "5", bottle: "24" },
      { name: "Rías del Norte", bodega: "Pazo da Néboa", variety: "Albariño", origin: "Rías Baixas", type: "blanco", glass: "5.5", bottle: "27" },
    ],
  },
  {
    title: "Rosados",
    wines: [
      { name: "Rosa de Monte", bodega: "Bodegas Larraga", variety: "Garnacha", origin: "Navarra", type: "rosado", glass: "4.5", bottle: "21" },
    ],
  },
  {
    title: "Tintos",
    wines: [
      { name: "La Yesca", bodega: "Vino de la casa", variety: "Garnacha", origin: "Sierra de Guadarrama", type: "tinto", glass: "4", bottle: "18" },
      { name: "Pino Negro", bodega: "Bodegas Valdeolmos", variety: "Tempranillo", origin: "Ribera del Duero", type: "tinto", glass: "6", bottle: "34" },
      { name: "Cerro del Ciervo", bodega: "Finca El Raso", variety: "Syrah, Garnacha", origin: "Vinos de Madrid", type: "tinto", bottle: "42" },
    ],
  },
  {
    title: "Dulces",
    wines: [
      { name: "Miel de Otoño", bodega: "Bodegas Axarquía", variety: "Moscatel", origin: "Málaga", type: "dulce", glass: "6", bottle: "30" },
    ],
  },
];

const glassColor: Record<WineType, string> = {
  espumoso: "#2f3d27",
  blanco:   "#a7b36a",
  rosado:   "#d9978f",
  tinto:    "#3b1f22",
  dulce:    "#b07a2a",
};

/* Botella dibujada mientras no haya foto */
const BottleIllustration = ({ type }: { type: WineType }) => (
  <svg viewBox="0 0 60 200" className="h-[72%] w-auto drop-shadow-md" aria-hidden="true">
    <path
      d="M24 0 h12 v40 c0 18 16 22 16 44 v108 a8 8 0 0 1 -8 8 h-28 a8 8 0 0 1 -8 -8 v-108 c0 -22 16 -26 16 -44 z"
      fill={glassColor[type]}
    />
    <rect x="23" y="0" width="14" height="24" rx="1" fill="#1a1a1a" opacity="0.85" />
    <rect x="12" y="112" width="36" height="46" rx="2" fill="#f3ead8" />
    <rect x="18" y="122" width="24" height="2" fill="#1a1a1a" opacity="0.7" />
    <rect x="21" y="130" width="18" height="1.5" fill="#1a1a1a" opacity="0.4" />
    <rect x="21" y="136" width="18" height="1.5" fill="#1a1a1a" opacity="0.4" />
    <path d="M14 60 c-2 20 -2 80 0 120" stroke="#ffffff" strokeOpacity="0.18" strokeWidth="3" fill="none" />
  </svg>
);

const WineCard = ({ wine }: { wine: Wine }) => (
  <div className="bg-card border border-foreground/10 rounded-sm overflow-hidden flex flex-col">
    <div
      className="aspect-[4/5] flex items-center justify-center"
      style={{ backgroundColor: "hsl(46 26% 85%)" }}
    >
      {wine.image ? (
        <img src={wine.image} alt={wine.name} className="w-full h-full object-cover" loading="lazy" />
      ) : (
        <BottleIllustration type={wine.type} />
      )}
    </div>

    <div className="p-3 md:p-4 flex flex-col flex-1">
      <h4 className="font-display text-base md:text-lg leading-tight text-foreground">
        {wine.name}
      </h4>
      <p className="text-[11px] md:text-xs tracking-wide text-foreground/55 mt-1">
        {wine.bodega}
      </p>
      <p className="text-[11px] md:text-xs tracking-wide text-foreground/55 italic">
        {wine.variety} · {wine.origin}
      </p>

      <div className="mt-auto pt-3">
        <div className="border-t border-foreground/10 pt-2 flex justify-between items-baseline font-body text-sm text-foreground">
          {wine.glass ? (
            <span><span className="text-[10px] tracking-[0.15em] uppercase text-foreground/50 mr-1">Copa</span>{wine.glass}€</span>
          ) : <span />}
          <span><span className="text-[10px] tracking-[0.15em] uppercase text-foreground/50 mr-1">Botella</span>{wine.bottle}€</span>
        </div>
      </div>
    </div>
  </div>
);

const BodegaSection = () => (
  <div>
    <p className="font-body text-base text-foreground/60 text-center italic mb-12">
      Vinos de nuestra bodega, elegidos para acompañar la brasa
    </p>
    {bodegaData.map((category, i) => (
      <motion.div
        key={category.title}
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: i * 0.08 }}
        className="mb-14"
      >
        <h3 className="font-display text-xl md:text-2xl text-foreground mb-6 text-center italic">
          {category.title}
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-5">
          {category.wines.map((wine) => (
            <WineCard key={wine.name} wine={wine} />
          ))}
        </div>
      </motion.div>
    ))}
  </div>
);

export default BodegaSection;
