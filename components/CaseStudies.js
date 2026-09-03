import { useState, useMemo, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import CaseStudyCard from './CaseStudyCard'
import { caseStudies } from '../data/caseStudies'

const ORANGE = '#FF8500'
const BLACK = '#0D0D0D'
const WHITE = '#FFFFFF'
const MUTED = '#77716D'
const LIGHT_LINE = '#E5E0DB'

const PER_PAGE = 6

const CATEGORIES = (() => {
  const seen = new Set()
  const out = ['All']

  for (const s of caseStudies) {
    const c = (s.industry || '').split('/')[0].trim()

    if (c && !seen.has(c)) {
      seen.add(c)
      out.push(c)
    }
  }

  return out
})()

export default function CaseStudies() {
  const headerRef = useRef(null)

  const inView = useInView(headerRef, {
    once: true,
    margin: '-70px',
  })

  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All')
  const [page, setPage] = useState(0)

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim()

    return caseStudies.filter((s) => {
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
        s.tags.some((t) =>
          t.toLowerCase().includes(q)
        )
      )
    })
  }, [query, category])

  const totalPages = Math.max(
    1,
    Math.ceil(filtered.length / PER_PAGE)
  )

  const safePage = Math.min(
    page,
    totalPages - 1
  )

  const pageItems = filtered.slice(
    safePage * PER_PAGE,
    (safePage + 1) * PER_PAGE
  )

  const reset = () => {
    setQuery('')
    setCategory('All')
    setPage(0)
  }

  return (
    <section
      id="case-studies"
      className="case-studies-section"
    >
      <div className="case-studies-container">

        {/* ================= HEADER ================= */}

        <motion.div
          ref={headerRef}
          initial={{
            opacity: 0,
            y: 24,
          }}
          animate={
            inView
              ? {
                  opacity: 1,
                  y: 0,
                }
              : {}
          }
          transition={{
            duration: 0.75,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="case-header"
        >
          <div className="case-header-left">

            <div className="section-label">
              <span className="label-dot" />
              Case Studies
            </div>

            <h2>
              Real clients.
              <br />
              <span>Real outcomes.</span>
            </h2>

          </div>

          <p className="case-header-description">
            A selection of automations we shipped recently —
            each one stripping hours of manual work out of a
            real business.
          </p>
        </motion.div>


        {/* ================= FILTERS ================= */}

        <motion.div
          initial={{
            opacity: 0,
            y: 14,
          }}
          animate={
            inView
              ? {
                  opacity: 1,
                  y: 0,
                }
              : {}
          }
          transition={{
            duration: 0.6,
            delay: 0.15,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="case-toolbar"
        >

          <div className="category-list">
            {CATEGORIES.map((c) => {
              const active = c === category

              return (
                <button
                  key={c}
                  onClick={() => {
                    setCategory(c)
                    setPage(0)
                  }}
                  className={`category-button ${
                    active ? 'active' : ''
                  }`}
                >
                  {c}
                </button>
              )
            })}
          </div>


          {/* SEARCH */}

          <div className="search-wrap">

            <svg
              width="14"
              height="14"
              viewBox="0 0 16 16"
              fill="none"
              className="search-icon"
              aria-hidden="true"
            >
              <circle
                cx="6.5"
                cy="6.5"
                r="4.5"
                stroke="currentColor"
                strokeWidth="1.4"
              />

              <path
                d="M10 10L13.5 13.5"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
              />
            </svg>

            <input
              type="text"
              placeholder="Search"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value)
                setPage(0)
              }}
              aria-label="Search case studies"
            />

            {query && (
              <button
                onClick={() => {
                  setQuery('')
                  setPage(0)
                }}
                aria-label="Clear search"
                className="clear-search"
              >
                ×
              </button>
            )}

          </div>

        </motion.div>


        {/* ================= COUNT ================= */}

        <div className="case-count">
          <span>
            {filtered.length}{' '}
            {filtered.length === 1
              ? 'study'
              : 'studies'}
          </span>

          {(query || category !== 'All') && (
            <button
              onClick={reset}
              className="reset-button"
            >
              Reset filters
            </button>
          )}
        </div>


        {/* ================= CARDS ================= */}

        <AnimatePresence mode="wait">

          {pageItems.length > 0 ? (

            <motion.div
              key={`${query}-${category}-${safePage}`}
              initial={{
                opacity: 0,
                y: 12,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                y: -8,
              }}
              transition={{
                duration: 0.35,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="case-grid"
            >
              {pageItems.map((study, i) => (
                <CaseStudyCard
                  key={study.slug}
                  study={study}
                  index={i}
                />
              ))}
            </motion.div>

          ) : (

            /* ================= EMPTY ================= */

            <motion.div
              key="empty"
              initial={{
                opacity: 0,
                y: 10,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                y: -10,
              }}
              transition={{
                duration: 0.3,
              }}
              className="empty-state"
            >

              <div className="empty-icon">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <circle
                    cx="11"
                    cy="11"
                    r="7"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />

                  <path
                    d="m21 21-4.35-4.35"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </div>

              <h3>
                No matches
              </h3>

              <p>
                Try a different keyword or reset
                the filters.
              </p>

              <button
                onClick={reset}
                className="empty-reset"
              >
                Reset filters
                <span>↗</span>
              </button>

            </motion.div>

          )}

        </AnimatePresence>


        {/* ================= PAGINATION ================= */}

        {totalPages > 1 && (
          <motion.div
            initial={{
              opacity: 0,
            }}
            whileInView={{
              opacity: 1,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              delay: 0.2,
            }}
            className="pagination"
          >

            <button
              onClick={() =>
                setPage((p) =>
                  Math.max(0, p - 1)
                )
              }
              disabled={safePage === 0}
              className="pagination-arrow"
            >
              ←
              <span>Prev</span>
            </button>


            <div className="page-numbers">
              {Array.from(
                { length: totalPages },
                (_, i) => {
                  const active = i === safePage

                  return (
                    <button
                      key={i}
                      onClick={() => setPage(i)}
                      className={`page-number ${
                        active ? 'active' : ''
                      }`}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </button>
                  )
                }
              )}
            </div>


            <button
              onClick={() =>
                setPage((p) =>
                  Math.min(
                    totalPages - 1,
                    p + 1
                  )
                )
              }
              disabled={
                safePage === totalPages - 1
              }
              className="pagination-arrow"
            >
              <span>Next</span>
              →
            </button>

          </motion.div>
        )}

      </div>


      {/* ================= STYLES ================= */}

      <style>{`

        /* =====================================
           SECTION
        ====================================== */

        .case-studies-section {
          position: relative;
          overflow: hidden;

          padding:
            clamp(85px, 9vw, 125px)
            0;

          background: ${WHITE};
          color: ${BLACK};

          border-top: 1px solid ${LIGHT_LINE};
        }


        .case-studies-container {
          width:
            min(1280px, calc(100% - 80px));

          margin: 0 auto;
        }


        /* =====================================
           HEADER
        ====================================== */

        .case-header {
          display: grid;

          grid-template-columns:
            minmax(0, 1fr)
            minmax(280px, 0.55fr);

          align-items: end;

          gap:
            clamp(40px, 8vw, 110px);

          margin-bottom:
            clamp(48px, 5vw, 65px);
        }


        .section-label {
          display: flex;
          align-items: center;

          gap: 9px;

          margin-bottom: 20px;

          font-family:
            'Inter',
            sans-serif;

          font-size: 9px;
          font-weight: 700;

          letter-spacing: 0.14em;

          text-transform: uppercase;

          color: ${ORANGE};
        }


        .label-dot {
          width: 6px;
          height: 6px;

          flex-shrink: 0;

          border-radius: 50%;

          background: ${ORANGE};
        }


        .case-header h2 {
          margin: 0;

          font-family:
            'Onest',
            sans-serif;

          font-size:
            clamp(50px, 6.5vw, 88px);

          font-weight: 800;

          letter-spacing: -0.075em;

          line-height: 0.87;

          color: ${BLACK};
        }


        .case-header h2 span {
          color: ${ORANGE};
        }


        .case-header-description {
          max-width: 380px;

          margin: 0;

          padding-bottom: 3px;

          font-family:
            'Inter',
            sans-serif;

          font-size: 13px;

          line-height: 1.7;

          color: ${MUTED};
        }


        /* =====================================
           FILTER TOOLBAR
        ====================================== */

        .case-toolbar {
          display: flex;
          align-items: center;
          justify-content: space-between;

          gap: 24px;

          padding: 14px 0;

          border-top: 1px solid ${BLACK};
          border-bottom: 1px solid ${LIGHT_LINE};
        }


        .category-list {
          display: flex;
          align-items: center;

          gap: 4px;

          flex-wrap: wrap;
        }


        .category-button {
          padding: 8px 12px;

          border: none;
          outline: none;
          border-radius: 0;

          background: transparent;

          color: ${MUTED};

          font-family:
            'Inter',
            sans-serif;

          font-size: 11px;
          font-weight: 500;

          cursor: pointer;

          transition:
            color 0.2s ease,
            background 0.2s ease;
        }


        .category-button:hover {
          color: ${BLACK};
        }


        .category-button.active {
          background: ${ORANGE};
          color: ${WHITE};
        }


        /* =====================================
           SEARCH
        ====================================== */

        .search-wrap {
          position: relative;

          display: flex;
          align-items: center;

          flex-shrink: 0;
        }


        .search-icon {
          position: absolute;

          left: 0;

          color: ${MUTED};

          pointer-events: none;
        }


        .search-wrap input {
          width: 190px;

          padding:
            7px 28px
            7px 22px;

          border: none;

          border-bottom:
            1px solid #BEB8B3;

          border-radius: 0;

          outline: none;

          background: transparent;

          font-family:
            'Inter',
            sans-serif;

          font-size: 12px;

          color: ${BLACK};
        }


        .search-wrap input::placeholder {
          color: #99928D;
        }


        .search-wrap input:focus {
          border-bottom-color: ${ORANGE};
        }


        .clear-search {
          position: absolute;

          right: 0;

          padding: 0;

          border: none;
          outline: none;

          background: none;

          color: ${MUTED};

          font-size: 16px;

          line-height: 1;

          cursor: pointer;
        }


        .clear-search:hover {
          color: ${ORANGE};
        }


        /* =====================================
           COUNT
        ====================================== */

        .case-count {
          display: flex;
          align-items: center;

          gap: 15px;

          padding:
            15px 0 22px;

          font-family:
            'Inter',
            sans-serif;

          font-size: 10px;

          font-weight: 600;

          letter-spacing: 0.08em;

          text-transform: uppercase;

          color: #99928D;
        }


        .reset-button {
          padding: 0;

          border: none;
          outline: none;

          background: none;

          font-family:
            'Inter',
            sans-serif;

          font-size: 10px;

          font-weight: 600;

          letter-spacing: 0.08em;

          text-transform: uppercase;

          color: ${ORANGE};

          cursor: pointer;
        }


        .reset-button:hover {
          color: ${BLACK};
        }


        /* =====================================
           CASE STUDY GRID
        ====================================== */

        .case-grid {
          display: grid;

          grid-template-columns:
            repeat(3, minmax(0, 1fr));

          gap:
            clamp(18px, 2vw, 26px);

          align-items: stretch;
        }


        /* =====================================
           CARD RESET
        ====================================== */

        .case-grid > * {
          width: 100%;
          min-width: 0;
          height: 100%;

          border-radius: 0 !important;

          outline: none !important;

          box-shadow: none !important;

          filter: none !important;

          background: ${WHITE};

          transform: none;
        }


        /*
          Remove every rounded corner,
          shadow and glow from anything
          inside the imported card.
        */

        .case-grid > * *,
        .case-grid > *::before,
        .case-grid > *::after {
          border-radius: 0 !important;

          box-shadow: none !important;

          filter: none !important;
        }


        /* =====================================
           ORANGE CARD CONTENT
        ====================================== */

        /*
          The lower content panel of each
          CaseStudyCard becomes solid orange.

          This catches common card-content
          wrappers without changing the
          image section above it.
        */

        .case-grid > * > div:last-child {
          background: ${ORANGE} !important;

          color: ${WHITE} !important;

          border: none !important;

          outline: none !important;

          box-shadow: none !important;
        }


        .case-grid > * > div:last-child * {
          color: ${WHITE} !important;

          border-color: transparent !important;

          text-shadow: none !important;
        }


        /*
          Headings inside the orange
          content area remain white.
        */

        .case-grid > * > div:last-child h1,
        .case-grid > * > div:last-child h2,
        .case-grid > * > div:last-child h3,
        .case-grid > * > div:last-child h4,
        .case-grid > * > div:last-child h5,
        .case-grid > * > div:last-child h6 {
          color: ${WHITE} !important;
        }


        /*
          Body copy and metadata.
        */

        .case-grid > * > div:last-child p,
        .case-grid > * > div:last-child span,
        .case-grid > * > div:last-child small,
        .case-grid > * > div:last-child strong {
          color: ${WHITE} !important;
        }


        /*
          Links / arrows inside the orange
          section stay white.
        */

        .case-grid > * > div:last-child a {
          color: ${WHITE} !important;

          text-decoration: none;
        }


        .case-grid > * > div:last-child svg {
          color: ${WHITE} !important;

          stroke: currentColor;
        }


        /*
          No hover glow, border or shadow.
          Keep cards visually fixed.
        */

        .case-grid > *:hover {
          border-radius: 0 !important;

          outline: none !important;

          box-shadow: none !important;

          filter: none !important;

          transform: none !important;
        }


        /* =====================================
           EMPTY STATE
        ====================================== */

        .empty-state {
          min-height: 280px;

          display: flex;
          flex-direction: column;

          align-items: center;
          justify-content: center;

          text-align: center;

          padding: 40px;

          border-top: 1px solid ${BLACK};
          border-bottom: 1px solid ${BLACK};

          background: ${WHITE};
        }


        .empty-icon {
          width: 42px;
          height: 42px;

          display: flex;
          align-items: center;
          justify-content: center;

          margin-bottom: 18px;

          border-radius: 0;

          background: ${ORANGE};

          color: ${WHITE};

          box-shadow: none;
        }


        .empty-state h3 {
          margin: 0 0 7px;

          font-family:
            'Onest',
            sans-serif;

          font-size: 25px;

          font-weight: 700;

          letter-spacing: -0.04em;

          color: ${BLACK};
        }


        .empty-state p {
          margin: 0 0 20px;

          font-family:
            'Inter',
            sans-serif;

          font-size: 12px;

          color: ${MUTED};
        }


        .empty-reset {
          display: inline-flex;
          align-items: center;

          gap: 8px;

          padding:
            0 0 3px;

          border: none;

          border-bottom:
            1px solid ${BLACK};

          outline: none;

          border-radius: 0;

          background: none;

          font-family:
            'Inter',
            sans-serif;

          font-size: 11px;

          font-weight: 600;

          color: ${BLACK};

          cursor: pointer;
        }


        .empty-reset:hover {
          color: ${ORANGE};

          border-color: ${ORANGE};
        }


        /* =====================================
           PAGINATION
        ====================================== */

        .pagination {
          display: flex;
          align-items: center;
          justify-content: center;

          gap: 20px;

          margin-top:
            clamp(40px, 5vw, 58px);
        }


        .pagination-arrow {
          display: inline-flex;
          align-items: center;

          gap: 7px;

          padding: 0;

          border: none;
          outline: none;

          border-radius: 0;

          background: transparent;

          font-family:
            'Inter',
            sans-serif;

          font-size: 10px;

          font-weight: 600;

          letter-spacing: 0.08em;

          text-transform: uppercase;

          color: ${BLACK};

          cursor: pointer;
        }


        .pagination-arrow:hover:not(:disabled) {
          color: ${ORANGE};
        }


        .pagination-arrow:disabled {
          color: #C8C2BD;

          cursor: not-allowed;
        }


        .page-numbers {
          display: flex;
          align-items: center;

          gap: 4px;
        }


        .page-number {
          width: 30px;
          height: 30px;

          padding: 0;

          border: none;
          outline: none;

          border-radius: 0;

          background: transparent;

          font-family:
            'Inter',
            sans-serif;

          font-size: 10px;

          font-weight: 600;

          color: ${MUTED};

          cursor: pointer;
        }


        .page-number:hover {
          color: ${BLACK};
        }


        .page-number.active {
          background: ${ORANGE};

          color: ${WHITE};
        }


        /* =====================================
           TABLET
        ====================================== */

        @media (max-width: 1024px) {

          .case-grid {
            grid-template-columns:
              repeat(2, minmax(0, 1fr));
          }


          .case-header {
            grid-template-columns:
              1fr 0.65fr;

            gap: 50px;
          }

        }


        /* =====================================
           MOBILE
        ====================================== */

        @media (max-width: 680px) {

          .case-studies-section {
            padding:
              70px 0 80px;
          }


          .case-studies-container {
            width:
              calc(100% - 32px);
          }


          .case-header {
            display: block;

            margin-bottom: 42px;
          }


          .case-header h2 {
            font-size:
              clamp(43px, 13vw, 62px);
          }


          .case-header-description {
            margin-top: 24px;

            max-width: 420px;

            font-size: 12px;
          }


          .case-toolbar {
            display: block;

            padding: 12px 0;
          }


          .category-list {
            margin-bottom: 14px;

            overflow-x: auto;

            flex-wrap: nowrap;

            padding-bottom: 2px;

            scrollbar-width: none;
          }


          .category-list::-webkit-scrollbar {
            display: none;
          }


          .category-button {
            flex-shrink: 0;
          }


          .search-wrap {
            width: 100%;
          }


          .search-wrap input {
            width: 100%;
          }


          .case-count {
            padding-bottom: 18px;
          }


          .case-grid {
            grid-template-columns: 1fr;

            gap: 18px;
          }


          .pagination {
            gap: 12px;

            margin-top: 40px;
          }

        }


        /* =====================================
           SMALL MOBILE
        ====================================== */

        @media (max-width: 400px) {

          .case-header h2 {
            font-size: 42px;
          }


          .pagination-arrow span {
            display: none;
          }


          .page-number {
            width: 27px;
            height: 27px;
          }

        }

      `}</style>
    </section>
  )
}