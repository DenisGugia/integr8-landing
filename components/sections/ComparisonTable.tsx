"use client";
import { motion } from "framer-motion";

const rows = [
  {
    common: "Começa com o plano pronto. Você se adapta.",
    core: "Começa entendendo como você funciona. O plano se adapta.",
  },
  {
    common: "Semana que desanda: você perde o fio.",
    core: "Semana que desanda: você ajusta. O protocolo continua.",
  },
  {
    common: "Ao terminar, você volta para o zero.",
    core: "Ao terminar, você tem a fórmula. Para sempre.",
  },
];

export function ComparisonTable() {
  return (
    <section className="max-w-5xl mx-auto px-6 py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-4">
          O que muda com o C.O.R.E. 8
        </h2>
        <p className="text-[#64748b] mb-12 max-w-xl">
          Não por falta de esforço. Por diferença estrutural.
        </p>

        <div className="border border-[#1e293b] rounded-2xl overflow-hidden">
          <div className="grid grid-cols-2 bg-[#0d1117]">
            <div className="px-6 py-3 text-xs font-semibold uppercase tracking-widest text-[#64748b] border-b border-r border-[#1e293b]">
              Programa comum
            </div>
            <div className="px-6 py-3 text-xs font-semibold uppercase tracking-widest text-[#22c55e] border-b border-[#1e293b]">
              Protocolo C.O.R.E. 8
            </div>
          </div>
          {rows.map((row, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="grid grid-cols-2"
            >
              <div className="px-6 py-5 text-[#64748b] border-b border-r border-[#1e293b] text-sm leading-relaxed">
                {row.common}
              </div>
              <div className="px-6 py-5 text-[#f1f5f9] border-b border-[#1e293b] text-sm leading-relaxed">
                {row.core}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
