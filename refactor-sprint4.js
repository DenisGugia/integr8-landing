#!/usr/bin/env node
/**
 * Sprint 4 Refactoring - Modularize HeroParallax and FaqCta
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const ROOT = process.cwd();

function log(msg, type = 'info') {
  const prefix = { info: '📝', success: '✅', error: '❌', warning: '⚠️' }[type];
  console.log(`${prefix} ${msg}`);
}

// ============================================================
// HEROPARALLAX
// ============================================================

function modularizeHeroParallax() {
  log('Modularizing HeroParallax...');

  const dir = path.join(ROOT, 'components/sections/HeroParallax');
  if (fs.existsSync(dir)) {
    try { execSync(`powershell -NoProfile -Command "Remove-Item -Recurse -Force '${dir}'"`, { stdio: 'ignore' }); } catch (e) {}
  }
  fs.mkdirSync(dir, { recursive: true });

  // 1. constants.ts
  fs.writeFileSync(path.join(dir, 'constants.ts'), `export const IMG_PADDING = 12;

export interface ParallaxBlock {
  imgUrl: string;
  subheading: string;
  heading: string;
  body: string;
}

export const internalBlocks = [
  { imgUrl: '/placeholders/hero-1.jpg' },
  { imgUrl: '/placeholders/hero-2.jpg' },
  { imgUrl: '/placeholders/hero-3.jpg' },
];
`);

  // 2. HeroVideo.tsx
  fs.writeFileSync(path.join(dir, 'HeroVideo.tsx'), `'use client';

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
            {headline.split('\\n').map((line, i, arr) => (
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
`);

  // 3. ParallaxBlock.tsx
  fs.writeFileSync(path.join(dir, 'ParallaxBlock.tsx'), `'use client';

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
        backgroundImage: \`url(\${imgUrl})\`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: \`calc(100vh - \${IMG_PADDING * 2}px)\`,
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
`);

  // 4. index.tsx
  fs.writeFileSync(path.join(dir, 'index.tsx'), `'use client';

import { useTranslation } from '@/lib/i18n/context';
import { HeroVideo } from './HeroVideo';
import { ParallaxSection } from './ParallaxBlock';
import { internalBlocks, type ParallaxBlock } from './constants';

export function HeroParallax() {
  const { t } = useTranslation();

  const mergedBlocks: ParallaxBlock[] = internalBlocks.map((b, i) => ({
    ...b,
    ...t.hero.blocks[i],
  }));

  return (
    <div className="bg-white dark:bg-[#05080f]">
      <HeroVideo
        eyebrow={t.hero.eyebrow}
        headline={t.hero.headline}
        sub={t.hero.sub}
        cta={t.hero.cta}
      />
      <div id="como-funciona">
        {mergedBlocks.map((block, i) => (
          <ParallaxSection key={i} {...block} />
        ))}
      </div>
    </div>
  );
}

export default HeroParallax;
`);

  const original = path.join(ROOT, 'components/sections/HeroParallax.tsx');
  if (fs.existsSync(original)) fs.unlinkSync(original);

  log('✓ HeroParallax modularized', 'success');
}

// ============================================================
// FAQCTA
// ============================================================

function modularizeFaqCta() {
  log('Modularizing FaqCta...');

  const dir = path.join(ROOT, 'components/sections/FaqCta');
  if (fs.existsSync(dir)) {
    try { execSync(`powershell -NoProfile -Command "Remove-Item -Recurse -Force '${dir}'"`, { stdio: 'ignore' }); } catch (e) {}
  }
  fs.mkdirSync(dir, { recursive: true });

  // 1. FaqAccordion.tsx
  fs.writeFileSync(path.join(dir, 'FaqAccordion.tsx'), `'use client';

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
`);

  // 2. GuaranteeBlock.tsx
  fs.writeFileSync(path.join(dir, 'GuaranteeBlock.tsx'), `'use client';

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
`);

  // 3. CtaFinal.tsx
  fs.writeFileSync(path.join(dir, 'CtaFinal.tsx'), `'use client';

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
            {ctaHeadline.split('\\n').map((line, i, arr) => (
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
`);

  // 4. index.tsx
  fs.writeFileSync(path.join(dir, 'index.tsx'), `'use client';

import { useTranslation } from '@/lib/i18n/context';
import { FaqAccordion } from './FaqAccordion';
import { GuaranteeBlock } from './GuaranteeBlock';
import { CtaFinal } from './CtaFinal';

export function FaqCta() {
  const { t } = useTranslation();

  return (
    <>
      <FaqAccordion
        eyebrow={t.faq.eyebrow}
        headline={t.faq.headline}
        items={t.faq.items}
      />
      <GuaranteeBlock
        guarantee={t.faq.guarantee}
        guaranteeBody={t.faq.guaranteeBody}
      />
      <CtaFinal
        ctaHeadline={t.faq.ctaHeadline}
        ctaBody={t.faq.ctaBody}
        ctaButton={t.faq.ctaButton}
        navCta={t.nav.cta}
      />
    </>
  );
}

export default FaqCta;
`);

  const original = path.join(ROOT, 'components/sections/FaqCta.tsx');
  if (fs.existsSync(original)) fs.unlinkSync(original);

  log('✓ FaqCta modularized', 'success');
}

// ============================================================
// BUILD + COMMIT
// ============================================================

function runBuild() {
  log('Running build...');
  try {
    execSync('npm run build', { stdio: 'inherit', cwd: ROOT });
    log('Build successful', 'success');
    return true;
  } catch (e) {
    log('Build failed', 'error');
    return false;
  }
}

function commitAndPush() {
  log('Committing changes...');
  try {
    execSync('git add -A', { cwd: ROOT });
    execSync(
      'git commit -m "refactor: modularize HeroParallax and FaqCta into folder structures"',
      { cwd: ROOT }
    );
    execSync('git push', { cwd: ROOT, stdio: 'inherit' });
    log('Pushed to GitHub', 'success');
  } catch (e) {
    log('Git commit/push skipped', 'warning');
  }
}

// ============================================================
// MAIN
// ============================================================

async function main() {
  console.log('\n🚀 Sprint 4 - Modularize HeroParallax & FaqCta\n');

  try {
    modularizeHeroParallax();
    modularizeFaqCta();

    const buildSuccess = runBuild();
    if (!buildSuccess) {
      log('Build failed. Aborting.', 'error');
      process.exit(1);
    }

    commitAndPush();

    console.log('\n✅ Sprint 4 Complete!\n');
    console.log('What changed:');
    console.log('  • components/sections/HeroParallax/ (index, HeroVideo, ParallaxBlock, constants)');
    console.log('  • components/sections/FaqCta/ (index, FaqAccordion, GuaranteeBlock, CtaFinal)\n');
  } catch (e) {
    log(`Fatal error: ${e.message}`, 'error');
    process.exit(1);
  }
}

main();
