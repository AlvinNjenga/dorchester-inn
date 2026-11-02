import { useEffect, useLayoutEffect, useRef } from 'react'
import { ScrollRestoration, useLocation, useNavigation, useNavigationType } from 'react-router'

export default function RouteTransitions() {
  const location = useLocation()
  const navigation = useNavigation()
  const action = useNavigationType()
  const previous = useRef(location)
  const initialized = useRef(false)
  const scroll = useRef({ left: 0, top: 0 })

  useEffect(() => {
    const remember = () => { scroll.current = { left: window.scrollX, top: window.scrollY } }
    remember()
    window.addEventListener('scroll', remember, { passive: true })
    return () => window.removeEventListener('scroll', remember)
  }, [])

  // ScrollRestoration's child layout effect runs first. Keep its per-history
  // restoration, but preserve position for new query-only updates.
  useLayoutEffect(() => {
    if (navigation.state !== 'idle') return
    const prior = previous.current
    const first = !initialized.current
    initialized.current = true
    previous.current = location
    const pageChanged = prior.pathname !== location.pathname
    const hashChanged = prior.hash !== location.hash
    const queryOnly = !pageChanged && !hashChanged && prior.search !== location.search

    if (queryOnly && action !== 'POP') window.scrollTo({ ...scroll.current, behavior: 'instant' })
    if (!pageChanged && !hashChanged && !(first && location.hash)) return

    let target: HTMLElement | null = null
    if (location.hash) {
      try { target = document.getElementById(decodeURIComponent(location.hash.slice(1))) } catch { /* Malformed fragments fall back to page content. */ }
    }
    if (!target && pageChanged) target = document.querySelector<HTMLElement>('#main-content h1') ?? document.getElementById('main-content')
    if (target) {
      if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1')
      target.focus({ preventScroll: true })
    }
  }, [location, navigation.state, action])

  return <ScrollRestoration storageKey="dorchester-scroll-positions" />
}
