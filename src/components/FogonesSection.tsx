import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const menuItems = [
  "Guisos de temporada a fuego lento",
  "Carnes rojas de la sierra",
  "Setas y tesoros del bosque",
  "Verduras de huerta a la brasa",
  "Postres de lumbre y miel",
];

const FogonesSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="fogones" ref={ref} className="relative py-28 md:py-40 overflow-hidden">
      {/* Content — centered, floating on the dark canvas */}
      <div className="relative z-10 max-w-3xl mx-auto px-6 md:px-16 text-center">
        {/* Decorative top line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 1.2 }}
          className="h-px w-16 bg-amber mx-auto mb-12 origin-center"
        />

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="font-display text-4xl md:text-6xl lg:text-7xl text-foreground mb-4"
        >
          Nuestra Cocina
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-display text-lg md:text-2xl italic text-foreground/50 mb-16 tracking-wide"
        >
          de Monte y Brasa
        </motion.p>

        {/* Menu items */}
        <div className="space-y-6 md:space-y-8">
          {menuItems.map((item, i) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 + i * 0.15 }}
              className="group"
            >
              <p className="font-body text-xl md:text-2xl lg:text-3xl text-foreground/70 tracking-wide transition-colors duration-300 group-hover:text-amber">
                {item}
              </p>
              {i < menuItems.length - 1 && (
                <div className="h-px w-8 bg-accent/20 mx-auto mt-6 md:mt-8" />
              )}
            </motion.div>
          ))}
        </div>

        {/* Decorative bottom line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 1.2, delay: 1.2 }}
          className="h-px w-16 bg-amber mx-auto mt-16 origin-center"
        />
      </div>
    </section>
  );
};

export default FogonesSection;
