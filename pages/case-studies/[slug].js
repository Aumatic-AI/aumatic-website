import Head from 'next/head'
import Link from 'next/link'
import { motion } from 'framer-motion'
import Navbar           from '../../components/Navbar'
import Footer           from '../../components/Footer'
import CaseStudyHero    from '../../components/CaseStudyHero'
import CaseStudySection from '../../components/CaseStudySection'
import CaseStudyImage   from '../../components/CaseStudyImage'
import { caseStudies }  from '../../data/caseStudies'

export async function getStaticPaths() {
  return {
    paths: caseStudies.map(s => ({ params: { slug: s.slug } })),
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const study = caseStudies.find(s => s.slug === params.slug) || null
  return { props: { study } }
}

/* ── 404 ── */
function NotFound() {
  return (
    <>
      <Head><title>Not Found — Aumatic.AI</title></Head>
      <div style={{ minHeight: '100vh', background: '#F5EFE8', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 20, padding: 24 }}>
        <span style={{ fontSize: 64 }}>🔍</span>
        <h1 style={{ fontSize: 'clamp(24px,4vw,40px)', fontWeight: 900, color: '#1A0F0A', letterSpacing: -1 }}>Case study not found</h1>
        <p style={{ fontSize: 16, color: '#8A6A5A' }}>The page you're looking for doesn't exist.</p>
        <Link href="/#case-studies"
          style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '13px 28px', borderRadius: 12, background: 'linear-gradient(135deg,#C2622D,#A8501F)', color: 'white', textDecoration: 'none', fontWeight: 700, fontSize: 15, boxShadow: '0 6px 24px rgba(194,98,45,0.38)' }}>
          ← Back to Case Studies
        </Link>
      </div>
    </>
  )
}

/* ── Main page ── */
export default function CaseStudyPage({ study }) {
  if (!study) return <NotFound />

  // Interleave workflow images: after section 1 and section 2
  const imgs = study.images || (study.image ? [study.image] : [])
  const contentItems = study.sections
    ? study.sections.reduce((acc, section, i) => {
        acc.push({ kind: 'section', data: section, index: i })
        if (i === 1 || i === 2) {
          const imgIdx = i === 1 ? 1 : 2
          acc.push({ kind: 'image', label: i === 1 ? 'Workflow Architecture' : 'System Overview', imgIdx })
        }
        return acc
      }, [])
    : []

  return (
    <>
      <Head>
        <title>{`${study.title} — Aumatic.AI Case Study`}</title>
        <meta name="description"        content={study.description || study.summary} />
        <meta property="og:title" content={`${study.title} — Aumatic.AI`} />
        <meta property="og:description" content={study.description || study.summary} />
        <meta property="og:type"        content="article" />
        <meta name="viewport"           content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/aumatic_favicon.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </Head>

      <div style={{ minHeight: '100vh', background: '#F5EFE8', position: 'relative', overflow: 'hidden' }}>
        {/* Ambient warm orbs (matches other site sections) */}
        <div className="orb1" style={{ position: 'fixed', top: '5%', right: '4%', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle,rgba(194,98,45,0.06) 0%,transparent 65%)', pointerEvents: 'none', zIndex: 0 }} />
        <div className="orb2" style={{ position: 'fixed', bottom: '10%', left: '3%', width: 380, height: 380, borderRadius: '50%', background: 'radial-gradient(circle,rgba(194,98,45,0.04) 0%,transparent 65%)', pointerEvents: 'none', zIndex: 0 }} />

        {/* Existing site navbar (warm beige theme) */}
        <Navbar />

        {/* Hero: gradient banner + description strip */}
        <CaseStudyHero study={study} />

        {/* First workflow image */}
        <div style={{ paddingTop: 52 }}>
          <CaseStudyImage label="Workflow Architecture" src={imgs[0]} />
        </div>

        {/* Content sections interleaved with images */}
        {contentItems.map((item, i) =>
          item.kind === 'section'
            ? <CaseStudySection key={i} section={item.data} index={item.index} />
            : <CaseStudyImage   key={i} label={item.label} src={imgs[item.imgIdx] ?? imgs[imgs.length - 1]} />
        )}

        {/* Fallback for case studies with no sections yet */}
        {!study.sections && (
          <div style={{ maxWidth: 1100, margin: '0 auto', padding: '48px clamp(16px,4vw,40px)' }}>
            <p style={{ fontSize: 17, color: '#8A6A5A', lineHeight: 1.85 }}>{study.description || study.summary}</p>
          </div>
        )}

        {/* ── CTA banner ── */}
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '8px clamp(16px,4vw,40px) 80px' }}>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6 }}
            style={{
              borderRadius: 22,
              padding: 'clamp(36px,5vw,60px) clamp(28px,4vw,52px)',
              background: 'linear-gradient(160deg,#2C1810 0%,#3D2314 100%)',
              border: '1px solid rgba(194,98,45,0.18)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 32,
              flexWrap: 'wrap',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Decorative glow inside CTA */}
            <div style={{ position: 'absolute', top: '-30%', right: '10%', width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle,rgba(194,98,45,0.18) 0%,transparent 65%)', pointerEvents: 'none' }} />

            <div style={{ position: 'relative', zIndex: 1 }}>
              <h2 style={{ fontSize: 'clamp(20px,3vw,34px)', fontWeight: 900, color: '#F5EFE8', letterSpacing: -1, marginBottom: 10, lineHeight: 1.2 }}>
                Ready to Automate Your Growth?
              </h2>
              <p style={{ fontSize: 16, color: 'rgba(245,239,232,0.45)', maxWidth: 420, lineHeight: 1.72 }}>
                Let's build a custom automation that saves you hours every week and compounds over time.
              </p>
            </div>

            <motion.a href="https://cal.com/chandan-kumar-zhrofj/30min" target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }}
              style={{ flexShrink: 0, position: 'relative', zIndex: 1, display: 'inline-flex', alignItems: 'center', gap: 8, padding: '15px 32px', borderRadius: 12, background: 'linear-gradient(135deg,#C2622D,#A8501F)', color: 'white', textDecoration: 'none', fontWeight: 700, fontSize: 16, boxShadow: '0 8px 28px rgba(194,98,45,0.42)', whiteSpace: 'nowrap' }}>
              Book a Free Call
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </motion.a>
          </motion.div>
        </div>

        <Footer />
      </div>
    </>
  )
}
