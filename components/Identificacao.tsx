'use client'

import { motion } from 'framer-motion'
import { useLanguage } from './LanguageToggle'

function block(delay: number) {
  return {
    initial: { opacity: 0, y: 12 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-80px' },
    transition: { duration: 0.5, ease: 'easeOut' as const, delay },
  }
}

const hr = (
  <hr
    style={{
      width: '40px',
      height: '1px',
      border: 'none',
      backgroundColor: 'var(--color-border-var)',
      margin: '40px auto',
    }}
  />
)

export default function Identificacao() {
  const { t } = useLanguage()
  const i = t.identificacao

  return (
    <section
      style={{
        maxWidth: '640px',
        margin: '0 auto',
        padding: '56px 24px',
      }}
    >
      {/* Bloco 1 */}
      <motion.div {...block(0)}>
        <p
          style={{
            fontFamily: 'var(--font-instrument-serif), serif',
            fontSize: 'clamp(18px, 2.5vw, 22px)',
            color: 'var(--color-text-primary)',
            marginBottom: '16px',
          }}
        >
          {i.b1h}
        </p>
        <p
          style={{
            fontFamily: 'var(--font-dm-sans), sans-serif',
            fontSize: '17px',
            color: 'var(--color-text-secondary)',
            lineHeight: 1.7,
          }}
        >
          {i.b1p1}
        </p>
        <p
          style={{
            fontFamily: 'var(--font-dm-sans), sans-serif',
            fontSize: '17px',
            color: 'var(--color-text-primary)',
            marginTop: '16px',
            lineHeight: 1.7,
          }}
        >
          {i.b1p2}
        </p>
        <p
          style={{
            fontFamily: 'var(--font-dm-sans), sans-serif',
            fontSize: '17px',
            color: 'var(--color-text-secondary)',
            lineHeight: 1.7,
          }}
        >
          {i.b1p3}
        </p>
      </motion.div>

      {hr}

      {/* Bloco 2 */}
      <motion.div {...block(0.12)}>
        <p
          style={{
            fontFamily: 'var(--font-dm-sans), sans-serif',
            fontSize: '17px',
            color: 'var(--color-text-primary)',
            lineHeight: 1.7,
          }}
        >
          {i.b2p1}
        </p>
        <p
          style={{
            fontFamily: 'var(--font-dm-sans), sans-serif',
            fontSize: '17px',
            color: 'var(--color-text-secondary)',
            marginTop: '12px',
            lineHeight: 1.7,
          }}
        >
          {i.b2p2}
        </p>
        <p
          style={{
            fontFamily: 'var(--font-dm-sans), sans-serif',
            fontSize: '17px',
            color: 'var(--color-text-secondary)',
            marginTop: '16px',
            marginBottom: '4px',
            lineHeight: 1.7,
          }}
        >
          {i.b2p3}
        </p>
        <motion.em
          {...block(0.2)}
          style={{
            display: 'block',
            fontFamily: 'var(--font-instrument-serif), serif',
            fontStyle: 'italic',
            fontSize: 'clamp(18px, 2.5vw, 22px)',
            color: 'var(--color-text-primary)',
            margin: '24px 0',
          }}
        >
          {i.b2italic}
        </motion.em>
      </motion.div>

      {hr}

      {/* Bloco 3 */}
      <motion.div {...block(0.24)}>
        <p
          style={{
            fontFamily: 'var(--font-dm-sans), sans-serif',
            fontWeight: 500,
            fontSize: '18px',
            color: 'var(--color-text-primary)',
            marginBottom: '16px',
            lineHeight: 1.7,
          }}
        >
          {i.b3h}
        </p>
        <p
          style={{
            fontFamily: 'var(--font-dm-sans), sans-serif',
            fontSize: '17px',
            color: 'var(--color-text-secondary)',
            lineHeight: 1.7,
          }}
        >
          {i.b3p1}
        </p>
        <p
          style={{
            fontFamily: 'var(--font-dm-sans), sans-serif',
            fontSize: '17px',
            color: 'var(--color-text-primary)',
            marginTop: '16px',
            lineHeight: 1.7,
          }}
        >
          {i.b3p2}
        </p>
      </motion.div>
    </section>
  )
}
