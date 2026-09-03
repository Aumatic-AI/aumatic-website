import Link from 'next/link'
import { motion } from 'framer-motion'

export default function CaseStudyHero({ study }) {
  return (
    <div style={{ paddingTop: 112, background: 'var(--bg)', position: 'relative' }}>
      <div className="container" style={{ padding: 'clamp(40px,5vw,72px) clamp(20px,3vw,40px) clamp(36px,4vw,56px)' }}>

        {/* Back link */}
        <motion.div
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          style={{ marginBottom: 32 }}
        >
          <Link
            href="/#case-studies"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              fontSize: 13, fontWeight: 500, color: '#8A6A5A',
              textDecoration: 'none', transition: 'color 0.25s, gap 0.25s',
              fontFamily: "'Inter', sans-serif",
            }}
            onMouseEnter={e => { e.currentTarget.style.color = '#FF8500'; e.currentTarget.style.gap = '12px' }}
            onMouseLeave={e => { e.currentTarget.style.color = '#8A6A5A'; e.currentTarget.style.gap = '8px' }}
          >
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path d="M13 8H3M3 8L7 4M3 8L7 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            All case studies
          </Link>
        </motion.div>

        {/* Industry + date badges */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.06 }}
          style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 28 }}
        >
          <span style={{
            background: 'rgba(255,133,0,0.08)', border: '1px solid rgba(255,133,0,0.22)',
            borderRadius: 99, padding: '5px 14px',
            fontSize: 11, fontWeight: 600, letterSpacing: 1.4,
            textTransform: 'uppercase', color: '#FF8500',
          }}>
            {study.industry}
          </span>
          <span style={{
            background: 'rgba(255,133,0,0.04)', border: '1px solid rgba(255,133,0,0.10)',
            borderRadius: 99, padding: '5px 14px',
            fontSize: 11, fontWeight: 500, color: '#8A6A5A',
          }}>
            {study.date}
          </span>
        </motion.div>

        {/* Title — serif display */}
        <motion.h1
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22,1,0.36,1] }}
          style={{
            fontFamily: "'Onest', sans-serif",
            fontSize: 'clamp(34px,5.5vw,76px)',
            fontWeight: 800,
            letterSpacing: '-0.03em',
            lineHeight: 1.02,
            color: '#1A0F0A',
            maxWidth: 940,
            marginBottom: 28,
          }}
        >
          {study.title}
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{
            fontSize: 'clamp(16px,1.4vw,19px)',
            color: '#5C3D2A',
            lineHeight: 1.7,
            maxWidth: 720,
            marginBottom: 36,
          }}
        >
          {study.description}
        </motion.p>

        {/* Metrics row */}
        {study.metrics?.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            style={{
              display: 'grid',
              gridTemplateColumns: `repeat(${study.metrics.length}, 1fr)`,
              gap: 1,
              background: 'var(--hair-warm)',
              borderRadius: 18, overflow: 'hidden',
              border: '1px solid var(--hair-warm)',
              maxWidth: 760,
            }}
            className="cs-metrics"
          >
            {study.metrics.map((m, i) => (
              <div key={i} style={{ padding: '22px 24px', background: 'var(--bg-card)' }}>
                <div style={{
                  fontFamily: "'Onest', sans-serif",
                  fontSize: 'clamp(26px,3vw,40px)',
                  fontWeight: 800, letterSpacing: '-0.02em', lineHeight: 1,
                  color: '#FF8500', marginBottom: 6,
                }}>{m.value}</div>
                <div style={{ fontSize: 12, color: '#5C3D2A', lineHeight: 1.4 }}>{m.label}</div>
              </div>
            ))}
          </motion.div>
        )}

        {/* Hairline */}
        <div style={{ marginTop: 48, height: 1, background: 'linear-gradient(90deg, var(--hair-strong), transparent 80%)' }} />
      </div>

      <style>{`@media(max-width:680px){.cs-metrics{grid-template-columns:1fr 1fr!important}}`}</style>
    </div>
  )
}
