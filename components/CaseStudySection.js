import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const TYPE_META = {
  challenge:  { eyebrow: 'The Challenge', tone: '#C2622D' },
  solution:   { eyebrow: 'The Solution',  tone: '#C2622D' },
  whyItWorks: { eyebrow: 'Why It Works',  tone: '#C2622D' },
  impact:     { eyebrow: 'The Impact',    tone: '#C2622D' },
}

function SolutionBullet({ text, i }) {
  const colonIdx = text.indexOf(':')
  const hasLabel = colonIdx > -1 && colonIdx < 48
  const label    = hasLabel ? text.slice(0, colonIdx) : null
  const body     = hasLabel ? text.slice(colonIdx + 1).trim() : text
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.45, delay: i * 0.04 }}
      style={{
        display: 'grid',
        gridTemplateColumns: '36px 1fr',
        gap: 18,
        padding: '20px 4px',
        borderTop: i === 0 ? '1px solid var(--hair-warm)' : 'none',
        borderBottom: '1px solid var(--hair-warm)',
      }}
    >
      <span style={{
        fontFamily: "'Instrument Serif', serif",
        fontSize: 22, fontWeight: 400,
        letterSpacing: '-0.02em',
        color: '#C2622D',
        lineHeight: 1.2,
      }}>
        {String(i + 1).padStart(2, '0')}
      </span>
      <p style={{ fontSize: 16, color: '#3D2314', lineHeight: 1.7, margin: 0 }}>
        {label && <strong style={{ color: '#1A0F0A', fontWeight: 600 }}>{label}: </strong>}
        <span style={{ color: '#5C3D2A' }}>{body}</span>
      </p>
    </motion.div>
  )
}

function ImpactBullet({ text, i }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-20px' }}
      transition={{ duration: 0.45, delay: i * 0.05 }}
      style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}
    >
      <span style={{
        flexShrink: 0, marginTop: 8,
        width: 22, height: 22, borderRadius: 99,
        background: 'rgba(194,98,45,0.10)',
        border: '1px solid rgba(194,98,45,0.28)',
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#C2622D" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12l5 5L20 7"/></svg>
      </span>
      <p style={{ fontSize: 16, color: '#3D2314', lineHeight: 1.75, margin: 0 }}>{text}</p>
    </motion.div>
  )
}

function WhyBullet({ text, i }) {
  const colonIdx = text.indexOf(':')
  const hasLabel = colonIdx > -1 && colonIdx < 48
  const label    = hasLabel ? text.slice(0, colonIdx) : null
  const body     = hasLabel ? text.slice(colonIdx + 1).trim() : text
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-20px' }}
      transition={{ duration: 0.45, delay: i * 0.04 }}
      style={{
        padding: '20px 22px',
        background: 'var(--bg-card)',
        border: '1px solid var(--hair-warm)',
        borderRadius: 14,
        display: 'flex', gap: 14, alignItems: 'flex-start',
        transition: 'border-color 0.4s, box-shadow 0.4s',
      }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(194,98,45,0.34)'; e.currentTarget.style.boxShadow = '0 10px 28px rgba(194,98,45,0.08)' }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--hair-warm)'; e.currentTarget.style.boxShadow = 'none' }}
    >
      <span style={{
        flexShrink: 0,
        width: 28, height: 28,
        borderRadius: 99,
        background: 'linear-gradient(135deg,#C2622D,#A8501F)',
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: '0 4px 12px rgba(194,98,45,0.3)',
      }}>
        <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
          <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="white" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </span>
      <span style={{ fontSize: 15, color: '#3D2314', lineHeight: 1.65 }}>
        {label && <strong style={{ color: '#1A0F0A', fontWeight: 600 }}>{label}: </strong>}
        <span style={{ color: '#5C3D2A' }}>{body}</span>
      </span>
    </motion.div>
  )
}

export default function CaseStudySection({ section, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })
  const meta = TYPE_META[section.type] || { eyebrow: section.title, tone: '#C2622D' }

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 26 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.22,1,0.36,1] }}
      style={{ maxWidth: 1100, margin: '0 auto', padding: '0 clamp(20px,3vw,40px)', marginBottom: 'clamp(64px,8vw,96px)' }}
    >
      <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: 'clamp(28px,5vw,72px)', alignItems: 'start' }} className="cs-section-grid">
        {/* Eyebrow + index */}
        <div className="cs-section-aside" style={{ position: 'sticky', top: 120 }}>
          <div style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 11, fontWeight: 600,
            letterSpacing: 2.2, textTransform: 'uppercase',
            color: meta.tone, marginBottom: 8,
          }}>
            {meta.eyebrow}
          </div>
          <div style={{
            fontFamily: "'Instrument Serif', serif",
            fontSize: 48, fontWeight: 400, color: 'rgba(194,98,45,0.25)',
            letterSpacing: '-0.03em', lineHeight: 1,
          }}>
            {String(index + 1).padStart(2, '0')}
          </div>
        </div>

        {/* Content */}
        <div>
          <h2 style={{
            fontFamily: "'Instrument Serif', serif",
            fontSize: 'clamp(28px,3.6vw,46px)',
            fontWeight: 400, letterSpacing: '-0.025em', lineHeight: 1.05,
            color: '#1A0F0A', marginBottom: 28,
          }}>
            {section.title}
          </h2>

          {/* Plain paragraph (challenge or whyItWorks summary) */}
          {section.content && section.type !== 'whyItWorks' && (
            <p style={{ fontSize: 17, color: '#3D2314', lineHeight: 1.75, maxWidth: 740, marginBottom: section.bullets ? 32 : 0 }}>
              {section.content}
            </p>
          )}

          {/* Solution — numbered list */}
          {section.bullets && section.type === 'solution' && (
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {section.bullets.map((b, i) => <SolutionBullet key={i} text={b} i={i} />)}
            </div>
          )}

          {/* Impact — checked list */}
          {section.bullets && section.type === 'impact' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {section.bullets.map((b, i) => <ImpactBullet key={i} text={b} i={i} />)}
            </div>
          )}

          {/* whyItWorks — card grid + summary */}
          {section.bullets && section.type === 'whyItWorks' && (
            <>
              <div className="cs-why-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                {section.bullets.map((b, i) => <WhyBullet key={i} text={b} i={i} />)}
              </div>
              {section.content && (
                <p style={{
                  marginTop: 28,
                  fontSize: 16, color: '#5C3D2A', lineHeight: 1.75, maxWidth: 820,
                  borderLeft: '2px solid rgba(194,98,45,0.32)',
                  paddingLeft: 22, fontStyle: 'italic',
                  fontFamily: "'Instrument Serif', serif", fontSize: 18,
                }}>
                  {section.content}
                </p>
              )}
            </>
          )}
        </div>
      </div>

      <style>{`
        @media (max-width: 820px) {
          .cs-section-grid { grid-template-columns: 1fr !important; gap: 16px !important; }
          .cs-section-aside { position: relative !important; top: auto !important; }
        }
        @media (max-width: 640px) {
          .cs-why-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </motion.section>
  )
}
