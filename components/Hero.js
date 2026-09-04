
import { useRef } from 'react'
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
} from 'framer-motion'
import { BOOKING_LINK } from '../data/constants'

export default function Hero() {
  const ref = useRef(null)
  const prefersReducedMotion = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  const y = useSpring(
    useTransform(
      scrollYProgress,
      [0, 1],
      prefersReducedMotion ? [0, 0] : [0, -80]
    ),
    {
      stiffness: 80,
      damping: 20,
    }
  )

  return (
    <section
      ref={ref}
      className="hero-section"
      style={{
        position: 'relative',
        minHeight: '100svh',
        background: '#ffffff',
        color: '#0d0d0d',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        padding: '28px clamp(20px, 4.5vw, 72px) 28px',
        boxSizing: 'border-box',
      }}
    >

      {/* ═══════════════════════════════════════════════════════
          HERO CONTENT
      ═══════════════════════════════════════════════════════ */}

      <motion.div
        className="hero-content"
        style={{
          y,
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 'clamp(40px, 5vh, 65px) 0 20px',
          minHeight: 0,
        }}
      >

        {/* ═══════════════════════════════════════════════════════
            MAIN HEADLINE
        ═══════════════════════════════════════════════════════ */}

        <motion.div
          className="hero-headline-wrap"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.25,
            duration: 0.85,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <h1 className="hero-title">

            <span className="hero-title-primary">
              AUTOMATION
            </span>

            <span className="hero-title-secondary">
              ENGINEERED FOR YOU
            </span>

          </h1>
        </motion.div>


        {/* ═══════════════════════════════════════════════════════
            LOWER CONTENT
        ═══════════════════════════════════════════════════════ */}

        <div className="hero-lower">

          {/* LEFT — DESCRIPTION */}

          <motion.div
            className="hero-description-block"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.45,
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1],
            }}
          >

            {/* SMALL LABEL */}

            <div className="hero-label">
              <span className="hero-label-dot" />

              <span>
                Intelligent automation for modern teams
              </span>
            </div>


            {/* DESCRIPTION */}

            <p className="hero-description">
              We map your workflows, architect AI systems around
              them, and deploy automations that compound hundreds
              of hours back into your team every month.
            </p>

          </motion.div>


          {/* RIGHT — STATEMENT + CTA */}

          <motion.div
            className="hero-cta-block"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.55,
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1],
            }}
          >

            {/* VALUE STATEMENT */}

            <p className="hero-value-statement">
              We design{' '}
              <span>
                intelligent
              </span>{' '}
              automation that{' '}
              <span>
                ships.
              </span>
            </p>


            {/* CTA ROW */}

            <motion.div
              className="hero-cta-row"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.72,
                duration: 0.65,
                ease: [0.22, 1, 0.36, 1],
              }}
            >

              {/* PRIMARY CTA */}

              <a
                href={BOOKING_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="hero-primary-cta"
              >
                BOOK A FREE STRATEGY CALL

                <span className="hero-cta-arrow">
                  ↗
                </span>
              </a>


              {/* SECONDARY CTA */}

              <a
                href="#case-studies"
                className="hero-secondary-cta"
              >
                SEE OUR WORK
              </a>

            </motion.div>

          </motion.div>

        </div>

      </motion.div>


      {/* ═══════════════════════════════════════════════════════
          BOTTOM META
      ═══════════════════════════════════════════════════════ */}

      <motion.footer
        className="hero-footer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          delay: 1,
          duration: 0.7,
        }}
      >

        <span className="hero-footer-process">
          WORKFLOW → AI → AUTOMATION
        </span>


        <div className="hero-footer-stats">

          <span>
            100+ AUTOMATIONS SHIPPED
          </span>

          <span className="hero-footer-dot" />

          <span>
            8K+ HOURS SAVED / MONTH
          </span>

        </div>

      </motion.footer>


      {/* ═══════════════════════════════════════════════════════
          RESPONSIVE STYLES
      ═══════════════════════════════════════════════════════ */}

      <style>{`

        /* ═════════════════════════════════════════════════════
           BASE
        ═════════════════════════════════════════════════════ */

        .hero-section,
        .hero-section * {
          box-sizing: border-box;
        }

        .hero-section {
          width: 100%;
        }

        .hero-content {
          width: 100%;
        }

        .hero-headline-wrap {
          width: 100%;
          margin-top: clamp(30px, 5vh, 65px);
        }

        .hero-title {
          width: 100%;
          margin: 0;
          padding: 0;
          font-family: 'Inter', sans-serif;
          font-weight: 900;
          text-transform: uppercase;
        }

        .hero-title-primary {
          display: block;
          width: 100%;
          color: #ff8500;
          font-size: clamp(78px, 13.6vw, 220px);
          line-height: 0.76;
          letter-spacing: -0.10em;
          white-space: nowrap;
        }

        .hero-title-secondary {
          display: block;
          width: max-content;
          max-width: 100%;
          color: #0d0d0d;
          font-size: clamp(38px, 6.2vw, 105px);
          line-height: 0.88;
          letter-spacing: -0.085em;
          white-space: nowrap;
          padding-left: clamp(8px, 2.5vw, 42px);
          margin-top: clamp(14px, 2vw, 26px);
        }


        /* ═════════════════════════════════════════════════════
           LOWER CONTENT
        ═════════════════════════════════════════════════════ */

        .hero-lower {
          width: 100%;
          max-width: 1250px;
          margin: clamp(40px, 5vh, 65px) auto 0;
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
          gap: clamp(60px, 10vw, 180px);
          align-items: end;
        }

        .hero-description-block {
          width: 100%;
          max-width: 560px;
        }

        .hero-label {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 18px;
          font-family: 'Inter', sans-serif;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.1em;
          line-height: 1.3;
          text-transform: uppercase;
        }

        .hero-label-dot {
          width: 5px;
          height: 5px;
          flex: 0 0 5px;
          background: #ff8500;
          border-radius: 50%;
        }

        .hero-description {
          margin: 0;
          max-width: 560px;
          font-family: 'Inter', sans-serif;
          font-size: clamp(16px, 1.35vw, 19px);
          line-height: 1.5;
          color: #4a4a4a;
          letter-spacing: -0.025em;
        }


        /* ═════════════════════════════════════════════════════
           CTA BLOCK
        ═════════════════════════════════════════════════════ */

        .hero-cta-block {
          width: 100%;
          max-width: 560px;
          justify-self: end;
        }

        .hero-value-statement {
          margin: 0;
          max-width: 500px;
          font-family: 'Inter', sans-serif;
          font-size: clamp(22px, 2.3vw, 32px);
          line-height: 1.08;
          font-weight: 800;
          letter-spacing: -0.055em;
        }

        .hero-value-statement span {
          color: #ff8500;
        }

        .hero-cta-row {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-top: 26px;
          flex-wrap: wrap;
        }

        .hero-primary-cta,
        .hero-secondary-cta {
          min-height: 52px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          padding: 16px 22px;
          text-decoration: none;
          font-family: 'Inter', sans-serif;
          font-size: 14px;
          font-weight: 800;
          letter-spacing: -0.02em;
          transition:
            transform 0.25s ease,
            background 0.25s ease,
            color 0.25s ease,
            border-color 0.25s ease;
        }

        .hero-primary-cta {
          background: #ff8500;
          color: #0d0d0d;
          border: 1px solid #ff8500;
        }

        .hero-primary-cta:hover {
          transform: translateY(-3px);
          background: #0d0d0d;
          color: #ffffff;
        }

        .hero-secondary-cta {
          background: #ffffff;
          color: #0d0d0d;
          border: 1px solid #0d0d0d;
        }

        .hero-secondary-cta:hover {
          background: #0d0d0d;
          color: #ffffff;
        }

        .hero-cta-arrow {
          font-size: 18px;
          line-height: 1;
        }


        /* ═════════════════════════════════════════════════════
           FOOTER
        ═════════════════════════════════════════════════════ */

        .hero-footer {
          width: 100%;
          border-top: 1px solid #0d0d0d;
          padding-top: 14px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 20px;
          flex-wrap: wrap;
          flex-shrink: 0;
          font-family: 'Inter', sans-serif;
        }

        .hero-footer-process {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.1em;
        }

        .hero-footer-stats {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 28px;
          flex-wrap: wrap;
          font-size: 12px;
          font-weight: 600;
        }

        .hero-footer-dot {
          width: 5px;
          height: 5px;
          flex: 0 0 5px;
          background: #ff8500;
          border-radius: 50%;
        }


        /* ═════════════════════════════════════════════════════
           TABLET
        ═════════════════════════════════════════════════════ */

        @media (max-width: 1100px) {

          .hero-section {
            min-height: 100svh;
            overflow: visible;
          }

          .hero-title-primary {
            font-size: clamp(68px, 12.8vw, 140px);
          }

          .hero-title-secondary {
            font-size: clamp(36px, 6.4vw, 82px);
          }

          .hero-lower {
            gap: clamp(40px, 6vw, 80px);
          }

        }


        /* ═════════════════════════════════════════════════════
           TABLET / LARGE MOBILE
        ═════════════════════════════════════════════════════ */

        @media (max-width: 800px) {

          .hero-section {
            min-height: auto;
          }

          .hero-content {
            padding-top: 45px;
            padding-bottom: 55px;
          }

          .hero-headline-wrap {
            margin-top: 30px;
          }

          .hero-title-primary {
            font-size: clamp(58px, 13.5vw, 105px);
            letter-spacing: -0.09em;
          }

          .hero-title-secondary {
            font-size: clamp(32px, 7.2vw, 60px);
            letter-spacing: -0.075em;
            padding-left: 0;
            margin-top: 14px;
          }

          .hero-lower {
            grid-template-columns: 1fr;
            gap: 42px;
            margin-top: 55px;
          }

          .hero-description-block,
          .hero-cta-block {
            max-width: 100%;
          }

          .hero-cta-block {
            justify-self: stretch;
          }

          .hero-value-statement {
            max-width: 600px;
          }

          .hero-footer {
            align-items: flex-start;
          }

        }


        /* ═════════════════════════════════════════════════════
           MOBILE
        ═════════════════════════════════════════════════════ */

        @media (max-width: 600px) {

          .hero-section {
            padding: 20px 20px 22px;
          }

          .hero-content {
            padding-top: 35px;
            padding-bottom: 45px;
          }

          .hero-headline-wrap {
            margin-top: 20px;
          }

          .hero-title-primary {
            font-size: clamp(43px, 14.2vw, 82px);
            line-height: 0.8;
            letter-spacing: -0.085em;
          }

          .hero-title-secondary {
            width: 100%;
            max-width: 100%;
            white-space: normal;
            font-size: clamp(29px, 8vw, 50px);
            line-height: 0.9;
            letter-spacing: -0.075em;
            padding-left: 0;
            margin-top: 15px;
          }


          /* LOWER CONTENT */

          .hero-lower {
            gap: 40px;
            margin-top: 50px;
          }

          .hero-label {
            gap: 8px;
            margin-bottom: 15px;
            font-size: 9px;
            letter-spacing: 0.09em;
          }

          .hero-label-dot {
            width: 5px;
            height: 5px;
            flex-basis: 5px;
          }

          .hero-description {
            font-size: 15px;
            line-height: 1.55;
          }

          .hero-value-statement {
            font-size: clamp(24px, 7vw, 31px);
            line-height: 1.08;
          }


          /* CTA */

          .hero-cta-row {
            width: 100%;
            flex-direction: column;
            align-items: stretch;
            gap: 10px;
            margin-top: 23px;
          }

          .hero-primary-cta,
          .hero-secondary-cta {
            width: 100%;
            min-height: 52px;
            padding: 15px 18px;
          }


          /* FOOTER */

          .hero-footer {
            flex-direction: column;
            align-items: flex-start;
            gap: 14px;
          }

          .hero-footer-process {
            font-size: 9px;
          }

          .hero-footer-stats {
            width: 100%;
            justify-content: flex-start;
            gap: 12px;
            font-size: 9px;
            line-height: 1.4;
          }

          .hero-footer-dot {
            width: 4px;
            height: 4px;
            flex-basis: 4px;
          }

        }


        /* ═════════════════════════════════════════════════════
           SMALL MOBILE
        ═════════════════════════════════════════════════════ */

        @media (max-width: 400px) {

          .hero-section {
            padding-left: 16px;
            padding-right: 16px;
          }

          .hero-content {
            padding-top: 30px;
            padding-bottom: 38px;
          }

          .hero-title-primary {
            font-size: clamp(39px, 13.7vw, 65px);
          }

          .hero-title-secondary {
            font-size: clamp(26px, 7.7vw, 42px);
          }

          .hero-lower {
            margin-top: 42px;
            gap: 34px;
          }

          .hero-description {
            font-size: 14px;
          }

          .hero-value-statement {
            font-size: 23px;
          }

          .hero-footer-stats {
            gap: 9px;
          }

        }


        /* ═════════════════════════════════════════════════════
           SHORT MOBILE SCREENS
        ═════════════════════════════════════════════════════ */

        @media (max-width: 600px) and (max-height: 750px) {

          .hero-content {
            padding-top: 25px;
            padding-bottom: 30px;
          }

          .hero-headline-wrap {
            margin-top: 12px;
          }

          .hero-lower {
            margin-top: 35px;
            gap: 30px;
          }

        }


        /* ═════════════════════════════════════════════════════
           VERY SHORT SCREENS
        ═════════════════════════════════════════════════════ */

        @media (max-width: 600px) and (max-height: 650px) {

          .hero-section {
            min-height: auto;
          }

          .hero-title-primary {
            font-size: clamp(38px, 12.5vw, 58px);
          }

          .hero-title-secondary {
            font-size: clamp(25px, 7vw, 40px);
          }

          .hero-lower {
            margin-top: 28px;
          }

        }


        /* ═════════════════════════════════════════════════════
           ACCESSIBILITY / REDUCED MOTION
        ═════════════════════════════════════════════════════ */

        @media (prefers-reduced-motion: reduce) {

          .hero-primary-cta,
          .hero-secondary-cta {
            transition: none;
          }

          .hero-primary-cta:hover {
            transform: none;
          }

        }

      `}</style>

    </section>
  )
}
