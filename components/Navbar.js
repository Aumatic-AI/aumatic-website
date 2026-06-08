import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import { motion, AnimatePresence } from 'framer-motion'

const NAV_LINKS = [
  { label: 'Process',      hash: 'process'      },
  { label: 'Capabilities', hash: 'capabilities' },
  { label: 'Work',         hash: 'case-studies' },
  { label: 'Impact',       hash: 'impact'       },
  { label: 'FAQ',          hash: 'faq'          },
]

/* ── Magnetic wrapper — gentle pull toward cursor ──────────── */
function Magnetic({ children, strength = 0.18, style }) {
  const ref = useRef(null)
  const onMove = (e) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const x = e.clientX - r.left - r.width / 2
    const y = e.clientY - r.top - r.height / 2
    el.style.transform = `translate3d(${x * strength}px, ${y * strength}px, 0)`
  }
  const onLeave = () => {
    if (ref.current) ref.current.style.transform = 'translate3d(0,0,0)'
  }
  return (
    <span
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{
        display: 'inline-block',
        transition: 'transform 0.45s cubic-bezier(0.22,1,0.36,1)',
        willChange: 'transform',
        ...style,
      }}
    >
      {children}
    </span>
  )
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open,     setOpen]     = useState(false)
  const router  = useRouter()
  const isHome  = router.pathname === '/'

  const links = NAV_LINKS.map(l => ({
    label: l.label,
    href:  isHome ? `#${l.hash}` : `/#${l.hash}`,
  }))

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24)
    fn()
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <header style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      pointerEvents: 'none',
      padding: scrolled ? '12px clamp(16px,3vw,32px)' : '20px clamp(16px,3vw,32px)',
      transition: 'padding 0.45s cubic-bezier(0.22,1,0.36,1)',
    }}>
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
        style={{
          pointerEvents: 'auto',
          maxWidth: 1180, margin: '0 auto',
          height: 60,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '0 18px 0 22px',
          borderRadius: 999,
          background: scrolled ? 'rgba(251,246,238,0.85)' : 'rgba(251,246,238,0.55)',
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
          border: '1px solid',
          borderColor: scrolled ? 'rgba(194,98,45,0.16)' : 'rgba(194,98,45,0.10)',
          boxShadow: scrolled ? '0 10px 36px rgba(194,98,45,0.10), 0 1px 2px rgba(20,16,12,0.04)' : '0 4px 18px rgba(194,98,45,0.06)',
          transition: 'background 0.45s ease, border-color 0.45s ease, box-shadow 0.45s ease',
        }}
      >
        {/* Logo */}
        <a href="/" style={{ display: 'flex', alignItems: 'center', gap: 9, textDecoration: 'none' }}>
          <img src="/aumatic_img.png" width="28" height="28" alt="Aumatic.AI" style={{ display: 'block', objectFit: 'contain' }}/>
          <span style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: 17, fontWeight: 900, letterSpacing: -0.4,
            color: '#1A0F0A',
          }}>
            Aumatic.<span style={{ color: '#C2622D' }}>AI</span>
          </span>
        </a>

        {/* Desktop nav */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: 4 }} className="hide-mobile">
          {links.map(l => (
            <a
              key={l.label}
              href={l.href}
              style={{
                padding: '9px 14px',
                borderRadius: 99,
                fontSize: 14,
                fontWeight: 500,
                color: '#3D2314',
                textDecoration: 'none',
                transition: 'color 0.3s, background 0.3s',
              }}
              onMouseEnter={e => { e.currentTarget.style.color = '#C2622D' }}
              onMouseLeave={e => { e.currentTarget.style.color = '#3D2314' }}
            >
              {l.label}
            </a>
          ))}
        </nav>

        {/* CTA + hamburger */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <Magnetic strength={0.22}>
            <a
              href="https://cal.com/chandan-kumar-zhrofj/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
              style={{ padding: '10px 18px', fontSize: 14, borderRadius: 999 }}
            >
              Book a Call
              <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
                <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </Magnetic>

          {/* Hamburger */}
          <button
            onClick={() => setOpen(o => !o)}
            aria-label="menu"
            className="show-mobile"
            style={{
              display: 'none',
              flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 5,
              width: 36, height: 36, padding: 0,
              background: 'transparent', border: 'none', cursor: 'pointer',
              borderRadius: 99,
            }}
          >
            {[0,1,2].map(i => (
              <span
                key={i}
                style={{
                  width: 18, height: 1.8, background: '#1A0F0A', borderRadius: 99, display: 'block',
                  transition: '0.32s cubic-bezier(0.22,1,0.36,1)',
                  transform: i===0 && open ? 'rotate(45deg) translate(4px,5px)' : i===2 && open ? 'rotate(-45deg) translate(4px,-5px)' : 'none',
                  opacity: i===1 && open ? 0 : 1,
                }}
              />
            ))}
          </button>
        </div>
      </motion.div>

      {/* ── Mobile drawer (full screen) ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.2 } }}
            transition={{ duration: 0.25 }}
            style={{
              pointerEvents: 'auto',
              position: 'fixed', inset: 0, top: 92,
              zIndex: 99,
              background: 'rgba(245,239,232,0.97)',
              backdropFilter: 'blur(18px)',
              padding: '24px 24px 40px',
              display: 'flex', flexDirection: 'column', gap: 4,
            }}
          >
            {links.map((l, i) => (
              <motion.a
                key={l.label}
                href={l.href}
                onClick={() => setOpen(false)}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.04 + i * 0.04, duration: 0.4, ease: [0.22,1,0.36,1] }}
                style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  padding: '18px 4px',
                  fontFamily: "'Instrument Serif', serif",
                  fontSize: 32, fontWeight: 400, letterSpacing: -0.4,
                  color: '#1A0F0A',
                  textDecoration: 'none',
                  borderBottom: '1px solid rgba(194,98,45,0.08)',
                }}
              >
                {l.label}
                <svg width="22" height="22" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="#C2622D" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </motion.a>
            ))}
            <motion.a
              href="https://cal.com/chandan-kumar-zhrofj/30min"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.4 }}
              className="btn btn-primary"
              style={{ marginTop: 22, padding: '16px 22px', fontSize: 16, justifyContent: 'center' }}
            >
              Book a Free Consultation
              <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
                <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
