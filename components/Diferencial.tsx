'use client'

import { motion, useMotionValue, useTransform, animate } from 'framer-motion'
import { useRef, useState } from 'react'
import { useLanguage } from './LanguageToggle'

export default function Diferencial() {
  const { t } = useLanguage()
  const d = t.diferencial
  const [activeIndex, setActiveIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)

  const handleDragEnd = (_: unknown, info: { offset: { x: number } }) => {
    const threshold = (containerRef.current?.offsetWidth ?? 300) * 0.3
    if (info.offset.x < -threshold && activeIndex < d.blocks.length - 1) {
      const newIndex = activeIndex + 1
      setActiveIndex(newIndex)
      animate(x, -newIndex * (containerRef.current?.offsetWidth ?? 0), {
        type: 'spring',
        stiffness: 300,
        damping: 30,
      })
    } else if (info.offset.x > threshold && activeIndex > 0) {
      const newIndex = activeIndex - 1
      setActiveIndex(newIndex)
      animate(x, -newIndex * (containerRef.current?.offsetWidth ?? 0), {
        type: 'spring',
        stiffness: 300,
        damping: 30,
      })
    } else {
      animate(x, -activeIndex * (containerRef.current?.offsetWidth ?? 0), {
        type: 'spring',
        stiffness: 300,
        damping: 30,
      })
    }
  }

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
            marginBottom: '16px',
          }}
        >
          {d.headline}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, ease: 'easeOut' as const, delay: 0.1 }}
          style={{
            fontFamily: 'var(--font-dm-sans), sans-serif',
            fontSize: '17px',
            color: 'var(--color-text-secondary)',
            maxWidth: '480px',
            marginBottom: '48px',
            lineHeight: 1.65,
          }}
        >
          {d.sub}
        </motion.p>

        {/* Desktop grid */}
        <div
          style={{
            display: 'none',
          }}
          className="diferencial-desktop"
        >
          {d.blocks.map((block, i) => (
            <BlockCard key={i} block={block} index={i} />
          ))}
        </div>

        {/* Mobile carousel */}
        <div
          ref={containerRef}
          style={{ overflow: 'hidden', position: 'relative' }}
          className="diferencial-mobile"
        >
          <motion.div
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.1}
            style={{ display: 'flex', x }}
            onDragEnd={handleDragEnd}
          >
            {d.blocks.map((block, i) => (
              <div
                key={i}
                style={{ minWidth: '100%', paddingRight: '0' }}
              >
                <BlockCard block={block} index={i} />
              </div>
            ))}
          </motion.div>

          {/* Dots */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '8px',
              marginTop: '24px',
            }}
          >
            {d.blocks.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setActiveIndex(i)
                  animate(x, -i * (containerRef.current?.offsetWidth ?? 0), {
                    type: 'spring',
                    stiffness: 300,
                    damping: 30,
                  })
                }}
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  border: 'none',
                  cursor: 'pointer',
                  background:
                    i === activeIndex
                      ? 'var(--color-accent-var)'
                      : 'var(--color-text-muted)',
                  transition: 'background 200ms',
                  padding: 0,
                }}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .diferencial-desktop {
            display: grid !important;
            grid-template-columns: repeat(3, 1fr);
            gap: 1px;
            background-color: var(--color-border-var);
            border: 1px solid var(--color-border-var);
            border-radius: 8px;
            overflow: hidden;
          }
          .diferencial-mobile {
            display: none !important;
          }
        }
      `}</style>
    </section>
  )
}

function BlockCard({
  block,
  index,
}: {
  block: { contra: string; favor: string; body: string }
  index: number
}) {
  const isLast = index === 2
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, ease: 'easeOut' as const, delay: index * 0.1 }}
      style={{
        backgroundColor: 'var(--color-bg-var)',
        padding: '32px 28px',
        borderRight: !isLast ? '1px solid var(--color-border-var)' : 'none',
      }}
    >
      <p
        style={{
          fontFamily: 'var(--font-dm-sans), sans-serif',
          fontSize: '15px',
          color: 'var(--color-text-secondary)',
          marginBottom: '8px',
          lineHeight: 1.6,
        }}
      >
        {block.contra}
      </p>
      <p
        style={{
          fontFamily: 'var(--font-dm-sans), sans-serif',
          fontWeight: 500,
          fontSize: '17px',
          color: 'var(--color-text-primary)',
          marginBottom: '16px',
          lineHeight: 1.55,
        }}
      >
        {block.favor}
      </p>
      <p
        style={{
          fontFamily: 'var(--font-dm-sans), sans-serif',
          fontSize: '15px',
          color: 'var(--color-text-secondary)',
          lineHeight: 1.65,
        }}
      >
        {block.body}
      </p>
    </motion.div>
  )
}
