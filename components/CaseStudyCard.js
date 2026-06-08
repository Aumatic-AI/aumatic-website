import Link from 'next/link'
import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

export default function CaseStudyCard({ study, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [hovered, setHovered] = useState(false)

  // Inline tilt on hover via mouse position
  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width - 0.5
    const y = (e.clientY - r.top) / r.height - 0.5
    e.currentTarget.style.transform = `perspective(900px) rotateX(${-y * 3.2}deg) rotateY(${x * 3.2}deg) translateY(-6px)`
  }
  const onLeave = (e) => {
    e.currentTarget.style.transform = 'perspective(900px) rotateX(0) rotateY(0) translateY(0)'
    setHovered(false)
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.06, ease: [0.22,1,0.36,1] }}
      style={{ height: '100%' }}
    >
      <Link href={`/case-studies/${study.slug}`} style={{ textDecoration: 'none', display: 'block', height: '100%' }}>
        <article
          onMouseMove={onMove}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={onLeave}
          style={{
            height: '100%',
            display: 'flex', flexDirection: 'column',
            borderRadius: 18, overflow: 'hidden',
            background: 'var(--bg-card)',
            border: '1px solid var(--hair-warm)',
            cursor: 'pointer',
            transformStyle: 'preserve-3d',
            willChange: 'transform',
            transition: 'transform 0.45s var(--ease-out), border-color 0.45s, box-shadow 0.45s',
            borderColor: hovered ? 'rgba(194,98,45,0.34)' : 'rgba(194,98,45,0.14)',
            boxShadow: hovered ? '0 26px 60px rgba(194,98,45,0.18), 0 6px 14px rgba(20,16,12,0.06)' : '0 2px 14px rgba(20,16,12,0.04)',
          }}
        >
          {/* Image cover */}
          <div style={{
            width: '100%', aspectRatio: '16/9',
            overflow: 'hidden', flexShrink: 0,
            background: 'linear-gradient(135deg,#1A0F0A,#2C1810)',
            position: 'relative',
          }}>
            {study.image && (
              <img
                src={study.image}
                alt={study.title}
                style={{
                  width: '100%', height: '100%', objectFit: 'cover', display: 'block',
                  transform: hovered ? 'scale(1.06)' : 'scale(1)',
                  transition: 'transform 0.9s var(--ease-out)',
                }}
              />
            )}

            {/* Gradient veil */}
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(180deg, rgba(20,16,12,0) 50%, rgba(20,16,12,0.55) 100%)',
              pointerEvents: 'none',
            }} />

            {/* Floating category pill */}
            <div style={{
              position: 'absolute', top: 14, left: 14,
              padding: '5px 10px',
              borderRadius: 99,
              background: 'rgba(251,246,238,0.92)',
              backdropFilter: 'blur(6px)',
              fontSize: 10, fontWeight: 700,
              letterSpacing: 1.3, textTransform: 'uppercase',
              color: '#C2622D',
            }}>
              {study.category || study.industry}
            </div>
          </div>

          {/* Content */}
          <div style={{ padding: '22px 22px 24px', display: 'flex', flexDirection: 'column', flex: 1, gap: 12 }}>
            <div style={{ fontSize: 11, fontWeight: 500, color: '#8A6A5A', letterSpacing: 0.3 }}>
              {study.date} <span style={{ opacity: 0.4, margin: '0 4px' }}>•</span> {study.industry}
            </div>

            <h3 style={{
              fontFamily: "'Instrument Serif', serif",
              fontSize: 'clamp(20px,1.8vw,24px)',
              fontWeight: 400, letterSpacing: '-0.025em', lineHeight: 1.18,
              color: '#1A0F0A',
            }}>
              {study.title}
            </h3>

            <p style={{
              fontSize: 14, color: '#5C3D2A', lineHeight: 1.65,
              display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden',
              flex: 1,
            }}>
              {study.summary}
            </p>

            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              borderTop: '1px solid var(--hair-warm)', paddingTop: 14, marginTop: 4,
            }}>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', maxWidth: '70%' }}>
                {study.tags?.slice(0, 2).map(t => (
                  <span key={t} style={{
                    fontSize: 11, fontWeight: 500,
                    padding: '3px 8px', borderRadius: 99,
                    color: '#6E5A4A', background: 'rgba(194,98,45,0.06)',
                    border: '1px solid rgba(194,98,45,0.12)',
                  }}>{t}</span>
                ))}
              </div>
              <span style={{
                display: 'inline-flex', alignItems: 'center', gap: 5,
                fontSize: 13, fontWeight: 600,
                color: hovered ? '#C2622D' : '#8A6A5A',
                transition: 'color 0.3s, gap 0.3s',
              }}>
                Read case
                <svg width="13" height="13" viewBox="0 0 16 16" fill="none" style={{ transform: hovered ? 'translateX(3px)' : 'translateX(0)', transition: 'transform 0.3s' }}>
                  <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
            </div>
          </div>
        </article>
      </Link>
    </motion.div>
  )
}
