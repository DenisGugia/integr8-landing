# integr8-landing — Contexto Completo do Projeto

> Cole este documento no início de qualquer novo chat para ter contexto completo do projeto.

---

## O Projeto

Landing page de vendas para o protocolo INTEGR8, um programa de coaching de fitness online. Público: empreendedores brasileiros em Toronto, Canadá. O produto é o C.O.R.E. 8 Protocol — 8 pilares de saúde (treino, nutrição, sono, etc.) com acompanhamento individualizado.

**Repo:** https://github.com/DenisGugia/integr8-landing
**Stack local:** `cd C:\Users\denis\integr8-landing && npm run dev` → http://localhost:3000
**Build:** `npm run build`
**Deploy:** GitHub → Vercel (ou pendente de configuração)
**Último Relatório:** [docs/REPORTS/EXECUTION_REPORT_2026_04_02.md](file:///c:/Users/denis/integr8-landing/docs/REPORTS/EXECUTION_REPORT_2026_04_02.md)

---

## Stack Técnico

| Camada | Tecnologia |
|--------|-----------|
| Framework | Next.js 16.2.1, App Router |
| Runtime | React 19.2.4 |
| Linguagem | TypeScript 5.x (strict mode) |
| Estilização | Tailwind CSS 4.x (CSS-first, sem tailwind.config.ts) |
| Animação 1 | Framer Motion 12 — scroll/viewport animations |
| Animação 2 | GSAP 3.14 + ScrollTrigger — AppCinematic apenas |
| Vídeo | Remotion 4.x + @remotion/player |
| UI | shadcn/ui + base-ui/react + lucide-react |
| i18n | Context API próprio (pt/en/es), sem lib externa |
| Bundler | Turbopack (padrão no Next.js 16) |
| Package manager | npm |

---

## Estrutura de Arquivos

```
integr8-landing/
├── app/
│   ├── layout.tsx          # ThemeProvider + I18nProvider + Inter font
│   ├── page.tsx            # Monta todas as seções + dynamic imports
│   └── globals.css         # Tailwind v4 + dark mode via classe .dark
├── components/
│   ├── layout/
│   │   └── Navbar.tsx
│   ├── sections/
│   │   ├── HeroParallax/          # index, HeroVideo, ParallaxBlock, constants
│   │   ├── PillarsOrbital/        # index, RadialOrbitalTimeline, OrbitalNode, NodeCard,
│   │   │                          # useOrbitalState, useOrbitalGeometry, constants
│   │   ├── AppCinematic/          # index, CinematicCanvas, useGsapTimeline,
│   │   │                          # useMouseEffects, constants
│   │   ├── PricingSection/        # index, PricingCard, PricingHeader,
│   │   │                          # useMergePricingData, constants
│   │   ├── FaqCta/                # index, FaqAccordion, GuaranteeBlock, CtaFinal
│   │   ├── IdentificationSection.tsx
│   │   ├── ComparisonTable.tsx
│   │   ├── DenisStory.tsx
│   │   ├── BeforeAfterSection.tsx
│   │   └── LifestyleGallery.tsx
│   ├── remotion/
│   │   ├── Root.tsx               # Registry para Remotion CLI
│   │   ├── AppShowcase.tsx        # Embutido na página via <Player />
│   │   ├── CountdownTimer.tsx     # Embutido no FaqCta via <Player />
│   │   ├── HeroReel.tsx           # Só para render via CLI
│   │   └── PillarsReveal.tsx      # Só para render via CLI
│   └── ui/
│       ├── ShaderCanvas.tsx       # ⚠️ STUB — canvas sem implementação
│       ├── LanguageSwitcher.tsx
│       ├── ThemeToggle.tsx
│       └── ... (shadcn components)
├── data/
│   ├── constants.ts        # WA_ROUTES, COLORS, APP_METRICS
│   ├── pillars.ts          # 8 pilares: { id, icon, relatedIds, status, energy }
│   ├── pricing.ts          # { price, priceAVista, isPopular, buttonVariant, whatsappLink }
│   └── gallery-images.ts   # URLs Unsplash para LifestyleGallery
├── lib/
│   ├── geometry.ts         # calculateOrbitalPosition, polarToCartesian, cartesianToPolar
│   ├── utils.ts            # cn() — clsx + tailwind-merge
│   ├── hooks/              # useMousePosition, useOrbitalRotation, useScrollParallax
│   └── i18n/
│       ├── context.tsx     # I18nProvider + useTranslation()
│       └── translations/
│           ├── pt/ en/ es/ # Split por seção (nav, hero, pillars, pricing, faq, etc.)
└── public/
    ├── placeholders/       # ⚠️ Imagens stub (hero-1/2/3.jpg, casal-before/after, denis-photo)
    └── videos/             # hero-video.mp4 (8.2 MB)
```

---

## Convenções Críticas

### Exports
- **Sempre named exports.** Default export só em barrel `index.tsx` (por compatibilidade com `next/dynamic`)
- Nunca use default-only em componentes, hooks ou dados

### "use client"
- Todo arquivo que usa hooks React, GSAP, Framer Motion, Remotion ou `useTranslation()` precisa de `'use client'`
- Hooks colocados (`useGsapTimeline.ts`, `useMouseEffects.ts`) **não** precisam — herdam do componente pai

### Dynamic Imports (padrão obrigatório)
```typescript
import dynamicImport from 'next/dynamic';

const Componente = dynamicImport(
  () => import('@/components/sections/Componente').then(m => ({ default: m.Componente })),
  { ssr: false }
);
```
O `.then(m => ({ default: m.NomeExato }))` é obrigatório porque todos os componentes usam named exports.

### i18n — REGRA MAIS IMPORTANTE
`t` é um **objeto**, não uma função. Nunca chame `t('chave')`.

```typescript
const { t } = useTranslation();  // retorna { locale, t, setLocale }

// CORRETO
t.hero.headline
t.faq.items[0].q
t.pillars.items[index]?.title
t.nav.cta

// ERRADO — t não é função
t('hero.headline')
```

Sub-componentes **não** chamam `useTranslation()`. Recebem strings como props. Só o `index.tsx` de cada seção chama o hook.

### Tipos de Ref (React 19)
```typescript
// Hook que recebe ref como parâmetro — sempre com | null
export function useGsapTimeline(containerRef: React.RefObject<HTMLDivElement | null>) {}
export function useMouseEffects(ref: React.RefObject<HTMLDivElement | null>) {}

// useRef no componente é normal
const ref = useRef<HTMLDivElement>(null);
```

### Dados vs Tradução
Os dados têm duas camadas:
1. `data/` — dados estáticos sem texto (ícones, preços, IDs, URLs)
2. `lib/i18n/translations/` — textos traduzidos

Merge acontece no `index.tsx` da seção:
```typescript
// PillarsOrbital/index.tsx
const mergedData = pillars.map((pillar, index) => ({
  ...pillar,                                    // de data/pillars.ts
  title: t.pillars.items[index]?.title || '',  // de i18n
  content: t.pillars.items[index]?.content || '',
}));
```

### path alias
`@/` aponta para a raiz do projeto. Sempre use `@/` para imports entre módulos.

---

## Fluxo de i18n

1. `I18nProvider` inicia com locale `"pt"` no servidor
2. No cliente, `useEffect` detecta preferência via `localStorage` → `navigator.language` → fallback `"pt"`
3. Locales disponíveis: `pt`, `en`, `es`
4. `LanguageSwitcher` chama `setLocale()` → persiste em `localStorage`
5. `useTranslation()` retorna o objeto `t` tipado como `Translations` (derivado da estrutura do `pt.ts`)

---

## Bugs Críticos Conhecidos

### 1. Links do WhatsApp quebrados (CRÍTICO — afeta conversão)
Em 3 arquivos, `WA_ROUTES` é usado como string literal em vez de importado:

```typescript
// ERRADO (como está hoje)
const WA = "{WA_ROUTES.contact}";  // string literal, não o valor real

// CORRETO
import { WA_ROUTES } from '@/data/constants';
const WA = WA_ROUTES.contact;
```

Arquivos afetados:
- `components/layout/Navbar.tsx`
- `components/sections/FaqCta/CtaFinal.tsx`
- `components/sections/LifestyleGallery.tsx`

### 2. CinematicCanvas hardcoda o número do WhatsApp
`CinematicCanvas.tsx` linha 40: `href="https://wa.me/12269617351"` — direto no JSX, sem usar `WA_ROUTES`.

### 3. PricingCard não renderiza nome, features nem botão traduzido
`useMergePricingData` retorna só os dados de `data/pricing.ts` (preço + link). Os dados de `t.pricing.plans[i]` (planName, features, buttonText) nunca são mesclados. O card mostra só o preço.

### 4. AppShowcase exibe nome "FitBudd" (competidor)
`components/remotion/AppShowcase.tsx` linha 121 tem badge `"✓ FitBudd"`. Precisa ser substituído por INTEGR8.

### 5. CinematicCanvas tem textos em inglês hardcoded, fora do i18n
Linhas 25–26: `"App Cinematic"` e `"Experience the future of mobile"`. As chaves `t.appCinematic.eyebrow` e `t.appCinematic.headline` já existem em `pt.ts` mas nunca são usadas.

### 6. ShaderCanvas é um stub vazio
`components/ui/ShaderCanvas.tsx` — canvas sem nenhuma implementação. Aparece como espaço em branco de `h-80` no PricingHeader.

---

## Assets Pendentes (placeholders)

| Arquivo | Tamanho atual | Necessário |
|---------|--------------|-----------|
| `public/placeholders/hero-1/2/3.jpg` | ~397 bytes cada | Fotos reais para parallax |
| `public/placeholders/casal-before/after.jpg` | ~536–547 bytes | Fotos before/after reais |
| `public/placeholders/denis-photo.jpg` | 357 bytes | Foto do Denis |
| `public/videos/hero-video.mp4` | 8.2 MB | OK (precisa de `loop` + `poster`) |

---

## Itens Pendentes por Prioridade

### Alta (impacta conversão diretamente)
- [x] Corrigir `WA_ROUTES` nos 3 arquivos (Navbar, CtaFinal, LifestyleGallery)
- [ ] Substituir imagens placeholder por fotos reais
- [x] Corrigir PricingCard para renderizar nome, features e botão do i18n
- [x] Remover "FitBudd" do AppShowcase e usar branding INTEGR8

### Média
- [x] Conectar CinematicCanvas ao i18n (`t.appCinematic.*`)
- [x] Implementar ShaderCanvas ou substituir por CSS gradient
- [x] Adicionar `loop` e `poster` no `<video>` do HeroVideo
- [ ] Deploy no Vercel

### Baixa (técnica)
- [ ] Remover scripts de automação da raiz (`refactor-sprint*.js`, `dia3-*.js`, etc.) ou mover para `.scripts/`
- [ ] Remover `"use client"` de `app/page.tsx` e deixar SSR funcionar para SEO
- [ ] Resolver locale flash no i18n (inicializar com cookie/header em vez de `useEffect`)
- [ ] Adicionar error boundaries ao redor dos Remotion Players
- [ ] Resolver `selectedPlan` state declarado mas nunca lido em PricingSection

---

## Dados Estruturais

### Pillar (data/pillars.ts)
```typescript
interface Pillar {
  id: number;
  icon: ElementType;      // ícone Lucide
  relatedIds: number[];   // IDs dos pilares relacionados
  status: "completed" | "in-progress" | "pending";
  energy: number;         // % de energia (visual)
}
// 8 pilares: Dumbbell, Apple, Scale, Activity, Footprints, Droplets, Moon, Camera
```

### Plan (data/pricing.ts)
```typescript
interface Plan {
  price: string;
  priceAVista?: string;
  isPopular?: boolean;
  buttonVariant?: "primary" | "secondary";
  whatsappLink: string;
}
```

### WA_ROUTES (data/constants.ts)
```typescript
WA_ROUTES.contact   // número base
WA_ROUTES.protocol  // link com texto pré-preenchido para protocolo
// (verificar valores reais no arquivo)
```

---

## Ordem das Seções na Página

```
Navbar (fixo)
1. HeroParallax     — vídeo hero + 3 blocos parallax scroll
2. IdentificationSection
3. ComparisonTable
4. PillarsOrbital   — orbital interativo dos 8 pilares
5. DenisStory       — história do coach
6. AppCinematic     — sequência GSAP scroll-pinned
7. BeforeAfterSection
8. LifestyleGallery
9. PricingSection
10. FaqCta          — FAQ + garantia + countdown + CTA final
```

---

## Comandos Úteis

```powershell
# Desenvolvimento
cd C:\Users\denis\integr8-landing
npm run dev          # inicia em localhost:3000

# Build de produção
npm run build

# Remotion Studio (animações)
npx remotion studio

# Git
git add -A
git commit -m "mensagem"
git push
```

---

*Gerado em: 2026-04-02*
