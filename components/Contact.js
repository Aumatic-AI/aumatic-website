import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

const PERKS = [
  { title: 'Reply within 4 hours', desc: 'During business hours, almost always faster.' },
  { title: 'Free 30-min discovery', desc: 'Walk away with a clear automation map — even if we never work together.' },
  { title: 'No-pressure pricing', desc: 'Fixed quotes after the discovery call. No surprises.' },
]

function Field({ label, type = 'text', value, onChange, required, textarea, name }) {
  const [focus, setFocus] = useState(false)
  const filled = value && value.length > 0
  return (
    <label style={{ display: 'block', position: 'relative' }}>
      <span style={{
        position: 'absolute',
        top: filled || focus ? -7 : (textarea ? 18 : 17),
        left: 14,
        padding: filled || focus ? '0 6px' : '0',
        background: filled || focus ? 'var(--bg-card)' : 'transparent',
        fontSize: filled || focus ? 11 : 14,
        color: focus ? '#C2622D' : '#8A6A5A',
        fontWeight: filled || focus ? 600 : 400,
        letterSpacing: filled || focus ? 0.6 : 0,
        textTransform: filled || focus ? 'uppercase' : 'none',
        transition: 'all 0.25s var(--ease-out)',
        pointerEvents: 'none',
      }}>{label}{required && '*'}</span>

      {textarea ? (
        <textarea
          name={name}
          required={required}
          value={value}
          onChange={onChange}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          rows={4}
          style={{
            width: '100%',
            padding: '16px 16px 14px',
            background: 'var(--bg-card)',
            border: focus ? '1px solid #C2622D' : '1px solid var(--hair-warm)',
            borderRadius: 12,
            fontSize: 15,
            color: '#1A0F0A',
            fontFamily: 'inherit',
            outline: 'none',
            resize: 'vertical',
            minHeight: 110,
            transition: 'border-color 0.3s, box-shadow 0.3s',
            boxShadow: focus ? '0 0 0 3px rgba(194,98,45,0.08)' : 'none',
          }}
        />
      ) : (
        <input
          name={name}
          type={type}
          required={required}
          value={value}
          onChange={onChange}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          style={{
            width: '100%',
            padding: '17px 16px 13px',
            background: 'var(--bg-card)',
            border: focus ? '1px solid #C2622D' : '1px solid var(--hair-warm)',
            borderRadius: 12,
            fontSize: 15,
            color: '#1A0F0A',
            fontFamily: 'inherit',
            outline: 'none',
            transition: 'border-color 0.3s, box-shadow 0.3s',
            boxShadow: focus ? '0 0 0 3px rgba(194,98,45,0.08)' : 'none',
          }}
        />
      )}
    </label>
  )
}

export default function Contact() {
  const headRef = useRef(null)
  const inView = useInView(headRef, { once: true })

  const [form, setForm] = useState({ name: '', email: '', company: '', message: '' })
  const [sent, setSent] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const onChange = e => setForm({ ...form, [e.target.name]: e.target.value })
  const onSubmit = e => {
    e.preventDefault()
    setSubmitting(true)
    setTimeout(() => { setSent(true); setSubmitting(false) }, 800)
  }

  return (
    <section
      id="contact"
      style={{
        position: 'relative',
        padding: 'clamp(96px,11vw,160px) 0',
        background: 'var(--bg-alt)',
        borderTop: '1px solid var(--hair)',
      }}
    >
      {/* Decorative orbs */}
      <div style={{ position: 'absolute', top: '8%', right: '-4%', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle,rgba(194,98,45,0.06),transparent 65%)', pointerEvents: 'none' }} />

      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.1fr', gap: 'clamp(40px,6vw,80px)', alignItems: 'start' }} className="contact-grid">
          {/* Left: copy + perks */}
          <motion.div
            ref={headRef}
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22,1,0.36,1] }}
          >
            <span className="eyebrow">Contact</span>
            <h2 style={{
              fontFamily: "'Instrument Serif', serif",
              fontSize: 'clamp(40px,5.2vw,64px)',
              fontWeight: 400, letterSpacing: '-0.03em', lineHeight: 1,
              color: '#1A0F0A', marginTop: 16,
            }}>
              Let's build<br/><em style={{ color: '#C2622D' }}>something that ships.</em>
            </h2>
            <p style={{ fontSize: 17, color: '#5C3D2A', lineHeight: 1.65, maxWidth: 420, marginTop: 22 }}>
              Tell us where you'd like more leverage. We'll come back with a short, honest read on whether automation is the right next move — and what it would take.
            </p>

            <div style={{ marginTop: 40, display: 'flex', flexDirection: 'column', gap: 22 }}>
              {PERKS.map((p, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-30px' }}
                  transition={{ delay: 0.2 + i * 0.08, duration: 0.55 }}
                  style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}
                >
                  <div style={{
                    width: 28, height: 28, borderRadius: 99,
                    background: 'rgba(194,98,45,0.08)',
                    border: '1px solid rgba(194,98,45,0.22)',
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#C2622D" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12l5 5L20 7"/></svg>
                  </div>
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 600, color: '#1A0F0A', marginBottom: 4 }}>{p.title}</div>
                    <div style={{ fontSize: 14, color: '#5C3D2A', lineHeight: 1.6 }}>{p.desc}</div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Direct channels */}
            <div style={{ marginTop: 36, paddingTop: 28, borderTop: '1px solid var(--hair-warm)' }}>
              <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase', color: '#8A6A5A', marginBottom: 14 }}>
                Or reach us directly
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <a href="https://cal.com/chandan-kumar-zhrofj/30min" target="_blank" rel="noopener noreferrer"
                  className="link-underline"
                  style={{ fontSize: 15, color: '#1A0F0A', textDecoration: 'none', alignSelf: 'flex-start' }}>
                  → Book a call on cal.com
                </a>
                <a href="https://wa.me/919849884501" target="_blank" rel="noopener noreferrer"
                  className="link-underline"
                  style={{ fontSize: 15, color: '#1A0F0A', textDecoration: 'none', alignSelf: 'flex-start' }}>
                  → Chat on WhatsApp
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right: form */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.8, ease: [0.22,1,0.36,1] }}
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--hair-warm)',
              borderRadius: 22,
              padding: 'clamp(28px,3.5vw,40px)',
              position: 'relative', overflow: 'hidden',
              boxShadow: 'var(--shadow-2)',
            }}
          >
            {/* Subtle inner glow */}
            <div style={{ position: 'absolute', top: -120, right: -120, width: 280, height: 280, borderRadius: '50%', background: 'radial-gradient(circle, rgba(194,98,45,0.10), transparent 70%)', pointerEvents: 'none' }} />

            <AnimatePresence mode="wait">
              {!sent ? (
                <motion.form
                  key="form"
                  onSubmit={onSubmit}
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -10, transition: { duration: 0.3 } }}
                  style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: 16 }}
                >
                  <h3 style={{
                    fontFamily: "'Instrument Serif', serif",
                    fontSize: 'clamp(22px,2.2vw,28px)', fontWeight: 400, letterSpacing: '-0.02em',
                    color: '#1A0F0A', marginBottom: 4,
                  }}>
                    Tell us a bit about you.
                  </h3>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }} className="contact-row">
                    <Field name="name"    label="Name"    value={form.name}    onChange={onChange} required />
                    <Field name="email"   label="Email"   type="email" value={form.email} onChange={onChange} required />
                  </div>
                  <Field name="company" label="Company" value={form.company} onChange={onChange} />
                  <Field name="message" label="What would you like to automate?" textarea value={form.message} onChange={onChange} required />

                  <button
                    type="submit"
                    disabled={submitting}
                    className="btn btn-primary"
                    style={{ padding: '15px 24px', fontSize: 15, marginTop: 8, opacity: submitting ? 0.65 : 1 }}
                  >
                    {submitting ? 'Sending…' : 'Send a message'}
                    {!submitting && (
                      <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                        <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                  </button>

                  <p style={{ fontSize: 12.5, color: '#8A6A5A', textAlign: 'center', marginTop: 4 }}>
                    By submitting, you agree to our <a href="#" style={{ color: '#C2622D', textDecoration: 'none' }}>privacy policy</a>.
                  </p>

                  <style>{`@media(max-width:560px){.contact-row{grid-template-columns:1fr!important}}`}</style>
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, ease: [0.22,1,0.36,1] }}
                  style={{ position: 'relative', textAlign: 'center', padding: '40px 0' }}
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.1, type: 'spring', stiffness: 200, damping: 14 }}
                    style={{
                      width: 64, height: 64, borderRadius: 99,
                      background: 'linear-gradient(135deg, #10B981, #059669)',
                      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                      marginBottom: 24,
                      boxShadow: '0 12px 36px rgba(16,185,129,0.28)',
                    }}
                  >
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#FFF" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12l5 5L20 7"/></svg>
                  </motion.div>
                  <h3 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 28, fontWeight: 400, color: '#1A0F0A', marginBottom: 8 }}>
                    Message sent.
                  </h3>
                  <p style={{ fontSize: 15, color: '#5C3D2A', lineHeight: 1.65, maxWidth: 360, margin: '0 auto' }}>
                    Thanks, {form.name || 'friend'} — we'll reply within a few hours. Usually faster.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      <style>{`@media(max-width:880px){.contact-grid{grid-template-columns:1fr!important}}`}</style>
    </section>
  )
}
