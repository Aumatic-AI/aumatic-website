import Link from 'next/link'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

// All positions hardcoded — no Math.random() to prevent SSR hydration mismatch

const STARS = [
  [18,12],[42,22],[70,8],[105,18],[140,10],[178,20],[214,7],[250,16],[288,11],[325,19],
  [30,52],[65,62],[100,45],[138,58],[174,48],[210,60],[246,44],[282,56],[318,50],[354,61],
  [20,92],[55,105],[90,82],[128,98],[164,88],[200,102],[236,85],[272,100],[308,93],[344,103],
  [25,134],[60,148],[95,125],[133,142],[169,130],[205,144],[241,128],[277,142],[313,136],[349,146],
  [28,175],[63,188],[98,165],[136,182],[172,170],[208,184],[244,167],[280,182],[316,176],[352,186],
  [430,15],[480,28],[530,12],[580,24],[630,10],[670,22],
  [440,95],[490,108],[540,88],[590,104],[640,92],[678,106],
  [445,165],[495,178],[545,158],[595,174],[645,162],[682,175],
]

// Horizontal chain at top (y≈48)
// [x, highlighted]
const CHAIN = [
  [14,1],[42,0],[70,0],[100,1],[130,0],[160,0],[192,1],[222,0],[252,0],[282,1],[312,0],
]
const CHAIN_PAIRS = [[14,42],[42,70],[70,100],[100,130],[130,160],[160,192],[192,222],[222,252],[252,282],[282,312]]

// Short dashed gap then right section
const CHAIN_R = [[378,48,0],[406,48,1],[434,48,0],[462,48,0]]
const CHAIN_R_PAIRS = [[378,406],[406,434],[434,462]]

// Bend: 462,48 → 490,48 → 490,78 → 510,78 (trunk)
const TX = 510
const TY0 = 44
const TY1 = 198

// Branch rows from trunk
const BRANCHES = [
  { y: 52,  xs: [528, 555, 582, 608], hi: [1,0,0,0], lw: [20,14] },
  { y: 90,  xs: [528, 555, 582, 608], hi: [0,1,0,0], lw: [22,16] },
  { y: 128, xs: [528, 555, 582, 608], hi: [1,0,0,0], lw: [18,12] },
  { y: 166, xs: [528, 555, 582, 608], hi: [0,0,1,0], lw: [20,14] },
]

// One sub-node hanging from row 0
const SUB = { fromX: 555, fromY: 52, toX: 555, toY: 75, hi: false }

function MNode({ x, y, hi, s = 1 }) {
  const w = 22 * s, h = 16 * s, rx = 3 * s
  const bg = hi ? 'rgba(232,164,96,0.26)' : 'rgba(194,98,45,0.14)'
  const bd = hi ? 'rgba(232,164,96,0.72)' : 'rgba(194,98,45,0.50)'
  const i1 = hi ? 'rgba(232,164,96,0.65)' : 'rgba(194,98,45,0.48)'
  const i2 = hi ? 'rgba(255,210,160,0.42)' : 'rgba(232,164,96,0.28)'
  return (
    <g>
      <rect x={x - w/2} y={y - h/2} width={w} height={h} rx={rx} fill={bg} stroke={bd} strokeWidth="0.8"/>
      <rect x={x - w/2 + 2} y={y - h/2 + 2} width={w * 0.38} height={h - 4} rx="1.5" fill={i1}/>
      <rect x={x + 2}       y={y - h/2 + 3} width={w * 0.2}  height={h - 7} rx="1"   fill={i2}/>
      <rect x={x - w/2 + 1} y={y + h/2 + 2} width={w - 2}    height="2"     rx="1"   fill="rgba(194,98,45,0.22)"/>
      <rect x={x - w/2 + 4} y={y + h/2 + 6} width={w - 9}    height="1.5"   rx="1"   fill="rgba(194,98,45,0.13)"/>
    </g>
  )
}

const LC = 'rgba(212,120,74,0.48)'

function WorkflowBanner() {
  return (
    <div style={{
      width: '100%',
      aspectRatio: '16 / 7',
      background: 'linear-gradient(135deg,#0D0805 0%,#1A0F0A 25%,#2C1810 55%,#1A0F0A 80%,#0D0805 100%)',
      position: 'relative',
      overflow: 'hidden',
      flexShrink: 0,
    }}>
      {/* Central glow */}
      <div style={{ position:'absolute', top:'55%', left:'30%', transform:'translate(-50%,-50%)', width:'62%', height:'220%', background:'radial-gradient(ellipse,rgba(194,98,45,0.40) 0%,transparent 58%)', pointerEvents:'none' }} />
      <div style={{ position:'absolute', top:'35%', right:'8%', width:'22%', height:'110%', background:'radial-gradient(ellipse,rgba(212,120,74,0.12) 0%,transparent 65%)', pointerEvents:'none' }} />
      {/* Bottom edge glow */}
      <div style={{ position:'absolute', bottom:0, left:0, right:0, height:'2px', background:'linear-gradient(90deg,transparent,rgba(194,98,45,0.7) 30%,rgba(232,164,96,0.9) 50%,rgba(194,98,45,0.7) 70%,transparent)', pointerEvents:'none' }} />
      <div style={{ position:'absolute', bottom:0, left:'10%', right:'10%', height:'28px', background:'radial-gradient(ellipse at 50% 100%,rgba(194,98,45,0.25) 0%,transparent 70%)', pointerEvents:'none' }} />
      {/* Left vignette */}
      <div style={{ position:'absolute', inset:0, background:'linear-gradient(90deg,rgba(0,0,0,0.32) 0%,transparent 16%)', pointerEvents:'none' }} />

      <svg style={{ position:'absolute', inset:0, width:'100%', height:'100%' }} viewBox="0 0 660 210" preserveAspectRatio="xMidYMid meet">
        {/* Stars */}
        {STARS.map(([x,y],i) => (
          <circle key={`s${i}`} cx={x} cy={y}
            r={i%5===0?1.5:i%3===0?1.0:0.65}
            fill={`rgba(${i%4===0?'255,255,255':'232,164,96'},${i%5===0?0.52:i%3===0?0.28:0.16})`}
          />
        ))}

        {/* Chain lines */}
        {CHAIN_PAIRS.map(([x1,x2],i) => (
          <line key={`cl${i}`} x1={x1} y1={48} x2={x2} y2={48} stroke={LC} strokeWidth="1"/>
        ))}
        {/* Chain nodes */}
        {CHAIN.map(([x,hi],i) => <MNode key={`cn${i}`} x={x} y={48} hi={hi===1} s={0.85}/>)}

        {/* Dashed gap */}
        <line x1={312} y1={48} x2={378} y2={48} stroke="rgba(212,120,74,0.28)" strokeWidth="0.9" strokeDasharray="5 4"/>

        {/* Right chain lines */}
        {CHAIN_R_PAIRS.map(([x1,x2],i) => (
          <line key={`rl${i}`} x1={x1} y1={48} x2={x2} y2={48} stroke={LC} strokeWidth="1"/>
        ))}
        {/* Right chain nodes */}
        {CHAIN_R.map(([x,y,h],i) => <MNode key={`rn${i}`} x={x} y={y} hi={h===1} s={0.85}/>)}

        {/* Bend: 462,48→490,48→490,78→510,78 */}
        <line x1={462} y1={48} x2={490} y2={48}  stroke={LC} strokeWidth="1"/>
        <line x1={490} y1={48} x2={490} y2={78}  stroke={LC} strokeWidth="1"/>
        <line x1={490} y1={78} x2={TX}  y2={78}  stroke={LC} strokeWidth="1"/>

        {/* Trunk */}
        <line x1={TX} y1={TY0} x2={TX} y2={TY1} stroke="rgba(212,120,74,0.44)" strokeWidth="1.2"/>

        {/* Branches */}
        {BRANCHES.map((row, ri) => (
          <g key={`br${ri}`}>
            <line x1={TX} y1={row.y} x2={row.xs[0]} y2={row.y} stroke="rgba(212,120,74,0.42)" strokeWidth="0.9"/>
            {row.xs.slice(0,-1).map((nx, ni) => (
              <line key={`brl${ri}${ni}`} x1={nx} y1={row.y} x2={row.xs[ni+1]} y2={row.y} stroke="rgba(212,120,74,0.38)" strokeWidth="0.9"/>
            ))}
            {row.xs.map((nx, ni) => (
              <MNode key={`brn${ri}${ni}`} x={nx} y={row.y} hi={row.hi[ni]===1} s={0.82}/>
            ))}
            <rect x={TX-14} y={row.y+10} width={row.lw[0]} height="2.5" rx="1.2" fill="rgba(194,98,45,0.26)"/>
            <rect x={TX-14} y={row.y+15} width={row.lw[1]} height="2"   rx="1"   fill="rgba(194,98,45,0.16)"/>
          </g>
        ))}

        {/* Sub-node */}
        <line x1={SUB.fromX} y1={SUB.fromY+8} x2={SUB.toX} y2={SUB.toY-8} stroke="rgba(212,120,74,0.32)" strokeWidth="0.8"/>
        <MNode x={SUB.toX} y={SUB.toY} hi={SUB.hi} s={0.78}/>
      </svg>

      {/* Scanlines */}
      <div style={{ position:'absolute', inset:0, backgroundImage:'repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(0,0,0,0.04) 3px,rgba(0,0,0,0.04) 4px)', pointerEvents:'none', opacity:0.5 }} />
    </div>
  )
}

export default function CaseStudyCard({ study, index }) {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.1 }}
      style={{ height: '100%' }}
    >
      <Link href={`/case-studies/${study.slug}`} style={{ textDecoration: 'none', display: 'block', height: '100%' }}>
        <motion.article
          whileHover={{ y: -8, scale: 1.015 }}
          transition={{ duration: 0.3, ease: [0.22,1,0.36,1] }}
          className="card-glow"
          style={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            borderRadius: 16,
            overflow: 'hidden',
            background: '#F5EFE8',
            border: '1px solid rgba(194,98,45,0.14)',
            boxShadow: '0 2px 18px rgba(194,98,45,0.06)',
            cursor: 'pointer',
            transition: 'box-shadow 0.35s, border-color 0.35s',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.boxShadow = '0 20px 60px rgba(194,98,45,0.22), 0 0 0 1.5px rgba(194,98,45,0.35)'
            e.currentTarget.style.borderColor = 'rgba(194,98,45,0.4)'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.boxShadow = '0 2px 18px rgba(194,98,45,0.06)'
            e.currentTarget.style.borderColor = 'rgba(194,98,45,0.14)'
          }}
        >
          {study.image ? (
            <div style={{ width:'100%', aspectRatio:'16/7', overflow:'hidden', flexShrink:0, background:'#1A0F0A' }}>
              <img
                src={study.image}
                alt={study.title}
                style={{ width:'100%', height:'100%', objectFit:'cover', display:'block', transition:'transform 0.4s ease' }}
                onMouseEnter={e => e.currentTarget.style.transform='scale(1.05)'}
                onMouseLeave={e => e.currentTarget.style.transform='scale(1)'}
              />
            </div>
          ) : (
            <WorkflowBanner />
          )}

          <div style={{ padding: '20px 22px 24px', display: 'flex', flexDirection: 'column', flex: 1 }}>
            {/* Category + date */}
            <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: 1.2, textTransform: 'uppercase', color: '#C2622D', marginBottom: 10 }}>
              Case Study&nbsp;&nbsp;•&nbsp;&nbsp;{study.date}
            </div>

            {/* Title */}
            <h3 style={{
              fontSize: 'clamp(15px,1.4vw,17px)',
              fontWeight: 800,
              color: '#1A0F0A',
              letterSpacing: -0.4,
              lineHeight: 1.35,
              marginBottom: 10,
            }}>
              {study.title}
            </h3>

            {/* Summary */}
            <p style={{
              fontSize: 13,
              color: '#8A6A5A',
              lineHeight: 1.75,
              flex: 1,
              marginBottom: 18,
            }}>
              {study.summary}
            </p>

            {/* Footer */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid rgba(194,98,45,0.1)', paddingTop: 14 }}>
              <span style={{ fontSize: 11, fontWeight: 600, color: '#B89A88', letterSpacing: 0.5 }}>
                {study.industry}
              </span>
              <span className="arrow-bounce" style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 13, fontWeight: 700, color: '#C2622D' }}>
                Read more
                <svg width="13" height="13" viewBox="0 0 16 16" fill="none" style={{ transition: 'transform 0.2s' }}>
                  <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
            </div>
          </div>
        </motion.article>
      </Link>
    </motion.div>
  )
}
