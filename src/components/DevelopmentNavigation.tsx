import { NavLink } from 'react-router'
import { rooms } from '@/content/rooms'
import { services } from '@/content/services'

const destinations = [
  { to: '/', label: 'Home' },
  { to: '/services', label: 'Services' },
  { to: '/make-a-booking', label: 'Make a booking' },
  { to: '/rooms', label: 'Rooms' },
  { to: '/our-bar', label: 'Our bar' },
  { to: '/cocktail-happy-hour', label: 'Cocktail happy hour' },
  { to: '/about-us', label: 'About us' },
  { to: '/leave-a-review', label: 'Leave a review' },
  { to: '/blog', label: 'Blog' },
  { to: '/contact', label: 'Contact us' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/faqs', label: 'FAQs' },
  ...rooms.map((room) => ({ to: `/rooms/${room.slug}`, label: room.title })),
  ...services.map((service) => ({ to: `/services/${service.slug}`, label: service.title })),
]

export default function DevelopmentNavigation() {
  return (
    <nav aria-labelledby="development-navigation-title" className="mt-6 space-y-3">
      <h2 id="development-navigation-title" className="text-lg font-semibold">
        Development navigation
      </h2>
      <ul role="list" className="grid gap-x-6 gap-y-1 sm:grid-cols-2 lg:grid-cols-3">
        {destinations.map(({ to, label }) => (
          <li key={to} className="min-w-0">
            <NavLink
              to={to}
              end
              className="inline-block py-2 text-[var(--text-h)] underline underline-offset-[0.2em] wrap-anywhere aria-[current=page]:font-bold aria-[current=page]:decoration-2"
            >
              {label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}
