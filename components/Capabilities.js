import { useRef, useState, useEffect } from 'react'
import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion'

/* ──────────────────────────────────────────────────────────────
   Brand logos via Iconify CDN — official brand SVGs in their
   real colors.  `slug` = "prefix:name" on iconify; `tint` is
   the fallback card accent if the SVG ever 404s.
   ────────────────────────────────────────────────────────────── */

const iconUrl = (slug) => `https://api.iconify.design/${slug}.svg`

const Icon = ({ children }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    {children}
  </svg>
)

const CATS = [
  {
    title: 'AI & Machine Learning',
    summary: 'Custom LLM agents, RAG pipelines, and vision systems tuned to your domain data.',
    tools: [
      { name: 'OpenAI',       slug: 'logos:openai',            tint: '#10A37F' },
      { name: 'Claude',       slug: 'logos:claude',            tint: '#D97757' },
      { name: 'Gemini',       slug: 'logos:google-gemini',     tint: '#8E75B2' },
      { name: 'Hugging Face', slug: 'logos:hugging-face-icon', tint: '#FFD21E' },
      { name: 'TensorFlow',   slug: 'logos:tensorflow',        tint: '#FF6F00' },
    ],
    icon: <Icon><path d="M12 2a4 4 0 0 1 4 4v.5"/><path d="M12 2a4 4 0 0 0-4 4v.5"/><rect x="4" y="11" width="16" height="9" rx="2"/><path d="M9 16h6M9 8h6"/></Icon>,
    featured: true,
  },
  {
    title: 'Automation Platforms',
    summary: 'Visual and code-driven orchestration across every tool you use.',
    tools: [
      { name: 'Make',           slug: 'simple-icons:make',     tint: '#6D00CC' },
      { name: 'n8n',            slug: 'simple-icons:n8n',      tint: '#EA4B71' },
      { name: 'Zapier',         slug: 'logos:zapier-icon',     tint: '#FF4F00' },
      { name: 'IFTTT',          slug: 'logos:ifttt',           tint: '#000000' },
      { name: 'GitHub Actions', slug: 'logos:github-actions',  tint: '#2088FF' },
    ],
    icon: <Icon><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></Icon>,
  },
  {
    title: 'CRM & Operations',
    summary: 'Lifecycle, pipeline, and ops automation across the major CRMs.',
    tools: [
      { name: 'HubSpot',    slug: 'logos:hubspot',      tint: '#FF7A59' },
      { name: 'Salesforce', slug: 'logos:salesforce',   tint: '#00A1E0' },
      { name: 'Pipedrive',  slug: 'logos:pipedrive',    tint: '#017737' },
      { name: 'Monday',     slug: 'logos:monday-icon',  tint: '#FF3D57' },
      { name: 'Airtable',   slug: 'logos:airtable',     tint: '#18BFFF' },
    ],
    icon: <Icon><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></Icon>,
  },
  {
    title: 'Engineering',
    summary: 'Production-grade backends in TypeScript and Python with real test coverage.',
    tools: [
      { name: 'TypeScript', slug: 'logos:typescript-icon', tint: '#3178C6' },
      { name: 'Python',     slug: 'logos:python',          tint: '#3776AB' },
      { name: 'GraphQL',    slug: 'logos:graphql',         tint: '#E535AB' },
      { name: 'Node.js',    slug: 'logos:nodejs-icon',     tint: '#339933' },
      { name: 'Docker',     slug: 'logos:docker-icon',     tint: '#2496ED' },
    ],
    icon: <Icon><path d="M16 18l6-6-6-6M8 6l-6 6 6 6"/></Icon>,
  },
  {
    title: 'Business Tools',
    summary: 'Slack-first, Notion-first, Drive-first — we live inside your stack.',
    tools: [
      { name: 'Slack',     slug: 'logos:slack-icon',      tint: '#611F69' },
      { name: 'Notion',    slug: 'logos:notion-icon',     tint: '#1A0F0A' },
      { name: 'Google',    slug: 'logos:google-icon',     tint: '#4285F4' },
      { name: 'Microsoft', slug: 'logos:microsoft-icon',  tint: '#0078D4' },
      { name: 'Asana',     slug: 'logos:asana-icon',      tint: '#F06A6A' },
    ],
    icon: <Icon><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></Icon>,
  },
  {
    title: 'Data & Analytics',
    summary: 'Warehouses, dashboards, and the modeling layer behind every decision.',
    tools: [
      { name: 'BigQuery',  slug: 'simple-icons:googlebigquery', tint: '#4285F4' },
      { name: 'Snowflake', slug: 'logos:snowflake-icon',        tint: '#29B5E8' },
      { name: 'Power BI',  slug: 'logos:microsoft-power-bi',    tint: '#E5A50A' },
      { name: 'Looker',    slug: 'logos:looker-icon',           tint: '#5945ED' },
      { name: 'dbt',       slug: 'logos:dbt-icon',              tint: '#FF694A' },
    ],
    icon: <Icon><path d="M18 20V10"/><path d="M12 20V4"/><path d="M6 20v-6"/></Icon>,
  },
]

/* ── Logo card — single mini card with brand logo + name ───── */
function LogoCard({ tool, w, h }) {
  const [errored, setErrored] = useState(false)
  return (
    <div style={{
      width: w, height: h,
      background: '#FFFFFF',
      borderRadius: 14,
      border: '1px solid rgba(20,16,12,0.08)',
      boxShadow: '0 1px 1px rgba(20,16,12,0.04), 0 12px 28px rgba(20,16,12,0.14), 0 4px 8px rgba(20,16,12,0.06)',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      gap: 6,
      padding: '10px 6px 8px',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* Subtle tint accent at top */}
      <span style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 3,
        background: `linear-gradient(90deg, transparent, ${tool.tint}, transparent)`,
        opacity: 0.7,
      }} />
      {/* Logo */}
      <div style={{ width: w * 0.5, height: w * 0.5, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {!errored ? (
          <img
            src={iconUrl(tool.slug)}
            alt={tool.name}
            width={Math.floor(w * 0.5)}
            height={Math.floor(w * 0.5)}
            style={{ display: 'block', objectFit: 'contain', userSelect: 'none' }}
            draggable={false}
            loading="lazy"
            onError={() => setErrored(true)}
          />
        ) : (
          <div style={{
            width: w * 0.5, height: w * 0.5, borderRadius: 99,
            background: `linear-gradient(135deg, ${tool.tint}, ${tool.tint}DD)`,
            color: '#FFF', fontWeight: 700, fontSize: 12,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            {tool.name.slice(0, 2).toUpperCase()}
          </div>
        )}
      </div>
      {/* Name */}
      <span style={{
        fontFamily: "'Inter', sans-serif",
        fontSize: 10, fontWeight: 600,
        color: '#1A0F0A',
        letterSpacing: 0.1,
        textAlign: 'center',
        whiteSpace: 'nowrap',
        maxWidth: '100%',
        overflow: 'hidden', textOverflow: 'ellipsis',
      }}>
        {tool.name}
      </span>
    </div>
  )
}

/* ── Fan-out stack — hidden at rest. On hover, cards rise from
       behind the card content and fan across the top with ~20%
       overlap.  Center card emerges first, outers stagger out. ── */
function FanStack({ tools, hovered, featured }) {
  const total = tools.length
  // Card dimensions
  const w = featured ? 92 : 78
  const h = featured ? 140 : 124
  // Spacing < card width gives the desired light overlap (~20%)
  const spacing = featured ? 74 : 62
  // How high the cards travel up from the anchor on hover.
  // Tuned so the cards' bottom edges sit just above the article's
  // top edge — they emerge from behind it and float "lifted" above
  // the title area instead of covering it.
  const riseY = featured ? -260 : -255

  return (
    <div style={{
      position: 'absolute',
      bottom: featured ? 34 : 28,
      left: '50%',
      width: 0, height: 0,
      transformStyle: 'preserve-3d',
      pointerEvents: 'none',
    }}>
      {tools.map((tool, i) => {
        const mid = (total - 1) / 2
        const off = i - mid                          // -2 … +2 for 5 cards
        const offX = off * spacing                   // horizontal fan position
        const arcY = Math.pow(Math.abs(off), 1.6) * 4 // gentle arc dip — outers slightly lower
        const tilt = off * 7                          // outward rotation

        // Stagger: center card first, then outward (-2,+2 last)
        const distFromCenter = Math.abs(off)
        const inDelay  = 0.05 + distFromCenter * 0.06
        const outDelay = distFromCenter * 0.02

        return (
          <motion.div
            key={tool.name}
            initial={{ x: 0, y: 0, rotate: 0, scale: 0.5, opacity: 0 }}
            animate={hovered
              ? { x: offX, y: riseY + arcY, rotate: tilt, scale: 1,    opacity: 1 }
              : { x: 0,    y: 0,            rotate: 0,    scale: 0.5,  opacity: 0 }}
            transition={hovered
              ? { type: 'spring', stiffness: 260, damping: 22, mass: 0.75, delay: inDelay }
              : { type: 'spring', stiffness: 320, damping: 28, mass: 0.6,  delay: outDelay }}
            style={{
              position: 'absolute',
              bottom: 0, left: 0,
              marginLeft: -w / 2,
              transformOrigin: 'center 100%',
              willChange: 'transform, opacity',
              // Center card highest, outers behind — feels like a hand of cards
              zIndex: 100 - Math.round(Math.abs(off) * 10),
            }}
          >
            <LogoCard tool={tool} w={w} h={h} />
          </motion.div>
        )
      })}
    </div>
  )
}

/* ── The 3D-tilt capability card ────────────────────────────── */
function CapCard({ c, i, featured }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const [hovered, setHovered] = useState(false)

  // Mouse-tracked tilt
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const sx = useSpring(mx, { stiffness: 180, damping: 18, mass: 0.4 })
  const sy = useSpring(my, { stiffness: 180, damping: 18, mass: 0.4 })
  const rotateY = useTransform(sx, [-0.5, 0.5], [-9, 9])
  const rotateX = useTransform(sy, [-0.5, 0.5], [7, -7])
  const liftZ  = useTransform(sx, [-0.5, 0.5, 1.5], [0, 0, 0])  // placeholder

  const onMove = (e) => {
    const el = ref.current; if (!el) return
    const r = el.getBoundingClientRect()
    mx.set((e.clientX - r.left) / r.width - 0.5)
    my.set((e.clientY - r.top) / r.height - 0.5)
  }
  const onLeave = () => { mx.set(0); my.set(0); setHovered(false) }

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{
        gridColumn: featured ? 'span 2' : 'span 1',
        perspective: 1100,
        position: 'relative',
        zIndex: hovered ? 30 : 1,
      }}
    >
      {/* ── BACK LAYER — fan cards live BEHIND the article.  At rest
            they sit at the bottom of the wrapper, fully occluded by
            the article's opaque background.  On hover they rise
            upward and emerge from behind the article's top edge. ── */}
      <div style={{
        position: 'absolute',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
      }}>
        <FanStack tools={c.tools} hovered={hovered} featured={featured} />
      </div>

      <motion.article
        initial={{ opacity: 0, y: 22 }}
        animate={inView ? { opacity: 1, y: 0, scale: hovered ? 1.025 : 1 } : { opacity: 0, y: 22 }}
        transition={{
          opacity: { duration: 0.65, delay: (i % 3) * 0.08, ease: [0.22, 1, 0.36, 1] },
          y:       { duration: 0.65, delay: (i % 3) * 0.08, ease: [0.22, 1, 0.36, 1] },
          scale:   { duration: 0.5,  ease: [0.22, 1, 0.36, 1] },
        }}
        style={{
          position: 'relative',
          zIndex: 1,
          // Opaque background — occludes the fan layer behind it at rest
          background: featured ? 'linear-gradient(170deg, #FBF6EE 0%, #F0E2CC 100%)' : 'var(--bg-card)',
          border: '1px solid',
          borderColor: hovered ? 'rgba(194,98,45,0.36)' : 'var(--hair-warm)',
          borderRadius: 'var(--radius-lg)',
          padding: 'clamp(24px,2.6vw,32px)',
          minHeight: 268,
          boxShadow: hovered
            ? '0 28px 64px rgba(194,98,45,0.18), 0 8px 18px rgba(20,16,12,0.08)'
            : '0 1px 2px rgba(20,16,12,0.04)',
          rotateX, rotateY,
          transformStyle: 'preserve-3d',
          transition: 'border-color 0.45s, box-shadow 0.45s',
          willChange: 'transform',
        }}
      >
        {/* Featured corner glow (contained) */}
        {featured && (
          <div style={{
            position: 'absolute', inset: 0, borderRadius: 'var(--radius-lg)',
            overflow: 'hidden', pointerEvents: 'none',
          }}>
            <div style={{
              position: 'absolute', top: -60, right: -60, width: 240, height: 240, borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(194,98,45,0.18), transparent 70%)',
            }} />
          </div>
        )}

        {/* Specular sheen — moves with tilt for that "glass" 3D feel */}
        <motion.div
          style={{
            position: 'absolute', inset: 0, borderRadius: 'var(--radius-lg)',
            background: 'linear-gradient(115deg, transparent 0%, rgba(255,255,255,0.18) 50%, transparent 100%)',
            opacity: useTransform(sx, [-0.5, 0, 0.5], [0.6, 0, 0.6]),
            pointerEvents: 'none',
            mixBlendMode: 'overlay',
          }}
        />

        {/* Content — bumped forward on Z for parallax depth */}
        <div style={{ position: 'relative', zIndex: 2, transform: 'translateZ(28px)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
            <div style={{
              width: 46, height: 46, borderRadius: 13,
              background: 'rgba(194,98,45,0.08)',
              border: '1px solid rgba(194,98,45,0.18)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#C2622D', flexShrink: 0,
            }}>
              {c.icon}
            </div>
            <h3 style={{
              fontFamily: "'Instrument Serif', serif",
              fontSize: featured ? 'clamp(26px,2.6vw,32px)' : 'clamp(20px,1.8vw,23px)',
              fontWeight: 400, letterSpacing: '-0.025em', lineHeight: 1.1,
              color: '#1A0F0A',
            }}>
              {c.title}
            </h3>
          </div>

          <motion.p
            animate={{ opacity: hovered ? 0.35 : 1 }}
            transition={{ duration: 0.45, ease: [0.22,1,0.36,1] }}
            style={{
              fontSize: 14.5, color: '#5C3D2A', lineHeight: 1.7,
              marginBottom: 18,
              maxWidth: featured ? 460 : 'auto',
            }}
          >
            {c.summary}
          </motion.p>

          {/* Hover hint — invites the reveal */}
          <motion.div
            animate={{
              opacity: hovered ? 0 : 1,
              y: hovered ? -4 : 0,
            }}
            transition={{ duration: 0.35, ease: [0.22,1,0.36,1] }}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              fontFamily: "'Inter', sans-serif",
              fontSize: 11, fontWeight: 600,
              letterSpacing: 1.8, textTransform: 'uppercase',
              color: '#C2622D',
            }}
          >
            <span style={{ width: 18, height: 1, background: 'linear-gradient(90deg, transparent, #C2622D)' }} />
            {c.tools.length} tools · hover to reveal
          </motion.div>
        </div>
      </motion.article>
    </div>
  )
}

export default function Capabilities() {
  const headRef = useRef(null)
  const inView = useInView(headRef, { once: true })

  return (
    <section
      id="capabilities"
      style={{
        position: 'relative',
        padding: 'clamp(96px,11vw,160px) 0',
        background: 'var(--bg)',
        borderTop: '1px solid var(--hair)',
      }}
    >
      <div className="container">
        <motion.div
          ref={headRef}
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          style={{ textAlign: 'center', marginBottom: 'clamp(48px,6vw,72px)' }}
        >
          <span className="eyebrow">Capabilities</span>
          <h2 style={{
            fontFamily: "'Instrument Serif', serif",
            fontSize: 'clamp(40px,5.2vw,68px)',
            fontWeight: 400, letterSpacing: '-0.03em', lineHeight: 1,
            color: '#1A0F0A', marginTop: 18,
          }}>
            Platform-agnostic. <em style={{ color: '#C2622D' }}>Outcome-obsessed.</em>
          </h2>
          <p style={{ fontSize: 17, color: '#5C3D2A', lineHeight: 1.65, maxWidth: 520, margin: '20px auto 0' }}>
            We don't sell tools — we choose the right ones for your problem and ship the system that uses them. Hover any card to fan out the stack.
          </p>
        </motion.div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 'clamp(16px,1.6vw,20px)',
          isolation: 'isolate',
        }} className="cap-grid">
          {CATS.map((c, i) => (
            <CapCard key={i} c={c} i={i} featured={!!c.featured} />
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) { .cap-grid { grid-template-columns: 1fr 1fr !important; } .cap-grid > * { grid-column: span 1 !important; } }
        @media (max-width: 720px)  { .cap-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  )
}
