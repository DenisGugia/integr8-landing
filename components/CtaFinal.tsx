'use client'

import { motion } from 'framer-motion'
import { useLanguage } from './LanguageToggle'

const WA_LINK = 'https://wa.me/12269617351?text=Quero+falar+com+o+Denis+antes+de+decidir'
const STRIPE_CHECKOUT_URL = '#checkout'

export default function CtaFinal() {
  const { t } = useLanguage()
  const c = t.ctaFinal

  return (
    <section
      style={{
        padding: '56px 24px',
      }}
    >
      <div
        style={{
          maxWidth: '560px',
          margin: '0 auto',
          textAlign: 'center',
        }}
      >
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, ease: 'easeOut' as const }}
          style={{
            fontFamily: 'var(--font-instrument-serif), serif',
            fontSize: 'clamp(24px, 4vw, 32px)',
            color: 'var(--color-text-primary)',
            lineHeight: 1.25,
          }}
        >
          {c.headline}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, ease: 'easeOut' as const, delay: 0.1 }}
          style={{
            fontFamily: 'var(--font-dm-sans), sans-serif',
            fontSize: '18px',
            color: 'var(--color-text-secondary)',
            marginTop: '16px',
            lineHeight: 1.6,
          }}
        >
          {c.sub}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, ease: 'easeOut' as const, delay: 0.2 }}
          style={{
            fontFamily: 'var(--font-dm-sans), sans-serif',
            fontSize: '16px',
            color: 'var(--color-text-secondary)',
            marginTop: '24px',
            lineHeight: 1.65,
          }}
        >
          {c.p1}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, ease: 'easeOut' as const, delay: 0.3 }}
          style={{
            fontFamily: 'var(--font-dm-sans), sans-serif',
            fontSize: '16px',
            color: 'var(--color-text-primary)',
            marginTop: '16px',
            lineHeight: 1.65,
          }}
        >
          {c.p2}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, ease: 'easeOut' as const, delay: 0.4 }}
          style={{
            marginTop: '40px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '16px',
          }}
        >
          <a
            href={STRIPE_CHECKOUT_URL}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: '18px 36px',
              background: 'var(--color-accent-var)',
              color: '#000',
              borderRadius: '6px',
              fontFamily: 'var(--font-dm-sans), sans-serif',
              fontWeight: 500,
              fontSize: '17px',
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
            {c.ctaPrimary}
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
            {c.ctaSecondary}
          </a>
        </motion.div>

        {/* Guarantee */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, ease: 'easeOut' as const, delay: 0.5 }}
          style={{
            marginTop: '64px',
            backgroundColor: 'var(--color-bg-var)',
            border: '1px solid var(--color-border-var)',
            borderRadius: '8px',
            padding: '32px',
            textAlign: 'left',
          }}
        >
          <em
            style={{
              display: 'block',
              fontFamily: 'var(--font-instrument-serif), serif',
              fontStyle: 'italic',
              fontSize: '22px',
              color: 'var(--color-text-primary)',
              marginBottom: '20px',
              lineHeight: 1.4,
            }}
          >
            {c.guarantee}
          </em>
          {[c.guaranteeBody1, c.guaranteeBody2, c.guaranteeBody3].map((p, i) => (
            <p
              key={i}
              style={{
                fontFamily: 'var(--font-dm-sans), sans-serif',
                fontSize: '15px',
                color: 'var(--color-text-secondary)',
                lineHeight: 1.7,
                marginTop: i > 0 ? '16px' : '0',
              }}
            >
              {p}
            </p>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
