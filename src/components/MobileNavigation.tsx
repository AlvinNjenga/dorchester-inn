import { useEffect, useRef, useState } from 'react'
import { NavLink, useLocation } from 'react-router'
import { bookingLink, primaryNavigation, secondaryNavigation } from '@/content/navigation'
import { isNavigationSectionActive } from '@/app/navigation'
import MobileNavigationGroup from '@/components/MobileNavigationGroup'

const linkClass = 'inline-flex min-h-11 items-center justify-center rounded-sm px-3 py-2 text-sm/normal font-normal tracking-wide text-surface no-underline decoration-gold decoration-2 underline-offset-8 hover:underline aria-[current=page]:underline'

export default function MobileNavigation() {
  const location = useLocation()
  const [menu, setMenu] = useState({ open: false, routeKey: location.key })
  // Discard the old open state permanently, rather than merely hiding it:
  // otherwise returning to its history key can unexpectedly reopen the menu.
  if (menu.routeKey !== location.key) {
    setMenu({ open: false, routeKey: location.key })
  }
  const open = menu.open && menu.routeKey === location.key
  const root = useRef<HTMLDivElement>(null)
  const toggle = useRef<HTMLButtonElement>(null)

  function close(restoreFocus: boolean) {
    setMenu({ open: false, routeKey: location.key })
    if (restoreFocus) toggle.current?.focus()
  }

  useEffect(() => {
    if (!open) return
    function dismiss(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        event.preventDefault()
        setMenu({ open: false, routeKey: location.key })
        toggle.current?.focus()
      }
    }
    function outside(event: PointerEvent) {
      if (event.target instanceof Node && !root.current?.contains(event.target)) {
        setMenu({ open: false, routeKey: location.key })
      }
    }
    const desktop = window.matchMedia('(min-width: 64rem)')
    function resize(event: MediaQueryListEvent) {
      if (event.matches) setMenu({ open: false, routeKey: location.key })
    }
    document.addEventListener('keydown', dismiss)
    document.addEventListener('pointerdown', outside)
    desktop.addEventListener('change', resize)
    return () => {
      document.removeEventListener('keydown', dismiss)
      document.removeEventListener('pointerdown', outside)
      desktop.removeEventListener('change', resize)
    }
  }, [open, location.key])

  return (
    <div ref={root} className="lg:hidden" onBlur={event => {
      if (event.relatedTarget instanceof Node && !event.currentTarget.contains(event.relatedTarget)) close(false)
    }}>
      <button ref={toggle} type="button" aria-label={open ? 'Close navigation' : 'Open navigation'} aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setMenu({ open: !open, routeKey: location.key })} className="flex min-h-11 min-w-11 items-center justify-center rounded-sm text-surface">
        <svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round">
          {open ? <path d="m6 6 12 12M18 6 6 18" /> : <path d="M4 6h16M4 12h16M4 18h16" />}
        </svg>
      </button>
      <nav id="mobile-navigation" aria-label="Mobile navigation" hidden={!open} className="absolute inset-x-0 top-full max-h-[calc(100dvh-5rem)] overflow-y-auto overscroll-contain rounded-b-lg border-t border-surface/10 bg-brand-logo px-5 py-4 text-center shadow-lg lg:hidden">
        {open && <>
          <ul role="list" className="mx-auto max-w-sm space-y-1">
            {primaryNavigation.map(item => (
              <li key={item.id} data-section-active={isNavigationSectionActive(item, location.pathname) || undefined}>
                {item.kind === 'link' ? <NavLink to={item.to} end className={linkClass} onClick={() => close(true)}>{item.label}</NavLink> : (item.id === 'rooms' || item.id === 'services') && item.to ? (
                  <MobileNavigationGroup label={item.label} to={item.to} links={item.children} active={isNavigationSectionActive(item, location.pathname)} onNavigate={() => close(true)} />
                ) : (
                  <details className="group">
                    <summary data-section-active={isNavigationSectionActive(item, location.pathname) || undefined} className={`${linkClass} cursor-pointer list-none gap-2 data-[section-active=true]:text-gold  [&::-webkit-details-marker]:hidden`}>
                      {item.label}
                    </summary>
                    <ul role="list" className="my-2 space-y-1 rounded-lg bg-surface/5 p-2">
                      {item.children.map(link => <li key={link.to}><NavLink to={link.to} end className={linkClass} onClick={() => close(true)}>{link.label}</NavLink></li>)}
                    </ul>
                  </details>
                )}
              </li>
            ))}
            {secondaryNavigation.map(link => <li key={link.to}><NavLink to={link.to} end className={linkClass} onClick={() => close(true)}>{link.label}</NavLink></li>)}
          </ul>
          <NavLink to={bookingLink.to} end onClick={() => close(true)} className="button-primary booking-button mt-4 max-w-full text-sm/normal">
            <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M6 3h12v18l-6-4-6 4V3Z" /></svg>
            {bookingLink.label}
          </NavLink>
        </>}
      </nav>
    </div>
  )
}
