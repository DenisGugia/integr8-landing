"use client";

import { useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import { useTranslation } from "@/lib/i18n/context";

export function BeforeAfterSection() {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    // Começa a transição quando o componente está entrando na tela (20% do topo) 
    // e termina quando chega ao centro
    offset: ["start 0.8", "start 0.2"],
  });

  // Opacidade da imagem "Depois"
  const opacityAfter = useTransform(scrollYProgress, [0, 1], [0, 1]);

  // Estilos comuns para as imagens (baseado no documento de calibração)
  const baseImageStyle: React.CSSProperties = {
    position: "absolute",
    width: "100%",
    height: "auto",
    top: "-5%",
    right: "-3.7%",
    objectFit: "cover",
    display: "block",
  };

  return (
    <section
      ref={sectionRef}
      className="w-full py-24 bg-white dark:bg-[#05080f]"
    >
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-xs font-semibold uppercase tracking-widest text-[#22c55e]">
            {t.beforeAfter.eyebrow}
          </span>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-white mt-3">
            {t.beforeAfter.headline}
          </h2>
          <p className="text-slate-500 mt-3 text-sm">
            {t.beforeAfter.caption}
          </p>
        </motion.div>

        <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden shadow-2xl bg-black">
          {/* Imagem ANTES (base) */}
          <motion.img
            src="/assets/hero-antes.jpg"
            alt={t.beforeAfter.labelBefore}
            style={{
              ...baseImageStyle,
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
              transform: "translate(0%, -0.2%)",
              zIndex: 2,
              opacity: opacityAfter,
            }}
          />

          {/* Fades laterais para integração (opcional, mas solicitado no doc) */}
          <div className="absolute inset-0 z-[5] pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20" />
          </div>

          {/* Badge Antes / Depois */}
          <div className="absolute bottom-6 right-6 z-10 flex border border-white/10 rounded-full overflow-hidden bg-black/40 backdrop-blur-md">
            <motion.div
              className="text-[10px] font-bold uppercase tracking-wider px-4 py-2 transition-colors"
              style={{
                color: useTransform(opacityAfter, [0, 0.5], ["#ccff00", "rgba(255,255,255,0.4)"]),
                backgroundColor: useTransform(opacityAfter, [0, 0.5], ["rgba(204,255,0,0.1)", "rgba(204,255,0,0)"])
              }}
            >
              {t.beforeAfter.labelBefore}
            </motion.div>
            <motion.div
              className="text-[10px] font-bold uppercase tracking-wider px-4 py-2 transition-colors"
              style={{
                color: useTransform(opacityAfter, [0.5, 1], ["rgba(255,255,255,0.4)", "#ccff00"]),
                backgroundColor: useTransform(opacityAfter, [0.5, 1], ["rgba(204,255,0,0)", "rgba(204,255,0,0.1)"])
              }}
            >
              {t.beforeAfter.labelAfter}
            </motion.div>
          </div>

          {/* Indicador de "Scroll" para revelar */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 opacity-50">
            <span className="text-[8px] uppercase tracking-[0.2em] text-white font-bold">Role para revelar</span>
            <div className="w-px h-6 bg-gradient-to-b from-transparent to-white" />
          </div>
        </div>

        <div className="flex justify-between mt-4 text-[10px] text-slate-500 font-bold uppercase tracking-widest px-2">
          <span>{t.beforeAfter.labelBefore}</span>
          <span>{t.beforeAfter.labelAfter}</span>
        </div>
      </div>
    </section>
  );
}

