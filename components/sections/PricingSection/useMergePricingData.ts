import { useMemo } from 'react';
import { useTranslation } from '@/lib/i18n/context';
import { plans } from '@/data/pricing';

export function useMergePricingData() {
  const { locale } = useTranslation();

  return useMemo(() => {
    return plans.map((plan) => ({
      ...plan,
    }));
  }, [locale]);
}
