
import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const ROWS = [
  {
    problem: 'Low profit margins',
    solution: 'Displace labor with AI automation',
    outcome: 'Higher margins',
  },
  {
    problem: 'Slow delivery',
    solution: 'Eliminate bottlenecks with smart flows',
    outcome: '2× faster output',
  },
  {
    problem: 'Falling behind competitors',
    solution: 'Deploy AI-powered capabilities',
    outcome: 'Market advantage',
  },
  {
    problem: 'Overworked teams',
    solution: 'Automate repetitive tasks',
    outcome: 'Freed capacity',
  },
  {
    problem: 'Data silos everywhere',
    solution: 'Unify tools and sync data',
    outcome: 'Single source of truth',
  },
  {
    problem: 'Inconsistent quality',
    solution: 'Standardize with automated pipelines',
    outcome: 'Reliable output',
  },
  {
    problem: 'High operational costs',
    solution: 'Replace manual workflows with AI',
    outcome: 'Cost reduction',
  },
  {
    problem: 'Missed follow-ups',
    solution: 'Automated CRM triggers and sequences',
    outcome: 'More closed deals',
  },
]

function CountUp({
  to,
  suffix = '',
  duration = 1.8,
}) {
  const ref = useRef(null)

  const inView = useInView(ref, {
    once: true,
    margin: '-40px',
  })

  const [val, setVal] = useState(0)

  useEffect(() => {
    if (!inView) return

    const start = performance.now()
    let frame

    const tick = (now) => {
      const t = Math.min(
        1,
        (now - start) / (duration * 1000)
      )

      const eased = 1 - Math.pow(1 - t, 3)

      setVal(Math.round(to * eased))

      if (t < 1) {
        frame = requestAnimationFrame(tick)
      }
    }

    frame = requestAnimationFrame(tick)

    return () => {
      if (frame) cancelAnimationFrame(frame)
    }
  }, [inView, to, duration])

  return (
    <span ref={ref}>
      {val.toLocaleString()}
      {suffix}
    </span>
  )
}

const STATS = [
  {
    value: 100,
    suffix: '+',
    label: 'Automations shipped',
  },
  {
    value: 8,
    suffix: 'k+',
    label: 'Hours saved monthly',
  },
  {
    value: 12,
    suffix: '+',
    label: 'Industries served',
  },
  {
    value: 0,
    suffix: '',
    label: 'Vendor lock-in',
    dash: true,
  },
]

function ImpactRow({
  r,
  i,
  active,
  setActive,
}) {
  const ref = useRef(null)

  const inView = useInView(ref, {
    once: true,
    margin: '-40px',
  })

  const isActive = active === i

  return (
    <motion.div
      ref={ref}
      initial={{
        opacity: 0,
        x: -25,
      }}
      animate={
        inView
          ? {
              opacity: 1,
              x: 0,
            }
          : {}
      }
      transition={{
        duration: 0.6,
        delay: i * 0.05,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={`impact-row ${
        isActive ? 'is-active' : ''
      }`}
      onMouseEnter={() => setActive(i)}
      onMouseLeave={() => setActive(null)}
      onFocus={() => setActive(i)}
      onBlur={() => setActive(null)}
      onClick={() =>
        setActive(isActive ? null : i)
      }
      tabIndex={0}
      role="button"
      aria-expanded={isActive}
    >
      {/* NUMBER */}

      <div className="impact-row-number">
        {String(i + 1).padStart(2, '0')}
      </div>

      {/* PROBLEM */}

      <div className="impact-problem">
        <span className="impact-row-label">
          Problem
        </span>

        <span className="impact-problem-text">
          {r.problem}
        </span>
      </div>

      {/* DESKTOP TRANSFORMATION ARROW */}

      <motion.div
        className="impact-transform-arrow"
        animate={{
          x: isActive ? 8 : 0,
          opacity: isActive ? 1 : 0.3,
        }}
        transition={{
          duration: 0.3,
          ease: 'easeOut',
        }}
      >
        →
      </motion.div>

      {/* DESKTOP SOLUTION */}

      <motion.div
        className="impact-solution"
        initial={false}
        animate={{
          x: isActive ? 0 : 30,
          opacity: isActive ? 1 : 0,
        }}
        transition={{
          duration: 0.4,
          delay: isActive ? 0.05 : 0,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <span className="impact-row-label">
          Solution
        </span>

        <span className="impact-solution-text">
          {r.solution}
        </span>
      </motion.div>

      {/* DESKTOP OUTCOME */}

      <motion.div
        className="impact-outcome"
        initial={false}
        animate={{
          x: isActive ? 0 : 45,
          opacity: isActive ? 1 : 0,
        }}
        transition={{
          duration: 0.45,
          delay: isActive ? 0.12 : 0,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <span className="impact-row-label">
          Outcome
        </span>

        <span className="impact-outcome-text">
          {r.outcome}
        </span>
      </motion.div>

      {/* PLUS */}

      <motion.div
        className="impact-row-action"
        animate={{
          rotate: isActive ? 45 : 0,
          scale: isActive ? 0.9 : 1,
        }}
        transition={{
          duration: 0.25,
        }}
      >
        +
      </motion.div>

      {/* ORANGE ACTIVE LINE */}

      <motion.div
        className="impact-row-line"
        initial={false}
        animate={{
          scaleX: isActive ? 1 : 0,
        }}
        transition={{
          duration: 0.5,
          ease: [0.22, 1, 0.36, 1],
        }}
      />

      {/* MOBILE CONTENT */}

      <motion.div
        className="mobile-transformation"
        initial={false}
        animate={{
          height: isActive ? 'auto' : 0,
          opacity: isActive ? 1 : 0,
        }}
        transition={{
          height: {
            duration: 0.45,
            ease: [0.22, 1, 0.36, 1],
          },
          opacity: {
            duration: 0.25,
          },
        }}
      >
        {/* MOBILE SOLUTION */}

        <motion.div
          className="mobile-solution"
          initial={{
            opacity: 0,
            x: 25,
          }}
          animate={
            isActive
              ? {
                  opacity: 1,
                  x: 0,
                }
              : {
                  opacity: 0,
                  x: 25,
                }
          }
          transition={{
            duration: 0.4,
            delay: 0.04,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <span className="impact-row-label">
            Solution
          </span>

          <span className="impact-solution-text">
            {r.solution}
          </span>
        </motion.div>

        {/* MOBILE OUTCOME */}

        <motion.div
          className="mobile-outcome"
          initial={{
            opacity: 0,
            y: 15,
          }}
          animate={
            isActive
              ? {
                  opacity: 1,
                  y: 0,
                }
              : {
                  opacity: 0,
                  y: 15,
                }
          }
          transition={{
            duration: 0.4,
            delay: 0.12,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <div className="mobile-outcome-arrow">
            →
          </div>

          <div>
            <span className="impact-row-label">
              Outcome
            </span>

            <span className="impact-outcome-text">
              {r.outcome}
            </span>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

export default function Impact() {
  const headRef = useRef(null)

  const [active, setActive] = useState(null)

  const inView = useInView(headRef, {
    once: true,
    margin: '-70px',
  })

  return (
    <section
      id="impact"
      style={{
        position: 'relative',
        overflow: 'hidden',
        padding: 'clamp(90px, 11vw, 145px) 0',
        background: '#FFFFFF',
        borderTop: '1px solid var(--hair)',
      }}
    >
      <div className="container">

        {/* HEADER */}

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
            ease: [0.22, 1, 0.36, 1],
          }}
          className="impact-header"
        >
          <div className="impact-header-left">

            <div className="impact-eyebrow">
              <span className="impact-dot" />

              <span>
                Impact
              </span>
            </div>

            <h2>
              We find
              <br />
              constraints,
              <br />

              <span>
                then crush them.
              </span>
            </h2>

            <p className="impact-description">
              Every automation compounds — creating a
              flywheel of profitability and competitive
              edge over time.
            </p>
          </div>

          {/* STATS */}

          <motion.div
            initial={{
              opacity: 0,
              y: 18,
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
              duration: 0.7,
              delay: 0.15,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="impact-stats"
          >
            {STATS.map((s, i) => (
              <div
                key={i}
                className="impact-stat"
              >
                <div className="impact-stat-number">
                  {s.dash ? (
                    '0'
                  ) : (
                    <CountUp
                      to={s.value}
                      suffix={s.suffix}
                    />
                  )}
                </div>

                <div className="impact-stat-label">
                  {s.label}
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* TRANSFORMATION INTRO */}

        <motion.div
          className="impact-intro-row"
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
          }}
          transition={{
            duration: 0.6,
          }}
        >
          <div>
            The transformation
          </div>

          <p>
            Hover over a problem to see how we
            turn constraints into outcomes.
          </p>
        </motion.div>

        {/* IMPACT LIST */}

        <div className="impact-list">
          {ROWS.map((r, i) => (
            <ImpactRow
              key={i}
              r={r}
              i={i}
              active={active}
              setActive={setActive}
            />
          ))}
        </div>

        {/* STYLES */}

        <style>{`

          /* ═══════════════════════════════════════════
             HEADER
          ═══════════════════════════════════════════ */

          .impact-header {
            display: grid;
            grid-template-columns: 1fr 0.8fr;
            gap: clamp(50px, 8vw, 110px);
            align-items: center;
            margin-bottom: clamp(55px, 6vw, 75px);
          }

          .impact-header-left {
            min-width: 0;
          }

          .impact-eyebrow {
            display: flex;
            align-items: center;
            gap: 9px;
            margin-bottom: 22px;
            font-family: 'Inter', sans-serif;
            font-size: 9px;
            font-weight: 700;
            letter-spacing: 0.14em;
            text-transform: uppercase;
            color: #FF8500;
          }

          .impact-dot {
            width: 6px;
            height: 6px;
            flex-shrink: 0;
            border-radius: 50%;
            background: #FF8500;
          }

          .impact-header h2 {
            margin: 0;
            font-family: 'Onest', sans-serif;
            font-size: clamp(50px, 6.5vw, 88px);
            font-weight: 800;
            letter-spacing: -0.075em;
            line-height: 0.87;
            color: #0D0D0D;
          }

          .impact-header h2 span {
            color: #FF8500;
          }

          .impact-description {
            margin: 30px 0 0;
            max-width: 430px;
            font-family: 'Inter', sans-serif;
            font-size: 14px;
            line-height: 1.7;
            color: #77716D;
          }


          /* ═══════════════════════════════════════════
             STATS
          ═══════════════════════════════════════════ */

          .impact-stats {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            border-top: 1px solid #0D0D0D;
            border-left: 1px solid #0D0D0D;
          }

          .impact-stat {
            min-height: 155px;
            padding: clamp(22px, 3vw, 34px);
            border-right: 1px solid #0D0D0D;
            border-bottom: 1px solid #0D0D0D;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            transition:
              background 0.3s ease,
              transform 0.3s ease;
          }

          .impact-stat:hover {
            background: #FFF8F2;
          }

          .impact-stat-number {
            font-family: 'Onest', sans-serif;
            font-size: clamp(38px, 4vw, 58px);
            font-weight: 800;
            letter-spacing: -0.065em;
            line-height: 0.9;
            color: #0D0D0D;
          }

          .impact-stat-label {
            font-family: 'Inter', sans-serif;
            font-size: 9px;
            font-weight: 700;
            letter-spacing: 0.1em;
            line-height: 1.3;
            text-transform: uppercase;
            color: #8A837E;
            max-width: 120px;
          }


          /* ═══════════════════════════════════════════
             INTRO
          ═══════════════════════════════════════════ */

          .impact-intro-row {
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
            gap: 30px;
            margin-bottom: 18px;
          }

          .impact-intro-row > div {
            font-family: 'Inter', sans-serif;
            font-size: 10px;
            font-weight: 700;
            letter-spacing: 0.13em;
            text-transform: uppercase;
            color: #0D0D0D;
          }

          .impact-intro-row p {
            margin: 0;
            max-width: 360px;
            font-family: 'Inter', sans-serif;
            font-size: 11px;
            line-height: 1.55;
            color: #9A938E;
            text-align: right;
          }


          /* ═══════════════════════════════════════════
             IMPACT LIST
          ═══════════════════════════════════════════ */

          .impact-list {
            display: flex;
            flex-direction: column;
            border-top: 1px solid #0D0D0D;
          }


          /* ═══════════════════════════════════════════
             DESKTOP ROW
          ═══════════════════════════════════════════ */

          .impact-row {
            position: relative;
            min-height: 92px;
            display: grid;
            grid-template-columns:
              55px
              minmax(180px, 1fr)
              55px
              minmax(220px, 1.25fr)
              minmax(170px, 0.8fr)
              45px;
            align-items: center;
            gap: 18px;
            padding: 0 24px;
            border-bottom: 1px solid #E4DED9;
            background: #FFFFFF;
            cursor: pointer;
            outline: none;
            transition:
              background 0.35s ease,
              transform 0.4s cubic-bezier(.22,1,.36,1),
              border-color 0.35s ease;
          }

          .impact-row:hover,
          .impact-row.is-active,
          .impact-row:focus-visible {
            background: #FFFCF9;
            border-bottom-color: #0D0D0D;
            transform: translateX(14px);
          }


          /* ═══════════════════════════════════════════
             NUMBER
          ═══════════════════════════════════════════ */

          .impact-row-number {
            align-self: start;
            padding-top: 25px;
            font-family: 'Inter', sans-serif;
            font-size: 9px;
            font-weight: 700;
            letter-spacing: 0.08em;
            color: #B4ADA7;
          }


          /* ═══════════════════════════════════════════
             LABEL
          ═══════════════════════════════════════════ */

          .impact-row-label {
            display: block;
            margin-bottom: 8px;
            font-family: 'Inter', sans-serif;
            font-size: 8px;
            font-weight: 700;
            letter-spacing: 0.13em;
            line-height: 1;
            text-transform: uppercase;
            color: #A39C96;
          }


          /* ═══════════════════════════════════════════
             PROBLEM
          ═══════════════════════════════════════════ */

          .impact-problem {
            min-width: 0;
          }

          .impact-problem-text {
            display: block;
            font-family: 'Onest', sans-serif;
            font-size: clamp(17px, 1.5vw, 21px);
            font-weight: 700;
            letter-spacing: -0.035em;
            line-height: 1.15;
            color: #0D0D0D;
            transition: transform 0.35s ease;
          }

          .impact-row:hover .impact-problem-text,
          .impact-row.is-active .impact-problem-text {
            transform: translateX(8px);
          }


          /* ═══════════════════════════════════════════
             DESKTOP ARROW
          ═══════════════════════════════════════════ */

          .impact-transform-arrow {
            font-family: 'Inter', sans-serif;
            font-size: 20px;
            font-weight: 300;
            color: #FF8500;
          }


          /* ═══════════════════════════════════════════
             DESKTOP SOLUTION
          ═══════════════════════════════════════════ */

          .impact-solution {
            min-width: 0;
          }

          .impact-solution-text {
            display: block;
            font-family: 'Inter', sans-serif;
            font-size: 13px;
            font-weight: 500;
            line-height: 1.4;
            color: #0D0D0D;
          }


          /* ═══════════════════════════════════════════
             DESKTOP OUTCOME
          ═══════════════════════════════════════════ */

          .impact-outcome {
            min-width: 0;
            padding-left: 22px;
            border-left: 1px solid #E0D9D4;
          }

          .impact-outcome .impact-row-label {
            color: #FF8500;
          }

          .impact-outcome-text {
            display: block;
            font-family: 'Onest', sans-serif;
            font-size: 14px;
            font-weight: 700;
            letter-spacing: -0.02em;
            line-height: 1.25;
            color: #0D0D0D;
          }


          /* ═══════════════════════════════════════════
             PLUS BUTTON
          ═══════════════════════════════════════════ */

          .impact-row-action {
            width: 30px;
            height: 30px;
            display: flex;
            justify-content: center;
            align-items: center;
            border: 1px solid #DAD4CF;
            border-radius: 50%;
            font-family: 'Inter', sans-serif;
            font-size: 17px;
            font-weight: 300;
            color: #0D0D0D;
            transition:
              background 0.3s ease,
              border-color 0.3s ease,
              color 0.3s ease;
          }

          .impact-row:hover .impact-row-action,
          .impact-row.is-active .impact-row-action {
            background: #FF8500;
            border-color: #FF8500;
            color: #FFFFFF;
          }


          /* ═══════════════════════════════════════════
             ORANGE ACTIVE LINE
          ═══════════════════════════════════════════ */

          .impact-row-line {
            position: absolute;
            left: 0;
            bottom: -1px;
            width: 100%;
            height: 2px;
            transform-origin: left;
            background: #FF8500;
            pointer-events: none;
          }


          /* ═══════════════════════════════════════════
             MOBILE CONTENT
          ═══════════════════════════════════════════ */

          .mobile-transformation {
            display: none;
          }


          /* ═══════════════════════════════════════════
             TABLET
          ═══════════════════════════════════════════ */

          @media (max-width: 1000px) {

            .impact-header {
              grid-template-columns: 1fr;
              gap: 45px;
            }

            .impact-description {
              max-width: 520px;
            }

            .impact-stats {
              width: 100%;
            }

            .impact-row {
              grid-template-columns:
                45px
                minmax(160px, 1fr)
                35px
                minmax(180px, 1fr)
                minmax(150px, 0.8fr)
                40px;

              gap: 12px;
              padding: 0 18px;
            }
          }


          /* ═══════════════════════════════════════════
             MOBILE
          ═══════════════════════════════════════════ */

          @media (max-width: 700px) {

            .impact-header {
              grid-template-columns: 1fr !important;
              gap: 38px !important;
              margin-bottom: 50px !important;
            }

            .impact-description {
              margin-top: 25px;
              font-size: 13px;
              max-width: 100%;
            }

            .impact-stats {
              grid-template-columns: repeat(2, 1fr) !important;
            }

            .impact-stat {
              min-height: 130px;
              padding: 22px 18px;
            }


            /* INTRO */

            .impact-intro-row {
              align-items: flex-start;
              flex-direction: column;
              gap: 10px;
            }

            .impact-intro-row p {
              text-align: left;
            }


            /* LIST */

            .impact-list {
              width: 100%;
            }


            /* ROW */

            .impact-row {
              min-height: 0;
              display: flex;
              flex-direction: column;
              align-items: stretch;
              gap: 0;
              padding: 0;
              transform: none !important;
              background: #FFFFFF;
            }

            .impact-row:hover,
            .impact-row.is-active,
            .impact-row:focus-visible {
              transform: none !important;
              background: #FFFCF9;
            }


            /* NUMBER */

            .impact-row-number {
              position: absolute;
              top: 22px;
              left: 16px;
              padding: 0;
              z-index: 2;
            }


            /* PROBLEM */

            .impact-problem {
              width: 100%;
              min-height: 105px;
              padding: 25px 58px 25px 52px;
              box-sizing: border-box;
              display: flex;
              flex-direction: column;
              justify-content: center;
            }

            .impact-problem-text {
              font-size: 18px;
            }

            .impact-row:hover .impact-problem-text,
            .impact-row.is-active .impact-problem-text {
              transform: none;
            }


            /* PLUS */

            .impact-row-action {
              position: absolute;
              top: 20px;
              right: 16px;
              width: 30px;
              height: 30px;
              z-index: 4;
            }


            /* HIDE DESKTOP CONTENT */

            .impact-transform-arrow,
            .impact-solution,
            .impact-outcome {
              display: none;
            }


            /* MOBILE REVEAL */

            .mobile-transformation {
              width: 100%;
              display: block;
              overflow: hidden;
              box-sizing: border-box;
            }


            /* MOBILE SOLUTION */

            .mobile-solution {
              margin: 0 16px 0 52px;
              padding: 17px 18px;
              border: 1px solid #E3DDD8;
              background: #FFFFFF;
              box-sizing: border-box;
            }

            .mobile-solution .impact-row-label {
              margin-bottom: 8px;
            }

            .mobile-solution .impact-solution-text {
              font-size: 12px;
              line-height: 1.45;
            }


            /* MOBILE OUTCOME */

            .mobile-outcome {
              margin: 8px 16px 22px 52px;
              padding: 17px 18px;
              display: flex;
              align-items: center;
              gap: 13px;
              background: #0D0D0D;
              box-sizing: border-box;
            }

            .mobile-outcome .impact-row-label {
              color: #8F8984;
            }

            .mobile-outcome .impact-outcome-text {
              margin: 0;
              font-size: 14px;
              color: #FFFFFF;
            }

            .mobile-outcome-arrow {
              width: 32px;
              height: 32px;
              flex-shrink: 0;
              display: flex;
              align-items: center;
              justify-content: center;
              border-radius: 50%;
              background: #FF8500;
              color: #FFFFFF;
              font-family: 'Inter', sans-serif;
              font-size: 14px;
            }


            /* ORANGE LINE */

            .impact-row-line {
              bottom: 0;
              height: 2px;
            }
          }


          /* ═══════════════════════════════════════════
             SMALL MOBILE
          ═══════════════════════════════════════════ */

          @media (max-width: 400px) {

            .impact-stat {
              min-height: 115px;
              padding: 18px 14px;
            }

            .impact-stat-number {
              font-size: 34px;
            }

            .impact-stat-label {
              font-size: 8px;
            }

            .impact-problem {
              min-height: 100px;
              padding-left: 46px;
              padding-right: 52px;
            }

            .impact-row-number {
              left: 13px;
            }

            .impact-row-action {
              right: 13px;
            }

            .mobile-solution {
              margin-left: 46px;
              margin-right: 13px;
            }

            .mobile-outcome {
              margin-left: 46px;
              margin-right: 13px;
            }
          }


          /* ═══════════════════════════════════════════
             REDUCED MOTION
          ═══════════════════════════════════════════ */

          @media (prefers-reduced-motion: reduce) {

            .impact-row,
            .impact-problem-text,
            .impact-stat {
              transition: none !important;
            }
          }

        `}</style>

      </div>
    </section>
  )
}

