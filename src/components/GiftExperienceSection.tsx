import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const personOptions = [1, 2, 3, 4];

const menus = [
  {
    name: "MenÃº Especial",
    description: "Una selecciÃ³n de nuestros platos mÃ¡s emblemÃ¡ticos, maridados con vinos de la tierra.",
    pricePerPerson: 45,
    link: "#",
  },
  {
    name: "MenÃº DegustaciÃ³n",
    description: "Un recorrido por los sabores del monte y la brasa en seis tiempos inolvidables.",
    pricePerPerson: 65,
    link: "#",
  },
  {
    name: "MenÃº RomÃ¡ntico",
    description: "Cena Ã­ntima para dos con entrantes, principal, postre y botella de vino seleccionada.",
    pricePerPerson: 80,
    link: "#",
  },
];

const GiftExperienceSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [persons, setPersons] = useState(2);

  return (
    <section id="regala" ref={ref} className="py-20 md:py-32 px-6" style={{ backgroundColor: "hsl(48 25% 93%)" }}>
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 1 }}
          className="h-px w-20 bg-accent mx-auto mb-12 origin-center"
        />

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="font-display text-4xl md:text-5xl text-foreground text-center mb-4"
        >
          Regala La Yesca
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="font-body text-lg md:text-xl text-foreground/70 text-center mb-14"
        >
          Dale a alguien especial un momento inolvidable
        </motion.p>

        {/* Person selector */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col items-center mb-14"
        >
          <span className="font-body text-sm tracking-[0.2em] uppercase text-foreground/60 mb-4">
            NÃºmero de personas
          </span>
          <div className="inline-flex border border-foreground/30 rounded-sm overflow-hidden">
            {personOptions.map((n) => (
              <button
                key={n}
                onClick={() => setPersons(n)}
                className={`px-5 py-2.5 font-body text-sm tracking-[0.15em] transition-all duration-300 ${
                  persons === n
                    ? "bg-foreground text-background"
                    : "text-foreground/70 hover:text-foreground"
                } ${n < personOptions.length ? "border-r border-foreground/30" : ""}`}
              >
                {n === 4 ? "4+" : n}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Menu cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {menus.map((menu, i) => {
            const total = menu.pricePerPerson * persons;
            return (
              <motion.div
                key={menu.name}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.4 + i * 0.12 }}
                className="border border-foreground/20 rounded-sm p-6 flex flex-col bg-background/40 backdrop-blur-sm"
              >
                <h3 className="font-display text-xl md:text-2xl text-foreground mb-3 text-center">
                  {menu.name}
                </h3>
                <p className="font-body text-sm text-foreground/60 text-center mb-6 flex-1">
                  {menu.description}
                </p>
                <div className="text-center mb-5">
                  <span className="font-display text-3xl text-foreground">{total}â‚¬</span>
                  <span className="font-body text-xs text-foreground/50 block mt-1">
                    {menu.pricePerPerson}â‚¬ Ã— {persons} {persons === 1 ? "persona" : "personas"}
                  </span>
                </div>
                <a
                  href={menu.link}
                  className="block w-full text-center py-3 border border-foreground/30 rounded-sm font-body text-sm tracking-[0.2em] uppercase text-foreground hover:bg-foreground hover:text-background transition-all duration-300"
                >
                  Regalar
                </a>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default GiftExperienceSection;
