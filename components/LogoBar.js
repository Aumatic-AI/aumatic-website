import { motion } from 'framer-motion'

const TOOLS = [
  { name: 'OpenAI', style: { fontWeight: 700 } },
  { name: 'Claude', style: { fontFamily: "'Instrument Serif', serif", fontWeight: 400 } },
  { name: 'n8n', style: { fontWeight: 800, letterSpacing: '-0.06em' } },
  { name: 'Make', style: { fontWeight: 700 } },
  { name: 'Zapier', style: { fontWeight: 700 } },
  { name: 'HubSpot', style: { fontWeight: 700 } },
  { name: 'Salesforce', style: { fontWeight: 700, fontStyle: 'italic' } },
  { name: 'Notion', style: { fontWeight: 800 } },
  { name: 'Slack', style: { fontWeight: 800 } },
  { name: 'Airtable', style: { fontWeight: 700 } },
  { name: 'WhatsApp', style: { fontWeight: 700 } },
  { name: 'Perplexity', style: { fontFamily: "'Instrument Serif', serif", fontWeight: 400 } },
  { name: 'Google', style: { fontWeight: 600 } },
  { name: 'WordPress', style: { fontWeight: 700 } },
  { name: 'Meta', style: { fontWeight: 800 } },
]

const Dot = () => (
  <span
    aria-hidden="true"
    style={{
      width: 5,
      height: 5,
      borderRadius: '50%',
      background: '#FFFFFF',
      opacity: 0.6,
      flexShrink: 0,
    }}
  />
)

function Row() {
  return (
    <>
      {TOOLS.map((tool, i) => (
        <span
          key={`${tool.name}-${i}`}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 'clamp(28px, 4vw, 54px)',
          }}
        >
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 'clamp(20px, 2vw, 28px)',
              lineHeight: 1,
              letterSpacing: '-0.035em',
              color: '#FFFFFF',
              whiteSpace: 'nowrap',
              opacity: 0.9,
              transition: 'opacity 0.3s, transform 0.3s',
              cursor: 'default',
              ...tool.style,
            }}
            onMouseEnter={e => {
              e.currentTarget.style.opacity = '0.55'
              e.currentTarget.style.transform = 'translateY(-2px)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.opacity = '0.9'
              e.currentTarget.style.transform = 'translateY(0)'
            }}
          >
            {tool.name}
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
        padding: 'clamp(52px, 7vw, 82px) 0',
        background: '#FF8500',
        borderTop: '1px solid rgba(255,255,255,0.22)',
        borderBottom: '1px solid rgba(255,255,255,0.22)',
        overflow: 'hidden',
      }}
    >
      {/* Simple heading */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{
          duration: 0.7,
          ease: [0.22, 1, 0.36, 1],
        }}
        style={{
          maxWidth: 'var(--container)',
          margin: '0 auto',
          padding: '0 clamp(20px, 5vw, 72px)',
          marginBottom: 'clamp(34px, 4vw, 48px)',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            marginBottom: 18,
          }}
        >
          <span
            style={{
              width: 7,
              height: 7,
              borderRadius: '50%',
              background: '#FFFFFF',
            }}
          />

          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: '#FFFFFF',
            }}
          >
            Our Stack
          </span>
        </div>

        <h2
          style={{
            margin: 0,
            maxWidth: 700,
            fontFamily: "'Onest', sans-serif",
            fontSize: 'clamp(38px, 5vw, 68px)',
            fontWeight: 800,
            lineHeight: 0.92,
            letterSpacing: '-0.065em',
            color: '#FFFFFF',
          }}
        >
          The tools behind
          <br />
          <em
            style={{
              fontStyle: 'normal',
              fontFamily: "'Instrument Serif', serif",
              fontWeight: 400,
            }}
          >
            what we build.
          </em>
        </h2>
      </motion.div>

      {/* Marquee */}
      <div
        className="marquee"
        style={{
          padding: '24px 0',
          borderTop: '1px solid rgba(255,255,255,0.25)',
          borderBottom: '1px solid rgba(255,255,255,0.25)',
        }}
      >
        <div
          className="marquee-track"
          style={{
            alignItems: 'center',
            gap: 'clamp(28px, 4vw, 54px)',
          }}
        >
          <Row />
          <Row />
        </div>
      </div>

      <style>{`
        @media (max-width: 600px) {
          .marquee {
            padding: 20px 0 !important;
          }
        }
      `}</style>
    </section>
  )
}