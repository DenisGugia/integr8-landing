"use client";

import { useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import { useTranslation } from "@/lib/i18n/context";

export function BeforeAfterSection() {
  const { t } = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Transição de opacidade mais lenta: 
  // Começa em 25% do scroll do container e termina em 75%
  const opacityAfter = useTransform(scrollYProgress, [0.25, 0.75], [0, 1]);

  // Efeito de zoom leve para dar profundidade e dinamismo
  const scale = useTransform(scrollYProgress, [0, 1], [1.1, 1]);

  // Estilos comuns para as imagens (baseado no documento de calibração)
  const baseImageStyle: React.CSSProperties = {
    position: "absolute",
    width: "115%", // Margem extra para acomodar os transforms de alinhamento
    height: "115%",
    top: "-7.5%",
    right: "-7.5%",
    objectFit: "cover",
    display: "block",
  };

  return (
    <div ref={containerRef} className="relative h-[250vh] bg-black">
      {/* Sticky Container - O palco da transformação */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-center items-center">

        {/* BACKGROUND IMAGES (FULL SECTION) */}
        <div className="absolute inset-0 z-0">
          {/* Imagem ANTES (base) */}
          <motion.img
            src="/assets/hero-antes.jpg"
            alt={t.beforeAfter.labelBefore}
            style={{
              ...baseImageStyle,
              scale,
              transform: "translate(1.2%, -0.5%)",
              zIndex: 1,
            }}
          />

          {/* Imagem DEPOIS (sobreposta com opacity) */}
          <motion.img
            src="/assets/hero-depois.jpg"
            alt={t.beforeAfter.labelAfter}
            style={{
              ...baseImageStyle,
              scale,
              transform: "translate(0%, -0.2%)",
              zIndex: 2,
              opacity: opacityAfter,
            }}
          />

          {/* Overlays para garantir legibilidade e profundidade */}
          <div className="absolute inset-0 z-[5] pointer-events-none bg-black/30" />
          <div className="absolute inset-0 z-[5] pointer-events-none bg-gradient-to-b from-black/80 via-transparent to-black/80" />
        </div>

        {/* CONTENT (TEXT OVERLAY) */}
        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <span className="text-xs font-bold uppercase tracking-[0.4em] text-[#22c55e] mb-6 block drop-shadow-lg">
              {t.beforeAfter.eyebrow}
            </span>
            <h2 className="text-5xl md:text-8xl font-black tracking-tighter text-white leading-[0.95] mb-8 drop-shadow-2xl">
              {t.beforeAfter.headline}
            </h2>
            <p className="max-w-2xl mx-auto text-white/90 text-lg md:text-2xl font-medium leading-relaxed drop-shadow-md">
              {t.beforeAfter.caption}
            </p>
          </motion.div>
        </div>

        {/* Floating Badge (Indicador de Estado) */}
        <div className="absolute bottom-16 right-6 md:right-16 z-20 flex border border-white/20 rounded-full overflow-hidden bg-black/60 backdrop-blur-2xl px-1 py-1 shadow-2xl">
          <motion.div
            className="text-[10px] font-black uppercase tracking-widest px-6 py-3 rounded-full transition-all duration-500"
            style={{
              color: useTransform(opacityAfter, [0, 0.5], ["#ccff00", "rgba(255,255,255,0.3)"]),
              backgroundColor: useTransform(opacityAfter, [0, 0.4], ["rgba(204,255,0,0.15)", "rgba(204,255,0,0)"])
            }}
          >
            {t.beforeAfter.labelBefore}
          </motion.div>
          <motion.div
            className="text-[10px] font-black uppercase tracking-widest px-6 py-3 rounded-full transition-all duration-500"
            style={{
              color: useTransform(opacityAfter, [0.5, 1], ["rgba(255,255,255,0.3)", "#ccff00"]),
              backgroundColor: useTransform(opacityAfter, [0.6, 1], ["rgba(204,255,0,0)", "rgba(204,255,0,0.15)"])
            }}
          >
            {t.beforeAfter.labelAfter}
          </motion.div>
        </div>

        {/* Scroll Progress / Indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-4">
          <motion.span
            style={{ opacity: useTransform(scrollYProgress, [0, 0.15], [1, 0]) }}
            className="text-[10px] uppercase tracking-[0.5em] text-white/60 font-black animate-pulse"
          >
            Role para transformar
          </motion.span>
          <div className="relative w-[1px] h-16 bg-white/10">
            <motion.div
              style={{ scaleY: scrollYProgress, originY: 0 }}
              className="absolute top-0 left-0 w-full h-full bg-[#22c55e]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
