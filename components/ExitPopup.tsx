'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { useLanguage } from './LanguageToggle'

const WA_LINK = 'https://wa.me/12269617351?text=Quero+saber+mais+sobre+o+Protocolo+C.O.R.E.+8'
const SESSION_KEY = 'integr8-popup-shown'

export default function ExitPopup() {
  const { t } = useLanguage()
  const p = t.popup
  const [visible, setVisible] = useState(false)
  const [email, setEmail] = useState('')
  const shownRef = useRef(false)

  useEffect(() => {
    if (sessionStorage.getItem(SESSION_KEY)) return

    function show() {
      if (shownRef.current) return
      shownRef.current = true
      sessionStorage.setItem(SESSION_KEY, 'true')
      setVisible(true)
    }

    // Desktop: mouse leaves through top
    function handleMouseLeave(e: MouseEvent) {
      if (e.clientY <= 0) show()
    }

    // Mobile: 45s on page without clicking a CTA
    const timer = setTimeout(show, 45000)

    document.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave)
      clearTimeout(timer)
    }
  }, [])

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setVisible(false)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 100,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px',
            backgroundColor: 'rgba(0,0,0,0.7)',
            backdropFilter: 'blur(4px)',
          }}
          onClick={() => setVisible(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            onClick={e => e.stopPropagation()}
            style={{
              backgroundColor: 'var(--color-surface-var)',
              borderRadius: '12px',
              padding: '40px',
              maxWidth: '480px',
              width: '100%',
            }}
          >
            <p
              style={{
                fontFamily: 'var(--font-instrument-serif), serif',
                fontSize: '26px',
                color: 'var(--color-text-primary)',
                lineHeight: 1.3,
                marginBottom: '16px',
              }}
            >
              {p.headline}
            </p>
            <p
              style={{
                fontFamily: 'var(--font-dm-sans), sans-serif',
                fontSize: '16px',
                color: 'var(--color-text-secondary)',
                lineHeight: 1.65,
                marginBottom: '32px',
              }}
            >
              {p.sub}
            </p>

            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                padding: '14px 28px',
                background: 'var(--color-accent-var)',
                color: '#000',
                borderRadius: '6px',
                fontFamily: 'var(--font-dm-sans), sans-serif',
                fontWeight: 500,
                fontSize: '16px',
                textDecoration: 'none',
                marginBottom: '24px',
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
              {p.cta}
            </a>

            <div
              style={{
                display: 'flex',
                gap: '8px',
                marginBottom: '20px',
              }}
            >
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder={p.emailPlaceholder}
                style={{
                  flex: 1,
                  padding: '10px 14px',
                  border: '1px solid var(--color-border-var)',
                  borderRadius: '6px',
                  background: 'var(--color-bg-var)',
                  fontFamily: 'var(--font-dm-sans), sans-serif',
                  fontSize: '14px',
                  color: 'var(--color-text-primary)',
                  outline: 'none',
                }}
              />
              <button
                style={{
                  padding: '10px 16px',
                  border: '1px solid var(--color-border-var)',
                  borderRadius: '6px',
                  background: 'none',
                  cursor: 'pointer',
                  fontFamily: 'var(--font-dm-sans), sans-serif',
                  fontSize: '13px',
                  color: 'var(--color-text-primary)',
                  whiteSpace: 'nowrap',
                }}
              >
                {p.emailCta}
              </button>
            </div>

            <button
              onClick={() => setVisible(false)}
              style={{
                display: 'block',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontFamily: 'var(--font-dm-sans), sans-serif',
                fontSize: '13px',
                color: 'var(--color-text-muted)',
                padding: 0,
              }}
            >
              {p.dismiss}
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
