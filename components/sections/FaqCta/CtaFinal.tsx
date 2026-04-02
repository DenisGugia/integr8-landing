'use client';

import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';

const Player = dynamic(() => import('@remotion/player').then(m => ({ default: m.Player })), { ssr: false });
const CountdownTimer = dynamic(() => import('@/components/remotion/CountdownTimer').then(m => ({ default: m.CountdownTimer })), { ssr: false });

const WA_START = '{WA_ROUTES.contact}?text=Quero+come%C3%A7ar+meu+protocolo';
const WA = '{WA_ROUTES.contact}';

interface CtaFinalProps {
  ctaHeadline: string;
  ctaBody: string;
  ctaButton: string;
  navCta: string;
}

export function CtaFinal({ ctaHeadline, ctaBody, ctaButton, navCta }: CtaFinalProps) {
  return (
    <>
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
            style={{ width: '100%', height: 'auto' }}
            autoPlay
            loop
            controls={false}
          />
        </motion.div>
      </section>

      <section className="max-w-3xl mx-auto px-6 pb-32 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight mb-4 leading-tight">
            {ctaHeadline.split('\n').map((line, i, arr) => (
              <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
            ))}
          </h2>
          <p className="text-slate-500 dark:text-[#64748b] text-lg mb-12 max-w-xl mx-auto leading-relaxed">
            {ctaBody}
          </p>
          <a
            href={WA_START}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-[#22c55e] text-black font-black px-10 py-4 rounded-full hover:bg-[#16a34a] transition-colors text-base"
          >
            {ctaButton}
          </a>
          <p className="mt-4 text-xs text-slate-400 dark:text-[#475569]">
            CAD$ 49,90/mês · 16 semanas · 8 revisões · 21 dias sem risco
          </p>
          <p className="mt-6 text-sm text-slate-400 dark:text-[#475569]">
            Dúvidas?{' '}
            <a
              href={WA}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#22c55e] underline underline-offset-4 hover:text-[#16a34a]"
            >
              {navCta}
            </a>
          </p>
        </motion.div>
      </section>
    </>
  );
}
