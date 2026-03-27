# Dark Mode + i18n + Scroll-Driven Slider — Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add system-aware dark/light mode, three-language support (PT-BR/EN/ES) with auto-detection, and scroll-driven before/after slider to the INTEGR8 landing page.

**Architecture:** `next-themes` handles dark/light with zero flash via SSR-safe class injection; a custom React context provides i18n with no bundle overhead; the existing framer-motion `useScroll` drives the before/after slider. All 9 section components are touched once to apply both dark-mode variants and i18n text replacement.

**Tech Stack:** Next.js 16 App Router · Tailwind v4 · TypeScript · next-themes · framer-motion (already installed) · React context

---

## Chunk 1: Foundation

### Task 1: Install next-themes

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Install dependency**

```bash
cd C:/Users/denis/integr8-landing
npm install next-themes
```

Expected: next-themes in `dependencies` in `package.json`.

- [ ] **Step 2: Verify**

```bash
npx tsc --noEmit 2>&1 | head -20
```

Expected: 0 errors.

- [ ] **Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: install next-themes"
```

---

### Task 2: Update globals.css — dual-theme CSS variables

**Files:**
- Modify: `app/globals.css`

The current `:root` defines dark values only and the `body` override hard-codes the dark background, blocking theming. Replace the entire content from line 51 to EOF.

**Important:** Do NOT add custom `--muted` or `--accent` variables — those names are already used by shadcn and would be silently overwritten. Only `--bg`, `--surface`, `--card-bg`, `--border-custom`, and `--text` are safe custom names here.

- [ ] **Step 1: Replace from line 51 to end of file with:**

```css
/* ─── Light mode (default) ─── */
:root {
  --bg:           #f8fafc;
  --surface:      #ffffff;
  --card-bg:      #f1f5f9;
  --border-custom:#e2e8f0;
  --text:         #0f172a;

  --background: oklch(1 0 0);
  --foreground: oklch(0.145 0 0);
  --card: oklch(1 0 0);
  --card-foreground: oklch(0.145 0 0);
  --popover: oklch(1 0 0);
  --popover-foreground: oklch(0.145 0 0);
  --primary: oklch(0.205 0 0);
  --primary-foreground: oklch(0.985 0 0);
  --secondary: oklch(0.97 0 0);
  --secondary-foreground: oklch(0.205 0 0);
  --muted: oklch(0.97 0 0);
  --muted-foreground: oklch(0.556 0 0);
  --accent: oklch(0.97 0 0);
  --accent-foreground: oklch(0.205 0 0);
  --destructive: oklch(0.577 0.245 27.325);
  --border: oklch(0.922 0 0);
  --input: oklch(0.922 0 0);
  --ring: oklch(0.708 0 0);
  --chart-1: oklch(0.87 0 0);
  --chart-2: oklch(0.556 0 0);
  --chart-3: oklch(0.439 0 0);
  --chart-4: oklch(0.371 0 0);
  --chart-5: oklch(0.269 0 0);
  --radius: 0.625rem;
  --sidebar: oklch(0.985 0 0);
  --sidebar-foreground: oklch(0.145 0 0);
  --sidebar-primary: oklch(0.205 0 0);
  --sidebar-primary-foreground: oklch(0.985 0 0);
  --sidebar-accent: oklch(0.97 0 0);
  --sidebar-accent-foreground: oklch(0.205 0 0);
  --sidebar-border: oklch(0.922 0 0);
  --sidebar-ring: oklch(0.708 0 0);
}

/* ─── Dark mode ─── */
.dark {
  --bg:           #05080f;
  --surface:      #0d1117;
  --card-bg:      #111827;
  --border-custom:#1e293b;
  --text:         #f1f5f9;

  --background: oklch(0.145 0 0);
  --foreground: oklch(0.985 0 0);
  --card: oklch(0.205 0 0);
  --card-foreground: oklch(0.985 0 0);
  --popover: oklch(0.205 0 0);
  --popover-foreground: oklch(0.985 0 0);
  --primary: oklch(0.922 0 0);
  --primary-foreground: oklch(0.205 0 0);
  --secondary: oklch(0.269 0 0);
  --secondary-foreground: oklch(0.985 0 0);
  --muted: oklch(0.269 0 0);
  --muted-foreground: oklch(0.708 0 0);
  --accent: oklch(0.269 0 0);
  --accent-foreground: oklch(0.985 0 0);
  --destructive: oklch(0.704 0.191 22.216);
  --border: oklch(1 0 0 / 10%);
  --input: oklch(1 0 0 / 15%);
  --ring: oklch(0.556 0 0);
  --chart-1: oklch(0.87 0 0);
  --chart-2: oklch(0.556 0 0);
  --chart-3: oklch(0.439 0 0);
  --chart-4: oklch(0.371 0 0);
  --chart-5: oklch(0.269 0 0);
  --sidebar: oklch(0.205 0 0);
  --sidebar-foreground: oklch(0.985 0 0);
  --sidebar-primary: oklch(0.488 0.243 264.376);
  --sidebar-primary-foreground: oklch(0.985 0 0);
  --sidebar-accent: oklch(0.269 0 0);
  --sidebar-accent-foreground: oklch(0.985 0 0);
  --sidebar-border: oklch(1 0 0 / 10%);
  --sidebar-ring: oklch(0.556 0 0);
}

@layer base {
  * {
    @apply border-border outline-ring/50;
  }
  body {
    @apply bg-background text-foreground;
    -webkit-font-smoothing: antialiased;
  }
  html {
    @apply font-sans;
    scroll-behavior: smooth;
  }
}

::-webkit-scrollbar { width: 4px; }
::-webkit-scrollbar-track { background: var(--bg); }
::-webkit-scrollbar-thumb { background: var(--border-custom); border-radius: 2px; }
```

- [ ] **Step 2: Verify**

```bash
npx tsc --noEmit 2>&1 | head -20
```

Expected: 0 errors.

- [ ] **Step 3: Commit**

```bash
git add app/globals.css
git commit -m "style: add dual-theme CSS variables (light/dark) to globals.css"
```

---

### Task 3: Update layout.tsx — ThemeProvider + suppressHydrationWarning

**Files:**
- Modify: `app/layout.tsx`

- [ ] **Step 1: Replace layout.tsx**

```tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Protocolo C.O.R.E. 8 · Método INTEGR8",
  description: "Mais energia, corpo que responde. Sem abrir mão da vida que você já tem.",
  openGraph: {
    title: "Protocolo C.O.R.E. 8 · Método INTEGR8",
    description: "Assessoria fitness para quem cuida de tudo. Menos de si.",
    locale: "pt_BR",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
```

Note: `suppressHydrationWarning` on `<html>` prevents React from warning about the class attribute change next-themes makes before hydration. `I18nProvider` will be added after the i18n context is created (Task 7).

- [ ] **Step 2: Verify TypeScript**

```bash
npx tsc --noEmit 2>&1 | head -20
```

Expected: 0 errors.

- [ ] **Step 3: Build check**

```bash
npm run build 2>&1 | tail -10
```

Expected: `✓ Compiled successfully`.

- [ ] **Step 4: Commit**

```bash
git add app/layout.tsx
git commit -m "feat: add ThemeProvider with system detection and FOWT prevention"
```

---

## Chunk 2: i18n System

### Task 4: Create PT-BR translation file

**Files:**
- Create: `lib/i18n/translations/pt.ts`

This file must contain every user-visible string on the page. Steps 1–9 read each component file to extract the exact strings; Step 10 writes the file.

- [ ] **Step 1: Create directory**

```bash
mkdir -p C:/Users/denis/integr8-landing/lib/i18n/translations
```

- [ ] **Step 2: Read HeroParallax and note all strings**

Open `components/sections/HeroParallax.tsx`. Write down: eyebrow text, headline(s), subheadline(s), CTA button text, each parallax block title/body/cta.

- [ ] **Step 3: Read IdentificationSection and note all strings**

Open `components/sections/IdentificationSection.tsx`. Write down: eyebrow, headline, each checkpoint item text, CTA text. Count the items.

- [ ] **Step 4: Read ComparisonTable and note all strings**

Open `components/sections/ComparisonTable.tsx`. Write down: eyebrow, headline, column headers, each row label/common/core values.

- [ ] **Step 5: Read DenisStory and note all strings**

Open `components/sections/DenisStory.tsx`. Write down: eyebrow, headline, paragraphs, blockquote text and attribution.

- [ ] **Step 6: Read AppCinematic and note all strings**

Open `components/sections/AppCinematic.tsx`. Write down: eyebrow, headline, feature labels visible in the cinematic section.

- [ ] **Step 7: Read BeforeAfterSection and note all strings**

Open `components/sections/BeforeAfterSection.tsx`. Write down: eyebrow, headline, before/after label text, caption/instruction text (note: this will change from "arraste" to "role" — see beforeAfter.caption below).

- [ ] **Step 8: Read PricingSection and FaqCta and note all strings**

Open `components/sections/PricingSection.tsx`. Write down: eyebrow, headline, currency label, per-month suffix.
Open `components/sections/FaqCta.tsx`. Write down: eyebrow, headline, guarantee title and body, CTA headline/body/button.

- [ ] **Step 9: Read Navbar for nav.cta**

Open `components/layout/Navbar.tsx`. Confirm nav CTA text.

- [ ] **Step 10: Write pt.ts skeleton (without `as const` — added in Step 11)**

Note: Do NOT run `tsc` after this step. The skeleton has empty arrays that will fail TypeScript until Step 11 fills them in. Run TypeScript only in Step 12, after filling all values.



```ts
// lib/i18n/translations/pt.ts
// EVERY string below must be filled — no empty strings allowed.
// Use the strings extracted in Steps 2–9 above.

export const pt = {
  nav: {
    cta: "Falar com o coach",
  },

  hero: {
    // Fill from HeroParallax.tsx (Step 2)
    eyebrow: "",
    headline: "",
    sub: "",
    cta: "",
    block1Title: "",
    block1Body: "",
    block1Cta: "",
    block2Title: "",
    block2Body: "",
    block2Cta: "",
    block3Title: "",
    block3Body: "",
    block3Cta: "",
  },

  identification: {
    // Fill from IdentificationSection.tsx (Step 3)
    eyebrow: "",
    headline: "",
    items: [] as string[], // fill with actual checkpoint strings
    cta: "",
  },

  comparison: {
    // Fill from ComparisonTable.tsx (Step 4)
    eyebrow: "",
    headline: "",
    colCommon: "",
    colCore: "",
    rows: [] as Array<{ label: string; common: string; core: string }>,
  },

  pillars: {
    eyebrow: "Os 8 Pilares",
    headline: "Protocolo C.O.R.E. 8",
    statusLabels: {
      completed: "ATIVO",
      "in-progress": "EM PROGRESSO",
      pending: "PENDENTE",
    },
    items: [
      { title: "Sobrecarga Progressiva", shortTitle: "Treino", date: "Pilar 1", content: "O treinamento é regido por números, não por esforço percibido vago. Carga registrada, cadência mantida, amplitude total. Falha mecânica em RPE 8–10." },
      { title: "Nutrição Matemática", shortTitle: "Macros", date: "Pilar 2", content: "A dieta é uma equação de precisão. Divisão exata de Proteínas, Carboidratos e Gorduras. Tolerância máxima de 100 kcal. 80% de fontes limpas." },
      { title: "Pesagem de Alimentos", shortTitle: "Pesagem", date: "Pilar 3", content: "Balança de cozinha obrigatória. 100% dos alimentos em gramas. Lançamento imediato em app. Comparação diária entre planejado e executado." },
      { title: "Biometria Corporal", shortTitle: "Biometria", date: "Pilar 4", content: "Pesagem diária em jejum. Fita métrica semanal: pescoço, cintura e quadril. Cálculo de %G para rastrear gordura visceral e subcutânea." },
      { title: "Passos Diários (NEAT)", shortTitle: "Passos", date: "Pilar 5", content: "Mínimo de 8.000–10.000 passos monitorados via smartphone ou relógio. Aumenta o déficit calórico sem gerar fadiga central." },
      { title: "Hidratação Individualizada", shortTitle: "Hidratação", date: "Pilar 6", content: "35ml × kg de peso corporal por dia. Garrafa graduada para controle. Balanço hídrico estável evita oscilações falsas na pesagem." },
      { title: "Recuperação e Sono", shortTitle: "Sono/HRV", date: "Pilar 7", content: "Mínimo de 7 horas de sono para recuperação do SNC. Monitoramento de HRV para ajuste de volume de treino. Deload baseado em dados de queda de performance." },
      { title: "Auditoria Semanal", shortTitle: "Auditoria", date: "Pilar 8", content: "Fotos semanais em 3 ângulos com iluminação idêntica. Questionário de feedback: adesão, estresse e digestão. Reajuste matemático de dieta e treino baseado nos dados." },
    ],
  },

  denis: {
    // Fill from DenisStory.tsx (Step 5)
    eyebrow: "",
    headline: "",
    body: [] as string[],
    quote: "",
    quoteAttrib: "",
  },

  appCinematic: {
    // Fill from AppCinematic.tsx (Step 6)
    eyebrow: "",
    headline: "",
    features: [] as string[],
  },

  beforeAfter: {
    // Fill eyebrow and headline from BeforeAfterSection.tsx (Step 7)
    eyebrow: "",
    headline: "",
    labelBefore: "Antes",
    labelAfter: "Depois",
    caption: "Role para revelar →",  // CHANGED from "Arraste..." — scroll-driven, no drag
  },

  lifestyle: {
    eyebrow: "A rotina que você já tem",
    headline: "Com mais energia.",
    body: "O C.O.R.E. 8 não pede que você abra mão de nada. Ele cabe na semana que você já tem — reunião às 18h, filho que precisa de você às 19h, jantar real.",
    cta: "Quero começar meu protocolo →",
  },

  pricing: {
    // Fill eyebrow and headline from PricingSection.tsx (Step 8)
    eyebrow: "",
    headline: "",
    perMonth: "/mês",
    avista: "ou CAD$",
    avistaSuffix: " à vista",
    popular: "Mais popular",
    currency: "CAD$",
    // plan text only — prices stay in data/pricing.ts
    plans: [
      { planName: "Mensal", description: "Comece sem compromisso", features: ["Onboarding completo", "Treino e nutrição personalizados", "2 revisões quinzenais/mês", "Suporte via app", "Histórico e dashboard", "21 dias para decidir"], buttonText: "Começar agora" },
      { planName: "Quadrimestral", description: "16 semanas · O protocolo completo", features: ["Onboarding completo", "Treino e nutrição personalizados", "8 revisões quinzenais", "Suporte direto com o coach", "Histórico e dashboard", "Comunidade de alunos", "Fórmula final: para sempre", "21 dias para decidir"], buttonText: "Quero começar →" },
      { planName: "Anual", description: "Compromisso total · Melhor valor", features: ["Tudo do plano quadrimestral", "Prioridade nas revisões", "Acesso antecipado ao app", "21 dias para decidir"], buttonText: "Começar agora" },
    ],
  },

  faq: {
    // Fill eyebrow, headline, guarantee, cta from FaqCta.tsx (Step 8)
    eyebrow: "",
    headline: "",
    items: [
      { q: "E se minha semana virar caos?", a: "Foi para isso que o protocolo foi construído. Você remeja o treino para o espaço que aparece. Na revisão seguinte, o coach analisa e ajusta. Você não recomeça do zero." },
      { q: "Já investi antes e não funcionou.", a: "O problema não era você. Era o encaixe. O C.O.R.E. 8 começa entendendo como você funciona antes de prescrever qualquer coisa." },
      { q: "Não tenho tempo para 1 hora por dia.", a: "O protocolo é montado para o tempo que você tem. 30 minutos três vezes por semana? O treino reflete isso." },
      { q: "Preciso de academia ou posso treinar em casa?", a: "Funciona com o que você tem: academia completa, pesos livres ou equipamento mínimo em casa. Mapeado no onboarding." },
      { q: "Funciona para quem mora fora do Brasil?", a: "Sim. O protocolo considera alimentação local, rotina do país onde você vive. Denis construiu o método morando no Canadá." },
      { q: "O protocolo é em português?", a: "Sim. Para inglês ou espanhol, entre em contato antes de assinar." },
      { q: "Posso começar com outras pessoas?", a: "Sim. Grupos de 3 ou mais: CAD$ 45,90/mês por pessoa · CAD$ 174,40 à vista." },
    ],
    guarantee: "",
    guaranteeBody: "",
    ctaHeadline: "",
    ctaBody: "",
    ctaButton: "",
  },
};

// DO NOT add `as const` yet — add it in Step 11 after filling all values.
// export type Translations = typeof pt  ← also add after Step 11.

```

- [ ] **Step 11: Fill every empty string AND every empty array, then add `as const`**

a) Fill all `""` strings and all `[]` arrays using strings from Steps 2–9.

b) After filling, add `as const` and `export type Translations` at the end of the file:

```ts
} as const;

export type Translations = typeof pt;
```

c) Verify no empty strings remain:

```bash
grep -n '""' lib/i18n/translations/pt.ts
```

Expected: 0 matches.

d) Verify no empty arrays remain:

```bash
grep -n '\[\]' lib/i18n/translations/pt.ts
```

Expected: 0 matches.

- [ ] **Step 12: Verify TypeScript**

```bash
npx tsc --noEmit 2>&1 | head -20
```

Expected: 0 errors.

- [ ] **Step 13: Commit**

```bash
git add lib/i18n/translations/pt.ts
git commit -m "feat: add PT-BR translation file with all page strings"
```

---

### Task 5: Create EN and ES translation files

**Files:**
- Create: `lib/i18n/translations/en.ts`
- Create: `lib/i18n/translations/es.ts`

TypeScript enforces completeness: both files must implement the `Translations` type exported from `pt.ts`. Any missing key is a compile error.

Note: TypeScript enforces the `Translations` type from `pt.ts`. Empty arrays (`[]`) will cause compile errors — every array must be populated with the correct number of items before running `tsc`. The `grep` check after each file verifies strings; manually confirm array lengths match PT-BR.

- [ ] **Step 1: Write en.ts — translate every string to English**

```ts
// lib/i18n/translations/en.ts
import type { Translations } from "./pt";

export const en: Translations = {
  nav: {
    cta: "Talk to the coach",
  },
  hero: {
    eyebrow: "",      // translate from pt.hero.eyebrow
    headline: "",
    sub: "",
    cta: "",
    block1Title: "",
    block1Body: "",
    block1Cta: "",
    block2Title: "",
    block2Body: "",
    block2Cta: "",
    block3Title: "",
    block3Body: "",
    block3Cta: "",
  },
  identification: {
    eyebrow: "",
    headline: "",
    items: [],        // same length as pt — TypeScript will not catch length mismatch, so verify manually
    cta: "",
  },
  comparison: {
    eyebrow: "",
    headline: "",
    colCommon: "Standard Program",
    colCore: "C.O.R.E. 8",
    rows: [],
  },
  pillars: {
    eyebrow: "The 8 Pillars",
    headline: "C.O.R.E. 8 Protocol",
    statusLabels: { completed: "ACTIVE", "in-progress": "IN PROGRESS", pending: "PENDING" },
    items: [
      { title: "Progressive Overload", shortTitle: "Training", date: "Pillar 1", content: "Training is governed by numbers, not vague perceived effort. Recorded load, maintained cadence, full range of motion. Mechanical failure at RPE 8–10." },
      { title: "Mathematical Nutrition", shortTitle: "Macros", date: "Pillar 2", content: "Diet is a precision equation. Exact split of Proteins, Carbohydrates and Fats. Maximum 100 kcal tolerance. 80% from clean sources." },
      { title: "Food Weighing", shortTitle: "Weighing", date: "Pillar 3", content: "Kitchen scale mandatory. 100% of food in grams. Immediate logging in app. Daily comparison between planned and executed." },
      { title: "Body Biometrics", shortTitle: "Biometrics", date: "Pillar 4", content: "Daily fasted weigh-in. Weekly tape measure: neck, waist and hip. %BF calculation to track visceral and subcutaneous fat." },
      { title: "Daily Steps (NEAT)", shortTitle: "Steps", date: "Pillar 5", content: "Minimum 8,000–10,000 steps tracked via smartphone or watch. Increases caloric deficit without generating central fatigue." },
      { title: "Individualized Hydration", shortTitle: "Hydration", date: "Pillar 6", content: "35ml × kg of body weight per day. Graduated bottle for control. Stable hydration balance prevents false fluctuations in weigh-in." },
      { title: "Recovery & Sleep", shortTitle: "Sleep/HRV", date: "Pillar 7", content: "Minimum 7 hours of sleep for CNS recovery. HRV monitoring for training volume adjustment. Deload based on performance drop data." },
      { title: "Weekly Audit", shortTitle: "Audit", date: "Pillar 8", content: "Weekly photos from 3 angles with identical lighting. Feedback questionnaire: adherence, stress and digestion. Mathematical readjustment of diet and training based on data." },
    ],
  },
  denis: { eyebrow: "", headline: "", body: [], quote: "", quoteAttrib: "" },
  appCinematic: { eyebrow: "", headline: "", features: [] },
  beforeAfter: { eyebrow: "", headline: "", labelBefore: "Before", labelAfter: "After", caption: "Scroll to reveal →" },
  lifestyle: {
    eyebrow: "The routine you already have",
    headline: "With more energy.",
    body: "C.O.R.E. 8 doesn't ask you to give up anything. It fits into the week you already have — 6 pm meeting, kids who need you at 7 pm, a real dinner.",
    cta: "Start my protocol →",
  },
  pricing: {
    eyebrow: "",
    headline: "",
    perMonth: "/mo",
    avista: "or CAD$",
    avistaSuffix: " upfront",
    popular: "Most popular",
    currency: "CAD$",
    plans: [
      { planName: "Monthly", description: "Start with no commitment", features: ["Full onboarding", "Personalized training & nutrition", "2 bi-weekly reviews/month", "In-app support", "History & dashboard", "21 days to decide"], buttonText: "Start now" },
      { planName: "4-Month", description: "16 weeks · The full protocol", features: ["Full onboarding", "Personalized training & nutrition", "8 bi-weekly reviews", "Direct coach support", "History & dashboard", "Student community", "Final formula: yours forever", "21 days to decide"], buttonText: "I want to start →" },
      { planName: "Annual", description: "Full commitment · Best value", features: ["Everything in the 4-month plan", "Priority reviews", "Early app access", "21 days to decide"], buttonText: "Start now" },
    ],
  },
  faq: {
    eyebrow: "",
    headline: "",
    items: [
      { q: "What if my week turns into chaos?", a: "That's exactly what the protocol was built for. You shift the workout to whatever space opens up. At the next review, the coach analyzes and adjusts. You don't start over." },
      { q: "I've invested before and it didn't work.", a: "The problem wasn't you. It was the fit. C.O.R.E. 8 starts by understanding how you work before prescribing anything." },
      { q: "I don't have time for 1 hour a day.", a: "The protocol is built around the time you have. 30 minutes three times a week? The training reflects that." },
      { q: "Do I need a gym or can I train at home?", a: "Works with what you have: full gym, free weights, or minimal equipment at home. Mapped during onboarding." },
      { q: "Does it work for people living outside Brazil?", a: "Yes. The protocol accounts for local food, the routine of the country where you live. Denis built the method while living in Canada." },
      { q: "Is the protocol in Portuguese?", a: "For English or Spanish, reach out before signing up." },
      { q: "Can I start with others?", a: "Yes. Groups of 3 or more: CAD$ 45.90/month per person · CAD$ 174.40 upfront." },
    ],
    guarantee: "",
    guaranteeBody: "",
    ctaHeadline: "",
    ctaBody: "",
    ctaButton: "",
  },
};
```

Translate all remaining empty `""` fields. After writing:

```bash
grep -n '""' lib/i18n/translations/en.ts
```

Expected: 0 matches.

- [ ] **Step 2: Write es.ts — translate every string to Spanish**

```ts
// lib/i18n/translations/es.ts
import type { Translations } from "./pt";

export const es: Translations = {
  nav: { cta: "Hablar con el coach" },
  hero: { eyebrow: "", headline: "", sub: "", cta: "", block1Title: "", block1Body: "", block1Cta: "", block2Title: "", block2Body: "", block2Cta: "", block3Title: "", block3Body: "", block3Cta: "" },
  identification: { eyebrow: "", headline: "", items: [], cta: "" },
  comparison: { eyebrow: "", headline: "", colCommon: "Programa común", colCore: "C.O.R.E. 8", rows: [] },
  pillars: {
    eyebrow: "Los 8 Pilares",
    headline: "Protocolo C.O.R.E. 8",
    statusLabels: { completed: "ACTIVO", "in-progress": "EN PROGRESO", pending: "PENDIENTE" },
    items: [
      { title: "Sobrecarga Progresiva", shortTitle: "Entrenamiento", date: "Pilar 1", content: "El entrenamiento se rige por números, no por esfuerzo percibido vago. Carga registrada, cadencia mantenida, amplitud total. Fallo mecánico en RPE 8–10." },
      { title: "Nutrición Matemática", shortTitle: "Macros", date: "Pilar 2", content: "La dieta es una ecuación de precisión. División exacta de Proteínas, Carbohidratos y Grasas. Tolerancia máxima de 100 kcal. 80% de fuentes limpias." },
      { title: "Pesaje de Alimentos", shortTitle: "Pesaje", date: "Pilar 3", content: "Balanza de cocina obligatoria. 100% de los alimentos en gramos. Registro inmediato en app. Comparación diaria entre planificado y ejecutado." },
      { title: "Biometría Corporal", shortTitle: "Biometría", date: "Pilar 4", content: "Pesaje diario en ayunas. Cinta métrica semanal: cuello, cintura y cadera. Cálculo de %G para rastrear grasa visceral y subcutánea." },
      { title: "Pasos Diarios (NEAT)", shortTitle: "Pasos", date: "Pilar 5", content: "Mínimo de 8.000–10.000 pasos monitoreados vía smartphone o reloj. Aumenta el déficit calórico sin generar fatiga central." },
      { title: "Hidratación Individualizada", shortTitle: "Hidratación", date: "Pilar 6", content: "35ml × kg de peso corporal por día. Botella graduada para control. Balance hídrico estable evita oscilaciones falsas en el pesaje." },
      { title: "Recuperación y Sueño", shortTitle: "Sueño/HRV", date: "Pilar 7", content: "Mínimo 7 horas de sueño para recuperación del SNC. Monitoreo de HRV para ajuste de volumen de entrenamiento. Deload basado en datos de caída de rendimiento." },
      { title: "Auditoría Semanal", shortTitle: "Auditoría", date: "Pilar 8", content: "Fotos semanales en 3 ángulos con iluminación idéntica. Cuestionario de feedback: adhesión, estrés y digestión. Reajuste matemático de dieta y entrenamiento basado en datos." },
    ],
  },
  denis: { eyebrow: "", headline: "", body: [], quote: "", quoteAttrib: "" },
  appCinematic: { eyebrow: "", headline: "", features: [] },
  beforeAfter: { eyebrow: "", headline: "", labelBefore: "Antes", labelAfter: "Después", caption: "Desplázate para revelar →" },
  lifestyle: {
    eyebrow: "La rutina que ya tienes",
    headline: "Con más energía.",
    body: "C.O.R.E. 8 no te pide que renuncies a nada. Cabe en la semana que ya tienes — reunión a las 18h, hijos que te necesitan a las 19h, cena real.",
    cta: "Quiero empezar mi protocolo →",
  },
  pricing: {
    eyebrow: "", headline: "",
    perMonth: "/mes", avista: "o CAD$", avistaSuffix: " al contado", popular: "Más popular", currency: "CAD$",
    plans: [
      { planName: "Mensual", description: "Empieza sin compromiso", features: ["Onboarding completo", "Entrenamiento y nutrición personalizados", "2 revisiones quincenales/mes", "Soporte via app", "Historial y dashboard", "21 días para decidir"], buttonText: "Empezar ahora" },
      { planName: "Cuatrimestral", description: "16 semanas · El protocolo completo", features: ["Onboarding completo", "Entrenamiento y nutrición personalizados", "8 revisiones quincenales", "Soporte directo con el coach", "Historial y dashboard", "Comunidad de alumnos", "Fórmula final: para siempre", "21 días para decidir"], buttonText: "Quiero empezar →" },
      { planName: "Anual", description: "Compromiso total · Mejor valor", features: ["Todo del plan cuatrimestral", "Prioridad en las revisiones", "Acceso anticipado a la app", "21 días para decidir"], buttonText: "Empezar ahora" },
    ],
  },
  faq: {
    eyebrow: "", headline: "",
    items: [
      { q: "¿Y si mi semana se vuelve un caos?", a: "Para eso fue construido el protocolo. Reubicas el entrenamiento en el espacio que aparezca. En la siguiente revisión, el coach analiza y ajusta. No empiezas de cero." },
      { q: "Ya invertí antes y no funcionó.", a: "El problema no eras tú. Era el encaje. C.O.R.E. 8 empieza entendiendo cómo funcionas tú antes de prescribir cualquier cosa." },
      { q: "No tengo tiempo para 1 hora al día.", a: "El protocolo se arma para el tiempo que tienes. ¿30 minutos tres veces por semana? El entrenamiento lo refleja." },
      { q: "¿Necesito gimnasio o puedo entrenar en casa?", a: "Funciona con lo que tienes: gimnasio completo, pesas libres o equipo mínimo en casa. Se mapea en el onboarding." },
      { q: "¿Funciona para quienes viven fuera de Brasil?", a: "Sí. El protocolo considera la alimentación local, la rutina del país donde vives. Denis construyó el método viviendo en Canadá." },
      { q: "¿El protocolo es en portugués?", a: "Para inglés o español, contáctanos antes de suscribirte." },
      { q: "¿Puedo empezar con otras personas?", a: "Sí. Grupos de 3 o más: CAD$ 45,90/mes por persona · CAD$ 174,40 al contado." },
    ],
    guarantee: "", guaranteeBody: "", ctaHeadline: "", ctaBody: "", ctaButton: "",
  },
};
```

Translate all remaining empty `""` fields, then:

```bash
grep -n '""' lib/i18n/translations/es.ts
```

Expected: 0 matches.

- [ ] **Step 3: Verify TypeScript**

```bash
npx tsc --noEmit 2>&1 | head -20
```

Expected: 0 errors. TypeScript enforces that `en` and `es` satisfy the `Translations` type — missing keys are compile errors.

- [ ] **Step 4: Commit**

```bash
git add lib/i18n/translations/en.ts lib/i18n/translations/es.ts
git commit -m "feat: add EN and ES translation files"
```

---

### Task 6: Create I18nContext and useTranslation hook

**Files:**
- Create: `lib/i18n/context.tsx`

- [ ] **Step 1: Write context.tsx**

```tsx
// lib/i18n/context.tsx
"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { pt, type Translations } from "./translations/pt";
import { en } from "./translations/en";
import { es } from "./translations/es";

type Locale = "pt" | "en" | "es";
const STORAGE_KEY = "integr8-locale";
const translations: Record<Locale, Translations> = { pt, en, es };

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

const I18nContext = createContext<I18nContextValue>({
  locale: "pt",
  t: pt,
  setLocale: () => {},
});

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("pt"); // SSR default: PT

  useEffect(() => {
    setLocaleState(detectLocale()); // client: detect real preference
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
  return useContext(I18nContext);
}
```

- [ ] **Step 2: Verify**

```bash
npx tsc --noEmit 2>&1 | head -20
```

- [ ] **Step 3: Commit**

```bash
git add lib/i18n/context.tsx
git commit -m "feat: add I18nProvider and useTranslation hook"
```

---

### Task 7: Add I18nProvider to layout.tsx

**Files:**
- Modify: `app/layout.tsx`

- [ ] **Step 1: Add I18nProvider import and wrap children**

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

- [ ] **Step 2: Verify**

```bash
npx tsc --noEmit 2>&1 | head -20
```

- [ ] **Step 3: Commit**

```bash
git add app/layout.tsx
git commit -m "feat: wrap app in I18nProvider"
```

---

## Chunk 3: New UI Components + Navbar

### Task 8: ThemeToggle component

**Files:**
- Create: `components/ui/ThemeToggle.tsx`

- [ ] **Step 1: Write ThemeToggle.tsx**

```tsx
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
```

- [ ] **Step 2: Verify**

```bash
npx tsc --noEmit 2>&1 | head -20
```

- [ ] **Step 3: Commit**

```bash
git add components/ui/ThemeToggle.tsx
git commit -m "feat: add ThemeToggle component"
```

---

### Task 9: LanguageSwitcher component

**Files:**
- Create: `components/ui/LanguageSwitcher.tsx`

- [ ] **Step 1: Write LanguageSwitcher.tsx**

```tsx
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
```

- [ ] **Step 2: Verify**

```bash
npx tsc --noEmit 2>&1 | head -20
```

- [ ] **Step 3: Commit**

```bash
git add components/ui/LanguageSwitcher.tsx
git commit -m "feat: add LanguageSwitcher component"
```

---

### Task 10: Update Navbar with utility bar

**Files:**
- Modify: `components/layout/Navbar.tsx`

Tailwind v4 has no `light:` variant. Non-dark state is the base (unprefixed) class. Pattern: `bg-white dark:bg-[#05080f]`.

- [ ] **Step 1: Replace Navbar.tsx**

```tsx
// components/layout/Navbar.tsx
"use client";

import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";
import { useTranslation } from "@/lib/i18n/context";

const WA = "https://wa.me/12269617351";

export function Navbar() {
  const { t } = useTranslation();

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Utility bar */}
      <div className="bg-slate-100/90 dark:bg-[#030509]/90 border-b border-slate-200/60 dark:border-slate-800/40 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6 h-8 flex items-center justify-between">
          <LanguageSwitcher />
          <div className="flex items-center gap-3">
            <div className="w-px h-4 bg-slate-300 dark:bg-slate-700" />
            <ThemeToggle />
          </div>
        </div>
      </div>

      {/* Main nav */}
      <div className="border-b border-slate-200/60 dark:border-[#1e293b]/60 bg-white/80 dark:bg-[#05080f]/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <span className="font-black text-lg tracking-tighter text-slate-900 dark:text-white">
            INTEGR<span className="text-[#22c55e]">8</span>
          </span>
          <a
            href={WA}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold bg-[#22c55e] text-black px-4 py-1.5 rounded-full hover:bg-[#16a34a] transition-colors"
          >
            {t.nav.cta}
          </a>
        </div>
      </div>
    </header>
  );
}
```

- [ ] **Step 2: Verify**

```bash
npx tsc --noEmit 2>&1 | head -20
```

- [ ] **Step 3: Commit**

```bash
git add components/layout/Navbar.tsx
git commit -m "feat: add utility bar with ThemeToggle and LanguageSwitcher to Navbar"
```

---

## Chunk 4: Scroll-Driven Slider

### Task 11: Update ImageComparison — add controlledPosition prop

**Files:**
- Modify: `components/ui/image-comparison.tsx`

Replace everything from the line `export type ImageComparisonProps` through the closing `}` of the `ImageComparison` function (the first exported function — do NOT touch `ImageComparisonImage` or `ImageComparisonSlider`).

- [ ] **Step 1: Read the file and identify the exact range to replace**

Open `components/ui/image-comparison.tsx`. Note the line numbers for:
- `export type ImageComparisonProps` (start of replacement)
- The closing `}` of the `ImageComparison` function body (end of replacement — the line before `export function ImageComparisonImage`)

- [ ] **Step 2: Replace that range with:**

```tsx
export type ImageComparisonProps = {
  children: React.ReactNode;
  className?: string;
  enableHover?: boolean;
  springOptions?: SpringOptions;
  controlledPosition?: MotionValue<number>;
};

const DEFAULT_SPRING_OPTIONS = { bounce: 0, duration: 0 };

export function ImageComparison({
  children,
  className,
  enableHover,
  springOptions,
  controlledPosition,
}: ImageComparisonProps) {
  const [isDragging, setIsDragging] = useState(false);
  const internalMotionValue = useMotionValue(50);
  const internalSpring = useSpring(         // ← declared here, used two lines below
    internalMotionValue,
    springOptions ?? DEFAULT_SPRING_OPTIONS
  );
  const motionSliderPosition = controlledPosition ?? internalSpring; // ← now safe
  const [sliderPosition, setSliderPosition] = useState(50);

  const isControlled = !!controlledPosition;

  const handleDrag = (event: React.MouseEvent | React.TouchEvent) => {
    if (isControlled) return;
    if (!isDragging && !enableHover) return;
    const containerRect = (event.currentTarget as HTMLElement).getBoundingClientRect();
    const x =
      "touches" in event
        ? event.touches[0].clientX - containerRect.left
        : (event as React.MouseEvent).clientX - containerRect.left;
    const percentage = Math.min(Math.max((x / containerRect.width) * 100, 0), 100);
    internalMotionValue.set(percentage);
    setSliderPosition(percentage);
  };

  return (
    <ImageComparisonContext.Provider
      value={{ sliderPosition, setSliderPosition, motionSliderPosition }}
    >
      <div
        className={cn(
          "relative overflow-hidden select-none",
          enableHover && !isControlled && "cursor-ew-resize",
          className
        )}
        onMouseMove={handleDrag}
        onMouseDown={() => !enableHover && !isControlled && setIsDragging(true)}
        onMouseUp={() => !enableHover && !isControlled && setIsDragging(false)}
        onMouseLeave={() => !enableHover && !isControlled && setIsDragging(false)}
        onTouchMove={handleDrag}
        onTouchStart={() => !enableHover && !isControlled && setIsDragging(true)}
        onTouchEnd={() => !enableHover && !isControlled && setIsDragging(false)}
      >
        {children}
      </div>
    </ImageComparisonContext.Provider>
  );
}
```

`ImageComparisonImage` and `ImageComparisonSlider` remain unchanged — they consume `motionSliderPosition` from context and need no modification.

- [ ] **Step 3: Verify**

```bash
npx tsc --noEmit 2>&1 | head -20
```

- [ ] **Step 4: Commit**

```bash
git add components/ui/image-comparison.tsx
git commit -m "feat: add controlledPosition prop to ImageComparison for scroll-driven control"
```

---

### Task 12: Scroll-driven BeforeAfterSection

**Files:**
- Modify: `components/sections/BeforeAfterSection.tsx`

- [ ] **Step 1: Read the current file**

Open `components/sections/BeforeAfterSection.tsx`. Note:
- Any entrance animations (`initial`, `whileInView`, `variants`) — these must be preserved
- Current section background color
- Any text currently referencing "arraste" or drag interaction

- [ ] **Step 2: Extract elements to preserve from the original file**

Before replacing anything, copy from the current file:
- Any `motion.div` entrance animations (`initial`, `whileInView`, `variants`, `transition`) not already in the template below
- Any section-level class names or layout wrappers that differ from the template
- Any additional text elements or UI not captured in `t.beforeAfter.*`

Keep these noted — you will reinsert them into the new template in the next step.

- [ ] **Step 3: Replace the component with scroll-driven version, reinserting preserved elements**

Add `useRef` + `useScroll` + `useTransform`. The template below uses a `motion.div` entrance animation on the heading block — adjust or add back any other animations you noted in Step 2:

```tsx
"use client";

import { useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import {
  ImageComparison,
  ImageComparisonImage,
  ImageComparisonSlider,
} from "@/components/ui/image-comparison";
import { useTranslation } from "@/lib/i18n/context";

export function BeforeAfterSection() {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start center", "end center"],
  });

  const sliderPosition = useTransform(scrollYProgress, [0, 1], [0, 100]);

  return (
    <section
      ref={sectionRef}
      className="w-full py-24 bg-white dark:bg-[#05080f]"
    >
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-xs font-semibold uppercase tracking-widest text-[#22c55e]">
            {t.beforeAfter.eyebrow}
          </span>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-white mt-3">
            {t.beforeAfter.headline}
          </h2>
          <p className="text-slate-500 mt-3 text-sm">
            {t.beforeAfter.caption}
          </p>
        </motion.div>

        <ImageComparison
          className="w-full aspect-[16/9] rounded-xl overflow-hidden"
          controlledPosition={sliderPosition}
        >
          <ImageComparisonImage
            src="/placeholders/casal-before.jpg"
            alt={t.beforeAfter.labelBefore}
            position="left"
          />
          <ImageComparisonImage
            src="/placeholders/casal-after.jpg"
            alt={t.beforeAfter.labelAfter}
            position="right"
          />
          <ImageComparisonSlider className="bg-[#22c55e] w-0.5">
            <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#22c55e] flex items-center justify-center pointer-events-none">
              <span className="text-black text-xs font-bold select-none">◀▶</span>
            </div>
          </ImageComparisonSlider>
        </ImageComparison>

        <div className="flex justify-between mt-3 text-xs text-slate-500 font-semibold uppercase tracking-widest">
          <span>{t.beforeAfter.labelBefore}</span>
          <span>{t.beforeAfter.labelAfter}</span>
        </div>
      </div>
    </section>
  );
}
```

If the original file had additional entrance animations or content not shown here, add them back.

- [ ] **Step 4: Verify**

```bash
npx tsc --noEmit 2>&1 | head -20
```

- [ ] **Step 5: Commit**

```bash
git add components/sections/BeforeAfterSection.tsx
git commit -m "feat: scroll-driven before/after slider; dark mode + i18n"
```

---

## Chunk 5: Components — Dark Mode + i18n

### Dark Mode Color Mapping

Apply this mapping to every component in this chunk. No `light:` prefix exists in Tailwind — base class = light mode, `dark:` prefix = dark mode.

| Replace this | With this |
|---|---|
| `bg-[#05080f]` | `bg-white dark:bg-[#05080f]` |
| `bg-[#0d1117]` | `bg-slate-50 dark:bg-[#0d1117]` |
| `bg-[#111827]` | `bg-slate-100 dark:bg-[#111827]` |
| `bg-[#1e293b]` | `bg-slate-200 dark:bg-[#1e293b]` |
| `text-white` | `text-slate-900 dark:text-white` |
| `text-[#f1f5f9]` | `text-slate-800 dark:text-[#f1f5f9]` |
| `text-[#64748b]` | `text-slate-500 dark:text-[#64748b]` |
| `text-[#94a3b8]` | `text-slate-500 dark:text-[#94a3b8]` |
| `border-[#1e293b]` | `border-slate-200 dark:border-[#1e293b]` |
| `border-white/10` | `border-slate-200 dark:border-white/10` |

Accent colors (`text-[#22c55e]`, `bg-[#22c55e]`, `text-[#3b82f6]`) stay the same in both modes — do not add `dark:` variants to them.

---

### Task 13: HeroParallax

**Files:**
- Modify: `components/sections/HeroParallax.tsx`

- [ ] **Step 1: Read the file**

Open `components/sections/HeroParallax.tsx`. List all hardcoded strings and all hardcoded color classes.

- [ ] **Step 2: Apply i18n**

Add at the top of the component function:
```tsx
import { useTranslation } from "@/lib/i18n/context";
// inside:
const { t } = useTranslation();
```

Replace every hardcoded user-visible string with the corresponding `t.hero.*` key.

- [ ] **Step 3: Apply dark mode**

Replace every hardcoded color class using the mapping table above.

- [ ] **Step 4: Verify**

```bash
npx tsc --noEmit 2>&1 | head -20
```

Expected: 0 errors.

- [ ] **Step 5: Commit**

```bash
git add components/sections/HeroParallax.tsx
git commit -m "feat: dark mode + i18n for HeroParallax"
```

---

### Task 14: IdentificationSection

**Files:**
- Modify: `components/sections/IdentificationSection.tsx`

- [ ] **Step 1: Read the file**

Open `components/sections/IdentificationSection.tsx`. Note the exact number of checkpoint items and their structure (are they mapped from an array or hardcoded individually?).

- [ ] **Step 2: Apply i18n**

```tsx
const { t } = useTranslation();
// map over t.identification.items for the checkpoints
{t.identification.items.map((item, i) => (
  <div key={i}>/* existing checkpoint JSX with item as the string */</div>
))}
```

Replace eyebrow, headline, CTA with `t.identification.*`.

- [ ] **Step 3: Apply dark mode using mapping table**

- [ ] **Step 4: Verify**

```bash
npx tsc --noEmit 2>&1 | head -20
```

- [ ] **Step 5: Commit**

```bash
git add components/sections/IdentificationSection.tsx
git commit -m "feat: dark mode + i18n for IdentificationSection"
```

---

### Task 15: ComparisonTable

**Files:**
- Modify: `components/sections/ComparisonTable.tsx`

- [ ] **Step 1: Read the file**

Open `components/sections/ComparisonTable.tsx`. Note how rows are defined (hardcoded JSX or array).

- [ ] **Step 2: Apply i18n**

```tsx
const { t } = useTranslation();
// column headers: t.comparison.colCommon, t.comparison.colCore
// rows: t.comparison.rows.map(...)
```

- [ ] **Step 3: Apply dark mode using mapping table**

- [ ] **Step 4: Verify**

```bash
npx tsc --noEmit 2>&1 | head -20
```

- [ ] **Step 5: Commit**

```bash
git add components/sections/ComparisonTable.tsx
git commit -m "feat: dark mode + i18n for ComparisonTable"
```

---

### Task 16: PillarsOrbital + migrate data/pillars.ts

**Files:**
- Modify: `components/sections/PillarsOrbital.tsx`
- Modify: `data/pillars.ts`

- [ ] **Step 1: Strip string fields from data/pillars.ts**

Remove `title`, `shortTitle`, `date`, `content`, `category` from the `Pillar` interface and from all 8 objects. Keep: `id`, `icon`, `relatedIds`, `status`, `energy`.

```ts
// data/pillars.ts
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
  { id: 1, icon: Dumbbell, relatedIds: [7, 8], status: "completed",   energy: 95 },
  { id: 2, icon: Apple,    relatedIds: [3, 5], status: "completed",   energy: 90 },
  { id: 3, icon: Scale,    relatedIds: [2, 4], status: "completed",   energy: 85 },
  { id: 4, icon: Activity, relatedIds: [3, 8], status: "in-progress", energy: 80 },
  { id: 5, icon: Footprints,relatedIds:[2, 6], status: "in-progress", energy: 75 },
  { id: 6, icon: Droplets, relatedIds: [4, 5], status: "pending",     energy: 70 },
  { id: 7, icon: Moon,     relatedIds: [1, 8], status: "pending",     energy: 88 },
  { id: 8, icon: Camera,   relatedIds: [1, 4], status: "pending",     energy: 92 },
];
```

- [ ] **Step 2: Update PillarsOrbital.tsx — merge data with translations**

```tsx
const { t } = useTranslation();

const mergedPillars = pillars.map((p, i) => ({
  ...p,
  ...t.pillars.items[i], // adds title, shortTitle, date, content
}));
```

Replace status display label:
```tsx
{t.pillars.statusLabels[item.status]}
```

Replace remaining hardcoded strings with `t.pillars.*`. Apply dark mode mapping to all color classes.

- [ ] **Step 3: Verify**

```bash
npx tsc --noEmit 2>&1 | head -20
```

- [ ] **Step 4: Commit**

```bash
git add components/sections/PillarsOrbital.tsx data/pillars.ts
git commit -m "feat: dark mode + i18n for PillarsOrbital; migrate string fields to translations"
```

---

### Task 17: DenisStory

**Files:**
- Modify: `components/sections/DenisStory.tsx`

- [ ] **Step 1: Read the file**

Open `components/sections/DenisStory.tsx`. Note: how many paragraphs, whether the blockquote is a separate element, and how they are rendered (individual `<p>` tags or mapped array).

- [ ] **Step 2: Apply i18n**

```tsx
const { t } = useTranslation();
// Paragraphs: t.denis.body is a string[]; map over it or destructure if count is fixed
{t.denis.body.map((paragraph, i) => (
  <p key={i}>{paragraph}</p>
))}
// Quote: t.denis.quote
// Attribution: t.denis.quoteAttrib
```

- [ ] **Step 3: Apply dark mode using mapping table**

- [ ] **Step 4: Verify**

```bash
npx tsc --noEmit 2>&1 | head -20
```

- [ ] **Step 5: Commit**

```bash
git add components/sections/DenisStory.tsx
git commit -m "feat: dark mode + i18n for DenisStory"
```

---

### Task 18: AppCinematic (GSAP + CSS variables)

**Files:**
- Modify: `components/sections/AppCinematic.tsx`

This component has hardcoded hex values inside a JS string injected as a `<style>` tag. Tailwind `dark:` variants don't apply to injected strings.

- [ ] **Step 1: Read the file**

Open `components/sections/AppCinematic.tsx`. Find the string constant containing injected CSS (look for `<style>`, template literal with hex colors like `#0a1628`, `#05080f`, `#0d1117`).

- [ ] **Step 2: Replace hardcoded hex in injected CSS with CSS variables**

For each hex in the injected string, map it to the appropriate CSS variable:
- `#05080f` → `var(--bg)`
- `#0d1117` → `var(--surface)`
- `#111827` → `var(--card-bg)`
- `#f1f5f9` or `#ffffff` → `var(--text)`
- `#1e293b` → `var(--border-custom)`
- Any other specific dark hex → map to nearest variable above

The CSS variables are defined on `:root` (light) and `.dark` (dark) in `globals.css` — they update automatically when the theme class changes on `<html>`.

- [ ] **Step 3: Apply i18n to JSX**

```tsx
const { t } = useTranslation();
// replace eyebrow, headline, feature labels with t.appCinematic.*
```

- [ ] **Step 4: Apply dark mode to remaining JSX color classes**

Use the mapping table. Any JSX className with hardcoded hex gets the dark: variant treatment.

- [ ] **Step 5: Verify**

```bash
npx tsc --noEmit 2>&1 | head -20
```

- [ ] **Step 6: Commit**

```bash
git add components/sections/AppCinematic.tsx
git commit -m "feat: dark mode + i18n for AppCinematic; replace injected hex with CSS variables"
```

---

### Task 19: LifestyleGallery

**Files:**
- Modify: `components/sections/LifestyleGallery.tsx`

- [ ] **Step 1: Read the file and confirm hydration mismatch fix is present**

Open `components/sections/LifestyleGallery.tsx`. Confirm `ShuffleGrid` uses:
```tsx
const [squares, setSquares] = useState<React.ReactNode[]>([]); // empty initial state
useEffect(() => { shuffleSquares(); ... }, []); // populate client-side only
```
If instead it uses `useState(() => shuffle(galleryImages).map(...))` (initializer calling `Math.random` during SSR), fix it to the pattern above. This prevents a hydration mismatch where the server and client render different shuffle orders.

- [ ] **Step 2: Apply i18n**

```tsx
const { t } = useTranslation();
// t.lifestyle.eyebrow, t.lifestyle.headline, t.lifestyle.body, t.lifestyle.cta
```

- [ ] **Step 3: Apply dark mode using mapping table**

In `ShuffleGrid`, update the placeholder `backgroundColor` inline style:
```tsx
backgroundColor: "var(--surface)", // was #1e293b
```

- [ ] **Step 4: Verify**

```bash
npx tsc --noEmit 2>&1 | head -20
```

- [ ] **Step 5: Commit**

```bash
git add components/sections/LifestyleGallery.tsx
git commit -m "feat: dark mode + i18n for LifestyleGallery; confirm SSR hydration fix"
```

---

### Task 20: PricingSection — dark mode + i18n + WebGL shader

**Files:**
- Modify: `components/sections/PricingSection.tsx`
- Modify: `data/pricing.ts`

- [ ] **Step 1: Read PricingSection.tsx**

Open the file. Find:
1. The GLSL fragment shader string — look for `vec3` or `gl_FragColor` containing a background color value
2. The WebGL initialization code — note whether the component uses `requestAnimationFrame` (continuous render loop) or renders once on mount
3. All refs used for the WebGL context

- [ ] **Step 2: Add uBgColor uniform to the fragment shader**

In the GLSL source string, add a uniform declaration and replace the hardcoded background vec3:

```glsl
// Add this line near the top of the fragment shader (with other uniforms):
uniform vec3 uBgColor;

// Replace the hardcoded background vec3 (e.g. vec3(0.02, 0.03, 0.06)) with:
vec3 bgColor = uBgColor;
```

- [ ] **Step 3: Get the uniform location during WebGL init**

After `gl.linkProgram(program)`, add:

```ts
const uBgColorLocation = gl.getUniformLocation(program, "uBgColor");
```

Store it in a ref: `uBgColorRef.current = uBgColorLocation`.

- [ ] **Step 4: Update the uniform on theme change**

```tsx
import { useTheme } from "next-themes";

const { resolvedTheme } = useTheme();
const uBgColorRef = useRef<WebGLUniformLocation | null>(null);
const glRef = useRef<WebGLRenderingContext | null>(null); // ensure gl is stored in a ref

useEffect(() => {
  const gl = glRef.current;
  if (!gl || !uBgColorRef.current) return;
  gl.useProgram(programRef.current); // substitute the actual program ref variable name found in Step 1
  if (resolvedTheme === "dark") {
    gl.uniform3f(uBgColorRef.current, 0.02, 0.03, 0.06); // #05080f
  } else {
    gl.uniform3f(uBgColorRef.current, 0.97, 0.98, 0.99); // #f8fafc
  }
  // If the component does NOT use requestAnimationFrame (renders once on mount),
  // call your draw function here once to apply the change:
  // drawFrame();
  // If it DOES use requestAnimationFrame, no extra draw call needed — the loop picks it up.
}, [resolvedTheme]);
```

- [ ] **Step 5: Migrate data/pricing.ts — remove string fields**

⚠️ Do NOT run `tsc` between Step 5 and Step 6. After removing fields from `data/pricing.ts`, TypeScript will error until Step 6 adds the merge in `PricingSection.tsx`. Run `tsc` only in Step 7, after both files are updated.

Prices (`price`, `priceAVista`) stay in the data file since they are locale-invariant numbers. Only text strings move to translations.

```ts
// data/pricing.ts
export interface Plan {
  price: string;
  priceAVista?: string;
  isPopular?: boolean;
  buttonVariant?: "primary" | "secondary";
  whatsappLink: string;
}

const WA = "https://wa.me/12269617351?text=Quero+come%C3%A7ar+meu+protocolo";

export const plans: Plan[] = [
  { price: "69,90", priceAVista: "66,40",  buttonVariant: "secondary", whatsappLink: WA },
  { price: "49,90", priceAVista: "189,60", isPopular: true, buttonVariant: "primary",   whatsappLink: WA },
  { price: "44,90", priceAVista: "511,85", buttonVariant: "secondary", whatsappLink: WA },
];
```

- [ ] **Step 6: Update PricingSection to merge data + translations**

```tsx
const { t } = useTranslation();

const mergedPlans = plans.map((p, i) => ({
  ...p,
  ...t.pricing.plans[i], // adds planName, description, features, buttonText
}));
```

Replace eyebrow, headline, currency labels with `t.pricing.*`. Apply dark mode mapping to all color classes.

- [ ] **Step 7: Verify**

```bash
npx tsc --noEmit 2>&1 | head -20
```

- [ ] **Step 8: Commit**

```bash
git add components/sections/PricingSection.tsx data/pricing.ts
git commit -m "feat: dark mode + i18n for PricingSection; WebGL shader uBgColor uniform"
```

---

### Task 21: FaqCta + delete data/faq.ts

**Files:**
- Modify: `components/sections/FaqCta.tsx`
- Delete: `data/faq.ts`

- [ ] **Step 1: Read FaqCta.tsx**

Open the file. Note: how it imports and uses `faqs`, any other hardcoded strings (guarantee section, CTA section).

- [ ] **Step 2: Remove the data/faq.ts import and switch to translations**

```tsx
// Remove: import { faqs } from "@/data/faq";
const { t } = useTranslation();

// Replace faqs.map(...) with:
{t.faq.items.map((item, i) => (
  <AccordionItem key={i} value={`item-${i}`}>
    <AccordionTrigger>{item.q}</AccordionTrigger>
    <AccordionContent>{item.a}</AccordionContent>
  </AccordionItem>
))}
```

Replace eyebrow, headline, guarantee title/body, CTA headline/body/button with `t.faq.*`.
Apply dark mode mapping to all color classes.

- [ ] **Step 3: Stage deletion of data/faq.ts (do this in Step 6 with git rm — skip a plain `rm` here)**

- [ ] **Step 4: Verify**

```bash
npx tsc --noEmit 2>&1 | head -20
```

Expected: 0 errors (no remaining imports of the deleted file).

- [ ] **Step 5: Full build check**

```bash
npm run build 2>&1 | tail -15
```

Expected: `✓ Compiled successfully` with 0 errors.

- [ ] **Step 6: Commit**

Use `git rm` (not plain `rm`) to both delete the file from disk and stage the deletion in one command:

```bash
git add components/sections/FaqCta.tsx
git rm data/faq.ts
git commit -m "feat: dark mode + i18n for FaqCta; delete data/faq.ts (content in translations)"
```

---

## Final Verification

- [ ] **Full TypeScript check**

```bash
npx tsc --noEmit
```

Expected: 0 errors.

- [ ] **Production build**

```bash
npm run build 2>&1 | tail -15
```

Expected: `✓ Compiled successfully`.

- [ ] **Manual test checklist**

1. Open http://localhost:3001 — confirm page loads without console errors
2. Set OS to dark mode → page appears dark; set OS to light mode → page appears light with white background, same green/blue accents
3. Click ☀️/🌙 toggle → theme changes immediately; reload → preference remembered
4. Click 🇺🇸 flag → all page text switches to English; click 🇧🇷 → back to Portuguese; reload → language preference remembered
5. Click 🇪🇸 → all text switches to Spanish
6. Scroll to Before/After section — slider line moves from left to right as you scroll through the section
7. Pricing section — WebGL background color changes between dark and light modes

- [ ] **Confirm all tasks committed**

Each task in Chunks 3–5 has its own commit. Run:

```bash
git log --oneline -20
```

Verify commits for all 21 tasks are present. If any component file was skipped, commit it now with:

```bash
git add <path/to/missed/file>
git commit -m "feat: dark mode + i18n for <ComponentName>"
```
