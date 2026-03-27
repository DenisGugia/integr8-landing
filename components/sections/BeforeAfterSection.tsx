"use client";

import { useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import {
  ImageComparison,
  ImageComparisonImage,
  ImageComparisonSlider,
} from "@/components/ui/image-comparison";
import { useTranslation } from "@/lib/i18n/context";

export function BeforeAfterSection() {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start center", "end center"],
  });

  const sliderPosition = useTransform(scrollYProgress, [0, 1], [0, 100]);

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

        <ImageComparison
          className="w-full aspect-[16/9] rounded-xl overflow-hidden"
          controlledPosition={sliderPosition}
        >
          <ImageComparisonImage
            src="/placeholders/casal-before.jpg"
            alt={t.beforeAfter.labelBefore}
            position="left"
          />
          <ImageComparisonImage
            src="/placeholders/casal-after.jpg"
            alt={t.beforeAfter.labelAfter}
            position="right"
          />
          <ImageComparisonSlider className="bg-[#22c55e] w-0.5">
            <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#22c55e] flex items-center justify-center pointer-events-none">
              <span className="text-black text-xs font-bold select-none">◀▶</span>
            </div>
          </ImageComparisonSlider>
        </ImageComparison>

        <div className="flex justify-between mt-3 text-xs text-slate-500 font-semibold uppercase tracking-widest">
          <span>{t.beforeAfter.labelBefore}</span>
          <span>{t.beforeAfter.labelAfter}</span>
        </div>
      </div>
    </section>
  );
}
