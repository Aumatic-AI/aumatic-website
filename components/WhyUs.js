import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const Icon = ({ children }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#C2622D" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">{children}</svg>
)

const REASONS = [
  {
    icon: <Icon><circle cx="12" cy="12" r="9"/><path d="m9 12 2 2 4-4"/></Icon>,
    title: 'Full-stack AI expertise',
    desc: "We handle the entire automation lifecycle — strategy, architecture, build, deployment, optimization. One team. One throat to choke.",
  },
  {
    icon: <Icon><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></Icon>,
    title: 'Outcome guarantee',
    desc: 'Every engagement comes with measurable KPIs. If we miss the target, we keep working until we hit it.',
  },
  {
    icon: <Icon><path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92z"/></Icon>,
    title: 'Tool-agnostic by design',
    desc: "We're not locked into vendors. We choose the right tech for your problem — not the one paying us a referral fee.",
  },
  {
    icon: <Icon><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></Icon>,
    title: 'Consultative partnership',
    desc: "We embed with your team, learn your culture, and surface opportunities you didn't know existed.",
  },
]

function Card({ r, i }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: (i % 2) * 0.1, ease: [0.22, 1, 0.36, 1] }}
      style={{
        display: 'flex', gap: 22, alignItems: 'flex-start',
        padding: '24px 4px',
        borderTop: i > 1 ? '1px solid var(--hair-warm)' : 'none',
      }}
      className="why-card"
    >
      {/* Orb */}
      <div style={{ position: 'relative', flexShrink: 0 }}>
        <div style={{
          position: 'absolute', inset: -10,
          background: 'radial-gradient(circle, rgba(194,98,45,0.12), transparent 70%)',
          borderRadius: '50%',
          opacity: 0,
          transition: 'opacity 0.5s',
        }} className="orb-glow"/>
        <div style={{
          position: 'relative',
          width: 54, height: 54, borderRadius: 16,
          background: 'rgba(194,98,45,0.08)',
          border: '1px solid rgba(194,98,45,0.22)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          {r.icon}
        </div>
      </div>

      <div style={{ flex: 1 }}>
        <h3 style={{
          fontFamily: "'Instrument Serif', serif",
          fontSize: 'clamp(24px,2.4vw,30px)',
          fontWeight: 400, letterSpacing: '-0.025em', lineHeight: 1.1,
          color: '#1A0F0A', marginBottom: 10,
        }}>
          {r.title}
        </h3>
        <p style={{ fontSize: 16, color: '#5C3D2A', lineHeight: 1.7, maxWidth: 520 }}>
          {r.desc}
        </p>
      </div>

      <style>{`
        .why-card:hover .orb-glow { opacity: 1; }
      `}</style>
    </motion.div>
  )
}

export default function WhyUs() {
  const headRef = useRef(null)
  const inView = useInView(headRef, { once: true })

  return (
    <section
      id="why-us"
      style={{
        position: 'relative',
        padding: 'clamp(96px,11vw,160px) 0',
        background: 'var(--bg-alt)',
        borderTop: '1px solid var(--hair)',
      }}
    >
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 'clamp(40px,6vw,96px)', alignItems: 'start' }} className="why-grid">
          {/* Sticky left column */}
          <motion.div
            ref={headRef}
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22,1,0.36,1] }}
            style={{ position: 'sticky', top: 120 }}
            className="why-sticky"
          >
            <span className="eyebrow">Why Aumatic</span>
            <h2 style={{
              fontFamily: "'Instrument Serif', serif",
              fontSize: 'clamp(40px,5.2vw,68px)',
              fontWeight: 400, letterSpacing: '-0.03em', lineHeight: 1,
              color: '#1A0F0A', marginTop: 16,
            }}>
              Built different.<br/>
              <em style={{ color: '#C2622D' }}>Proven results.</em>
            </h2>
            <p style={{ fontSize: 17, color: '#5C3D2A', lineHeight: 1.65, marginTop: 22, maxWidth: 380 }}>
              We take a consultative approach so you never miss hidden opportunities or fumble implementation.
            </p>
          </motion.div>

          {/* Right column */}
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', columnGap: 'clamp(28px,3vw,48px)', rowGap: 0 }} className="why-list-grid">
              {REASONS.map((r, i) => <Card key={i} r={r} i={i} />)}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .why-grid { grid-template-columns: 1fr !important; }
          .why-sticky { position: relative !important; top: auto !important; }
          .why-list-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
