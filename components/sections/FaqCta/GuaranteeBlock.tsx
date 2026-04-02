'use client';

import { motion } from 'framer-motion';

interface GuaranteeBlockProps {
  guarantee: string;
  guaranteeBody: string;
}

export function GuaranteeBlock({ guarantee, guaranteeBody }: GuaranteeBlockProps) {
  return (
    <section className="max-w-3xl mx-auto px-6 pb-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="border border-[#22c55e]/20 rounded-2xl p-8 bg-slate-50 dark:bg-[#0d1117]"
      >
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-[#22c55e]/10 border border-[#22c55e]/20 flex items-center justify-center flex-shrink-0 text-[#22c55e] font-black text-sm">
            21
          </div>
          <div>
            <h3 className="text-lg font-black text-slate-900 dark:text-white mb-3">
              {guarantee}
            </h3>
            <p className="text-slate-500 dark:text-[#64748b] leading-relaxed text-sm">
              {guaranteeBody}
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
