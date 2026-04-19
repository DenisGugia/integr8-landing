# INTEGR8 Landing Page v2 — Spec + Execução Consolidada

**Este documento substitui:** `integr8-v2-parallax-spec.md` e `CLAUDE-CODE-EXECUTION.md`
**Leia inteiro antes de começar. Execute os passos na ordem.**

---

## REGRA ZERO

**NÃO modifique, delete ou crie nenhum arquivo fora da pasta `v2-parallax/`.** O repo existente deve ficar 100% intacto.

---

## Passo 1 — Estrutura de pastas

```bash
mkdir -p v2-parallax/images/app
mkdir -p v2-parallax/videos
```

## Passo 2 — Encontrar e copiar assets

### Logo
```bash
# Procurar o logo com transparência
find . -type f -name "*TRANSP*" -o -name "*transp*" -o -name "*logo*" | head -20
# Copiar para v2-parallax/images/logo.png
```
O logo é o arquivo `LOGO_INTEGR8_TRANSP-removebg-preview.png`. Copiar como `v2-parallax/images/logo.png`.

### Imagens de fundo (parallax)
```bash
find . -type f \( -name "*.jpg" -o -name "*.jpeg" -o -name "*.png" -o -name "*.webp" \) | grep -iv "modelo\|rosto\|bf\|logo\|node_modules" | head -30
```
Mapear as imagens encontradas para as seções parallax. Se não houver imagens adequadas, usar gradientes CSS de fallback. **Não travar por falta de imagem.**

### Screenshots do app
Copiar para `v2-parallax/images/app/`:
```bash
# Procurar screenshots do FitBudd
find . -type f \( -name "Dashboard*" -o -name "IMG_45*" \) | head -10
# Copiar como:
# v2-parallax/images/app/dashboard.jpg
# v2-parallax/images/app/treino.png
# v2-parallax/images/app/progresso-1.png
# v2-parallax/images/app/progresso-2.png
```

### Vídeos do app (screen recordings)
```bash
find . -type f -name "ScreenRecording*" | head -15
# Copiar os mais relevantes para v2-parallax/videos/
# Serão usados como fonte para GIFs ou vídeo inline
```

---

## Passo 3 — Design tokens

```css
:root {
  /* Base */
  --ink:          #1a1a1a;
  --ink-light:    #4a4a4a;
  --ink-muted:    #7a7a7a;

  /* Fundos */
  --cream:        #faf8f5;
  --white:        #ffffff;
  --warm-gray:    #f2f0ed;

  /* Acento (do logo — vermelho do batimento cardíaco) */
  --accent:       #c43e2a;
  --accent-hover: #a83520;
  --accent-soft:  rgba(196, 62, 42, 0.08);

  /* Acento secundário (do logo — teal/verde-azulado do infinito) */
  --teal:         #5a9e9e;
  --teal-soft:    rgba(90, 158, 158, 0.1);

  /* WhatsApp */
  --green:        #25a856;
  --green-hover:  #1e8f48;

  /* Glass effect */
  --glass-bg:     rgba(250, 248, 245, 0.88);
  --glass-blur:   20px;
  --glass-border: rgba(255, 255, 255, 0.3);

  /* Overlays */
  --overlay-light:  rgba(26,26,26, 0.40);
  --overlay-medium: rgba(26,26,26, 0.55);
  --overlay-dark:   rgba(26,26,26, 0.72);

  /* Layout */
  --max-w:        780px;
  --max-w-wide:   1080px;
  --space-section: 100px;
}
```

### Tipografia
```css
/* Google Fonts */
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,400;0,500;0,600;0,700&family=DM+Serif+Display&display=swap');

/* Headlines */
font-family: 'DM Serif Display', Georgia, serif;

/* Body/UI */
font-family: 'DM Sans', -apple-system, sans-serif;
font-size: 17px;
line-height: 1.7;
```

---

## Passo 4 — Construir index.html

Arquivo único: `v2-parallax/index.html` com CSS embutido e JS mínimo no final.

---

### COMPONENTE: Sticky Header

```
Comportamento:
- Fixo no topo da página (position: fixed, z-index: 100)
- Fundo glass: backdrop-filter: blur(20px), background rgba(26,26,26,0.85)
- Altura: 64px
- Logo à esquerda (imagem logo.png, max-height: 40px)
- Texto "PROTOCOLO C.O.R.E. 8" ao lado do logo, pequeno, letter-spacing
- Botão "COMEÇAR AGORA" à direita, borda --accent, texto --accent
- Em mobile: logo centralizado, botão menor

O header é sempre visível ao rolar. Fundo escuro semi-transparente com blur.
```

---

### COMPONENTE: Transição fade entre seções

```css
/* Aplicar em TODAS as seções de conteúdo sólido */
.section-glass {
  position: relative;
}

/* Fade-in no topo da seção */
.section-glass::before {
  content: "";
  position: absolute;
  top: -60px;
  left: 0;
  right: 0;
  height: 60px;
  background: linear-gradient(to bottom, transparent, var(--glass-bg));
  z-index: 4;
  pointer-events: none;
}

/* Fade-out no rodapé da seção */
.section-glass::after {
  content: "";
  position: absolute;
  bottom: -60px;
  left: 0;
  right: 0;
  height: 60px;
  background: linear-gradient(to top, transparent, var(--glass-bg));
  z-index: 4;
  pointer-events: none;
}
```

---

### COMPONENTE: Seção glass (conteúdo sólido)

```css
.section-glass {
  position: relative;
  z-index: 3;
  padding: var(--space-section) 24px;
  background: var(--glass-bg);
  backdrop-filter: blur(var(--glass-blur));
  -webkit-backdrop-filter: blur(var(--glass-blur));
  border-top: 1px solid var(--glass-border);
  border-bottom: 1px solid var(--glass-border);
}

/* A imagem do parallax anterior "vaza" sutilmente por trás do glass */
```

---

### COMPONENTE: Mockup de celular

```html
<!-- Frame de iPhone com screenshot do app dentro -->
<div class="phone-mockup">
  <div class="phone-frame">
    <img src="images/app/dashboard.jpg" alt="App INTEGR8 — Dashboard">
  </div>
</div>
```

```css
.phone-mockup {
  width: 260px;
  flex-shrink: 0;
}

.phone-frame {
  background: #000;
  border-radius: 32px;
  padding: 12px;
  box-shadow: 0 20px 60px rgba(0,0,0,0.15);
}

.phone-frame img {
  width: 100%;
  border-radius: 22px;
  display: block;
}
```

---

## ESTRUTURA DE SEÇÕES (16 seções)

```
TIPO        | #  | NOME                         | FUNDO
----------- | -- | ---------------------------- | -------------------------
sticky      | 0  | Header                       | glass escuro (fixed)
parallax    | 1  | Hero                         | hero.webp + gradient overlay
glass       | 2  | Identificação                | glass (cream transparente)
glass       | 3  | Dores (checklist)            | glass (cream transparente)
parallax    | 4  | O que muda (cards visuais)   | SEM parallax → seção glass com cards
glass       | 5  | Como funciona (steps + app)  | glass + mockups de celular
glass       | 6  | História do Denis            | glass (warm-gray)
parallax    | 7  | Decorado (cenas)             | life.webp + overlay light
glass       | 8  | Para quem é (expandida)      | glass exclusiva
glass       | 9  | Resultado acelerado          | glass com destaque visual    ← NOVA
glass       | 10 | Funciona em qualquer lugar   | glass (reescrita)            ← REESCRITA
parallax    | 11 | Oferta e preços              | pricing.webp + overlay dark
glass       | 12 | Garantia                     | glass com card destacado
dark        | 13 | FAQ                          | --ink sólido
glass       | 14 | CTA Final                    | glass
footer      | 15 | Footer                       | #111 sólido
```

**Mudanças vs spec anterior:**
- Seção 4 "O que muda" saiu de parallax → cards visuais em glass
- Seção 8 "Para quem é" expandida (cada bullet → título+subtítulo)
- Seção 9 "Resultado acelerado" é nova (separada do "Para quem é")
- Seção 10 reescrita (era "Mora fora do Brasil?", agora "Funciona em qualquer lugar")
- Removido: "Quer usar o app sem acompanhamento?"
- Removido: comparativo com personal trainer presencial
- Total: 16 seções (era 14)

---

## COPY POR SEÇÃO

### Seção 0 — Sticky Header

```
Logo: imagem logo.png (max-height 40px)
Texto ao lado: PROTOCOLO C.O.R.E. 8 (letter-spacing 3px, tamanho pequeno)
Botão direita: COMEÇAR AGORA → #checkout
```

### Seção 1 — Hero (PARALLAX)

```
Layout: Texto alinhado à ESQUERDA, ocupando no máximo 55% da largura.
A imagem de fundo aparece no lado direito sem ser coberta pelo texto.

Eyebrow: Método INTEGR8 · Protocolo C.O.R.E. 8
(cor: rgba(255,255,255,0.6), uppercase, letter-spacing)

Headline (com cores alternadas para impacto em 3 segundos):
  "Um método personalizado para quem quer"
  "mais energia" ← esta parte em --accent (#c43e2a)
  "e um corpo que acompanha"
  "a vida que você já tem." ← esta parte em branco, itálico

A estratégia de cor: as duas frases-chave que comunicam o benefício
("mais energia" e "a vida que você já tem") recebem destaque visual.
O resto é branco regular. Em 3 segundos de scan, a pessoa lê:
"mais energia... a vida que você já tem."

Subheadline (branco regular, opacidade 85%):
  Programas genéricos falham porque foram feitos para uma rotina
  que você não tem. O C.O.R.E. 8 começa por entender como você
  funciona. Só depois prescreve.

Tagline (itálico, opacidade 60%):
  Para quem cuida de tudo. Menos de si.

CTA primário: [QUERO ENTENDER ISSO ↓] → scroll para seção 2 (--accent bg)
CTA secundário: [FALAR COM O COACH] → #whatsapp (outline branco)
```

### Seção 2 — Identificação (GLASS)

```
Label: RECONHECIMENTO (--accent, uppercase, small)

Copy (bloco de prosa, sem alterações):

Você tem muitas responsabilidades.

Resolve problemas complexos. Gerencia o que a maioria nem conseguiria listar.
É reconhecido pelo que entrega no trabalho, em casa, em qualquer frente
que precisa de você.

Mas carrega uma inconsistência em silêncio.

Em tudo que se dedica, funciona. No próprio corpo, não.

Você tentou. Houve semanas boas, às vezes meses. Depois a vida complicou,
você se deixou para segundo plano e o programa foi para a gaveta.

A conclusão foi a mais razoável possível: talvez não seja para mim.

Essa conclusão está errada.

Você estava encaixando a sua vida real num programa feito para uma
realidade que não é a sua. O programa foi criado para um cliente ideal
com 3 a 5 dias livres, 8 horas de sono, sem reunião às 18h e sem os
imprevistos que você conhece de cor.

Esse cliente existe. Mas é a exceção. E os programas continuam sendo
feitos para ele.

Não é falta de disciplina. É incompatibilidade. A mesma vontade que
trouxe para cada tentativa é a que vai funcionar quando o protocolo
for feito para você.

Sem imagem nesta seção. O texto precisa ser lido sem distração.
```

### Seção 3 — Dores / Checklist (GLASS)

```
Headline: Você reconhece alguma dessas?

Lista (dots --accent à esquerda, espaçamento generoso):
- Acorda e já está cansado antes do dia começar.
- No meio da tarde, bate uma queda que não é cansaço de trabalho.
- Não consegue ver onde um treino caberia sem tirar de algo que não dá para tirar.
- Já tentou academia, esporte, treino online. Parou. Tempo, dinheiro e esforço no ralo.
- "Deveria estar melhor" virou uma frase distante.
- A consulta médica continua sendo adiada.
- Você está sobrevivendo. Mas não está vivendo.

Fechamento (itálico): Se alguma dessas bateu, o que vem a seguir é para você.

Sem imagem nesta seção.
```

### Seção 4 — O que muda (GLASS com CARDS VISUAIS)

**NÃO é mais parallax.** É uma seção glass com 3 cards lado a lado (empilham no mobile).

```
Label: A DIFERENÇA
Headline: O que muda com o C.O.R.E. 8

Contexto (prosa curta):
A maioria de quem chega até aqui já tentou alguma coisa antes.
Academia, app, personal por um tempo. Não por falta de esforço.
Por diferença estrutural.

3 CARDS (cada um com ícone/imagem + "antes" vs "depois"):

Card 1:
  Ícone: ícone de documento/clipboard (programa pronto)
  PROGRAMA COMUM: Começa com o plano pronto. Você se adapta.
  C.O.R.E. 8: Começa entendendo como você funciona. O plano se adapta.
  Imagem sugerida: mockup do app mostrando tela de onboarding/questionário

Card 2:
  Ícone: ícone de calendário com X (semana que desanda)
  PROGRAMA COMUM: Semana que desanda: você perde o fio.
  C.O.R.E. 8: Semana que desanda: você ajusta. O protocolo continua.
  Imagem sugerida: mockup do app mostrando reagendamento de treino

Card 3:
  Ícone: ícone de troféu/chave (resultado permanente)
  PROGRAMA COMUM: Ao terminar, você volta para o zero.
  C.O.R.E. 8: Ao terminar, você tem a fórmula. Para sempre.
  Imagem sugerida: mockup do app mostrando tela de progresso com dados

Layout dos cards:
- Fundo sutil (--warm-gray ou borda leve)
- Texto "PROGRAMA COMUM" em --ink-muted, riscado ou opacidade baixa
- Texto "C.O.R.E. 8" em --ink, peso bold
- Mockup de celular pequeno (150px largura) ao lado ou abaixo de cada card
- Em mobile: cards empilham verticalmente
```

### Seção 5 — Como funciona (GLASS + MOCKUPS)

```
Label: NA PRÁTICA
Headline: Como o protocolo funciona

Layout: 4 steps à esquerda + mockup de celular grande à direita
Em mobile: steps acima, mockup abaixo.

O mockup mostra o screenshot do Dashboard do app (dashboard.jpg).

4 STEPS (numerados, com título bold + descrição):

01  ONBOARDING
    Mapeamos sua rotina, biologia e objetivos reais.
    Dias disponíveis, local de treino, histórico.

02  PROGRAMA BASE
    Você já treina com um programa feito para o seu
    objetivo e realidade. Ele coleta dados reais de
    como você se alimenta, dorme e responde ao estímulo.

03  PROTOCOLO DEFINITIVO
    Com os dados reais, o protocolo definitivo é montado.
    Para a vida que você tem, não para a que gostaria de ter.

04  AJUSTE CONTÍNUO
    A cada quinzena, o coach analisa o que os números
    mostram. O que funciona, continua. O que não funciona,
    muda.

Nota de rodapé (itálico, menor):
Quando a semana desanda, você remeja e continua de onde parou.
O protocolo não finge que imprevistos não existem.

MOCKUP: Screenshot do dashboard (Dashboard.JPG) dentro de frame de celular.
Se possível, incluir um segundo mockup menor mostrando a tela de progresso
(IMG_4598.PNG ou IMG_4600.PNG) levemente atrás/ao lado do principal,
para dar ideia de profundidade e de múltiplas telas.
```

### Seção 6 — História do Denis (GLASS warm-gray)

```
Label: O COACH
Headline: Ele sabia exatamente o que fazer.
         Mas não conseguia aplicar na própria vida.

Layout: Foto do Denis à esquerda (200×260px) + texto à direita.
Em mobile: foto acima, texto abaixo.

Copy (Bloco 5 da VTSD V4, sem alteração — linhas 140-172 do arquivo original)

Citação em destaque (blockquote com borda --accent à esquerda):
"Quando a programação do dia seguinte já está feita, não preciso decidir
o que comer ou fazer com fome e sem vontade. Só cumpro o que foi planejado.
A margem de erro diminui. A execução acontece."

Credenciais (pequeno, muted):
Personal trainer certificado · Coordenador de academia ·
Empresário · Pai · Imigrante.

Foto: placeholder cinza até ter foto real. Usar images/denis.jpg se existir.
```

### Seção 7 — Decorado / Cenas (PARALLAX)

```
Imagem: life.webp + overlay 45%
Texto alinhado à ESQUERDA (terço esquerdo do frame).

Label: O QUE MUDA
Headline: Não vamos falar sobre quilos.
Sub: Vamos falar sobre o que muda quando o corpo começa a acompanhar.

5 cenas (cada uma com título + 2-3 frases):
[Mesma copy da spec anterior — sem alteração]

A manhã de sábado
Você acorda antes do despertador. Não porque algo incomodou: o corpo
terminou de descansar. Você levanta porque quer.

A reunião de última hora
17h30, reunião que não estava no calendário. Você está presente, não
gerenciando o cansaço. Agora é você no comando dela.

A brincadeira com os filhos
Seu filho pede para brincar. Você brinca de verdade. Corre, se joga,
está lá. É ele que pede pausa primeiro.

A foto
Alguém tira uma foto. Você vê e não sente o impulso de pedir para
deletar. Você sabe que está no caminho.

O jantar
Alguém oferece a sobremesa. Você pensa um segundo, não por culpa,
só por preferência, e aceita. Porque sabe que cabe.
```

### Seção 8 — Para quem é (GLASS — EXCLUSIVA)

**Cada bullet virou título + subtítulo explicativo.**

```
Label: PARA VOCÊ?
Headline: O C.O.R.E. 8 é para você se:

4 blocos (cada um com título bold + parágrafo de contexto):

SUA ROTINA NÃO PARA
Qualquer programa que exija condições perfeitas vai para a gaveta
na primeira semana difícil. O C.O.R.E. 8 foi construído para
funcionar quando a semana não sai como planejado — não apesar
disso, mas por design.

VOCÊ JÁ TENTOU E NÃO MANTEVE
Chegou à conclusão de que o problema é você. Não é. O problema
era o encaixe entre o programa e a sua realidade. Quando o protocolo
começa entendendo como você funciona, o resultado muda.

VOCÊ QUER ENTENDER O QUE ACONTECE NO SEU CORPO
Não quer só receber planilha. Quer saber por que determinado treino
foi prescrito, o que os números mostram, e como ajustar quando
precisar. O C.O.R.E. 8 te dá os dados e o contexto.

VOCÊ QUER RESULTADO QUE SOBREVIVE
Quando a vida complica, a maioria dos programas quebra. O C.O.R.E. 8
foi feito para que o resultado se sustente exatamente nos momentos
em que tudo ao redor está instável.

NÃO inclui mais "Quer resultado em menos tempo?" nem
"Quer usar o app sem acompanhamento?". Esses saíram para seções próprias
ou foram removidos.
```

### Seção 9 — Resultado acelerado (GLASS — NOVA)

```
Label: CAMINHO RÁPIDO
Headline: Quer resultado em menos tempo?

Copy:
Podemos construir um caminho acelerado. A diferença honesta:
sem os dados iniciais do onboarding completo, partimos de estimativas
baseadas no seu perfil. Funciona para a maioria, mas não garante
a mesma precisão de um protocolo calibrado com os seus dados reais.

Se o seu prazo é real e você prefere começar com intensidade
desde o primeiro dia, conversamos.

Destaque visual: mockup do app mostrando a tela de progresso semanal
(IMG_4598.PNG ou IMG_4600.PNG) com os dados de Rotina, Nutrição, Água.
O mockup demonstra visualmente o tipo de dado que o protocolo gera.

CTA: [FALAR COM O COACH →] #whatsapp (botão --accent)

Layout: texto à esquerda (60%), mockup do app à direita (40%)
Em mobile: texto acima, mockup abaixo.
```

### Seção 10 — Funciona em qualquer lugar (GLASS — REESCRITA)

**Substituiu "Mora fora do Brasil?"**

```
Label: ONDE VOCÊ ESTIVER
Headline: O protocolo funciona em qualquer lugar do mundo.

Copy:
O app foi projetado para usar os alimentos disponíveis na região
onde você mora e as suas preferências alimentares. Não importa se
você está no Canadá, em Portugal, nos Estados Unidos ou no Japão —
o protocolo se adapta ao que você encontra no mercado da sua cidade.

O coach que criou o INTEGR8 viveu essa realidade. Saiu do Brasil,
reconstruiu rotina em outro país, com outra alimentação, outro clima,
outra cultura de treino. O protocolo nasceu dessa experiência.

Treino, nutrição e acompanhamento pensados para a realidade de quem
vive longe do que era familiar. Sem tentar replicar o que funcionava
no Brasil. Construindo o que funciona onde você está.

CTA: [FALAR COM O COACH →] #whatsapp

NÃO inclui: "sem rede de apoio" (removido conforme pedido)
NÃO inclui: comparativo com personal trainer presencial
```

### Seção 11 — Oferta e preços (PARALLAX)

```
Imagem: pricing.webp + overlay 72%

Label: INVESTIMENTO
Headline: Protocolo C.O.R.E. 8 · 16 semanas

Sub: Acompanhamento ativo com um coach real.
     Não um app. Não uma planilha no grupo do WhatsApp.

NÃO INCLUI o parágrafo comparando com personal trainer presencial.
Vai direto para os cards de preço.

3 CARDS de preço (lado a lado, empilham no mobile):

MENSAL
CAD$ 69,90 /mês
à vista: CAD$ 66,40

QUADRIMESTRAL ✓ (card destacado — borda --accent, scale 1.04)
CAD$ 49,90 /mês
à vista: CAD$ 189,60

ANUAL
CAD$ 44,90 /mês
à vista: CAD$ 511,85

Nota: Grupos de 3+: CAD$ 45,90/mês por pessoa · [WHATSAPP]

Lista "O que você tem durante as 16 semanas":
✓ Onboarding com mapeamento da sua rotina, biologia e objetivos reais
✓ Treino e nutrição montados para você, não para um perfil genérico
✓ 8 revisões quinzenais com análise de dados e ajuste do protocolo
✓ Suporte direto com o coach
✓ App com histórico de treinos, registros e dashboard
✓ Comunidade de alunos no protocolo
✓ Ao final: você sai com a fórmula do que funciona para o seu corpo

CTA: [COMEÇAR AGORA →] #checkout
CTA secundário: [TENHO DÚVIDAS →] #whatsapp
```

### Seção 12 — Garantia (GLASS com card)

```
Card com borda sutil e padding generoso:

Headline: Os primeiros 21 dias são seus para decidir.

[Mesma copy da spec anterior — sem alteração]
```

### Seção 13 — FAQ (DARK sólido)

```
Fundo --ink sólido (não glass — contraste forte).
Accordion com 8 perguntas.
[Mesma copy da spec anterior — sem alteração, exceto:]
- Removida qualquer menção a "personal trainer presencial" ou comparativo de preço
```

### Seção 14 — CTA Final (GLASS)

```
[Mesma copy da spec anterior — sem alteração]

Os próximos meses vão passar de qualquer forma.
A questão é o que vai ser diferente quando passarem.

CTA primário: [QUERO CHEGAR AO FINAL DO ANO DIFERENTE →] #checkout
CTA secundário: [TENHO DÚVIDAS. FALAR COM O COACH →] #whatsapp

Garantia compacta no rodapé.
```

### Seção 15 — Footer

```
Fundo #111
© 2026 INTEGR8. Todos os direitos reservados.
```

---

## REGRAS CSS OBRIGATÓRIAS

### Parallax
```css
.parallax {
  position: relative;
  min-height: 85vh;
  background-attachment: fixed;
  background-size: cover;
  background-position: center;
}
.parallax::before {
  content: "";
  position: absolute;
  inset: 0;
  z-index: 1;
}
.parallax .content {
  position: relative;
  z-index: 2;
}
```

### Fallback mobile
```css
@media (max-width: 768px) {
  .parallax {
    background-attachment: scroll;
    min-height: 60vh;
  }
}
```

### Glass
```css
.section-glass {
  position: relative;
  z-index: 3;
  padding: var(--space-section) 24px;
  background: var(--glass-bg);
  backdrop-filter: blur(var(--glass-blur));
  -webkit-backdrop-filter: blur(var(--glass-blur));
}
```

### Sticky header
```css
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  height: 64px;
  background: rgba(26, 26, 26, 0.85);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
}
/* Compensar o header fixo no body */
body { padding-top: 64px; }
```

### FAQ Accordion (JS puro)
```javascript
document.querySelectorAll('.faq-question').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.parentElement;
    document.querySelectorAll('.faq-item.open').forEach(open => {
      if (open !== item) open.classList.remove('open');
    });
    item.classList.toggle('open');
  });
});
```

### Scroll suave
```css
html { scroll-behavior: smooth; }
```

---

## PLACEHOLDERS DE LINK

```
#checkout  → Substituir por link Stripe quando configurado
#whatsapp  → Substituir por https://wa.me/NUMERO quando definido
```

---

## VERIFICAÇÃO FINAL

```bash
ls -la v2-parallax/
ls -la v2-parallax/images/
ls -la v2-parallax/images/app/
wc -l v2-parallax/index.html  # Esperado: 800-1500 linhas
head -5 v2-parallax/index.html
tail -5 v2-parallax/index.html
git status | grep -v v2-parallax  # Nada fora de v2-parallax
```

---

## README

Criar `v2-parallax/README.md` com instruções de substituição de imagens, links, e próximos passos.

---

## RESUMO DE EXECUÇÃO

1. Criar estrutura de pastas
2. Encontrar e copiar assets (logo, imagens, screenshots do app, vídeos)
3. Construir index.html completo (HTML + CSS + JS)
4. Criar README
5. Verificar
6. Reportar: quantas imagens mapeou, quais seções com fallback, tamanho do HTML
