import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Lenis from 'lenis'

export default function SmoothScroll({ children }) {
  const router = useRouter()

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.4,
    })

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    const id = requestAnimationFrame(raf)

    // Anchor-link interception → smooth scroll to id
    const onClick = (e) => {
      const a = e.target.closest('a[href^="#"], a[href^="/#"]')
      if (!a) return
      const href = a.getAttribute('href') || ''
      const id = href.includes('#') ? href.split('#')[1] : ''
      if (!id) return
      const el = document.getElementById(id)
      if (!el) return
      e.preventDefault()
      lenis.scrollTo(el, { offset: -72, duration: 1.3 })
    }
    document.addEventListener('click', onClick)

    // Route change → reset
    const onRoute = () => lenis.scrollTo(0, { immediate: true })
    router.events.on('routeChangeComplete', onRoute)

    return () => {
      cancelAnimationFrame(id)
      document.removeEventListener('click', onClick)
      router.events.off('routeChangeComplete', onRoute)
      lenis.destroy()
    }
  }, [router.events])

  return children
}
