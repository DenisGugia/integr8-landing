'use client';

import { pillars } from '@/data/pillars';
import { useTranslation } from '@/lib/i18n/context';
import { RadialOrbitalTimeline } from './RadialOrbitalTimeline';
import type { MergedPillar } from './useOrbitalState';

export function PillarsOrbital() {
  const { t } = useTranslation();

  const mergedData: MergedPillar[] = pillars.map((pillar, index) => ({
    ...pillar,
    title: t.pillars.items[index]?.title || '',
    shortTitle: t.pillars.items[index]?.shortTitle || '',
    date: t.pillars.items[index]?.date || '',
    content: t.pillars.items[index]?.content || '',
  }));

  return (
    <section className="bg-white dark:bg-[#05080f]">
      <div className="max-w-6xl mx-auto px-6 pt-24 text-center">
        <span className="text-xs font-semibold uppercase tracking-widest text-[#22c55e] mb-4 block">
          {t.pillars.eyebrow}
        </span>
        <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-slate-900 dark:text-white mb-6">
          {t.pillars.headline}
        </h2>
      </div>
      <RadialOrbitalTimeline timelineData={mergedData} />
    </section>
  );
}

export default PillarsOrbital;