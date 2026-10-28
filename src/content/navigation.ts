import { rooms } from './rooms'
import { services } from './services'

export type NavigationLink = {
  readonly label: string
  readonly to: `/${string}`
}

export type NavigationItem =
  | (NavigationLink & { readonly kind: 'link'; readonly id: string })
  | {
    readonly kind: 'group'
    readonly id: string
    readonly label: string
    // An overview link is optional: Discover only opens a disclosure.
    readonly to?: NavigationLink['to']
    readonly children: readonly NavigationLink[]
  }

export const primaryNavigation: readonly NavigationItem[] = [
  { kind: 'link', id: 'home', label: 'Home', to: '/' },
  {
    kind: 'group', id: 'rooms', label: 'Rooms', to: '/rooms',
    children: [
      ...rooms.map((room): NavigationLink => ({ label: room.title, to: `/rooms/${room.slug}` })),
    ],
  },
  {
    kind: 'group', id: 'services', label: 'Services', to: '/services',
    children: [
      ...services.map((service): NavigationLink => ({ label: service.title, to: `/services/${service.slug}` })),
    ],
  },
  {
    kind: 'group', id: 'bar', label: 'Our bar', to: '/our-bar',
    children: [
      { label: 'Our bar', to: '/our-bar' },
      { label: 'Cocktail happy hour', to: '/cocktail-happy-hour' },
    ],
  },
  {
    kind: 'group', id: 'discover', label: 'Discover',
    children: [
      { label: 'About us', to: '/about-us' },
      { label: 'Gallery', to: '/gallery' },
      { label: 'Blog', to: '/blog' },
      { label: 'FAQs', to: '/faqs' },
    ],
  },
  { kind: 'link', id: 'contact', label: 'Contact us', to: '/contact' },
]

export const bookingLink: NavigationLink = { label: 'Make a booking', to: '/make-a-booking' }

// Reuse as secondary mobile links in E03-T03 and footer links in E03-T04.
export const secondaryNavigation: readonly NavigationLink[] = [
  { label: 'Leave a review', to: '/leave-a-review' },
]

// Overview destinations occur both beside and inside a disclosure. Keep one
// entry per URL for the development index, preserving the top-level label.
const destinations = primaryNavigation.flatMap((item): NavigationLink[] => {
  if (item.kind === 'link') return [item]
  return item.to
    ? [{ label: item.label, to: item.to }, ...item.children]
    : [...item.children]
})
const uniqueDestinations = new Map<NavigationLink['to'], NavigationLink>()
for (const link of [...destinations, bookingLink, ...secondaryNavigation]) {
  if (!uniqueDestinations.has(link.to)) uniqueDestinations.set(link.to, link)
}

export const navigationDestinations: readonly NavigationLink[] = [...uniqueDestinations.values()]
