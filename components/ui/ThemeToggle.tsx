// components/ui/ThemeToggle.tsx
"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return <div className="w-14 h-5" />; // prevent hydration mismatch

  const isDark = resolvedTheme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="flex items-center gap-1.5 text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 transition-colors"
      aria-label={isDark ? "Ativar modo claro" : "Ativar modo escuro"}
    >
      <span className={`text-xs transition-opacity ${isDark ? "opacity-40" : "opacity-100"}`}>☀️</span>
      <div className={`relative w-9 h-5 rounded-full transition-colors duration-200 ${isDark ? "bg-[#22c55e]" : "bg-slate-300"}`}>
        <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform duration-200 ${isDark ? "translate-x-4" : "translate-x-0.5"}`} />
      </div>
      <span className={`text-xs transition-opacity ${isDark ? "opacity-100" : "opacity-40"}`}>🌙</span>
    </button>
  );
}
