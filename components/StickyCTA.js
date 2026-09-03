import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function StickyCTA() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 720)
    }

    handleScroll()

    window.addEventListener('scroll', handleScroll, {
      passive: true,
    })

    return () =>
      window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{
            y: -30,
            opacity: 0,
          }}
          animate={{
            y: 0,
            opacity: 1,
          }}
          exit={{
            y: -30,
            opacity: 0,
          }}
          transition={{
            duration: 0.4,
            ease: [0.22, 1, 0.36, 1],
          }}
          style={{
            position: 'fixed',
            top: 22,
            right: 24,
            zIndex: 90,

            display: 'flex',
            alignItems: 'center',

            gap: 18,

            padding: '10px 10px 10px 16px',

            borderRadius: 0,

            background: '#0D0D0D',

            border: 'none',
            outline: 'none',

            boxShadow: 'none',
            filter: 'none',

            whiteSpace: 'nowrap',
          }}
        >
          {/* Status */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                flexShrink: 0,
                borderRadius: '50%',
                background: '#FF8500',
              }}
            />

            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 11,
                fontWeight: 500,
                color: '#FFFFFF',
              }}
            >
              <strong
                style={{
                  color: '#FF8500',
                  fontWeight: 700,
                }}
              >
                3 spots
              </strong>{' '}
              left this month
            </span>
          </div>

          {/* Divider */}
          <span
            style={{
              width: 1,
              height: 16,
              flexShrink: 0,
              background: 'rgba(255,255,255,0.18)',
            }}
          />

          {/* CTA */}
          <a
            href="https://cal.com/chandan-kumar-zhrofj/30min"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',

              gap: 7,

              padding: '9px 13px',

              borderRadius: 0,

              border: 'none',
              outline: 'none',

              background: '#FF8500',
              color: '#FFFFFF',

              fontFamily: "'Inter', sans-serif",
              fontSize: 11,
              fontWeight: 700,
              lineHeight: 1,

              textDecoration: 'none',

              transition: 'background 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#0D0D0D'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#FF8500'
            }}
          >
            Free consultation

            <svg
              width="12"
              height="12"
              viewBox="0 0 16 16"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M3 8H13M13 8L9 4M13 8L9 12"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  )
}