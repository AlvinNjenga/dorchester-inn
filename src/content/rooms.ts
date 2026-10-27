type RoomSummary = {
  slug: string
  title: string
}

// Routing placeholders only; verified room details will be added in Epic 6.
export const rooms = [
  { slug: 'basic-double', title: 'Basic Double Room' },
  { slug: 'standard-double', title: 'Standard Double Room' },
  { slug: 'deluxe-double', title: 'Deluxe Double Room' },
] as const satisfies readonly RoomSummary[]
