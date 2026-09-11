import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const QueEsSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="que-es" ref={ref} className="py-24 md:py-36 px-6"
      style={{ backgroundColor: "hsl(48 28% 93%)" }}>
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
          Qué es La Yesca
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">

          {/* Texto */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="space-y-6"
          >
            <p className="font-body text-lg md:text-xl text-foreground/80 leading-relaxed">
              <span className="font-display text-2xl text-amber-400/90" style={{ fontWeight: 300 }}>
                La yesca
              </span>{" "}
              es el nombre que recibe el hongo <em>Fomes fomentarius</em>, que crece paciente
              sobre los árboles del monte y fue durante siglos la chispa que encendía el fuego.
            </p>
            <p className="font-body text-base md:text-lg text-foreground/60 leading-relaxed">
              Ese mismo espíritu nos inspira: somos la mecha que enciende la experiencia,
              lo que transforma lo crudo en algo extraordinario. Conectamos lo ancestral con
              lo contemporáneo, el monte con la mesa, el fuego con el paladar.
            </p>
            <p className="font-body text-base md:text-lg text-foreground/55 leading-relaxed">
              Una taberna donde la cocina de brasa y los productos de la sierra de Madrid
              son los protagonistas de cada plato.
            </p>
          </motion.div>

          {/* Elemento visual — barra dorada decorativa */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.35 }}
            className="flex flex-col items-center gap-4"
          >
            <div className="w-px h-32 bg-gradient-to-b from-transparent via-amber-500/40 to-transparent" />
            <p className="font-body text-sm tracking-[0.35em] uppercase text-foreground/30 text-center">
              Taberna · Brasa · Monte
            </p>
            <div className="w-px h-32 bg-gradient-to-b from-transparent via-amber-500/40 to-transparent" />
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default QueEsSection;
