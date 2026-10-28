import { Outlet, useNavigation } from 'react-router'
import SiteHeader from '@/components/SiteHeader'
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

      <SiteHeader />

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
