import { useState, useMemo, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import CaseStudyCard from './CaseStudyCard'
import { caseStudies } from '../data/caseStudies'

const PER_PAGE = 6

// Pre-compute a clean category list (unique, sorted by appearance)
const CATEGORIES = (() => {
  const seen = new Set()
  const out = ['All']
  for (const s of caseStudies) {
    const c = (s.industry || '').split('/')[0].trim()
    if (c && !seen.has(c)) { seen.add(c); out.push(c) }
  }
  return out
})()

export default function CaseStudies() {
  const headerRef = useRef(null)
  const inView    = useInView(headerRef, { once: true })

  const [query,    setQuery]    = useState('')
  const [category, setCategory] = useState('All')
  const [page,     setPage]     = useState(0)

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim()
    return caseStudies.filter(s => {
      if (category !== 'All') {
        const cat = (s.industry || '').split('/')[0].trim()
        if (cat !== category) return false
      }
      if (!q) return true
      return (
        s.title.toLowerCase().includes(q) ||
        s.summary.toLowerCase().includes(q) ||
        s.industry.toLowerCase().includes(q) ||
        (s.category || '').toLowerCase().includes(q) ||
        s.tags.some(t => t.toLowerCase().includes(q))
      )
    })
  }, [query, category])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE))
  const safePage   = Math.min(page, totalPages - 1)
  const pageItems  = filtered.slice(safePage * PER_PAGE, (safePage + 1) * PER_PAGE)

  const reset = () => { setQuery(''); setCategory('All'); setPage(0) }

  return (
    <section id="case-studies" style={{ position: 'relative', overflow: 'hidden', padding: 'clamp(96px,11vw,160px) 0', background: 'var(--bg)', borderTop: '1px solid var(--hair)' }}>

      {/* Decorative orbs */}
      <div style={{ position: 'absolute', top: '6%', right: '-4%', width: 460, height: 460, borderRadius: '50%', background: 'radial-gradient(circle,rgba(194,98,45,0.06) 0%,transparent 65%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '6%', left: '-4%', width: 380, height: 380, borderRadius: '50%', background: 'radial-gradient(circle,rgba(194,98,45,0.05) 0%,transparent 65%)', pointerEvents: 'none' }} />

      <div className="container">
        {/* ── Header ── */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 26 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22,1,0.36,1] }}
          style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 40, marginBottom: 36, flexWrap: 'wrap' }}
        >
          <div>
            <span className="eyebrow">Case Studies</span>
            <h2 style={{
              fontFamily: "'Instrument Serif', serif",
              fontSize: 'clamp(40px,5.2vw,68px)',
              fontWeight: 400, letterSpacing: '-0.03em', lineHeight: 1,
              color: '#1A0F0A', marginTop: 18,
            }}>
              Real clients.<br/><em style={{ color: '#C2622D' }}>Real outcomes.</em>
            </h2>
          </div>
          <p style={{ fontSize: 17, color: '#5C3D2A', lineHeight: 1.65, maxWidth: 380 }}>
            A selection of automations we shipped recently — each one stripping hours of manual work out of a real business.
          </p>
        </motion.div>

        {/* ── Filter / search row ── */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            gap: 16, marginBottom: 32, flexWrap: 'wrap',
          }}
        >
          {/* Category chips */}
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {CATEGORIES.map(c => {
              const active = c === category
              return (
                <button
                  key={c}
                  onClick={() => { setCategory(c); setPage(0) }}
                  style={{
                    padding: '7px 14px', borderRadius: 99,
                    fontSize: 13, fontWeight: 500,
                    border: active ? '1px solid #C2622D' : '1px solid var(--hair-warm)',
                    background: active ? 'linear-gradient(135deg, #C2622D, #A8501F)' : 'transparent',
                    color: active ? '#FFF' : '#5C3D2A',
                    cursor: 'pointer',
                    transition: 'all 0.3s var(--ease-out)',
                    fontFamily: 'inherit',
                  }}
                  onMouseEnter={e => { if (!active) { e.currentTarget.style.borderColor = 'rgba(194,98,45,0.4)'; e.currentTarget.style.color = '#C2622D' } }}
                  onMouseLeave={e => { if (!active) { e.currentTarget.style.borderColor = 'rgba(194,98,45,0.14)'; e.currentTarget.style.color = '#5C3D2A' } }}
                >
                  {c}
                </button>
              )
            })}
          </div>

          {/* Search */}
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            <svg width="15" height="15" viewBox="0 0 16 16" fill="none" style={{ position: 'absolute', left: 14, pointerEvents: 'none' }}>
              <circle cx="6.5" cy="6.5" r="4.5" stroke="#8A6A5A" strokeWidth="1.4"/>
              <path d="M10 10L13.5 13.5" stroke="#8A6A5A" strokeWidth="1.4" strokeLinecap="round"/>
            </svg>
            <input
              type="text"
              placeholder="Search…"
              value={query}
              onChange={e => { setQuery(e.target.value); setPage(0) }}
              style={{
                width: 260,
                padding: '9px 38px 9px 38px',
                borderRadius: 99,
                border: '1px solid var(--hair-warm)',
                background: 'rgba(255,255,255,0.55)',
                fontSize: 13.5, color: '#3D2314',
                outline: 'none',
                transition: 'border-color 0.3s, box-shadow 0.3s, background 0.3s',
                fontFamily: 'inherit',
              }}
              onFocus={e => { e.target.style.borderColor = 'rgba(194,98,45,0.5)'; e.target.style.boxShadow = '0 0 0 3px rgba(194,98,45,0.08)'; e.target.style.background = 'rgba(255,255,255,0.9)' }}
              onBlur={e => { e.target.style.borderColor = 'rgba(194,98,45,0.14)'; e.target.style.boxShadow = 'none'; e.target.style.background = 'rgba(255,255,255,0.55)' }}
            />
            {query && (
              <button
                onClick={() => { setQuery(''); setPage(0) }}
                aria-label="Clear"
                style={{ position: 'absolute', right: 12, background: 'none', border: 'none', cursor: 'pointer', color: '#8A6A5A', fontSize: 14 }}
              >×</button>
            )}
          </div>
        </motion.div>

        {/* Count line */}
        <div style={{ fontSize: 13, color: '#8A6A5A', marginBottom: 24 }}>
          {filtered.length} {filtered.length === 1 ? 'study' : 'studies'}
          {(query || category !== 'All') && (
            <button
              onClick={reset}
              style={{ background: 'none', border: 'none', color: '#C2622D', cursor: 'pointer', marginLeft: 12, fontSize: 13, fontFamily: 'inherit' }}
            >Reset filters</button>
          )}
        </div>

        {/* ── Cards grid ── */}
        <AnimatePresence mode="wait">
          {pageItems.length > 0 ? (
            <motion.div
              key={`${query}-${category}-${safePage}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35 }}
              style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'clamp(18px,2vw,24px)' }}
              className="cs-grid"
            >
              {pageItems.map((study, i) => (
                <CaseStudyCard key={study.slug} study={study} index={i} />
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.3 }}
              style={{ textAlign: 'center', padding: 'clamp(56px,7vw,96px) 24px', background: 'rgba(255,255,255,0.4)', border: '1px solid var(--hair-warm)', borderRadius: 20 }}
            >
              <div style={{ width: 56, height: 56, borderRadius: 16, margin: '0 auto 20px', background: 'rgba(194,98,45,0.08)', border: '1px solid rgba(194,98,45,0.18)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C2622D" strokeWidth="1.6"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.35-4.35"/></svg>
              </div>
              <h3 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 26, color: '#1A0F0A', marginBottom: 8 }}>No matches</h3>
              <p style={{ fontSize: 15, color: '#5C3D2A', marginBottom: 22 }}>Try a different keyword or reset the filters.</p>
              <button onClick={reset} className="btn btn-ghost" style={{ padding: '10px 20px', fontSize: 14 }}>Reset filters</button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Pagination ── */}
        {totalPages > 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, marginTop: 56 }}
          >
            <button
              onClick={() => setPage(p => Math.max(0, p - 1))}
              disabled={safePage === 0}
              style={{
                padding: '8px 18px', borderRadius: 99,
                border: '1px solid var(--hair-warm)',
                background: 'transparent', fontFamily: 'inherit',
                fontSize: 13, fontWeight: 500,
                color: safePage === 0 ? 'var(--ink-faint)' : '#3D2314',
                cursor: safePage === 0 ? 'not-allowed' : 'pointer',
                transition: 'all 0.3s',
              }}
              onMouseEnter={e => { if (safePage !== 0) e.currentTarget.style.borderColor = 'rgba(194,98,45,0.5)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--hair-warm)' }}
            >← Prev</button>

            {Array.from({ length: totalPages }, (_, i) => {
              const active = i === safePage
              return (
                <button
                  key={i}
                  onClick={() => setPage(i)}
                  style={{
                    width: 34, height: 34, borderRadius: 99,
                    border: active ? '1px solid #C2622D' : '1px solid transparent',
                    background: active ? 'linear-gradient(135deg,#C2622D,#A8501F)' : 'transparent',
                    color: active ? '#FFF' : '#8A6A5A',
                    fontSize: 13, fontWeight: 600,
                    cursor: 'pointer', fontFamily: 'inherit',
                    transition: 'all 0.3s',
                  }}
                  onMouseEnter={e => { if (!active) { e.currentTarget.style.background = 'rgba(194,98,45,0.08)'; e.currentTarget.style.color = '#3D2314' } }}
                  onMouseLeave={e => { if (!active) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#8A6A5A' } }}
                >{i + 1}</button>
              )
            })}

            <button
              onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))}
              disabled={safePage === totalPages - 1}
              style={{
                padding: '8px 18px', borderRadius: 99,
                border: '1px solid var(--hair-warm)',
                background: 'transparent', fontFamily: 'inherit',
                fontSize: 13, fontWeight: 500,
                color: safePage === totalPages - 1 ? 'var(--ink-faint)' : '#3D2314',
                cursor: safePage === totalPages - 1 ? 'not-allowed' : 'pointer',
                transition: 'all 0.3s',
              }}
              onMouseEnter={e => { if (safePage !== totalPages - 1) e.currentTarget.style.borderColor = 'rgba(194,98,45,0.5)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--hair-warm)' }}
            >Next →</button>
          </motion.div>
        )}
      </div>

      <style>{`
        @media (max-width: 1024px) { .cs-grid { grid-template-columns: 1fr 1fr !important; } }
        @media (max-width: 680px)  { .cs-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  )
}
