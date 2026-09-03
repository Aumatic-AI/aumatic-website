import { useState, useRef } from 'react'
import {
  motion,
  AnimatePresence,
  useInView,
} from 'framer-motion'

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
      initial={{
        opacity: 0,
        y: 12,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        margin: '-40px',
      }}
      transition={{
        duration: 0.5,
        delay: i * 0.04,
      }}
      style={{
        borderTop:
          i === 0
            ? '1px solid var(--hair)'
            : 'none',
        borderBottom:
          '1px solid var(--hair)',
      }}
    >
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        className="faq-question"
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '22px 0',
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          textAlign: 'left',
          fontFamily: 'inherit',
          gap: 30,
        }}
      >

        {/* Question */}

        <span
          style={{
            fontFamily: "'Onest', sans-serif",
            fontSize:
              'clamp(18px, 1.8vw, 23px)',
            fontWeight: 700,
            letterSpacing: '-0.04em',
            lineHeight: 1.2,
            color: isOpen
              ? '#FF8500'
              : '#0D0D0D',
            transition:
              'color 0.3s ease',
          }}
        >
          {f.q}
        </span>


        {/* Minimal plus */}

        <span
          className="faq-icon"
          style={{
            position: 'relative',
            flexShrink: 0,
            width: 28,
            height: 28,
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: isOpen
              ? '#FF8500'
              : '#0D0D0D',
            transition:
              'color 0.3s ease',
          }}
        >

          <span
            style={{
              position: 'absolute',
              width: 14,
              height: 1,
              background: 'currentColor',
            }}
          />

          <span
            style={{
              position: 'absolute',
              width: 14,
              height: 1,
              background: 'currentColor',
              transform:
                isOpen
                  ? 'rotate(90deg)'
                  : 'rotate(0deg)',
              transition:
                'transform 0.35s cubic-bezier(0.22,1,0.36,1)',
            }}
          />

        </span>

      </button>


      {/* Answer */}

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{
              height: 0,
              opacity: 0,
            }}
            animate={{
              height: 'auto',
              opacity: 1,
            }}
            exit={{
              height: 0,
              opacity: 0,
            }}
            transition={{
              duration: 0.45,
              ease: [
                0.22,
                1,
                0.36,
                1,
              ],
            }}
            style={{
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                padding:
                  '0 50px 25px 0',
              }}
            >
              <p
                style={{
                  margin: 0,
                  maxWidth: 680,
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 14,
                  color: '#6E6863',
                  lineHeight: 1.7,
                }}
              >
                {f.a}
              </p>
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

  const inView = useInView(headRef, {
    once: true,
    margin: '-70px',
  })


  return (
    <section
      id="faq"
      style={{
        position: 'relative',
        padding:
          'clamp(90px, 11vw, 150px) 0',
        background: '#FFFFFF',
        borderTop:
          '1px solid var(--hair)',
      }}
    >

      <div className="container">

        <div
          className="faq-grid"
          style={{
            display: 'grid',
            gridTemplateColumns:
              '0.8fr 1.4fr',
            gap:
              'clamp(50px, 9vw, 140px)',
            alignItems: 'start',
          }}
        >

          {/* ───────────────── LEFT ───────────────── */}

          <motion.div
            ref={headRef}
            initial={{
              opacity: 0,
              y: 25,
            }}
            animate={
              inView
                ? {
                    opacity: 1,
                    y: 0,
                  }
                : {}
            }
            transition={{
              duration: 0.8,
              ease: [
                0.22,
                1,
                0.36,
                1,
              ],
            }}
            className="faq-heading"
            style={{
              position: 'sticky',
              top: 100,
            }}
          >

            {/* Eyebrow */}

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 9,
                marginBottom: 22,
              }}
            >
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: '50%',
                  background: '#FF8500',
                }}
              />

              <span
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 9,
                  fontWeight: 700,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: '#FF8500',
                }}
              >
                FAQ
              </span>
            </div>


            {/* Heading */}

            <h2
              style={{
                margin: 0,
                fontFamily: "'Onest', sans-serif",
                fontSize:
                  'clamp(50px, 6vw, 82px)',
                fontWeight: 800,
                letterSpacing: '-0.075em',
                lineHeight: 0.87,
                color: '#0D0D0D',
              }}
            >
              Questions,
              <br />

              <span
                style={{
                  color: '#FF8500',
                }}
              >
                answered.
              </span>
            </h2>


            {/* Description */}

            <p
              style={{
                margin:
                  'clamp(25px, 3vw, 36px) 0 0',
                maxWidth: 340,
                fontFamily: "'Inter', sans-serif",
                fontSize: 14,
                lineHeight: 1.7,
                color: '#77716D',
              }}
            >
              If your question isn't here,
              drop us a message. We usually
              respond within a few hours.
            </p>


            {/* Simple CTA */}

            <a
              href="https://cal.com/chandan-kumar-zhrofj/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="faq-cta"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 9,
                marginTop: 22,
                paddingBottom: 7,
                borderBottom:
                  '1px solid #0D0D0D',
                fontFamily: "'Inter', sans-serif",
                fontSize: 13,
                fontWeight: 700,
                color: '#0D0D0D',
                textDecoration: 'none',
              }}
            >
              Talk to us

              <span
                className="faq-cta-arrow"
                style={{
                  fontSize: 16,
                  lineHeight: 1,
                  transition:
                    'transform 0.3s ease',
                }}
              >
                ↗
              </span>
            </a>

          </motion.div>


          {/* ───────────────── QUESTIONS ───────────────── */}

          <div
            style={{
              width: '100%',
            }}
          >
            {FAQS.map((f, i) => (
              <Item
                key={i}
                f={f}
                i={i}
                isOpen={open === i}
                onToggle={() =>
                  setOpen(
                    open === i
                      ? -1
                      : i
                  )
                }
              />
            ))}
          </div>

        </div>

      </div>


      {/* ───────────────── RESPONSIVE ───────────────── */}

      <style>{`

        .faq-question:hover span {
          color: #FF8500 !important;
        }

        .faq-question:hover .faq-icon {
          color: #FF8500 !important;
        }

        .faq-cta:hover {
          color: #FF8500 !important;
          border-color: #FF8500 !important;
        }

        .faq-cta:hover .faq-cta-arrow {
          transform: translate(3px, -3px);
        }


        @media (max-width: 900px) {

          .faq-grid {
            grid-template-columns: 1fr !important;
            gap: 55px !important;
          }

          .faq-heading {
            position: relative !important;
            top: auto !important;
          }

        }


        @media (max-width: 600px) {

          .faq-question {
            padding: 19px 0 !important;
            gap: 15px !important;
          }

          .faq-question > span:first-child {
            font-size: 17px !important;
          }

          .faq-icon {
            width: 24px !important;
            height: 24px !important;
          }

          .faq-question + div p {
            font-size: 13px !important;
          }

        }

      `}</style>
    </section>
  )
}