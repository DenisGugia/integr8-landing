# Testing Patterns

**Analysis Date:** 2026-04-02

## Current Test Setup

**No tests exist in this codebase.**

Confirmed absence of:
- Jest config (`jest.config.js`, `jest.config.ts`, `jest.config.mjs`)
- Vitest config (`vitest.config.ts`, `vitest.config.mjs`)
- Cypress config (`cypress.config.ts`)
- Playwright config (`playwright.config.ts`)
- Any `__tests__` directories
- Any `*.test.ts`, `*.test.tsx`, `*.spec.ts`, `*.spec.tsx` files

No test-related packages in `devDependencies` (`package.json`). The only quality tooling present is ESLint.

## Current Quality Gate

The sole automated quality check is a successful production build:

```bash
npm run build     # next build — catches type errors, import errors, SSR compatibility
npm run lint      # eslint — catches lint rule violations
```

A passing `npm run build` is the minimum bar before shipping any change. Next.js build performs:
- TypeScript type checking (full project)
- Module resolution validation
- SSR compatibility checks (catches browser-only code not guarded by `'use client'` or `typeof window !== 'undefined'`)
- Turbopack bundling (enabled via `turbopack: {}` in `next.config.ts`)

## What Should Be Tested

When tests are introduced, these are the highest-value targets:

**i18n system (`lib/i18n/`):**
- `useTranslation()` returns correct `t` object for each locale (`pt`, `en`, `es`)
- `setLocale()` persists to `localStorage` and updates state
- SSR default is `"pt"` (no `window` access on server)
- All three locale objects have identical key shapes (structural parity)
- Files: `lib/i18n/context.tsx`, `lib/i18n/translations/pt.ts`, `lib/i18n/translations/en.ts`, `lib/i18n/translations/es.ts`

**Translation completeness:**
- Each locale's `index.ts` exports all sections
- No missing keys between `pt`, `en`, and `es`
- Files: `lib/i18n/translations/*/index.ts`

**Data integrity (`data/`):**
- `pricing.ts` plans array has expected shape
- `pillars.ts` has exactly 8 entries
- `constants.ts` exports are defined and non-empty
- Files: `data/pricing.ts`, `data/pillars.ts`, `data/constants.ts`

**Utility (`lib/utils.ts`):**
- `cn()` merges Tailwind classes correctly
- `cn()` handles falsy values without errors

**Hooks (`lib/hooks/`, colocated hooks):**
- `useOrbitalState` — `toggleItem` collapses others, `reset` restores defaults
- `useMergePricingData` — returns correct number of plans per locale
- Files: `components/sections/PillarsOrbital/useOrbitalState.ts`, `components/sections/PricingSection/useMergePricingData.ts`

## Recommended Test Stack (when introducing tests)

Given the existing stack (Next.js 16, React 19, TypeScript strict), the recommended setup is:

```bash
# Install
npm install -D vitest @vitejs/plugin-react jsdom @testing-library/react @testing-library/user-event
```

**Config location:** `vitest.config.ts` at project root

**Test file location:** Co-locate with source — `lib/utils.test.ts` alongside `lib/utils.ts`, `lib/i18n/context.test.tsx` alongside `lib/i18n/context.tsx`

**Run commands (once configured):**
```bash
npx vitest           # watch mode
npx vitest run       # single run (CI)
npx vitest --coverage
```

Vitest is preferred over Jest because it shares the Vite/ESM module resolution that Next.js 16 with Turbopack uses, reducing config friction with `@/` path aliases and ESM-only packages (e.g., `framer-motion`, `gsap`).

## SSR Guard Pattern (Manual Testing)

Components with browser-only dependencies guard with:
```typescript
if (typeof window === 'undefined') return;
```

This pattern is in `useGsapTimeline.ts` and `useMouseEffects.ts`. When writing tests for these hooks, the JSDOM environment satisfies `typeof window !== 'undefined'`, so mock `window.innerWidth`/`window.innerHeight` as needed.

All heavy sections are loaded with `{ ssr: false }` in `app/page.tsx`, which bypasses SSR for those components entirely. Build verification catches any component that accesses `window` without a guard at the module level.

---

*Testing analysis: 2026-04-02*
