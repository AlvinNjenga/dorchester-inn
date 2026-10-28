import { NavLink } from 'react-router'
import { navigationDestinations } from '@/content/navigation'

export default function DevelopmentNavigation() {
  return (
    <nav aria-labelledby="development-navigation-title" className="mt-6 space-y-3">
      <h2 id="development-navigation-title" className="text-lg font-semibold">
        Development navigation
      </h2>
      <ul role="list" className="grid gap-x-6 gap-y-1 sm:grid-cols-2 lg:grid-cols-3">
        {navigationDestinations.map(({ to, label }) => (
          <li key={to} className="min-w-0">
            <NavLink
              to={to}
              end
              className="inline-block py-2 text-primary underline underline-offset-[0.2em] wrap-anywhere aria-[current=page]:font-semibold aria-[current=page]:decoration-2"
            >
              {label}
            </NavLink>
          </li>
        ))}
      </ul>
      {import.meta.env.DEV && (
        <p><NavLink to="/__style-sample">Development style sample</NavLink></p>
      )}
    </nav>
  )
}
