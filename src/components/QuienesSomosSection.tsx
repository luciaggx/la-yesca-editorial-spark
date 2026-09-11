import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const QuienesSomosSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="quienes-somos" ref={ref} className="py-24 md:py-36 px-6 bg-background">
      <div className="max-w-3xl mx-auto">

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
          className="font-display text-4xl md:text-6xl text-foreground text-center mb-16"
          style={{ fontWeight: 100, letterSpacing: "0.1em" }}
        >
          Quiénes somos
        </motion.h2>

        {/* Bloque principal */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="text-center mb-16 space-y-6"
        >
          <p className="font-body text-lg md:text-xl text-foreground/75 leading-relaxed">
            {/* TODO: reemplazar con el texto real del equipo */}
            Somos un equipo apasionado por la cocina de fuego y los productos del entorno.
            Nacimos con la idea de rescatar la cocina más honesta de la sierra de Madrid
            y llevarla a la mesa con carácter y técnica.
          </p>
          <p className="font-body text-base md:text-lg text-foreground/55 leading-relaxed">
            Cada plato que servimos lleva detrás horas de elaboración, productores de
            proximidad y un respeto profundo por el ingrediente. Eso es La Yesca.
          </p>
        </motion.div>

        {/* Valores — tres columnas */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-px border border-foreground/8"
          style={{ backgroundColor: "hsl(85 14% 78%)" }}
        >
          {[
            { label: "Producto", text: "De temporada, de proximidad y con historia." },
            { label: "Fuego",    text: "La brasa como técnica y como filosofía de cocina." },
            { label: "Terroir",  text: "La sierra de Madrid en cada bocado." },
          ].map((v, i) => (
            <motion.div
              key={v.label}
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.5 + i * 0.12 }}
              className="flex flex-col items-center text-center px-8 py-10"
              style={{ backgroundColor: "hsl(50 28% 95%)" }}
            >
              <div className="w-6 h-px bg-amber-500/50 mb-5" />
              <p className="font-display text-sm tracking-[0.25em] uppercase text-amber-400/70 mb-3"
                style={{ fontWeight: 400 }}>
                {v.label}
              </p>
              <p className="font-body text-sm text-foreground/55 leading-relaxed">
                {v.text}
              </p>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default QuienesSomosSection;
