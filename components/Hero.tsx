'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useState } from 'react'
import { useLanguage } from './LanguageToggle'

const WA_LINK = 'https://wa.me/12269617351?text=Ol%C3%A1+Denis%2C+quero+entender+o+Protocolo+C.O.R.E.+8'

function fade(delay: number) {
  return {
    initial: { opacity: 0, y: 8 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, ease: 'easeOut' as const, delay },
  }
}

export default function Hero() {
  const { t } = useLanguage()
  const [imgError, setImgError] = useState(false)

  return (
    <section
      style={{
        position: 'relative',
        minHeight: '100svh',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Background image or placeholder */}
      {!imgError ? (
        <Image
          src="/images/hero-final.webp"
          alt="Hero background"
          fill
          priority
          style={{ objectFit: 'cover', objectPosition: 'center' }}
          onError={() => setImgError(true)}
        />
      ) : (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: 'var(--color-surface-2-var)',
          }}
        >
          <span
            style={{
              position: 'absolute',
              bottom: '16px',
              left: '16px',
              fontSize: '11px',
              color: 'var(--color-text-muted)',
            }}
          >
            TODO: hero-final.webp
          </span>
        </div>
      )}

      {/* Overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(to right, color-mix(in srgb, var(--color-bg-var) 92%, transparent) 0%, color-mix(in srgb, var(--color-bg-var) 75%, transparent) 35%, color-mix(in srgb, var(--color-bg-var) 20%, transparent) 60%, transparent 100%)',
        }}
      />

      {/* Content */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '80px 24px',
          width: '100%',
        }}
      >
        <div style={{ maxWidth: '560px' }}>
          <motion.p
            {...fade(0)}
            style={{
              fontFamily: 'var(--font-dm-sans), sans-serif',
              fontSize: '11px',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: 'var(--color-text-muted)',
              marginBottom: '24px',
            }}
          >
            {t.hero.eyebrow}
          </motion.p>

          <motion.h1
            style={{
              fontFamily: 'var(--font-instrument-serif), serif',
              fontSize: 'clamp(32px, 5vw, 48px)',
              lineHeight: 1.15,
              color: 'var(--color-text-primary)',
              marginBottom: '0',
            }}
          >
            <motion.span {...fade(0.15)} style={{ display: 'block' }}>
              {t.hero.headline1}
            </motion.span>
            <motion.span {...fade(0.3)} style={{ display: 'block' }}>
              {t.hero.headline2}
            </motion.span>
          </motion.h1>

          <motion.div
            {...fade(0.5)}
            style={{
              marginTop: '24px',
              fontFamily: 'var(--font-dm-sans), sans-serif',
              fontSize: 'clamp(16px, 2vw, 18px)',
              color: 'var(--color-text-secondary)',
              lineHeight: 1.6,
            }}
          >
            <p>{t.hero.sub1}</p>
            <p>{t.hero.sub2}</p>
            <p style={{ marginTop: '8px' }}>&nbsp;</p>
            <p>{t.hero.sub3}</p>
          </motion.div>

          <motion.a
            {...fade(0.7)}
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              marginTop: '32px',
              background: 'var(--color-accent-var)',
              color: '#000000',
              padding: '14px 28px',
              borderRadius: '6px',
              fontFamily: 'var(--font-dm-sans), sans-serif',
              fontWeight: 500,
              fontSize: '16px',
              textDecoration: 'none',
              transition: 'background 150ms ease',
            }}
            onMouseEnter={e =>
              ((e.currentTarget as HTMLAnchorElement).style.background =
                'var(--color-accent-hover-var)')
            }
            onMouseLeave={e =>
              ((e.currentTarget as HTMLAnchorElement).style.background =
                'var(--color-accent-var)')
            }
          >
            {t.hero.cta}
          </motion.a>
        </div>
      </div>
    </section>
  )
}
