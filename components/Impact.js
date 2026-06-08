import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const ROWS = [
  { problem: 'Low profit margins',         solution: 'Displace labor with AI automation',       outcome: 'Higher margins' },
  { problem: 'Slow delivery',              solution: 'Eliminate bottlenecks with smart flows',   outcome: '2× faster output' },
  { problem: 'Falling behind competitors', solution: 'Deploy AI-powered capabilities',           outcome: 'Market advantage' },
  { problem: 'Overworked teams',           solution: 'Automate repetitive tasks',                outcome: 'Freed capacity' },
  { problem: 'Data silos everywhere',      solution: 'Unify tools and sync data',                outcome: 'Single source of truth' },
  { problem: 'Inconsistent quality',       solution: 'Standardize with automated pipelines',     outcome: 'Reliable output' },
  { problem: 'High operational costs',     solution: 'Replace manual workflows with AI',         outcome: 'Cost reduction' },
  { problem: 'Missed follow-ups',          solution: 'Automated CRM triggers and sequences',     outcome: 'More closed deals' },
]

/* ── CountUp — ticks numeric value when in view ─────────────── */
function CountUp({ to, suffix = '', duration = 1.8 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const [val, setVal] = useState(0)

  useEffect(() => {
    if (!inView) return
    const start = performance.now()
    const tick = (now) => {
      const t = Math.min(1, (now - start) / (duration * 1000))
      const eased = 1 - Math.pow(1 - t, 3)
      setVal(Math.round(to * eased))
      if (t < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [inView, to, duration])

  return <span ref={ref}>{val.toLocaleString()}{suffix}</span>
}

const STATS = [
  { value: 100, suffix: '+',  label: 'Automations shipped' },
  { value: 8,   suffix: 'k+', label: 'Hours saved monthly' },
  { value: 12,  suffix: '+',  label: 'Industries served' },
  { value: 0,   suffix: '',   label: 'Vendor lock-in', dash: true },
]

function Row({ r, i }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-30px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -16 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.55, delay: i * 0.05, ease: [0.22,1,0.36,1] }}
      style={{
        display: 'grid', gridTemplateColumns: '1fr 1.5fr 1fr',
        padding: '22px 40px',
        borderBottom: i < ROWS.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
        cursor: 'default',
        transition: 'background 0.3s',
      }}
      className="impact-row"
    >
      <span style={{ fontSize: 15.5, color: 'rgba(245,239,232,0.5)' }}>{r.problem}</span>
      <span style={{ fontSize: 15.5, color: 'rgba(245,239,232,0.88)', fontWeight: 500 }}>{r.solution}</span>
      <span style={{ fontSize: 15.5, color: '#E8A060', fontWeight: 600 }}>{r.outcome}</span>

      <style>{`.impact-row:hover { background: rgba(194,98,45,0.05); }`}</style>
    </motion.div>
  )
}

export default function Impact() {
  const headRef = useRef(null)
  const inView = useInView(headRef, { once: true })

  return (
    <section
      id="impact"
      style={{
        position: 'relative', overflow: 'hidden',
        padding: 'clamp(96px,11vw,160px) 0',
        background: 'linear-gradient(165deg, #1A0F0A 0%, #2C1810 50%, #3D2314 100%)',
      }}
    >
      {/* Decorative orbs on dark */}
      <div style={{ position: 'absolute', top: '-10%', right: '-6%', width: 520, height: 520, borderRadius: '50%', background: 'radial-gradient(circle,rgba(194,98,45,0.16) 0%,transparent 65%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '-10%', left: '-6%', width: 420, height: 420, borderRadius: '50%', background: 'radial-gradient(circle,rgba(200,140,90,0.10) 0%,transparent 65%)', pointerEvents: 'none' }} />
      {/* Faint grid */}
      <div style={{ position: 'absolute', inset: 0, opacity: 0.04, backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)', backgroundSize: '60px 60px', pointerEvents: 'none' }} />

      <div className="container">
        <motion.div
          ref={headRef}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22,1,0.36,1] }}
          style={{ textAlign: 'center', marginBottom: 64 }}
        >
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 11, fontWeight: 600, letterSpacing: 2.4, textTransform: 'uppercase', color: '#E8A060' }}>
            <span style={{ width: 18, height: 1, background: 'linear-gradient(90deg, transparent, #E8A060)' }} />
            Impact
            <span style={{ width: 18, height: 1, background: 'linear-gradient(90deg, #E8A060, transparent)' }} />
          </span>
          <h2 style={{
            fontFamily: "'Instrument Serif', serif",
            fontSize: 'clamp(40px,5.4vw,72px)',
            fontWeight: 400, letterSpacing: '-0.03em', lineHeight: 1,
            color: '#F5EFE8', marginTop: 18,
          }}>
            We find constraints,<br/>
            <em style={{ color: '#E8A060' }}>then crush them.</em>
          </h2>
          <p style={{ fontSize: 17, color: 'rgba(245,239,232,0.55)', lineHeight: 1.65, maxWidth: 540, margin: '20px auto 0' }}>
            Every automation compounds — creating a flywheel of profitability and competitive edge over time.
          </p>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.7, ease: [0.22,1,0.36,1] }}
          style={{
            display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 1,
            background: 'rgba(255,255,255,0.06)',
            borderRadius: 20, overflow: 'hidden', marginBottom: 56,
            border: '1px solid rgba(194,98,45,0.18)',
          }}
          className="impact-stats"
        >
          {STATS.map((s, i) => (
            <div key={i} style={{
              padding: 'clamp(22px,2.6vw,36px)',
              background: 'linear-gradient(180deg, rgba(26,15,10,0.5), rgba(26,15,10,0.85))',
              textAlign: 'center',
            }}>
              <div style={{
                fontFamily: "'Instrument Serif', serif",
                fontSize: 'clamp(36px,4vw,56px)',
                fontWeight: 400, letterSpacing: '-0.02em', lineHeight: 1,
                color: '#F5EFE8',
                marginBottom: 8,
              }}>
                {s.dash ? '0' : <CountUp to={s.value} suffix={s.suffix} />}
              </div>
              <div style={{ fontSize: 12, color: 'rgba(245,239,232,0.5)', letterSpacing: 0.3, textTransform: 'uppercase', fontWeight: 600 }}>
                {s.label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Desktop table */}
        <div className="hide-mobile" style={{ borderRadius: 22, overflow: 'hidden', border: '1px solid rgba(194,98,45,0.22)', background: 'rgba(0,0,0,0.25)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr 1fr', padding: '14px 40px', background: 'rgba(194,98,45,0.10)', borderBottom: '1px solid rgba(194,98,45,0.18)' }}>
            {['PROBLEM','SOLUTION','OUTCOME'].map(h => (
              <span key={h} style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: 2.4, textTransform: 'uppercase', color: 'rgba(245,239,232,0.45)' }}>{h}</span>
            ))}
          </div>
          {ROWS.map((r, i) => <Row key={i} r={r} i={i} />)}
        </div>

        {/* Mobile stacked */}
        <div className="show-mobile" style={{ display: 'none', flexDirection: 'column', gap: 12 }}>
          {ROWS.map((r, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.04 }}
              style={{ padding: '18px 20px', borderRadius: 16, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(194,98,45,0.18)' }}
            >
              <div style={{ fontSize: 11, color: 'rgba(245,239,232,0.45)', fontWeight: 600, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 8 }}>Problem</div>
              <div style={{ fontSize: 15, color: 'rgba(245,239,232,0.6)', marginBottom: 10 }}>{r.problem}</div>
              <div style={{ fontSize: 15, color: 'rgba(245,239,232,0.88)', fontWeight: 500, marginBottom: 10 }}>{r.solution}</div>
              <div style={{ fontSize: 15, color: '#E8A060', fontWeight: 600 }}>→ {r.outcome}</div>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) { .impact-stats { grid-template-columns: 1fr 1fr !important; } }
        @media (max-width: 720px) { .impact-stats { grid-template-columns: 1fr 1fr !important; } }
      `}</style>
    </section>
  )
}
