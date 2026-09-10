import { useState } from "react";

import Navbar               from "@/components/Navbar";
import HeroSection          from "@/components/HeroSection";
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

  const openLegal = (type: "privacidad" | "cookies") => {
    setLegalType(type);
    setLegalOpen(true);
  };

  return (
    <div className="bg-background text-foreground overflow-x-hidden">
      <Navbar />

      <HeroSection />
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
