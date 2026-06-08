import Head from 'next/head'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'

import Navbar           from '../../components/Navbar'
import Footer           from '../../components/Footer'
import CaseStudyHero    from '../../components/CaseStudyHero'
import CaseStudySection from '../../components/CaseStudySection'
import CaseStudyImage   from '../../components/CaseStudyImage'
import WhatsAppFloat    from '../../components/WhatsAppFloat'
import { caseStudies }  from '../../data/caseStudies'

export async function getStaticPaths() {
  return {
    paths: caseStudies.map(s => ({ params: { slug: s.slug } })),
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const study = caseStudies.find(s => s.slug === params.slug) || null
  const idx = caseStudies.findIndex(s => s.slug === params.slug)
  const next = idx >= 0 ? caseStudies[(idx + 1) % caseStudies.length] : null
  return { props: { study, next } }
}

/* ── Reading progress bar (top of viewport) ── */
function ReadingProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.3 })
  return (
    <motion.div
      style={{
        position: 'fixed', top: 2, left: 0, right: 0, height: 2, zIndex: 201,
        transformOrigin: 'left',
        scaleX,
        background: 'linear-gradient(90deg, #C2622D, #E8A060, #C2622D)',
        boxShadow: '0 0 10px rgba(194,98,45,0.45)',
      }}
    />
  )
}

/* ── 404 ── */
function NotFound() {
  return (
    <>
      <Head><title>Not Found — Aumatic.AI</title></Head>
      <div style={{ minHeight: '100vh', background: 'var(--bg)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 22, padding: 24 }}>
        <div style={{ width: 64, height: 64, borderRadius: 16, background: 'rgba(194,98,45,0.08)', border: '1px solid rgba(194,98,45,0.18)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: 4 }}>
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#C2622D" strokeWidth="1.6"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.35-4.35"/></svg>
        </div>
        <h1 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 'clamp(28px,4vw,44px)', fontWeight: 400, color: '#1A0F0A', letterSpacing: -1 }}>Case study not found</h1>
        <p style={{ fontSize: 16, color: '#5C3D2A' }}>The page you're looking for doesn't exist.</p>
        <Link href="/#case-studies" className="btn btn-primary" style={{ marginTop: 8 }}>← Back to case studies</Link>
      </div>
    </>
  )
}

export default function CaseStudyPage({ study, next }) {
  if (!study) return <NotFound />

  // Interleave workflow images: after section 1 and section 2 if extra images exist
  const imgs = study.images || (study.image ? [study.image] : [])
  const items = study.sections
    ? study.sections.reduce((acc, section, i) => {
        acc.push({ kind: 'section', data: section, index: i })
        if (i === 1 && imgs.length > 1) acc.push({ kind: 'image', label: 'System Overview', src: imgs[1] })
        if (i === 2 && imgs.length > 2) acc.push({ kind: 'image', label: 'Workflow Detail', src: imgs[2] })
        return acc
      }, [])
    : []

  return (
    <>
      <Head>
        <title>{`${study.title} — Aumatic.AI`}</title>
        <meta name="description"        content={study.description || study.summary} />
        <meta property="og:title"       content={`${study.title} — Aumatic.AI`} />
        <meta property="og:description" content={study.description || study.summary} />
        <meta property="og:type"        content="article" />
        <link rel="icon" href="/aumatic_favicon.png" />
      </Head>

      <ReadingProgress />

      <div style={{ minHeight: '100vh', background: 'var(--bg)', position: 'relative', overflow: 'hidden' }}>
        {/* Ambient orbs */}
        <div className="anim-blob1" style={{ position: 'fixed', top: '4%', right: '2%', width: 520, height: 520, borderRadius: '50%', background: 'radial-gradient(circle,rgba(194,98,45,0.06) 0%,transparent 65%)', pointerEvents: 'none', zIndex: 0 }} />
        <div className="anim-blob2" style={{ position: 'fixed', bottom: '8%', left: '2%', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle,rgba(194,98,45,0.04) 0%,transparent 65%)', pointerEvents: 'none', zIndex: 0 }} />

        <Navbar />

        <CaseStudyHero study={study} />

        {/* Lead workflow image */}
        {imgs[0] && (
          <div style={{ paddingTop: 28 }}>
            <CaseStudyImage label="Workflow Architecture" src={imgs[0]} />
          </div>
        )}

        {/* Content sections interleaved with images */}
        {items.map((item, i) =>
          item.kind === 'section'
            ? <CaseStudySection key={i} section={item.data} index={item.index} />
            : <CaseStudyImage   key={i} label={item.label} src={item.src} />
        )}

        {/* Fallback for case studies without sections */}
        {!study.sections && (
          <div style={{ maxWidth: 1100, margin: '0 auto', padding: '48px clamp(20px,3vw,40px)' }}>
            <p style={{ fontSize: 17, color: '#5C3D2A', lineHeight: 1.85 }}>{study.description || study.summary}</p>
          </div>
        )}

        {/* ── CTA banner ── */}
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '8px clamp(20px,3vw,40px) clamp(64px,7vw,96px)' }}>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, ease: [0.22,1,0.36,1] }}
            style={{
              borderRadius: 24,
              padding: 'clamp(40px,5vw,64px) clamp(28px,4vw,56px)',
              background: 'linear-gradient(165deg, #1A0F0A 0%, #2C1810 50%, #3D2314 100%)',
              border: '1px solid rgba(194,98,45,0.22)',
              position: 'relative', overflow: 'hidden',
              display: 'grid', gridTemplateColumns: '1.5fr 1fr',
              gap: 32, alignItems: 'center',
            }}
            className="cs-cta"
          >
            <div style={{ position: 'absolute', top: '-30%', right: '8%', width: 320, height: 320, borderRadius: '50%', background: 'radial-gradient(circle, rgba(194,98,45,0.20), transparent 70%)', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)', backgroundSize: '60px 60px', pointerEvents: 'none', opacity: 0.5 }} />

            <div style={{ position: 'relative', zIndex: 1 }}>
              <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: 2.4, textTransform: 'uppercase', color: '#E8A060' }}>Like what you see?</span>
              <h2 style={{
                fontFamily: "'Instrument Serif', serif",
                fontSize: 'clamp(28px,3.6vw,46px)',
                fontWeight: 400, letterSpacing: '-0.025em', lineHeight: 1.05,
                color: '#F5EFE8', marginTop: 14, marginBottom: 14,
              }}>
                Let's build the automation that <em style={{ color: '#E8A060' }}>moves your numbers</em>.
              </h2>
              <p style={{ fontSize: 15, color: 'rgba(245,239,232,0.55)', maxWidth: 440, lineHeight: 1.7 }}>
                Free 30-min strategy call — we leave you with a clear automation map even if we never work together.
              </p>
            </div>

            <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', gap: 12, justifySelf: 'end', alignItems: 'flex-end' }} className="cs-cta-buttons">
              <a href="https://cal.com/chandan-kumar-zhrofj/30min" target="_blank" rel="noopener noreferrer"
                className="btn btn-primary"
                style={{ padding: '14px 24px', fontSize: 15 }}
              >
                Book a free call
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
              {next && (
                <Link href={`/case-studies/${next.slug}`}
                  style={{
                    fontSize: 13, color: 'rgba(245,239,232,0.55)', textDecoration: 'none',
                    display: 'inline-flex', alignItems: 'center', gap: 6,
                    fontFamily: "'Inter', sans-serif",
                    transition: 'color 0.3s, gap 0.3s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.color = '#E8A060'; e.currentTarget.style.gap = '10px' }}
                  onMouseLeave={e => { e.currentTarget.style.color = 'rgba(245,239,232,0.55)'; e.currentTarget.style.gap = '6px' }}
                >
                  Next: {next.title.length > 40 ? next.title.slice(0, 40) + '…' : next.title}
                  <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Link>
              )}
            </div>
          </motion.div>
        </div>

        <Footer />
        <WhatsAppFloat />
      </div>

      <style jsx global>{`
        @media (max-width: 760px) {
          .cs-cta { grid-template-columns: 1fr !important; }
          .cs-cta-buttons { justify-self: stretch !important; align-items: stretch !important; }
          .cs-cta-buttons a { justify-content: center; }
        }
      `}</style>
    </>
  )
}
