import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* Tira de texto horizontal que se mueve al hacer scroll — efecto editorial */

const words = [
  "Taberna",
  "·",
  "San Lorenzo de El Escorial",
  "·",
  "Producto de temporada",
  "·",
  "Fuego y terroir",
  "·",
  "Desde el monte a la mesa",
  "·",
];

export const ScrollingStrip = () => {
  const stripRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!stripRef.current || !trackRef.current) return;

    const ctx = gsap.context(() => {
      gsap.to(trackRef.current, {
        xPercent: -50,
        ease: "none",
        scrollTrigger: {
          trigger: stripRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.8,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  /* Triplicamos para que no se vea el hueco */
  const allWords = [...words, ...words, ...words];

  return (
    <div
      ref={stripRef}
      className="overflow-hidden py-5 border-y border-foreground/12 bg-background/60"
    >
      <div
        ref={trackRef}
        className="flex items-center gap-8 w-max will-change-transform"
      >
        {allWords.map((w, i) => (
          <span
            key={i}
            className={
              w === "·"
                ? "text-amber-700/50 text-base select-none"
                : "font-body text-xs tracking-[0.28em] uppercase text-foreground/45 whitespace-nowrap"
            }
          >
            {w}
          </span>
        ))}
      </div>
    </div>
  );
};

export default ScrollingStrip;
