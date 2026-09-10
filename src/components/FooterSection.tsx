import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import logo from "@/assets/logo.png";
import { MapPin } from "lucide-react";

interface FooterSectionProps {
  onOpenLegal: (type: "privacidad" | "cookies") => void;
}

const FooterSection = ({ onOpenLegal }: FooterSectionProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <footer id="contacto" ref={ref} className="relative py-20 md:py-28">
      {/* Separator */}
      <div className="max-w-xs mx-auto mb-16">
        <div className="h-px w-full bg-accent/20" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-16 text-center">
        {/* Logo */}
        <motion.img
          src={logo}
          alt="LA YESCA"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8 }}
          className="w-24 md:w-32 mx-auto mb-6"
        />

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-base italic text-foreground/60 mb-10"
        >
          Cocina de fuego y tradición
        </motion.p>

        <div className="h-px w-20 mx-auto bg-accent/30 mb-10" />

        {/* Contact info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-4"
        >
          <p className="text-lg tracking-wide text-muted-foreground">
            Reservas & Contacto
          </p>
          <p className="text-foreground/80 text-lg">
            info@layesca.com
          </p>
          <p className="text-foreground/50">
            +34 600 000 000
          </p>
        </motion.div>

        {/* Location */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-8"
        >
          <div className="flex items-center justify-center gap-2 mb-2">
            <MapPin className="w-4 h-4 text-accent" />
            <p className="text-sm tracking-[0.2em] uppercase text-foreground/60">
              Ubicación
            </p>
          </div>
          <p className="text-foreground/80 text-sm">
            C. San Quintín, 4
          </p>
          <p className="text-foreground/60 text-sm">
            28200 San Lorenzo de El Escorial, Madrid
          </p>
        </motion.div>

        {/* Google Maps Embed */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-10 rounded-lg overflow-hidden border border-border/30"
        >
          <iframe
            title="Ubicación La Yesca"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3035.8!2d-4.1478!3d40.5894!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd4000000000000%3A0x0!2sC.+San+Quint%C3%ADn%2C+4%2C+28200+San+Lorenzo+de+El+Escorial%2C+Madrid!5e0!3m2!1ses!2ses!4v1700000000000"
            width="100%"
            height="300"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full"
          />
        </motion.div>

        <div className="h-px w-20 mx-auto bg-accent/30 my-10" />

        {/* Social */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <a href="#" className="text-foreground/50 hover:text-accent transition-colors duration-300 tracking-widest text-sm uppercase">
            Instagram
          </a>
        </motion.div>

        {/* Legal links */}
        <div className="mt-12 flex flex-wrap justify-center gap-6">
          <button
            onClick={() => onOpenLegal("privacidad")}
            className="text-xs text-muted-foreground/50 hover:text-foreground/70 transition-colors tracking-widest uppercase underline-offset-4 hover:underline"
          >
            Política de Privacidad
          </button>
          <button
            onClick={() => onOpenLegal("cookies")}
            className="text-xs text-muted-foreground/50 hover:text-foreground/70 transition-colors tracking-widest uppercase underline-offset-4 hover:underline"
          >
            Política de Cookies
          </button>
        </div>

        {/* Copyright */}
        <p className="mt-4 text-xs text-muted-foreground/30 tracking-widest uppercase">
          © {new Date().getFullYear()} La Yesca — Todos los derechos reservados
        </p>
      </div>
    </footer>
  );
};

export default FooterSection;
