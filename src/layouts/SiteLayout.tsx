import { Link, NavLink, Outlet, useNavigation } from 'react-router'
import RouteLoading from '@/components/RouteLoading'
import DevelopmentNavigation from '@/components/DevelopmentNavigation'

export default function SiteLayout() {
  const navigation = useNavigation()
  return (
    <div className="flex min-w-0 flex-1 flex-col text-left">
      <a
        className="fixed top-4 left-4 z-100 -translate-y-[calc(100%+2rem)] bg-surface px-4 py-3 text-primary underline underline-offset-[0.2em] focus:translate-y-0"
        href="#main-content"
      >
        Skip to main content
      </a>

      <header className="border-b border-border py-6">
        <div className="site-container">
        <Link className="mb-4 inline-block text-xl font-semibold text-primary underline underline-offset-[0.2em]" to="/">Dorchester Inn</Link>
        <nav aria-label="Main navigation">
          <ul role="list" className="flex flex-wrap gap-x-5 gap-y-2 [&_a]:inline-block [&_a]:py-2 [&_a]:text-primary [&_a]:underline [&_a]:underline-offset-[0.2em] [&_a[aria-current=page]]:font-semibold [&_a[aria-current=page]]:decoration-[0.15em]">
            <li><NavLink to="/" end>Home</NavLink></li>
            <li><NavLink to="/rooms">Rooms</NavLink></li>
            <li><NavLink to="/services">Services</NavLink></li>
            <li><NavLink to="/contact">Contact us</NavLink></li>
            <li><NavLink to="/make-a-booking">Make a booking</NavLink></li>
          </ul>
        </nav>
        </div>
      </header>

      <main id="main-content" className="site-container flex-1 wrap-anywhere py-12 lg:py-20" tabIndex={-1} aria-busy={navigation.state !== 'idle'}>
        {navigation.state !== 'idle' && <RouteLoading />}
        <Outlet />
      </main>

      <footer className="border-t border-border py-6">
        <div className="site-container">
        <DevelopmentNavigation />
        <p>Dorchester Inn · Development preview</p>
        </div>
      </footer>
    </div>
  )
}
