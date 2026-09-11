import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const eventos = [
  {
    titulo: "Celebraciones y cumpleaÃ±os",
    descripcion:
      "Celebra lo que merece ser celebrado. Te diseÃ±amos un menÃº a medida para que el dÃ­a sea Ãºnico, con los sabores del monte y la brasa como protagonistas.",
  },
  {
    titulo: "Cenas privadas",
    descripcion:
      "El espacio solo para vosotros. Una experiencia Ã­ntima con menÃº cerrado, selecciÃ³n de vinos y atenciÃ³n exclusiva para grupos de hasta 30 personas.",
  },
  {
    titulo: "Eventos de empresa",
    descripcion:
      "Comidas de trabajo, presentaciones o team buildings con el carÃ¡cter de La Yesca. GastronomÃ­a que genera conversaciÃ³n y crea vÃ­nculos.",
  },
];

const EventosSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="eventos" ref={ref} className="py-24 md:py-36 px-6"
      style={{ backgroundColor: "hsl(48 25% 93%)" }}>
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
          className="font-display text-4xl md:text-6xl text-foreground text-center mb-4"
          style={{ fontWeight: 100, letterSpacing: "0.1em" }}
        >
          Eventos La Yesca
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.9, delay: 0.15 }}
          className="font-body text-base text-foreground/45 italic text-center mb-16"
        >
          Momentos que merecen algo mÃ¡s que una comida
        </motion.p>

        {/* Lista de tipos de evento */}
        <div className="border-t border-foreground/10">
          {eventos.map((ev, i) => (
            <motion.div
              key={ev.titulo}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.25 + i * 0.13 }}
              className="border-b border-foreground/10 py-8"
            >
              <p className="font-display text-lg md:text-xl text-foreground/85 mb-3"
                style={{ fontWeight: 300, letterSpacing: "0.06em" }}>
                {ev.titulo}
              </p>
              <p className="font-body text-sm md:text-base text-foreground/50 leading-relaxed">
                {ev.descripcion}
              </p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-12 text-center"
        >
          <a
            href="mailto:info@layesca.com"
            className="group inline-flex items-center gap-3 font-body text-sm tracking-[0.2em] uppercase text-foreground/60 hover:text-amber-400 transition-colors duration-300"
          >
            Consultar disponibilidad
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
          </a>
        </motion.div>

      </div>
    </section>
  );
};

export default EventosSection;
