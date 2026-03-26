import { Navbar } from "@/components/layout/Navbar";
import { HeroParallax } from "@/components/sections/HeroParallax";
import { IdentificationSection } from "@/components/sections/IdentificationSection";
import { ComparisonTable } from "@/components/sections/ComparisonTable";
import { PillarsOrbital } from "@/components/sections/PillarsOrbital";
import { DenisStory } from "@/components/sections/DenisStory";
import { AppCinematic } from "@/components/sections/AppCinematic";
import { BeforeAfterSection } from "@/components/sections/BeforeAfterSection";
import { LifestyleGallery } from "@/components/sections/LifestyleGallery";
import { PricingSection } from "@/components/sections/PricingSection";
import { FaqCta } from "@/components/sections/FaqCta";

export default function HomePage() {
  return (
    <main>
      <Navbar />
      <HeroParallax />
      <IdentificationSection />
      <ComparisonTable />
      <PillarsOrbital />
      <DenisStory />
      <AppCinematic />
      <BeforeAfterSection />
      <LifestyleGallery />
      <PricingSection />
      <FaqCta />
    </main>
  );
}
