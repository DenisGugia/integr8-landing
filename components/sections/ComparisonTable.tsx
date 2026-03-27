"use client";
import { motion } from "framer-motion";
import { useTranslation } from "@/lib/i18n/context";

export function ComparisonTable() {
  const { t } = useTranslation();

  return (
    <section className="max-w-5xl mx-auto px-6 py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight mb-4">
          {t.comparison.headline}
        </h2>
        <p className="text-slate-500 dark:text-[#64748b] mb-12 max-w-xl">
          {t.comparison.eyebrow}
        </p>

        <div className="border border-slate-200 dark:border-[#1e293b] rounded-2xl overflow-hidden">
          <div className="grid grid-cols-2 bg-slate-50 dark:bg-[#0d1117]">
            <div className="px-6 py-3 text-xs font-semibold uppercase tracking-widest text-slate-500 dark:text-[#64748b] border-b border-r border-slate-200 dark:border-[#1e293b]">
              {t.comparison.colCommon}
            </div>
            <div className="px-6 py-3 text-xs font-semibold uppercase tracking-widest text-[#22c55e] border-b border-slate-200 dark:border-[#1e293b]">
              {t.comparison.colCore}
            </div>
          </div>
          {t.comparison.rows.map((row, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="grid grid-cols-2"
            >
              <div className="px-6 py-5 text-slate-500 dark:text-[#64748b] border-b border-r border-slate-200 dark:border-[#1e293b] text-sm leading-relaxed">
                {row.common}
              </div>
              <div className="px-6 py-5 text-slate-800 dark:text-[#f1f5f9] border-b border-slate-200 dark:border-[#1e293b] text-sm leading-relaxed">
                {row.core}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
