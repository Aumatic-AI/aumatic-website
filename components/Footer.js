import { useRouter } from 'next/router'
import { motion } from 'framer-motion'
import { BOOKING_LINK } from '../data/constants'

const COLS = [
  {
    title: 'Capabilities',
    links: [
      { label: 'AI & ML', hash: 'capabilities' },
      { label: 'Automation', hash: 'capabilities' },
      { label: 'CRM & Ops', hash: 'capabilities' },
      { label: 'Engineering', hash: 'capabilities' },
      { label: 'Data', hash: 'capabilities' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'Process', hash: 'process' },
      { label: 'Why Us', hash: 'why-us' },
      { label: 'Case Studies', hash: 'case-studies' },
      { label: 'Impact', hash: 'impact' },
      { label: 'FAQ', hash: 'faq' },
    ],
  },
  {
    title: 'Connect',
    links: [
      {
        label: 'Book a Call',
        href: BOOKING_LINK,
      },
      {
        label: 'WhatsApp',
        href: 'https://wa.me/919849884501',
      },
    ],
  },
]

export default function Footer() {
  const year = new Date().getFullYear()

  const router = useRouter()
  const isHome = router.pathname === '/'

  const hashHref = hash => (isHome ? `#${hash}` : `/#${hash}`)

  return (
    <footer
      style={{
        position: 'relative',
        background: '#FFFFFF',
        borderTop: '1px solid var(--hair)',
        overflow: 'hidden',
      }}
    >
      <div
        className="container"
        style={{
          position: 'relative',
          padding:
            'clamp(80px, 10vw, 140px) clamp(20px, 3vw, 40px) 100px',
        }}
      >

        {/* ───────────────── CTA ───────────────── */}

        <motion.div
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
            margin: '-70px',
          }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="footer-cta"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            gap: 50,
            paddingBottom: 'clamp(70px, 9vw, 120px)',
            borderBottom: '1px solid var(--hair)',
          }}
        >

          {/* Heading */}

          <div>
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
                Start a conversation
              </span>
            </div>

            <h2
              style={{
                margin: 0,
                fontFamily: "'Onest', sans-serif",
                fontSize: 'clamp(54px, 8vw, 110px)',
                fontWeight: 800,
                lineHeight: 0.84,
                letterSpacing: '-0.075em',
                color: '#0D0D0D',
              }}
            >
              Ready when
              <br />
              <span style={{ color: '#FF8500' }}>
                you are.
              </span>
            </h2>
          </div>

          {/* CTA */}

          <div
            style={{
              maxWidth: 300,
              paddingBottom: 4,
            }}
          >
            <p
              style={{
                margin: '0 0 24px',
                fontFamily: "'Inter', sans-serif",
                fontSize: 14,
                lineHeight: 1.65,
                color: '#5C3D2A',
              }}
            >
              Tell us what is slowing your team down.
              We'll show you what can be automated.
            </p>

            <a
              href={BOOKING_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="footer-cta-link"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 12,
                fontFamily: "'Inter', sans-serif",
                fontSize: 14,
                fontWeight: 700,
                color: '#0D0D0D',
                textDecoration: 'none',
                borderBottom: '1px solid #0D0D0D',
                paddingBottom: 8,
              }}
            >
              Book a free strategy call

              <span
                className="footer-cta-arrow"
                style={{
                  fontSize: 18,
                  lineHeight: 1,
                  transition:
                    'transform 0.35s cubic-bezier(0.22,1,0.36,1)',
                }}
              >
                ↗
              </span>
            </a>
          </div>
        </motion.div>


        {/* ───────────────── NAVIGATION ───────────────── */}

        <div
          className="footer-nav"
          style={{
            display: 'grid',
            gridTemplateColumns: '2fr 1fr 1fr 1fr',
            gap: 'clamp(30px, 5vw, 80px)',
            padding:
              'clamp(50px, 6vw, 75px) 0',
            borderBottom: '1px solid var(--hair)',
          }}
        >

          {/* Brand */}

          <div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 9,
                marginBottom: 18,
              }}
            >
              <img
                src="/aumatic_img.png"
                width="28"
                height="28"
                alt="Aumatic.AI"
                style={{
                  display: 'block',
                  objectFit: 'contain',
                }}
              />

              <span
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: 18,
                  fontWeight: 900,
                  color: '#0D0D0D',
                  letterSpacing: -0.4,
                }}
              >
                Aumatic.
                <span style={{ color: '#FF8500' }}>
                  AI
                </span>
              </span>
            </div>

            <p
              style={{
                margin: 0,
                maxWidth: 280,
                fontFamily: "'Inter', sans-serif",
                fontSize: 13,
                lineHeight: 1.7,
                color: '#77716D',
              }}
            >
              We build and deploy intelligent automation
              for forward-thinking businesses.
            </p>
          </div>


          {/* Link columns */}

          {COLS.map((col) => (
            <div key={col.title}>

              <div
                style={{
                  marginBottom: 18,
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: '#FF8500',
                }}
              >
                {col.title}
              </div>

              <ul
                style={{
                  listStyle: 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 10,
                  padding: 0,
                  margin: 0,
                }}
              >
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={
                        link.href ?? hashHref(link.hash)
                      }
                      {...(link.href
                        ? {
                            target: '_blank',
                            rel: 'noopener noreferrer',
                          }
                        : {})}
                      className="footer-link"
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: 13,
                        color: '#77716D',
                        textDecoration: 'none',
                        transition:
                          'color 0.25s ease',
                      }}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>

            </div>
          ))}
        </div>


        


        {/* ───────────────── BOTTOM BAR ───────────────── */}

        <div
          className="footer-bottom"
          style={{
            borderTop: '1px solid var(--hair)',
            paddingTop: 20,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 20,
            flexWrap: 'wrap',
          }}
        >
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 11,
              color: '#99938E',
            }}
          >
            © {year} Aumatic.AI
          </span>

          <div
            style={{
              display: 'flex',
              gap: 24,
              flexWrap: 'wrap',
            }}
          >
            {['Privacy', 'Terms', 'Cookies'].map(
              (link) => (
                <a
                  key={link}
                  href="#"
                  className="footer-legal"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 11,
                    color: '#99938E',
                    textDecoration: 'none',
                    transition:
                      'color 0.25s ease',
                  }}
                >
                  {link}
                </a>
              )
            )}
          </div>
        </div>

      </div>


      {/* ───────────────── RESPONSIVE ───────────────── */}

      <style>{`

        .footer-cta-link:hover {
          color: #FF8500 !important;
          border-color: #FF8500 !important;
        }

        .footer-cta-link:hover .footer-cta-arrow {
          transform: translate(4px, -4px);
        }

        .footer-link:hover {
          color: #0D0D0D !important;
        }

        .footer-legal:hover {
          color: #FF8500 !important;
        }


        @media (max-width: 900px) {

          .footer-cta {
            align-items: flex-start !important;
            flex-direction: column !important;
            gap: 40px !important;
          }

          .footer-nav {
            grid-template-columns: 1fr 1fr !important;
          }

        }


        @media (max-width: 560px) {

          .footer-nav {
            grid-template-columns: 1fr !important;
          }

          .footer-wordmark {
            font-size: 23vw !important;
            letter-spacing: -0.08em !important;
          }

          .footer-bottom {
            align-items: flex-start !important;
            flex-direction: column !important;
          }

        }

      `}</style>
    </footer>
  )
}