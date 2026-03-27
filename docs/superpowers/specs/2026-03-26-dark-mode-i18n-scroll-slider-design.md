# Design: Dark/Light Mode + i18n + Scroll-Driven Before/After

**Data:** 2026-03-26
**Projeto:** integr8-landing
**Stack:** Next.js 16 (App Router) + Tailwind v4 + TypeScript

---

## Escopo

Três recursos novos para a landing page do Método INTEGR8 / Protocolo C.O.R.E. 8:

1. Modo escuro e claro com detecção automática do sistema e toggle manual
2. Suporte a três idiomas (PT-BR, EN, ES) com detecção automática e seletor de bandeiras
3. Slider de antes/depois animado pelo scroll em vez de arrasto manual

---

## 1. Dark/Light Mode

### Comportamento
- Ao abrir o site, o tema corresponde ao do sistema operacional do visitante (modo escuro ou claro)
- Um toggle na barra utilitária do menu permite alternar manualmente
- A preferência é salva no navegador — na próxima visita, o modo escolhido é respeitado
- O toggle exibe ☀️ no modo escuro (para ativar claro) e 🌙 no modo claro (para ativar escuro)

### Paleta
Mesmos tons de destaque nos dois modos:

| Token | Modo escuro | Modo claro |
|---|---|---|
| Fundo principal | `#05080f` | `#f8fafc` |
| Texto principal | `#f1f5f9` | `#0f172a` |
| Acento verde | `#22c55e` | `#22c55e` |
| Acento azul | `#3b82f6` | `#3b82f6` |
| Superfície card | `#0d1117` | `#ffffff` |
| Borda sutil | `#1e293b` | `#e2e8f0` |

### Implementação
- **Biblioteca:** `next-themes` com `attribute="class"` e `defaultTheme="system"`
- `ThemeProvider` envolve o conteúdo em `app/layout.tsx`
- CSS: variáveis definidas em `globals.css` para `:root` (claro) e `.dark` (escuro)
- Componentes: todas as cores hardcoded substituídas por `dark:` variants do Tailwind
- Novo componente: `components/ui/ThemeToggle.tsx`

### Flash-of-Wrong-Theme (FOWT)
`next-themes` com SSR pode causar um flash do tema incorreto no primeiro carregamento. Solução obrigatória:
- `<html>` em `layout.tsx` recebe `suppressHydrationWarning`
- `next-themes` injeta um `<script>` inline antes do primeiro paint que aplica a classe correta antes do React hidratar
- Nenhuma cor de tema deve ser inline style — apenas classes Tailwind com `dark:` variants, pois o script lida com o estado antes da hidratação

---

## 2. Internacionalização (i18n)

### Comportamento
- Ao abrir o site, o idioma é detectado via `navigator.language` do navegador
- Mapeamento: `pt*` → PT-BR, `en*` → EN, `es*` → ES, qualquer outro → PT-BR
- A preferência é salva em `localStorage`
- Seletor de bandeiras na barra utilitária do menu: 🇧🇷 🇺🇸 🇪🇸
- Bandeira ativa com opacidade total; inativas em 40% — sem dropdown, clique direto
- Ao clicar, o texto da página inteira troca imediatamente sem recarregar a página

### Estrutura de arquivos
```
lib/i18n/
  translations/pt.ts   — textos originais em PT-BR
  translations/en.ts   — tradução gerada
  translations/es.ts   — tradução gerada
  context.tsx          — I18nProvider + useTranslation hook
```

### Sem biblioteca externa
- Solução customizada com `React.createContext` + `useContext`
- Zero KB de dependência de i18n adicionado ao bundle (nota: `next-themes` da seção 1 é a única dependência nova do projeto inteiro)
- `useTranslation()` retorna objeto com todas as strings da página
- Todas as strings de texto dos componentes substituídas por `t.chave`

### Camada de dados e traduções
Os arquivos `data/pillars.ts`, `data/faq.ts` e `data/pricing.ts` contêm strings de texto que também precisam ser traduzidas. Estratégia:
- Os arquivos `data/*.ts` deixam de exportar strings hardcoded e passam a exportar apenas estrutura (ícones, IDs, valores numéricos)
- Todo texto de exibição desses arquivos é movido para as translation files (`pt.ts`, `en.ts`, `es.ts`) sob chaves próprias (ex: `t.pillars[0].title`, `t.faq[0].question`)
- Os componentes que consomem esses dados usam `useTranslation()` para obter os textos e os dados estruturais separadamente
- Nenhum arquivo `data/*.ts` paralelo por idioma — toda string fica centralizada nas translation files
- `data/gallery-images.ts` não contém strings traduzíveis (apenas IDs e URLs do Unsplash) — não será alterado
- **Campos que NÃO são traduzidos** em `data/pillars.ts`: `status` (`"completed" | "in-progress" | "pending"`) — é chave de lógica usada em switch para estilização, não texto de exibição. As labels de exibição correspondentes ("ATIVO", "EM PROGRESSO", "PENDENTE") estão hardcoded no JSX de `PillarsOrbital.tsx` e vão para as translation files. `category` não é renderizado em nenhum componente — mantido no data file sem tradução.

---

## 3. Slider Antes/Depois com Scroll

### Comportamento atual
O visitante precisa arrastar a linha divisória manualmente para ver a comparação.

### Comportamento novo
Conforme o visitante rola a página e chega na seção de comparação, a linha se move automaticamente da esquerda (mostrando só o "antes") para a direita (revelando o "depois") — sem nenhuma interação manual necessária.

### Detalhes
- A animação começa quando o centro da seção entra na tela e termina quando sai
- Progresso: `0` = linha à esquerda (100% antes), `100` = linha à direita (100% depois) — valores numéricos, compatíveis com o tipo interno do componente
- Implementação: `useScroll` + `useTransform` do framer-motion (já no bundle)
  - `useScroll({ target: sectionRef, offset: ["start center", "end center"] })`
  - `useTransform(scrollYProgress, [0, 1], [0, 100])` → produz `MotionValue<number>`
  - O offset `["start center", "end center"]` garante que a animação ocorra enquanto a seção está visível no centro da tela — evita corrida em viewports grandes

### Integração com ImageComparison
O componente `ImageComparison` existente usa internamente `MotionValue<number>` (0–100) como `motionSliderPosition` via contexto React. A adaptação mínima:
- Adicionar prop opcional `controlledPosition?: MotionValue<number>` ao `ImageComparison`
- Quando fornecida, `controlledPosition` substitui `motionValue + useSpring` como o valor colocado no contexto como `motionSliderPosition` — os sub-componentes (`ImageComparisonImage`, `ImageComparisonSlider`) continuam consumindo apenas o contexto sem nenhuma mudança
- Quando ausente, `useMotionValue(50) + useSpring` mantidos — comportamento original preservado
- Os event handlers de mouse/touch (arrasto) no `ImageComparison` são condicionados: quando `controlledPosition` está presente, os handlers são `undefined` (não registrados); quando ausente, funcionam normalmente — compatibilidade retroativa garantida
- Na prática, `BeforeAfterSection` passa `controlledPosition` e portanto não tem arrasto; qualquer outro uso de `ImageComparison` sem a prop continua com arrasto funcional

### Comportamento mobile (touch vs scroll)
Arrasto manual removido → sem listeners de touch no componente. O `useScroll` captura o scroll da página diretamente. Sem conflito de eventos.

---

## 4. Navbar com Barra Utilitária

### Layout
```
┌─────────────────────────────────────────────────────┐
│  🇧🇷 🇺🇸 🇪🇸          |        ☀️ ○────● 🌙           │  ← barra utilitária (fina)
├─────────────────────────────────────────────────────┤
│  INTEGR8   Método · Pilares · Preços · FAQ  [WA]    │  ← navbar principal (atual)
└─────────────────────────────────────────────────────┘
```

- Fundo da barra utilitária ligeiramente diferente da navbar principal para separação visual
- Em mobile: a barra utilitária exibe apenas as bandeiras + toggle em linha única, sem labels de texto — mesma linha, sem colapsar
- Toda a estrutura continua fixada no topo durante o scroll

---

## 5. Arquivos Alterados

| Arquivo | Mudança |
|---|---|
| `app/layout.tsx` | Adiciona `ThemeProvider` + `I18nProvider` |
| `app/globals.css` | Variáveis CSS para `:root` e `.dark` |
| `components/layout/Navbar.tsx` | Barra utilitária + `ThemeToggle` + `LanguageSwitcher` + `dark:` variants |
| `components/ui/image-comparison.tsx` | Aceita prop `controlledPosition?: MotionValue<number>` externa |
| `components/sections/HeroParallax.tsx` | `dark:` variants; sem inline styles |
| `components/sections/IdentificationSection.tsx` | `dark:` variants |
| `components/sections/ComparisonTable.tsx` | `dark:` variants |
| `components/sections/PillarsOrbital.tsx` | `dark:` variants; cores inline no SVG orbital precisam de atenção especial |
| `components/sections/DenisStory.tsx` | `dark:` variants |
| `components/sections/AppCinematic.tsx` | `dark:` variants; o componente injeta um `<style>` tag via string JS com hex hardcoded — essas strings são atualizadas para referenciar variáveis CSS (`var(--bg)`, `var(--surface)`) definidas em `globals.css`, que o GSAP lê corretamente em tempo de execução |
| `components/sections/BeforeAfterSection.tsx` | Scroll-driven + `dark:` variants |
| `components/sections/LifestyleGallery.tsx` | `dark:` variants; também corrige hydration mismatch existente (Math.random SSR) |
| `components/sections/PricingSection.tsx` | `dark:` variants; a cor de fundo está hardcoded no GLSL como `vec3(0.02,0.03,0.06)` — requer reescrita do fragment shader para aceitar um `uniform vec3 uBgColor`; `PricingSection` passa a cor correta via `useTheme()` + `useEffect` que atualiza o uniform no contexto WebGL |
| `components/sections/FaqCta.tsx` | `dark:` variants |

**Arquivos novos:**
- `lib/i18n/context.tsx`
- `lib/i18n/translations/pt.ts`
- `lib/i18n/translations/en.ts`
- `lib/i18n/translations/es.ts`
- `components/ui/ThemeToggle.tsx`
- `components/ui/LanguageSwitcher.tsx`

---

## 6. Restrições e Não-escopo

- Nenhuma mudança de URL para idiomas (sem `/en/`, `/es/`) — landing page de rota única
- Nenhuma nova biblioteca além de `next-themes`
- SEO multilíngue (hreflang) fora do escopo desta iteração
- Metadata estática (`app/layout.tsx`: title, description, OG tags) permanece em PT-BR — troca de idioma é client-side only; inconsistência com OG é aceita conscientemente nesta iteração
- Tradução de imagens/fotos fora do escopo
- Conteúdo do `data/pillars.ts`, `data/faq.ts`, `data/pricing.ts` também precisa ser traduzido — incluído
