'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { BOOKING_LINK } from '../data/constants'

const PERKS = [
  {
    title: 'Reply within 4 hours',
    desc: 'During business hours, almost always faster.',
  },
  {
    title: 'Free 30-min discovery',
    desc: 'Walk away with a clear automation map — even if we never work together.',
  },
  {
    title: 'No-pressure pricing',
    desc: 'Fixed quotes after the discovery call. No surprises.',
  },
]

export default function Contact() {
  const headRef = useRef(null)

  const inView = useInView(headRef, {
    once: true,
    margin: '-50px',
  })

  return (
    <section
      id="contact"
      className="contact-section"
    >
      <div className="container">

        <div className="contact-grid">

          {/* ═══════════════════════════════════════════════
             LEFT — ORANGE
          ═══════════════════════════════════════════════ */}

          <motion.div
            ref={headRef}
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
              duration: 0.65,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="contact-left"
          >
            {/* Eyebrow */}

            <div className="contact-eyebrow">
              <span className="contact-eyebrow-dot" />
              <span>Contact</span>
            </div>

            {/* Heading */}

            <h2>
              Let's build
              <br />
              something
              <br />
              that ships.
            </h2>

            {/* Intro */}

            <p>
              Tell us where you'd like more leverage. We'll come back with a
              short, honest read on whether automation is the right next move
              — and what it would take.
            </p>

            {/* Small decorative line */}

            <div className="contact-accent-line" />
          </motion.div>


          {/* ═══════════════════════════════════════════════
             RIGHT — WHITE CONTENT
          ═══════════════════════════════════════════════ */}

          <motion.div
            initial={{
              opacity: 0,
              y: 18,
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
              duration: 0.65,
              delay: 0.08,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="contact-right"
          >

            {/* Intro */}

            <div className="contact-intro">
              <div className="contact-right-label">
                Start a conversation
              </div>
            </div>


            {/* Perks */}

            <div className="contact-perks">
              {PERKS.map((perk, index) => (
                <motion.div
                  key={perk.title}
                  initial={{
                    opacity: 0,
                    y: 8,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                    margin: '-20px',
                  }}
                  transition={{
                    delay: 0.12 + index * 0.07,
                    duration: 0.4,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="contact-perk"
                >
                  <span className="perk-number">
                    0{index + 1}
                  </span>

                  <div className="perk-content">
                    <div className="perk-title">
                      {perk.title}
                    </div>

                    <div className="perk-desc">
                      {perk.desc}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>


            {/* Direct contact */}

            <div className="contact-direct">

              <div className="direct-heading">
                Or reach us directly
              </div>

              <div className="direct-links">

                <a
                  href={BOOKING_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="direct-link"
                >
                  <span>Book a call</span>
                  <span className="link-arrow">↗</span>
                </a>

                <a
                  href="https://wa.me/919849884501"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="direct-link"
                >
                  <span>WhatsApp</span>
                  <span className="link-arrow">↗</span>
                </a>

              </div>

            </div>

          </motion.div>

        </div>

      </div>


      <style jsx global>{`

        /* ═══════════════════════════════════════════════
           SECTION
        ═══════════════════════════════════════════════ */

        .contact-section {
          position: relative;
          width: 100%;
          padding: clamp(52px, 6vw, 90px) 0;
          background: #ff8500;
          overflow: hidden;
        }


        /* ═══════════════════════════════════════════════
           GRID
        ═══════════════════════════════════════════════ */

        .contact-grid {
          display: grid;
          grid-template-columns: 0.9fr 1.1fr;
          gap: 0;
          align-items: stretch;
        }


        /* ═══════════════════════════════════════════════
           LEFT
        ═══════════════════════════════════════════════ */

        .contact-left {
          display: flex;
          flex-direction: column;
          justify-content: center;

          min-height: 560px;

          padding: clamp(
            40px,
            5vw,
            72px
          );

          background: #ff8500;
          color: #ffffff;
        }


        .contact-eyebrow {
          display: flex;
          align-items: center;
          gap: 9px;

          margin-bottom: 22px;

          font-family: 'Inter', sans-serif;
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;

          color: #ffffff;
        }


        .contact-eyebrow-dot {
          width: 6px;
          height: 6px;

          flex: 0 0 6px;

          border-radius: 50%;

          background: #ffffff;
        }


        .contact-left h2 {
          margin: 0;

          font-family: 'Onest', sans-serif;
          font-size: clamp(
            56px,
            7.5vw,
            104px
          );

          font-weight: 800;

          line-height: 0.88;
          letter-spacing: -0.075em;

          color: #ffffff;
        }


        .contact-left p {
          margin: 24px 0 0;

          max-width: 460px;

          font-family: 'Inter', sans-serif;
          font-size: clamp(
            15px,
            1.2vw,
            18px
          );

          line-height: 1.6;
          letter-spacing: -0.01em;

          color: rgba(255, 255, 255, 0.85);
        }


        .contact-accent-line {
          width: 56px;
          height: 3px;

          margin-top: 42px;

          background: #ffffff;
        }


        /* ═══════════════════════════════════════════════
           RIGHT
        ═══════════════════════════════════════════════ */

        .contact-right {
          min-height: 560px;

          display: flex;
          flex-direction: column;
          justify-content: space-between;

          padding: clamp(
            40px,
            5vw,
            72px
          );

          background: #ffffff;

          border-left: 1px solid
            rgba(13, 13, 13, 0.08);

          box-sizing: border-box;
        }


        /* ═══════════════════════════════════════════════
           INTRO
        ═══════════════════════════════════════════════ */

        .contact-intro {
          max-width: 590px;
        }


        .contact-right-label {
          display: flex;
          align-items: center;
          gap: 9px;

          margin-bottom: 20px;

          font-family: 'Inter', sans-serif;
          font-size: 9px;
          font-weight: 700;

          letter-spacing: 0.14em;
          text-transform: uppercase;

          color: #ff8500;
        }


        .contact-right-label::before {
          content: '';

          width: 6px;
          height: 6px;

          flex: 0 0 6px;

          border-radius: 50%;

          background: #ff8500;
        }


        /* ═══════════════════════════════════════════════
           PERKS
        ═══════════════════════════════════════════════ */

        .contact-perks {
          margin-top: 48px;

          max-width: 590px;

          border-top: 1px solid
            rgba(13, 13, 13, 0.14);
        }


        .contact-perk {
          display: grid;

          grid-template-columns: 42px minmax(0, 1fr);

          gap: 14px;

          padding: 18px 0;

          border-bottom: 1px solid
            rgba(13, 13, 13, 0.12);
        }


        .perk-number {
          padding-top: 2px;

          font-family: 'Onest', sans-serif;

          font-size: 11px;

          font-weight: 700;

          letter-spacing: -0.02em;

          color: #ff8500;
        }


        .perk-content {
          min-width: 0;
        }


        .perk-title {
          margin-bottom: 4px;

          font-family: 'Inter', sans-serif;

          font-size: 13px;

          font-weight: 700;

          color: #0d0d0d;
        }


        .perk-desc {
          font-family: 'Inter', sans-serif;

          font-size: 12px;

          line-height: 1.5;

          color: #77716d;
        }


        /* ═══════════════════════════════════════════════
           DIRECT CONTACT
        ═══════════════════════════════════════════════ */

        .contact-direct {
          display: flex;

          align-items: flex-start;

          flex-direction: column;

          gap: 18px;

          margin-top: 34px;

          padding-top: 22px;

          border-top: 1px solid
            rgba(13, 13, 13, 0.14);
        }


        .direct-heading {
          font-family: 'Inter', sans-serif;

          font-size: 9px;

          font-weight: 700;

          letter-spacing: 0.14em;

          text-transform: uppercase;

          color: #77716d;

          white-space: nowrap;
        }


        .direct-links {
          display: flex;

          align-items: center;

          gap: 26px;

          flex-wrap: wrap;
        }


        .direct-link {
          position: relative;

          display: inline-flex;

          align-items: center;

          gap: 8px;

          padding: 13px 22px;

          border-radius: 999px;

          background: #ff8500;
          border: 1px solid #ff8500;

          font-family: 'Inter', sans-serif;

          font-size: 13px;

          font-weight: 700;

          color: #ffffff;

          text-decoration: none;

          box-shadow: 0 6px 20px rgba(255, 133, 0, 0.28);

          transition:
            background 0.25s
              cubic-bezier(0.22, 1, 0.36, 1),
            transform 0.25s
              cubic-bezier(0.22, 1, 0.36, 1),
            box-shadow 0.25s
              cubic-bezier(0.22, 1, 0.36, 1);
        }


        .direct-link:hover {
          background: #e67600;
          border-color: #e67600;

          transform: translateY(-2px);

          box-shadow: 0 10px 28px rgba(255, 133, 0, 0.38);
        }


        .link-arrow {
          font-size: 15px;

          line-height: 1;

          transition:
            transform 0.25s
            cubic-bezier(
              0.22,
              1,
              0.36,
              1
            );
        }


        .direct-link:hover .link-arrow {
          transform: translate(
            3px,
            -3px
          );
        }


        /* ═══════════════════════════════════════════════
           TABLET
        ═══════════════════════════════════════════════ */

        @media (max-width: 880px) {

          .contact-grid {
            grid-template-columns: 1fr;
          }


          .contact-left {
            min-height: auto;

            padding:
              clamp(44px, 8vw, 65px);
          }


          .contact-right {
            min-height: auto;

            padding:
              clamp(40px, 7vw, 60px);
          }


          .contact-left h2 {
            font-size: clamp(
              52px,
              10vw,
              76px
            );
          }


        }


        /* ═══════════════════════════════════════════════
           MOBILE
        ═══════════════════════════════════════════════ */

        @media (max-width: 560px) {

          .contact-section {
            padding: 0;
          }


          .contact-left {
            padding:
              58px 26px 54px;
          }


          .contact-eyebrow {
            margin-bottom: 19px;
          }


          .contact-left h2 {
            font-size: clamp(
              47px,
              14vw,
              64px
            );

            line-height: 0.9;
          }


          .contact-accent-line {
            width: 44px;

            height: 2px;

            margin-top: 32px;
          }


          .contact-right {
            padding:
              42px 26px 46px;
          }


          .contact-right-label {
            margin-bottom: 17px;
          }


          .contact-left p {
            font-size: 16px;

            line-height: 1.5;
          }


          .contact-perks {
            margin-top: 38px;
          }


          .contact-perk {
            grid-template-columns:
              32px
              minmax(0, 1fr);

            gap: 10px;

            padding: 16px 0;
          }


          .perk-title {
            font-size: 12.5px;
          }


          .perk-desc {
            font-size: 11.5px;
          }


          .contact-direct {
            margin-top: 28px;

            padding-top: 19px;

            gap: 16px;
          }


          .direct-links {
            width: 100%;

            gap: 18px;
          }


          .direct-link {
            font-size: 12.5px;
          }
        }


        /* ═══════════════════════════════════════════════
           SMALL MOBILE
        ═══════════════════════════════════════════════ */

        @media (max-width: 390px) {

          .contact-left {
            padding:
              50px 23px 46px;
          }


          .contact-right {
            padding:
              38px 23px 42px;
          }


          .contact-left h2 {
            font-size: 46px;
          }


          .contact-left p {
            font-size: 15px;
          }


          .contact-perks {
            margin-top: 32px;
          }


          .perk-desc {
            font-size: 11px;
          }
        }

      `}</style>
    </section>
  )
}