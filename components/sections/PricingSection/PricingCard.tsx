"use client";
import { RippleButton } from "@/components/ui/ripple-button";
import { CheckIcon } from "@/components/ui/CheckIcon";
import { cn } from "@/lib/utils";

interface MergedPlan {
  price: string;
  priceAVista?: string;
  isPopular?: boolean;
  buttonVariant?: "primary" | "secondary";
  whatsappLink: string;
  planName: string;
  description: string;
  features: string[];
  buttonText: string;
  perMonth: string;
  avista: string;
  avistaSuffix: string;
  popular: string;
  currency: string;
}

export function PricingCard({
  planName,
  description,
  price,
  priceAVista,
  features,
  buttonText,
  isPopular = false,
  buttonVariant = "primary",
  whatsappLink,
  perMonth,
  avista,
  avistaSuffix,
  popular,
  currency,
}: MergedPlan) {
  const cardClass = cn(
    "backdrop-blur-[14px] rounded-2xl shadow-xl flex-1 max-w-xs px-7 py-8 flex flex-col transition-all duration-300 relative",
    "bg-gradient-to-br from-white/5 to-white/[0.02] border border-slate-200 dark:border-white/10",
    isPopular &&
      "scale-105 ring-2 ring-[#22c55e]/30 from-white/10 to-white/5 border-[#22c55e]/30 shadow-2xl"
  );

  const btnClass = cn(
    "mt-auto w-full py-3 rounded-xl font-semibold text-sm transition-all",
    buttonVariant === "primary"
      ? "bg-[#22c55e] hover:bg-[#16a34a] text-black"
      : "bg-white/10 hover:bg-white/20 text-slate-900 dark:text-white border border-slate-200 dark:border-white/20"
  );

  return (
    <div className={cardClass}>
      {isPopular && (
        <div className="absolute -top-4 right-4 px-3 py-1 text-[11px] font-bold rounded-full bg-[#22c55e] text-black">
          {popular}
        </div>
      )}
      <div className="mb-3">
        <h2 className="text-4xl font-extralight tracking-tight text-slate-900 dark:text-white">{planName}</h2>
        <p className="text-sm text-white/60 mt-1">{description}</p>
      </div>
      <div className="my-5 flex items-baseline gap-2">
        <span className="text-4xl font-extralight text-slate-900 dark:text-white">{currency} {price}</span>
        <span className="text-xs text-white/50">{perMonth}</span>
      </div>
      {priceAVista && (
        <p className="text-xs text-white/40 mb-3">
          {avista} {priceAVista}{avistaSuffix}
        </p>
      )}
      <div className="w-full mb-4 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
      <ul className="flex flex-col gap-2 text-xs text-white/80 mb-6">
        {features.map((feature, i) => (
          <li key={i} className="flex items-center gap-2">
            <CheckIcon className="text-[#22c55e] w-3 h-3 flex-shrink-0" />
            {feature}
          </li>
        ))}
      </ul>
      <RippleButton
        className={btnClass}
        rippleColor={
          buttonVariant === "primary"
            ? "rgba(0,0,0,0.2)"
            : "rgba(255,255,255,0.1)"
        }
        onClick={() => window.open(whatsappLink, "_blank")}
      >
        {buttonText}
      </RippleButton>
    </div>
  );
}
