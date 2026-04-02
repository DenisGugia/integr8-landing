"use client";

import { WA_ROUTES } from "@/data/constants";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslation } from "@/lib/i18n/context";
import dynamicImport from "next/dynamic";

const Player = dynamicImport(() => import("@remotion/player").then(m => ({ default: m.Player })), { ssr: false });
const AppShowcase = dynamicImport(() => import("@/components/remotion/AppShowcase").then(m => ({ default: m.AppShowcase })), { ssr: false });

const WA = "{WA_ROUTES.contact}?text=Quero+come%C3%A7ar+meu+protocolo";

const INJECTED_STYLES = `
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

export function AppCinematic() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mainCardRef = useRef<HTMLDivElement>(null);
  const mockupRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number>(0);
  const { t } = useTranslation();

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

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

  return (
    <div
      ref={containerRef}
      className="relative w-screen h-screen overflow-hidden flex items-center justify-center bg-white dark:bg-[#05080f]"
      style={{ perspective: "1500px" }}
    >
      <style dangerouslySetInnerHTML={{ __html: INJECTED_STYLES }} />
      <div className="film-grain" aria-hidden="true" />

      {/* Background text */}
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

      {/* CTA layer */}
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

      {/* The card */}
      <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
        <div
          ref={mainCardRef}
          className="app-main-card integr8-card relative overflow-hidden gsap-reveal flex items-center justify-center pointer-events-auto w-[88vw] md:w-[80vw] h-[88vh] md:h-[80vh] rounded-[28px] md:rounded-[36px]"
        >
          <div className="card-sheen" aria-hidden="true" />

          <div className="relative w-full h-full flex items-center justify-center z-10 p-8">
            {/* Left: text */}
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

            {/* Center: phone mockup */}
            <div
              ref={mockupRef}
              className="app-mockup-wrap gsap-reveal relative flex items-center justify-center"
              style={{ perspective: "1000px" }}
            >
              <div className="relative w-[260px] h-[540px] rounded-[2.8rem] iphone-bezel flex flex-col">
                {/* Hardware buttons */}
                <div className="absolute top-[110px] -left-[3px] w-[3px] h-[22px] hardware-btn rounded-l-md z-0" />
                <div className="absolute top-[148px] -left-[3px] w-[3px] h-[42px] hardware-btn rounded-l-md z-0" />
                <div className="absolute top-[200px] -left-[3px] w-[3px] h-[42px] hardware-btn rounded-l-md z-0" />
                <div className="absolute top-[160px] -right-[3px] w-[3px] h-[65px] hardware-btn rounded-r-md z-0" />

                {/* Screen */}
                <div className="absolute inset-[7px] bg-white dark:bg-[#05080f] rounded-[2.4rem] overflow-hidden text-slate-900 dark:text-white z-10">
                  <div className="absolute inset-0 screen-glare z-40 pointer-events-none" />

                  {/* Dynamic Island */}
                  <div className="absolute top-[5px] left-1/2 -translate-x-1/2 w-[90px] h-[26px] bg-black rounded-full z-50 flex items-center justify-end px-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.8)] animate-pulse" />
                  </div>

                  {/* App content */}
                  <div className="relative w-full h-full pt-10 px-4 pb-6 flex flex-col bg-white dark:bg-[#05080f]">
                    <div className="flex justify-between items-center mb-6 mt-2">
                      <div>
                        <div className="text-[9px] text-slate-500 dark:text-[#64748b] uppercase tracking-widest font-bold">Protocolo</div>
                        <div className="text-base font-bold text-slate-900 dark:text-white">C.O.R.E. 8</div>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-[#22c55e]/10 border border-[#22c55e]/20 flex items-center justify-center text-[10px] font-bold text-[#22c55e]">
                        D
                      </div>
                    </div>

                    {/* App screen animation */}
                    <div className="flex-1 rounded-xl overflow-hidden bg-slate-50 dark:bg-[#0d1117] border border-slate-200 dark:border-[#1e293b] flex items-center justify-center">
                      <Player
                        component={AppShowcase}
                        durationInFrames={600}
                        fps={30}
                        compositionWidth={390}
                        compositionHeight={844}
                        style={{ width: "100%", height: "100%" }}
                        autoPlay
                        loop
                        controls={false}
                      />
                    </div>

                    {/* Metrics strip */}
                    <div className="mt-4 grid grid-cols-3 gap-2">
                      {t.appCinematic.features.map((label: string, i: number) => {
                        const values = ["24", "8", "8"];
                        return (
                          <div key={label} className="bg-slate-50 dark:bg-[#0d1117] border border-slate-200 dark:border-[#1e293b] rounded-lg p-2 text-center">
                            <div className="text-lg font-black text-[#22c55e]">{values[i]}</div>
                            <div className="text-[8px] text-[#475569] uppercase tracking-wider">{label}</div>
                          </div>
                        );
                      })}
                    </div>

                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[100px] h-[4px] bg-white/20 rounded-full" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
