import { motion } from "framer-motion";
import { useRef } from "react";
import { useInView } from "framer-motion";
import forestFlower from "@/assets/forest-flower.png";
import flowersTrio from "@/assets/forest-flowers-trio.png";

/* ── Separador 1: flor única — entre menú y reservas ── */
const FloralDivider = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div
      ref={ref}
      className="flex flex-col items-center overflow-hidden"
      style={{ backgroundColor: "hsl(43,40%,88%)", paddingTop: "2px", paddingBottom: "2px" }}
    >
      <div className="flex items-center w-full max-w-xl px-8 gap-4">
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 1, ease: "easeOut" }}
          className="flex-1 h-px origin-left"
          style={{ backgroundColor: "hsl(35,25%,58%)" }}
        />
        <motion.img
          src={forestFlower}
          alt="Ilustración botánica"
          initial={{ opacity: 0, scale: 0.7, rotate: -8 }}
          animate={isInView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
          className="w-24 md:w-32 select-none pointer-events-none"
          style={{ filter: "sepia(40%) brightness(0.82)" }}
        />
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 1, ease: "easeOut", delay: 0.1 }}
          className="flex-1 h-px origin-right"
          style={{ backgroundColor: "hsl(35,25%,58%)" }}
        />
      </div>
    </div>
  );
};

/* ── Separador 2: trío de flores — entre hero y menú ── */
export const MushroomDivider = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div
      ref={ref}
      className="flex flex-col items-center overflow-hidden bg-background"
      style={{ paddingTop: "2px", paddingBottom: "2px" }}
    >
      <div className="flex items-center w-full max-w-xl px-8 gap-4">
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 1, ease: "easeOut" }}
          className="flex-1 h-px origin-left"
          style={{ backgroundColor: "hsl(35,25%,45%)" }}
        />
        <motion.img
          src={flowersTrio}
          alt="Tres flores silvestres del bosque"
          initial={{ opacity: 0, scale: 0.75, rotate: -5 }}
          animate={isInView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
          className="w-28 md:w-36 select-none pointer-events-none"
          style={{ filter: "sepia(15%) brightness(0.9)" }}
        />
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 1, ease: "easeOut", delay: 0.1 }}
          className="flex-1 h-px origin-right"
          style={{ backgroundColor: "hsl(35,25%,45%)" }}
        />
      </div>
    </div>
  );
};

export default FloralDivider;
