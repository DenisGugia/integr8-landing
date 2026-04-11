'use client'

import { useLanguage } from './LanguageToggle'

type Locale = 'pt' | 'en' | 'es'

export default function Footer() {
  const { t, locale, setLocale } = useLanguage()

  const localeOptions: { value: Locale; label: string }[] = [
    { value: 'pt', label: 'PT' },
    { value: 'en', label: 'EN' },
    { value: 'es', label: 'ES' },
  ]

  return (
    <footer
      style={{
        padding: '32px 24px',
        textAlign: 'center',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '16px',
          maxWidth: '1100px',
          margin: '0 auto',
        }}
      >
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          {[
            { href: 'https://wa.me/12269617351', label: 'WhatsApp', text: 'WhatsApp' },
            { href: 'https://instagram.com/PLACEHOLDER', label: 'Instagram', text: 'Instagram' },
            { href: 'https://linkedin.com/in/PLACEHOLDER', label: 'LinkedIn', text: 'LinkedIn' },
          ].map(link => (
            <a
              key={link.text}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.label}
              style={{
                fontFamily: 'var(--font-dm-sans), sans-serif',
                fontSize: '13px',
                color: 'var(--color-text-muted)',
                textDecoration: 'none',
                transition: 'color 150ms ease',
              }}
              onMouseEnter={e =>
                ((e.currentTarget as HTMLAnchorElement).style.color =
                  'var(--color-accent-var)')
              }
              onMouseLeave={e =>
                ((e.currentTarget as HTMLAnchorElement).style.color =
                  'var(--color-text-muted)')
              }
            >
              {link.text}
            </a>
          ))}
        </div>

        <p
          style={{
            fontFamily: 'var(--font-dm-sans), sans-serif',
            fontSize: '13px',
            color: 'var(--color-text-muted)',
          }}
        >
          {t.footer.copy}
        </p>

        {/* Language toggle inline for accessibility */}
        <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
          {localeOptions.map((opt, i) => (
            <span key={opt.value} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              {i > 0 && (
                <span style={{ color: 'var(--color-text-muted)', fontSize: '12px' }}>·</span>
              )}
              <button
                onClick={() => setLocale(opt.value)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '12px',
                  letterSpacing: '0.05em',
                  fontFamily: 'var(--font-dm-sans), sans-serif',
                  color:
                    locale === opt.value
                      ? 'var(--color-text-primary)'
                      : 'var(--color-text-muted)',
                  transition: 'color 150ms ease',
                  padding: '4px 2px',
                }}
              >
                {opt.label}
              </button>
            </span>
          ))}
        </div>
      </div>
    </footer>
  )
}
