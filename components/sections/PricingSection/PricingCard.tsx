import { useTranslation } from '@/lib/i18n/context';
import { Plan } from '@/data/pricing';
import { Check } from 'lucide-react';

interface PricingCardProps {
  plan: Plan & {
    planName?: string;
    description?: string;
    features?: string[];
    buttonText?: string;
  };
  onCtaClick?: () => void;
}

export function PricingCard({ plan, onCtaClick }: PricingCardProps) {
  const { t } = useTranslation();

  return (
    <div
      className={`relative flex flex-col rounded-3xl border p-8 transition-all duration-500 hover:shadow-2xl ${plan.isPopular
          ? 'border-[#22c55e] bg-green-50/30 dark:bg-[#22c55e]/5 ring-1 ring-[#22c55e]'
          : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0d1117]'
        }`}
    >
      {plan.isPopular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-[#22c55e] px-4 py-1 text-xs font-bold tracking-widest uppercase text-black">
          {t.pricing.popular}
        </div>
      )}

      <div className="mb-8">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
          {plan.planName}
        </h3>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          {plan.description}
        </p>
      </div>

      <div className="mb-8">
        <div className="flex items-baseline gap-1">
          <span className="text-sm font-semibold text-slate-500 dark:text-slate-400">
            {t.pricing.currency}
          </span>
          <span className="text-5xl font-black text-slate-900 dark:text-white tracking-tighter">
            {plan.price}
          </span>
          <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
            {t.pricing.perMonth}
          </span>
        </div>
        {plan.priceAVista && (
          <p className="text-xs text-slate-400 dark:text-slate-500 mt-2 italic">
            {t.pricing.avista}{plan.priceAVista}{t.pricing.avistaSuffix}
          </p>
        )}
      </div>

      <ul className="flex-1 space-y-4 mb-10">
        {plan.features?.map((feature, i) => (
          <li key={i} className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-300">
            <Check className="w-5 h-5 text-[#22c55e] shrink-0 mt-0.5" />
            {feature}
          </li>
        ))}
      </ul>

      <a
        href={plan.whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onCtaClick}
        className={`block w-full rounded-2xl py-4 font-bold transition-all text-center text-sm uppercase tracking-wider ${plan.buttonVariant === 'primary'
            ? 'bg-[#22c55e] text-black hover:bg-[#16a34a] shadow-lg shadow-[#22c55e]/20'
            : 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white hover:bg-slate-200 dark:hover:bg-slate-700'
          }`}
      >
        {plan.buttonText || t.pricing.plans[0].buttonText}
      </a>
    </div>
  );
}
