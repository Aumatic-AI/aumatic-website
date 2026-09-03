# AGENTS.md — Aumatic.AI Next.js Site

Single-page marketing site for **Aumatic.AI**, an AI Automation Agency. Statically generated with Next.js Pages Router, no backend, no database, no API routes. Content is hand-authored in component files and one data module.

## Stack

- **Next.js 14** (Pages Router — `pages/_app.js`, `pages/_document.js`, `pages/index.js`, `pages/case-studies/[slug].js`)
- **React 18**
- **Framer Motion 11** — section reveals, hover micro-interactions, AnimatePresence, mouse-tracked motion values
- **Lenis** — smooth-scrolling provider wrapped around the whole app (`components/SmoothScroll.js`)
- **Tailwind CSS 3** — configured but used **sparingly**; almost all styling is inline `style={{...}}` or in `styles/globals.css`
- **No TypeScript**, no ESLint config, no test framework, no CI

`tailwind.config.js` is a bare default config (no `extend`) — the live design system is the warm-beige terracotta palette defined as CSS variables in `styles/globals.css`. Treat the CSS variables as the source of truth.

## Commands

```bash
npm install        # deps
npm run dev        # http://localhost:3000
npm run build      # production build
npm start          # serve production build
```

`setup.sh` / `setup.bat` are convenience wrappers around `npm install && npm run dev`.

## Routes

| Path                       | File                              | Render        |
|----------------------------|-----------------------------------|---------------|
| `/`                        | `pages/index.js`                  | Client (intro reveal, then sections) |
| `/case-studies/[slug]`     | `pages/case-studies/[slug].js`    | SSG via `getStaticPaths` + `getStaticProps` from `data/caseStudies.js`, `fallback: false` |

There is no `/case-studies` index page — cards on the home page link directly into individual case study slugs.

## Page composition (`pages/index.js`)

A ~850ms `<Intro>` overlays the page on first mount, then `<AnimatePresence>` fades it out and renders:

```
Navbar → Hero → LogoBar → Process → Capabilities → WhyUs → CaseStudies → Testimonials → Impact → FAQ → Contact → Footer
                                                                                                          + StickyCTA (after 720px scroll)
                                                                                                          + WhatsAppFloat (fixed bottom-right)
                                                                                                          + CursorGlow (radial follow)
                                                                                                          + ScrollProgress (top hairline)
```

Each `<section>` has an `id=` (`process`, `capabilities`, `why-us`, `case-studies`, `impact`, `faq`, `contact`) that the navbar anchors target. Anchor clicks are intercepted by `SmoothScroll` and animated via Lenis with a `-72px` offset (clears the floating navbar).

## Global wiring

- **`pages/_app.js`** — wraps every page in `<SmoothScroll>`. Holds the viewport meta tag only.
- **`pages/_document.js`** — loads Google Fonts (`Inter`, `Instrument Serif`, `Montserrat`) via `<link rel="stylesheet">`. Don't put `<link rel="stylesheet">` in `next/head` — Next warns.
- **`components/SmoothScroll.js`** — wraps children in Lenis. Sets `duration: 1.15`, custom exp easing, intercepts anchor clicks (`a[href^="#"]`, `a[href^="/#"]`) to call `lenis.scrollTo` with `-72px` offset. Resets scroll on route change.

## Components (all in `components/`)

Self-contained, single-default-export React files. Data (steps, cards, testimonials, FAQ items) lives **inside** each component as a top-level `const` array — except case studies.

| Component         | Live? | Purpose |
|-------------------|-------|---------|
| `SmoothScroll.js` | ✅ wraps app | Lenis provider + anchor-link interception. |
| `Navbar.js`       | ✅ | Floating pill nav with backdrop blur, magnetic Book-a-Call CTA, full-screen mobile drawer (serif menu items). On non-home routes, links rewrite to `/#anchor`. |
| `Hero.js`         | ✅ | Instrument Serif display headline with word-by-word reveal (`WordReveal`), GSAP-style scroll parallax on warm blob layers, magnetic CTA, scroll hint, stat row. |
| `LogoBar.js`      | ✅ | Infinite CSS marquee of 15 tool wordmarks. Pause on hover. Mask-fade edges. |
| `Process.js`      | ✅ | 4-step "Deep Analysis → Architecture → Build & Deploy → Train & Optimize" cards in a 2-column grid with serif numerals + scroll-linked vertical timeline rail (`useScroll`/`useTransform`). |
| `Capabilities.js` | ✅ | 6 capability cards (AI/ML, Automation Platforms, CRM, Engineering, Business Tools, Data). **3D parallax tilt + fan-out card reveal on hover** — see [Capabilities hover](#capabilities-hover) section. |
| `WhyUs.js`        | ✅ | 4-reason editorial split: sticky-left intro, right column with icon-orb rows. |
| `CaseStudies.js`  | ✅ | Searchable + category-filtered + paginated (6/page) grid of `CaseStudyCard`s. Filters across title, summary, industry, category, tags. |
| `CaseStudyCard.js`| ✅ | Card with thumbnail (`study.image`), 3D mouse-tilt on hover, scale-up image, brand-tinted category chip. Links to `/case-studies/[slug]`. (The hand-drawn SVG `<WorkflowBanner>` fallback was removed — every case study now has an `image`.) |
| `CaseStudyHero.js`, `CaseStudySection.js`, `CaseStudyImage.js` | ✅ | Detail-page building blocks used by `[slug].js`. Hero renders metric tiles; sections render with sticky-eyebrow side rail + numbered/checked/branded bullet styles by `section.type`. |
| `Testimonials.js` | ✅ | Single editorial quote with autoplay (6.2s, pauses on hover), prev/next + dot pagination, decorative serif quote mark. |
| `Impact.js`       | ✅ | Dark gradient bg. 4 animated count-up stats + problem/solution/outcome table (desktop) / cards (mobile). |
| `FAQ.js`          | ✅ | Sticky-left intro + right-column accordion. Plus→cross icon morph on open. AnimatePresence smooth height transitions. |
| `Contact.js`      | ✅ | Two-column: floating-label form (with animated focus rings + success state) + perks column + direct channel links. Form has no backend — logs to state only on submit. |
| `Footer.js`       | ✅ | Big serif "Ready when you are." headline + columns + giant decorative wordmark. Most footer links are placeholder `#`. |
| `StickyCTA.js`    | ✅ | Fixed bottom pill ("3 spots left this month") appearing after `>720px` scroll. |
| `WhatsAppFloat.js`| ✅ | Fixed bottom-right WhatsApp button → `wa.me/919849884501`, with double pulse-ring. |

When adding a new section, import it in `pages/index.js` and put it in the `<main>` order — that file is the section registry.

## Capabilities hover (the centerpiece)

Each card has three layered effects that fire on `hovered` state:

1. **3D parallax tilt** — `useMotionValue(mx, my)` track mouse position relative to card, damped via `useSpring(180, 18)`, mapped through `useTransform` to `rotateX: ±7°` and `rotateY: ±9°`. A specular sheen (`mixBlendMode: overlay`) sweeps based on the same motion values for "glass" feel.
2. **Scale-up** — card animates to `scale: 1.025` on hover, 500ms ease-out.
3. **Fan-out logo reveal** — `<FanStack>` lives in a **sibling back layer** (`zIndex: 0`, behind the article). The article has `zIndex: 1` + opaque background, so at rest the logo cards are fully occluded. On hover they spring-animate upward (`riseY = -225` standard, `-230` featured) and out into a slight arc, emerging from behind the article's top edge with ~85% of each card visible above the article and ~15% still tucked behind. Spring config: `stiffness: 260, damping: 22, mass: 0.75`. Stagger: center card first, outers last (`delay: 0.05 + |off| × 0.06`).

Card dimensions: standard `78×104`, featured `92×120`. Light overlap (~20%): standard spacing `62`, featured spacing `74`. Mouse handlers are on the **wrapper** (not the article) so the hover area covers both the back layer and the article.

**Brand logos via Iconify CDN** — `https://api.iconify.design/{prefix}:{slug}.svg`. Mostly `logos:` collection (multi-color official brand SVGs) with `simple-icons:` fallback for Make/n8n/BigQuery (monochrome). Graceful fallback (brand-color circle with initials) if any logo 404s. See `CATS` array in `Capabilities.js` for the full slug list — all 30 were verified to return 200.

## Case studies (`data/caseStudies.js`)

Single source of truth for the detail pages. Each entry has the shape:

```js
{
  slug, image, title, client, industry, date, tags, gradient, icon,
  summary, description, category, metricsLabel,
  metrics: [{ value, label }, ...],            // detail-page hero tiles
  sections: [
    { type: 'challenge'   | 'solution' | 'whyItWorks' | 'impact',
      title, content?, bullets? },
    ...
  ],
  images?: [...],                              // optional extra workflow images
}
```

`pages/case-studies/[slug].js` interleaves `study.images[1]` after section 2 and `study.images[2]` after section 3 as `<CaseStudyImage>` blocks. To add a case study:

1. Add an object to the `caseStudies` array in `data/caseStudies.js`.
2. Drop the thumbnail and any workflow images into `public/`.
3. The route is generated automatically at build time (`getStaticPaths`).

**UTF-8 mojibake has been cleaned** — em-dashes, smart quotes, bullets, ×, →, and emoji icons all render correctly now. Maintain proper Unicode when editing.

## Design system (CSS vars in `styles/globals.css`)

Warm beige + terracotta. **Use these tokens** — don't introduce ad-hoc colors.

```
--bg              #F5EFE8     page background
--bg-alt          #EFE6D8     alternate section background
--bg-card         #FBF6EE     card surface
--bg-elev         #FFFFFF     elevated/floating elements
--accent          #C2622D     primary terracotta
--accent-deep    #A8501F
--accent-light   #D4784A
--accent-glow    #E8A060
--ink             #14100C     primary text
--ink-soft        #3D2314
--ink-mute        #6E5A4A
--ink-dim         #A89684
--night           #1A0F0A     dark sections (Impact, Footer)
--night-deep      #0D0805
--hair            rgba(20,16,12,0.06)
--hair-warm       rgba(194,98,45,0.14)
```

Shadow ladder: `--shadow-1` through `--shadow-4`, plus `--shadow-glow`.
Easings: `--ease-out`, `--ease-in`, `--ease-soft`, `--ease-spring`.
Radii: `--radius-xs/sm/md/lg/xl/pill`.

### Typography

Three families, loaded from Google Fonts via `_document.js`:

- **Instrument Serif** (`--font-display`) — every `h1`, `h2`, `h3`, plus eyebrow display moments. The italic variant is used heavily for accent words ("intelligent", "Outcome-obsessed", etc.).
- **Inter** (`--font-sans`) — body, UI, buttons. Includes feature settings (`ss01`, `cv11`, `liga`, `kern`).
- **Montserrat** (`--font-brand`) — reserved for the **Aumatic.AI** wordmark only.

Fluid scale via `clamp()` — see `--t-hero` through `--t-xs`.

Global utilities: `.container`, `.container-tight`, `.section`, `.section-tight`, `.grid-2`, `.grid-3`, `.grid-4`, `.card`, `.card-flat`, `.tag`, `.eyebrow`, `.btn`, `.btn-primary`, `.btn-ghost`, `.btn-arrow`, `.rule`, `.marquee`, `.marquee-track`, `.pulse-ring`, `.shimmer-text`, `.t-shimmer`, `.link-underline`, `.hide-mobile`, `.show-mobile`, `.font-display`, `.font-sans`, `.font-brand`.

Keyframes: `blob1/2/3`, `orb-pulse`, `float-particle`, `spin-slow`, `marquee`, `pulse-ring`, `glow-breathe`, `word-up`, `fade-up`, `ticker-fade`, `shimmer`.

## Conventions

- **Inline styles dominate.** Tailwind is in deps but used in <10% of components. Match the surrounding style — don't refactor inline styles to Tailwind classes without being asked.
- **Animations:** every animated element wraps in `motion.*` from `framer-motion`. Scroll reveals use `useInView(ref, { once: true, margin: '-40px' })`. Stagger via `delay: (i % cols) * 0.08` or `delay: distFromCenter × 0.05`.
- **No randomness at render time.** SSR/CSR positions are hardcoded (sparkle particles, fan-card scatter, etc.). Don't introduce `Math.random()` in render.
- **External CTAs all point to** `https://cal.com/chandan-kumar-zhrofj/30min`. WhatsApp is `919849884501`. If either needs to change, grep — they're duplicated across several components.
- **3D transforms** use `perspective` on the wrapper + `transformStyle: preserve-3d` on the rotating element. Children with `transform: translateZ(Npx)` parallax forward/back. See `Capabilities.js` for the full pattern.
- **Image assets** live flat in `public/` with descriptive filenames (some contain spaces — keep the existing names, just URL-encode if needed).
- **Mobile breakpoints:** `1024px` (collapse 3→2 col grids), `720px` (collapse to single column), `560px` (footer columns collapse). The `.hide-mobile` / `.show-mobile` pair is defined globally.
- **Body scroll lock** on mobile menu open — `document.body.style.overflow = 'hidden'`.

## Things to know before editing

- The legacy `HowItWorks.js`/`Pricing.js`/`Results.js`/`Services.js` components and the dead `brand` color palette/animation keyframes in `tailwind.config.js` (their only consumers) have been deleted. The README still describes that dark-theme version; treat the README as out of date and the CSS variables + live components as ground truth.
- The intro `<Intro>` in `pages/index.js` blocks the UI for ~850ms on every navigation to `/`. Edit the `setTimeout(onDone, 850)` if you need to shorten it for dev.
- `next.config.js` enables `reactStrictMode` only — no images optimization config, so `<img>` is used directly (no `next/image`). Iconify CDN responses are SVG, served with CORS.
- There is no analytics, no form backend, no env vars. The Contact form (`Contact.js`) flips to a success state after a fake `setTimeout(800)`.
- Recent commits show the site is in active polish mode (typography, hover effects, WhatsApp number, workflow images, then a senior-level redesign). Visual fidelity matters more than refactor cleanliness here.

## Quick map

```
pages/
  _app.js                  global CSS import + SmoothScroll wrapper
  _document.js             Google Fonts (Inter + Instrument Serif + Montserrat)
  index.js                 home page + Intro + CursorGlow + ScrollProgress
  case-studies/[slug].js   SSG detail page
components/
  SmoothScroll.js          Lenis provider
  Navbar.js, Hero.js, LogoBar.js, Process.js, Capabilities.js,
  WhyUs.js, CaseStudies.js, CaseStudyCard.js, Testimonials.js,
  Impact.js, FAQ.js, Contact.js, Footer.js, StickyCTA.js, WhatsAppFloat.js
  CaseStudyHero.js, CaseStudySection.js, CaseStudyImage.js
data/
  caseStudies.js           12 case studies (mojibake cleaned)
styles/
  globals.css              design tokens, utilities, keyframes
public/                    images, favicon, logo, brand
tailwind.config.js         bare default config, no extend
next.config.js             reactStrictMode only
```
