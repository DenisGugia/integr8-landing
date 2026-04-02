# Technology Stack

**Analysis Date:** 2026-04-02

## Languages

**Primary:**
- TypeScript 5.x - all application code (`.ts`, `.tsx`)

**Secondary:**
- CSS (Tailwind v4 utility classes + CSS custom properties in `app/globals.css`)

## Runtime

**Environment:**
- Node.js (version not pinned — no `.nvmrc` or `.node-version` file detected)

**Package Manager:**
- npm
- Lockfile: `package-lock.json` present

## Frameworks

**Core:**
- Next.js 16.2.1 - App Router, React Server Components
- React 19.2.4 - UI rendering

**Build/Dev:**
- Turbopack — enabled via `turbopack: {}` in `next.config.ts` (default in Next.js 16)
- `@tailwindcss/postcss` — PostCSS plugin for Tailwind v4 (`postcss.config.mjs`)

## TypeScript Configuration

- Config file: `tsconfig.json`
- `strict: true` — full strict mode enabled
- `target: ES2017`
- `moduleResolution: bundler`
- `isolatedModules: true`
- `incremental: true`
- Path alias: `@/*` maps to project root `./`
- Next.js plugin registered under `compilerOptions.plugins`

## Styling

**Framework:** Tailwind CSS 4.x (no `tailwind.config.ts` — v4 uses CSS-first configuration)

**CSS entry:** `app/globals.css`
- `@import "tailwindcss"` — Tailwind v4 import
- `@import "tw-animate-css"` — animation utilities (`tw-animate-css ^1.4.0`)
- `@import "shadcn/tailwind.css"` — shadcn theme tokens
- `@custom-variant dark (&:is(.dark *))` — class-based dark mode
- `@theme inline { ... }` block maps CSS custom properties to Tailwind tokens

**Utilities:**
- `clsx ^2.1.1` — conditional class merging
- `tailwind-merge ^3.5.0` — Tailwind class conflict resolution
- `class-variance-authority ^0.7.1` — variant-based component styling

**Fonts:** Inter (Google Fonts via `next/font/google`), loaded in `app/layout.tsx` as CSS variable `--font-inter`

**Theme:** Dark/light via `next-themes ^0.4.6`, `ThemeProvider` wraps the app in `app/layout.tsx` with `attribute="class"` and `defaultTheme="system"`

## Animation Libraries

**Framer Motion 12.38.0:**
- Used across 11 component files
- Primary patterns: `motion.div` with `initial`/`whileInView`/`animate`, scroll-driven animations via `useScroll` + `useTransform`
- Key files: `components/sections/HeroParallax/ParallaxBlock.tsx`, `components/sections/FaqCta/CtaFinal.tsx`, `components/sections/DenisStory.tsx`, `components/sections/IdentificationSection.tsx`, and others

**GSAP 3.14.2 + @gsap/react 2.1.2:**
- Used exclusively in the `AppCinematic` section
- Plugin: `ScrollTrigger` (registered at runtime via `gsap.registerPlugin(ScrollTrigger)`)
- Custom hook: `components/sections/AppCinematic/useGsapTimeline.ts` — scroll-pinned timeline with 4000px scroll distance
- Mouse parallax hook: `components/sections/AppCinematic/useMouseEffects` (inferred from imports in `CinematicCanvas.tsx`)

## Video / Remotion

**Remotion 4.0.443 (`remotion`, `@remotion/cli`, `@remotion/player`):**

Config file: `remotion.config.ts`
- Entry point: `./components/remotion/Root.tsx`
- Video format: JPEG
- Concurrency: 2

Compositions defined in `components/remotion/Root.tsx`:
- `AppShowcase` — 240 frames, 30fps, 1080×1920 (portrait)
- `CountdownTimer` — 720 frames, 30fps, 600×200 (wide)
- `HeroReel` and `PillarsReveal` — defined in `Root.tsx`, not currently rendered via Player in-page

Player usage (runtime, client-side only via `next/dynamic` with `ssr: false`):
- `AppShowcase` rendered in `components/sections/AppCinematic/CinematicCanvas.tsx`
- `CountdownTimer` rendered in `components/sections/FaqCta/CtaFinal.tsx`

## UI Component Libraries

- `@base-ui/react ^1.3.0` — headless UI primitives
- `shadcn ^4.1.0` — component collection (config in `components.json`)
- `lucide-react ^1.7.0` — icon set
- `react-icons ^5.6.0` — additional icon set

## Key Scripts

```bash
npm run dev      # Next.js dev server with Turbopack
npm run build    # Production build
npm start        # Start production server
npm run lint     # ESLint (config: eslint.config.mjs, eslint-config-next 16.2.1)
```

---

*Stack analysis: 2026-04-02*
