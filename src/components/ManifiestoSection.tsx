import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import hongo from "@/assets/hongo.png";

const ManifiestoSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(textRef, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const imgY = useTransform(scrollYProgress, [0, 1], ["30px", "-30px"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["20px", "-20px"]);

  return (
    <section id="origen" ref={ref} className="relative py-32 md:py-48 overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-16">
        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, x: -40 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1, ease: "easeOut" }}
          className="font-display text-5xl md:text-8xl lg:text-9xl text-foreground mb-12 md:mb-16 ml-4 md:ml-[5%]"
        >
          El Origen
        </motion.h2>

        {/* Two-column layout: image left, text right */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start">
          {/* Floating image — asymmetric, not full width */}
          <motion.div
            style={{ y: imgY }}
            className="md:col-span-5 md:col-start-1"
          >
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="relative"
            >
              <img
                src={hongo}
                alt="Fomes fomentarius — el hongo yesca"
                className="w-full aspect-[3/4] object-cover shadow-2xl shadow-background/60"
                loading="lazy"
              />
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, delay: 0.5 }}
                className="mt-4 h-px w-16 bg-amber origin-left"
              />
            </motion.div>
          </motion.div>

          {/* Text block — cream paper, floating right */}
          <motion.div
            ref={textRef}
            style={{ y: textY }}
            className="md:col-span-6 md:col-start-7 md:mt-24"
          >
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 0.3 }}
              className="cream-paper-bg p-8 md:p-14 lg:p-16 shadow-2xl shadow-background/40"
            >
              <p className="font-body text-lg md:text-xl lg:text-2xl leading-relaxed text-cream-foreground/90 mb-6">
                <span className="font-display text-3xl md:text-4xl italic text-cream-foreground">LA YESCA:</span>{" "}
                un tesoro olvidado del monte. El Fomes fomentarius, un hongo que crece paciente
                sobre los árboles, fue durante siglos la chispa que encendía el fuego.
              </p>
              <p className="font-body text-lg md:text-xl lg:text-2xl leading-relaxed text-cream-foreground/80 mb-6">
                Ese mismo espíritu nos inspira. Somos la mecha que enciende la experiencia,
                lo que transforma lo crudo en algo extraordinario.
              </p>
              <p className="font-body text-lg md:text-xl lg:text-2xl leading-relaxed text-cream-foreground/70">
                Conectamos lo ancestral con lo contemporáneo, el monte con la mesa,
                el fuego con el paladar.
              </p>

              <motion.div
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : {}}
                transition={{ duration: 1.5, delay: 0.8 }}
                className="mt-10 h-px w-24 bg-amber origin-left"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ManifiestoSection;
