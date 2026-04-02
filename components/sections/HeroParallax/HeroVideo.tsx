'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';

interface HeroVideoProps {
  eyebrow: string;
  headline: string;
  sub: string;
  cta: string;
}

export function HeroVideo({ eyebrow, headline, sub, cta }: HeroVideoProps) {
  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      <div className="absolute inset-0 z-0 w-full h-full">
        <video
          autoPlay
          muted
          playsInline
          className="w-full h-full object-cover opacity-100"
          aria-hidden="true"
          style={{ display: 'block' }}
        >
          <source src="/videos/hero-video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/40 to-black/30 dark:from-[#05080f]/70 dark:via-[#05080f]/60 dark:to-transparent" />
      </div>

      <div className="relative z-10 h-full flex flex-col items-center justify-end px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-center max-w-2xl"
        >
          <span className="text-xs font-semibold uppercase tracking-widest text-[#22c55e] mb-4 block">
            {eyebrow}
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter text-white leading-[1.05] mb-6">
            {headline.split('\n').map((line, i, arr) => (
              <React.Fragment key={i}>
                {line}
                {i < arr.length - 1 && <br />}
              </React.Fragment>
            ))}
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-white/90 leading-relaxed mb-8">
            {sub}
          </p>
          <a
            href="#como-funciona"
            className="inline-flex items-center gap-2 bg-[#22c55e] text-black font-bold px-6 sm:px-8 py-3 sm:py-3.5 rounded-full hover:bg-[#16a34a] active:scale-95 transition-all text-sm duration-200"
          >
            {cta} <FiArrowRight size={18} />
          </a>
        </motion.div>
      </div>
    </div>
  );
}
