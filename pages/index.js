import Head from 'next/head'
import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

import Navbar       from '../components/Navbar'
import Hero         from '../components/Hero'
import LogoBar      from '../components/LogoBar'
import Process      from '../components/Process'
import Capabilities from '../components/Capabilities'
import WhyUs        from '../components/WhyUs'
import CaseStudies  from '../components/CaseStudies'
import Testimonials from '../components/Testimonials'
import Impact       from '../components/Impact'
import FAQ          from '../components/FAQ'
import Contact      from '../components/Contact'
import Footer       from '../components/Footer'
import StickyCTA    from '../components/StickyCTA'
import WhatsAppFloat from '../components/WhatsAppFloat'

/* ── Intro: ~750ms warm reveal — short, premium, then out ────── */
function Intro({ onDone }) {
  useEffect(() => {
    const t = setTimeout(onDone, 850)
    return () => clearTimeout(t)
  }, [onDone])

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } }}
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        background: 'radial-gradient(ellipse at 50% 50%, #F5EFE8 0%, #EAE0D0 100%)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Soft warm glow behind logo */}
      <motion.div
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1.4 }}
        transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: 'absolute', width: 380, height: 380, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,133,0,0.22) 0%, transparent 70%)',
          filter: 'blur(20px)', pointerEvents: 'none',
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        style={{ display: 'flex', alignItems: 'center', gap: 14, position: 'relative' }}
      >
        <img
          src="/aumatic_img.png"
          width="48" height="48" alt="Aumatic.AI"
          style={{ display: 'block', objectFit: 'contain' }}
        />
        <span style={{
          fontFamily: "'Montserrat', sans-serif",
          fontSize: 30, fontWeight: 900, letterSpacing: -1.2,
          color: '#1A0F0A',
        }}>
          Aumatic.<span style={{ color: '#FF8500' }}>AI</span>
        </span>
      </motion.div>

      {/* Sweeping accent line */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: 'absolute', bottom: '40%', width: 'min(340px, 50vw)', height: 2,
          background: 'linear-gradient(90deg, transparent, #FF8500, transparent)',
          transformOrigin: 'left center',
        }}
      />
    </motion.div>
  )
}

/* ── Cursor glow — subtle warm radial that trails the mouse ── */
function CursorGlow() {
  const [pos, setPos] = useState({ x: -400, y: -400 })
  useEffect(() => {
    const fn = e => setPos({ x: e.clientX, y: e.clientY })
    window.addEventListener('mousemove', fn, { passive: true })
    return () => window.removeEventListener('mousemove', fn)
  }, [])
  return (
    <div style={{
      position: 'fixed', pointerEvents: 'none', zIndex: 1,
      left: pos.x, top: pos.y,
      width: 560, height: 560,
      transform: 'translate(-50%,-50%)',
      background: 'radial-gradient(circle, rgba(255,133,0,0.045) 0%, transparent 60%)',
      borderRadius: '50%',
      transition: 'left 0.12s cubic-bezier(0.22,1,0.36,1), top 0.12s cubic-bezier(0.22,1,0.36,1)',
      mixBlendMode: 'multiply',
    }} />
  )
}

/* ── Scroll progress bar (fixed top under the accent hairline) ── */
function ScrollProgress() {
  const [v, setV] = useState(0)
  useEffect(() => {
    const fn = () => {
      const h = document.documentElement
      const max = (h.scrollHeight - h.clientHeight) || 1
      setV(Math.min(1, Math.max(0, h.scrollTop / max)))
    }
    fn()
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])
  return (
    <div style={{
      position: 'fixed', top: 2, left: 0, right: 0, height: 2, zIndex: 201,
      pointerEvents: 'none',
    }}>
      <div style={{
        width: `${v * 100}%`, height: '100%',
        background: 'linear-gradient(90deg, #FF8500, #FFB347, #FF8500)',
        boxShadow: '0 0 12px rgba(255,133,0,0.5)',
        transition: 'width 0.08s linear',
      }}/>
    </div>
  )
}

export default function Home() {
  const [loaded, setLoaded] = useState(false)

  return (
    <>
      <Head>
  {/* Primary SEO */}
  <title>Aumatic.AI | AI Automation Agency for Business Workflows</title>

  <meta
    name="description"
    content="Aumatic.AI designs and deploys AI-powered business automation, workflows, AI agents, WhatsApp systems, and custom integrations that reduce manual work and save teams time."
  />

  <link rel="canonical" href="https://www.aumatic.ai/" />
  <link rel="icon" href="/aumatic_favicon.png" />

  {/* Open Graph — LinkedIn, WhatsApp, Facebook, etc. */}
  <meta
    property="og:title"
    content="Aumatic.AI | AI Automation Agency for Business Workflows"
  />

  <meta
    property="og:description"
    content="AI-powered automation, workflows, agents, and custom business systems built around how your team actually works."
  />

  <meta
    property="og:type"
    content="website"
  />

  <meta
    property="og:url"
    content="https://www.aumatic.ai/"
  />

  <meta
    property="og:site_name"
    content="Aumatic.AI"
  />

  <meta
    property="og:image"
    content="https://www.aumatic.ai/aumatic-og.png"
  />

  <meta
    property="og:image:alt"
    content="Aumatic.AI — AI Automation Agency"
  />

  {/* Twitter / X */}
  <meta
    name="twitter:card"
    content="summary_large_image"
  />

  <meta
    name="twitter:title"
    content="Aumatic.AI | AI Automation Agency for Business Workflows"
  />

  <meta
    name="twitter:description"
    content="AI-powered automation, workflows, agents, and custom business systems built around how your team actually works."
  />

  <meta
    name="twitter:image"
    content="https://www.aumatic.ai/aumatic-og.png"
  />
</Head>
      <AnimatePresence>{!loaded && <Intro onDone={() => setLoaded(true)} />}</AnimatePresence>

      {loaded && (
        <div style={{ minHeight: '100vh', background: 'var(--bg)', position: 'relative', isolation: 'isolate' }}>
          <ScrollProgress />
          <CursorGlow />
          <Navbar />

          <main style={{ position: 'relative', zIndex: 2 }}>
            <Hero />
            <LogoBar />
            <Process />
            <Capabilities />
            <WhyUs />
            <CaseStudies />
            <Testimonials />
            <Impact />
            <FAQ />
            <Contact />
          </main>

          <Footer />
          <StickyCTA />
          <WhatsAppFloat />
        </div>
      )}
    </>
  )
}
