import { plans } from "@/data/pricing";
import { useTranslation } from "@/lib/i18n/context";

export function useMergePricingData() {
  const { t } = useTranslation();

  return plans.map((p, i) => ({
    ...p,
    ...t.pricing.plans[i],
    perMonth: t.pricing.perMonth,
    avista: t.pricing.avista,
    avistaSuffix: t.pricing.avistaSuffix,
    popular: t.pricing.popular,
    currency: t.pricing.currency,
  }));
}
