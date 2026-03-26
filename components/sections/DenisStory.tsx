"use client";
import { motion } from "framer-motion";

export function DenisStory() {
  return (
    <section className="max-w-5xl mx-auto px-6 py-32">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="aspect-square rounded-2xl overflow-hidden bg-[#0d1117] border border-[#1e293b] flex items-center justify-center">
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
            A história por trás do método
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight mt-3 mb-6 leading-tight">
            Por dois anos, ele sabia exatamente o que fazer. E não conseguia.
          </h2>
          <div className="space-y-4 text-[#94a3b8] leading-relaxed">
            <p>
              Por dois anos, sendo personal trainer e sabendo exatamente o que precisava fazer,
              ele não conseguiu manter uma rotina de treino consistente. Não por falta de
              conhecimento. Não por falta de vontade.
            </p>
            <p>
              Personal até as 10h, empresa durante o dia, aulas à tarde e à noite.
              Quando deixou de estar dentro da academia, os treinos foram os primeiros a cair.
            </p>
            <p>
              Em 2023, Denis e a família foram para o Canadá. Rotina completamente diferente,
              tudo para reaprender do zero. Foi nessa reconstrução que a peça faltante ficou clara.
            </p>
          </div>
          <blockquote className="mt-8 border-l-2 border-[#22c55e] pl-5">
            <p className="text-white italic leading-relaxed">
              &ldquo;Quando a programação do dia seguinte já está feita, não preciso decidir o que
              comer ou fazer com fome e sem vontade. Só cumpro o que foi planejado.&rdquo;
            </p>
            <footer className="mt-3 text-xs text-[#475569]">— Denis, criador do INTEGR8</footer>
          </blockquote>
        </motion.div>
      </div>
    </section>
  );
}
