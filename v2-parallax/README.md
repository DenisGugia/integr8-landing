# Integr8 Landing Page v2 — Parallax + Glass

Design: parallax com seções glass morphism. HTML puro, zero frameworks.

## Como visualizar

Abrir `index.html` no browser (funciona local ou via URL pública).

## Estrutura

```
v2-parallax/
├── index.html          # Página completa (16 seções)
├── images/
│   ├── hero.webp       # Fundo parallax — hero
│   ├── life.png        # Fundo parallax — seção cenas
│   ├── pricing.jpg     # Fundo parallax — seção preço
│   ├── logo.png        # Logo INTEGR8 (transparente)
│   ├── denis.jpg       # Foto do Denis
│   └── app/
│       ├── dashboard.jpg    # Screenshot app
│       ├── treino.png       # Screenshot app
│       ├── progresso-1.png  # Screenshot app
│       └── progresso-2.png  # Screenshot app
└── videos/
    ├── app-tour-1.mp4
    ├── app-tour-2.mp4
    └── app-tour-3.mp4
```

## Substituir links

No `index.html`, buscar e substituir:
- `#checkout` → link do Stripe
- `#whatsapp` → `https://wa.me/SEU_NUMERO`

## Substituir imagens

1. Coloque a nova imagem em `images/`
2. No `index.html`, substitua o nome do arquivo
3. Parallax: landscape 16:9, mín. 1920×1080
4. As seções parallax têm overlay escuro — imagens precisam de contraste

## Próximos passos

- [ ] Gerar imagens IA dedicadas
- [ ] Configurar GTM / GA4 / Meta Pixel
- [ ] Configurar links Stripe
- [ ] Definir número WhatsApp
- [ ] Adicionar foto real do Denis
- [ ] Pop-up de saída (JS)
- [ ] Substituir hero.webp e pricing.jpg por imagens reais (estão com placeholder)
