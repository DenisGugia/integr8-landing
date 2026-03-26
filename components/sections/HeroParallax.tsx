// components/sections/HeroParallax.tsx
"use client";
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";

const WA = "https://wa.me/12269617351?text=Quero+entender+o+protocolo";
const IMG_PADDING = 12;

interface ParallaxBlock {
  imgUrl: string;
  subheading: string;
  heading: string;
  body: string;
}

const blocks: ParallaxBlock[] = [
  {
    imgUrl: "/placeholders/hero-1.jpg",
    subheading: "Para quem cuida de tudo. Menos de si.",
    heading: "Por que programas falham com quem mais se esforça.",
    body: "Todo programa que você já tentou foi construído para uma rotina que não é a sua. Um cliente ideal com 3 a 5 dias livres, 8 horas de sono, sem reunião às 18h. Esse cliente existe — mas é a exceção.",
  },
  {
    imgUrl: "/placeholders/hero-2.jpg",
    subheading: "O ponto de virada",
    heading: "O que muda quando o protocolo começa por você.",
    body: "Não é falta de disciplina. É incompatibilidade. A mesma vontade que trouxe para cada tentativa é a que vai funcionar quando o protocolo for feito para você — não para um perfil genérico.",
  },
  {
    imgUrl: "/placeholders/hero-3.jpg",
    subheading: "Construído para a semana real",
    heading: "Como o C.O.R.E. 8 absorve a semana que desanda.",
    body: "Imprevistos não são exceção — são a regra. O protocolo foi construído para eles. Quando a semana complica, você remeja. O coach analisa. O protocolo continua.",
  },
];

export function HeroParallax() {
  return (
    <div className="bg-[#05080f]">
      {/* Hero headline fixo antes do parallax */}
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-6 pt-20">
        <span className="text-xs font-semibold uppercase tracking-widest text-[#22c55e] mb-4">
          Método INTEGR8 · Protocolo C.O.R.E. 8
        </span>
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-white max-w-3xl leading-[1.05]">
          Mais energia,<br />corpo que responde.
        </h1>
        <p className="mt-6 text-lg md:text-xl text-[#64748b] max-w-xl leading-relaxed">
          Sem abrir mão da vida que você já tem.
        </p>
        <a
          href="#como-funciona"
          className="mt-10 inline-flex items-center gap-2 bg-[#22c55e] text-black font-bold px-8 py-3.5 rounded-full hover:bg-[#16a34a] transition-colors text-sm"
        >
          Quero entender <FiArrowRight />
        </a>
      </div>

      {/* Parallax blocks */}
      <div id="como-funciona">
        {blocks.map((block, i) => (
          <ParallaxSection key={i} {...block} />
        ))}
      </div>
    </div>
  );
}

function ParallaxSection({ imgUrl, subheading, heading, body }: ParallaxBlock) {
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
    offset: ["end end", "end start"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.85]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <motion.div
      style={{
        backgroundImage: `url(${imgUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: `calc(100vh - ${IMG_PADDING * 2}px)`,
        top: IMG_PADDING,
        scale,
      }}
      ref={targetRef}
      className="sticky z-0 overflow-hidden rounded-3xl"
    >
      <motion.div
        className="absolute inset-0 bg-[#05080f]/60"
        style={{ opacity }}
      />
    </motion.div>
  );
}

function OverlayCopy({
  subheading,
  heading,
}: {
  subheading: string;
  heading: string;
}) {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [250, -250]);
  const opacity = useTransform(
    scrollYProgress,
    [0.25, 0.5, 0.75],
    [0, 1, 0]
  );

  return (
    <motion.div
      style={{ y, opacity }}
      ref={targetRef}
      className="absolute left-0 top-0 flex h-screen w-full flex-col items-center justify-center text-white px-6 text-center"
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

function BlockContent({
  heading,
  body,
}: {
  heading: string;
  body: string;
}) {
  return (
    <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 px-4 pb-24 pt-12 md:grid-cols-12">
      <h2 className="col-span-1 text-2xl font-bold md:col-span-4 text-white">
        {heading}
      </h2>
      <div className="col-span-1 md:col-span-8">
        <p className="text-lg text-[#64748b] leading-relaxed">{body}</p>
      </div>
    </div>
  );
}
