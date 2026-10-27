type ServiceSummary = {
  slug: string
  title: string
}

// Routing placeholders only; approved service details will be added in Epic 6.
export const services = [
  { slug: 'lounge', title: 'Lounge' },
  { slug: 'massage-chair', title: 'Massage Chair' },
] as const satisfies readonly ServiceSummary[]
