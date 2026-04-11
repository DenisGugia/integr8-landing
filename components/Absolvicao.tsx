'use client'

import { motion } from 'framer-motion'
import { useLanguage } from './LanguageToggle'

export default function Absolvicao() {
  const { t } = useLanguage()
  const a = t.absolvicao

  return (
    <section
      style={{
        padding: '40px 24px',
      }}
    >
      <div style={{ maxWidth: '560px', margin: '0 auto' }}>
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, ease: 'easeOut' as const }}
          style={{
            fontFamily: 'var(--font-instrument-serif), serif',
            fontSize: 'clamp(22px, 3vw, 28px)',
            color: 'var(--color-text-primary)',
            marginBottom: '40px',
          }}
        >
          {a.headline}
        </motion.h2>

        {a.items.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -8 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.4, ease: 'easeOut' as const, delay: i * 0.08 }}
            style={{
              borderLeft: '2px solid var(--color-accent-var)',
              paddingLeft: '16px',
              marginBottom: '20px',
            }}
          >
            <p
              style={{
                fontFamily: 'var(--font-dm-sans), sans-serif',
                fontSize: '16px',
                color: 'var(--color-text-secondary)',
                lineHeight: 1.65,
              }}
            >
              {item}
            </p>
          </motion.div>
        ))}

        <motion.em
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, ease: 'easeOut' as const, delay: 0.5 }}
          style={{
            display: 'block',
            fontFamily: 'var(--font-instrument-serif), serif',
            fontStyle: 'italic',
            fontSize: 'clamp(18px, 2.5vw, 22px)',
            color: 'var(--color-text-primary)',
            textAlign: 'center',
            marginTop: '48px',
          }}
        >
          {a.closing}
        </motion.em>
      </div>
    </section>
  )
}
