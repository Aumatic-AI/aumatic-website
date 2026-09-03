'use client'

import { useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const CATS = [
  {
    num: '01',
    title: 'AI & Machine Learning',
    summary:
      'Custom LLM agents, RAG pipelines, and vision systems tuned to your domain data.',
    tools: [
      { name: 'OpenAI', slug: 'logos:openai' },
      { name: 'Claude', slug: 'logos:claude' },
      { name: 'Gemini', slug: 'logos:google-gemini' },
      { name: 'Hugging Face', slug: 'logos:hugging-face-icon' },
      { name: 'TensorFlow', slug: 'logos:tensorflow' },
    ],
  },
  {
    num: '02',
    title: 'Automation Platforms',
    summary:
      'Visual and code-driven orchestration across every tool you use.',
    tools: [
      { name: 'Make', slug: 'simple-icons:make' },
      { name: 'n8n', slug: 'simple-icons:n8n' },
      { name: 'Zapier', slug: 'logos:zapier-icon' },
      { name: 'IFTTT', slug: 'logos:ifttt' },
      { name: 'GitHub Actions', slug: 'logos:github-actions' },
    ],
  },
  {
    num: '03',
    title: 'CRM & Operations',
    summary:
      'Lifecycle, pipeline, and ops automation across the major CRMs.',
    tools: [
      { name: 'HubSpot', slug: 'logos:hubspot' },
      { name: 'Salesforce', slug: 'logos:salesforce' },
      { name: 'Pipedrive', slug: 'logos:pipedrive' },
      { name: 'Monday', slug: 'logos:monday-icon' },
      { name: 'Airtable', slug: 'logos:airtable' },
    ],
  },
  {
    num: '04',
    title: 'Engineering',
    summary:
      'Production-grade backends in TypeScript and Python with real test coverage.',
    tools: [
      { name: 'TypeScript', slug: 'logos:typescript-icon' },
      { name: 'Python', slug: 'logos:python' },
      { name: 'GraphQL', slug: 'logos:graphql' },
      { name: 'Node.js', slug: 'logos:nodejs-icon' },
      { name: 'Docker', slug: 'logos:docker-icon' },
    ],
  },
  {
    num: '05',
    title: 'Business Tools',
    summary:
      'Slack-first, Notion-first, Drive-first — we live inside your stack.',
    tools: [
      { name: 'Slack', slug: 'logos:slack-icon' },
      { name: 'Notion', slug: 'logos:notion-icon' },
      { name: 'Google', slug: 'logos:google-icon' },
      { name: 'Microsoft', slug: 'logos:microsoft-icon' },
      { name: 'Asana', slug: 'logos:asana-icon' },
    ],
  },
  {
    num: '06',
    title: 'Data & Analytics',
    summary:
      'Warehouses, dashboards, and the modeling layer behind every decision.',
    tools: [
      { name: 'BigQuery', slug: 'simple-icons:googlebigquery' },
      { name: 'Snowflake', slug: 'logos:snowflake-icon' },
      { name: 'Power BI', slug: 'logos:microsoft-power-bi' },
      { name: 'Looker', slug: 'logos:looker-icon' },
      { name: 'dbt', slug: 'logos:dbt-icon' },
    ],
  },
]

const iconUrl = (slug) =>
  `https://api.iconify.design/${slug}.svg`

function CapabilityCard({ item, index }) {
  return (
    <div
      className="cap-stack-card"
      style={{
        zIndex: index + 1,
      }}
    >
      <div className="cap-card-number">
        {item.num}
      </div>

      <div className="cap-card-content">
        <h3>{item.title}</h3>

        <p>{item.summary}</p>

        <div className="cap-tools">
          {item.tools.map((tool) => (
            <span
              key={tool.name}
              className="cap-tool"
            >
              <img
                src={iconUrl(tool.slug)}
                alt=""
                width="16"
                height="16"
              />

              {tool.name}
            </span>
          ))}
        </div>
      </div>

      <span className="cap-card-arrow">
        ↗
      </span>
    </div>
  )
}

export default function Capabilities() {
  const sectionRef = useRef(null)
  const stackRef = useRef(null)
  const headRef = useRef(null)

  const inView = useInView(headRef, {
    once: true,
    margin: '-80px',
  })

  useEffect(() => {
    const section = sectionRef.current
    const stack = stackRef.current

    if (!section || !stack) return

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.cap-stack-card')

      if (!cards.length) return

      const prefersReducedMotion =
        window.matchMedia(
          '(prefers-reduced-motion: reduce)'
        ).matches

      /*
       * Every card begins underneath the visible card.
       *
       * The important part here is that we DON'T scale the cards.
       * They simply travel vertically upward and cover the previous
       * card, matching the reference effect.
       *
       * This offset is in viewport height, not card height — the
       * stack container is only one viewport tall, so a card needs
       * to move down by (at least) 100vh to be fully hidden below
       * it, regardless of the card's own (usually much shorter)
       * height. A plain `yPercent` (relative to the card's own
       * height) left a chunk of the incoming card peeking in at the
       * bottom before its transition even started.
       */
      gsap.set(cards, {
        y: '108vh',
        scale: 1,
        force3D: true,
        transformOrigin: 'center center',
      })

      /*
       * First card starts fully visible.
       */
      gsap.set(cards[0], {
        y: 0,
        scale: 1,
      })

      /*
       * Respect reduced-motion preferences.
       */
      if (prefersReducedMotion) {
        gsap.set(cards, {
          y: 0,
          scale: 1,
        })

        return
      }

      /*
       * Each card gets roughly one viewport of scroll distance.
       *
       * This is deliberately independent from the physical height
       * of the stack so the animation remains consistent across
       * desktop, tablet and mobile.
       */
      const transitionDistance = () =>
        Math.max(window.innerHeight * 0.92, 520)

      const tl = gsap.timeline({
        defaults: {
          ease: 'none',
        },

        scrollTrigger: {
          trigger: stack,

          /*
           * Start a little before the stack's top actually
           * reaches the top of the viewport, so the overlap
           * animation is already under way by the time it
           * locks into its pinned position instead of pinning
           * first and only then starting to move.
           */
          start: 'top 8%',

          end: () =>
            `+=${transitionDistance() * (cards.length - 1)}`,

          scrub: true,

          pin: true,

          pinSpacing: true,

          anticipatePin: 1,

          invalidateOnRefresh: true,
        },
      })

      /*
       * Animate each card vertically into place.
       *
       * Card 01 is already visible.
       *
       * Card 02:
       *   starts below Card 01
       *   moves vertically upward
       *   covers Card 01
       *
       * Card 03 then does the same to Card 02, etc.
       */
      cards.slice(1).forEach((card) => {
        /*
         * Small pause before the next card begins moving.
         * This gives each transition a little weight.
         */
        tl.to({}, {
          duration: 0.08,
        })

        tl.to(card, {
          y: 0,
          duration: 0.92,
        })
      })

      /*
       * Refresh after layout has settled.
       */
      requestAnimationFrame(() => {
        ScrollTrigger.refresh()
      })
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="capabilities"
      className="capabilities-section"
    >
      <div className="container">

        {/* HEADER */}

        <motion.div
          ref={headRef}
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
          className="cap-header"
        >
          <div>
            <div className="cap-label">
              <span />
              <span>Capabilities</span>
            </div>

            <h2>
              Systems built
              <br />
              <span>around you.</span>
            </h2>
          </div>

          <p>
            We don't sell tools. We combine the right
            technologies to build intelligent systems
            around the way your business actually works.
          </p>
        </motion.div>


        {/* STACK */}

        <div
          ref={stackRef}
          className="cap-stack"
        >
          {CATS.map((item, index) => (
            <CapabilityCard
              key={item.num}
              item={item}
              index={index}
            />
          ))}
        </div>

      </div>


      <style jsx global>{`

        /* ═══════════════════════════════════════════════
           SECTION
        ═══════════════════════════════════════════════ */

        .capabilities-section {
          position: relative;
          width: 100%;
          padding: clamp(90px, 12vw, 170px) 0;
          background: #ffffff;
          border-top: 1px solid var(--hair);
          overflow: visible;
        }


        /* ═══════════════════════════════════════════════
           HEADER
        ═══════════════════════════════════════════════ */

        .cap-header {
          display: grid;

          grid-template-columns:
            minmax(0, 1fr)
            minmax(280px, 0.55fr);

          gap: clamp(40px, 8vw, 120px);

          align-items: end;

          margin-bottom: clamp(
            60px,
            8vw,
            110px
          );
        }


        .cap-label {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 24px;
        }


        .cap-label span:first-child {
          width: 7px;
          height: 7px;

          flex: 0 0 7px;

          border-radius: 50%;

          background: #ff8500;
        }


        .cap-label span:last-child {
          font-family: 'Inter', sans-serif;

          font-size: 10px;

          font-weight: 700;

          letter-spacing: 0.14em;

          text-transform: uppercase;

          color: #ff8500;
        }


        .cap-header h2 {
          margin: 0;

          font-family: 'Onest', sans-serif;

          font-size: clamp(
            48px,
            7vw,
            96px
          );

          font-weight: 800;

          line-height: 0.88;

          letter-spacing: -0.075em;

          color: #0d0d0d;
        }


        .cap-header h2 span {
          color: #ff8500;
        }


        .cap-header p {
          margin: 0;

          max-width: 380px;

          font-family: 'Inter', sans-serif;

          font-size: clamp(
            14px,
            1.25vw,
            16px
          );

          line-height: 1.7;

          color: #5c3d2a;
        }


        /* ═══════════════════════════════════════════════
           STACK
        ═══════════════════════════════════════════════ */

        .cap-stack {
          position: relative;

          /*
           * The stack itself is only one viewport tall.
           *
           * ScrollTrigger handles the extra scroll distance
           * while the stack is pinned.
           */
          height: calc(100vh + 1px);

          overflow: visible;
        }


        /* ═══════════════════════════════════════════════
           CARDS
        ═══════════════════════════════════════════════ */

        .cap-stack-card {
          position: absolute;

          top: 0;
          left: 0;

          width: 100%;

          height: min(
            68vh,
            720px
          );

          min-height: 520px;

          display: grid;

          grid-template-columns:
            clamp(60px, 8vw, 110px)
            minmax(0, 1fr)
            minmax(240px, 0.75fr);

          gap: clamp(
            20px,
            4vw,
            70px
          );

          align-items: start;

          padding: clamp(
            38px,
            5vw,
            70px
          );

          border-radius: clamp(
            28px,
            3vw,
            42px
          );

          background: #f5efe8;

          border: 1px solid
            rgba(13, 13, 13, 0.08);

          box-shadow:
            0 20px 70px
            rgba(20, 16, 12, 0.14);

          overflow: hidden;

          /*
           * Critical for smooth scroll-driven movement.
           */
          will-change: transform;

          transform: translateZ(0);

          backface-visibility: hidden;
        }


        /*
         * Different card tones.
         */

        .cap-stack-card:nth-child(2) {
          background: #f2ebe3;
        }


        .cap-stack-card:nth-child(3) {
          background: #f7f0e9;
        }


        .cap-stack-card:nth-child(4) {
          background: #f1e9e1;
        }


        .cap-stack-card:nth-child(5) {
          background: #f6eee7;
        }


        .cap-stack-card:nth-child(6) {
          background: #efe7df;
        }


        /* ═══════════════════════════════════════════════
           NUMBER
        ═══════════════════════════════════════════════ */

        .cap-card-number {
          font-family: 'Onest', sans-serif;

          font-size: clamp(
            18px,
            1.5vw,
            22px
          );

          font-weight: 700;

          letter-spacing: -0.04em;

          color: #ff8500;
        }


        /* ═══════════════════════════════════════════════
           CONTENT
        ═══════════════════════════════════════════════ */

        .cap-card-content {
          min-width: 0;

          height: 100%;

          display: flex;

          flex-direction: column;
        }


        .cap-card-content h3 {
          margin: 0;

          max-width: 720px;

          font-family: 'Onest', sans-serif;

          font-size: clamp(
            40px,
            5vw,
            76px
          );

          font-weight: 800;

          line-height: 0.92;

          letter-spacing: -0.06em;

          color: #0d0d0d;

          overflow-wrap: break-word;
        }


        .cap-card-content p {
          margin: auto 0 0;

          max-width: 470px;

          font-family: 'Inter', sans-serif;

          font-size: clamp(
            14px,
            1.2vw,
            18px
          );

          line-height: 1.65;

          color: #5c3d2a;
        }


        /* ═══════════════════════════════════════════════
           TOOLS
        ═══════════════════════════════════════════════ */

        .cap-tools {
          display: flex;

          flex-wrap: wrap;

          gap: 9px 16px;

          margin-top: 24px;
        }


        .cap-tool {
          display: inline-flex;

          align-items: center;

          gap: 7px;

          font-family: 'Inter', sans-serif;

          font-size: 11px;

          font-weight: 600;

          color: #0d0d0d;

          opacity: 0.65;

          white-space: nowrap;
        }


        .cap-tool img {
          display: block;

          width: 16px;
          height: 16px;

          object-fit: contain;
        }


        /* ═══════════════════════════════════════════════
           ARROW
        ═══════════════════════════════════════════════ */

        .cap-card-arrow {
          position: absolute;

          top: clamp(
            26px,
            4vw,
            40px
          );

          right: clamp(
            26px,
            4vw,
            40px
          );

          font-family: 'Inter', sans-serif;

          font-size: clamp(
            22px,
            2vw,
            28px
          );

          line-height: 1;

          color: #ff8500;
        }


        /* ═══════════════════════════════════════════════
           LARGE TABLET
        ═══════════════════════════════════════════════ */

        @media (max-width: 1100px) {

          .cap-header {
            grid-template-columns:
              1fr
              0.65fr;

            gap: 50px;
          }


          .cap-stack {
            height: calc(100vh + 1px);
          }


          .cap-stack-card {
            height: min(
              66vh,
              680px
            );

            grid-template-columns:
              55px
              minmax(0, 1fr)
              minmax(190px, 0.7fr);

            gap: 28px;

            padding: 42px;
          }


          .cap-card-content h3 {
            font-size: clamp(
              38px,
              5.5vw,
              64px
            );
          }
        }


        /* ═══════════════════════════════════════════════
           TABLET
        ═══════════════════════════════════════════════ */

        @media (max-width: 850px) {

          .capabilities-section {
            padding: 100px 0;
          }


          .cap-header {
            grid-template-columns: 1fr;

            gap: 30px;

            margin-bottom: 65px;
          }


          .cap-header p {
            max-width: 560px;
          }


          .cap-stack {
            height: calc(100vh + 1px);
          }


          .cap-stack-card {
            height: 64vh;

            min-height: 500px;

            grid-template-columns:
              50px
              minmax(0, 1fr);

            gap: 24px;

            padding: 36px;

            border-radius: 32px;
          }


          .cap-card-content {
            grid-column: 2;
          }


          .cap-card-content h3 {
            max-width: 600px;

            font-size: clamp(
              38px,
              7.5vw,
              60px
            );
          }


          .cap-card-content p {
            margin-top: 45px;
          }


          .cap-card-arrow {
            top: 30px;
            right: 30px;
          }
        }


        /* ═══════════════════════════════════════════════
           MOBILE
        ═══════════════════════════════════════════════ */

        @media (max-width: 560px) {

          .capabilities-section {
            padding: 82px 0 90px;
          }


          .cap-header {
            gap: 26px;

            margin-bottom: 52px;
          }


          .cap-label {
            gap: 8px;

            margin-bottom: 19px;
          }


          .cap-label span:first-child {
            width: 6px;
            height: 6px;

            flex-basis: 6px;
          }


          .cap-label span:last-child {
            font-size: 9px;
          }


          .cap-header h2 {
            font-size: clamp(
              46px,
              13vw,
              62px
            );

            line-height: 0.9;
          }


          .cap-header p {
            max-width: 100%;

            font-size: 14px;

            line-height: 1.65;
          }


          .cap-stack {
            height: calc(100vh + 1px);
          }


          /* CARD */

          .cap-stack-card {
            height: 67vh;

            min-height: 470px;

            display: flex;

            flex-direction: column;

            gap: 22px;

            padding: 27px;

            border-radius: 26px;
          }


          /* NUMBER */

          .cap-card-number {
            font-size: 16px;
          }


          /* CONTENT */

          .cap-card-content {
            width: 100%;

            height: auto;

            flex: 1;

            min-height: 0;
          }


          .cap-card-content h3 {
            max-width: 100%;

            font-size: clamp(
              35px,
              10.8vw,
              52px
            );

            line-height: 0.91;

            letter-spacing: -0.06em;

            padding-right: 22px;
          }


          .cap-card-content p {
            margin-top: auto;

            padding-top: 30px;

            max-width: 100%;

            font-size: 14px;

            line-height: 1.55;
          }


          /* TOOLS */

          .cap-tools {
            gap: 9px 13px;

            margin-top: 18px;

            padding-right: 5px;
          }


          .cap-tool {
            font-size: 9px;

            gap: 5px;
          }


          .cap-tool img {
            width: 14px;
            height: 14px;
          }


          /* ARROW */

          .cap-card-arrow {
            top: 26px;

            right: 25px;

            font-size: 23px;
          }
        }


        /* ═══════════════════════════════════════════════
           SMALL MOBILE
        ═══════════════════════════════════════════════ */

        @media (max-width: 390px) {

          .capabilities-section {
            padding-top: 70px;
          }


          .cap-header {
            margin-bottom: 44px;
          }


          .cap-header h2 {
            font-size: 43px;
          }


          .cap-header p {
            font-size: 13px;
          }


          .cap-stack {
            height: calc(100vh + 1px);
          }


          .cap-stack-card {
            height: 66vh;

            min-height: 445px;

            padding: 23px;

            border-radius: 22px;
          }


          .cap-card-content h3 {
            font-size: clamp(
              32px,
              10.5vw,
              45px
            );
          }


          .cap-card-content p {
            font-size: 13px;

            line-height: 1.5;
          }


          .cap-tools {
            gap: 8px 10px;
          }


          .cap-tool {
            font-size: 8px;
          }


          .cap-tool img {
            width: 13px;
            height: 13px;
          }


          .cap-card-arrow {
            top: 22px;

            right: 22px;

            font-size: 21px;
          }
        }


        /* ═══════════════════════════════════════════════
           VERY SHORT MOBILE SCREENS
        ═══════════════════════════════════════════════ */

        @media (max-width: 560px) and (max-height: 700px) {

          .cap-stack-card {
            height: 72vh;
          }


          .cap-stack {
            height: calc(100vh + 1px);
          }
        }


        /* ═══════════════════════════════════════════════
           REDUCED MOTION
        ═══════════════════════════════════════════════ */

        @media (prefers-reduced-motion: reduce) {

          .cap-stack-card {
            transform: none !important;
          }

        }

      `}</style>
    </section>
  )
}