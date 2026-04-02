'use client';

import { Plan } from '@/data/pricing';

interface PricingCardProps {
  plan: Plan;
  onCtaClick?: () => void;
}

export function PricingCard({ plan, onCtaClick }: PricingCardProps) {
  return (
    <div
      className={`relative rounded-2xl border border-gray-200 p-8 transition-all duration-300 hover:shadow-lg ${
        plan.isPopular ? 'border-green-500 bg-green-50/50 ring-2 ring-green-500' : 'bg-white'
      }`}
    >
      {plan.isPopular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-green-500 px-4 py-1 text-sm font-semibold text-white">
          Popular
        </div>
      )}

      <div className="mt-6 mb-6">
        <span className="text-4xl font-bold">{plan.price}</span>
        <span className="text-gray-600">/mês</span>
        {plan.priceAVista && (
          <p className="text-sm text-gray-600 mt-2">R$ {plan.priceAVista} à vista</p>
        )}
      </div>

      <a
        href={plan.whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        className={`block w-full rounded-lg py-2 font-semibold transition-colors text-center ${
          plan.buttonVariant === 'primary'
            ? 'bg-green-500 text-white hover:bg-green-600'
            : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
        }`}
      >
        Começar
      </a>
    </div>
  );
}
