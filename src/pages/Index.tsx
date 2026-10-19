import { useState, useEffect } from "react";

import Navbar               from "@/components/Navbar";
import HeroSection          from "@/components/HeroSection";
import ScrollingStrip       from "@/components/ScrollingStrip";
import FloralDivider        from "@/components/FloralDivider";
import QueEsSection         from "@/components/QueEsSection";
import QuienesSomosSection  from "@/components/QuienesSomosSection";
import MenuSection          from "@/components/MenuSection";
import EventosSection       from "@/components/EventosSection";
import GiftExperienceSection from "@/components/GiftExperienceSection";
import BoutiqueSection      from "@/components/BoutiqueSection";
import ReservationSection   from "@/components/ReservationSection";
import FooterSection        from "@/components/FooterSection";
import CookieBanner         from "@/components/CookieBanner";
import LegalModal           from "@/components/LegalModal";

const Index = () => {
  const [legalOpen, setLegalOpen] = useState(false);
  const [legalType, setLegalType] = useState<"privacidad" | "cookies" | null>(null);

  /* Si la URL trae #seccion (p. ej. el QR de la carta: /#carta), baja hasta ella al cargar */
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1));
    if (!id) return;
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";

    /* Imágenes y animaciones cambian la altura de la página mientras cargan,
       así que se recoloca varias veces hasta que todo está en su sitio */
    const goTo = () => document.getElementById(id)?.scrollIntoView({ behavior: "auto", block: "start" });
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
  }, []);

  const openLegal = (type: "privacidad" | "cookies") => {
    setLegalType(type);
    setLegalOpen(true);
  };

  return (
    <div className="bg-background text-foreground overflow-x-hidden">
      <Navbar />

      <HeroSection />
      <ScrollingStrip />
      <FloralDivider />

      <QueEsSection />
      <FloralDivider />

      <QuienesSomosSection />
      <FloralDivider />

      <MenuSection />
      <FloralDivider />

      <EventosSection />
      <FloralDivider />

      <GiftExperienceSection />
      <FloralDivider />

      <BoutiqueSection />
      <FloralDivider />

      <ReservationSection />
      <FloralDivider />

      <FooterSection onOpenLegal={openLegal} />

      <CookieBanner onOpenLegal={openLegal} />
      <LegalModal
        open={legalOpen}
        onClose={() => setLegalOpen(false)}
        type={legalType}
      />
    </div>
  );
};

export default Index;
