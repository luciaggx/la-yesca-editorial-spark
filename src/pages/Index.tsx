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

const readHash = () => decodeURIComponent(window.location.hash.slice(1));

/* Vista "solo carta": la que abre el QR de las mesas (/#carta o /#bodega).
   Sin el resto de la web debajo, para no tener que bajar por toda la página. */
const CartaView = ({ initialTab }: { initialTab: "carta" | "bodega" }) => (
  <>
    <header className="sticky top-0 z-50 bg-background/92 backdrop-blur-md border-b border-foreground/10">
      <div className="flex items-center justify-between h-14 px-5 max-w-2xl mx-auto">
        <span
          className="text-sm tracking-[0.32em] uppercase text-foreground"
          style={{ fontFamily: "'Roboto', sans-serif", fontWeight: 100 }}
        >
          LA YESCA
        </span>
        <a
          href="#"
          onClick={(e) => { e.preventDefault(); window.location.hash = "inicio"; }}
          className="font-body text-[10px] tracking-[0.2em] uppercase text-foreground/60 hover:text-foreground transition-colors"
        >
          Ver la web →
        </a>
      </div>
    </header>
    <main className="pt-8">
      <MenuSection initialTab={initialTab} />
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

  const soloCarta = hash === "carta" || hash === "bodega";

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
        <CartaView initialTab={hash === "bodega" ? "bodega" : "carta"} />
        {legal}
      </div>
    );
  }

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

      {legal}
    </div>
  );
};

export default Index;
