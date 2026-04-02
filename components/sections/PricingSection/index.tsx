"use client";
import React from "react";
import { useTheme } from "next-themes";
import { useTranslation } from "@/lib/i18n/context";
import { ShaderCanvas } from "@/components/ui/ShaderCanvas";
import { useMergePricingData } from "./useMergePricingData";
import { PricingCard } from "./PricingCard";
import { PRICING_CONFIG } from "./constants";

export function PricingSection() {
  const { t } = useTranslation();
  const { resolvedTheme } = useTheme();
  const mergedPlans = useMergePricingData();

  return (
    <section className="relative min-h-screen w-full overflow-hidden flex flex-col items-center justify-center px-4 py-16 bg-white dark:bg-[#05080f]">
      <ShaderCanvas theme={resolvedTheme} />
      <div className="relative z-10 w-full max-w-5xl mx-auto text-center mb-14">
        <span className="text-xs font-semibold uppercase tracking-widest text-[#22c55e]">
          {t.pricing.eyebrow}
        </span>
        <h2 className="text-4xl md:text-6xl font-extralight leading-tight tracking-tight text-slate-900 dark:text-white mt-3">
          {t.pricing.headline.split(" · ")[0]} <span className="text-[#22c55e]">· {t.pricing.headline.split(" · ")[1]}</span>
        </h2>
      </div>
      <div className={PRICING_CONFIG.containerClass}>
        {mergedPlans.map((plan) => (
          <PricingCard key={plan.planName} {...plan} />
        ))}
      </div>
      <p className="relative z-10 mt-10 text-xs text-white/30 text-center">
        Grupos de 3 ou mais: CAD$ 45,90/mês por pessoa · <a href="https://wa.me/12269617351" target="_blank" rel="noopener noreferrer" className="text-[#22c55e] underline">Consultar</a>
      </p>
    </section>
  );
}
