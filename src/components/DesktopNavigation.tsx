import { useEffect, useRef, useState } from 'react'
import { NavLink, useLocation } from 'react-router'
import { primaryNavigation } from '@/content/navigation'
import { isNavigationSectionActive } from '@/app/navigation'

const linkClass = 'flex min-h-11 w-full items-center rounded-sm px-4 py-2 text-sm/normal font-normal tracking-wide text-surface no-underline hover:bg-surface/10 aria-[current=page]:bg-surface/10 aria-[current=page]:text-gold'

export default function DesktopNavigation() {
  const { pathname } = useLocation()
  const [openId, setOpenId] = useState<string | null>(null)
  const activeGroup = useRef<HTMLLIElement>(null)

  useEffect(() => {
    if (!openId) return
    function dismiss(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        event.preventDefault()
        activeGroup.current?.querySelector<HTMLElement>('[aria-controls], a')?.focus()
        setOpenId(null)
      }
    }
    function outside(event: PointerEvent) {
      if (event.target instanceof Node && !activeGroup.current?.contains(event.target)) setOpenId(null)
    }
    const desktop = window.matchMedia('(min-width: 64rem)')
    function resize(event: MediaQueryListEvent) {
      if (!event.matches) setOpenId(null)
    }
    document.addEventListener('keydown', dismiss)
    document.addEventListener('pointerdown', outside)
    desktop.addEventListener('change', resize)
    return () => {
      document.removeEventListener('keydown', dismiss)
      document.removeEventListener('pointerdown', outside)
      desktop.removeEventListener('change', resize)
    }
  }, [openId])

  return (
    <nav aria-label="Main navigation" className="hidden max-w-full min-w-0 self-stretch lg:flex">
      <ul role="list" className="flex flex-wrap items-stretch">
        {primaryNavigation.map(item => {
          const open = openId === item.id
          const sectionActive = isNavigationSectionActive(item, pathname)
          const panelId = `header-${item.id}-links`
          const triggerId = `header-${item.id}-toggle`
          const directOverview = item.id === 'rooms' || item.id === 'services'
          return (
            <li key={item.id} data-section-active={sectionActive || undefined} ref={open ? activeGroup : undefined} className="relative flex items-center" onPointerEnter={event => {
              if (item.kind === 'group' && event.pointerType === 'mouse' && window.matchMedia('(hover: hover)').matches) setOpenId(item.id)
            }} onPointerLeave={event => {
              // Keep keyboard users' focused links available if the mouse
              // happens to leave. Mouse/touch focus alone does not pin a menu.
              if (event.pointerType === 'mouse' && !event.currentTarget.querySelector(':focus-visible')) {
                setOpenId(current => current === item.id ? null : current)
              }
            }} onBlur={event => {
              if (open && event.relatedTarget instanceof Node && !event.currentTarget.contains(event.relatedTarget)) setOpenId(null)
            }}>
              {item.kind === 'link' && <NavLink to={item.to} end className="header-nav-item" onClick={() => setOpenId(null)}>{item.label}</NavLink>}
              {item.kind === 'group' && <>
                {directOverview && item.to && <NavLink id={triggerId} to={item.to} end data-section-active={sectionActive || undefined} className="header-nav-item" onClick={() => setOpenId(null)}>{item.label}</NavLink>}
                {!directOverview && <button id={triggerId} type="button" aria-label={directOverview ? `${item.label} links` : undefined} data-section-active={sectionActive || undefined} aria-expanded={open} aria-controls={panelId} onClick={event => {
                  // A mouse click following hover keeps the already-open panel
                  // available; keyboard and touch activation still toggle it.
                  const mouseClick = event.nativeEvent instanceof PointerEvent && event.nativeEvent.pointerType === 'mouse'
                  if (mouseClick && event.detail > 0 && window.matchMedia('(hover: hover)').matches) setOpenId(item.id)
                  else setOpenId(current => current === item.id ? null : item.id)
                }} className="header-nav-item">
                  {item.label}
                </button>}
                <ul id={panelId} aria-labelledby={triggerId} role="list" hidden={!open} className="absolute top-full right-0 z-40 max-h-[calc(100dvh-6rem)] w-64 space-y-1 overflow-y-auto overscroll-contain rounded-lg border border-surface/20 bg-brand-logo p-2 shadow-lg">
                  {item.children.map(link => <li key={link.to}>
                    <NavLink to={link.to} end className={`${linkClass} w-full px-3 hover:bg-surface/10`} onClick={() => setOpenId(null)}>{link.label}</NavLink>
                  </li>)}
                </ul>
              </>}
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
