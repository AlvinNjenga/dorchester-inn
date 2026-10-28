import { Link, NavLink, useLocation } from 'react-router'
import logo from '@/assets/dorchester-logo.jpg'
import { bookingLink } from '@/content/navigation'
import MobileNavigation from '@/components/MobileNavigation'
import DesktopNavigation from '@/components/DesktopNavigation'

export default function SiteHeader() {
  const location = useLocation()
  return (
    <header className="relative z-30 rounded-b-lg bg-brand-logo text-surface">
      <div className="site-container flex min-h-20 flex-wrap items-center justify-between gap-x-4 gap-y-2 py-3 lg:gap-y-0 lg:py-0">
        <Link to="/" aria-label="Dorchester Inn home" className="flex shrink-0 items-center gap-3 rounded-sm text-surface no-underline">
          <img src={logo} alt="" width={300} height={291} className="h-12 w-auto object-contain" />
          <span className="hidden font-heading text-xl font-medium sm:block lg:hidden xl:block">Dorchester Inn</span>
        </Link>

        {/* Reset disclosure state for all route changes, including history. */}
        <DesktopNavigation key={location.key} />

        <NavLink to={bookingLink.to} end className="button-primary booking-button hidden max-w-full shrink-0 px-6 text-sm/normal tracking-wide lg:inline-flex">
          <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M6 3h12v18l-6-4-6 4V3Z" /></svg>
          {bookingLink.label}
        </NavLink>

        <MobileNavigation />
      </div>
    </header>
  )
}
