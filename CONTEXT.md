# CONTEXT.md — integr8-landing

Complete project context. A fresh Claude instance should be able to resume this project by reading only this file.

---

## 1. Project Overview

Landing page for **Método INTEGR8 / Protocolo C.O.R.E. 8**, a fitness coaching service by Denis (personal trainer, based in Canada). The page sells a 16-week coached fitness protocol to Portuguese-speaking professionals who have tried and failed standard fitness programs due to incompatible routines.

Primary CTA: WhatsApp `https://wa.me/12269617351`

**Business context:**
- Service is sold in CAD$ (Denis is in Canada, clients mostly Brazilian expats or Brazil-based)
- Three plans: Monthly (CAD$69.90/mo), 4-Month (CAD$49.90/mo), Annual (CAD$44.90/mo)
- 21-day money-back guarantee, no-questions-asked
- Group pricing: CAD$45.90/mo per person (3+)

---

## 2. Tech Stack

| Layer | Choice | Version |
|---|---|---|
| Framework | Next.js App Router | 16.2.1 |
| Language | TypeScript (strict) | ^5 |
| Styling | Tailwind CSS v4 | ^4 |
| UI primitives | shadcn/ui (Base UI) | via `shadcn` CLI |
| Animation (scroll) | Framer Motion | ^12 |
| Animation (cinematic) | GSAP + ScrollTrigger | ^3 |
| Dark mode | next-themes | ^0.4.6 |
| Icons | lucide-react, react-icons | latest |
| Font | Inter (Google Fonts) | via next/font |
| Deployment target | Vercel (or Netlify) | — |

**No i18n library.** Custom React context with `navigator.language` detection and `localStorage` persistence. Zero bundle overhead.

---

## 3. File Structure

```
integr8-landing/
├── app/
│   ├── globals.css          # Tailwind v4 + dual-theme CSS variables
│   ├── layout.tsx           # ThemeProvider + I18nProvider + metadata
│   └── page.tsx             # Single page: assembles all sections in order
├── components/
│   ├── layout/
│   │   └── Navbar.tsx       # Two-row header: utility bar (flags+toggle) + main nav
│   ├── sections/
│   │   ├── HeroParallax.tsx         # Full-screen hero + scroll parallax blocks
│   │   ├── IdentificationSection.tsx # Pain points list
│   │   ├── ComparisonTable.tsx       # Two-column "common vs C.O.R.E. 8" table
│   │   ├── PillarsOrbital.tsx        # Radial orbital timeline of 8 pillars
│   │   ├── DenisStory.tsx            # Denis biography + quote
│   │   ├── AppCinematic.tsx          # GSAP scroll-pinned app showcase
│   │   ├── BeforeAfterSection.tsx    # Scroll-driven image comparison slider
│   │   ├── LifestyleGallery.tsx      # Shuffling image grid + CTA
│   │   ├── PricingSection.tsx        # 3 pricing cards + WebGL background
│   │   └── FaqCta.tsx                # FAQ accordion + guarantee + final CTA
│   └── ui/
│       ├── ThemeToggle.tsx           # ☀️/🌙 pill toggle
│       ├── LanguageSwitcher.tsx      # 🇧🇷🇺🇸🇪🇸 flag buttons
│       ├── image-comparison.tsx      # Before/after slider with controlledPosition
│       ├── accordion.tsx             # shadcn accordion
│       ├── badge.tsx                 # shadcn badge
│       ├── button.tsx                # shadcn button
│       ├── card.tsx                  # shadcn card
│       └── ripple-button.tsx         # Button with ripple effect
├── data/
│   ├── pillars.ts           # Pillar structural data (id, icon, relatedIds, status, energy)
│   ├── pricing.ts           # Plan pricing data (price, priceAVista, isPopular, etc.)
│   └── gallery-images.ts    # Unsplash URLs for lifestyle grid
├── lib/
│   ├── utils.ts             # cn() helper (clsx + tailwind-merge)
│   └── i18n/
│       ├── context.tsx      # I18nProvider + useTranslation hook
│       └── translations/
│           ├── pt.ts        # PT-BR (source of truth + Translations type)
│           ├── en.ts        # English
│           └── es.ts        # Spanish
├── public/
│   └── placeholders/        # Images go here (not committed)
│       ├── hero-1.jpg, hero-2.jpg, hero-3.jpg
│       ├── denis-photo.jpg
│       ├── app-screen.gif
│       ├── casal-before.jpg
│       └── casal-after.jpg
├── docs/
│   └── superpowers/
│       ├── specs/2026-03-26-dark-mode-i18n-scroll-slider-design.md
│       └── plans/2026-03-26-dark-mode-i18n-scroll-slider.md
├── CONTEXT.md               # This file
├── package.json
└── tsconfig.json
```

---

## 4. Implemented Features

### Dark / Light Mode
- `next-themes` with `attribute="class"`, `defaultTheme="system"`, `enableSystem`
- `suppressHydrationWarning` on `<html>` prevents flash of wrong theme (FOWT)
- Palette: light = `#f8fafc` bg / dark = `#05080f` bg; same green `#22c55e` + blue `#3b82f6` accents in both modes
- Toggle in utility bar (☀️/🌙 pill)
- CSS variables: `--bg`, `--surface`, `--card-bg`, `--border-custom`, `--text` (no collision with shadcn's `--muted`/`--accent`)
- WebGL shader in PricingSection uses `uniform vec3 uBgColor` updated via `useEffect` on theme change

### Multilanguage (PT-BR / EN / ES)
- Custom React context: `I18nProvider` + `useTranslation()` hook
- Detection order: `localStorage` → `navigator.language` → fallback PT
- SSR default: PT (hydration-safe); client-side real detection in `useEffect`
- Persistence: `localStorage` key `integr8-locale`
- Flag switcher in utility bar
- All visible strings live in `lib/i18n/translations/*.ts`
- Data files (`data/pillars.ts`, `data/pricing.ts`) keep only structural/numeric data; text merged at component level via `t.section.items[i]`

### Scroll-Driven Before/After Slider
- `useScroll({ target: sectionRef, offset: ["start center", "end center"] })` → `scrollYProgress`
- `useTransform(scrollYProgress, [0, 1], [0, 100])` → `sliderPosition` (MotionValue\<number\>)
- Passed as `controlledPosition` prop to `ImageComparison`
- When `controlledPosition` is provided: drag/hover events disabled, spring bypassed
- Caption: "Role para revelar →" (not "Arraste...")

### Section Animations
- Framer Motion `whileInView` entrance animations on all sections
- GSAP ScrollTrigger pinned cinematic sequence on AppCinematic (4000px scroll)
- Radial orbital auto-rotation on PillarsOrbital (click node to expand)

---

## 5. Roadmap / Known Gaps

These are **not yet done** and represent future work:

- **Real images**: all `public/placeholders/` images are missing — need actual photos from Denis (before/after, hero shots, Denis portrait, app screenshot GIF)
- **App integration**: `AppCinematic` shows a placeholder for the app screen — replace `/placeholders/app-screen.gif` with real app demo when available
- **Locale-aware prices**: prices are hardcoded in CAD$; if Denis adds BRL pricing, the data layer is ready (just add to `data/pricing.ts` and translation files)
- **Analytics**: no tracking implemented yet
- **SEO**: `metadata` in `layout.tsx` is minimal; add OG image, Twitter card, structured data
- **Form / Checkout**: currently all CTAs go to WhatsApp; if a checkout flow is added later, `PricingSection` card buttons can be swapped
- **App redirect**: Denis mentioned a "PT Pro" app and an onboarding flow (see Section 9)

---

## 6. Key Technical Decisions

### Tailwind v4 dark mode
`@custom-variant dark (&:is(.dark *))` in `globals.css`. There is **no `light:` variant**. Pattern: base class = light style, `dark:` prefix = dark style.

```tsx
// CORRECT
className="bg-white dark:bg-[#05080f] text-slate-900 dark:text-white"

// WRONG — light: does not exist in Tailwind v4
className="light:bg-white dark:bg-[#05080f]"
```

### CSS variable safety
shadcn reserves `--muted` and `--accent`. Custom palette uses `--bg`, `--surface`, `--card-bg`, `--border-custom`, `--text` only.

### i18n type safety
`pt.ts` exports `as const` + `DeepWriteable<typeof pt>` = `Translations`. EN and ES import `type Translations` and enforce full parity. Any missing key is a compile error.

### Data / translation split
- `data/pillars.ts`: `id`, `icon`, `relatedIds`, `status`, `energy` (no strings)
- `data/pricing.ts`: `price`, `priceAVista`, `isPopular`, `buttonVariant`, `whatsappLink` (no strings)
- Strings (titles, descriptions, feature lists) live exclusively in translation files
- Merge at component level: `pillars.map((p, i) => ({ ...p, ...t.pillars.items[i] }))`

### ImageComparison controlledPosition
`controlledPosition?: MotionValue<number>` (0–100). When provided, internal `useMotionValue + useSpring` is bypassed. All drag/touch handlers check `!isControlled` before acting.

### WebGL shader theming
`PricingSection` has an animated WebGL canvas. Background color was previously hardcoded as `vec3(0.02,0.03,0.06)`. Now uses `uniform vec3 uBgColor` updated via two `useEffect`s: one on mount (sets initial value from `resolvedTheme`), one watching `theme` changes.

### GSAP AppCinematic
Uses CSS variables (`var(--bg)`, `var(--surface)`) in injected `<style>` tag instead of hardcoded hex values, so it responds to theme switches.

### LifestyleGallery hydration
`ShuffleGrid` initializes `squares` as `useState<React.ReactNode[]>([])` and populates in `useEffect` to avoid SSR/client mismatch.

---

## 7. Running Locally

```bash
cd C:/Users/denis/integr8-landing
npm install
npm run dev
# Open http://localhost:3000
```

TypeScript check:
```bash
npx tsc --noEmit
```

Production build:
```bash
npm run build
```

---

## 8. Deploying to Vercel

The project is a standard Next.js App Router app with no server-side requirements — deploys as static + edge.

**Via Vercel MCP (Claude has access):**
```
Use mcp__a957315b-...__deploy_to_vercel
```

**Via CLI:**
```bash
npm i -g vercel
vercel --prod
```

**Via GitHub:**
1. Push to GitHub
2. Import repo at vercel.com/new
3. Framework: Next.js (auto-detected)
4. No environment variables needed for base deploy
5. Click Deploy

No `next.config.js` overrides needed. Images from `public/placeholders/` are static assets — no `next/image` domain config required unless switching to remote URLs later.

---

## 9. Integration with PT Pro and Onboarding

Denis mentioned two external systems that this landing page feeds into:

- **PT Pro**: The app used to deliver the protocol (workouts, nutrition tracking, biometrics). The `AppCinematic` section showcases it. There is no deep link yet — `/placeholders/app-screen.gif` is a placeholder.
- **Onboarding**: The 21-day onboarding period starts after the client clicks a WhatsApp CTA. There is no automated onboarding form/flow yet — all intake happens via WhatsApp conversation.

**When these integrations are built**, the touch points are:
- `PricingSection` card buttons (currently open WhatsApp) → could open checkout or Typeform
- `FaqCta` final CTA button → same
- `AppCinematic` CTA layer → could deep-link to App Store / Play Store
- `Navbar` CTA → WhatsApp, probably stays as-is

---

## 10. Complete Code of Main Files

### `app/globals.css`

```css
@import "tailwindcss";
@import "tw-animate-css";
@import "shadcn/tailwind.css";

@custom-variant dark (&:is(.dark *));

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --font-sans: var(--font-sans);
  --font-mono: var(--font-geist-mono);
  --font-heading: var(--font-sans);
  /* ... (shadcn sidebar/chart vars) ... */
}

/* Light mode (default) */
:root {
  --bg:           #f8fafc;
  --surface:      #ffffff;
  --card-bg:      #f1f5f9;
  --border-custom:#e2e8f0;
  --text:         #0f172a;

  --background: oklch(1 0 0);
  --foreground: oklch(0.145 0 0);
  /* ... shadcn vars ... */
  --radius: 0.625rem;
}

/* Dark mode */
.dark {
  --bg:           #05080f;
  --surface:      #0d1117;
  --card-bg:      #111827;
  --border-custom:#1e293b;
  --text:         #f1f5f9;

  --background: oklch(0.145 0 0);
  --foreground: oklch(0.985 0 0);
  /* ... shadcn vars ... */
}

@layer base {
  * { @apply border-border outline-ring/50; }
  body { @apply bg-background text-foreground; -webkit-font-smoothing: antialiased; }
  html { @apply font-sans; scroll-behavior: smooth; }
}

::-webkit-scrollbar { width: 4px; }
::-webkit-scrollbar-track { background: var(--bg); }
::-webkit-scrollbar-thumb { background: var(--border-custom); border-radius: 2px; }
```

### `app/layout.tsx`

```tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { I18nProvider } from "@/lib/i18n/context";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Protocolo C.O.R.E. 8 · Método INTEGR8",
  description: "Mais energia, corpo que responde. Sem abrir mão da vida que você já tem.",
  openGraph: {
    title: "Protocolo C.O.R.E. 8 · Método INTEGR8",
    description: "Assessoria fitness para quem cuida de tudo. Menos de si.",
    locale: "pt_BR",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <I18nProvider>
            {children}
          </I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
```

### `app/page.tsx`

```tsx
import { Navbar } from "@/components/layout/Navbar";
import { HeroParallax } from "@/components/sections/HeroParallax";
import { IdentificationSection } from "@/components/sections/IdentificationSection";
import { ComparisonTable } from "@/components/sections/ComparisonTable";
import { PillarsOrbital } from "@/components/sections/PillarsOrbital";
import { DenisStory } from "@/components/sections/DenisStory";
import { AppCinematic } from "@/components/sections/AppCinematic";
import { BeforeAfterSection } from "@/components/sections/BeforeAfterSection";
import { LifestyleGallery } from "@/components/sections/LifestyleGallery";
import { PricingSection } from "@/components/sections/PricingSection";
import { FaqCta } from "@/components/sections/FaqCta";

export default function HomePage() {
  return (
    <main>
      <Navbar />
      <HeroParallax />
      <IdentificationSection />
      <ComparisonTable />
      <PillarsOrbital />
      <DenisStory />
      <AppCinematic />
      <BeforeAfterSection />
      <LifestyleGallery />
      <PricingSection />
      <FaqCta />
    </main>
  );
}
```

### `lib/i18n/context.tsx`

```tsx
"use client";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { pt, type Translations } from "./translations/pt";
import { en } from "./translations/en";
import { es } from "./translations/es";

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
  const [locale, setLocaleState] = useState<Locale>("pt");

  useEffect(() => {
    setLocaleState(detectLocale());
  }, []);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem(STORAGE_KEY, newLocale);
  };

  return (
    <I18nContext.Provider value={{ locale, t: translations[locale], setLocale }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(I18nContext);
  if (!context) throw new Error("useTranslation must be used within I18nProvider");
  return context;
}
```

### `lib/i18n/translations/pt.ts` (structure — see full file on disk)

Translation keys used across the app:

```
nav.cta
hero.{ eyebrow, headline, sub, cta, blocks[].{ subheading, heading, body } }
identification.{ eyebrow, headline, items[], cta }
comparison.{ eyebrow, headline, colCommon, colCore, rows[].{ common, core } }
pillars.{ eyebrow, headline, statusLabels.{ completed, in-progress, pending }, items[].{ title, shortTitle, date, content } }
denis.{ eyebrow, headline, body[], quote, quoteAttrib }
appCinematic.{ eyebrow, headline, features[] }
beforeAfter.{ eyebrow, headline, labelBefore, labelAfter, caption }
lifestyle.{ eyebrow, headline, body, cta }
pricing.{ eyebrow, headline, perMonth, avista, avistaSuffix, popular, currency, plans[].{ planName, description, features[], buttonText } }
faq.{ eyebrow, headline, items[].{ q, a }, guarantee, guaranteeBody, ctaHeadline, ctaBody, ctaButton }
```

EN and ES files import `type Translations` from `pt.ts` — compile error if a key is missing.

### `data/pillars.ts`

```ts
import { Dumbbell, Apple, Scale, Activity, Footprints, Droplets, Moon, Camera } from "lucide-react";
import type { ElementType } from "react";

export interface Pillar {
  id: number;
  icon: ElementType;
  relatedIds: number[];
  status: "completed" | "in-progress" | "pending";
  energy: number;
}

export const pillars: Pillar[] = [
  { id: 1, icon: Dumbbell,   relatedIds: [7, 8], status: "completed",   energy: 95 },
  { id: 2, icon: Apple,      relatedIds: [3, 5], status: "completed",   energy: 90 },
  { id: 3, icon: Scale,      relatedIds: [2, 4], status: "completed",   energy: 85 },
  { id: 4, icon: Activity,   relatedIds: [3, 8], status: "in-progress", energy: 80 },
  { id: 5, icon: Footprints, relatedIds: [2, 6], status: "in-progress", energy: 75 },
  { id: 6, icon: Droplets,   relatedIds: [4, 5], status: "pending",     energy: 70 },
  { id: 7, icon: Moon,       relatedIds: [1, 8], status: "pending",     energy: 88 },
  { id: 8, icon: Camera,     relatedIds: [1, 4], status: "pending",     energy: 92 },
];
```

### `data/pricing.ts`

```ts
const WA = "https://wa.me/12269617351?text=Quero+come%C3%A7ar+meu+protocolo";

export const plans = [
  { price: "69,90", priceAVista: "66,40",  buttonVariant: "secondary", whatsappLink: WA },
  { price: "49,90", priceAVista: "189,60", isPopular: true, buttonVariant: "primary", whatsappLink: WA },
  { price: "44,90", priceAVista: "511,85", buttonVariant: "secondary", whatsappLink: WA },
];
```

### `components/ui/image-comparison.tsx` — key addition

```tsx
export type ImageComparisonProps = {
  children: React.ReactNode;
  className?: string;
  enableHover?: boolean;
  springOptions?: SpringOptions;
  controlledPosition?: MotionValue<number>; // 0–100; when provided, disables drag
};

// Inside ImageComparison:
const isControlled = !!controlledPosition;
const motionSliderPosition = controlledPosition ?? internalSpring;
// All drag handlers check `if (isControlled) return;`
```

### `components/sections/BeforeAfterSection.tsx` — key pattern

```tsx
const { scrollYProgress } = useScroll({
  target: sectionRef,
  offset: ["start center", "end center"],
});
const sliderPosition = useTransform(scrollYProgress, [0, 1], [0, 100]);
// ...
<ImageComparison controlledPosition={sliderPosition}>
```

### `components/sections/PricingSection.tsx` — WebGL theming pattern

```tsx
// Mount effect: sets initial color from theme
useEffect(() => {
  // ... setup WebGL, get uBgColorRef ...
  if (theme === "dark") gl.uniform3f(loc, 0.02, 0.03, 0.06);
  else                  gl.uniform3f(loc, 0.97, 0.98, 0.99);
}, []);

// Theme change effect: updates color live
useEffect(() => {
  const gl = glRef.current;
  const loc = uBgColorRef.current;
  if (!gl || !loc) return;
  if (programRef.current) gl.useProgram(programRef.current);
  if (theme === "dark") gl.uniform3f(loc, 0.02, 0.03, 0.06);
  else                  gl.uniform3f(loc, 0.97, 0.98, 0.99);
}, [theme]);
```

---

## Git History (as of 2026-03-29)

```
3c1d234 feat: dark mode + i18n for FaqCta; delete data/faq.ts
3e3378d feat: dark mode + i18n for PricingSection; WebGL shader uBgColor uniform
038d5b7 feat: dark mode + i18n for LifestyleGallery; confirm SSR hydration fix
9c4542d feat: dark mode + i18n for AppCinematic; replace injected hex with CSS variables
c6e928c feat: dark mode + i18n for DenisStory
23d3f8f feat: dark mode + i18n for PillarsOrbital; migrate string fields to translations
c067795 feat: dark mode + i18n for ComparisonTable
ed188db feat: dark mode + i18n for IdentificationSection
0d14d2d feat: dark mode + i18n for HeroParallax
b24e3ca feat: scroll-driven before/after slider; dark mode + i18n
5e6811c feat: add controlledPosition prop to ImageComparison for scroll-driven control
29c2c97 feat: add utility bar with ThemeToggle and LanguageSwitcher to Navbar
919f974 feat: add LanguageSwitcher component
468293b feat: add ThemeToggle component
6641650 feat: wrap app in I18nProvider
475ae5e feat: add I18nProvider and useTranslation hook
d2ca4de feat: add EN and ES translation files
95bdf8a feat: add PT-BR translation file with all page strings
04abc57 feat: add ThemeProvider with system detection and FOWT prevention
c46d883 style: add dual-theme CSS variables (light/dark) to globals.css
e4696c6 chore: install next-themes
```
