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
- Zero KB adicionado ao bundle — crítico para performance mobile
- `useTranslation()` retorna objeto com todas as strings da página
- Todas as strings de texto dos componentes substituídas por `t.chave`

---

## 3. Slider Antes/Depois com Scroll

### Comportamento atual
O visitante precisa arrastar a linha divisória manualmente para ver a comparação.

### Comportamento novo
Conforme o visitante rola a página e chega na seção de comparação, a linha se move automaticamente da esquerda (mostrando só o "antes") para a direita (revelando o "depois") — sem nenhuma interação manual necessária.

### Detalhes
- A animação começa quando a seção entra na tela e termina quando ela sai
- Progresso: 0% = linha à esquerda (100% antes), 100% = linha à direita (100% depois)
- Implementação: `useScroll` + `useTransform` do framer-motion (já no bundle)
  - `useScroll({ target: sectionRef, offset: ["start end", "end start"] })`
  - `useTransform(scrollYProgress, [0, 1], ["0%", "100%"])`
- O componente `ImageComparison` já existente é adaptado para aceitar posição controlada externamente via prop `position`
- Arrasto manual removido (simplifica o componente e evita conflito com scroll)

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
- Em mobile: barra utilitária colapsada ou simplificada (só bandeiras + toggle)
- Toda a estrutura continua fixada no topo durante o scroll

---

## 5. Arquivos Alterados

| Arquivo | Mudança |
|---|---|
| `app/layout.tsx` | Adiciona `ThemeProvider` + `I18nProvider` |
| `app/globals.css` | Variáveis CSS para `:root` e `.dark` |
| `components/layout/Navbar.tsx` | Barra utilitária + `ThemeToggle` + `LanguageSwitcher` |
| `components/sections/BeforeAfterSection.tsx` | Scroll-driven slider |
| `components/ui/image-comparison.tsx` | Aceita prop `position` externa |
| Todos os 11 componentes de seção | `dark:` variants substituindo cores hardcoded |

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
- Tradução de imagens/fotos fora do escopo
- Conteúdo do `data/pillars.ts`, `data/faq.ts`, `data/pricing.ts` também precisa ser traduzido — incluído
