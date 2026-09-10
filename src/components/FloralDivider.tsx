import { motion } from "framer-motion";
import { useRef } from "react";
import { useInView } from "framer-motion";

const GOLD   = "#c4882c";
const GOLDDIM = "#c4882c44";

/* ── Ornamento: rombo central + puntos + líneas ── */
const OrnamentSVG = () => (
  <svg width="200" height="18" viewBox="0 0 200 18" fill="none" aria-hidden="true">
    {/* Líneas laterales con degradado */}
    <defs>
      <linearGradient id="lineL" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor={GOLD} stopOpacity="0"/>
        <stop offset="100%" stopColor={GOLD} stopOpacity="0.45"/>
      </linearGradient>
      <linearGradient id="lineR" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor={GOLD} stopOpacity="0.45"/>
        <stop offset="100%" stopColor={GOLD} stopOpacity="0"/>
      </linearGradient>
    </defs>

    <line x1="0"   y1="9" x2="76"  y2="9" stroke="url(#lineL)" strokeWidth="0.7"/>
    <line x1="124" y1="9" x2="200" y2="9" stroke="url(#lineR)" strokeWidth="0.7"/>

    {/* Puntos pequeños */}
    <circle cx="79"  cy="9" r="1.5" fill={GOLD} opacity="0.5"/>
    <circle cx="121" cy="9" r="1.5" fill={GOLD} opacity="0.5"/>

    {/* Rombo central */}
    <polygon
      points="100,1 111,9 100,17 89,9"
      stroke={GOLD}
      strokeWidth="0.8"
      fill="none"
      opacity="0.85"
    />
    {/* Cruz interior tenue */}
    <line x1="100" y1="4"  x2="100" y2="14" stroke={GOLD} strokeWidth="0.4" opacity="0.35"/>
    <line x1="92"  y1="9"  x2="108" y2="9"  stroke={GOLD} strokeWidth="0.4" opacity="0.35"/>
  </svg>
);

/* ── Divisor ── */
const Divider = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div ref={ref} className="flex items-center justify-center py-10 bg-background">
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.9, ease: "easeOut" }}
      >
        <OrnamentSVG />
      </motion.div>
    </div>
  );
};

const FloralDivider          = () => <Divider />;
export const MushroomDivider = () => <Divider />;
export default FloralDivider;
