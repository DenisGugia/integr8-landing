"use client";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { galleryImages } from "@/data/gallery-images";

const WA = "https://wa.me/12269617351?text=Quero+come%C3%A7ar+meu+protocolo";

function shuffle<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function ShuffleGrid() {
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [squares, setSquares] = useState(() =>
    shuffle(galleryImages).map((img) => (
      <motion.div
        key={img.id}
        layout
        transition={{ duration: 1.5, type: "spring" }}
        className="w-full h-full rounded-sm"
        style={{
          backgroundImage: `url(${img.src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundColor: "#1e293b",
        }}
      />
    ))
  );

  const shuffleSquares = () => {
    setSquares(
      shuffle(galleryImages).map((img) => (
        <motion.div
          key={img.id}
          layout
          transition={{ duration: 1.5, type: "spring" }}
          className="w-full h-full rounded-sm"
          style={{
            backgroundImage: `url(${img.src})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundColor: "#1e293b",
          }}
        />
      ))
    );
    timeoutRef.current = setTimeout(shuffleSquares, 3000);
  };

  useEffect(() => {
    shuffleSquares();
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="grid grid-cols-4 grid-rows-4 h-[450px] gap-1 flex-shrink-0 w-full md:w-auto md:min-w-[360px]">
      {squares}
    </div>
  );
}

export function LifestyleGallery() {
  return (
    <section className="w-full px-6 py-24 bg-[#0d1117]">
      <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-16 max-w-5xl mx-auto">
        <div>
          <span className="text-xs font-semibold uppercase tracking-widest text-[#22c55e]">
            A rotina que você já tem
          </span>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white mt-3 mb-6 leading-tight">
            Com mais energia.
          </h2>
          <p className="text-[#64748b] text-lg leading-relaxed mb-8">
            O C.O.R.E. 8 não pede que você abra mão de nada. Ele cabe na semana
            que você já tem — reunião às 18h, filho que precisa de você às 19h, jantar real.
          </p>
          <a
            href={WA}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#22c55e] text-black font-bold px-8 py-3.5 rounded-full hover:bg-[#16a34a] transition-colors text-sm"
          >
            Quero começar meu protocolo →
          </a>
        </div>
        <ShuffleGrid />
      </div>
    </section>
  );
}
