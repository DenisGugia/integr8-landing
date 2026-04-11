'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useState } from 'react'
import { useLanguage } from './LanguageToggle'

export default function Denis() {
  const { t } = useLanguage()
  const d = t.denis
  const [imgError, setImgError] = useState(false)

  return (
    <section>
      {/* Full-width photo */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: 'clamp(320px, 40vw, 480px)',
          overflow: 'hidden',
          backgroundColor: 'var(--color-surface-2-var)',
        }}
      >
        {!imgError ? (
          <Image
            src="/images/denis-retrato.webp"
            alt="Denis Gugia"
            fill
            style={{ objectFit: 'cover', objectPosition: 'center top' }}
            onError={() => setImgError(true)}
          />
        ) : (
          <span
            style={{
              position: 'absolute',
              bottom: '16px',
              left: '16px',
              fontSize: '11px',
              color: 'var(--color-text-muted)',
            }}
          >
            TODO: denis-retrato.webp
          </span>
        )}
      </div>

      {/* Text */}
      <div
        style={{
          maxWidth: '680px',
          margin: '0 auto',
          padding: '48px 24px',
        }}
      >
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, ease: 'easeOut' as const }}
          style={{
            fontFamily: 'var(--font-instrument-serif), serif',
            fontSize: 'clamp(28px, 4vw, 36px)',
            color: 'var(--color-text-primary)',
            marginBottom: '32px',
          }}
        >
          {d.headline}
        </motion.h2>

        {[d.p1, d.p2, d.p3, d.p4, d.p5, d.p6].map((p, i) => (
          <motion.p
            key={i}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, ease: 'easeOut' as const, delay: i * 0.06 }}
            style={{
              fontFamily: 'var(--font-dm-sans), sans-serif',
              fontSize: '17px',
              color: 'var(--color-text-secondary)',
              lineHeight: 1.8,
              marginBottom: '24px',
            }}
          >
            {p}
          </motion.p>
        ))}

        {/* Quote */}
        <motion.blockquote
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, ease: 'easeOut' as const, delay: 0.4 }}
          style={{
            backgroundColor: 'var(--color-surface-var)',
            borderLeft: '3px solid var(--color-accent-var)',
            padding: '24px 32px',
            maxWidth: '80%',
            margin: '40px auto',
            borderRadius: '0 6px 6px 0',
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-instrument-serif), serif',
              fontStyle: 'italic',
              fontSize: '18px',
              color: 'var(--color-text-primary)',
              lineHeight: 1.7,
            }}
          >
            {d.quote}
          </p>
        </motion.blockquote>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: 'easeOut' as const, delay: 0.5 }}
          style={{
            fontFamily: 'var(--font-dm-sans), sans-serif',
            fontSize: '13px',
            color: 'var(--color-text-muted)',
            textAlign: 'center',
            marginTop: '32px',
          }}
        >
          {d.credentials}
        </motion.p>
      </div>
    </section>
  )
}
