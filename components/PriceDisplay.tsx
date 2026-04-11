'use client'

import { useEffect, useState } from 'react'
import { useLanguage } from './LanguageToggle'

const BASE_PRICES = {
  monthly: { perMonth: 69.9, upfront: 66.4 },
  quarterly: { perMonth: 49.9, upfront: 189.6 },
  annual: { perMonth: 44.9, upfront: 511.85 },
}

type Currency = 'CAD' | 'USD' | 'BRL' | 'GBP' | 'EUR' | 'ARS'

function roundPrice(value: number, currency: Currency): string {
  if (currency === 'BRL') {
    const base = Math.floor(value)
    return `${base},90`
  }
  return Math.round(value).toString()
}

function formatPrice(value: number, currency: Currency, symbol: string): string {
  const formatted = roundPrice(value, currency)
  return `${symbol} ${formatted}`
}

const CURRENCY_SYMBOLS: Record<Currency, string> = {
  CAD: 'CAD$',
  USD: 'USD$',
  BRL: 'R$',
  GBP: '£',
  EUR: '€',
  ARS: 'ARS$',
}

export default function PriceDisplay() {
  const { t } = useLanguage()
  const o = t.oferta

  const [currency, setCurrency] = useState<Currency>('CAD')
  const [rates, setRates] = useState<Record<string, number> | null>(null)
  const [loading, setLoading] = useState(true)
  const [, setError] = useState(false)

  useEffect(() => {
    let cancelled = false
    const timeout = setTimeout(() => {
      if (!cancelled) {
        setLoading(false)
        setError(true)
        setCurrency('USD')
      }
    }, 3000)

    async function load() {
      try {
        const ipRes = await fetch('https://ipapi.co/json/')
        const ipData = await ipRes.json()
        const countryCode = ipData?.country_code

        const currencyMap: Record<string, Currency> = {
          CA: 'CAD',
          US: 'USD',
          BR: 'BRL',
          GB: 'GBP',
          AR: 'ARS',
        }
        const euroCountries = [
          'DE','FR','IT','ES','PT','NL','BE','AT','IE','FI',
          'GR','LU','SK','SI','EE','LV','LT','CY','MT',
        ]
        let detectedCurrency: Currency = 'USD'
        if (countryCode && currencyMap[countryCode]) {
          detectedCurrency = currencyMap[countryCode]
        } else if (countryCode && euroCountries.includes(countryCode)) {
          detectedCurrency = 'EUR'
        }

        const rateRes = await fetch('https://open.er-api.com/v6/latest/CAD')
        const rateData = await rateRes.json()

        if (!cancelled) {
          clearTimeout(timeout)
          setRates(rateData?.rates ?? null)
          setCurrency(detectedCurrency)
          setLoading(false)
        }
      } catch {
        if (!cancelled) {
          clearTimeout(timeout)
          setLoading(false)
          setError(true)
          setCurrency('USD')
        }
      }
    }

    load()
    return () => {
      cancelled = true
      clearTimeout(timeout)
    }
  }, [])

  function convert(cadValue: number): string {
    if (!rates || currency === 'CAD') {
      return formatPrice(cadValue, currency, CURRENCY_SYMBOLS[currency])
    }
    const rate = rates[currency] ?? rates['USD'] ?? 1
    return formatPrice(cadValue * rate, currency, CURRENCY_SYMBOLS[currency])
  }

  const dash = '—'

  const rows = [
    {
      label: o.tableRow1,
      perMonth: loading ? dash : convert(BASE_PRICES.monthly.perMonth),
      upfront: loading ? dash : convert(BASE_PRICES.monthly.upfront),
      recommended: false,
    },
    {
      label: o.tableRow2,
      perMonth: loading ? dash : convert(BASE_PRICES.quarterly.perMonth),
      upfront: loading ? dash : convert(BASE_PRICES.quarterly.upfront),
      recommended: true,
    },
    {
      label: o.tableRow3,
      perMonth: loading ? dash : convert(BASE_PRICES.annual.perMonth),
      upfront: loading ? dash : convert(BASE_PRICES.annual.upfront),
      recommended: false,
    },
  ]

  return (
    <div>
      {/* Table */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          border: '1px solid var(--color-border-var)',
          borderRadius: '8px',
          overflow: 'hidden',
        }}
      >
        {/* Header */}
        {[o.tableCol1, o.tableCol2, o.tableCol3].map((col, i) => (
          <div
            key={i}
            style={{
              padding: '12px 16px',
              backgroundColor: 'var(--color-surface-var)',
              fontFamily: 'var(--font-dm-sans), sans-serif',
              fontSize: '13px',
              fontWeight: 500,
              color: 'var(--color-text-muted)',
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              borderBottom: '1px solid var(--color-border-var)',
              borderRight: i < 2 ? '1px solid var(--color-border-var)' : 'none',
            }}
          >
            {col}
          </div>
        ))}

        {rows.map((row, ri) => (
          <div
            key={ri}
            style={{ display: 'contents' }}
          >
            {[row.label, row.perMonth, row.upfront].map((cell, ci) => (
              <div
                key={ci}
                style={{
                  padding: '16px',
                  fontFamily: 'var(--font-dm-sans), sans-serif',
                  fontSize: '15px',
                  color: row.recommended
                    ? 'var(--color-text-primary)'
                    : 'var(--color-text-secondary)',
                  fontWeight: row.recommended && ci > 0 ? 500 : 400,
                  borderBottom:
                    ri < rows.length - 1
                      ? '1px solid var(--color-border-var)'
                      : 'none',
                  borderRight: ci < 2 ? '1px solid var(--color-border-var)' : 'none',
                  borderTop: row.recommended && ci === 0
                    ? '2px solid var(--color-accent-var)'
                    : 'none',
                  position: 'relative',
                }}
              >
                {row.recommended && ci === 0 && (
                  <span
                    style={{
                      position: 'absolute',
                      top: '-14px',
                      left: '16px',
                      fontSize: '11px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      color: 'var(--color-accent-var)',
                      fontFamily: 'var(--font-dm-sans), sans-serif',
                    }}
                  >
                    {o.tableLabel}
                  </span>
                )}
                {cell}
              </div>
            ))}
          </div>
        ))}
      </div>

      <p
        style={{
          fontFamily: 'var(--font-dm-sans), sans-serif',
          fontSize: '12px',
          color: 'var(--color-text-muted)',
          textAlign: 'center',
          marginTop: '12px',
        }}
      >
        {o.priceNote}
      </p>

      <p
        style={{
          fontFamily: 'var(--font-dm-sans), sans-serif',
          fontSize: '14px',
          color: 'var(--color-text-secondary)',
          marginTop: '20px',
          lineHeight: 1.6,
        }}
      >
        {o.referral}{' '}
        <a
          href="https://wa.me/12269617351?text=Quero+saber+sobre+o+programa+de+indica%C3%A7%C3%A3o"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: 'var(--color-accent-var)', textDecoration: 'none' }}
        >
          WhatsApp
        </a>
      </p>
    </div>
  )
}
