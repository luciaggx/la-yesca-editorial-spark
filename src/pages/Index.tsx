import { useState, useEffect, type JSX } from "react";
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

/* Cada sección es una pantalla propia: el menú lateral elige cuál se ve.
   /#carta es también la que abre el QR de las mesas. */
const secciones: Record<string, () => JSX.Element> = {
  "que-es":        () => <QueEsSection />,
  "quienes-somos": () => <QuienesSomosSection />,
  carta:           () => <MenuSection />,
  eventos:         () => <EventosSection />,
  regala:          () => <GiftExperienceSection />,
  boutique:        () => <BoutiqueSection />,
  bodega:          () => <BodegaSection />,
  reservas:        () => <ReservationSection />,
};

const Index = () => {
  const [legalOpen, setLegalOpen] = useState(false);
  const [legalType, setLegalType] = useState<"privacidad" | "cookies" | null>(null);
  const [hash, setHash] = useState(readHash);

  useEffect(() => {
    const onHash = () => setHash(readHash());
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  /* Cada pantalla empieza arriba */
  useEffect(() => {
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
  }, [hash]);

  const openLegal = (type: "privacidad" | "cookies") => {
    setLegalType(type);
    setLegalOpen(true);
  };

  const seccion = hash === "contacto"
    ? <FooterSection onOpenLegal={openLegal} />
    : secciones[hash]?.();

  return (
    <CartProvider>
    <MotionConfig reducedMotion="user">
    <div className="bg-background text-foreground overflow-x-clip">
      <Navbar />

      {seccion ? (
        /* La sección llena la pantalla bajo la barra, aunque sea corta */
        <main key={hash} className="pt-16 min-h-svh flex flex-col [&>*]:flex-1">
          {seccion}
        </main>
      ) : (
        /* Portada: una sola pantalla, sin scroll */
        <HeroSection />
      )}

      <CartSheet />
      <CookieBanner onOpenLegal={openLegal} />
      <LegalModal
        open={legalOpen}
        onClose={() => setLegalOpen(false)}
        type={legalType}
      />
    </div>
    </MotionConfig>
    </CartProvider>
  );
};

export default Index;
