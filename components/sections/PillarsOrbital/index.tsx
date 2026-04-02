"use client";
import { useTranslation } from "@/lib/i18n/context";
import { pillars } from "@/data/pillars";
import { RadialOrbitalTimeline } from "./RadialOrbitalTimeline";

export function PillarsOrbital() {
  const { t } = useTranslation();

  const mergedPillars = pillars.map((p, i) => {
    const translated = t.pillars.items[i];
    return {
      id: String(p.id),
      name: translated.title,
      description: translated.content,
    };
  });

  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center px-4 py-16 bg-white dark:bg-[#05080f]">
      <div className="relative z-10 w-full max-w-5xl mx-auto text-center mb-14">
        <span className="text-xs font-semibold uppercase tracking-widest text-[#22c55e]">
          {t.pillars.eyebrow}
        </span>
        <h2 className="text-4xl md:text-6xl font-extralight leading-tight tracking-tight text-slate-900 dark:text-white mt-3">
          {t.pillars.headline}
        </h2>
      </div>
      <RadialOrbitalTimeline pillars={mergedPillars} />
    </section>
  );
}
