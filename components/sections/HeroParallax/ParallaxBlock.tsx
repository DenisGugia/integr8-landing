'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { IMG_PADDING, type ParallaxBlock as ParallaxBlockType } from './constants';

export function ParallaxSection({ imgUrl, subheading, heading, body }: ParallaxBlockType) {
  return (
    <div style={{ paddingLeft: IMG_PADDING, paddingRight: IMG_PADDING }}>
      <div className="relative h-[150vh]">
        <StickyImage imgUrl={imgUrl} />
        <OverlayCopy subheading={subheading} heading={heading} />
      </div>
      <BlockContent heading={heading} body={body} />
    </div>
  );
}

function StickyImage({ imgUrl }: { imgUrl: string }) {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['end end', 'end start'],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.85]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <motion.div
      style={{
        backgroundImage: `url(${imgUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: `calc(100vh - ${IMG_PADDING * 2}px)`,
        top: IMG_PADDING,
        scale,
      }}
      ref={targetRef}
      className="sticky z-0 overflow-hidden rounded-3xl"
    >
      <motion.div
        className="absolute inset-0 bg-white/60 dark:bg-[#05080f]/60"
        style={{ opacity }}
      />
    </motion.div>
  );
}

function OverlayCopy({ subheading, heading }: { subheading: string; heading: string }) {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [250, -250]);
  const opacity = useTransform(scrollYProgress, [0.25, 0.5, 0.75], [0, 1, 0]);

  return (
    <motion.div
      style={{ y, opacity }}
      ref={targetRef}
      className="absolute left-0 top-0 flex h-screen w-full flex-col items-center justify-center text-slate-900 dark:text-white px-6 text-center"
    >
      <p className="mb-3 text-[#22c55e] font-semibold text-sm md:text-base uppercase tracking-widest">
        {subheading}
      </p>
      <p className="text-3xl md:text-6xl font-black tracking-tight max-w-3xl leading-tight">
        {heading}
      </p>
    </motion.div>
  );
}

function BlockContent({ heading, body }: { heading: string; body: string }) {
  return (
    <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 px-4 pb-24 pt-12 md:grid-cols-12">
      <h2 className="col-span-1 text-2xl font-bold md:col-span-4 text-slate-900 dark:text-white">
        {heading}
      </h2>
      <div className="col-span-1 md:col-span-8">
        <p className="text-lg text-slate-500 dark:text-[#64748b] leading-relaxed">{body}</p>
      </div>
    </div>
  );
}
