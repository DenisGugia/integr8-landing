// components/ui/LanguageSwitcher.tsx
"use client";

import { useTranslation } from "@/lib/i18n/context";

const flags = [
  { locale: "pt" as const, flag: "🇧🇷", label: "Português" },
  { locale: "en" as const, flag: "🇺🇸", label: "English" },
  { locale: "es" as const, flag: "🇪🇸", label: "Español" },
];

export function LanguageSwitcher() {
  const { locale, setLocale } = useTranslation();

  return (
    <div className="flex items-center gap-2">
      {flags.map(({ locale: l, flag, label }) => (
        <button
          key={l}
          onClick={() => setLocale(l)}
          aria-label={label}
          title={label}
          className={`text-base leading-none transition-opacity ${locale === l ? "opacity-100" : "opacity-40 hover:opacity-70"}`}
        >
          {flag}
        </button>
      ))}
    </div>
  );
}
