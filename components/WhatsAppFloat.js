import { motion } from 'framer-motion'

const WHATSAPP_NUMBER = '919849884501'
const WHATSAPP_MESSAGE = "Hi! I'm interested in AI automation services from Aumatic.AI"

export default function WhatsAppFloat() {
  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1.4, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: 1.08, y: -3 }}
      whileTap={{ scale: 0.94 }}
      style={{
        position: 'fixed', bottom: 24, right: 24, zIndex: 90,
        width: 54, height: 54, borderRadius: '50%',
        background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: '0 8px 28px rgba(37,211,102,0.42), 0 2px 8px rgba(0,0,0,0.15)',
        textDecoration: 'none', cursor: 'pointer',
        isolation: 'isolate',
      }}
    >
      {/* Pulse ring */}
      <span style={{
        position: 'absolute', inset: -2, borderRadius: '50%',
        background: 'rgba(37,211,102,0.35)',
        animation: 'pulse-ring 2.4s cubic-bezier(0.24,0,0.38,1) infinite',
        zIndex: -1,
      }}/>
      <span style={{
        position: 'absolute', inset: -2, borderRadius: '50%',
        background: 'rgba(37,211,102,0.35)',
        animation: 'pulse-ring 2.4s cubic-bezier(0.24,0,0.38,1) 1.2s infinite',
        zIndex: -1,
      }}/>
      <svg width="26" height="26" viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <path
          d="M16 2.667C8.636 2.667 2.667 8.636 2.667 16c0 2.364.63 4.582 1.727 6.497L2.667 29.333l7.048-1.697A13.253 13.253 0 0 0 16 29.333c7.364 0 13.333-5.969 13.333-13.333S23.364 2.667 16 2.667Z"
          fill="white"
        />
        <path
          d="M22.196 19.404c-.308-.154-1.818-.895-2.099-.998-.281-.103-.486-.154-.69.154-.205.308-.793.998-.972 1.203-.18.205-.359.23-.667.077-.308-.154-1.3-.479-2.476-1.527-.915-.816-1.533-1.823-1.712-2.131-.18-.308-.019-.474.135-.628.138-.138.308-.359.462-.538.154-.18.205-.308.308-.513.103-.205.051-.385-.026-.538-.077-.154-.69-1.663-.945-2.278-.249-.598-.502-.517-.69-.527-.179-.009-.385-.011-.59-.011a1.13 1.13 0 0 0-.82.385c-.282.308-1.073 1.048-1.073 2.557 0 1.509 1.099 2.966 1.252 3.17.154.205 2.163 3.303 5.241 4.632.733.316 1.305.505 1.75.647.735.234 1.404.201 1.933.122.59-.088 1.818-.743 2.074-1.46.256-.718.256-1.334.18-1.46-.077-.128-.282-.205-.59-.359Z"
          fill="#25D366"
        />
      </svg>
    </motion.a>
  )
}
