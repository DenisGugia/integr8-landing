"use client";
import { motion } from "framer-motion";
import {
  ImageComparison,
  ImageComparisonImage,
  ImageComparisonSlider,
} from "@/components/ui/image-comparison";

export function BeforeAfterSection() {
  return (
    <section className="max-w-5xl mx-auto px-6 py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <span className="text-xs font-semibold uppercase tracking-widest text-[#22c55e]">
          Transformação real
        </span>
        <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight mt-3">
          Não vamos falar sobre quilos.
        </h2>
        <p className="text-[#64748b] mt-4 max-w-xl mx-auto">
          Arraste para ver o que muda quando o corpo começa a acompanhar.
        </p>
      </motion.div>

      <ImageComparison
        className="w-full aspect-video rounded-2xl overflow-hidden border border-[#1e293b] cursor-ew-resize"
        enableHover={false}
        springOptions={{ bounce: 0, duration: 0 }}
      >
        <ImageComparisonImage
          position="left"
          src="/placeholders/casal-before.jpg"
          alt="Antes — cansaço e sem energia"
        />
        <ImageComparisonImage
          position="right"
          src="/placeholders/casal-after.jpg"
          alt="Depois — energia e vitalidade"
        />
        <ImageComparisonSlider className="bg-white w-1">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-xl text-black font-bold text-sm select-none">
            ⟺
          </div>
        </ImageComparisonSlider>
      </ImageComparison>

      <div className="grid grid-cols-2 mt-4 text-center text-xs text-[#475569]">
        <span>← Sobrevivendo</span>
        <span>Vivendo →</span>
      </div>
    </section>
  );
}
