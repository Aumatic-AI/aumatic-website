import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

// All positions hardcoded — no Math.random() to prevent SSR hydration mismatch

const STARS = [
  [22,20],[48,38],[75,24],[108,46],[145,30],[183,44],[220,26],[258,40],[295,27],[333,42],
  [18,98],[52,114],[87,84],[122,108],[157,92],[194,110],[230,86],[266,102],[302,94],[338,108],
  [26,168],[60,183],[94,154],[130,177],[166,160],[203,176],[240,156],[276,170],[312,164],[348,178],
  [20,238],[55,255],[90,225],[126,248],[162,230],[199,246],[236,227],[272,242],[308,234],[344,248],
  [24,308],[59,325],[94,295],[130,318],[166,300],[203,316],[240,297],[276,312],[312,304],[348,318],
  [18,378],[53,395],[88,365],[124,388],[160,370],[197,386],[234,367],[270,382],[306,374],[342,388],
  [23,448],[58,465],[93,435],[129,458],[165,440],[202,456],[239,437],[275,452],[311,444],[347,458],
  [28,518],[63,535],[98,505],[134,528],[170,510],[207,526],[244,507],[280,522],[316,514],[352,528],
  [380,30],[435,50],[490,25],[545,45],[600,32],[658,47],
  [388,198],[443,216],[498,186],[553,210],[608,193],[663,208],
  [395,288],[450,306],[505,276],[560,300],[615,283],[670,298],
  [402,378],[457,396],[512,366],[567,390],[622,373],[677,388],
  [408,468],[463,486],[518,456],[573,480],[628,463],[683,478],
  [710,172],[740,210],[772,252],[804,294],[835,336],[866,380],[896,424],
  [722,270],[754,315],[786,358],[818,403],[850,450],[880,490],
  [700,540],[740,555],[780,542],[820,558],[860,545],[900,556],
  [1055,158],[1062,232],[1058,318],[1055,406],[1062,486],
]

// Long horizontal chain: 3 segments separated by a junction and a dashed gap
// Each node: [x, y, highlighted(1/0)]
const CHAIN1 = [
  [18,82,1],[55,82,0],[92,82,0],[130,82,1],[168,82,0],[206,82,0],[244,82,1],[282,82,0],[320,82,0],
]
const CHAIN1_PAIRS = [[18,55],[55,92],[92,130],[130,168],[168,206],[206,244],[244,282],[282,320]]

// Drop from junction (320,82) → (320,122)
const DROP_NODES = [[320,122,0],[358,122,0]]
// Lines: (320,82)→(320,122), (320,122)→(358,122)

const CHAIN2 = [
  [358,82,0],[396,82,1],[434,82,0],[472,82,0],[510,82,1],
]
const CHAIN2_PAIRS = [[320,358],[358,396],[396,434],[434,472],[472,510]]

// Dashed gap 510→638 at y=82

const CHAIN3 = [
  [638,82,0],[676,82,1],[714,82,0],[750,82,0],[788,82,1],[826,82,0],[864,82,0],
]
const CHAIN3_PAIRS = [[638,676],[676,714],[714,750],[750,788],[788,826],[826,864]]

// Bend: 864,82 → 904,82 → 904,140 → 938,140
// Then trunk at x=938 from y=78 to y=490

const TX = 938  // trunk x
const TY0 = 78  // trunk top
const TY1 = 492 // trunk bottom

// Branch rows: each branching off the vertical trunk
// [y, [node x positions], [highlighted flags], [label bar widths]]
const BRANCHES = [
  { y: 90,  xs: [962, 998, 1035, 1062], hi: [1,0,0,0], lw: [38,26] },
  { y: 154, xs: [962, 998, 1035, 1062], hi: [0,1,0,0], lw: [42,30] },
  { y: 218, xs: [962, 998, 1035, 1062], hi: [1,0,0,0], lw: [36,24] },
  { y: 282, xs: [962, 998, 1035, 1062], hi: [0,0,1,0], lw: [40,28] },
  { y: 346, xs: [962, 998, 1035, 1062], hi: [1,0,0,0], lw: [38,26] },
  { y: 410, xs: [962, 998, 1035, 1062], hi: [0,1,0,0], lw: [44,32] },
  { y: 470, xs: [962, 998, 1035, 1062], hi: [1,0,0,0], lw: [36,24] },
]

// Sub-nodes that hang below certain branch nodes
const SUB_NODES = [
  { fromX: 998, fromY: 90,  toX: 998,  toY: 132, hi: false },
  { fromX: 998, fromY: 132, toX: 1035, toY: 132, hi: false },
  { fromX: 1035,fromY: 218, toX: 1035, toY: 256, hi: true  },
  { fromX: 1035,fromY: 256, toX: 1062, toY: 256, hi: false },
  { fromX: 998, fromY: 346, toX: 998,  toY: 384, hi: false },
]

// Individual Make.com-style workflow node
function MNode({ x, y, hi }) {
  const bg = hi ? 'rgba(232,164,96,0.26)' : 'rgba(194,98,45,0.14)'
  const bd = hi ? 'rgba(232,164,96,0.72)' : 'rgba(194,98,45,0.50)'
  const i1 = hi ? 'rgba(232,164,96,0.65)' : 'rgba(194,98,45,0.48)'
  const i2 = hi ? 'rgba(255,210,160,0.42)' : 'rgba(232,164,96,0.28)'
  return (
    <g>
      <rect x={x-14} y={y-10} width="28" height="20" rx="3.5" fill={bg} stroke={bd} strokeWidth="1"/>
      <rect x={x-9}  y={y-6}  width="9"  height="12" rx="2"   fill={i1}/>
      <rect x={x+2}  y={y-4}  width="5"  height="8"  rx="1.5" fill={i2}/>
      <rect x={x-11} y={y+13} width="22" height="2.5" rx="1"  fill="rgba(194,98,45,0.24)"/>
      <rect x={x-7}  y={y+18} width="14" height="2"  rx="1"   fill="rgba(194,98,45,0.14)"/>
    </g>
  )
}

const LC = 'rgba(212,120,74,0.50)'  // line color
const LW = '1.2'                     // line width

export default function CaseStudyImage({ label, src }) {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  if (src) {
    return (
      <motion.figure
        ref={ref}
        initial={{ opacity: 0, y: 28 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.22,1,0.36,1] }}
        style={{ maxWidth: 1100, margin: '0 auto clamp(56px,7vw,80px)', padding: '0 clamp(20px,3vw,40px)' }}
      >
        {label && (
          <figcaption style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 11, fontWeight: 600, letterSpacing: 2.2, textTransform: 'uppercase',
            color: '#C2622D', marginBottom: 14,
            display: 'inline-flex', alignItems: 'center', gap: 10,
          }}>
            <span style={{ width: 18, height: 1, background: 'linear-gradient(90deg, transparent, #C2622D)' }} />
            {label}
          </figcaption>
        )}
        <div style={{
          position: 'relative',
          borderRadius: 20, overflow: 'hidden',
          background: 'var(--night)',
          border: '1px solid var(--hair-warm)',
          boxShadow: '0 2px 4px rgba(20,16,12,0.04), 0 30px 70px rgba(194,98,45,0.10)',
        }}>
          <img
            src={src}
            alt={label || 'Workflow diagram'}
            style={{ width: '100%', display: 'block', objectFit: 'cover' }}
          />
          {/* Subtle frame veil */}
          <div style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            background: 'linear-gradient(180deg, rgba(20,16,12,0) 70%, rgba(20,16,12,0.18) 100%)',
          }} />
        </div>
      </motion.figure>
    )
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65 }}
      style={{ maxWidth: 1100, margin: '0 auto', padding: '0 clamp(16px,4vw,40px)', marginBottom: 56 }}
    >
      <div style={{
        width: '100%',
        aspectRatio: '16 / 9',
        background: 'linear-gradient(135deg,#0D0805 0%,#140A06 18%,#1A0F0A 35%,#2C1810 55%,#1A0F0A 78%,#0D0805 100%)',
        borderRadius: 18,
        position: 'relative',
        overflow: 'hidden',
        border: '1px solid rgba(194,98,45,0.22)',
        boxShadow: '0 0 0 1px rgba(194,98,45,0.06), 0 0 60px rgba(194,98,45,0.10), inset 0 0 60px rgba(194,98,45,0.04)',
      }}>

        {/* Central radial warm glow */}
        <div style={{ position:'absolute', top:'58%', left:'32%', transform:'translate(-50%,-50%)', width:'68%', height:'230%', background:'radial-gradient(ellipse,rgba(194,98,45,0.42) 0%,transparent 58%)', pointerEvents:'none' }} />
        {/* Right-side secondary glow */}
        <div style={{ position:'absolute', top:'38%', right:'10%', width:'22%', height:'110%', background:'radial-gradient(ellipse,rgba(212,120,74,0.12) 0%,transparent 65%)', pointerEvents:'none' }} />
        {/* Left edge vignette */}
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(90deg,rgba(0,0,0,0.35) 0%,transparent 18%)', pointerEvents:'none' }} />
        {/* Top edge vignette */}
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(180deg,rgba(0,0,0,0.3) 0%,transparent 15%)', pointerEvents:'none' }} />

        {/* Bottom edge bright glow line (matches screenshot) */}
        <div style={{ position:'absolute', bottom:0, left:0, right:0, height:'3px', background:'linear-gradient(90deg,transparent 0%,rgba(194,98,45,0.65) 25%,rgba(232,164,96,0.95) 50%,rgba(194,98,45,0.65) 75%,transparent 100%)', pointerEvents:'none' }} />
        <div style={{ position:'absolute', bottom:0, left:'5%', right:'5%', height:'50px', background:'radial-gradient(ellipse at 50% 100%,rgba(194,98,45,0.30) 0%,transparent 70%)', pointerEvents:'none' }} />

        <svg
          style={{ position:'absolute', inset:0, width:'100%', height:'100%' }}
          viewBox="0 0 1080 608"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* ── Stars ── */}
          {STARS.map(([x,y],i) => (
            <circle key={`s${i}`} cx={x} cy={y}
              r={i%5===0 ? 1.8 : i%3===0 ? 1.2 : 0.75}
              fill={`rgba(${i%4===0?'255,255,255':'232,164,96'},${i%5===0?0.55:i%3===0?0.32:0.18})`}
            />
          ))}

          {/* ── Chain 1 lines ── */}
          {CHAIN1_PAIRS.map(([x1,x2],i) => (
            <line key={`c1l${i}`} x1={x1} y1={82} x2={x2} y2={82} stroke={LC} strokeWidth={LW}/>
          ))}
          {/* ── Chain 1 nodes ── */}
          {CHAIN1.map(([x,y,h],i) => <MNode key={`c1n${i}`} x={x} y={y} hi={h===1}/>)}

          {/* ── Junction drop ── */}
          <line x1={320} y1={82} x2={320} y2={122} stroke={LC} strokeWidth={LW}/>
          <line x1={320} y1={122} x2={358} y2={122} stroke={LC} strokeWidth={LW}/>
          {DROP_NODES.map(([x,y,h],i) => <MNode key={`dn${i}`} x={x} y={y} hi={h===1}/>)}

          {/* ── Chain 2 lines ── */}
          {CHAIN2_PAIRS.map(([x1,x2],i) => (
            <line key={`c2l${i}`} x1={x1} y1={82} x2={x2} y2={82} stroke={LC} strokeWidth={LW}/>
          ))}
          {/* ── Chain 2 nodes ── */}
          {CHAIN2.map(([x,y,h],i) => <MNode key={`c2n${i}`} x={x} y={y} hi={h===1}/>)}

          {/* ── Dashed gap 510→638 ── */}
          <line x1={510} y1={82} x2={638} y2={82} stroke="rgba(212,120,74,0.32)" strokeWidth="1" strokeDasharray="6 5"/>

          {/* ── Chain 3 lines ── */}
          {CHAIN3_PAIRS.map(([x1,x2],i) => (
            <line key={`c3l${i}`} x1={x1} y1={82} x2={x2} y2={82} stroke={LC} strokeWidth={LW}/>
          ))}
          {/* ── Chain 3 nodes ── */}
          {CHAIN3.map(([x,y,h],i) => <MNode key={`c3n${i}`} x={x} y={y} hi={h===1}/>)}

          {/* ── Bend into trunk: 864,82→904,82→904,140→938,140 ── */}
          <line x1={864} y1={82} x2={904} y2={82}  stroke={LC} strokeWidth={LW}/>
          <line x1={904} y1={82} x2={904} y2={140} stroke={LC} strokeWidth={LW}/>
          <line x1={904} y1={140} x2={TX} y2={140} stroke={LC} strokeWidth={LW}/>

          {/* ── Vertical trunk ── */}
          <line x1={TX} y1={TY0} x2={TX} y2={TY1} stroke="rgba(212,120,74,0.46)" strokeWidth="1.5"/>

          {/* ── Branch rows ── */}
          {BRANCHES.map((row, ri) => (
            <g key={`br${ri}`}>
              {/* Trunk → first node connector */}
              <line x1={TX} y1={row.y} x2={row.xs[0]} y2={row.y} stroke="rgba(212,120,74,0.46)" strokeWidth="1.2"/>
              {/* Node-to-node lines */}
              {row.xs.slice(0,-1).map((nx, ni) => (
                <line key={`brl${ri}${ni}`} x1={nx} y1={row.y} x2={row.xs[ni+1]} y2={row.y} stroke="rgba(212,120,74,0.42)" strokeWidth="1.1"/>
              ))}
              {/* Nodes */}
              {row.xs.map((nx, ni) => (
                <MNode key={`brn${ri}${ni}`} x={nx} y={row.y} hi={row.hi[ni]===1}/>
              ))}
              {/* Label bars left of branch (small text-like bars) */}
              <rect x={TX-22} y={row.y+14} width={row.lw[0]} height="3"   rx="1.5" fill="rgba(194,98,45,0.28)"/>
              <rect x={TX-22} y={row.y+20} width={row.lw[1]} height="2.5" rx="1"   fill="rgba(194,98,45,0.18)"/>
            </g>
          ))}

          {/* ── Sub-nodes (hanging below certain branch nodes) ── */}
          {SUB_NODES.map((sn, i) => (
            <g key={`sub${i}`}>
              <line x1={sn.fromX} y1={sn.fromY+10} x2={sn.toX} y2={sn.toY-10}
                stroke="rgba(212,120,74,0.36)" strokeWidth="1"/>
              <MNode x={sn.toX} y={sn.toY} hi={sn.hi}/>
            </g>
          ))}
        </svg>

        {/* Scanline texture */}
        <div style={{ position:'absolute', inset:0, backgroundImage:'repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(0,0,0,0.04) 3px,rgba(0,0,0,0.04) 4px)', pointerEvents:'none', opacity:0.5 }} />

        {/* Label */}
        {label && (
          <div style={{ position:'absolute', bottom:16, left:18, fontSize:11, color:'rgba(232,164,96,0.35)', fontWeight:500, letterSpacing:1.5, textTransform:'uppercase' }}>
            {label}
          </div>
        )}
      </div>
    </motion.div>
  )
}
