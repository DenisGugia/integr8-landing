"use client";
import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqs } from "@/data/faq";

const WA = "https://wa.me/12269617351";
const WA_START = "https://wa.me/12269617351?text=Quero+come%C3%A7ar+meu+protocolo";

export function FaqCta() {
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
            Dúvidas
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight mt-3 mb-12">
            Perguntas frequentes
          </h2>
          <Accordion className="space-y-2">
            {faqs.map((item, i) => (
              <AccordionItem
                key={i}
                className="border border-[#1e293b] rounded-xl px-5 bg-[#0d1117] data-open:border-[#22c55e]/30"
              >
                <AccordionTrigger className="text-white font-semibold text-left hover:no-underline py-5 text-sm">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="text-[#94a3b8] leading-relaxed pb-5 text-sm">
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
          className="border border-[#22c55e]/20 rounded-2xl p-8 bg-[#0d1117]"
        >
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-[#22c55e]/10 border border-[#22c55e]/20 flex items-center justify-center flex-shrink-0 text-[#22c55e] font-black text-sm">
              21
            </div>
            <div>
              <h3 className="text-lg font-black text-white mb-3">
                Os primeiros 21 dias são seus para decidir.
              </h3>
              <p className="text-[#64748b] leading-relaxed text-sm">
                Nos primeiros 21 dias, você passa pelo onboarding: mapeio sua rotina, objetivos
                e realidade. Preparo uma proposta personalizada e apresento como o programa vai
                funcionar para você especificamente. Só depois o protocolo começa.
              </p>
              <p className="text-[#64748b] leading-relaxed text-sm mt-3">
                Se não for o momento certo,{" "}
                <span className="text-white font-semibold">devolvo 100%</span>.
                Sem formulário, sem justificativa.
              </p>
            </div>
          </div>
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
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-4 leading-tight">
            Os próximos meses vão passar<br />de qualquer forma.
          </h2>
          <p className="text-[#64748b] text-lg mb-12 max-w-xl mx-auto leading-relaxed">
            A questão é o que vai ser diferente quando passarem.
          </p>
          <a
            href={WA_START}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-[#22c55e] text-black font-black px-10 py-4 rounded-full hover:bg-[#16a34a] transition-colors text-base"
          >
            Quero chegar ao final do ano diferente →
          </a>
          <p className="mt-4 text-xs text-[#475569]">
            CAD$ 49,90/mês · 16 semanas · 8 revisões · 21 dias sem risco
          </p>
          <p className="mt-6 text-sm text-[#475569]">
            Dúvidas?{" "}
            <a
              href={WA}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#22c55e] underline underline-offset-4 hover:text-[#16a34a]"
            >
              Falar com o coach
            </a>
          </p>
        </motion.div>
      </section>
    </>
  );
}
