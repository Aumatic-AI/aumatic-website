import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const REASONS = [
  {
    num: '01',
    title: 'Full-stack AI expertise',
    desc: 'We handle the entire automation lifecycle — strategy, architecture, build, deployment, optimization. One team. One throat to choke.',
  },
  {
    num: '02',
    title: 'Outcome guarantee',
    desc: 'Every engagement comes with measurable KPIs. If we miss the target, we keep working until we hit it.',
  },
  {
    num: '03',
    title: 'Tool-agnostic by design',
    desc: "We're not locked into vendors. We choose the right tech for your problem — not the one paying us a referral fee.",
  },
  {
    num: '04',
    title: 'Consultative partnership',
    desc: "We embed with your team, learn your culture, and surface opportunities you didn't know existed.",
  },
]

function ReasonCard({ reason, index }) {
  const ref = useRef(null)

  const inView = useInView(ref, {
    once: true,
    margin: '-60px',
  })

  return (
    <motion.article
      ref={ref}
      initial={{
        opacity: 0,
        y: 24,
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
        duration: 0.65,
        delay: index * 0.07,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="reason-card"
      style={{
        position: 'relative',
        minHeight: 'clamp(220px, 17vw, 270px)',
        padding: 'clamp(22px, 2vw, 30px)',
        background: '#FF8500',
        border: '1px solid rgba(255,255,255,0.18)',
        borderRadius: 14,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        overflow: 'hidden',
        transition:
          'transform 0.45s cubic-bezier(0.22,1,0.36,1), box-shadow 0.45s ease',
      }}
    >
      {/* Top
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
        }}
      >
        <span
          style={{
            fontFamily: "'Onest', sans-serif",
            fontSize: 'clamp(28px, 3vw, 40px)',
            fontWeight: 800,
            lineHeight: 0.85,
            letterSpacing: '-0.06em',
            color: '#FFFFFF',
          }}
        >
          {reason.num}
        </span>

        <span
          className="reason-arrow"
          style={{
            fontSize: 20,
            lineHeight: 1,
            color: '#FFFFFF',
            opacity: 0.9,
            transition:
              'transform 0.4s cubic-bezier(0.22,1,0.36,1)',
          }}
        >
          ↗
        </span>
      </div> */}

      {/* Content */}
      <div>
        <h3
          style={{
            margin: 0,
            fontFamily: "'Onest', sans-serif",
            fontSize: 'clamp(19px, 1.7vw, 26px)',
            fontWeight: 800,
            lineHeight: 1,
            letterSpacing: '-0.05em',
            color: '#FFFFFF',
          }}
        >
          {reason.title}
        </h3>

        <p
          style={{
            margin: '13px 0 0',
            fontFamily: "'Inter', sans-serif",
            fontSize: 'clamp(12px, 0.85vw, 14px)',
            lineHeight: 1.55,
            color: 'rgba(255,255,255,0.88)',
          }}
        >
          {reason.desc}
        </p>
      </div>

      {/* Bottom line */}
      <div
        style={{
          position: 'absolute',
          left: 'clamp(22px, 2vw, 30px)',
          right: 'clamp(22px, 2vw, 30px)',
          bottom: 0,
          height: 1,
          background: 'rgba(255,255,255,0.22)',
        }}
      />
    </motion.article>
  )
}

export default function WhyUs() {
  const sectionRef = useRef(null)

  const inView = useInView(sectionRef, {
    once: true,
    margin: '-80px',
  })

  return (
    <section
      id="why-us"
      style={{
        position: 'relative',
        padding: 'clamp(100px, 12vw, 160px) 0',
        background: '#FFFFFF',
        borderTop: '1px solid var(--hair)',
        overflow: 'hidden',
      }}
    >
      <div className="container">

        {/* MAIN TWO-COLUMN LAYOUT */}
        <div className="why-layout">

          {/* ───────────────── LEFT ───────────────── */}

          <motion.div
            ref={sectionRef}
            initial={{
              opacity: 0,
              y: 30,
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
              ease: [0.22, 1, 0.36, 1],
            }}
            className="why-copy"
          >
            {/* Eyebrow */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                marginBottom: 24,
              }}
            >
              <span
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: '50%',
                  background: '#FF8500',
                  flexShrink: 0,
                }}
              />

              <span
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: '#FF8500',
                }}
              >
                Why Aumatic
              </span>
            </div>

            {/* Heading */}
            <h2
              style={{
                margin: 0,
                fontFamily: "'Onest', sans-serif",
                fontSize: 'clamp(52px, 6.5vw, 88px)',
                fontWeight: 800,
                lineHeight: 0.88,
                letterSpacing: '-0.075em',
                color: '#0D0D0D',
              }}
            >
              Built different.
              <br />

              <span
                style={{
                  color: '#FF8500',
                }}
              >
                Proven results.
              </span>
            </h2>

            {/* Paragraph */}
            <p
              style={{
                margin: 'clamp(28px, 3vw, 42px) 0 0',
                maxWidth: 430,
                fontFamily: "'Inter', sans-serif",
                fontSize: 'clamp(14px, 1.1vw, 16px)',
                lineHeight: 1.7,
                color: '#5C3D2A',
              }}
            >
              We take a consultative approach so you
              never miss hidden opportunities or fumble
              implementation.
            </p>
          </motion.div>

          {/* ───────────────── RIGHT ───────────────── */}

          <div
            className="why-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 14,
            }}
          >
            {REASONS.map((reason, index) => (
              <ReasonCard
                key={reason.num}
                reason={reason}
                index={index}
              />
            ))}
          </div>

        </div>
      </div>

      {/* ───────────────── RESPONSIVE ───────────────── */}

      <style>{`

        .why-layout {
          display: grid;
          grid-template-columns: minmax(0, 0.9fr) minmax(480px, 1.1fr);
          gap: clamp(50px, 8vw, 130px);
          align-items: center;
        }

        .why-copy {
          max-width: 600px;
        }

        .why-grid {
          width: 100%;
          max-width: 620px;
          margin-left: auto;
        }

        /* Card hover */

        .reason-card:hover {
          transform: translateY(-5px);
          box-shadow:
            0 18px 40px rgba(255, 133, 0, 0.16);
        }

        .reason-card:hover .reason-arrow {
          transform: translate(4px, -4px);
        }


        /* Tablet */

        @media (max-width: 1000px) {

          .why-layout {
            grid-template-columns: 1fr 1fr;
            gap: 40px;
          }

          .why-grid {
            max-width: 100%;
          }

        }


        /* Smaller tablet */

        @media (max-width: 800px) {

          .why-layout {
            grid-template-columns: 1fr;
            gap: 60px;
          }

          .why-copy {
            max-width: 700px;
          }

          .why-grid {
            max-width: 650px;
            margin-left: 0;
          }

        }


        /* Mobile */

        @media (max-width: 600px) {

          .why-layout {
            gap: 45px;
          }

          .why-grid {
            grid-template-columns: 1fr;
            gap: 12px;
          }

          .reason-card {
            min-height: 240px !important;
          }

        }

      `}</style>
    </section>
  )
}