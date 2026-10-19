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
          ¿Qué es La Yesca?
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="max-w-2xl mx-auto space-y-6 font-body text-base md:text-lg text-foreground/75 leading-relaxed"
        >
          <p className="text-lg md:text-xl text-foreground/85">
            <span className="font-display text-2xl text-amber-700" style={{ fontWeight: 300 }}>
              La Yesca
            </span>{" "}
            es una pequeña taberna en San Lorenzo de El Escorial que nace con una idea muy
            sencilla: recuperar el espíritu de la cocina de siempre.
          </p>
          <p>
            Creemos en el producto, en el territorio y en la cercanía. En cocinar sin artificios,
            con respeto y con el conocimiento que dan los años de oficio. Nuestro chef, Jorge
            Asenjo, lleva dos décadas dedicándose a este mundo y esa experiencia está detrás
            de cada plato, de cada elaboración y de cada decisión que tomamos.
          </p>
          <p>
            Nuestra gran seña de identidad es la cocina de caza. Corzo, ciervo, gamo, jabalí,
            pato o liebre forman parte de una despensa que sentimos profundamente ligada a la
            Sierra de Guadarrama.
          </p>
          <p>
            Creemos en la caza como un producto sostenible y en la responsabilidad de
            aprovecharla de principio a fin. No se trata solo de cocinar caza, sino de entenderla,
            respetarla y transformarla en guisos, fondos hechos a fuego lento, embutidos,
            patés…
          </p>
          <p>
            Y si algo acompaña bien a una buena mesa, es un buen vino. Nuestra bodega
            reúne más de 70 productores, algunos conocidos y otros prácticamente
            desconocidos para el gran público. No buscamos nombres ni etiquetas por prestigio:
            buscamos vinos seleccionados a conciencia, vinos con personalidad, con historia y,
            sobre todo, vinos que nos emocionan y que queremos compartir.
          </p>
          <p className="font-display text-lg md:text-xl text-foreground/85 text-center pt-6 italic" style={{ fontWeight: 300 }}>
            En La Yesca creemos que comer bien no tiene por qué ser complicado. Tiene que
            ser honesto. Una cocina de territorio, de temporada y de memoria; una cocina
            cercana que respeta lo que somos y que pone en valor los sabores de siempre en
            un ambiente casero, familiar y sin formalidades.
          </p>
        </motion.div>

      </div>
    </section>
  );
};

export default QueEsSection;
