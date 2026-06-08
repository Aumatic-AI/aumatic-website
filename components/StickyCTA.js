import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function StickyCTA() {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const fn = () => setVisible(window.scrollY > 720)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: 'fixed', bottom: 22, left: '50%', transform: 'translateX(-50%)', zIndex: 90,
            display: 'flex', alignItems: 'center', gap: 14,
            padding: '11px 14px 11px 20px',
            borderRadius: 999,
            background: 'rgba(251,246,238,0.95)',
            backdropFilter: 'blur(22px) saturate(180%)',
            border: '1px solid rgba(194,98,45,0.18)',
            boxShadow: '0 14px 44px rgba(194,98,45,0.16), 0 4px 10px rgba(20,16,12,0.05)',
            whiteSpace: 'nowrap',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ position: 'relative', display: 'inline-flex' }}>
              <span style={{ position: 'absolute', inset: -3, borderRadius: 99, background: 'rgba(194,98,45,0.4)', animation: 'pulse-ring 2s ease-in-out infinite' }} />
              <span style={{ position: 'relative', width: 8, height: 8, borderRadius: 99, background: '#C2622D' }} />
            </span>
            <span style={{ fontSize: 13, color: '#3D2314', fontWeight: 500 }}>
              <strong style={{ color: '#1A0F0A', fontWeight: 700 }}>3 spots</strong> left this month
            </span>
          </div>
          <span style={{ width: 1, height: 16, background: 'rgba(194,98,45,0.18)' }} />
          <a href="https://cal.com/chandan-kumar-zhrofj/30min" target="_blank" rel="noopener noreferrer"
            className="btn btn-primary"
            style={{ padding: '8px 16px', fontSize: 13, borderRadius: 999 }}
          >
            Free consultation
            <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
              <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
