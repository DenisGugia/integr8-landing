"use client";
import { motion } from "framer-motion";

const checkpoints = [
  "Acorda cansado antes do dia começar.",
  "No meio da tarde, bate uma queda que não é cansaço de trabalho.",
  "Não consegue ver onde um treino caberia sem tirar de algo que não dá para tirar.",
  "Já tentou academia, app, treino online. Parou.",
  "\"Deveria estar melhor\" virou uma frase distante.",
  "A consulta médica continua sendo adiada.",
];

export function IdentificationSection() {
  return (
    <section className="max-w-4xl mx-auto px-6 py-32">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white mb-6 leading-tight">
          Você resolve o que a maioria<br />não conseguiria nem listar.
        </h2>
        <p className="text-lg text-[#64748b] leading-relaxed max-w-2xl mb-8">
          No trabalho, em casa, em qualquer frente que precisa de você — funciona.
          Só no próprio corpo não.
        </p>
        <p className="text-lg text-[#94a3b8] leading-relaxed max-w-2xl mb-16">
          Você tentou. Houve semanas boas, às vezes meses. A vida complicou,
          você ficou para segundo plano, o programa foi para a gaveta. A conclusão
          foi a mais razoável possível:{" "}
          <em className="text-white">talvez não seja para mim.</em>
          {" "}Essa conclusão está errada.
        </p>

        <p className="text-sm font-semibold uppercase tracking-widest text-[#22c55e] mb-6">
          Você reconhece alguma dessas?
        </p>
        <ul className="space-y-4">
          {checkpoints.map((item, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              className="flex items-start gap-3 text-[#94a3b8] text-lg"
            >
              <span className="mt-1 w-2 h-2 rounded-full bg-[#22c55e] flex-shrink-0" />
              {item}
            </motion.li>
          ))}
        </ul>

        <p className="mt-12 text-[#64748b] text-lg italic">
          O que vem a seguir é para você.
        </p>
      </motion.div>
    </section>
  );
}
