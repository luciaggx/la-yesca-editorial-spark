import { useState } from "react";
import { motion } from "framer-motion";
import barriles from "@/assets/barriles-grabado.webp";
import DibujoTinta from "./DibujoTinta";
import Reveal from "./Reveal";
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
  <svg viewBox="0 0 60 200" className="h-[72%] w-auto" aria-hidden="true">
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
    className="group flex flex-col w-full h-full text-left"
  >
    <div className="aspect-[3/5] w-full overflow-hidden flex items-center justify-center bg-tono">
      {wine.image ? (
        <img src={wine.image} alt={wine.name} className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" loading="lazy" />
      ) : (
        <BottleIllustration type={wine.type} />
      )}
    </div>

    <p className="texto-subtitulo mt-3">{wine.name}</p>
    {(wine.bodega || wine.variety || wine.origin) && (
      <p className="texto-small mt-1">
        {[wine.bodega, wine.variety, wine.origin].filter(Boolean).join(" · ")}
      </p>
    )}
    {wine.bottle && (
      <p className="texto-cuerpo tabular-nums mt-1">
        {wine.bottle} €{wine.glass && ` · copa ${wine.glass} €`}
      </p>
    )}
  </button>
);

const TODOS = "Todos";

const BodegaSection = () => {
  const [selected, setSelected] = useState<Wine | null>(null);
  const [tipo, setTipo] = useState("Tintos");
  const categorias = bodegaData.filter((c) => tipo === TODOS || c.title === tipo);

  return (
    <section id="bodega" className="bg-field text-wheat">
      <div className="marco pt-24 text-center">
        <Reveal>
          <h2 className="texto-titulo mb-2">La Bodega</h2>
          <p className="texto-lead">Vinos elegidos para acompañar la brasa</p>
        </Reveal>
        <DibujoTinta
          src={barriles}
          ancho={1100}
          alto={868}
          descripcion="Grabado de tres barriles de vino apilados y uno de pie detrás, entre helechos"
          tinta="#E4D59E"
          alVerse
          className="block w-full h-auto max-w-[720px] mx-auto mt-8 cursor-pointer"
        />
      </div>

      <div className="marco pt-20 pb-24 md:pb-40">
        <div role="group" aria-label="Tipo de vino" className="flex flex-wrap gap-1 mb-14 md:mb-20">
          {[TODOS, ...bodegaData.map((c) => c.title)].map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTipo(t)}
              aria-pressed={tipo === t}
              className={`px-4 py-2 texto-cuerpo transition-colors duration-300 ${
                tipo === t ? "bg-wheat text-field" : "hover:bg-wheat/15"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {categorias.map((category) => (
          <div key={category.title} className="mb-16 md:mb-24 last:mb-0">
            <h3 className="texto-titulo mb-8 md:mb-10">{category.title}</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-4 gap-y-10 md:gap-y-14">
              {category.wines.map((wine, i) => (
                <motion.div
                  key={wine.name}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.7, delay: (i % 5) * 0.06, ease: [0.16, 1, 0.3, 1] }}
                >
                  <WineCard wine={wine} onSelect={() => setSelected(wine)} />
                </motion.div>
              ))}
            </div>
          </div>
        ))}

        <p className="texto-lead mt-16 md:mt-24">
          Todos nuestros vinos se pueden llevar a casa. Pregunta en sala.
        </p>
      </div>

      <WineDialog wine={selected} onClose={() => setSelected(null)} />
    </section>
  );
};

export default BodegaSection;
