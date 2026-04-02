'use client';

import { motion } from 'framer-motion';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

interface FaqItem {
  q: string;
  a: string;
}

interface FaqAccordionProps {
  eyebrow: string;
  headline: string;
  items: FaqItem[];
}

export function FaqAccordion({ eyebrow, headline, items }: FaqAccordionProps) {
  return (
    <section className="max-w-3xl mx-auto px-6 py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <span className="text-xs font-semibold uppercase tracking-widest text-[#22c55e]">
          {eyebrow}
        </span>
        <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight mt-3 mb-12">
          {headline}
        </h2>
        <Accordion className="space-y-2">
          {items.map((item, i) => (
            <AccordionItem
              key={i}
              className="border border-slate-200 dark:border-[#1e293b] rounded-xl px-5 bg-slate-50 dark:bg-[#0d1117] data-open:border-[#22c55e]/30"
            >
              <AccordionTrigger className="text-slate-900 dark:text-white font-semibold text-left hover:no-underline py-5 text-sm">
                {item.q}
              </AccordionTrigger>
              <AccordionContent className="text-slate-500 dark:text-[#94a3b8] leading-relaxed pb-5 text-sm">
                {item.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </motion.div>
    </section>
  );
}
