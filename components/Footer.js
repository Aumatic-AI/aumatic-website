import { motion } from 'framer-motion'

const COLS = [
  { title: 'Capabilities', links: ['AI & ML', 'Automation', 'CRM & Ops', 'Engineering', 'Data'] },
  { title: 'Company',      links: ['Process', 'Why Us', 'Case Studies', 'Impact', 'FAQ']        },
  { title: 'Connect',      links: ['Book a Call', 'WhatsApp', 'Email', 'LinkedIn', 'Twitter']   },
]

const SOCIALS = [
  { l: 'X',  href: '#' },
  { l: 'in', href: '#' },
  { l: '▶',  href: '#' },
]

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer style={{ background: 'linear-gradient(180deg, #1A0F0A 0%, #0D0805 100%)', borderTop: '1px solid rgba(194,98,45,0.2)', position: 'relative', overflow: 'hidden' }}>
      {/* Faint accent orb */}
      <div style={{ position: 'absolute', top: -160, right: -160, width: 460, height: 460, borderRadius: '50%', background: 'radial-gradient(circle, rgba(194,98,45,0.12), transparent 70%)', pointerEvents: 'none' }} />

      <div className="container" style={{ position: 'relative', padding: 'clamp(56px,6vw,80px) clamp(20px,3vw,40px) 36px' }}>

        {/* Big serif call to action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.9, ease: [0.22,1,0.36,1] }}
          style={{ marginBottom: 64, maxWidth: 820 }}
        >
          <h2 style={{
            fontFamily: "'Instrument Serif', serif",
            fontSize: 'clamp(40px,6vw,84px)',
            fontWeight: 400, letterSpacing: '-0.03em', lineHeight: 0.98,
            color: '#F5EFE8', marginBottom: 24,
          }}>
            Ready when<br/>
            <em style={{ color: '#E8A060' }}>you are.</em>
          </h2>
          <a href="https://cal.com/chandan-kumar-zhrofj/30min" target="_blank" rel="noopener noreferrer"
            className="btn btn-primary"
            style={{ padding: '15px 26px', fontSize: 15 }}
          >
            Book a free strategy call
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </motion.div>

        {/* Columns */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.8fr 1fr 1fr 1fr', gap: 'clamp(28px,4vw,56px)', marginBottom: 56 }} className="footer-cols">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 18 }}>
              <img src="/aumatic_img.png" width="30" height="30" alt="Aumatic.AI" style={{ display: 'block', objectFit: 'contain', filter: 'brightness(1.2)' }}/>
              <span style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 18, fontWeight: 900, color: '#F5EFE8', letterSpacing: -0.4 }}>
                Aumatic.<span style={{ color: '#E8A060' }}>AI</span>
              </span>
            </div>
            <p style={{ fontSize: 14, color: 'rgba(245,239,232,0.45)', lineHeight: 1.7, maxWidth: 280, marginBottom: 24 }}>
              We build and deploy intelligent automation for forward-thinking businesses. Save hundreds of hours every month.
            </p>
            <div style={{ display: 'flex', gap: 8 }}>
              {SOCIALS.map((s, i) => (
                <a key={i} href={s.href}
                  style={{
                    width: 36, height: 36, borderRadius: 10,
                    background: 'rgba(245,239,232,0.04)',
                    border: '1px solid rgba(245,239,232,0.08)',
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 12, fontWeight: 700,
                    color: 'rgba(245,239,232,0.55)', textDecoration: 'none',
                    transition: 'all 0.3s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.color = '#E8A060'; e.currentTarget.style.borderColor = 'rgba(232,160,96,0.5)'; e.currentTarget.style.background = 'rgba(194,98,45,0.10)' }}
                  onMouseLeave={e => { e.currentTarget.style.color = 'rgba(245,239,232,0.55)'; e.currentTarget.style.borderColor = 'rgba(245,239,232,0.08)'; e.currentTarget.style.background = 'rgba(245,239,232,0.04)' }}
                >{s.l}</a>
              ))}
            </div>
          </div>

          {COLS.map(col => (
            <div key={col.title}>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#E8A060', letterSpacing: 2.4, textTransform: 'uppercase', marginBottom: 18 }}>{col.title}</div>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10, padding: 0, margin: 0 }}>
                {col.links.map(l => (
                  <li key={l}>
                    <a href="#" style={{ fontSize: 14, color: 'rgba(245,239,232,0.5)', textDecoration: 'none', transition: 'color 0.3s' }}
                      onMouseEnter={e => e.target.style.color = '#F5EFE8'}
                      onMouseLeave={e => e.target.style.color = 'rgba(245,239,232,0.5)'}
                    >{l}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Big wordmark — decorative */}
        <div style={{
          fontFamily: "'Instrument Serif', serif",
          fontSize: 'clamp(80px,16vw,220px)',
          fontWeight: 400,
          letterSpacing: '-0.05em',
          lineHeight: 0.85,
          background: 'linear-gradient(180deg, rgba(232,160,96,0.16), rgba(232,160,96,0.02))',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          textAlign: 'center',
          marginBottom: 36,
          userSelect: 'none',
          pointerEvents: 'none',
        }}>
          Aumatic.AI
        </div>

        {/* Bottom bar */}
        <div style={{ borderTop: '1px solid rgba(194,98,45,0.12)', paddingTop: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 14 }}>
          <span style={{ fontSize: 13, color: 'rgba(245,239,232,0.3)' }}>© {year} Aumatic.AI · All rights reserved</span>
          <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
            {['Privacy', 'Terms', 'Cookies'].map(l => (
              <a key={l} href="#" style={{ fontSize: 13, color: 'rgba(245,239,232,0.3)', textDecoration: 'none', transition: 'color 0.3s' }}
                onMouseEnter={e => e.target.style.color = '#E8A060'}
                onMouseLeave={e => e.target.style.color = 'rgba(245,239,232,0.3)'}
              >{l}</a>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) { .footer-cols { grid-template-columns: 1fr 1fr !important; } }
        @media (max-width: 560px) { .footer-cols { grid-template-columns: 1fr !important; } }
      `}</style>
    </footer>
  )
}
