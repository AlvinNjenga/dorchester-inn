import type { CatalogueImage } from './catalogue'

export type Service = {
  slug: string
  title: string
  to: `/${string}`
  description: string
  practicalDetails: readonly string[]
  image?: CatalogueImage
}

// Optional detail-page prose extends the same catalogue record. Empty/missing
// paragraphs leave the short description usable; no second fact catalogue.
export type ServiceDetail = Service & { paragraphs?: readonly string[] }

// These two identities also drive /services/:serviceSlug and navigation.
// Photos are pending owner supply; missing image means no approved photo yet.
export const services = [
  {
    slug: 'lounge', title: 'Lounge', to: '/services/lounge',
    description: 'Lounge access is included with your stay.',
    practicalDetails: ['No additional access charge.'],
  },
  {
    slug: 'massage-chair', title: 'Massage Chair', to: '/services/massage-chair',
    description: 'Massage chair sessions last 15–30 minutes.',
    practicalDetails: ['Discount available for staying guests.', 'Prices to be confirmed.'],
  },
] as const satisfies readonly Service[]

// Bar has its own route; do not add it to the service-detail slug list above.
export const serviceCatalogue = [
  ...services,
  {
    slug: 'bar', title: 'Our bar', to: '/our-bar',
    description: 'An in-house bar at Dorchester Inn.',
    practicalDetails: ['Half price on cocktails during happy hour.'],
  },
] as const satisfies readonly Service[]
