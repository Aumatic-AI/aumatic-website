import { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'

const FAQS = [
  {
    q: 'What tools and platforms do you build automations on?',
    a: 'We work across the full automation stack — Make.com, Zapier, n8n, and custom API builds. For AI, we use OpenAI (GPT-4o), Anthropic Claude, and custom fine-tuned models. We integrate with 100+ platforms including HubSpot, Salesforce, Notion, Slack, Airtable, Shopify, Stripe, Gmail, and virtually any tool with an API.',
  },
  {
    q: 'How long does it take to build and launch automations?',
    a: 'Most projects launch within 1–2 weeks. After our discovery call, we deliver a full automation blueprint within 48 hours. The build phase typically takes 5–10 business days depending on complexity, followed by a 2-day testing and QA phase before going live.',
  },
  {
    q: 'Do I need technical knowledge to work with you?',
    a: 'Zero technical knowledge required. We handle everything — architecture, building, testing, and deployment. We also provide a detailed video walkthrough and documentation so you understand exactly how your automations work and can make basic edits yourself if needed.',
  },
  {
    q: 'What happens after we go live?',
    a: 'Every package includes post-launch support (14–30 days depending on the plan). During this period, we monitor your automations, fix any issues, and optimize performance at no extra cost. For long-term peace of mind, we offer ongoing maintenance retainers.',
  },
  {
    q: 'How do you handle data privacy and compliance?',
    a: 'Customer data stays in your systems by default. We use scoped service accounts, environment-isolated secrets, and audit logs for every automation. Where regulated data is involved (GDPR, HIPAA, SOC2 stacks), we adapt the architecture before any code is written.',
  },
  {
    q: 'How do you guarantee results?',
    a: "We offer a 30-day results guarantee. If your automations aren't demonstrably saving you time and working as intended within 30 days of launch, we'll rebuild and optimize them for free — no questions asked. We've never had to invoke this for a client.",
  },
  {
    q: 'Can you automate workflows that involve AI and machine learning?',
    a: "Absolutely — that's one of our core specialties. We build workflows that incorporate LLMs for tasks like email classification, lead scoring, content generation, data extraction, sentiment analysis, and conversational AI agents. We select the right model for each use case.",
  },
]

function Item({ f, isOpen, onToggle, i }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: i * 0.04 }}
      style={{
        borderTop: i === 0 ? '1px solid var(--hair-warm)' : 'none',
        borderBottom: '1px solid var(--hair-warm)',
      }}
    >
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        style={{
          width: '100%',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '24px 4px',
          background: 'transparent',
          border: 'none', cursor: 'pointer',
          textAlign: 'left',
          fontFamily: 'inherit',
          gap: 24,
        }}
      >
        <span style={{
          fontFamily: "'Instrument Serif', serif",
          fontSize: 'clamp(20px,2.1vw,25px)',
          fontWeight: 400,
          letterSpacing: '-0.02em',
          lineHeight: 1.25,
          color: isOpen ? '#C2622D' : '#1A0F0A',
          transition: 'color 0.4s',
        }}>
          {f.q}
        </span>
        <span style={{
          flexShrink: 0,
          width: 38, height: 38,
          borderRadius: 99,
          border: '1px solid var(--hair-warm)',
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          background: isOpen ? 'linear-gradient(135deg,#C2622D,#A8501F)' : 'transparent',
          color: isOpen ? '#FFF' : '#5C3D2A',
          transition: 'background 0.4s, color 0.4s, border-color 0.4s',
        }}>
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <line x1="3" y1="8" x2="13" y2="8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            <line x1="8" y1="3" x2="8" y2="13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"
              style={{ transformOrigin: '8px 8px', transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)', transition: 'transform 0.4s var(--ease-out)' }}
            />
          </svg>
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <div style={{ paddingBottom: 28, paddingRight: 56 }}>
              <p style={{ fontSize: 16, color: '#5C3D2A', lineHeight: 1.75, maxWidth: 680 }}>{f.a}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function FAQ() {
  const [open, setOpen] = useState(0)
  const headRef = useRef(null)
  const inView = useInView(headRef, { once: true })

  return (
    <section
      id="faq"
      style={{
        position: 'relative',
        padding: 'clamp(96px,11vw,160px) 0',
        background: 'var(--bg)',
        borderTop: '1px solid var(--hair)',
      }}
    >
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: 'clamp(40px,6vw,96px)', alignItems: 'start' }} className="faq-grid">
          <motion.div
            ref={headRef}
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22,1,0.36,1] }}
            style={{ position: 'sticky', top: 120 }}
            className="faq-sticky"
          >
            <span className="eyebrow">FAQ</span>
            <h2 style={{
              fontFamily: "'Instrument Serif', serif",
              fontSize: 'clamp(40px,5.2vw,64px)',
              fontWeight: 400, letterSpacing: '-0.03em', lineHeight: 1,
              color: '#1A0F0A', marginTop: 16,
            }}>
              Questions,<br/><em style={{ color: '#C2622D' }}>answered.</em>
            </h2>
            <p style={{ fontSize: 16, color: '#5C3D2A', lineHeight: 1.65, maxWidth: 360, marginTop: 22 }}>
              If your question isn't here, drop us a message — we usually respond within a few hours.
            </p>
            <a href="https://cal.com/chandan-kumar-zhrofj/30min" target="_blank" rel="noopener noreferrer" className="btn btn-ghost" style={{ marginTop: 22, padding: '11px 20px', fontSize: 14 }}>
              Talk to us
              <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
                <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </motion.div>

          <div>
            {FAQS.map((f, i) => (
              <Item
                key={i}
                f={f}
                i={i}
                isOpen={open === i}
                onToggle={() => setOpen(open === i ? -1 : i)}
              />
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .faq-grid { grid-template-columns: 1fr !important; }
          .faq-sticky { position: relative !important; top: auto !important; }
        }
      `}</style>
    </section>
  )
}
