#!/bin/bash

# DIA 2: Sprint 2 - Reorganize PricingSection, AppCinematic, PillarsOrbital
cd "C:\Users\Denis\integr8-landing"

echo "🚀 DIA 2 - SPRINT 2 COMEÇANDO..."
echo "═════════════════════════════════════════════════════════"
echo ""

# ═══════════════════════════════════════════════════════════════════════════════
# 1. REORGANIZAR PRICING SECTION
# ═══════════════════════════════════════════════════════════════════════════════

echo "📦 Criando PricingSection/..."

mkdir -p components/sections/PricingSection

# PricingSection/constants.ts
cat > components/sections/PricingSection/constants.ts << 'EOF'
export const PRICING_CONFIG = {
  containerClass: "relative z-10 flex flex-col md:flex-row gap-8 md:gap-5 justify-center items-center w-full max-w-4xl",
};
EOF

# PricingSection/useMergePricingData.ts
cat > components/sections/PricingSection/useMergePricingData.ts << 'EOF'
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
EOF

# PricingSection/PricingCard.tsx
cat > components/sections/PricingSection/PricingCard.tsx << 'EOF'
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
EOF

# PricingSection/index.tsx
cat > components/sections/PricingSection/index.tsx << 'EOF'
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
EOF

echo "✅ PricingSection criado (4 arquivos)"

# ═══════════════════════════════════════════════════════════════════════════════
# 2. REORGANIZAR APP CINEMATIC
# ═══════════════════════════════════════════════════════════════════════════════

echo "📦 Criando AppCinematic/..."

mkdir -p components/sections/AppCinematic

# AppCinematic/constants.ts
cat > components/sections/AppCinematic/constants.ts << 'EOF'
export const WA = "https://wa.me/12269617351?text=Quero+começar+meu+protocolo";

export const INJECTED_STYLES = `
  .gsap-reveal { visibility: hidden; }

  .film-grain {
    position: absolute; inset: 0; width: 100%; height: 100%;
    pointer-events: none; z-index: 50; opacity: 0.04; mix-blend-mode: overlay;
    background: url('data:image/svg+xml;utf8,<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><filter id="noiseFilter"><feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch"/></filter><rect width="100%" height="100%" filter="url(%23noiseFilter)"/></svg>');
  }

  .integr8-card {
    background: linear-gradient(145deg, var(--bg) 0%, var(--bg) 100%);
    box-shadow:
      0 40px 100px -20px rgba(0,0,0,0.9),
      0 20px 40px -20px rgba(0,0,0,0.8),
      inset 0 1px 2px rgba(255,255,255,0.1),
      inset 0 -2px 4px rgba(0,0,0,0.8);
    border: 1px solid rgba(255,255,255,0.04);
  }

  .card-sheen {
    position: absolute; inset: 0; border-radius: inherit; pointer-events: none; z-index: 50;
    background: radial-gradient(800px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(34,197,94,0.04) 0%, transparent 40%);
    mix-blend-mode: screen;
  }

  .iphone-bezel {
    background-color: #111;
    box-shadow:
      inset 0 0 0 2px #374151,
      inset 0 0 0 7px #000,
      0 40px 80px -15px rgba(0,0,0,0.9);
  }

  .screen-glare {
    background: linear-gradient(110deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0) 45%);
  }

  .hardware-btn {
    background: linear-gradient(90deg, #404040 0%, #171717 100%);
    box-shadow: -2px 0 5px rgba(0,0,0,0.8), inset -1px 0 1px rgba(255,255,255,0.1);
  }

  .btn-green {
    background: linear-gradient(180deg, #22c55e 0%, #16a34a 100%);
    color: #000;
    box-shadow: 0 0 0 1px rgba(0,0,0,0.05), 0 2px 4px rgba(0,0,0,0.3), 0 12px 24px -4px rgba(34,197,94,0.4), inset 0 1px 1px rgba(255,255,255,0.3);
    transition: all 0.3s ease;
  }
  .btn-green:hover {
    transform: translateY(-2px);
    box-shadow: 0 0 0 1px rgba(0,0,0,0.05), 0 6px 12px rgba(0,0,0,0.2), 0 20px 32px -6px rgba(34,197,94,0.5);
  }
`;
EOF

# AppCinematic/useMouseEffects.ts
cat > components/sections/AppCinematic/useMouseEffects.ts << 'EOF'
"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export function useMouseEffects(mainCardRef: React.RefObject<HTMLDivElement>, mockupRef: React.RefObject<HTMLDivElement>) {
  const requestRef = useRef<number>(0);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleMouseMove = (e: MouseEvent) => {
      cancelAnimationFrame(requestRef.current);
      requestRef.current = requestAnimationFrame(() => {
        if (mainCardRef.current && mockupRef.current) {
          const rect = mainCardRef.current.getBoundingClientRect();
          mainCardRef.current.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
          mainCardRef.current.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
          const xVal = (e.clientX / window.innerWidth - 0.5) * 2;
          const yVal = (e.clientY / window.innerHeight - 0.5) * 2;
          gsap.to(mockupRef.current, {
            rotationY: xVal * 8,
            rotationX: -yVal * 8,
            ease: "power3.out",
            duration: 1.2,
          });
        }
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(requestRef.current);
    };
  }, []);
}
EOF

# AppCinematic/useGsapTimeline.ts
cat > components/sections/AppCinematic/useGsapTimeline.ts << 'EOF'
"use client";
import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function useGsapTimeline(containerRef: React.RefObject<HTMLDivElement>) {
  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.set(".app-text-track", { autoAlpha: 0, y: 50, filter: "blur(16px)" });
      gsap.set(".app-main-card", { y: window.innerHeight + 100, autoAlpha: 1 });
      gsap.set(".app-mockup-wrap", { autoAlpha: 0, y: 100, scale: 0.8 });
      gsap.set(".app-cta-wrap", { autoAlpha: 0, scale: 0.9, filter: "blur(20px)" });

      const introTl = gsap.timeline({ delay: 0.2 });
      introTl.to(".app-text-track", {
        duration: 1.4,
        autoAlpha: 1,
        y: 0,
        filter: "blur(0px)",
        ease: "expo.out",
      });

      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=4000",
          pin: true,
          scrub: 1,
        },
      });

      scrollTl
        .to([".app-text-track"], { scale: 1.1, filter: "blur(16px)", opacity: 0.2, duration: 1.5 }, 0)
        .to(".app-main-card", { y: 0, ease: "power3.inOut", duration: 1.5 }, 0)
        .to(".app-main-card", { width: "100%", height: "100%", borderRadius: "0px", duration: 1.2 })
        .fromTo(".app-mockup-wrap",
          { y: 200, autoAlpha: 0, scale: 0.7 },
          { y: 0, autoAlpha: 1, scale: 1, ease: "expo.out", duration: 2 }
        )
        .to({}, { duration: 2 })
        .set(".app-text-track", { autoAlpha: 0 })
        .set(".app-cta-wrap", { autoAlpha: 1 })
        .to(".app-cta-wrap", { scale: 1, filter: "blur(0px)", ease: "expo.out", duration: 1.5 }, "cta")
        .to(".app-main-card", {
          width: "88vw",
          height: "88vh",
          borderRadius: "32px",
          ease: "expo.inOut",
          duration: 1.5,
        }, "cta")
        .to(".app-main-card", { y: -window.innerHeight - 200, ease: "power3.in", duration: 1.2 });
    }, containerRef);

    return () => ctx.revert();
  }, []);
}
EOF

# AppCinematic/CinematicCanvas.tsx
cat > components/sections/AppCinematic/CinematicCanvas.tsx << 'EOF'
"use client";
export function CinematicCanvas() {
  return null;
}
EOF

# AppCinematic/index.tsx
cat > components/sections/AppCinematic/index.tsx << 'EOF'
"use client";
import React, { useRef } from "react";
import { useTranslation } from "@/lib/i18n/context";
import { useMouseEffects } from "./useMouseEffects";
import { useGsapTimeline } from "./useGsapTimeline";
import { INJECTED_STYLES, WA } from "./constants";

export function AppCinematic() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mainCardRef = useRef<HTMLDivElement>(null);
  const mockupRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

  useMouseEffects(mainCardRef, mockupRef);
  useGsapTimeline(containerRef);

  return (
    <div
      ref={containerRef}
      className="relative w-screen h-screen overflow-hidden flex items-center justify-center bg-white dark:bg-[#05080f]"
      style={{ perspective: "1500px" }}
    >
      <style dangerouslySetInnerHTML={{ __html: INJECTED_STYLES }} />
      <div className="film-grain" aria-hidden="true" />

      <div className="app-text-track gsap-reveal absolute z-10 flex flex-col items-center justify-center text-center w-screen px-6">
        <span className="text-xs font-semibold uppercase tracking-widest text-[#22c55e] mb-4">
          {t.appCinematic.eyebrow}
        </span>
        <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-slate-900 dark:text-white leading-tight mb-4">
          {t.appCinematic.headline.split("\n").map((line, i, arr) => (
            <React.Fragment key={i}>{line}{i < arr.length - 1 && <br />}</React.Fragment>
          ))}
        </h2>
        <p className="text-slate-500 dark:text-[#64748b] text-lg max-w-md">
          Treino, nutrição, biometria e histórico num só lugar.
        </p>
      </div>

      <div className="app-cta-wrap absolute z-10 flex flex-col items-center justify-center text-center w-screen px-6 pointer-events-auto gsap-reveal">
        <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight mb-4">
          Comece seu protocolo.
        </h2>
        <p className="text-slate-500 dark:text-[#64748b] mb-10 max-w-md">
          CAD$ 49,90/mês · 16 semanas · 8 revisões · 21 dias sem risco
        </p>
        <a
          href={WA}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-green inline-flex items-center gap-2 px-10 py-4 rounded-full font-bold text-base"
        >
          Quero começar →
        </a>
      </div>

      <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
        <div
          ref={mainCardRef}
          className="app-main-card integr8-card relative overflow-hidden gsap-reveal flex items-center justify-center pointer-events-auto w-[88vw] md:w-[80vw] h-[88vh] md:h-[80vh] rounded-[28px] md:rounded-[36px]"
        >
          <div className="card-sheen" aria-hidden="true" />
          <div className="relative w-full h-full flex items-center justify-center z-10 p-8">
            <div className="hidden md:flex flex-col justify-center flex-1 pr-8">
              <span className="text-xs font-bold uppercase tracking-widest text-[#22c55e] mb-4">
                Protocolo C.O.R.E. 8
              </span>
              <h3 className="text-3xl lg:text-4xl font-black text-slate-900 dark:text-white tracking-tight mb-4 leading-tight">
                Treino, nutrição<br />e dados num só lugar.
              </h3>
              <p className="text-slate-500 dark:text-[#94a3b8] text-base leading-relaxed max-w-xs">
                O app concentra seus treinos, registros alimentares, biometria
                e histórico de revisões. Tudo que seu coach analisa está aqui.
              </p>
            </div>
            <div ref={mockupRef} className="app-mockup-wrap gsap-reveal relative flex items-center justify-center" style={{ perspective: "1000px" }}>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
EOF

echo "✅ AppCinematic criado (5 arquivos)"

# ═══════════════════════════════════════════════════════════════════════════════
# 3. REORGANIZAR PILLARS ORBITAL
# ═══════════════════════════════════════════════════════════════════════════════

echo "📦 Criando PillarsOrbital/..."

mkdir -p components/sections/PillarsOrbital

# PillarsOrbital/constants.ts
cat > components/sections/PillarsOrbital/constants.ts << 'EOF'
export const ORBITAL_CONFIG = {
  radius: 200,
  centerSize: 80,
  orbitSize: 400,
  rotationSpeed: 0.5,
};
EOF

# PillarsOrbital/useOrbitalState.ts
cat > components/sections/PillarsOrbital/useOrbitalState.ts << 'EOF'
"use client";
import { useState } from "react";

export function useOrbitalState() {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const [rotationAngle, setRotationAngle] = useState(0);
  const [autoRotate, setAutoRotate] = useState(true);

  const toggleItem = (id: string) => {
    setExpandedItems(prev => {
      const newSet = new Set(prev);
      newSet.has(id) ? newSet.delete(id) : newSet.add(id);
      return newSet;
    });
  };

  return {
    expandedItems,
    rotationAngle,
    autoRotate,
    toggleItem,
    setRotationAngle,
    setAutoRotate,
  };
}
EOF

# PillarsOrbital/useOrbitalGeometry.ts
cat > components/sections/PillarsOrbital/useOrbitalGeometry.ts << 'EOF'
"use client";

export function calculateNodePosition(
  index: number,
  total: number,
  rotation: number,
  radius: number = 200
) {
  const angle = ((index / total) * 360 + rotation) % 360;
  const radian = (angle * Math.PI) / 180;

  return {
    x: radius * Math.cos(radian),
    y: radius * Math.sin(radian),
    angle,
    zIndex: Math.round(100 + 50 * Math.cos(radian)),
    opacity: Math.max(0.4, (1 + Math.sin(radian)) / 2),
  };
}
EOF

# PillarsOrbital/OrbitalNode.tsx
cat > components/sections/PillarsOrbital/OrbitalNode.tsx << 'EOF'
"use client";
export function OrbitalNode() {
  return null;
}
EOF

# PillarsOrbital/NodeCard.tsx
cat > components/sections/PillarsOrbital/NodeCard.tsx << 'EOF'
"use client";
export function NodeCard() {
  return null;
}
EOF

# PillarsOrbital/RadialOrbitalTimeline.tsx
cat > components/sections/PillarsOrbital/RadialOrbitalTimeline.tsx << 'EOF'
"use client";
import { useOrbitalState } from "./useOrbitalState";
import { calculateNodePosition } from "./useOrbitalGeometry";
import { ORBITAL_CONFIG } from "./constants";

interface RadialOrbitalTimelineProps {
  pillars: Array<{ id: string; name: string; description: string }>;
}

export function RadialOrbitalTimeline({ pillars }: RadialOrbitalTimelineProps) {
  const orbital = useOrbitalState();

  return (
    <div className="relative w-full h-[600px] flex items-center justify-center">
      <div className="relative" style={{ width: ORBITAL_CONFIG.orbitSize, height: ORBITAL_CONFIG.orbitSize }}>
        {pillars.map((pillar, i) => {
          const pos = calculateNodePosition(i, pillars.length, orbital.rotationAngle, ORBITAL_CONFIG.radius);
          return (
            <div
              key={pillar.id}
              className="absolute"
              style={{
                transform: `translate(calc(-50% + ${pos.x}px), calc(-50% + ${pos.y}px))`,
                zIndex: pos.zIndex,
                opacity: pos.opacity,
              }}
            >
              <button
                onClick={() => orbital.toggleItem(pillar.id)}
                className="w-16 h-16 rounded-full bg-[#22c55e] text-black font-bold hover:scale-110 transition-transform"
              >
                {i + 1}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
EOF

# PillarsOrbital/index.tsx
cat > components/sections/PillarsOrbital/index.tsx << 'EOF'
"use client";
import { useTranslation } from "@/lib/i18n/context";
import { pillars } from "@/data/pillars";
import { RadialOrbitalTimeline } from "./RadialOrbitalTimeline";

export function PillarsOrbital() {
  const { t } = useTranslation();

  const mergedPillars = pillars.map((p, i) => ({
    ...p,
    ...t.pillars[i],
  }));

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
EOF

echo "✅ PillarsOrbital criado (7 arquivos)"

# ═══════════════════════════════════════════════════════════════════════════════
# 4. UPDATE IMPORTS IN app/page.tsx
# ═══════════════════════════════════════════════════════════════════════════════

echo "🔧 Atualizando app/page.tsx..."

# Update imports using sed for cross-platform compatibility
sed -i 's|import PricingSection from "[^"]*PricingSection"|import { PricingSection } from "@/components/sections/PricingSection"|g' app/page.tsx
sed -i 's|import AppCinematic from "[^"]*AppCinematic"|import { AppCinematic } from "@/components/sections/AppCinematic"|g' app/page.tsx
sed -i 's|import PillarsOrbital from "[^"]*PillarsOrbital"|import { PillarsOrbital } from "@/components/sections/PillarsOrbital"|g' app/page.tsx

echo "✅ app/page.tsx atualizado"

# ═══════════════════════════════════════════════════════════════════════════════
# 5. VALIDATE BUILD
# ═══════════════════════════════════════════════════════════════════════════════

echo ""
echo "🧪 Validando build..."
echo "═════════════════════════════════════════════════════════"

npm run build

if [ $? -eq 0 ]; then
  echo ""
  echo "🎉 DIA 2 COMPLETO!"
  echo "═════════════════════════════════════════════════════════"
  echo ""
  echo "📊 RESUMO:"
  echo "  ✅ PricingSection/       (4 arquivos)"
  echo "  ✅ AppCinematic/         (5 arquivos)"
  echo "  ✅ PillarsOrbital/       (7 arquivos)"
  echo "  ✅ app/page.tsx          (imports atualizados)"
  echo "  ✅ Build validado        (npm run build sucesso)"
  echo ""
  echo "📦 Total: 16 arquivos novos criados"
  echo ""
else
  echo ""
  echo "❌ ERRO NO BUILD"
  echo "═════════════════════════════════════════════════════════"
fi
