import type { Metadata } from 'next'
import { Instrument_Serif, DM_Sans } from 'next/font/google'
import './globals.css'

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: ['400'],
  style: ['normal', 'italic'],
  variable: '--font-instrument-serif',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://integr8.fit'),
  title: 'Integr8 · Protocolo C.O.R.E. 8 — Coaching personalizado de saúde',
  description:
    'Método personalizado de treino e nutrição para quem quer mais energia e um corpo que acompanha a vida que já tem. 16 semanas de acompanhamento real com Denis Gugia.',
  keywords: [
    'personal trainer online',
    'coaching de saúde',
    'emagrecimento personalizado',
    'protocolo de treino',
    'nutrição personalizada',
    'Denis Gugia',
    'Integr8',
    'C.O.R.E. 8',
  ],
  authors: [{ name: 'Denis Gugia', url: 'https://integr8.fit' }],
  creator: 'Denis Gugia',
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://integr8.fit',
    siteName: 'Integr8',
    title: 'Integr8 · Protocolo C.O.R.E. 8',
    description:
      'Método personalizado de treino e nutrição para quem quer mais energia e um corpo que acompanha a vida que já tem.',
    images: [
      {
        url: '/images/og-image.webp',
        width: 1200,
        height: 630,
        alt: 'Integr8 · Protocolo C.O.R.E. 8',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Integr8 · Protocolo C.O.R.E. 8',
    description:
      'Método personalizado de treino e nutrição para quem quer mais energia e um corpo que acompanha a vida que já tem.',
    images: ['/images/og-image.webp'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://integr8.fit',
    languages: {
      'pt-BR': 'https://integr8.fit',
      'en-CA': 'https://integr8.fit/en',
      es: 'https://integr8.fit/es',
    },
  },
}

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': 'https://integr8.fit/#denis',
      name: 'Denis Gugia',
      jobTitle: 'Personal Trainer & Health Coach',
      description:
        'Personal trainer certificado com mais de uma década de experiência em treino e nutrição personalizada.',
      url: 'https://integr8.fit',
      sameAs: [
        'https://instagram.com/PLACEHOLDER',
        'https://linkedin.com/in/PLACEHOLDER',
      ],
    },
    {
      '@type': 'HealthAndBeautyBusiness',
      '@id': 'https://integr8.fit/#business',
      name: 'Integr8',
      description:
        'Coaching personalizado de saúde, treino e nutrição com o Protocolo C.O.R.E. 8.',
      url: 'https://integr8.fit',
      founder: { '@id': 'https://integr8.fit/#denis' },
      areaServed: 'Worldwide',
      availableLanguage: ['Portuguese', 'English', 'Spanish'],
      priceRange: '$$',
    },
    {
      '@type': 'Service',
      '@id': 'https://integr8.fit/#service',
      name: 'Protocolo C.O.R.E. 8',
      description:
        'Programa de coaching 1:1 com 16 semanas de acompanhamento personalizado de treino e nutrição.',
      provider: { '@id': 'https://integr8.fit/#business' },
      serviceType: 'Health Coaching',
      offers: {
        '@type': 'Offer',
        price: '49.90',
        priceCurrency: 'CAD',
        priceSpecification: {
          '@type': 'UnitPriceSpecification',
          price: '49.90',
          priceCurrency: 'CAD',
          billingIncrement: 1,
          unitCode: 'MON',
        },
      },
    },
    {
      '@type': 'FAQPage',
      '@id': 'https://integr8.fit/#faq',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'E se minha semana virar caos?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Você ajusta diretamente no app, de acordo com o que a sua rotina permite naquele momento. Se esse padrão se tornar consistente, na revisão seguinte o coach realinha o protocolo com a realidade que você está vivendo. Você não começa do zero.',
          },
        },
        {
          '@type': 'Question',
          name: 'Já investi antes e não funcionou.',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Na maioria das vezes o programa não foi desenhado para a vida real da pessoa. O C.O.R.E. 8 começa mapeando exatamente a rotina que você tem para só depois fazer a programação em cima do que é cabível. E ao longo das semanas, ela pode ser reajustada conforme a sua realidade muda.',
          },
        },
        {
          '@type': 'Question',
          name: 'Não tenho tempo para treinos longos.',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Se você tem apenas 30 minutos três vezes por semana, o programa será montado em cima disso. Conforme as semanas avançam, vamos ajustando para que fique cada vez mais encaixado na sua rotina.',
          },
        },
        {
          '@type': 'Question',
          name: 'Academia ou posso treinar em casa?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Funciona com o que você tem: academia completa, pesos em casa ou equipamento mínimo. Isso é mapeado antes de qualquer prescrição.',
          },
        },
      ],
    },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="pt-BR"
      className={`${instrumentSerif.variable} ${dmSans.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('integr8-theme');if(t!=='light'&&t!=='dark'){t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';}document.documentElement.setAttribute('data-theme',t);var f=localStorage.getItem('integr8-font-size');if(f==='large'||f==='xlarge')document.documentElement.setAttribute('data-font-size',f);}catch(e){}})();`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        {/* TODO: GTM ID — Denis configura */}
        {/* TODO: Meta Pixel — Denis configura */}
      </head>
      <body>{children}</body>
    </html>
  )
}
