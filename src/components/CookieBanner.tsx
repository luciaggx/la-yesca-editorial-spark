import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface CookieBannerProps {
  onOpenLegal: (type: "privacidad" | "cookies") => void;
}

const COOKIE_KEY = "layesca_cookie_consent";

const CookieBanner = ({ onOpenLegal }: CookieBannerProps) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(COOKIE_KEY);
      if (!stored) setVisible(true);
    } catch {
      // localStorage not available, don't show banner
    }
  }, []);

  const accept = () => {
    try { localStorage.setItem(COOKIE_KEY, "accepted"); } catch {}
    setVisible(false);
  };

  const essential = () => {
    try { localStorage.setItem(COOKIE_KEY, "essential"); } catch {}
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:max-w-sm z-[80] bg-background border border-foreground/15 rounded-sm shadow-2xl px-5 py-5"
        >
          <p className="font-body text-sm text-foreground/80 leading-relaxed mb-4">
            Usamos cookies propias y de terceros para mejorar tu experiencia. Puedes aceptar todas o solo las esenciales.{" "}
            <button
              onClick={() => onOpenLegal("cookies")}
              className="underline underline-offset-2 text-foreground hover:text-accent transition-colors"
            >
              Más información
            </button>
            {" "}y{" "}
            <button
              onClick={() => onOpenLegal("privacidad")}
              className="underline underline-offset-2 text-foreground hover:text-accent transition-colors"
            >
              Política de privacidad
            </button>
            .
          </p>

          <div className="flex gap-3">
            <button
              onClick={essential}
              className="flex-1 py-2.5 border border-foreground/25 rounded-sm font-body text-xs tracking-[0.15em] uppercase text-foreground/70 hover:text-foreground hover:border-foreground/50 transition-all duration-300"
            >
              Solo esenciales
            </button>
            <button
              onClick={accept}
              className="flex-1 py-2.5 bg-foreground text-background rounded-sm font-body text-xs tracking-[0.15em] uppercase hover:opacity-90 transition-opacity duration-300"
            >
              Aceptar todas
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieBanner;
export { COOKIE_KEY };
