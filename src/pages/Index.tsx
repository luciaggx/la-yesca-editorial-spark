import { useState, useEffect } from "react";
import { MotionConfig } from "framer-motion";

import Navbar               from "@/components/Navbar";
import HeroSection          from "@/components/HeroSection";
import QueEsSection         from "@/components/QueEsSection";
import QuienesSomosSection  from "@/components/QuienesSomosSection";
import MenuSection          from "@/components/MenuSection";
import EventosSection       from "@/components/EventosSection";
import GiftExperienceSection from "@/components/GiftExperienceSection";
import BoutiqueSection      from "@/components/BoutiqueSection";
import BodegaSection        from "@/components/BodegaSection";
import ReservationSection   from "@/components/ReservationSection";
import FooterSection        from "@/components/FooterSection";
import CookieBanner         from "@/components/CookieBanner";
import LegalModal           from "@/components/LegalModal";
import CartSheet            from "@/components/CartSheet";
import { CartProvider }     from "@/hooks/use-cart";

const readHash = () => decodeURIComponent(window.location.hash.slice(1));

/* Vista "solo carta": la que abre el QR de las mesas (/#carta).
   Sin el resto de la web debajo, para no tener que bajar por toda la página. */
const CartaView = () => (
  <>
    <header className="sticky top-0 z-50 bg-background">
      <div className="flex items-center justify-between h-14 px-5 max-w-2xl mx-auto">
        <span
          className="wordmark text-sm text-foreground"
        >
          LA YESCA
        </span>
        <a
          href="#"
          onClick={(e) => { e.preventDefault(); window.location.hash = "inicio"; }}
          className="enlace font-body text-base text-foreground"
        >
          Ver la web →
        </a>
      </div>
    </header>
    <main>
      <MenuSection />
    </main>
  </>
);

const Index = () => {
  const [legalOpen, setLegalOpen] = useState(false);
  const [legalType, setLegalType] = useState<"privacidad" | "cookies" | null>(null);
  const [hash, setHash] = useState(readHash);

  useEffect(() => {
    const onHash = () => setHash(readHash());
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const soloCarta = hash === "carta";

  /* Si la URL trae #seccion, baja hasta ella al cargar */
  useEffect(() => {
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    if (soloCarta || !hash || hash === "inicio") {
      window.scrollTo(0, 0);
      return;
    }

    /* Imágenes y animaciones cambian la altura de la página mientras cargan,
       así que se recoloca varias veces hasta que todo está en su sitio */
    const goTo = () => document.getElementById(hash)?.scrollIntoView({ behavior: "auto", block: "start" });
    const timers = [100, 600, 1200, 2000].map(ms => setTimeout(goTo, ms));
    window.addEventListener("load", goTo);

    /* Si el usuario empieza a desplazarse, deja de recolocar */
    const stop = () => timers.forEach(clearTimeout);
    window.addEventListener("wheel", stop, { once: true, passive: true });
    window.addEventListener("touchstart", stop, { once: true, passive: true });

    return () => {
      stop();
      window.removeEventListener("load", goTo);
      window.removeEventListener("wheel", stop);
      window.removeEventListener("touchstart", stop);
    };
  }, [hash, soloCarta]);

  const openLegal = (type: "privacidad" | "cookies") => {
    setLegalType(type);
    setLegalOpen(true);
  };

  const legal = (
    <>
      <CookieBanner onOpenLegal={openLegal} />
      <LegalModal
        open={legalOpen}
        onClose={() => setLegalOpen(false)}
        type={legalType}
      />
    </>
  );

  if (soloCarta) {
    return (
      <div className="bg-background text-foreground min-h-screen overflow-x-hidden">
        <CartaView />
        {legal}
      </div>
    );
  }

  return (
    <CartProvider>
    <MotionConfig reducedMotion="user">
    <div className="bg-background text-foreground overflow-x-clip">
      <Navbar />

      <HeroSection />
      <QueEsSection />
      <QuienesSomosSection />
      <MenuSection />
      <EventosSection />
      <GiftExperienceSection />
      <BoutiqueSection />
      <BodegaSection />
      <ReservationSection />
      <FooterSection onOpenLegal={openLegal} />

      <CartSheet />
      {legal}
    </div>
    </MotionConfig>
    </CartProvider>
  );
};

export default Index;
