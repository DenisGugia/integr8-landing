"use client";
import { WA_ROUTES } from "@/data/constants";
import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useTranslation } from "@/lib/i18n/context";
import dynamicImport from "next/dynamic";

const Player = dynamicImport(() => import("@remotion/player").then(m => ({ default: m.Player })), { ssr: false });
const CountdownTimer = dynamicImport(() => import("@/components/remotion/CountdownTimer").then(m => ({ default: m.CountdownTimer })), { ssr: false });

const WA = "{WA_ROUTES.contact}";
const WA_START = "{WA_ROUTES.contact}?text=Quero+come%C3%A7ar+meu+protocolo";

export function FaqCta() {
  const { t } = useTranslation();

  return (
    <>
      {/* FAQ */}
      <section className="max-w-3xl mx-auto px-6 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-xs font-semibold uppercase tracking-widest text-[#22c55e]">
            {t.faq.eyebrow}
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight mt-3 mb-12">
            {t.faq.headline}
          </h2>
          <Accordion className="space-y-2">
            {t.faq.items.map((item, i) => (
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

      {/* Garantia */}
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
                {t.faq.guarantee}
              </h3>
              <p className="text-slate-500 dark:text-[#64748b] leading-relaxed text-sm">
                {t.faq.guaranteeBody}
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Countdown Timer */}
      <section className="max-w-2xl mx-auto px-6 py-16 flex justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-[600px]"
        >
          <Player
            component={CountdownTimer}
            durationInFrames={720}
            fps={30}
            compositionWidth={600}
            compositionHeight={200}
            style={{ width: "100%", height: "auto" }}
            autoPlay
            loop
            controls={false}
          />
        </motion.div>
      </section>

      {/* CTA Final */}
      <section className="max-w-3xl mx-auto px-6 pb-32 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight mb-4 leading-tight">
            {t.faq.ctaHeadline.split("\n").map((line, i) => (
              <span key={i}>{line}{i < t.faq.ctaHeadline.split("\n").length - 1 && <br />}</span>
            ))}
          </h2>
          <p className="text-slate-500 dark:text-[#64748b] text-lg mb-12 max-w-xl mx-auto leading-relaxed">
            {t.faq.ctaBody}
          </p>
          <a
            href={WA_START}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-[#22c55e] text-black font-black px-10 py-4 rounded-full hover:bg-[#16a34a] transition-colors text-base"
          >
            {t.faq.ctaButton}
          </a>
          <p className="mt-4 text-xs text-slate-400 dark:text-[#475569]">
            CAD$ 49,90/mês · 16 semanas · 8 revisões · 21 dias sem risco
          </p>
          <p className="mt-6 text-sm text-slate-400 dark:text-[#475569]">
            Dúvidas?{" "}
            <a
              href={WA}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#22c55e] underline underline-offset-4 hover:text-[#16a34a]"
            >
              {t.nav.cta}
            </a>
          </p>
        </motion.div>
      </section>
    </>
  );
}
