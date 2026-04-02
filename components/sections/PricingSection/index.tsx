'use client';

import { useState } from 'react';
import { PricingCard } from './PricingCard';
import { PricingHeader } from './PricingHeader';
import { useMergePricingData } from './useMergePricingData';
import { PRICING_CONFIG } from './constants';

import { useTranslation } from '@/lib/i18n/context';

export function PricingSection() {
  const { t } = useTranslation();
  const plans = useMergePricingData();
  const [selectedPlan, setSelectedPlan] = useState<number | null>(null);

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white dark:bg-[#05080f]">
      <PricingHeader
        title={t.pricing.headline}
        subtitle={t.pricing.eyebrow}
      />

      <div className={`grid ${PRICING_CONFIG.grid.cols} md:grid-cols-2 lg:grid-cols-3 ${PRICING_CONFIG.spacing.gap} auto-rows-max`}>
        {plans.map((plan, idx) => (
          <PricingCard
            key={idx}
            plan={plan}
            onCtaClick={() => setSelectedPlan(idx)}
          />
        ))}
      </div>
    </section>
  );
}

export default PricingSection;
