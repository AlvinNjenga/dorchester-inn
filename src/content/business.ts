type BusinessInfo = {
  readonly name: string
  readonly description: string
  readonly phone: { readonly label: string; readonly href: `tel:${string}` }
  readonly email: { readonly label: string; readonly href: `mailto:${string}` }
  readonly address: string
}

// Source observations, audited 28 October 2026:
// https://dorchesterinnke.com/ and /contact-us/
// See docs/E03-T04-footer-audit.md for verification limits and pending links.
export const businessInfo = {
  name: 'Dorchester Inn',
  description: 'Private rooms for backpackers and budget travellers in Nairobi, with an in-house bar and restaurant.',
  phone: { label: '+254 717 411 717', href: 'tel:+254717411717' },
  email: { label: 'info@dorchesterinnke.com', href: 'mailto:info@dorchesterinnke.com' },
  address: 'Outering Road, off Thika Road, opposite Qwetu Student Apartments, Ruaraka, Nairobi, Kenya.',
} as const satisfies BusinessInfo
