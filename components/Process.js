import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'

const STEPS = [
  {
    num: '01',
    title: 'Deep Analysis',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="7"/>
        <path d="m21 21-4.35-4.35"/>
      </svg>
    ),
    desc: 'We map every workflow, interview your team, and uncover where AI creates the biggest impact on your bottom line.',
    tags: ['Workflow mapping', 'Opportunity scoring', 'ROI projections', 'Feasibility'],
  },
  {
    num: '02',
    title: 'Architecture & Design',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 12h4l3-9 4 18 3-9h4"/>
      </svg>
    ),
    desc: 'We architect the perfect automation stack — integrating your existing tools while adding intelligent layers on top.',
    tags: ['System design', 'Integration planning', 'Data flow', 'Tool selection'],
  },
  {
    num: '03',
    title: 'Build & Deploy',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="13" rx="2"/>
        <path d="M8 21h8M12 17v4"/>
      </svg>
    ),
    desc: 'Our engineers build, test, and deploy your custom automations with rigorous QA and real-time monitoring.',
    tags: ['Custom AI agents', 'API integrations', 'Pipelines', 'Quality assurance'],
  },
  {
    num: '04',
    title: 'Train & Optimize',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
        <path d="M6 12v5c3 3 9 3 12 0v-5"/>
      </svg>
    ),
    desc: 'We train your team, set up dashboards, and continuously optimize for peak performance month over month.',
    tags: ['Team workshops', 'Dashboards', 'Ongoing tuning', 'Dedicated support'],
  },
]

function StepCard({ s, i, total }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: (i % 2) * 0.12, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: 'relative',
        padding: 'clamp(28px,3vw,40px)',
        background: 'var(--bg-card)',
        border: '1px solid var(--hair-warm)',
        borderRadius: 'var(--radius-lg)',
        overflow: 'hidden',
        transition: 'border-color 0.5s, box-shadow 0.5s, transform 0.5s var(--ease-out)',
      }}
      whileHover={{ y: -6 }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = 'rgba(194,98,45,0.32)'
        e.currentTarget.style.boxShadow = '0 22px 60px rgba(194,98,45,0.14), 0 4px 10px rgba(20,16,12,0.04)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'rgba(194,98,45,0.14)'
        e.currentTarget.style.boxShadow = 'none'
      }}
    >
      {/* Corner glow */}
      <div style={{
        position: 'absolute', top: -40, right: -40, width: 160, height: 160, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(194,98,45,0.10), transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 24, position: 'relative' }}>
        {/* Big serif number */}
        <span style={{
          fontFamily: "'Instrument Serif', serif",
          fontSize: 72,
          fontWeight: 400,
          lineHeight: 0.85,
          letterSpacing: '-0.04em',
          color: 'transparent',
          background: 'linear-gradient(180deg, #C2622D 0%, #A8501F 100%)',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          userSelect: 'none',
        }}>{s.num}</span>

        {/* Icon */}
        <div style={{
          width: 48, height: 48, borderRadius: 14,
          background: 'rgba(194,98,45,0.08)',
          border: '1px solid rgba(194,98,45,0.18)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: '#C2622D', flexShrink: 0,
        }}>
          {s.icon}
        </div>
      </div>

      <h3 style={{
        fontFamily: "'Instrument Serif', serif",
        fontSize: 'clamp(24px,2.6vw,30px)',
        fontWeight: 400, letterSpacing: '-0.025em', lineHeight: 1.1,
        color: '#1A0F0A', marginBottom: 12,
      }}>
        {s.title}
      </h3>

      <p style={{
        fontSize: 15.5, color: '#5C3D2A', lineHeight: 1.7, marginBottom: 22,
        fontFamily: "'Inter', sans-serif",
      }}>
        {s.desc}
      </p>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        {s.tags.map(t => <span key={t} className="tag">{t}</span>)}
      </div>
    </motion.div>
  )
}

export default function Process() {
  const sectionRef = useRef(null)
  const headRef = useRef(null)
  const headInView = useInView(headRef, { once: true })

  // Vertical timeline progress on the connecting line
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 70%', 'end 30%'],
  })
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <section
      id="process"
      ref={sectionRef}
      style={{
        position: 'relative',
        padding: 'clamp(96px,11vw,160px) 0',
        background: 'var(--bg-alt)',
        borderTop: '1px solid var(--hair)',
      }}
    >
      {/* Decorative orbs */}
      <div style={{ position:'absolute', top:'10%', right:'-6%', width:380, height:380, borderRadius:'50%', background:'radial-gradient(circle, rgba(194,98,45,0.06), transparent 70%)', pointerEvents:'none' }} />

      <div className="container">
        <motion.div
          ref={headRef}
          initial={{ opacity: 0, y: 28 }}
          animate={headInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 40, marginBottom: 'clamp(48px,6vw,80px)', flexWrap: 'wrap' }}
        >
          <div style={{ maxWidth: 640 }}>
            <span className="eyebrow" style={{ marginBottom: 16 }}>Our Process</span>
            <h2 style={{
              fontFamily: "'Instrument Serif', serif",
              fontSize: 'clamp(40px,5.2vw,68px)',
              fontWeight: 400, letterSpacing: '-0.03em', lineHeight: 1,
              color: '#1A0F0A', marginTop: 16,
            }}>
              A proven path to <em style={{ color: '#C2622D' }}>operational excellence</em>.
            </h2>
          </div>
          <p style={{ fontSize: 17, color: '#5C3D2A', lineHeight: 1.65, maxWidth: 380 }}>
            Four phases. Measurable outcomes. Every single time — from the first audit to the long-term tuning.
          </p>
        </motion.div>

        {/* Timeline rail (visible at md+) */}
        <div style={{ position: 'relative' }}>
          <div className="hide-mobile" style={{
            position: 'absolute',
            top: 0, bottom: 0,
            left: '50%',
            width: 1,
            transform: 'translateX(-50%)',
            background: 'linear-gradient(180deg, transparent 0%, var(--hair-warm) 8%, var(--hair-warm) 92%, transparent 100%)',
            pointerEvents: 'none',
          }}>
            <motion.div style={{
              position: 'absolute', top: 0, left: 0, right: 0,
              height: '100%',
              background: 'linear-gradient(180deg, #C2622D, #E8A060, #C2622D)',
              transformOrigin: 'top',
              scaleY: lineScale,
            }} />
          </div>

          <div className="grid-2">
            {STEPS.map((s, i) => <StepCard key={i} s={s} i={i} total={STEPS.length} />)}
          </div>
        </div>
      </div>
    </section>
  )
}
