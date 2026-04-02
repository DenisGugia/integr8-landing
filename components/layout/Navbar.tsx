// components/layout/Navbar.tsx
"use client";

import { WA_ROUTES } from "@/data/constants";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";
import { useTranslation } from "@/lib/i18n/context";

import Link from "next/link";

const WA = WA_ROUTES.contact;

export function Navbar() {
  const { t } = useTranslation();

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <nav aria-label="Barra de Utilidades" className="bg-slate-100/90 dark:bg-[#030509]/90 border-b border-slate-200/60 dark:border-slate-800/40 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6 h-8 flex items-center justify-between">
          <LanguageSwitcher />
          <div className="flex items-center gap-3">
            <div className="w-px h-4 bg-slate-300 dark:bg-slate-700" />
            <ThemeToggle />
          </div>
        </div>
      </nav>

      <nav aria-label="Navegação Principal" className="border-b border-slate-200/60 dark:border-[#1e293b]/60 bg-white/80 dark:bg-[#05080f]/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link href="/" className="font-black text-lg tracking-tighter text-slate-900 dark:text-white hover:opacity-80 transition-opacity">
            INTEGR<span className="text-[#22c55e]">8</span>
          </Link>
          <a
            href={WA}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold bg-[#22c55e] text-black px-4 py-1.5 rounded-full hover:bg-[#16a34a] transition-colors"
          >
            {t.nav.cta}
          </a>
        </div>
      </nav>
    </header>
  );
}
