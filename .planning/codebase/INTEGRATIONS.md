# External Integrations

**Analysis Date:** 2026-04-02

## APIs & External Services

**WhatsApp (wa.me):**
- Used as the sole CTA mechanism throughout the landing page — no internal checkout or form
- Base number: `+1 226 961 7351` (Canadian number)
- Defined in `data/constants.ts`:

```ts
export const WHATSAPP_BASE = "https://wa.me/12269617351";

export const WA_ROUTES = {
  protocol:     `${WHATSAPP_BASE}?text=Quero+começar+meu+protocolo`,
  consultation: WHATSAPP_BASE,
  contact:      WHATSAPP_BASE,
};
```

- `WA_ROUTES.protocol` — pre-filled message for signup intent
- `WA_ROUTES.consultation` / `WA_ROUTES.contact` — plain chat link

Note: `CtaFinal.tsx` currently has hardcoded string literals `'{WA_ROUTES.contact}?text=...'` instead of importing from `data/constants.ts`. This is a bug — the literal string `{WA_ROUTES.contact}` is rendered as the href, not the resolved URL.

**Social Links:**
- Defined in `data/constants.ts`
- Instagram: `https://instagram.com/denisgugia`
- LinkedIn: `https://linkedin.com/in/denisgugia`

## Data Storage

**Databases:** None — no database client detected.

**File Storage:** Local filesystem only (public assets in `/public`).

**Caching:** None configured.

## Authentication & Identity

**Auth Provider:** None — no authentication layer detected.

## i18n System

**Approach:** Custom React Context (no third-party i18n library).

**Supported locales:** `pt`, `en`, `es`

**Implementation files:**
- Context and provider: `lib/i18n/context.tsx`
- Translation objects: `lib/i18n/translations/pt.ts`, `en.ts`, `es.ts`
- Per-namespace sub-files: `lib/i18n/translations/{locale}/{nav,hero,identification,comparison,pillars,pricing,faq}.ts`
- Locale barrel: `lib/i18n/translations/{locale}/index.ts` (re-exports each namespace)

**How it works:**

1. `I18nProvider` in `lib/i18n/context.tsx` wraps the app (registered in `app/layout.tsx`)
2. SSR default locale is `"pt"` (hydration-safe)
3. On client mount (`useEffect`), `detectLocale()` checks:
   - `localStorage` key `"integr8-locale"` (user preference)
   - `navigator.language` prefix (`pt` / `en` / `es`)
   - Falls back to `"pt"`
4. `useTranslation()` hook returns `{ locale, t, setLocale }` — components access translations via `t.nav.cta`, `t.hero.headline`, etc.
5. Locale changes persist to `localStorage`

**Usage pattern in components:**
```tsx
const { t } = useTranslation();
// t is typed as Translations (inferred from pt.ts shape)
```

**Type source:** `Translations` type is derived from `pt.ts` — `en.ts` and `es.ts` must match the same shape.

## Dynamic Imports Strategy

All animation-heavy and Remotion-dependent sections are loaded client-side only via `next/dynamic` with `{ ssr: false }`.

**In `app/page.tsx`:**
```ts
import dynamicImport from "next/dynamic";

const HeroParallax   = dynamicImport(() => import("@/components/sections/HeroParallax"), { ssr: false });
const PillarsOrbital = dynamicImport(() => import("@/components/sections/PillarsOrbital"), { ssr: false });
const AppCinematic   = dynamicImport(() => import("@/components/sections/AppCinematic"), { ssr: false });
const LifestyleGallery = dynamicImport(() => import("@/components/sections/LifestyleGallery"), { ssr: false });
const PricingSection = dynamicImport(() => import("@/components/sections/PricingSection"), { ssr: false });
const FaqCta         = dynamicImport(() => import("@/components/sections/FaqCta"), { ssr: false });
```

Each dynamic section is wrapped in `<Suspense>` with a height-placeholder fallback. Statically rendered sections (no `ssr: false`): `Navbar`, `IdentificationSection`, `ComparisonTable`, `DenisStory`, `BeforeAfterSection`.

**Remotion Player dynamic imports (within components):**
- `@remotion/player` `Player` component loaded via `dynamic(..., { ssr: false })` in both `CinematicCanvas.tsx` and `CtaFinal.tsx`
- Remotion composition components (`AppShowcase`, `CountdownTimer`) are also dynamically imported within those files — double-layered to prevent SSR initialization errors (documented in `next.config.ts` comment)

## Remotion Player Usage

**`AppShowcase` in `components/sections/AppCinematic/CinematicCanvas.tsx`:**
```tsx
<Player
  component={AppShowcase}
  durationInFrames={240}
  compositionWidth={1080}
  compositionHeight={1920}
  fps={30}
/>
```
Embedded inside a GSAP-animated card that simulates an iPhone bezel. No autoPlay or controls — playback is not explicitly configured (defaults to no autoPlay).

**`CountdownTimer` in `components/sections/FaqCta/CtaFinal.tsx`:**
```tsx
<Player
  component={CountdownTimer}
  durationInFrames={720}
  fps={30}
  compositionWidth={600}
  compositionHeight={200}
  style={{ width: '100%', height: 'auto' }}
  autoPlay
  loop
  controls={false}
/>
```
Plays automatically and loops — used as a visual urgency element in the final CTA.

## Monitoring & Observability

**Error Tracking:** None detected.

**Logs:** No structured logging — `console.*` only.

## CI/CD & Deployment

**Hosting:** Not configured in the repo (no `vercel.json`, `netlify.toml`, `Dockerfile`, or equivalent detected).

**CI Pipeline:** None detected.

## Environment Configuration

**Required env vars:** None detected in source code (no `process.env` references found in application code — all external URLs are hardcoded in `data/constants.ts`).

**`.env` files:** Not read (existence noted per security policy).

## Webhooks & Callbacks

**Incoming:** None — no API routes under `app/api/` detected.

**Outgoing:** None — all external links are passive `<a>` tags to WhatsApp.

---

*Integration audit: 2026-04-02*
