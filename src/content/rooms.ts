import basicRoomPhoto from '@/assets/rooms/Dorchester-basic-double-room-2-1024x768.jpg'
import doubleRoomPhoto from '@/assets/rooms/Double-Room-Photo-1024x768.jpg'
import type { CatalogueImage } from './catalogue'

export type Room = {
  slug: string
  title: string
  description: string
  image: CatalogueImage
  price: { usd: number; kes: number; interval: 'night' }
}

// Owner-approved fixed prices, not exchange conversions. See
// docs/CATALOGUE_CONTENT_DECISIONS.md and docs/ROOM_IMAGE_AUDIT.md.
// Standard and Deluxe share the same lead photograph on the original site.
export const rooms = [
  {
    slug: 'basic-double', title: 'Basic Double Room',
    description: 'The Basic Double room option at Dorchester Inn in Nairobi.',
    image: { src: basicRoomPhoto, alt: 'Double bed with a mosquito net and a tea tray beside it', width: 1024, height: 768 },
    price: { usd: 15, kes: 1500, interval: 'night' },
  },
  {
    slug: 'standard-double', title: 'Standard Double Room',
    description: 'The Standard Double room option at Dorchester Inn in Nairobi.',
    image: { src: doubleRoomPhoto, alt: 'Double bed with white bedding, red accents and a draped mosquito net', width: 1024, height: 768 },
    price: { usd: 20, kes: 2000, interval: 'night' },
  },
  {
    slug: 'deluxe-double', title: 'Deluxe Double Room',
    description: 'The Deluxe Double room option at Dorchester Inn in Nairobi.',
    image: { src: doubleRoomPhoto, alt: 'Double bed with white bedding, red accents and a draped mosquito net', width: 1024, height: 768 },
    price: { usd: 60, kes: 6500, interval: 'night' },
  },
] as const satisfies readonly Room[]
