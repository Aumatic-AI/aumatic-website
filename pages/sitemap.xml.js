import { caseStudies } from '../data/caseStudies'
import { SITE_URL } from '../data/constants'

function generateSitemap() {
  const today = new Date().toISOString().slice(0, 10)

  const staticUrls = [
    {
      loc: `${SITE_URL}/`,
      lastmod: today,
      changefreq: 'weekly',
      priority: '1.0',
    },
  ]

  const caseStudyUrls = caseStudies.map((study) => ({
    loc: `${SITE_URL}/case-studies/${study.slug}`,
    lastmod: study.updatedAt || study.date || today,
    changefreq: 'monthly',
    priority: '0.8',
  }))

  const urls = [...staticUrls, ...caseStudyUrls]

  const body = urls
    .map(
      (url) => `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`
    )
    .join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${body}
</urlset>`
}

export async function getServerSideProps({ res }) {
  res.setHeader('Content-Type', 'text/xml')
  res.write(generateSitemap())
  res.end()

  return {
    props: {},
  }
}

export default function Sitemap() {
  return null
}