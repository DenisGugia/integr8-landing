# Codebase Structure

**Analysis Date:** 2026-04-02

## Directory Layout

```
integr8-landing/
├── app/                        # Next.js App Router
│   ├── layout.tsx              # Root layout: providers, font, metadata
│   ├── page.tsx                # Home page: section assembly
│   ├── globals.css             # Global styles and Tailwind base
│   ├── error.tsx               # Error boundary
│   ├── not-found.tsx           # 404 page
│   └── favicon.ico
├── components/
│   ├── layout/
│   │   └── Navbar.tsx          # Fixed top nav with lang switcher and CTA
│   ├── sections/               # Page sections (mix of modular folders and flat files)
│   │   ├── HeroParallax/       # Modular folder
│   │   ├── PillarsOrbital/     # Modular folder
│   │   ├── AppCinematic/       # Modular folder
│   │   ├── PricingSection/     # Modular folder
│   │   ├── FaqCta/             # Modular folder
│   │   ├── IdentificationSection.tsx
│   │   ├── ComparisonTable.tsx
│   │   ├── DenisStory.tsx
│   │   ├── BeforeAfterSection.tsx
│   │   └── LifestyleGallery.tsx
│   ├── remotion/               # Remotion video compositions
│   │   ├── Root.tsx            # Composition registry (Remotion CLI entry)
│   │   ├── AppShowcase.tsx     # Phone mockup loop (embedded in page)
│   │   ├── HeroReel.tsx        # Typewriter hero (render-only)
│   │   ├── PillarsReveal.tsx   # Pillars animation (render-only)
│   │   └── CountdownTimer.tsx  # Countdown (render-only)
│   └── ui/                     # Primitive and utility components
│       ├── accordion.tsx       # shadcn/ui accordion
│       ├── badge.tsx           # shadcn/ui badge
│       ├── button.tsx          # shadcn/ui button
│       ├── card.tsx            # shadcn/ui card
│       ├── image-comparison.tsx # Before/after slider
│       ├── ripple-button.tsx   # Custom animated button
│       ├── CheckIcon.tsx       # SVG check mark
│       ├── LanguageSwitcher.tsx # PT/EN/ES flag buttons
│       ├── ShaderCanvas.tsx    # Canvas element stub (not yet implemented)
│       └── ThemeToggle.tsx     # Dark/light toggle button
├── data/                       # Static typed data (no translations)
│   ├── pillars.ts              # 8 pillars: icon, relatedIds, status, energy
│   ├── pricing.ts              # Plan prices, isPopular, WhatsApp links
│   ├── constants.ts            # Brand colors, WA routes, app metrics
│   └── gallery-images.ts       # Unsplash image URLs for LifestyleGallery
├── lib/
│   ├── geometry.ts             # Orbital math: calculateOrbitalPosition, polar/cartesian
│   ├── utils.ts                # cn() — clsx + tailwind-merge
│   ├── hooks/
│   │   ├── index.ts            # Re-exports all hooks
│   │   ├── useMousePosition.ts # Mouse coordinates hook
│   │   ├── useOrbitalRotation.ts # Auto-rotating angle via setInterval
│   │   └── useScrollParallax.ts  # Wraps Framer Motion useScroll
│   └── i18n/
│       ├── context.tsx         # I18nProvider + useTranslation hook
│       └── translations/
│           ├── pt.ts           # Flat legacy file (kept as Translations type source)
│           ├── en.ts           # Flat legacy file
│           ├── es.ts           # Flat legacy file
│           ├── pt/             # Split per-section files (active)
│           │   ├── index.ts    # Re-exports all pt/* modules
│           │   ├── nav.ts
│           │   ├── hero.ts
│           │   ├── identification.ts
│           │   ├── comparison.ts
│           │   ├── pillars.ts
│           │   ├── pricing.ts
│           │   └── faq.ts
│           ├── en/             # Same structure as pt/
│           └── es/             # Same structure as pt/
├── public/
│   ├── placeholders/           # Local images referenced by HeroParallax
│   ├── videos/                 # Local video files (if any)
│   └── *.svg                   # Next.js default SVGs
├── docs/                       # Project planning docs
├── .planning/                  # GSD planning artifacts
│   └── codebase/               # Codebase map documents
├── .backup-translations/       # Backup of flat translation files
├── app/globals.css
├── next.config.ts              # Turbopack enabled, onDemandEntries config
├── remotion.config.ts          # Remotion CLI: entry point, format, concurrency
├── tsconfig.json               # Path alias: @/ → ./
├── components.json             # shadcn/ui config
├── eslint.config.mjs
├── postcss.config.mjs
└── package.json
```

## Directory Purposes

**`app/`:**
- Purpose: Next.js App Router pages and root layout
- Key files: `layout.tsx` (provider tree), `page.tsx` (section assembly)
- Note: Only one route exists — the landing page at `/`

**`components/sections/`:**
- Purpose: Each file or folder is one visible section of the landing page
- Modular folders (complex, multi-file): `HeroParallax/`, `PillarsOrbital/`, `AppCinematic/`, `PricingSection/`, `FaqCta/`
- Single files (simpler sections): `IdentificationSection.tsx`, `ComparisonTable.tsx`, `DenisStory.tsx`, `BeforeAfterSection.tsx`, `LifestyleGallery.tsx`

**`components/sections/HeroParallax/`:**
- `index.tsx` — merges `internalBlocks` (imgUrls) with `t.hero.blocks` (copy), renders `HeroVideo` + `ParallaxSection` list
- `HeroVideo.tsx` — above-fold video hero with headline and CTA
- `ParallaxBlock.tsx` — sticky image + parallax copy using Framer Motion `useScroll`/`useTransform`
- `constants.ts` — `IMG_PADDING`, `ParallaxBlock` interface, `internalBlocks` (image URLs only)

**`components/sections/PillarsOrbital/`:**
- `index.tsx` — merges `pillars` data with `t.pillars.items` by index, passes `MergedPillar[]` to `RadialOrbitalTimeline`
- `RadialOrbitalTimeline.tsx` — SVG orbital canvas rendering nodes and center pulse
- `OrbitalNode.tsx` — individual clickable orbital node
- `NodeCard.tsx` — expanded detail card for the active node
- `useOrbitalState.ts` — auto-rotation interval, expand/collapse state, active node tracking, `MergedPillar` type
- `useOrbitalGeometry.ts` — geometric helpers for node positioning
- `constants.ts` — orbital radius and style constants

**`components/sections/AppCinematic/`:**
- `index.tsx` — re-exports `CinematicCanvas` as `AppCinematic`
- `CinematicCanvas.tsx` — container: mounts GSAP timeline and mouse effects, embeds Remotion `<Player>`
- `useGsapTimeline.ts` — scroll-pinned GSAP timeline (4000px scroll → cinematic sequence)
- `useMouseEffects.ts` — 3D tilt on phone mockup using GSAP + `requestAnimationFrame`
- `constants.ts` — injected CSS styles string (`INJECTED_STYLES`)

**`components/sections/PricingSection/`:**
- `index.tsx` — renders header + grid of cards, owns `selectedPlan` state
- `PricingCard.tsx` — individual plan card
- `PricingHeader.tsx` — section headline
- `useMergePricingData.ts` — merges `data/pricing.ts` plans with locale (currently passes through `plans` directly)
- `constants.ts` — `PRICING_CONFIG` grid/spacing Tailwind class strings

**`components/sections/FaqCta/`:**
- `index.tsx` — receives `t.faq` and renders the three sub-components in sequence
- `FaqAccordion.tsx` — FAQ list using shadcn/ui accordion
- `GuaranteeBlock.tsx` — 21-day guarantee block
- `CtaFinal.tsx` — final CTA section at page bottom

**`components/remotion/`:**
- `Root.tsx` — Remotion `<Folder>` + four `<Composition>` declarations; entry point for `npx remotion studio`
- `AppShowcase.tsx` — animated phone mockup cycling through 4 app screens; embedded in-page via `<Player>`
- `HeroReel.tsx` — typewriter + fade composition for video rendering (1920×1080, 30s)
- `PillarsReveal.tsx` — pillars animation for video rendering (1080×1080, 15s)
- `CountdownTimer.tsx` — countdown bar for video rendering (600×200, 24s)

**`components/ui/`:**
- shadcn/ui components: `accordion.tsx`, `badge.tsx`, `button.tsx`, `card.tsx`
- Custom components: `LanguageSwitcher.tsx`, `ThemeToggle.tsx`, `CheckIcon.tsx`, `ripple-button.tsx`, `image-comparison.tsx`
- Stub: `ShaderCanvas.tsx` — exports a canvas element but has no shader logic implemented

**`data/`:**
- `pillars.ts` — exports `pillars: Pillar[]` and `Pillar` interface; 8 entries with `icon` (Lucide), `relatedIds`, `status`, `energy`
- `pricing.ts` — exports `plans: Plan[]` and `Plan` interface; 3 entries with prices (CAD$) and WhatsApp links
- `constants.ts` — exports `WHATSAPP_BASE`, `WA_ROUTES`, `COLORS`, `SOCIAL_LINKS`, `APP_METRICS`
- `gallery-images.ts` — exports `galleryImages`: 16 Unsplash URLs

**`lib/`:**
- `utils.ts` — exports `cn()` (clsx + tailwind-merge)
- `geometry.ts` — exports `calculateOrbitalPosition()`, `polarToCartesian()`, `cartesianToPolar()`
- `hooks/index.ts` — barrel re-export for all hooks
- `hooks/useMousePosition.ts` — tracks `{ x, y }` via `mousemove`
- `hooks/useOrbitalRotation.ts` — auto-increments angle via `setInterval`; accepts `autoRotate` and `rotationSpeed`
- `hooks/useScrollParallax.ts` — wraps Framer Motion `useScroll` with a `ref` and optional `onProgress` callback
- `i18n/context.tsx` — `I18nProvider` (detects locale, exposes `t` and `setLocale`), `useTranslation` hook

**`lib/i18n/translations/`:**
- Two parallel structures exist:
  - Flat files `pt.ts`, `en.ts`, `es.ts` at the root of `translations/` — legacy; `pt.ts` is the canonical source for the `Translations` type
  - Per-locale folders `pt/`, `en/`, `es/` with one file per section — active structure imported by `context.tsx`
- `context.tsx` imports from the folder structure: `import { pt } from './translations/pt'` (which resolves to `translations/pt/index.ts`)

## Naming Conventions

**Files:**
- Section components: PascalCase matching the section name — `IdentificationSection.tsx`, `ComparisonTable.tsx`
- Modular section folders: PascalCase folder + `index.tsx` as the public entry — `PillarsOrbital/index.tsx`
- Hooks: camelCase with `use` prefix — `useGsapTimeline.ts`, `useOrbitalState.ts`
- Constants files: `constants.ts` inside each modular folder
- Data files: kebab-case noun — `gallery-images.ts`, `pillars.ts`
- Translation files: section name in camelCase — `pillars.ts`, `pricing.ts`

**Exports:**
- Named exports for components: `export function HeroParallax() {}`
- Default re-export at bottom of modular index: `export default HeroParallax;`
- Data files use named exports: `export const pillars`, `export const plans`

## Where to Add New Code

**New page section (simple, single file):**
- Implementation: `components/sections/NewSection.tsx`
- Import in `app/page.tsx`: static import if no animation library; dynamic with `{ ssr: false }` if using GSAP or Remotion

**New page section (complex, multi-file):**
- Create folder: `components/sections/NewSection/`
- Public entry: `components/sections/NewSection/index.tsx`
- Sub-components, hooks, constants as needed inside the folder
- Translations: add key to `lib/i18n/translations/pt/`, `en/`, `es/` and re-export from each locale's `index.ts`

**New translation namespace:**
- Add `newSection.ts` to `lib/i18n/translations/pt/`, `en/`, `es/`
- Add `export * as newSection from './newSection';` to each locale's `index.ts`
- Access via `t.newSection.*` in components

**New static data (non-translated):**
- Add to `data/` as a new named export file
- Use Lucide icons for visual elements (follow `pillars.ts` pattern)

**New shared hook:**
- Add to `lib/hooks/`
- Re-export from `lib/hooks/index.ts`

**New Remotion composition:**
- Add component to `components/remotion/`
- Register in `components/remotion/Root.tsx` with a `<Composition>`
- To embed in page: dynamic import `@remotion/player`'s `<Player>` + the component (both with `ssr: false`)

**New UI primitive:**
- shadcn/ui components: `components/ui/` following shadcn conventions
- Custom primitives: `components/ui/ComponentName.tsx` with named export

## Special Directories

**`.planning/`:**
- Purpose: GSD planning artifacts — codebase maps, phase plans
- Generated: By GSD commands
- Committed: Yes

**`.backup-translations/`:**
- Purpose: Snapshot of the flat `pt.ts`, `en.ts`, `es.ts` before the split-file refactor
- Generated: Manual backup
- Committed: Yes (but not imported anywhere)

**`.next/`:**
- Purpose: Next.js build output and cache
- Generated: Yes
- Committed: No (in `.gitignore`)

**`public/placeholders/`:**
- Purpose: Local images for `HeroParallax` blocks (`hero-1.jpg`, `hero-2.jpg`, `hero-3.jpg`)
- Referenced in: `components/sections/HeroParallax/constants.ts` via `/placeholders/hero-*.jpg` paths

---

*Structure analysis: 2026-04-02*
