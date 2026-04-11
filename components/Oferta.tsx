'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { useState } from 'react'
import { useLanguage } from './LanguageToggle'
import PriceDisplay from './PriceDisplay'

const WA_LINK = 'https://wa.me/12269617351?text=Quero+come%C3%A7ar+meu+protocolo'
const STRIPE_CHECKOUT_URL = '#checkout'

function trackViewPricing() {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ;(window as any).gtag?.('event', 'view_pricing_intent')
  } catch {}
}

export default function Oferta() {
  const { t } = useLanguage()
  const o = t.oferta
  const [showPricing, setShowPricing] = useState(false)
  const [imgError, setImgError] = useState(false)

  return (
    <section
      style={{
        padding: '56px 24px',
      }}
    >
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, ease: 'easeOut' as const }}
          style={{
            fontFamily: 'var(--font-instrument-serif), serif',
            fontSize: 'clamp(28px, 4vw, 36px)',
            color: 'var(--color-text-primary)',
            marginBottom: '16px',
          }}
        >
          {o.headline}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, ease: 'easeOut' as const, delay: 0.1 }}
          style={{
            fontFamily: 'var(--font-dm-sans), sans-serif',
            fontSize: '17px',
            color: 'var(--color-text-secondary)',
            marginBottom: '48px',
            lineHeight: 1.6,
          }}
        >
          {o.sub}
        </motion.p>

        {/* Layout: bullets left, mockup right */}
        <div className="oferta-layout">
          {/* Bullets */}
          <div style={{ flex: '1' }}>
            {o.bullets.map((bullet, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.4, ease: 'easeOut' as const, delay: i * 0.06 }}
                style={{
                  display: 'flex',
                  gap: '12px',
                  alignItems: 'flex-start',
                  marginBottom: '16px',
                }}
              >
                <span
                  style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--color-accent-var)',
                    flexShrink: 0,
                    marginTop: '8px',
                  }}
                />
                <p
                  style={{
                    fontFamily: 'var(--font-dm-sans), sans-serif',
                    fontSize: '16px',
                    color: 'var(--color-text-secondary)',
                    lineHeight: 1.6,
                  }}
                >
                  {bullet}
                </p>
              </motion.div>
            ))}
          </div>

          {/* App mockup */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, ease: 'easeOut' as const, delay: 0.3 }}
            className="oferta-mockup"
            style={{ flexShrink: 0 }}
          >
            <div
              style={{
                position: 'relative',
                width: '200px',
                aspectRatio: '9/16',
                borderRadius: '24px',
                overflow: 'hidden',
                boxShadow: '0 24px 48px rgba(0,0,0,0.3)',
                transform: 'rotate(6deg)',
                backgroundColor: 'var(--color-surface-2-var)',
              }}
            >
              {!imgError ? (
                <Image
                  src="/images/app-mockup.webp"
                  alt="App mockup"
                  fill
                  style={{ objectFit: 'cover' }}
                  onError={() => setImgError(true)}
                />
              ) : (
                <span
                  style={{
                    position: 'absolute',
                    bottom: '8px',
                    left: '8px',
                    fontSize: '9px',
                    color: 'var(--color-text-muted)',
                  }}
                >
                  TODO: app-mockup.webp
                </span>
              )}
            </div>
          </motion.div>
        </div>

        {/* Price intro */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, ease: 'easeOut' as const }}
          style={{ maxWidth: '560px', marginTop: '64px' }}
        >
          <p
            style={{
              fontFamily: 'var(--font-dm-sans), sans-serif',
              fontSize: '16px',
              color: 'var(--color-text-secondary)',
              lineHeight: 1.65,
              marginBottom: '12px',
            }}
          >
            {o.priceIntro1}
          </p>
          <p
            style={{
              fontFamily: 'var(--font-dm-sans), sans-serif',
              fontSize: '16px',
              color: 'var(--color-text-secondary)',
              lineHeight: 1.65,
              marginBottom: '12px',
            }}
          >
            {o.priceIntro2}
          </p>
          <p
            style={{
              fontFamily: 'var(--font-dm-sans), sans-serif',
              fontSize: '16px',
              color: 'var(--color-text-secondary)',
              lineHeight: 1.65,
              marginBottom: '24px',
            }}
          >
            {o.priceIntro3}
          </p>

          <button
            onClick={() => {
              if (!showPricing) trackViewPricing()
              setShowPricing(v => !v)
            }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 24px',
              border: '1px solid var(--color-border-var)',
              borderRadius: '6px',
              background: 'none',
              cursor: 'pointer',
              fontFamily: 'var(--font-dm-sans), sans-serif',
              fontSize: '14px',
              fontWeight: 500,
              color: 'var(--color-text-primary)',
              letterSpacing: '0.02em',
              transition: 'border-color 150ms ease',
            }}
          >
            {o.ctaPlans}
          </button>
        </motion.div>

        <AnimatePresence>
          {showPricing && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' as const }}
              style={{ overflow: 'hidden', maxWidth: '560px', marginTop: '32px' }}
            >
              <PriceDisplay />

              <div
                style={{
                  marginTop: '40px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  gap: '16px',
                }}
              >
                <a
                  href={STRIPE_CHECKOUT_URL}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    padding: '16px 32px',
                    background: 'var(--color-accent-var)',
                    color: '#000',
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
                  {o.ctaPrimary}
                </a>

                <span
                  style={{
                    fontFamily: 'var(--font-dm-sans), sans-serif',
                    fontSize: '13px',
                    color: 'var(--color-text-muted)',
                  }}
                >
                  ou
                </span>

                <a
                  href={WA_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    padding: '12px 24px',
                    border: '1px solid var(--color-border-var)',
                    borderRadius: '6px',
                    background: 'none',
                    fontFamily: 'var(--font-dm-sans), sans-serif',
                    fontSize: '15px',
                    color: 'var(--color-text-primary)',
                    textDecoration: 'none',
                    transition: 'border-color 150ms ease',
                  }}
                >
                  {o.ctaSecondary}
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <style>{`
        .oferta-layout {
          display: flex;
          flex-direction: column;
          gap: 40px;
        }
        .oferta-mockup {
          display: flex;
          justify-content: center;
        }
        @media (min-width: 768px) {
          .oferta-layout {
            flex-direction: row;
            align-items: flex-start;
            gap: 64px;
          }
          .oferta-mockup {
            justify-content: flex-end;
          }
        }
      `}</style>
    </section>
  )
}
