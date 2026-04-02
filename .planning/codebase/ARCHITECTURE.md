# Architecture

**Analysis Date:** 2026-04-02

## Pattern Overview

**Overall:** Single-page application using Next.js App Router with a client-side rendering strategy. The entire page is a `"use client"` component due to animation libraries (GSAP, Framer Motion) and i18n context requiring browser APIs.

**Key Characteristics:**
- All sections rendered client-side (`"use client"` on `app/page.tsx` and every section)
- Heavy animation sections loaded via `next/dynamic` with `{ ssr: false }` to prevent SSR/hydration conflicts with GSAP ScrollTrigger and Remotion
- i18n runs entirely on the client — no URL-based routing per locale, state stored in `localStorage`
- Data split into two layers: static typed constants in `data/` (icons, prices, images) and translated strings in `lib/i18n/translations/`
- Remotion compositions live inside the Next.js repo and are embedded in-page via `@remotion/player`

## Layers

**Page Entry:**
- Purpose: Assembles all sections in order, controls which components are server-importable vs dynamically loaded
- Location: `app/page.tsx`
- Contains: Static imports for non-animated sections, dynamic imports for animation-heavy sections
- Depends on: All section components
- Used by: Next.js routing (root `/` route)

**Layout Layer:**
- Purpose: Global HTML shell, metadata, font loading, provider tree
- Location: `app/layout.tsx`
- Contains: `ThemeProvider` (next-themes), `I18nProvider`
- Depends on: `lib/i18n/context.tsx`, `next-themes`
- Used by: All pages via Next.js layout inheritance

**Section Components:**
- Purpose: Page sections, each self-contained with its own translations, data, and animation hooks
- Location: `components/sections/`
- Contains: Modular folders for complex sections (5 folders), single files for simpler sections (4 files)
- Depends on: `useTranslation()`, `data/` files, `lib/hooks/`
- Used by: `app/page.tsx`

**UI Primitives:**
- Purpose: Reusable stateless or lightly-stateful components
- Location: `components/ui/`
- Contains: shadcn/ui components + project-specific controls (ThemeToggle, LanguageSwitcher, ShaderCanvas)
- Depends on: `lib/utils.ts` (`cn()`)
- Used by: Section components and layout

**i18n Layer:**
- Purpose: Client-side locale detection, storage, and translation injection via React Context
- Location: `lib/i18n/`
- Contains: Context provider/hook (`context.tsx`), translation files per locale per section
- Depends on: `localStorage`, `navigator.language`
- Used by: Every section that renders text

**Data Layer:**
- Purpose: Static typed data that has no translated copy (icons, prices, orbital graph structure, gallery URLs)
- Location: `data/`
- Contains: `pillars.ts`, `pricing.ts`, `constants.ts`, `gallery-images.ts`
- Depends on: Nothing (no imports from the app)
- Used by: Section components, merged at runtime with translations

**Lib / Utilities:**
- Purpose: Shared hooks and math utilities
- Location: `lib/hooks/`, `lib/geometry.ts`, `lib/utils.ts`
- Depends on: Framer Motion (`useScrollParallax`), nothing external (`geometry.ts`, `utils.ts`)
- Used by: Section components

**Remotion Layer:**
- Purpose: Programmatic video compositions used as animated content inside the page
- Location: `components/remotion/`
- Contains: Four compositions (`HeroReel`, `PillarsReveal`, `AppShowcase`, `CountdownTimer`) and a `Root.tsx` entry point for the Remotion Studio/CLI
- Depends on: `remotion`, `@remotion/player`
- Used by: `CinematicCanvas.tsx` embeds `AppShowcase` via `<Player />`

## Data Flow

**Translation injection into sections:**

1. `I18nProvider` (in `app/layout.tsx`) initializes locale to `"pt"` on SSR
2. On client mount, `detectLocale()` reads `localStorage` key `"integr8-locale"`, falls back to `navigator.language`, defaults to `"pt"`
3. `setLocaleState(detectLocale())` fires in `useEffect`, causing a re-render with the correct locale
4. Any component calling `useTranslation()` receives `{ locale, t, setLocale }` — `t` is the full typed `Translations` object for the active locale
5. `LanguageSwitcher` calls `setLocale()` which updates state and persists to `localStorage`

**Pillars data merge pattern:**

```typescript
// PillarsOrbital/index.tsx
const { t } = useTranslation();
const mergedData: MergedPillar[] = pillars.map((pillar, index) => ({
  ...pillar,                              // icon, relatedIds, status, energy (from data/pillars.ts)
  title: t.pillars.items[index]?.title,  // translated strings (from i18n)
  shortTitle: t.pillars.items[index]?.shortTitle,
  date: t.pillars.items[index]?.date,
  content: t.pillars.items[index]?.content,
}));
```

The same merge-by-index pattern is used in `HeroParallax/index.tsx` for `internalBlocks` (which carry `imgUrl`) merged with `t.hero.blocks` (which carry copy).

**Pricing merge:**
- `data/pricing.ts` holds numeric prices, `isPopular`, and WhatsApp links
- `lib/i18n/translations/*/pricing.ts` holds plan names, descriptions, feature lists, button text
- `useMergePricingData` (in `PricingSection/`) merges them; currently only spreads `plans` from `data/pricing.ts` — the i18n pricing text is consumed directly in `PricingSection/index.tsx` via `t.pricing`

**State Management:**
- No global state manager. All state is local to section components or to `I18nContext`
- Animation state (rotation angle, expanded orbital nodes) lives in `useOrbitalState` (component-local hook)
- Theme state is owned by `next-themes` `ThemeProvider`

## Key Abstractions

**MergedPillar:**
- Purpose: Combines `Pillar` (icon, graph data) with translated text fields
- Defined in: `components/sections/PillarsOrbital/useOrbitalState.ts`
- Pattern: Spread merge at the section's index component before passing down

**Translations type:**
- Purpose: Statically-typed shape derived from the `pt` object, propagated to `en` and `es` via `DeepWriteable<typeof pt>`
- Defined in: `lib/i18n/translations/pt.ts` (line 250–258)
- Used by: `I18nContextValue.t`, ensuring type-safe access everywhere

**Dynamic import wrappers:**
- Purpose: Defer loading animation-heavy sections until after hydration, preventing SSR crashes
- Pattern: `dynamicImport(() => import("...").then(m => ({ default: m.NamedExport })), { ssr: false })`
- Defined in: `app/page.tsx`

## Entry Points

**Web page:**
- Location: `app/page.tsx`
- Triggers: HTTP GET `/`
- Responsibilities: Assembles section order, wraps animated sections in `<Suspense>` with height placeholders

**Remotion Studio / render:**
- Location: `components/remotion/Root.tsx` (registered in `remotion.config.ts`)
- Triggers: `npx remotion studio` or `npx remotion render`
- Responsibilities: Declares four `<Composition>` specs; only `AppShowcase` is embedded in the web page

## Animation Architecture

**Framer Motion — declarative scroll-driven animations:**
- Used in: `HeroParallax/ParallaxBlock.tsx`, `IdentificationSection.tsx`, `DenisStory.tsx`, `BeforeAfterSection.tsx`, `ComparisonTable.tsx`
- Pattern: `useScroll` + `useTransform` for parallax; `motion.div` with `whileInView` for entrance animations
- Scope: Components where animation maps directly to scroll position or viewport entry

**GSAP + ScrollTrigger — imperative timeline animations:**
- Used in: `AppCinematic/useGsapTimeline.ts`, `AppCinematic/useMouseEffects.ts`
- Pattern: `gsap.context()` scoped to a container `ref`, cleaned up in `useEffect` return with `ctx.revert()`
- ScrollTrigger: pins the section, maps a 4000px scroll distance to timeline progress (`scrub: 1`)
- Mouse: 3D tilt on the mockup card driven by `requestAnimationFrame` + `gsap.to()` for smooth interpolation
- Scope: `AppCinematic` only — imperative control needed for the scroll-pinned cinematic sequence

**CSS animations (Tailwind):**
- Used in: `RadialOrbitalTimeline.tsx` center orbit (`animate-pulse`, `animate-ping`)
- Scope: Simple looping ambient effects that don't require JS control

## Remotion Integration Pattern

Remotion compositions are standard React components that use Remotion hooks (`useCurrentFrame`, `useVideoConfig`, `interpolate`, `spring`) to drive frame-based animations.

The `AppShowcase` composition is embedded in the web page inside `CinematicCanvas.tsx`:

```typescript
const Player = dynamic(() => import('@remotion/player').then(m => ({ default: m.Player })), { ssr: false });
const AppShowcase = dynamic(() => import('@/components/remotion/AppShowcase')..., { ssr: false });

<Player
  component={AppShowcase}
  durationInFrames={240}
  compositionWidth={1080}
  compositionHeight={1920}
  fps={30}
/>
```

Both `Player` and `AppShowcase` are dynamically imported with `ssr: false` inside a component that is itself already dynamically imported in `page.tsx`. This double-dynamic pattern ensures Remotion's browser-only APIs never execute on the server.

The other three compositions (`HeroReel`, `PillarsReveal`, `CountdownTimer`) exist only for video rendering via the Remotion CLI — they are not embedded in the page.

---

*Architecture analysis: 2026-04-02*
