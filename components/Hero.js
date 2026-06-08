import { useRef, useEffect } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'

/* ── Magnetic CTA — pulls toward cursor ─────────────────────── */
function Magnetic({ children, strength = 0.22, className }) {
  const ref = useRef(null)
  const onMove = (e) => {
    const el = ref.current; if (!el) return
    const r = el.getBoundingClientRect()
    const x = e.clientX - r.left - r.width / 2
    const y = e.clientY - r.top  - r.height / 2
    el.style.transform = `translate3d(${x * strength}px, ${y * strength}px, 0)`
  }
  const onLeave = () => { if (ref.current) ref.current.style.transform = 'translate3d(0,0,0)' }
  return (
    <span
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={className}
      style={{ display: 'inline-block', transition: 'transform 0.45s cubic-bezier(0.22,1,0.36,1)', willChange: 'transform' }}
    >
      {children}
    </span>
  )
}

/* ── Word-by-word reveal headline ───────────────────────────── */
function WordReveal({ children, delay = 0, italic = false, accent = false }) {
  return (
    <span style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'bottom', paddingBottom: '0.08em', paddingRight: '0.04em' }}>
      <motion.span
        initial={{ y: '110%', opacity: 0 }}
        animate={{ y: '0%', opacity: 1 }}
        transition={{ delay, duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
        style={{
          display: 'inline-block',
          fontStyle: italic ? 'italic' : 'normal',
          color: accent ? '#C2622D' : 'inherit',
        }}
      >
        {children}
      </motion.span>
    </span>
  )
}

export default function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  // Parallax depth for background layers
  const y1 = useSpring(useTransform(scrollYProgress, [0, 1], [0, -120]), { stiffness: 80, damping: 20 })
  const y2 = useSpring(useTransform(scrollYProgress, [0, 1], [0, -220]), { stiffness: 80, damping: 20 })
  const opacityFade = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  return (
    <section
      ref={ref}
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        paddingTop: 120, paddingBottom: 96,
        overflow: 'hidden',
        background: 'linear-gradient(180deg, #EFE6D8 0%, #F5EFE8 60%, #EFE6D8 100%)',
      }}
    >
      {/* ── Layered warm blobs (parallax) ── */}
      <motion.div style={{ position: 'absolute', inset: 0, y: y1, opacity: opacityFade, pointerEvents: 'none' }}>
        <div className="anim-blob1" style={{
          position: 'absolute', top: '-16%', left: '-12%', width: 780, height: 780,
          borderRadius: '50%', filter: 'blur(70px)',
          background: 'radial-gradient(circle, rgba(194,98,45,0.34) 0%, rgba(210,130,55,0.14) 50%, transparent 70%)',
        }} />
        <div className="anim-blob2" style={{
          position: 'absolute', top: '-10%', right: '-10%', width: 700, height: 700,
          borderRadius: '50%', filter: 'blur(60px)',
          background: 'radial-gradient(circle, rgba(220,150,60,0.32) 0%, rgba(230,170,80,0.14) 50%, transparent 70%)',
        }} />
      </motion.div>

      <motion.div style={{ position: 'absolute', inset: 0, y: y2, opacity: opacityFade, pointerEvents: 'none' }}>
        <div className="anim-blob3" style={{
          position: 'absolute', bottom: '-20%', left: '15%', width: 640, height: 640,
          borderRadius: '50%', filter: 'blur(72px)',
          background: 'radial-gradient(circle, rgba(180,90,35,0.28) 0%, rgba(200,120,60,0.12) 50%, transparent 70%)',
        }} />
        <div style={{
          position: 'absolute', bottom: '4%', right: '4%', width: 500, height: 500,
          borderRadius: '50%', filter: 'blur(56px)',
          background: 'radial-gradient(circle, rgba(230,165,70,0.24) 0%, transparent 65%)',
        }} />
      </motion.div>

      {/* Bright center spotlight */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 60% 50% at 50% 46%, rgba(255,248,238,0.72) 0%, transparent 70%)',
      }} />

      {/* Decorative concentric rings */}
      <svg
        style={{ position: 'absolute', top: '50%', left: '50%', width: 'min(940px,92vw)', height: 'min(940px,92vw)', transform: 'translate(-50%,-50%)', opacity: 0.5, pointerEvents: 'none' }}
        viewBox="0 0 900 900" fill="none"
      >
        <circle cx="450" cy="450" r="420" stroke="rgba(194,98,45,0.10)" strokeWidth="1"   strokeDasharray="2 12"/>
        <circle cx="450" cy="450" r="330" stroke="rgba(194,98,45,0.13)" strokeWidth="1"   strokeDasharray="3 16"/>
        <circle cx="450" cy="450" r="240" stroke="rgba(194,98,45,0.08)" strokeWidth="0.8" strokeDasharray="2 22"/>
      </svg>

      {/* Sparkle particles — float upward */}
      {[
        { l:'12%', t:'78%', s:3, o:0.6, d:0,   dur:11 },
        { l:'22%', t:'62%', s:4, o:0.5, d:1.6, dur:13 },
        { l:'35%', t:'80%', s:3, o:0.7, d:0.9, dur:10 },
        { l:'58%', t:'82%', s:4, o:0.6, d:2.2, dur:12 },
        { l:'68%', t:'66%', s:3, o:0.5, d:4.0, dur:14 },
        { l:'78%', t:'76%', s:4, o:0.7, d:1.2, dur:10 },
        { l:'88%', t:'58%', s:3, o:0.5, d:2.8, dur:15 },
        { l:'18%', t:'88%', s:3, o:0.5, d:5.0, dur:11 },
        { l:'42%', t:'58%', s:3, o:0.6, d:3.4, dur:12 },
        { l:'62%', t:'90%', s:4, o:0.6, d:1.8, dur:13 },
      ].map((p, i) => (
        <span key={i} style={{
          position:'absolute', left:p.l, top:p.t,
          width:p.s, height:p.s, borderRadius:'50%',
          background:'#C2622D', opacity:p.o,
          boxShadow:`0 0 ${p.s*2.5}px rgba(194,98,45,0.7)`,
          animation:`float-particle ${p.dur}s ease-in-out ${p.d}s infinite`,
          pointerEvents:'none',
        }} />
      ))}

      {/* ── Content ── */}
      <div style={{
        position: 'relative', zIndex: 3,
        maxWidth: 1100, margin: '0 auto',
        padding: '0 clamp(20px,4vw,32px)',
        textAlign: 'center',
      }}>

        {/* Eyebrow badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22,1,0.36,1] }}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 10,
            padding: '7px 16px 7px 11px',
            background: 'rgba(255,255,255,0.7)',
            border: '1px solid rgba(194,98,45,0.18)',
            borderRadius: 999,
            marginBottom: 36,
            boxShadow: '0 4px 18px rgba(194,98,45,0.08)',
            backdropFilter: 'blur(8px)',
          }}
        >
          <span style={{
            display: 'inline-flex', width: 22, height: 22, borderRadius: 99,
            background: 'linear-gradient(135deg, #C2622D, #E8A060)',
            alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 2px 8px rgba(194,98,45,0.4)',
          }}>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
          </span>
          <span style={{ fontSize: 13, fontWeight: 600, color: '#3D2314', letterSpacing: 0.2 }}>
            AI Automation Studio · India + Global
          </span>
          <span style={{ width: 6, height: 6, borderRadius: 99, background: '#10B981', boxShadow: '0 0 8px #10B981' }} />
        </motion.div>

        {/* Display headline — Instrument Serif */}
        <h1 style={{
          fontFamily: "'Instrument Serif', serif",
          fontSize: 'clamp(54px, 8vw, 112px)',
          fontWeight: 400,
          letterSpacing: '-0.03em',
          lineHeight: 0.98,
          marginBottom: 28,
          color: '#1A0F0A',
        }}>
          <span style={{ display: 'block' }}>
            <WordReveal delay={0.05}>We design</WordReveal>{' '}
            <WordReveal delay={0.18} italic accent>intelligent</WordReveal>
          </span>
          <span style={{ display: 'block' }}>
            <WordReveal delay={0.30}>automation that</WordReveal>{' '}
            <WordReveal delay={0.44} italic accent>ships</WordReveal>
            <WordReveal delay={0.56}>.</WordReveal>
          </span>
        </h1>

        {/* Sub */}
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65, duration: 0.7, ease: [0.22,1,0.36,1] }}
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 'clamp(17px, 1.5vw, 20px)',
            lineHeight: 1.6,
            color: '#5C3D2A',
            maxWidth: 620,
            margin: '0 auto 44px',
            fontWeight: 400,
          }}
        >
          We map your workflows, architect AI systems around them, and deploy automations that compound hundreds of hours back into your team every month.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.78, duration: 0.7, ease: [0.22,1,0.36,1] }}
          style={{ display: 'inline-flex', alignItems: 'center', gap: 14, flexWrap: 'wrap', justifyContent: 'center', marginBottom: 48 }}
        >
          <Magnetic strength={0.18}>
            <a href="https://cal.com/chandan-kumar-zhrofj/30min" target="_blank" rel="noopener noreferrer"
              className="btn btn-primary"
              style={{ padding: '15px 26px', fontSize: 15 }}
            >
              Book a free strategy call
              <span className="btn-arrow" style={{ display: 'inline-flex' }}>
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
            </a>
          </Magnetic>
          <a href="#case-studies" className="btn btn-ghost" style={{ padding: '15px 22px', fontSize: 15 }}>
            See our work
          </a>
        </motion.div>

        {/* Trust row */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.92, duration: 0.7 }}
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 'clamp(8px,2vw,20px)',
            flexWrap: 'wrap',
          }}
        >
          {[
            { v: '100+', l: 'Automations shipped' },
            { v: '5+',   l: 'Industries served' },
            { v: '8k+',  l: 'Hours saved / month' },
          ].map((s, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              {i > 0 && <span style={{ width: 4, height: 4, borderRadius: 99, background: 'rgba(194,98,45,0.35)' }} />}
              <span style={{
                fontFamily: "'Instrument Serif', serif",
                fontSize: 22, fontWeight: 400, color: '#1A0F0A', letterSpacing: -0.4,
              }}>
                {s.v}
              </span>
              <span style={{ fontSize: 13, color: '#5C3D2A', fontWeight: 500 }}>{s.l}</span>
            </div>
          ))}
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.6 }}
          style={{
            position: 'absolute', bottom: 28, left: '50%', transform: 'translateX(-50%)',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
          }}
        >
          <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: 2.4, textTransform: 'uppercase', color: '#8A6A5A' }}>
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 8, 0], opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            style={{ width: 1, height: 28, background: 'linear-gradient(180deg, transparent, #C2622D, transparent)' }}
          />
        </motion.div>
      </div>
    </section>
  )
}
