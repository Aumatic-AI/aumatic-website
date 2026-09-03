import Link from 'next/link'
import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const ORANGE = '#FF8500'
const BLACK = '#0D0D0D'
const WHITE = '#FFFFFF'
const MUTED = '#77716D'

export default function CaseStudyCard({ study, index }) {
  const ref = useRef(null)

  const inView = useInView(ref, {
    once: true,
    margin: '-60px',
  })

  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      ref={ref}
      initial={{
        opacity: 0,
        y: 28,
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
        delay: index * 0.06,
        ease: [0.22, 1, 0.36, 1],
      }}
      style={{
        height: '100%',
      }}
    >
      <Link
        href={`/case-studies/${study.slug}`}
        style={{
          display: 'block',
          height: '100%',
          textDecoration: 'none',
        }}
      >
        <article
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          style={{
            height: '100%',

            display: 'flex',
            flexDirection: 'column',

            background: WHITE,

            border: 'none',
            borderRadius: 0,
            outline: 'none',

            boxShadow: 'none',
            filter: 'none',

            overflow: 'hidden',

            cursor: 'pointer',

            transform: 'none',
          }}
        >

          {/* =====================================
              IMAGE
          ====================================== */}

          <div
            style={{
              position: 'relative',

              width: '100%',
              aspectRatio: '16 / 9',

              flexShrink: 0,

              overflow: 'hidden',

              background: BLACK,

              borderRadius: 0,
            }}
          >
            {study.image ? (
              <img
                src={study.image}
                alt={study.title}
                style={{
                  display: 'block',

                  width: '100%',
                  height: '100%',

                  objectFit: 'cover',

                  borderRadius: 0,

                  transform: hovered
                    ? 'scale(1.025)'
                    : 'scale(1)',

                  transition:
                    'transform 0.55s cubic-bezier(0.22, 1, 0.36, 1)',
                }}
              />
            ) : (
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  background: BLACK,
                }}
              />
            )}

            {/* Category */}

            <div
              style={{
                position: 'absolute',

                top: 14,
                left: 14,

                padding: '7px 9px',

                borderRadius: 0,
                border: 'none',

                background: ORANGE,

                color: WHITE,

                fontFamily:
                  "'Inter', sans-serif",

                fontSize: 9,
                fontWeight: 700,

                letterSpacing: '0.12em',

                lineHeight: 1,

                textTransform: 'uppercase',
              }}
            >
              {study.category || study.industry}
            </div>
          </div>


          {/* =====================================
              CONTENT
          ====================================== */}

          <div
            style={{
              flex: 1,

              display: 'flex',
              flexDirection: 'column',

              padding: '22px 22px 22px',

              gap: 12,

              background: WHITE,

              color: BLACK,

              borderRadius: 0,

              border: 'none',

              boxShadow: 'none',
            }}
          >

            {/* Date / Industry */}

            <div
              style={{
                fontFamily:
                  "'Inter', sans-serif",

                fontSize: 10,

                fontWeight: 600,

                letterSpacing: '0.08em',

                textTransform: 'uppercase',

                color: MUTED,
              }}
            >
              {study.date}

              <span
                style={{
                  margin: '0 7px',

                  color: ORANGE,

                  opacity: 1,
                }}
              >
                /
              </span>

              {study.industry}
            </div>


            {/* Title */}

            <h3
              style={{
                margin: 0,

                fontFamily:
                  "'Onest', sans-serif",

                fontSize:
                  'clamp(20px, 1.8vw, 24px)',

                fontWeight: 800,

                letterSpacing: '-0.035em',

                lineHeight: 1.12,

                color: BLACK,
              }}
            >
              {study.title}
            </h3>


            {/* Summary */}

            <p
              style={{
                margin: 0,

                fontFamily:
                  "'Inter', sans-serif",

                fontSize: 13,

                lineHeight: 1.6,

                color: '#5F5A56',

                display: '-webkit-box',

                WebkitLineClamp: 3,

                WebkitBoxOrient: 'vertical',

                overflow: 'hidden',

                flex: 1,
              }}
            >
              {study.summary}
            </p>


            {/* =====================================
                BOTTOM
            ====================================== */}

            <div
              style={{
                display: 'flex',

                alignItems: 'center',

                justifyContent: 'space-between',

                gap: 16,

                paddingTop: 15,

                marginTop: 4,

                borderTop:
                  `1px solid ${ORANGE}`,
              }}
            >

              {/* Tags */}

              <div
                style={{
                  display: 'flex',

                  alignItems: 'center',

                  gap: 5,

                  flexWrap: 'wrap',

                  maxWidth: '65%',
                }}
              >
                {study.tags
                  ?.slice(0, 2)
                  .map((tag) => (
                    <span
                      key={tag}
                      style={{
                        display: 'inline-flex',

                        alignItems: 'center',

                        padding:
                          '5px 7px',

                        borderRadius: 0,

                        border:
                          `1px solid ${ORANGE}`,

                        background: WHITE,

                        color: ORANGE,

                        fontFamily:
                          "'Inter', sans-serif",

                        fontSize: 9,

                        fontWeight: 600,

                        letterSpacing:
                          '0.02em',
                      }}
                    >
                      {tag}
                    </span>
                  ))}
              </div>


              {/* Orange CTA */}

              <span
                style={{
                  display: 'inline-flex',

                  alignItems: 'center',

                  justifyContent: 'center',

                  gap: hovered ? 8 : 6,

                  flexShrink: 0,

                  padding:
                    '8px 10px',

                  borderRadius: 0,

                  background: ORANGE,

                  color: WHITE,

                  fontFamily:
                    "'Inter', sans-serif",

                  fontSize: 10,

                  fontWeight: 700,

                  lineHeight: 1,

                  whiteSpace: 'nowrap',

                  transition:
                    'gap 0.2s ease',
                }}
              >
                Read case

                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 16 16"
                  fill="none"
                  aria-hidden="true"
                  style={{
                    transform: hovered
                      ? 'translateX(2px)'
                      : 'translateX(0)',

                    transition:
                      'transform 0.2s ease',
                  }}
                >
                  <path
                    d="M3 8H13M13 8L9 4M13 8L9 12"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>

            </div>

          </div>

        </article>
      </Link>
    </motion.div>
  )
}