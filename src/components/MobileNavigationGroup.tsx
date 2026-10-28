import { useId, useState } from 'react'
import { NavLink } from 'react-router'
import type { NavigationLink } from '@/content/navigation'

type MobileNavigationGroupProps = {
  label: string
  to: NavigationLink['to']
  links: readonly NavigationLink[]
  active: boolean
  onNavigate: () => void
}

export default function MobileNavigationGroup({ label, to, links, active, onNavigate }: MobileNavigationGroupProps) {
  const [expanded, setExpanded] = useState(false)
  const panelId = useId()
  const linkClass = 'inline-flex min-h-11 items-center justify-center rounded-sm px-3 py-2 text-sm/normal font-normal tracking-wide text-surface no-underline decoration-gold decoration-2 underline-offset-8 hover:underline aria-[current=page]:underline'

  return (
    <>
      <div className="grid grid-cols-[2.75rem_auto_2.75rem] items-center justify-center">
        <span aria-hidden="true" />
        <NavLink to={to} end data-section-active={active || undefined} className={`${linkClass} data-[section-active=true]:text-gold`} onClick={onNavigate}>{label}</NavLink>
        <button type="button" aria-label={`${expanded ? 'Collapse' : 'Expand'} ${label.toLowerCase()} links`} aria-expanded={expanded} aria-controls={panelId} onClick={() => setExpanded(current => !current)} className="flex min-h-11 min-w-11 items-center justify-center rounded-sm text-xl text-surface hover:text-gold">
          <span aria-hidden="true">{expanded ? '\u2212' : '+'}</span>
        </button>
      </div>
      <ul id={panelId} hidden={!expanded} role="list" className="my-2 space-y-1 rounded-lg bg-surface/5 p-2">
        {links.map(link => <li key={link.to}><NavLink to={link.to} end className={linkClass} onClick={onNavigate}>{link.label}</NavLink></li>)}
      </ul>
    </>
  )
}
