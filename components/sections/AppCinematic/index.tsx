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
