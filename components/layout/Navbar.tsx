// components/layout/Navbar.tsx
"use client";

const WA = "https://wa.me/12269617351";

export function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-[#1e293b]/60 bg-[#05080f]/80 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        <span className="font-black text-lg tracking-tighter text-white">
          INTEGR<span className="text-[#22c55e]">8</span>
        </span>
        <a
          href={WA}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-semibold bg-[#22c55e] text-black px-4 py-1.5 rounded-full hover:bg-[#16a34a] transition-colors"
        >
          Falar com o coach
        </a>
      </div>
    </header>
  );
}
