import Head from 'next/head'
import Link from 'next/link'
import { motion, useScroll, useSpring } from 'framer-motion'

import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import CaseStudyHero from '../../components/CaseStudyHero'
import CaseStudySection from '../../components/CaseStudySection'
import CaseStudyImage from '../../components/CaseStudyImage'
import WhatsAppFloat from '../../components/WhatsAppFloat'
import { caseStudies } from '../../data/caseStudies'


/* ================================================================
   STATIC PATHS
================================================================ */

export async function getStaticPaths() {
  return {
    paths: caseStudies.map((study) => ({
      params: {
        slug: study.slug,
      },
    })),
    fallback: false,
  }
}


/* ================================================================
   STATIC PROPS
================================================================ */

export async function getStaticProps({ params }) {
  const study =
    caseStudies.find(
      (item) => item.slug === params.slug
    ) || null

  const index = caseStudies.findIndex(
    (item) => item.slug === params.slug
  )

  const next =
    index >= 0
      ? caseStudies[
          (index + 1) % caseStudies.length
        ]
      : null

  return {
    props: {
      study,
      next,
    },
  }
}


/* ================================================================
   READING PROGRESS
================================================================ */

function ReadingProgress() {
  const { scrollYProgress } = useScroll()

  const scaleX = useSpring(
    scrollYProgress,
    {
      stiffness: 120,
      damping: 28,
      mass: 0.3,
    }
  )

  return (
    <motion.div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: 2,
        zIndex: 2000,

        transformOrigin: 'left',

        scaleX,

        background: '#ff8500',
      }}
    />
  )
}


/* ================================================================
   404
================================================================ */

function NotFound() {
  return (
    <>
      <Head>
        <title>
          Not Found — Aumatic.AI
        </title>
      </Head>

      <div className="not-found">

        <div className="not-found-mark">
          404
        </div>

        <div className="not-found-content">

          <span className="not-found-label">
            ERROR / 404
          </span>

          <h1>
            Case study
            <br />
            not found.
          </h1>

          <p>
            The page you're looking for doesn't exist.
          </p>

          <Link
            href="/#case-studies"
            className="not-found-button"
          >
            ← BACK TO CASE STUDIES
          </Link>

        </div>
      </div>


      <style jsx>{`

        .not-found {
          min-height: 100vh;

          background: #ffffff;

          color: #0d0d0d;

          display: flex;

          align-items: center;

          justify-content: center;

          padding: 40px;

          box-sizing: border-box;
        }


        .not-found-content {
          width: min(
            900px,
            100%
          );
        }


        .not-found-mark {
          position: absolute;

          top: 30px;

          right: 40px;

          font-size: 11px;

          font-weight: 800;

          letter-spacing: 0.12em;

          color: #ff8500;
        }


        .not-found-label {
          display: block;

          margin-bottom: 25px;

          font-size: 11px;

          font-weight: 800;

          letter-spacing: 0.12em;

          color: #ff8500;
        }


        .not-found h1 {
          margin: 0;

          font-family:
            'Inter',
            sans-serif;

          font-size:
            clamp(
              60px,
              10vw,
              150px
            );

          font-weight: 900;

          line-height: 0.82;

          letter-spacing: -0.09em;

          text-transform: uppercase;
        }


        .not-found p {
          margin:
            35px
            0
            28px;

          font-size: 16px;

          color: #555555;
        }


        .not-found-button {
          display: inline-flex;

          align-items: center;

          min-height: 48px;

          padding:
            0
            20px;

          box-sizing: border-box;

          background: #ff8500;

          border: 1px solid #ff8500;

          color: #0d0d0d;

          text-decoration: none;

          font-size: 11px;

          font-weight: 800;

          letter-spacing: -0.01em;

          transition:
            background 0.2s ease,
            color 0.2s ease;
        }


        .not-found-button:hover {
          background: #0d0d0d;

          color: #ffffff;
        }

      `}</style>
    </>
  )
}


/* ================================================================
   CASE STUDY PAGE
================================================================ */

export default function CaseStudyPage({
  study,
  next,
}) {

  if (!study) {
    return <NotFound />
  }


  /* --------------------------------------------------------------
     BUILD CONTENT ITEMS
  -------------------------------------------------------------- */

  const images =
    study.images ||
    (study.image
      ? [study.image]
      : [])


  const items = study.sections
    ? study.sections.reduce(
        (accumulator, section, index) => {

          accumulator.push({
            kind: 'section',
            data: section,
            index,
          })


          if (
            index === 1 &&
            images.length > 1
          ) {
            accumulator.push({
              kind: 'image',
              label: 'System Overview',
              src: images[1],
            })
          }


          if (
            index === 2 &&
            images.length > 2
          ) {
            accumulator.push({
              kind: 'image',
              label: 'Workflow Detail',
              src: images[2],
            })
          }


          return accumulator
        },
        []
      )
    : []


  return (
    <>
      {/* ==========================================================
          HEAD
      ========================================================== */}

      <Head>

        <title>
          {`${study.title} — Aumatic.AI`}
        </title>

        <meta
          name="description"
          content={
            study.description ||
            study.summary
          }
        />

        <meta
          property="og:title"
          content={
            `${study.title} — Aumatic.AI`
          }
        />

        <meta
          property="og:description"
          content={
            study.description ||
            study.summary
          }
        />

        <meta
          property="og:type"
          content="article"
        />

        <link
          rel="icon"
          href="/aumatic_favicon.png"
        />

      </Head>


      {/* ==========================================================
          READING PROGRESS
      ========================================================== */}

      <ReadingProgress />


      {/* ==========================================================
          PAGE
      ========================================================== */}

      <div className="case-study-page">

        {/* --------------------------------------------------------
            NAVBAR
        -------------------------------------------------------- */}

        <Navbar />


        {/* --------------------------------------------------------
            HERO
        -------------------------------------------------------- */}

        <main>

          <CaseStudyHero
            study={study}
          />


          {/* ------------------------------------------------------
              LEAD IMAGE
          ------------------------------------------------------ */}

          {images[0] && (
            <section className="lead-image-section">

              <CaseStudyImage
                label="Workflow Architecture"
                src={images[0]}
              />

            </section>
          )}


          {/* ------------------------------------------------------
              CONTENT
          ------------------------------------------------------ */}

          {items.map(
            (item, index) => {

              if (
                item.kind === 'section'
              ) {
                return (
                  <CaseStudySection
                    key={`section-${index}`}
                    section={item.data}
                    index={item.index}
                  />
                )
              }


              return (
                <CaseStudyImage
                  key={`image-${index}`}
                  label={item.label}
                  src={item.src}
                />
              )
            }
          )}


          {/* ------------------------------------------------------
              FALLBACK
          ------------------------------------------------------ */}

          {!study.sections && (
            <section className="fallback-content">

              <div className="content-number">
                01
              </div>

              <p>
                {
                  study.description ||
                  study.summary
                }
              </p>

            </section>
          )}


          {/* ======================================================
              CTA
          ====================================================== */}

          <section className="case-study-cta-section">

            <motion.div
              className="case-study-cta"
              initial={{
                opacity: 0,
                y: 30,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
                margin: '-80px',
              }}
              transition={{
                duration: 0.8,
                ease: [
                  0.22,
                  1,
                  0.36,
                  1,
                ],
              }}
            >

              {/* ------------------------------------------------
                  LEFT ORANGE PANEL
              ------------------------------------------------ */}

              <div className="cta-main">

                <span className="cta-label">
                  LIKE WHAT YOU SEE?
                </span>

                <h2>
                  Let's build the
                  <br />

                  <span>
                    automation
                  </span>

                  <br />

                  that moves your
                  numbers.
                </h2>

              </div>


              {/* ------------------------------------------------
                  RIGHT WHITE PANEL
              ------------------------------------------------ */}

              <div className="cta-side">

                <p>
                  Free 30-min strategy call —
                  we leave you with a clear
                  automation map even if we
                  never work together.
                </p>


                <a
                  href="https://cal.com/chandan-kumar-zhrofj/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cta-button"
                >
                  BOOK A FREE CALL

                  <span>
                    ↗
                  </span>
                </a>


                {next && (
                  <Link
                    href={`/case-studies/${next.slug}`}
                    className="next-study"
                  >
                    <span>
                      NEXT CASE STUDY
                    </span>

                    <strong>
                      {
                        next.title.length > 45
                          ? next.title.slice(
                              0,
                              45
                            ) + '…'
                          : next.title
                      }
                    </strong>

                    <span className="next-arrow">
                      →
                    </span>
                  </Link>
                )}

              </div>

            </motion.div>

          </section>

        </main>


        {/* --------------------------------------------------------
            FOOTER
        -------------------------------------------------------- */}

        <Footer />


        {/* --------------------------------------------------------
            WHATSAPP
        -------------------------------------------------------- */}

        <WhatsAppFloat />

      </div>


      {/* ==========================================================
          GLOBAL PAGE STYLES
      ========================================================== */}

      <style jsx global>{`

        /* ========================================================
           PAGE RESET
        ======================================================== */

        .case-study-page {

          --orange: #ff8500;
          --black: #0d0d0d;
          --gray: #555555;
          --line: #0d0d0d;

          position: relative;

          width: 100%;

          min-height: 100vh;

          background: #ffffff;

          color: var(--black);

          overflow: hidden;
        }


        .case-study-page main {
          position: relative;

          width: 100%;

          background: #ffffff;
        }


        /* ========================================================
           REMOVE OLD ATMOSPHERIC EFFECTS
        ======================================================== */

        .case-study-page .anim-blob1,
        .case-study-page .anim-blob2 {
          display: none !important;
        }


        /* ========================================================
           LEAD IMAGE
        ======================================================== */

        .lead-image-section {

          width: 100%;

          padding:
            20px
            clamp(
              20px,
              5vw,
              72px
            )
            20px;

          box-sizing: border-box;
        }


        /* ========================================================
           FALLBACK
        ======================================================== */

        .fallback-content {

          width: min(
            1100px,
            calc(100% - 40px)
          );

          margin: 0 auto;

          padding:
            100px
            0;

          display: grid;

          grid-template-columns:
            100px
            1fr;

          gap: 50px;

          border-top:
            1px solid var(--black);
        }


        .content-number {

          font-size: 11px;

          font-weight: 800;

          letter-spacing: 0.1em;

          color: var(--orange);
        }


        .fallback-content p {

          max-width: 750px;

          margin: 0;

          font-size:
            clamp(
              20px,
              2vw,
              28px
            );

          line-height: 1.35;

          letter-spacing: -0.04em;

          color: var(--black);
        }


        /* ========================================================
           CTA SECTION
        ======================================================== */

        .case-study-cta-section {

          width: 100%;

          padding:
            80px
            clamp(
              20px,
              5vw,
              72px
            )
            110px;

          box-sizing: border-box;
        }


        .case-study-cta {

          width: 100%;

          max-width: 1180px;

          min-height: 420px;

          margin: 0 auto;

          display: grid;

          grid-template-columns:
            1.25fr
            0.75fr;

          border:
            1px solid var(--black);

          box-sizing: border-box;
        }


        /* ========================================================
           CTA ORANGE SIDE
        ======================================================== */

        .cta-main {

          position: relative;

          display: flex;

          flex-direction: column;

          justify-content: space-between;

          padding:
            clamp(
              30px,
              5vw,
              65px
            );

          background: var(--orange);

          color: var(--black);

          min-height: 420px;

          box-sizing: border-box;
        }


        .cta-main::after {

          content: '→';

          position: absolute;

          right: 42px;

          bottom: 32px;

          font-size: 32px;

          font-weight: 400;
        }


        .cta-label {

          font-size: 10px;

          font-weight: 800;

          letter-spacing: 0.13em;

          text-transform: uppercase;
        }


        .cta-main h2 {

          margin: auto 0 0;

          font-family:
            'Inter',
            sans-serif;

          font-size:
            clamp(
              40px,
              5vw,
              78px
            );

          font-weight: 900;

          line-height: 0.86;

          letter-spacing: -0.075em;

          text-transform: uppercase;
        }


        .cta-main h2 span {

          color: #ffffff;
        }


        /* ========================================================
           CTA WHITE SIDE
        ======================================================== */

        .cta-side {

          display: flex;

          flex-direction: column;

          justify-content: space-between;

          padding:
            clamp(
              30px,
              4vw,
              52px
            );

          background: #ffffff;

          border-left:
            1px solid var(--black);

          box-sizing: border-box;
        }


        .cta-side > p {

          max-width: 330px;

          margin: 0;

          font-size:
            clamp(
              15px,
              1.3vw,
              18px
            );

          line-height: 1.5;

          letter-spacing: -0.025em;

          color: #444444;
        }


        /* ========================================================
           CTA BUTTON
        ======================================================== */

        .cta-button {

          display: inline-flex;

          align-items: center;

          justify-content: space-between;

          width: 100%;

          min-height: 56px;

          box-sizing: border-box;

          padding:
            0
            18px;

          background: var(--orange);

          border:
            1px solid var(--orange);

          color: var(--black);

          text-decoration: none;

          font-size: 11px;

          font-weight: 900;

          letter-spacing: -0.01em;

          transition:
            background 0.2s ease,
            color 0.2s ease;
        }


        .cta-button:hover {

          background: var(--black);

          border-color: var(--black);

          color: #ffffff;
        }


        .cta-button span {

          font-size: 19px;

          font-weight: 400;
        }


        /* ========================================================
           NEXT STUDY
        ======================================================== */

        .next-study {

          position: relative;

          display: flex;

          flex-direction: column;

          gap: 7px;

          padding-top: 25px;

          border-top:
            1px solid var(--black);

          color: var(--black);

          text-decoration: none;

          transition:
            color 0.2s ease;
        }


        .next-study > span:first-child {

          font-size: 9px;

          font-weight: 800;

          letter-spacing: 0.12em;

          color: var(--orange);
        }


        .next-study strong {

          padding-right: 25px;

          font-size: 14px;

          font-weight: 700;

          line-height: 1.35;

          letter-spacing: -0.02em;
        }


        .next-arrow {

          position: absolute;

          right: 0;

          bottom: 2px;

          font-size: 20px;

          font-weight: 400;
        }


        .next-study:hover {

          color: var(--orange);
        }


        /* ========================================================
           TABLET
        ======================================================== */

        @media (max-width: 900px) {

          .case-study-cta {

            grid-template-columns:
              1fr
              0.7fr;
          }


          .cta-main h2 {

            font-size:
              clamp(
                38px,
                6vw,
                62px
              );
          }


          .case-study-cta-section {

            padding-top: 60px;

            padding-bottom: 80px;
          }

        }


        /* ========================================================
           MOBILE
        ======================================================== */

        @media (max-width: 700px) {

          .lead-image-section {

            padding:
              12px
              16px
              12px;
          }


          .fallback-content {

            width:
              calc(100% - 32px);

            padding:
              60px
              0;

            display: block;
          }


          .content-number {

            margin-bottom: 25px;
          }


          .fallback-content p {

            font-size: 20px;
          }


          /* CTA */

          .case-study-cta-section {

            padding:
              50px
              16px
              70px;
          }


          .case-study-cta {

            grid-template-columns: 1fr;

            min-height: auto;
          }


          .cta-main {

            min-height: 350px;

            padding: 30px;
          }


          .cta-main h2 {

            font-size:
              clamp(
                42px,
                13vw,
                70px
              );

            line-height: 0.86;
          }


          .cta-main::after {

            right: 25px;

            bottom: 24px;
          }


          .cta-side {

            min-height: 310px;

            border-left: 0;

            border-top:
              1px solid var(--black);

            padding: 30px;
          }


          .cta-side > p {

            font-size: 15px;
          }

        }


        /* ========================================================
           SMALL MOBILE
        ======================================================== */

        @media (max-width: 430px) {

          .cta-main {

            min-height: 300px;

            padding: 24px;
          }


          .cta-main h2 {

            font-size: 40px;
          }


          .cta-side {

            padding: 24px;

            min-height: 290px;
          }


          .case-study-cta-section {

            padding:
              40px
              16px
              60px;
          }

        }

      `}</style>
    </>
  )
}