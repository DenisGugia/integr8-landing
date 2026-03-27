"use client";
import { motion } from "framer-motion";
import { useTranslation } from "@/lib/i18n/context";

export function DenisStory() {
  const { t } = useTranslation();
  return (
    <section className="max-w-5xl mx-auto px-6 py-32">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="aspect-square rounded-2xl overflow-hidden bg-slate-50 dark:bg-[#0d1117] border border-slate-200 dark:border-[#1e293b] flex items-center justify-center">
            <img
              src="/placeholders/denis-photo.jpg"
              alt="Denis — criador do Método INTEGR8"
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
            <span className="text-[#475569] text-sm absolute">foto Denis</span>
          </div>
          <p className="mt-4 text-xs text-[#475569] text-center">
            Personal trainer certificado · Coordenador de academia · Empresário · Pai · Imigrante
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <span className="text-xs font-semibold uppercase tracking-widest text-[#22c55e]">
            {t.denis.eyebrow}
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight mt-3 mb-6 leading-tight">
            {t.denis.headline}
          </h2>
          <div className="space-y-4 text-slate-500 dark:text-[#94a3b8] leading-relaxed">
            {t.denis.body.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          <blockquote className="mt-8 border-l-2 border-[#22c55e] pl-5">
            <p className="text-slate-900 dark:text-white italic leading-relaxed">
              &ldquo;{t.denis.quote}&rdquo;
            </p>
            <footer className="mt-3 text-xs text-slate-500 dark:text-[#475569]">— {t.denis.quoteAttrib}</footer>
          </blockquote>
        </motion.div>
      </div>
    </section>
  );
}
