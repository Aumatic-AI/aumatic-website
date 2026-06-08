import { useEffect, useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

const TESTIMONIALS = [
  {
    quote: 'Working with Aumatic completely changed how we handle client engagement on Instagram. The DM and comment automation saved hours every day and helped us close more deals through faster, more consistent interactions.',
    name: 'Ali Shah',
    role: 'Social Media Manager · Pixel Social (Toronto)',
    initials: 'AS',
  },
  {
    quote: 'Our LinkedIn presence grew significantly. The AI posting system finds relevant content in our niche, rewrites it in our brand voice, and publishes daily. We now get qualified leads directly from our content without lifting a finger.',
    name: 'David Clarke',
    role: 'Founder · ScaleUp Agency (Chicago)',
    initials: 'DC',
  },
  {
    quote: 'The social media automation keeps our brand consistent across Instagram, TikTok, and LinkedIn. It genuinely feels like having a dedicated content team working around the clock — without the overhead.',
    name: 'Sandra Chen',
    role: 'Marketing Director · NorthStream Marketing (Vancouver)',
    initials: 'SC',
  },
  {
    quote: 'The newsletter monitoring automation opened up a whole new lead channel for us. It identifies businesses with deliverability issues and triggers outreach automatically. A genuinely smart approach to prospecting.',
    name: 'Mark Stevens',
    role: 'Head of Growth · ProReach Agency (New York)',
    initials: 'MS',
  },
  {
    quote: 'With the WhatsApp broadcast automation, every new book release now reaches thousands of readers instantly. We moved from manual messaging to automated, personalised broadcasts — and our launch-day results improved noticeably.',
    name: 'Maria Costa',
    role: 'Founder · Bluebell Publishing',
    initials: 'MC',
  },
  {
    quote: 'Our team saves hours every week with the document consolidation automation. It creates all client documents, names them correctly, and files them in the right Drive folders automatically. Zero manual errors.',
    name: 'Ryan Patel',
    role: 'Operations Lead · Vector Consulting (Austin)',
    initials: 'RP',
  },
  {
    quote: 'The WhatsApp local service connector transformed how we match customers with service providers. Requests get routed in seconds, providers get jobs they would have missed, and the whole system runs without manual coordination.',
    name: 'James Miller',
    role: 'Founder · QuickFix Services (Ohio)',
    initials: 'JM',
  },
]

export default function Testimonials() {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const [touchStart, setTouchStart] = useState(null)

  const headRef = useRef(null)
  const inView = useInView(headRef, { once: true })
  const n = TESTIMONIALS.length

  // Autoplay
  useEffect(() => {
    if (paused) return
    const t = setTimeout(() => setActive(a => (a + 1) % n), 6200)
    return () => clearTimeout(t)
  }, [active, paused, n])

  const go = dir => setActive(a => (a + dir + n) % n)

  const onTouchStart = e => setTouchStart(e.touches[0].clientX)
  const onTouchEnd = e => {
    if (touchStart == null) return
    const diff = touchStart - e.changedTouches[0].clientX
    if (Math.abs(diff) > 48) go(diff > 0 ? 1 : -1)
    setTouchStart(null)
  }

  const t = TESTIMONIALS[active]

  return (
    <section
      id="testimonials"
      style={{
        position: 'relative', overflow: 'hidden',
        padding: 'clamp(96px,11vw,160px) 0',
        background: 'var(--bg-alt)',
        borderTop: '1px solid var(--hair)',
      }}
    >
      {/* Decorative orbs */}
      <div style={{ position: 'absolute', top: '10%', left: '-4%', width: 360, height: 360, borderRadius: '50%', background: 'radial-gradient(circle,rgba(194,98,45,0.07),transparent 65%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '8%', right: '-4%', width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle,rgba(194,98,45,0.05),transparent 65%)', pointerEvents: 'none' }} />

      <div className="container-tight">
        <motion.div
          ref={headRef}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22,1,0.36,1] }}
          style={{ textAlign: 'center', marginBottom: 56 }}
        >
          <span className="eyebrow">Testimonials</span>
          <h2 style={{
            fontFamily: "'Instrument Serif', serif",
            fontSize: 'clamp(40px,5.2vw,68px)',
            fontWeight: 400, letterSpacing: '-0.03em', lineHeight: 1,
            color: '#1A0F0A', marginTop: 18,
          }}>
            Quiet confidence,<br/><em style={{ color: '#C2622D' }}>loud results.</em>
          </h2>
        </motion.div>

        {/* Stage */}
        <div
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          style={{ position: 'relative' }}
        >
          {/* Quote mark (decorative) */}
          <div style={{
            position: 'absolute', top: -40, left: 0,
            fontFamily: "'Instrument Serif', serif",
            fontSize: 'clamp(160px,18vw,240px)',
            color: 'rgba(194,98,45,0.10)',
            lineHeight: 0.8,
            pointerEvents: 'none',
            userSelect: 'none',
          }}>“</div>

          <div style={{ position: 'relative', minHeight: 300 }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.6, ease: [0.22,1,0.36,1] }}
                style={{ padding: '20px 4px 0', maxWidth: 820, margin: '0 auto', textAlign: 'center' }}
              >
                <p style={{
                  fontFamily: "'Instrument Serif', serif",
                  fontSize: 'clamp(22px,2.4vw,32px)',
                  fontWeight: 400,
                  fontStyle: 'italic',
                  letterSpacing: '-0.015em',
                  lineHeight: 1.4,
                  color: '#1A0F0A',
                  marginBottom: 36,
                }}>
                  {t.quote}
                </p>

                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 14 }}>
                  <div style={{
                    width: 44, height: 44, borderRadius: 99,
                    background: 'linear-gradient(135deg,#C2622D,#A8501F)',
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                    color: '#FFF', fontWeight: 700, fontSize: 13,
                    boxShadow: '0 4px 12px rgba(194,98,45,0.35)',
                  }}>
                    {t.initials}
                  </div>
                  <div style={{ textAlign: 'left' }}>
                    <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, fontWeight: 600, color: '#1A0F0A' }}>
                      {t.name}
                    </div>
                    <div style={{ fontSize: 13, color: '#6E5A4A' }}>
                      {t.role}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls + dots */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14, marginTop: 56 }}>
            <button onClick={() => go(-1)} aria-label="Previous"
              style={{ width: 40, height: 40, borderRadius: 99, border: '1px solid var(--hair-warm)', background: 'transparent', cursor: 'pointer', color: '#5C3D2A', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.3s' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(194,98,45,0.5)'; e.currentTarget.style.color = '#C2622D' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--hair-warm)'; e.currentTarget.style.color = '#5C3D2A' }}
            >
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M10 4L6 8l4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>

            <div style={{ display: 'flex', gap: 6 }}>
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  aria-label={`Go to testimonial ${i + 1}`}
                  style={{
                    width: i === active ? 28 : 6, height: 6,
                    borderRadius: 99,
                    background: i === active ? '#C2622D' : 'rgba(194,98,45,0.25)',
                    border: 'none', cursor: 'pointer', padding: 0,
                    transition: 'all 0.5s var(--ease-out)',
                  }}
                />
              ))}
            </div>

            <button onClick={() => go(1)} aria-label="Next"
              style={{ width: 40, height: 40, borderRadius: 99, border: '1px solid var(--hair-warm)', background: 'transparent', cursor: 'pointer', color: '#5C3D2A', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.3s' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(194,98,45,0.5)'; e.currentTarget.style.color = '#C2622D' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--hair-warm)'; e.currentTarget.style.color = '#5C3D2A' }}
            >
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
