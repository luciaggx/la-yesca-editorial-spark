import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import delantales from "@/assets/delantales.png";
import botella from "@/assets/botella.png";

const GalleryImage = ({
  src,
  alt,
  className,
  delay = 0,
}: {
  src: string;
  alt: string;
  className?: string;
  delay?: number;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay, ease: "easeOut" }}
      className={`relative group overflow-hidden ${className}`}
    >
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        loading="lazy"
      />
    </motion.div>
  );
};

const GaleriaSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const isTitleInView = useInView(titleRef, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const leftY = useTransform(scrollYProgress, [0, 1], ["20px", "-20px"]);
  const rightY = useTransform(scrollYProgress, [0, 1], ["40px", "-40px"]);

  return (
    <section id="esencia" ref={ref} className="relative py-32 md:py-48 overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-16">
        {/* Section title */}
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isTitleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16 md:mb-24"
        >
          <h2 className="font-display text-5xl md:text-7xl lg:text-8xl text-foreground">
            La Esencia
          </h2>
          <div className="mt-4 h-px w-16 bg-amber" />
        </motion.div>

        {/* Asymmetric floating layout */}
        <div className="grid grid-cols-12 gap-6 md:gap-10">
          {/* Delantales — large, left-aligned */}
          <motion.div style={{ y: leftY }} className="col-span-12 md:col-span-7 space-y-4">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="font-display text-sm tracking-[0.4em] uppercase text-amber/60 mb-2"
            >
              Nuestra Piel
            </motion.p>
            <GalleryImage
              src={delantales}
              alt="El equipo de La Yesca — delantales de cuero sobre muro de piedra"
              className="aspect-[4/3] shadow-2xl shadow-background/60"
              delay={0.1}
            />
          </motion.div>

          {/* Botella — smaller, offset right and down */}
          <motion.div style={{ y: rightY }} className="col-span-12 md:col-span-5 md:pt-32 space-y-4">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="font-display text-sm tracking-[0.4em] uppercase text-amber/60 mb-2 text-right"
            >
              El Monte Embotellado
            </motion.p>
            <GalleryImage
              src={botella}
              alt="Botella artesanal de La Yesca en el bosque"
              className="aspect-[3/4] shadow-2xl shadow-background/60"
              delay={0.3}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default GaleriaSection;
