import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { motion, AnimatePresence } from 'framer-motion'
import { BOOKING_LINK } from '../data/constants'

const NAV_LINKS = [
  { label: 'Process', hash: 'process' },
  { label: 'Capabilities', hash: 'capabilities' },
  { label: 'Work', hash: 'case-studies' },
  { label: 'Impact', hash: 'impact' },
  { label: 'FAQ', hash: 'faq' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  const router = useRouter()
  const isHome = router.pathname === '/'

  const links = NAV_LINKS.map((link) => ({
    label: link.label,
    href: isHome ? `#${link.hash}` : `/#${link.hash}`,
  }))

  /* ------------------------------------------------------------
     Scroll state
  ------------------------------------------------------------ */

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }

    handleScroll()

    window.addEventListener('scroll', handleScroll, {
      passive: true,
    })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  /* ------------------------------------------------------------
     Lock body when mobile menu is open
  ------------------------------------------------------------ */

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''

    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  /* ------------------------------------------------------------
     Close menu when route changes
  ------------------------------------------------------------ */

  useEffect(() => {
    setOpen(false)
  }, [router.pathname])

  return (
    <>
      {/* ========================================================
          NAVBAR
      ======================================================== */}

      <motion.header
        className="site-navbar"
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{
          duration: 0.7,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <div
          className={`navbar-inner ${
            scrolled ? 'navbar-scrolled' : ''
          }`}
        >

          {/* ----------------------------------------------------
              LOGO
          ---------------------------------------------------- */}

          <a
            href="/"
            className="navbar-logo"
            aria-label="Aumatic AI home"
          >
            <img
              src="/aumatic_img.png"
              width="28"
              height="28"
              alt=""
            />

            <span>
              Aumatic.
              <strong>AI</strong>
            </span>
          </a>


          {/* ----------------------------------------------------
              DESKTOP NAVIGATION
          ---------------------------------------------------- */}

          <nav className="navbar-links">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="navbar-link"
              >
                {link.label}
              </a>
            ))}
          </nav>


          {/* ----------------------------------------------------
              RIGHT SIDE
          ---------------------------------------------------- */}

          <div className="navbar-right">

            <a
              href={BOOKING_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="navbar-cta"
            >
              <span>Book a Call</span>

              <svg
                width="14"
                height="14"
                viewBox="0 0 16 16"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M3 8H13M13 8L9 4M13 8L9 12"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>


            {/* Mobile menu button */}

            <button
              className={`navbar-menu-button ${
                open ? 'menu-open' : ''
              }`}
              onClick={() => setOpen((value) => !value)}
              aria-label={
                open ? 'Close menu' : 'Open menu'
              }
              aria-expanded={open}
            >
              <span />
              <span />
            </button>

          </div>

        </div>
      </motion.header>


      {/* ========================================================
          MOBILE MENU
      ======================================================== */}

      <AnimatePresence>
        {open && (
          <motion.div
            className="mobile-menu"
            initial={{
              opacity: 0,
              y: -20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: -20,
            }}
            transition={{
              duration: 0.35,
              ease: [0.22, 1, 0.36, 1],
            }}
          >

            <div className="mobile-menu-links">

              {links.map((link, index) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  initial={{
                    opacity: 0,
                    x: -20,
                  }}
                  animate={{
                    opacity: 1,
                    x: 0,
                  }}
                  transition={{
                    delay: 0.04 + index * 0.05,
                    duration: 0.4,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="mobile-nav-link"
                >
                  <span>
                    {link.label}
                  </span>

                  <span className="mobile-nav-arrow">
                    ↗
                  </span>
                </motion.a>
              ))}

            </div>


            <motion.a
              href={BOOKING_LINK}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              initial={{
                opacity: 0,
                y: 15,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.35,
                duration: 0.45,
              }}
              className="mobile-cta"
            >
              Book a Free Consultation

              <span>↗</span>
            </motion.a>

          </motion.div>
        )}
      </AnimatePresence>


      {/* ========================================================
          STYLES
      ======================================================== */}

      <style jsx global>{`

        /* ======================================================
           NAVBAR
        ====================================================== */

        .site-navbar {
          position: fixed;

          top: 0;
          left: 0;
          right: 0;

          width: 100%;

          z-index: 1000;

          background: #ffffff;

          pointer-events: none;
        }


        /* ======================================================
           INNER NAVBAR
        ====================================================== */

        .navbar-inner {
          width: 100%;

          height: 76px;

          box-sizing: border-box;

          padding:
            0
            clamp(24px, 5vw, 72px);

          display: flex;

          align-items: center;

          justify-content: space-between;

          border-bottom: 1px solid #0d0d0d;

          pointer-events: auto;

          background: #ffffff;

          transition:
            height 0.3s ease,
            background 0.3s ease;
        }


        .navbar-scrolled {
          height: 68px;
        }


        /* ======================================================
           LOGO
        ====================================================== */

        .navbar-logo {
          display: flex;

          align-items: center;

          gap: 9px;

          text-decoration: none;

          color: #0d0d0d;

          flex-shrink: 0;
        }


        .navbar-logo img {
          display: block;

          width: 27px;
          height: 27px;

          object-fit: contain;
        }


        .navbar-logo span {
          font-family:
            'Montserrat',
            'Inter',
            sans-serif;

          font-size: 17px;

          font-weight: 900;

          letter-spacing: -0.045em;

          line-height: 1;
        }


        .navbar-logo strong {
          color: #ff8500;

          font-weight: 900;
        }


        /* ======================================================
           DESKTOP LINKS
        ====================================================== */

        .navbar-links {
          display: flex;

          align-items: center;

          justify-content: center;

          gap: clamp(18px, 2.2vw, 34px);

          margin-left: auto;

          margin-right: clamp(
            28px,
            4vw,
            65px
          );
        }


        .navbar-link {
          position: relative;

          display: inline-flex;

          align-items: center;

          height: 76px;

          font-family:
            'Inter',
            sans-serif;

          font-size: 12px;

          font-weight: 600;

          letter-spacing: -0.015em;

          color: #0d0d0d;

          text-decoration: none;

          transition:
            color 0.2s ease;
        }


        /* Small orange line under active/hovered item */

        .navbar-link::after {
          content: '';

          position: absolute;

          left: 0;
          right: 0;

          bottom: -1px;

          height: 2px;

          background: #ff8500;

          transform:
            scaleX(0);

          transform-origin: left;

          transition:
            transform 0.25s
            cubic-bezier(
              0.22,
              1,
              0.36,
              1
            );
        }


        .navbar-link:hover {
          color: #ff8500;
        }


        .navbar-link:hover::after {
          transform: scaleX(1);
        }


        /* ======================================================
           RIGHT SIDE
        ====================================================== */

        .navbar-right {
          display: flex;

          align-items: center;

          gap: 14px;

          flex-shrink: 0;
        }


        /* ======================================================
           CTA
        ====================================================== */

        .navbar-cta {
          display: inline-flex;

          align-items: center;

          justify-content: center;

          gap: 14px;

          height: 42px;

          padding:
            0
            17px;

          box-sizing: border-box;

          background: #ff8500;

          border: 1px solid #ff8500;

          border-radius: 0;

          color: #0d0d0d;

          font-family:
            'Inter',
            sans-serif;

          font-size: 11px;

          font-weight: 800;

          letter-spacing: -0.015em;

          text-decoration: none;

          transition:
            background 0.2s ease,
            color 0.2s ease,
            transform 0.2s ease;
        }


        .navbar-cta:hover {
          background: #0d0d0d;

          border-color: #0d0d0d;

          color: #ffffff;

          transform: translateY(-2px);
        }


        /* ======================================================
           MOBILE MENU BUTTON
        ====================================================== */

        .navbar-menu-button {
          display: none;

          width: 42px;
          height: 42px;

          padding: 0;

          align-items: center;

          justify-content: center;

          flex-direction: column;

          gap: 6px;

          background: #ffffff;

          border: 1px solid #0d0d0d;

          border-radius: 0;

          cursor: pointer;
        }


        .navbar-menu-button span {
          display: block;

          width: 18px;

          height: 2px;

          background: #0d0d0d;

          transition:
            transform 0.3s ease,
            opacity 0.2s ease;
        }


        .navbar-menu-button.menu-open
          span:first-child {
          transform:
            translateY(4px)
            rotate(45deg);
        }


        .navbar-menu-button.menu-open
          span:last-child {
          transform:
            translateY(-4px)
            rotate(-45deg);
        }


        /* ======================================================
           MOBILE DRAWER
        ====================================================== */

        .mobile-menu {
          position: fixed;

          top: 68px;

          left: 0;
          right: 0;
          bottom: 0;

          z-index: 999;

          background: #ffffff;

          border-top: 1px solid #0d0d0d;

          padding:
            10px
            20px
            30px;

          box-sizing: border-box;

          display: flex;

          flex-direction: column;

          pointer-events: auto;
        }


        .mobile-menu-links {
          display: flex;

          flex-direction: column;
        }


        .mobile-nav-link {
          display: flex;

          align-items: center;

          justify-content: space-between;

          min-height: 68px;

          padding:
            0
            4px;

          border-bottom:
            1px solid #0d0d0d;

          color: #0d0d0d;

          text-decoration: none;

          font-family:
            'Inter',
            sans-serif;

          font-size: 28px;

          font-weight: 800;

          letter-spacing: -0.055em;

          transition:
            color 0.2s ease,
            padding 0.2s ease;
        }


        .mobile-nav-link:hover {
          color: #ff8500;

          padding-left: 8px;
        }


        .mobile-nav-arrow {
          color: #ff8500;

          font-size: 24px;

          font-weight: 500;
        }


        /* ======================================================
           MOBILE CTA
        ====================================================== */

        .mobile-cta {
          display: flex;

          align-items: center;

          justify-content: space-between;

          width: 100%;

          box-sizing: border-box;

          margin-top: 28px;

          padding:
            18px
            20px;

          background: #ff8500;

          border: 1px solid #ff8500;

          color: #0d0d0d;

          text-decoration: none;

          font-family:
            'Inter',
            sans-serif;

          font-size: 14px;

          font-weight: 800;

          letter-spacing: -0.02em;
        }


        .mobile-cta span {
          font-size: 20px;
        }


        /* ======================================================
           TABLET
        ====================================================== */

        @media (max-width: 900px) {

          .navbar-inner {
            padding:
              0
              28px;
          }


          .navbar-links {
            gap: 16px;

            margin-right: 25px;
          }


          .navbar-link {
            font-size: 11px;
          }


          .navbar-cta {
            padding:
              0
              14px;
          }
        }


        /* ======================================================
           MOBILE
        ====================================================== */

        @media (max-width: 700px) {

          .navbar-inner {
            height: 68px;

            padding:
              0
              20px;
          }


          .navbar-scrolled {
            height: 68px;
          }


          .navbar-logo span {
            font-size: 16px;
          }


          .navbar-logo img {
            width: 25px;
            height: 25px;
          }


          .navbar-links {
            display: none;
          }


          .navbar-cta {
            display: none;
          }


          .navbar-menu-button {
            display: flex;
          }
        }


        /* ======================================================
           SMALL MOBILE
        ====================================================== */

        @media (max-width: 420px) {

          .navbar-inner {
            padding:
              0
              16px;
          }


          .navbar-logo span {
            font-size: 15px;
          }


          .navbar-menu-button {
            width: 38px;
            height: 38px;
          }
        }

      `}</style>
    </>
  )
}