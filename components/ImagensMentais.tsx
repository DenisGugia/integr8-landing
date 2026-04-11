'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useState } from 'react'
import { useLanguage } from './LanguageToggle'

const cardImages = [
  '/images/card-manha.webp',
  '/images/card-reuniao.webp',
  '/images/card-filhos.webp',
  '/images/card-jantar.webp',
  '/images/card-foto.webp',
]

function CardImage({ src, alt }: { src: string; alt: string }) {
  const [error, setError] = useState(false)
  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: 'clamp(240px, 25vw, 320px)',
        backgroundColor: 'var(--color-surface-2-var)',
        overflow: 'hidden',
        flexShrink: 0,
      }}
    >
      {!error ? (
        <Image
          src={src}
          alt={alt}
          fill
          style={{ objectFit: 'cover' }}
          onError={() => setError(true)}
        />
      ) : (
        <span
          style={{
            position: 'absolute',
            bottom: '8px',
            left: '8px',
            fontSize: '10px',
            color: 'var(--color-text-muted)',
          }}
        >
          TODO: {src.split('/').pop()}
        </span>
      )}
    </div>
  )
}

export default function ImagensMentais() {
  const { t } = useLanguage()
  const im = t.imagensMentais

  return (
    <section style={{ padding: '56px 24px' }}>
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
            textAlign: 'center',
            marginBottom: '12px',
          }}
        >
          {im.headline}
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
            textAlign: 'center',
            marginBottom: '64px',
          }}
        >
          {im.sub}
        </motion.p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
          {im.cards.map((card, i) => {
            const imageLeft = i % 2 === 0
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, ease: 'easeOut' as const }}
                className="mental-card"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  backgroundColor: 'var(--color-surface-var)',
                }}
              >
                {/* Mobile: image always on top */}
                <div className="mental-card-img-mobile">
                  <CardImage src={cardImages[i]} alt={card.title} />
                </div>

                {/* Desktop layout */}
                <div
                  className="mental-card-desktop"
                  style={{
                    display: 'none',
                    flexDirection: imageLeft ? 'row' : 'row-reverse',
                  }}
                >
                  <div style={{ flex: '0 0 60%' }}>
                    <CardImage src={cardImages[i]} alt={card.title} />
                  </div>
                  <div
                    style={{
                      flex: '0 0 40%',
                      padding: '40px 32px',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                    }}
                  >
                    <h3
                      style={{
                        fontFamily: 'var(--font-instrument-serif), serif',
                        fontSize: '24px',
                        color: 'var(--color-text-primary)',
                        marginBottom: '12px',
                      }}
                    >
                      {card.title}
                    </h3>
                    <p
                      style={{
                        fontFamily: 'var(--font-dm-sans), sans-serif',
                        fontSize: '16px',
                        color: 'var(--color-text-secondary)',
                        lineHeight: 1.7,
                        whiteSpace: 'pre-line',
                      }}
                    >
                      {card.body}
                    </p>
                  </div>
                </div>

                {/* Mobile text */}
                <div
                  className="mental-card-text-mobile"
                  style={{ padding: '28px 24px' }}
                >
                  <h3
                    style={{
                      fontFamily: 'var(--font-instrument-serif), serif',
                      fontSize: '22px',
                      color: 'var(--color-text-primary)',
                      marginBottom: '10px',
                    }}
                  >
                    {card.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: 'var(--font-dm-sans), sans-serif',
                      fontSize: '15px',
                      color: 'var(--color-text-secondary)',
                      lineHeight: 1.7,
                      whiteSpace: 'pre-line',
                    }}
                  >
                    {card.body}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .mental-card {
            flex-direction: row !important;
          }
          .mental-card-img-mobile,
          .mental-card-text-mobile {
            display: none !important;
          }
          .mental-card-desktop {
            display: flex !important;
            width: 100%;
          }
        }
      `}</style>
    </section>
  )
}
