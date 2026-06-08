import { motion } from 'framer-motion'

const TOOLS = [
  { name: 'OpenAI',     style: { fontWeight: 700, letterSpacing: -0.5 } },
  { name: 'Claude',     style: { fontFamily: "'Instrument Serif', serif", fontWeight: 400, fontSize: 26 } },
  { name: 'n8n',        style: { fontWeight: 800, letterSpacing: -1 } },
  { name: 'Make',       style: { fontWeight: 700, letterSpacing: -0.4 } },
  { name: 'Zapier',     style: { fontWeight: 700, letterSpacing: -0.3 } },
  { name: 'HubSpot',    style: { fontWeight: 700 } },
  { name: 'Salesforce', style: { fontWeight: 700, fontStyle: 'italic' } },
  { name: 'Notion',     style: { fontWeight: 800, letterSpacing: -0.5 } },
  { name: 'Slack',      style: { fontWeight: 800 } },
  { name: 'Airtable',   style: { fontWeight: 700, letterSpacing: -0.2 } },
  { name: 'WhatsApp',   style: { fontWeight: 700, letterSpacing: -0.2 } },
  { name: 'Perplexity', style: { fontFamily: "'Instrument Serif', serif", fontWeight: 400, fontSize: 26 } },
  { name: 'Google',     style: { fontWeight: 600, letterSpacing: -0.3 } },
  { name: 'WordPress',  style: { fontWeight: 700 } },
  { name: 'Meta',       style: { fontWeight: 800, letterSpacing: -0.5 } },
]

const Dot = () => (
  <span aria-hidden="true" style={{ width: 4, height: 4, borderRadius: 99, background: 'rgba(194,98,45,0.32)', flexShrink: 0 }} />
)

function Row() {
  return (
    <>
      {TOOLS.map((t, i) => (
        <span key={`${t.name}-${i}`} style={{ display: 'inline-flex', alignItems: 'center', gap: 'clamp(36px,5vw,68px)' }}>
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 22,
              color: '#8A6A5A',
              whiteSpace: 'nowrap',
              opacity: 0.6,
              transition: 'opacity 0.35s, color 0.35s, transform 0.35s',
              cursor: 'default',
              ...t.style,
            }}
            onMouseEnter={e => { e.currentTarget.style.opacity = 1; e.currentTarget.style.color = '#C2622D'; e.currentTarget.style.transform = 'translateY(-2px)' }}
            onMouseLeave={e => { e.currentTarget.style.opacity = 0.6; e.currentTarget.style.color = '#8A6A5A'; e.currentTarget.style.transform = 'translateY(0)' }}
          >
            {t.name}
          </span>
          <Dot />
        </span>
      ))}
    </>
  )
}

export default function LogoBar() {
  return (
    <section
      style={{
        position: 'relative',
        padding: 'clamp(40px,5vw,64px) 0',
        background: 'var(--bg)',
        borderTop: '1px solid var(--hair)',
        borderBottom: '1px solid var(--hair)',
        overflow: 'hidden',
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.7 }}
        style={{
          maxWidth: 'var(--container)', margin: '0 auto 28px',
          padding: '0 clamp(20px,3vw,40px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14,
        }}
      >
        <span style={{ height: 1, flex: 1, maxWidth: 110, background: 'linear-gradient(90deg, transparent, var(--hair-strong))' }} />
        <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: 2.4, textTransform: 'uppercase', color: '#8A6A5A' }}>
          Tools we ship with daily
        </span>
        <span style={{ height: 1, flex: 1, maxWidth: 110, background: 'linear-gradient(90deg, var(--hair-strong), transparent)' }} />
      </motion.div>

      <div className="marquee" style={{ paddingBlock: 12 }}>
        <div className="marquee-track" style={{ alignItems: 'center', gap: 'clamp(36px,5vw,68px)' }}>
          <Row />
          <Row />
        </div>
      </div>
    </section>
  )
}
