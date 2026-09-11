import { motion } from "framer-motion";

const HeroSection = () => (
  <section
    className="relative min-h-screen flex flex-col items-center justify-center px-6 py-20 overflow-hidden"
    style={{
      /* Gradiente oliva campo: manchas de color orgánicas */
      background: `
        radial-gradient(ellipse at 22% 30%, hsl(92 38% 72% / 0.8), transparent 52%),
        radial-gradient(ellipse at 78% 68%, hsl(70 30% 74% / 0.7), transparent 50%),
        radial-gradient(ellipse at 55% 15%, hsl(78 28% 76% / 0.6), transparent 48%),
        radial-gradient(ellipse at 10% 80%, hsl(88 34% 70% / 0.55), transparent 45%),
        hsl(85 28% 80%)
      `,
    }}
  >
    {/* Línea decorativa horizontal — muy fina, arriba */}
    <div className="absolute top-0 left-0 right-0 h-px bg-foreground/8" />

    {/* Contenido */}
    <div className="relative z-10 flex flex-col items-center text-center px-4">

      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.2, delay: 0.3 }}
        className="h-px w-14 bg-foreground/25 mb-10 origin-center"
      />

      <motion.h1
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        className="font-display text-6xl md:text-8xl lg:text-[9rem] tracking-[0.22em] text-foreground mb-5"
        style={{ fontWeight: 100 }}
      >
        LA YESCA
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.9 }}
        className="font-body text-xs md:text-sm tracking-[0.52em] text-foreground/45 uppercase"
      >
        Taberna · San Lorenzo de El Escorial
      </motion.p>

      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.2, delay: 1.1 }}
        className="h-px w-14 bg-foreground/25 mt-10 origin-center"
      />
    </div>

    {/* Scroll hint */}
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.6 }}
      className="absolute bottom-10 z-10 flex flex-col items-center gap-2"
    >
      <span className="font-body text-[9px] tracking-[0.3em] uppercase text-foreground/30">
        Scroll
      </span>
      <motion.div
        animate={{ y: [0, 7, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        className="w-px h-8 bg-foreground/25"
      />
    </motion.div>
  </section>
);

export default HeroSection;
