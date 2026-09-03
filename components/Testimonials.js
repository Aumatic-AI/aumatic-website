import { useEffect, useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

const TESTIMONIALS = [
  {
    quote: 'Working with Aumatic completely changed how we handle client engagement on Instagram. The DM and comment automation saved hours every day and helped us close more deals through faster, more consistent interactions.',
    name: 'Ali Shah',
    role: 'Social Media Manager · Pixel Social (Toronto)',
    initials: 'AS',
  },
  {
    quote: 'Our LinkedIn presence grew significantly. The AI posting system finds relevant content in our niche, rewrites it in our brand voice, and publishes daily. We now get qualified leads directly from our content without lifting a finger.',
    name: 'David Clarke',
    role: 'Founder · ScaleUp Agency (Chicago)',
    initials: 'DC',
  },
  {
    quote: 'The social media automation keeps our brand consistent across Instagram, TikTok, and LinkedIn. It genuinely feels like having a dedicated content team working around the clock — without the overhead.',
    name: 'Sandra Chen',
    role: 'Marketing Director · NorthStream Marketing (Vancouver)',
    initials: 'SC',
  },
  {
    quote: 'The newsletter monitoring automation opened up a whole new lead channel for us. It identifies businesses with deliverability issues and triggers outreach automatically. A genuinely smart approach to prospecting.',
    name: 'Mark Stevens',
    role: 'Head of Growth · ProReach Agency (New York)',
    initials: 'MS',
  },
  {
    quote: 'With the WhatsApp broadcast automation, every new book release now reaches thousands of readers instantly. We moved from manual messaging to automated, personalised broadcasts — and our launch-day results improved noticeably.',
    name: 'Maria Costa',
    role: 'Founder · Bluebell Publishing',
    initials: 'MC',
  },
  {
    quote: 'Our team saves hours every week with the document consolidation automation. It creates all client documents, names them correctly, and files them in the right Drive folders automatically. Zero manual errors.',
    name: 'Ryan Patel',
    role: 'Operations Lead · Vector Consulting (Austin)',
    initials: 'RP',
  },
  {
    quote: 'The WhatsApp local service connector transformed how we match customers with service providers. Requests get routed in seconds, providers get jobs they would have missed, and the whole system runs without manual coordination.',
    name: 'James Miller',
    role: 'Founder · QuickFix Services (Ohio)',
    initials: 'JM',
  },
]

export default function Testimonials() {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const [touchStart, setTouchStart] = useState(null)

  const headRef = useRef(null)

  const inView = useInView(headRef, {
    once: true,
    margin: '-60px',
  })

  const n = TESTIMONIALS.length

  useEffect(() => {
    if (paused) return

    const timer = setTimeout(() => {
      setActive((a) => (a + 1) % n)
    }, 6200)

    return () => clearTimeout(timer)
  }, [active, paused, n])

  const go = (dir) => {
    setActive((a) => (a + dir + n) % n)
  }

  const onTouchStart = (e) => {
    setTouchStart(e.touches[0].clientX)
  }

  const onTouchEnd = (e) => {
    if (touchStart == null) return

    const diff =
      touchStart - e.changedTouches[0].clientX

    if (Math.abs(diff) > 48) {
      go(diff > 0 ? 1 : -1)
    }

    setTouchStart(null)
  }

  const testimonial = TESTIMONIALS[active]

  return (
    <section
      id="testimonials"
      className="testimonials-section"
    >
      <div className="testimonials-container">

        {/* HEADER */}

        <motion.div
          ref={headRef}
          initial={{
            opacity: 0,
            y: 16,
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
          className="testimonials-header"
        >
          <div className="section-label">
            <span className="label-dot" />
            Testimonials
          </div>

          <h2>
            What they say
            <br />
            <span>after the build.</span>
          </h2>
        </motion.div>


        {/* TESTIMONIAL */}

        <div
          className="testimonial-stage"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >

          <div className="testimonial-top-line" />

          <div className="testimonial-content">

            {/* INDEX */}

            <div className="testimonial-index">
              <span>
                {String(active + 1).padStart(2, '0')}
              </span>

              <span className="index-divider">
                /
              </span>

              <span className="index-total">
                {String(n).padStart(2, '0')}
              </span>
            </div>


            {/* QUOTE */}

            <div className="quote-area">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{
                    opacity: 0,
                    y: 12,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  exit={{
                    opacity: 0,
                    y: -12,
                  }}
                  transition={{
                    duration: 0.45,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <div className="quote-mark">
                    “
                  </div>

                  <p className="testimonial-quote">
                    {testimonial.quote}
                  </p>

                  <div className="testimonial-person">

                    <div className="initials">
                      {testimonial.initials}
                    </div>

                    <div>
                      <div className="person-name">
                        {testimonial.name}
                      </div>

                      <div className="person-role">
                        {testimonial.role}
                      </div>
                    </div>

                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

          </div>


          {/* CONTROLS */}

          <div className="testimonial-controls">

            <button
              onClick={() => go(-1)}
              aria-label="Previous testimonial"
              className="arrow-button"
            >
              <svg
                width="13"
                height="13"
                viewBox="0 0 16 16"
                fill="none"
              >
                <path
                  d="M10 4L6 8l4 4"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            <div className="progress-dots">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  aria-label={`Go to testimonial ${i + 1}`}
                  className={`progress-dot ${
                    i === active ? 'active' : ''
                  }`}
                />
              ))}
            </div>

            <button
              onClick={() => go(1)}
              aria-label="Next testimonial"
              className="arrow-button"
            >
              <svg
                width="13"
                height="13"
                viewBox="0 0 16 16"
                fill="none"
              >
                <path
                  d="M6 4l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

          </div>

        </div>

      </div>


      <style>{`

        /* ================================
           SECTION
        ================================= */

        .testimonials-section {
          position: relative;
          overflow: hidden;

          padding: clamp(70px, 8vw, 110px) 0;

          background: #FFFFFF;
          border-top: 1px solid var(--hair);

          color: #0D0D0D;
        }

        .testimonials-container {
          width: min(1080px, calc(100% - 64px));
          margin: 0 auto;
        }


        /* ================================
           HEADER
        ================================= */

        .testimonials-header {
          margin-bottom: clamp(42px, 5vw, 58px);
        }

        .section-label {
          display: flex;
          align-items: center;
          gap: 8px;

          margin-bottom: 17px;

          font-family: 'Inter', sans-serif;
          font-size: 8px;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;

          color: #FF8500;
        }

        .label-dot {
          width: 5px;
          height: 5px;

          border-radius: 50%;
          background: #FF8500;
        }

        .testimonials-header h2 {
          margin: 0;

          font-family: 'Onest', sans-serif;
          font-size: clamp(42px, 5.3vw, 68px);
          font-weight: 800;

          letter-spacing: -0.07em;
          line-height: 0.9;

          color: #0D0D0D;
        }

        .testimonials-header h2 span {
          color: #FF8500;
        }


        /* ================================
           STAGE
        ================================= */

        .testimonial-stage {
          position: relative;
        }

        .testimonial-top-line {
          width: 100%;
          height: 1px;
          background: #0D0D0D;
        }

        .testimonial-content {
          display: grid;

          grid-template-columns: 75px minmax(0, 700px);

          gap: clamp(25px, 5vw, 60px);

          padding:
            clamp(27px, 4vw, 40px)
            0
            clamp(32px, 4vw, 45px);
        }


        /* ================================
           INDEX
        ================================= */

        .testimonial-index {
          display: flex;
          align-items: flex-start;

          gap: 6px;

          padding-top: 6px;

          font-family: 'Inter', sans-serif;
          font-size: 9px;
          font-weight: 700;

          letter-spacing: 0.08em;
        }

        .testimonial-index > span:first-child {
          color: #FF8500;
        }

        .index-divider {
          color: #C8C2BC;
        }

        .index-total {
          color: #99928D;
        }


        /* ================================
           QUOTE
        ================================= */

        .quote-area {
          min-height: 275px;
        }

        .quote-mark {
          margin-bottom: -8px;

          font-family: 'Onest', sans-serif;
          font-size: 60px;
          font-weight: 800;

          line-height: 0.7;

          color: #FF8500;
        }

        .testimonial-quote {
          max-width: 700px;

          margin: 0;

          font-family: 'Onest', sans-serif;
          font-size: clamp(20px, 2.2vw, 28px);
          font-weight: 500;

          letter-spacing: -0.035em;
          line-height: 1.3;

          color: #0D0D0D;
        }


        /* ================================
           PERSON
        ================================= */

        .testimonial-person {
          display: flex;
          align-items: center;

          gap: 11px;

          margin-top: 27px;
        }

        .initials {
          width: 34px;
          height: 34px;

          border-radius: 50%;

          background: #FF8500;

          display: flex;
          align-items: center;
          justify-content: center;

          font-family: 'Inter', sans-serif;
          font-size: 9px;
          font-weight: 700;

          color: #FFFFFF;
        }

        .person-name {
          margin-bottom: 2px;

          font-family: 'Inter', sans-serif;
          font-size: 12px;
          font-weight: 600;

          color: #0D0D0D;
        }

        .person-role {
          font-family: 'Inter', sans-serif;
          font-size: 10px;
          line-height: 1.35;

          color: #77716D;
        }


        /* ================================
           CONTROLS
        ================================= */

        .testimonial-controls {
          display: flex;
          align-items: center;

          gap: 11px;

          padding-top: 15px;

          border-top: 1px solid #E5E0DB;
        }

        .arrow-button {
          width: 32px;
          height: 32px;

          border: none;
          border-radius: 50%;

          background: #F4F1EE;

          color: #0D0D0D;

          display: inline-flex;
          align-items: center;
          justify-content: center;

          cursor: pointer;

          transition:
            background 0.2s ease,
            color 0.2s ease,
            transform 0.2s ease;
        }

        .arrow-button:hover {
          background: #FF8500;
          color: #FFFFFF;

          transform: translateY(-1px);
        }

        .progress-dots {
          display: flex;
          align-items: center;

          gap: 5px;

          margin: 0 3px;
        }

        .progress-dot {
          width: 5px;
          height: 5px;

          padding: 0;

          border: none;
          border-radius: 50%;

          background: #D8D2CC;

          cursor: pointer;

          transition:
            width 0.3s ease,
            background 0.3s ease;
        }

        .progress-dot.active {
          width: 21px;

          border-radius: 20px;

          background: #FF8500;
        }


        /* ================================
           TABLET
        ================================= */

        @media (max-width: 750px) {

          .testimonials-container {
            width: calc(100% - 48px);
          }

          .testimonial-content {
            grid-template-columns: 55px minmax(0, 1fr);
            gap: 24px;
          }

        }


        /* ================================
           MOBILE
        ================================= */

        @media (max-width: 600px) {

          .testimonials-section {
            padding: 65px 0 70px;
          }

          .testimonials-container {
            width: calc(100% - 32px);
          }

          .testimonials-header {
            margin-bottom: 38px;
          }

          .testimonials-header h2 {
            font-size: clamp(40px, 13vw, 58px);
          }

          .testimonial-content {
            display: block;

            padding:
              24px 0
              34px;
          }

          .testimonial-index {
            margin-bottom: 23px;
          }

          .quote-area {
            min-height: 300px;
          }

          .quote-mark {
            font-size: 54px;
          }

          .testimonial-quote {
            font-size: 21px;
            line-height: 1.32;
          }

          .testimonial-person {
            margin-top: 25px;
          }

          .testimonial-controls {
            justify-content: flex-start;
          }

        }


        /* ================================
           SMALL MOBILE
        ================================= */

        @media (max-width: 400px) {

          .testimonial-quote {
            font-size: 19px;
          }

          .quote-area {
            min-height: 320px;
          }

          .person-role {
            font-size: 9px;
          }

        }

      `}</style>
    </section>
  )
}