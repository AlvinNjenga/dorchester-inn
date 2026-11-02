import { Outlet, useMatches, useNavigation } from 'react-router'
import { cn } from '@/lib/utils'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import RouteLoading from '@/components/RouteLoading'
import DevelopmentNavigation from '@/components/DevelopmentNavigation'
import RouteTransitions from '@/components/RouteTransitions'

export default function SiteLayout() {
  const navigation = useNavigation()
  const fullWidth = useMatches().some(({ handle }) =>
    typeof handle === 'object' && handle !== null && 'fullWidth' in handle && handle.fullWidth === true,
  )
  return (
    <div className="flex min-w-0 flex-1 flex-col text-left">
      <RouteTransitions />
      <a
        className="fixed top-4 left-4 z-100 -translate-y-[calc(100%+2rem)] bg-surface px-4 py-3 text-primary underline underline-offset-[0.2em] focus:translate-y-0"
        href="#main-content"
      >
        Skip to main content
      </a>

      <SiteHeader />

      <main id="main-content" className={cn('min-w-0 flex-1 wrap-anywhere', !fullWidth && 'site-container py-12 lg:py-20')} tabIndex={-1} aria-busy={navigation.state !== 'idle'}>
        {navigation.state !== 'idle' && <div className={cn(fullWidth && 'site-container py-6')}><RouteLoading /></div>}
        <Outlet />
      </main>

      <SiteFooter />

      {import.meta.env.DEV && (
        <aside aria-label="Development tools" className="site-container py-6">
          <details>
            <summary className="cursor-pointer rounded-sm py-2 text-sm font-medium text-primary">Development tools</summary>
            <DevelopmentNavigation />
          </details>
        </aside>
      )}
    </div>
  )
}
