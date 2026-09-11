import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

/* TODO: reemplazar con los productos reales y sus precios */
const productos = [
  {
    nombre: "Aceite de oliva La Yesca",
    descripcion: "AOVE de producciÃ³n propia, prensado en frÃ­o. EdiciÃ³n limitada.",
    precio: "18 â‚¬",
    unidad: "500 ml",
  },
  {
    nombre: "Conservas de caza",
    descripcion: "JabalÃ­ en escabeche, ciervo en aceite. Elaboradas en nuestras cocinas.",
    precio: "12 â‚¬",
    unidad: "frasco 250 g",
  },
  {
    nombre: "Vino de la casa",
    descripcion: "SelecciÃ³n exclusiva embotellada bajo la etiqueta La Yesca.",
    precio: "22 â‚¬",
    unidad: "botella 75 cl",
  },
  {
    nombre: "Kit de encendido",
    descripcion: "Yesca, pedernal y raspador. El origen de todo, en una caja de regalo.",
    precio: "35 â‚¬",
    unidad: "set completo",
  },
];

const BoutiqueSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="boutique" ref={ref} className="py-24 md:py-36 px-6 bg-background">
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
          La Yesca Boutique
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.9, delay: 0.15 }}
          className="font-body text-base text-foreground/45 italic text-center mb-16"
        >
          LlÃ©vate un pedazo del monte a casa
        </motion.p>

        {/* Grid de productos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-px"
          style={{ backgroundColor: "hsl(76 18% 80%)" }}>
          {productos.map((p, i) => (
            <motion.div
              key={p.nombre}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 + i * 0.1 }}
              className="group flex flex-col justify-between p-8 cursor-pointer transition-colors duration-300"
              style={{ backgroundColor: "hsl(80 20% 87%)" }}
            >
              <div>
                <p className="font-body text-xs tracking-[0.2em] uppercase text-foreground/30 mb-3">
                  {p.unidad}
                </p>
                <p className="font-display text-lg text-foreground/90 mb-3 group-hover:text-amber-400 transition-colors duration-300"
                  style={{ fontWeight: 300 }}>
                  {p.nombre}
                </p>
                <p className="font-body text-sm text-foreground/50 leading-relaxed mb-6">
                  {p.descripcion}
                </p>
              </div>

              <div className="flex items-center justify-between">
                <span className="font-display text-xl text-foreground/80"
                  style={{ fontWeight: 300 }}>
                  {p.precio}
                </span>
                <span className="flex items-center gap-1.5 font-body text-xs tracking-[0.15em] uppercase text-foreground/30 group-hover:text-amber-400 transition-colors duration-300">
                  Consultar <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="text-center font-body text-sm text-foreground/30 mt-10 italic"
        >
          Disponible en el local y prÃ³ximamente online.{" "}
          <a href="mailto:info@layesca.com"
            className="text-foreground/45 hover:text-amber-400 underline underline-offset-4 transition-colors duration-300 not-italic">
            Consultar pedidos
          </a>
        </motion.p>

      </div>
    </section>
  );
};

export default BoutiqueSection;
