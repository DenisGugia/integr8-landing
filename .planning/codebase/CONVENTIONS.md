# Coding Conventions

**Analysis Date:** 2026-04-02

## Export Conventions

**Named exports everywhere.** Every component, hook, and utility uses a named export as its primary export.

Default exports appear only in two specific cases:
1. `app/page.tsx` and `app/layout.tsx` — required by Next.js App Router
2. Section barrel `index.tsx` files — they add `export default ComponentName` alongside the named export to support `next/dynamic` imports

```typescript
// components/sections/HeroParallax/index.tsx
export function HeroParallax() { ... }  // primary export
export default HeroParallax;            // added only for dynamic import compat
```

**Never use default-only exports** in components, hooks, utilities, or data files.

## "use client" Directive

Every component that uses browser APIs, React hooks, or animation libraries requires `'use client'` at the top of the file.

**Always add `'use client'` when the file:**
- Calls any React hook (`useState`, `useEffect`, `useRef`, `useContext`, etc.)
- Uses GSAP, Framer Motion, or Remotion
- Accesses `window`, `localStorage`, or DOM APIs
- Uses `useTranslation()` from `@/lib/i18n/context`

**Section barrel files (`index.tsx`)** carry `'use client'` because they re-export components that require it:
```typescript
// components/sections/AppCinematic/index.tsx
'use client';
export { CinematicCanvas as AppCinematic } from './CinematicCanvas';
```

**Server components** (no directive): `app/layout.tsx`, `app/not-found.tsx`, `app/error.tsx` — these only handle metadata, providers, and static markup.

**Colocated hooks** (e.g., `useGsapTimeline.ts`, `useMouseEffects.ts`) do NOT add `'use client'` themselves — they are imported only by client components, so the directive propagates from the parent.

## Import Patterns

**Path alias:** `@/` maps to the project root (configured in `tsconfig.json` as `"@/*": ["./*"]`).

Use `@/` for all cross-module imports. Never use relative paths that cross module boundaries.

```typescript
// Correct
import { useTranslation } from '@/lib/i18n/context';
import { COLORS, WA_ROUTES } from '@/data/constants';
import { cn } from '@/lib/utils';

// Correct — within the same module, relative is fine
import { useGsapTimeline } from './useGsapTimeline';
import { GSAP_CONFIG } from './constants';
```

**Import order convention (observed):**
1. React and framework imports (`react`, `next/dynamic`, `next/font`)
2. Third-party libraries (`framer-motion`, `gsap`, `react-icons`)
3. Internal cross-module imports (`@/lib/...`, `@/data/...`, `@/components/...`)
4. Local module imports (`./ComponentName`, `./constants`, `./useHook`)
5. Type-only imports (`import type { ... }`)

**Dynamic imports** use the aliased `dynamicImport` rename to avoid shadowing the native `import`:
```typescript
import dynamicImport from 'next/dynamic';

const HeroParallax = dynamicImport(
  () => import('@/components/sections/HeroParallax').then(m => ({ default: m.HeroParallax })),
  { ssr: false }
);
```

## Dynamic Import Pattern

Because all section components use named exports, dynamic imports require the `.then(m => ({ default: m.ComponentName }))` adapter. This is the only supported pattern for lazy-loading sections.

```typescript
// app/page.tsx — the canonical pattern
const PillarsOrbital = dynamicImport(
  () => import('@/components/sections/PillarsOrbital').then(m => ({ default: m.PillarsOrbital })),
  { ssr: false }
);
```

All heavy sections (GSAP, Remotion, Framer Motion, canvas) are dynamically imported with `{ ssr: false }` to prevent server-side rendering errors.

## i18n Conventions

`t` is a **typed object**, not a function. It is the `Translations` type, derived from the `pt` locale object in `lib/i18n/translations/pt.ts`.

Access translations by property path:
```typescript
const { t } = useTranslation();

// Correct
t.hero.headline
t.faq.items[0].q
t.pricing.plans[1].planName
t.nav.cta

// Wrong — t is not callable
t('hero.headline')
t.hero('headline')
```

`useTranslation()` returns `{ locale, t, setLocale }`. Destructure only what you need.

Sections receive translation values as **plain props** — they do not call `useTranslation()` themselves. Translation merging happens in the parent section container (`index.tsx`):
```typescript
// components/sections/FaqCta/index.tsx
const { t } = useTranslation();
return <FaqAccordion eyebrow={t.faq.eyebrow} items={t.faq.items} />;
```

Sub-components (`FaqAccordion`, `GuaranteeBlock`, `CtaFinal`) receive string/array props and are unaware of the i18n system.

## Ref Typing

React 19 requires `RefObject<T | null>` for mutable refs. Always include `| null` in the generic:

```typescript
// Correct — React 19 pattern
const containerRef = useRef<HTMLDivElement>(null);
// Type inferred as RefObject<HTMLDivElement>

// When passing refs to hooks, type parameters explicitly
export function useGsapTimeline(containerRef: React.RefObject<HTMLDivElement | null>) { ... }
export function useMouseEffects(
  mainCardRef: React.RefObject<HTMLDivElement | null>,
  mockupRef: React.RefObject<HTMLDivElement | null>
) { ... }
```

`useRef<number>(0)` for numeric accumulators (animation frame IDs, timers):
```typescript
const requestRef = useRef<number>(0);
let rotationTimer: ReturnType<typeof setInterval>;
```

## Component Naming

- **Components:** PascalCase — `HeroVideo`, `PricingCard`, `RadialOrbitalTimeline`
- **Hooks:** `useXxx` camelCase — `useGsapTimeline`, `useMouseEffects`, `useOrbitalState`
- **Constants:** UPPER_SNAKE_CASE — `ORBITAL_CONFIG`, `GSAP_CONFIG`, `PRICING_CONFIG`, `WA_ROUTES`, `COLORS`
- **Types/interfaces:** PascalCase — `MergedPillar`, `ParallaxBlock`, `Translations`
- **Files:** Match the export name — `HeroVideo.tsx`, `useGsapTimeline.ts`, `constants.ts`

## File Organization

**Modular section structure** — each complex section is a directory:

```
components/sections/SectionName/
├── index.tsx          # barrel: 'use client' + named + default export
├── MainComponent.tsx  # primary render component
├── SubComponent.tsx   # child components
├── constants.ts       # UPPER_SNAKE_CASE constants, interfaces, types
└── useHookName.ts     # colocated hook(s)
```

**Simple sections** (no internal composition) are single files: `IdentificationSection.tsx`, `ComparisonTable.tsx`, `DenisStory.tsx`.

**Shared hooks** live in `lib/hooks/` and are re-exported through `lib/hooks/index.ts`.

**Data** (static content, pricing, pillar definitions) lives in `data/` as typed constants: `data/constants.ts`, `data/pillars.ts`, `data/pricing.ts`.

**Translation data** is split by locale and section:
```
lib/i18n/translations/
├── pt.ts              # flat single-file fallback
├── pt/
│   ├── index.ts       # re-exports all pt sections
│   ├── hero.ts
│   ├── pricing.ts
│   └── ...
├── en/
└── es/
```

## Code Style

**Formatting:** No Prettier config found. Formatting is handled by ESLint (`eslint-config-next/core-web-vitals` + `eslint-config-next/typescript`).

**TypeScript:** strict mode enabled. Avoid `any` — use `as any` only when fighting third-party library type mismatches (e.g., Framer Motion offset arrays).

**Utility function:** `cn()` from `lib/utils.ts` for all conditional className merging:
```typescript
import { cn } from '@/lib/utils';
className={cn('base-class', isActive && 'active-class', className)}
```

**Inline styles** are used only for CSS custom properties (GSAP mouse tracking) and perspective transforms. All other styling uses Tailwind utility classes.

---

*Convention analysis: 2026-04-02*
