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
          background: 'radial-gradient(circle, rgba(194,98,45,0.22) 0%, transparent 70%)',
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
          Aumatic.<span style={{ color: '#C2622D' }}>AI</span>
        </span>
      </motion.div>

      {/* Sweeping accent line */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: 'absolute', bottom: '40%', width: 'min(340px, 50vw)', height: 2,
          background: 'linear-gradient(90deg, transparent, #C2622D, transparent)',
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
      background: 'radial-gradient(circle, rgba(194,98,45,0.045) 0%, transparent 60%)',
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
        background: 'linear-gradient(90deg, #C2622D, #E8A060, #C2622D)',
        boxShadow: '0 0 12px rgba(194,98,45,0.5)',
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
        <title>Aumatic.AI — AI Automation Agency</title>
        <meta name="description" content="We build and deploy intelligent automation for your business. Save hundreds of hours every month with custom AI workflows." />
        <link rel="icon" href="/aumatic_favicon.png" />
        <meta property="og:title" content="Aumatic.AI — AI Automation Agency" />
        <meta property="og:description" content="We build and deploy intelligent automation for your business." />
        <meta property="og:type" content="website" />
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
