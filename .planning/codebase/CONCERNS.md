# Codebase Concerns

**Analysis Date:** 2026-04-02

---

## Critical Bugs

**WA_ROUTES used as string literals instead of imports (three files):**
- Issue: `WA_ROUTES` is imported from `@/data/constants` but never actually used. Instead, the variable is assigned to a string literal containing the un-interpolated expression `'{WA_ROUTES.contact}'` — curly braces included, single-quoted, treated as plain text. All WhatsApp links in these components point to the literal string `{WA_ROUTES.contact}` instead of `https://wa.me/12269617351`.
- Files:
  - `components/layout/Navbar.tsx` line 9: `const WA = "{WA_ROUTES.contact}";` — import on line 4 is dead
  - `components/sections/FaqCta/CtaFinal.tsx` lines 9–10: `const WA_START = '{WA_ROUTES.contact}?text=...'` and `const WA = '{WA_ROUTES.contact}'` — no import at all
  - `components/sections/LifestyleGallery.tsx` line 8: `const WA = "{WA_ROUTES.contact}?text=..."` — import on line 2 is dead
- Impact: Every CTA button in the Navbar, LifestyleGallery, and the final CTA section sends users to a broken link. These are the three highest-traffic conversion points on the page.
- Fix: Replace the string literals with actual JS expressions. Example: `const WA = WA_ROUTES.contact;`

**CinematicCanvas hardcodes the WhatsApp number directly:**
- Issue: `components/sections/AppCinematic/CinematicCanvas.tsx` line 40 uses `href="https://wa.me/12269617351"` — a hardcoded literal that bypasses `WA_ROUTES` and `data/constants.ts`. If the phone number changes, this file will not be updated along with the rest.
- Files: `components/sections/AppCinematic/CinematicCanvas.tsx:40`
- Fix: Import `WA_ROUTES` from `@/data/constants` and use `WA_ROUTES.protocol` or `WA_ROUTES.contact`.

**data/pricing.ts also hardcodes the WhatsApp URL:**
- Issue: `data/pricing.ts` line 9 defines `const WA = "https://wa.me/12269617351?text=..."` in isolation, duplicating what already exists as `WA_ROUTES.protocol` in `data/constants.ts`.
- Files: `data/pricing.ts:9`
- Fix: Import and reuse `WA_ROUTES.protocol`.

---

## Placeholder Assets

**All hero parallax images are stub files (~397 bytes each):**
- The files `public/placeholders/hero-1.jpg`, `hero-2.jpg`, `hero-3.jpg` exist but are ~397 bytes — clearly not real images (a typical JPEG thumbnail is 10–100 KB minimum). They are referenced directly in `components/sections/HeroParallax/constants.ts` lines 11–13.
- Impact: The three parallax scroll sections render blank or broken image backgrounds.
- Fix: Replace with real photography. File paths can remain the same or be moved to `public/images/`.

**Before/After comparison images are stub files (~536–547 bytes):**
- `public/placeholders/casal-before.jpg` and `public/placeholders/casal-after.jpg` are sub-600-byte stubs. Used in `components/sections/BeforeAfterSection.tsx` lines 52–56.
- Impact: The scroll-driven before/after slider renders without content.

**Denis photo is a stub file (357 bytes):**
- `public/placeholders/denis-photo.jpg` is a 357-byte stub. Used in `components/sections/DenisStory.tsx` line 17.
- Impact: The coach photo slot renders blank; the component has a fallback `onError` that hides the broken img tag but the "foto Denis" text label remains visible as an absolute-positioned overlay.

**App screen GIF is a stub (723 bytes):**
- `public/placeholders/app-screen.gif` exists at 723 bytes. Not currently referenced in any component scan — may be unused or intended for future use.

---

## Stub / Incomplete Components

**ShaderCanvas renders nothing:**
- `components/ui/ShaderCanvas.tsx` is a 9-line stub. The `useEffect` body is empty (`if (canvasRef.current) {}`). It renders a `<canvas>` element but never draws anything.
- Files: `components/ui/ShaderCanvas.tsx:6`
- Impact: `PricingHeader` uses `ShaderCanvas` as a decorative background behind the pricing section headline. It shows an empty canvas element taking up `h-80` space with `opacity-30`.
- Fix: Implement the WebGL/Canvas shader or replace with a CSS gradient until the implementation is ready.

**AppShowcase renders generic placeholder screens, not a real app:**
- `components/remotion/AppShowcase.tsx` cycles through four hard-coded screen stubs (`Onboarding`, `Dashboard`, `Workouts`, `Comunidade`) with grey rectangle placeholders for content. The badge reads "✓ FitBudd" — a third-party app name, not INTEGR8.
- Files: `components/remotion/AppShowcase.tsx:9–13`, `:121`
- Impact: The cinematic app section presents a competitor's brand name and generic filler UI instead of the actual INTEGR8 or FitBudd-branded screens.

**CinematicCanvas section text is English placeholder copy:**
- `components/sections/AppCinematic/CinematicCanvas.tsx` lines 25–26 render `"App Cinematic"` and `"Experience the future of mobile"` — English strings not wired to i18n, not matching the brand voice.
- Files: `components/sections/AppCinematic/CinematicCanvas.tsx:25–26`
- Note: The `pt.ts` translation file has `appCinematic.eyebrow` and `appCinematic.headline` defined but `CinematicCanvas` never calls `useTranslation()`.

**CountdownTimer shows a fake urgency clock:**
- `components/remotion/CountdownTimer.tsx` counts down from 24 hours based on `frame % totalFramesFor24h`, not from a real deadline. Since the Remotion Player in `CtaFinal` is set to `loop`, the timer resets endlessly. The displayed time has no relationship to any actual offer end date.
- Files: `components/sections/FaqCta/CtaFinal.tsx:30–41`, `components/remotion/CountdownTimer.tsx`
- Impact: Dark pattern risk. The countdown is perpetually looping with no real expiry, which can violate consumer protection rules in Canada (where the business operates).

---

## Pricing Section: Data / Translation Disconnect

**PricingCard renders only price and WhatsApp link — ignores all i18n plan data:**
- `data/pricing.ts` holds price and whatsappLink only. `lib/i18n/translations/pt.ts` (and en/es) holds planName, description, features array, and buttonText. `useMergePricingData` returns the raw `plans` array without merging i18n data.
- Files: `components/sections/PricingSection/useMergePricingData.ts`, `components/sections/PricingSection/PricingCard.tsx`
- Impact: Plan names, feature lists, and localized button text from translations are never rendered. The card shows price + a hardcoded "Começar" label only, ignoring all features defined in the translation files.
- Fix: Merge `t.pricing.plans[i]` into each plan inside `useMergePricingData`, and update `PricingCard` to render `plan.planName`, `plan.features`, and `plan.buttonText`.

**`selectedPlan` state in PricingSection is set but never used:**
- `components/sections/PricingSection/index.tsx` line 11 declares `const [selectedPlan, setSelectedPlan] = useState<number | null>(null)`. `onCtaClick` sets it, but nothing in the component reads `selectedPlan` or triggers a modal/action based on it.
- Files: `components/sections/PricingSection/index.tsx:11`

**PRICING_CONFIG.grid.cols is a number (3), used in a template literal as a Tailwind class:**
- `components/sections/PricingSection/index.tsx` line 20: `` `grid ${PRICING_CONFIG.grid.cols}` `` produces `grid 3` — not a valid Tailwind class. The actual grid columns come from the explicit `md:grid-cols-2 lg:grid-cols-3` that follows, so this is harmless but produces junk in the className string.
- Files: `components/sections/PricingSection/constants.ts:8`, `components/sections/PricingSection/index.tsx:20`

---

## SSR / Hydration Concerns

**`app/page.tsx` is marked `"use client"` at the root:**
- The entire page is a client component, disabling server-side rendering for all content. All sections are additionally wrapped in `dynamic(..., { ssr: false })`. This means the page ships with no server-rendered HTML — bad for SEO and initial load performance.
- Files: `app/page.tsx:1`
- Fix: Remove `"use client"` from `app/page.tsx`. Move client-only sections (Remotion, GSAP) to their own `"use client"` components (most already are). Only sections that genuinely cannot SSR need `ssr: false`.

**I18nProvider causes a locale flash on every page load:**
- `lib/i18n/context.tsx` initializes with `"pt"` on the server, then runs `detectLocale()` in a `useEffect` to apply the real preference. This produces a visible content re-render for English and Spanish users.
- Files: `lib/i18n/context.tsx:33–37`
- The cast `pt as unknown as Translations` on line 11 also suppresses a type mismatch that should be resolved properly.

---

## Dead Code / Unused Imports

**`WA_ROUTES` import in Navbar is unused:**
- `components/layout/Navbar.tsx` line 4 imports `WA_ROUTES` but the actual URL is the broken string literal on line 9.
- Files: `components/layout/Navbar.tsx:4`

**`WA_ROUTES` import in LifestyleGallery is unused:**
- `components/sections/LifestyleGallery.tsx` line 2 imports `WA_ROUTES`, unused for the same reason.
- Files: `components/sections/LifestyleGallery.tsx:2`

**`eslint-disable-next-line react-hooks/exhaustive-deps` in LifestyleGallery:**
- `components/sections/LifestyleGallery.tsx:48` suppresses the missing-deps warning for `shuffleSquares` in a `useEffect`. The `shuffleSquares` function is defined inside the component and captures `setSquares`, which is stable — this could be fixed by moving the function into the effect or wrapping in `useCallback`.

**`appCinematic` translation keys defined but never consumed:**
- `lib/i18n/translations/pt.ts` lines 140–144 define `appCinematic.eyebrow`, `appCinematic.headline`, and `appCinematic.features`. No component reads these keys.

---

## Performance Concerns

**Hero video is 8.2 MB with no `loop` or `preload` attribute:**
- `public/videos/hero-video.mp4` is 8.2 MB. `HeroVideo` renders it with `autoPlay` and `muted` but no `loop` attribute, so it plays once and stops. No `preload` attribute is set (browser defaults vary). No poster image is defined.
- Files: `components/sections/HeroParallax/HeroVideo.tsx:18–26`
- Fix: Add `loop`, set `preload="none"` or `preload="metadata"`, and add a `poster` attribute pointing to a compressed still frame.

**GSAP ScrollTrigger pins 4000px of scroll on the AppCinematic section:**
- `components/sections/AppCinematic/useGsapTimeline.ts` pins the cinematic container for `+=4000` scroll units. Combined with the Remotion player also loading inside it, this section holds a large scroll reservation regardless of viewport height.
- Files: `components/sections/AppCinematic/useGsapTimeline.ts:28–35`

**LifestyleGallery shuffles 16 Unsplash images every 3 seconds via external URLs:**
- `data/gallery-images.ts` references 16 Unsplash CDN URLs. Images are loaded on every shuffle cycle and there is no lazy loading or intersection observer — all 16 fire on mount.
- Files: `data/gallery-images.ts`, `components/sections/LifestyleGallery.tsx:25–38`

**Multiple `dangerouslySetInnerHTML` injections of CSS strings:**
- `components/sections/AppCinematic/CinematicCanvas.tsx` line 22 injects a `<style>` block via `dangerouslySetInnerHTML`. This is evaluated on every render and bypasses Next.js style handling/deduplication.

---

## Missing Error Boundaries

**No error boundaries around Remotion players:**
- `CtaFinal.tsx` and `CinematicCanvas.tsx` load Remotion players via `next/dynamic`. If the player bundle fails to load (network error, bundle size issue), the components throw without any catch boundary. The page-level `app/error.tsx` catches unhandled errors but shows a generic "Algo deu errado" message with no fallback content for these sections.
- Files: `components/sections/FaqCta/CtaFinal.tsx:6–7`, `components/sections/AppCinematic/CinematicCanvas.tsx:9–10`

---

## Root Automation Scripts Left in Project Root

**Four automation scripts and two log files committed to the repo root:**
- `dia3-automation.js`, `dia3-automation-v2.js`, `dia3-automation-v3.js`, `dia3-automation-v4.js`, `dia3-log.txt`, `dia3-log-v2.txt`, `DIA-2-automation.sh`, `refactor-complete.js`, `refactor-sprint2.js`, `refactor-sprint3.js`, `refactor-sprint4.js` are all present in the project root.
- These are development automation/refactoring scripts with no purpose in a deployed codebase. They inflate the repository and could be confusing if the project is opened by collaborators or published.
- Fix: Delete or move to a `.scripts/` directory and add to `.gitignore`.

---

*Concerns audit: 2026-04-02*
