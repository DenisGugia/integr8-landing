// lib/i18n/context.tsx
"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { pt, type Translations } from './translations/pt';
import { en } from './translations/en';
import { es } from './translations/es';

type Locale = "pt" | "en" | "es";
const STORAGE_KEY = "integr8-locale";
const translations: Record<Locale, Translations> = { pt: pt as unknown as Translations, en, es };

function detectLocale(): Locale {
  if (typeof window === "undefined") return "pt";
  const saved = localStorage.getItem(STORAGE_KEY) as Locale | null;
  if (saved && saved in translations) return saved;
  const lang = navigator.language.toLowerCase();
  if (lang.startsWith("pt")) return "pt";
  if (lang.startsWith("en")) return "en";
  if (lang.startsWith("es")) return "es";
  return "pt";
}

interface I18nContextValue {
  locale: Locale;
  t: Translations;
  setLocale: (locale: Locale) => void;
}

const I18nContext = createContext<I18nContextValue | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("pt"); // SSR default: PT

  useEffect(() => {
    setLocaleState(detectLocale()); // client: detect real preference
  }, []);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem(STORAGE_KEY, newLocale);
  };

  const value: I18nContextValue = {
    locale,
    t: translations[locale],
    setLocale,
  };

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useTranslation() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("useTranslation must be used within I18nProvider");
  }
  return context;
}
