import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import { MushroomDivider } from "@/components/FloralDivider";
import MenuSection from "@/components/MenuSection";
import FloralDivider from "@/components/FloralDivider";
import GiftExperienceSection from "@/components/GiftExperienceSection";
import ReservationSection from "@/components/ReservationSection";
import FooterSection from "@/components/FooterSection";

const Index = () => {
  return (
    <main className="bg-background text-foreground overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <MushroomDivider />
      <MenuSection />
      <FloralDivider />
      <GiftExperienceSection />
      <ReservationSection />
      <FooterSection />
    </main>
  );
};

export default Index;
