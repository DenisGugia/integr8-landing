'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { useLanguage } from './LanguageToggle'

const WA_LINK = 'https://wa.me/12269617351'

export default function FAQ() {
  const { locale, t } = useLanguage()
  const f = t.faq
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const allQuestions = [
    ...f.questions,
    ...(locale === 'pt' ? [f.ptOnly] : []),
    f.priceFaq,
  ]

  return (
    <section style={{ padding: '56px 24px' }}>
      <div style={{ maxWidth: '640px', margin: '0 auto' }}>
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, ease: 'easeOut' as const }}
          style={{
            fontFamily: 'var(--font-instrument-serif), serif',
            fontSize: 'clamp(28px, 4vw, 36px)',
            color: 'var(--color-text-primary)',
            marginBottom: '48px',
            textAlign: 'center',
          }}
        >
          FAQ
        </motion.h2>

        {allQuestions.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.4, ease: 'easeOut' as const, delay: i * 0.04 }}
            style={{ borderBottom: '1px solid var(--color-border-var)' }}
          >
            <button
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '16px',
                padding: '20px 0',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                textAlign: 'left',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget.querySelector('.faq-q') as HTMLElement
                if (el) el.style.color = 'var(--color-accent-var)'
              }}
              onMouseLeave={e => {
                const el = e.currentTarget.querySelector('.faq-q') as HTMLElement
                if (el) el.style.color = 'var(--color-text-primary)'
              }}
            >
              <span
                className="faq-q"
                style={{
                  fontFamily: 'var(--font-dm-sans), sans-serif',
                  fontWeight: 500,
                  fontSize: '16px',
                  color: 'var(--color-text-primary)',
                  transition: 'color 150ms ease',
                  lineHeight: 1.5,
                }}
              >
                {item.q}
              </span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                style={{
                  flexShrink: 0,
                  transform: openIndex === i ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 200ms ease',
                  color: 'var(--color-text-muted)',
                }}
              >
                <path
                  d="M4 6l4 4 4-4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            <AnimatePresence>
              {openIndex === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2, ease: 'easeInOut' as const }}
                  style={{ overflow: 'hidden' }}
                >
                  <p
                    style={{
                      fontFamily: 'var(--font-dm-sans), sans-serif',
                      fontSize: '15px',
                      color: 'var(--color-text-secondary)',
                      lineHeight: 1.7,
                      padding: '0 0 20px 0',
                    }}
                  >
                    {i < f.questions.length && (i === 4) ? (
                      <>
                        {item.a}{' '}
                        <a
                          href={WA_LINK}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            color: 'var(--color-accent-var)',
                            textDecoration: 'none',
                          }}
                        >
                          WhatsApp
                        </a>
                      </>
                    ) : locale === 'pt' && i === f.questions.length ? (
                      <>
                        {item.a}{' '}
                        <a
                          href={WA_LINK}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            color: 'var(--color-accent-var)',
                            textDecoration: 'none',
                          }}
                        >
                          WhatsApp
                        </a>
                      </>
                    ) : (
                      item.a
                    )}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
