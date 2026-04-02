"use client";

import { Suspense } from "react";
import dynamicImport from "next/dynamic";
import { Navbar } from "@/components/layout/Navbar";
import { IdentificationSection } from "@/components/sections/IdentificationSection";
import { ComparisonTable } from "@/components/sections/ComparisonTable";
import { DenisStory } from "@/components/sections/DenisStory";
import { BeforeAfterSection } from "@/components/sections/BeforeAfterSection";

const HeroParallax = dynamicImport(() => import("@/components/sections/HeroParallax").then(m => ({ default: m.HeroParallax })), { ssr: false });
const PillarsOrbital = dynamicImport(() => import("@/components/sections/PillarsOrbital").then(m => ({ default: m.PillarsOrbital })), { ssr: false });
const AppCinematic = dynamicImport(() => import("@/components/sections/AppCinematic").then(m => ({ default: m.AppCinematic })), { ssr: false });
const LifestyleGallery = dynamicImport(() => import("@/components/sections/LifestyleGallery").then(m => ({ default: m.LifestyleGallery })), { ssr: false });
const PricingSection = dynamicImport(() => import("@/components/sections/PricingSection").then(m => ({ default: m.PricingSection })), { ssr: false });
const FaqCta = dynamicImport(() => import("@/components/sections/FaqCta").then(m => ({ default: m.FaqCta })), { ssr: false });

export default function HomePage() {
  return (
    <main>
      <Navbar />
      <Suspense fallback={<div className="h-screen" />}>
        <HeroParallax />
      </Suspense>
      <IdentificationSection />
      <ComparisonTable />
      <Suspense fallback={<div className="h-[600px]" />}>
        <PillarsOrbital />
      </Suspense>
      <DenisStory />
      <Suspense fallback={<div className="h-screen" />}>
        <AppCinematic />
      </Suspense>
      <BeforeAfterSection />
      <Suspense fallback={<div className="h-screen" />}>
        <LifestyleGallery />
      </Suspense>
      <Suspense fallback={<div className="h-96" />}>
        <PricingSection />
      </Suspense>
      <Suspense fallback={<div className="h-screen" />}>
        <FaqCta />
      </Suspense>
    </main>
  );
}
