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

  return <RadialOrbitalTimeline timelineData={mergedData} />;
}

export default PillarsOrbital;