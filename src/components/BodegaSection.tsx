import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { bodegaData, type Wine, type WineType } from "@/data/bodega";
import WineDialog from "./WineDialog";

const glassColor: Record<WineType, string> = {
  espumoso: "#2f3d27",
  blanco:   "#a7b36a",
  naranja:  "#c98a3f",
  rosado:   "#d9978f",
  tinto:    "#3b1f22",
  generoso: "#7a4a1e",
  vermut:   "#5a2c1c",
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

const WineCard = ({ wine, onSelect }: { wine: Wine; onSelect: () => void }) => (
  <button
    type="button"
    onClick={onSelect}
    aria-label={`Ver ${wine.name}`}
    className="group flex flex-col w-full h-full text-left transition-shadow hover:shadow-lg"
    style={{ backgroundColor: "hsl(50 28% 95%)" }}
  >
    <div
      className="aspect-[3/5] w-full overflow-hidden flex items-center justify-center"
      style={{ backgroundColor: "hsl(46 26% 87%)" }}
    >
      {wine.image ? (
        <img src={wine.image} alt={wine.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
      ) : (
        <BottleIllustration type={wine.type} />
      )}
    </div>

    <div className="p-4 md:p-6 flex flex-col flex-1">
      {wine.origin && (
        <p className="font-body text-[10px] md:text-xs tracking-[0.2em] uppercase text-foreground/35 mb-2">
          {wine.origin}
        </p>
      )}
      <p className="font-display text-base md:text-lg text-foreground/90 leading-tight mb-2" style={{ fontWeight: 300 }}>
        {wine.name}
      </p>
      {(wine.bodega || wine.variety) && (
        <p className="font-body text-xs md:text-sm text-foreground/50 leading-snug mb-4">
          {wine.bodega}
          {wine.bodega && wine.variety && " · "}
          {wine.variety && <span className="italic">{wine.variety}</span>}
        </p>
      )}

      {wine.bottle && (
        <div className="mt-auto flex items-baseline justify-between gap-2 border-t border-foreground/10 pt-3">
          {wine.glass ? (
            <span className="font-body text-sm text-foreground/70">
              <span className="text-[10px] tracking-[0.15em] uppercase text-foreground/35 mr-1">Copa</span>{wine.glass} €
            </span>
          ) : <span />}
          <span className="font-display text-lg md:text-xl text-foreground/80" style={{ fontWeight: 300 }}>
            {wine.bottle} €
          </span>
        </div>
      )}
    </div>
  </button>
);

const BodegaSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [selected, setSelected] = useState<Wine | null>(null);

  return (
    <section id="bodega" ref={ref} className="py-24 md:py-36 px-6 bg-background">
      <div className="max-w-4xl mx-auto">

        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 1 }}
          className="h-px w-10 bg-amber-500/50 mx-auto mb-10 origin-center"
        />

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9 }}
          className="font-display text-4xl md:text-6xl text-foreground text-center mb-4"
          style={{ fontWeight: 100, letterSpacing: "0.1em" }}
        >
          La Bodega
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.9, delay: 0.15 }}
          className="font-body text-base text-foreground/45 italic text-center mb-16"
        >
          Vinos elegidos para acompañar la brasa
        </motion.p>

        {/* Vinos por tipo */}
        {bodegaData.map((category) => (
          <div key={category.title} className="mb-14 md:mb-20">
            <motion.h3
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="font-display text-2xl md:text-3xl text-foreground/80 text-center mb-8"
              style={{ fontWeight: 200, letterSpacing: "0.06em" }}
            >
              {category.title}
            </motion.h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
              {category.wines.map((wine, i) => (
                <motion.div
                  key={wine.name}
                  initial={{ opacity: 0, y: 24 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.7, delay: 0.2 + Math.min(i, 8) * 0.06 }}
                >
                  <WineCard wine={wine} onSelect={() => setSelected(wine)} />
                </motion.div>
              ))}
            </div>
          </div>
        ))}

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="text-center font-body text-sm text-foreground/30 mt-10 italic"
        >
          Todos nuestros vinos se pueden llevar a casa. Pregunta en sala.
        </motion.p>

      </div>

      <WineDialog wine={selected} onClose={() => setSelected(null)} />
    </section>
  );
};

export default BodegaSection;
