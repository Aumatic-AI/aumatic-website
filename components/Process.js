import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'

const STEPS = [
  {
    num: '01',
    title: 'Deep Analysis',
    desc: 'We map every workflow, interview your team, and uncover where AI creates the biggest impact on your bottom line.',
    tags: ['Workflow mapping', 'Opportunity scoring', 'ROI projections', 'Feasibility'],
  },
  {
    num: '02',
    title: 'Architecture & Design',
    desc: 'We architect the perfect automation stack — integrating your existing tools while adding intelligent layers on top.',
    tags: ['System design', 'Integration planning', 'Data flow', 'Tool selection'],
  },
  {
    num: '03',
    title: 'Build & Deploy',
    desc: 'Our engineers build, test, and deploy your custom automations with rigorous QA and real-time monitoring.',
    tags: ['Custom AI agents', 'API integrations', 'Pipelines', 'Quality assurance'],
  },
  {
    num: '04',
    title: 'Train & Optimize',
    desc: 'We train your team, set up dashboards, and continuously optimize for peak performance month over month.',
    tags: ['Team workshops', 'Dashboards', 'Ongoing tuning', 'Dedicated support'],
  },
]

function Step({ step, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.8,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      style={{
        position: 'relative',
        display: 'grid',
        gridTemplateColumns: '110px minmax(0, 1fr)',
        gap: 'clamp(24px, 4vw, 64px)',
        padding: 'clamp(36px, 5vw, 64px) 0',
        borderTop: '1px solid var(--hair)',
      }}
      className="process-step"
    >
      {/* Number */}
      <div>
        <span
          style={{
            fontFamily: "'Onest', sans-serif",
            fontSize: 'clamp(52px, 6vw, 82px)',
            fontWeight: 800,
            lineHeight: 0.8,
            letterSpacing: '-0.07em',
            color: '#FF8500',
          }}
        >
          {step.num}
        </span>
      </div>

      {/* Content */}
      <div>
        <div
          style={{
            display: 'flex',
            alignItems: 'baseline',
            justifyContent: 'space-between',
            gap: 30,
            marginBottom: 22,
          }}
        >
          <h3
            style={{
              margin: 0,
              fontFamily: "'Onest', sans-serif",
              fontSize: 'clamp(28px, 3.2vw, 46px)',
              fontWeight: 800,
              lineHeight: 0.98,
              letterSpacing: '-0.045em',
              color: '#0D0D0D',
            }}
          >
            {step.title}
          </h3>

          <span
            className="process-arrow"
            style={{
              fontSize: 22,
              color: '#FF8500',
              flexShrink: 0,
              transition: 'transform 0.4s ease',
            }}
          >
            ↗
          </span>
        </div>

        <p
          style={{
            maxWidth: 620,
            margin: 0,
            fontFamily: "'Inter', sans-serif",
            fontSize: 'clamp(15px, 1.2vw, 17px)',
            lineHeight: 1.7,
            color: '#5C3D2A',
          }}
        >
          {step.desc}
        </p>

        {/* Tags */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 8,
            marginTop: 28,
          }}
        >
          {step.tags.map(tag => (
            <span
              key={tag}
              style={{
                padding: '7px 12px',
                border: '1px solid rgba(13,13,13,0.12)',
                borderRadius: 999,
                fontFamily: "'Inter', sans-serif",
                fontSize: 11,
                fontWeight: 500,
                letterSpacing: '0.02em',
                color: '#5C3D2A',
                background: 'transparent',
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  )
}

export default function Process() {
  const sectionRef = useRef(null)
  const headRef = useRef(null)

  const headInView = useInView(headRef, {
    once: true,
    margin: '-100px',
  })

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 75%', 'end 25%'],
  })

  const lineScale = useTransform(
    scrollYProgress,
    [0, 1],
    [0, 1]
  )

  return (
    <section
      id="process"
      ref={sectionRef}
      style={{
        position: 'relative',
        padding: 'clamp(110px, 13vw, 190px) 0',
        background: '#FFFFFF',
        borderTop: '1px solid var(--hair)',
        overflow: 'hidden',
      }}
    >
      <div className="container">

        {/* ───────────────── HEADER ───────────────── */}

        <motion.div
          ref={headRef}
          initial={{ opacity: 0, y: 30 }}
          animate={headInView ? { opacity: 1, y: 0 } : {}}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1.5fr) minmax(240px, 0.7fr)',
            gap: 'clamp(40px, 8vw, 140px)',
            alignItems: 'end',
            marginBottom: 'clamp(80px, 10vw, 140px)',
          }}
          className="process-header"
        >
          <div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                marginBottom: 24,
                fontFamily: "'Inter', sans-serif",
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: '#FF8500',
              }}
            >
              <span
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: '50%',
                  background: '#FF8500',
                }}
              />
              Our Process
            </div>

            <h2
              style={{
                margin: 0,
                maxWidth: 850,
                fontFamily: "'Onest', sans-serif",
                fontSize: 'clamp(48px, 7vw, 100px)',
                fontWeight: 800,
                lineHeight: 0.9,
                letterSpacing: '-0.075em',
                color: '#0D0D0D',
              }}
            >
              From workflow
              <br />
              to <em style={{ color: '#FF8500' }}>intelligence.</em>
            </h2>
          </div>

          <p
            style={{
              margin: 0,
              maxWidth: 360,
              fontFamily: "'Inter', sans-serif",
              fontSize: 16,
              lineHeight: 1.7,
              color: '#5C3D2A',
            }}
          >
            Four phases. Measurable outcomes. From the
            first audit to long-term optimization.
          </p>
        </motion.div>


        {/* ───────────────── PROCESS LIST ───────────────── */}

        <div
          style={{
            position: 'relative',
            maxWidth: 1100,
            margin: '0 auto',
          }}
        >

          {/* Progress line */}
          <div
            className="process-line"
            style={{
              position: 'absolute',
              left: 54,
              top: 0,
              bottom: 0,
              width: 1,
              background: 'rgba(13,13,13,0.10)',
              pointerEvents: 'none',
            }}
          >
            <motion.div
              style={{
                position: 'absolute',
                inset: 0,
                background: '#FF8500',
                transformOrigin: 'top',
                scaleY: lineScale,
              }}
            />
          </div>

          {STEPS.map((step, index) => (
            <Step
              key={step.num}
              step={step}
              index={index}
            />
          ))}

        </div>


        {/* ───────────────── FOOTER STATEMENT ───────────────── */}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 30,
            marginTop: 'clamp(60px, 8vw, 100px)',
            paddingTop: 28,
            borderTop: '1px solid var(--hair)',
          }}
          className="process-footer"
        >
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: '0.1em',
              color: '#0D0D0D',
            }}
          >
            ANALYSIS → ARCHITECTURE → DEPLOYMENT → OPTIMIZATION
          </span>

          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 11,
              letterSpacing: '0.08em',
              color: '#5C3D2A',
            }}
          >
            BUILT TO COMPOUND
          </span>
        </motion.div>
      </div>

      {/* ───────────────── RESPONSIVE ───────────────── */}

      <style>{`
        .process-step {
          transition: padding-left 0.4s ease;
        }

        .process-step:hover {
          padding-left: 14px;
        }

        .process-step:hover .process-arrow {
          transform: translate(4px, -4px);
        }

        @media (max-width: 800px) {
          .process-header {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
          }

          .process-line {
            display: none;
          }

          .process-step {
            grid-template-columns: 70px minmax(0, 1fr) !important;
            gap: 20px !important;
          }
        }

        @media (max-width: 600px) {
          .process-step {
            grid-template-columns: 1fr !important;
            gap: 22px !important;
            padding: 40px 0 !important;
          }

          .process-step:hover {
            padding-left: 0 !important;
          }

          .process-footer {
            flex-direction: column;
            align-items: flex-start !important;
          }
        }
      `}</style>
    </section>
  )
}