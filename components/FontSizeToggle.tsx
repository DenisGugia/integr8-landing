'use client'

import { useEffect, useState } from 'react'

type FontSize = 'normal' | 'large' | 'xlarge'
const STORAGE_KEY = 'integr8-font-size'

function getInitialSize(): FontSize {
  if (typeof window === 'undefined') return 'normal'
  const stored = localStorage.getItem(STORAGE_KEY) as FontSize | null
  if (stored === 'normal' || stored === 'large' || stored === 'xlarge') return stored
  return 'normal'
}

export default function FontSizeToggle() {
  const [size, setSize] = useState<FontSize>('normal')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const initial = getInitialSize()
    setSize(initial)
    document.documentElement.setAttribute('data-font-size', initial)
    setMounted(true)
  }, [])

  function cycle() {
    const next: FontSize =
      size === 'normal' ? 'large' : size === 'large' ? 'xlarge' : 'normal'
    setSize(next)
    document.documentElement.setAttribute('data-font-size', next)
    localStorage.setItem(STORAGE_KEY, next)
  }

  const labels: Record<FontSize, string> = {
    normal: 'A',
    large: 'A+',
    xlarge: 'A++',
  }

  const titles: Record<FontSize, string> = {
    normal: 'Texto normal — clique para aumentar',
    large: 'Texto grande — clique para aumentar mais',
    xlarge: 'Texto extra grande — clique para voltar ao normal',
  }

  return (
    <button
      onClick={cycle}
      aria-label={titles[size]}
      title={titles[size]}
      style={{
        background: 'none',
        border: '1px solid var(--color-border-var)',
        borderRadius: '999px',
        cursor: 'pointer',
        height: '28px',
        minWidth: '28px',
        padding: '0 7px',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'var(--font-dm-sans), sans-serif',
        fontSize: '11px',
        fontWeight: 600,
        letterSpacing: '0.02em',
        color: size !== 'normal' ? 'var(--color-accent-var)' : 'var(--color-text-muted)',
        borderColor: size !== 'normal' ? 'var(--color-accent-var)' : 'var(--color-border-var)',
        transition: 'color 150ms ease, border-color 150ms ease',
        opacity: mounted ? 1 : 0,
        whiteSpace: 'nowrap',
      }}
      onMouseEnter={e => {
        ;(e.currentTarget as HTMLButtonElement).style.color = 'var(--color-accent-var)'
        ;(e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--color-accent-var)'
      }}
      onMouseLeave={e => {
        const active = size !== 'normal'
        ;(e.currentTarget as HTMLButtonElement).style.color = active
          ? 'var(--color-accent-var)'
          : 'var(--color-text-muted)'
        ;(e.currentTarget as HTMLButtonElement).style.borderColor = active
          ? 'var(--color-accent-var)'
          : 'var(--color-border-var)'
      }}
    >
      {labels[size]}
    </button>
  )
}
