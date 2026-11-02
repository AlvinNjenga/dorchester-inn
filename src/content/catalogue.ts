export type CatalogueImage = {
  src: string
  alt: string
  width: number
  height: number
}

export type Amenity = {
  id: string
  label: string
  icon: 'bed' | 'coffee' | 'utensils' | 'armchair'
}

// Confirmed property identity and owner instructions; see
// docs/CATALOGUE_CONTENT_DECISIONS.md. No availability or opening-hour claims.
export const amenities = [
  { id: 'private-rooms', label: 'Private rooms', icon: 'bed' },
  { id: 'bar', label: 'In-house bar', icon: 'coffee' },
  { id: 'restaurant', label: 'Restaurant', icon: 'utensils' },
  { id: 'lounge', label: 'Lounge access included', icon: 'armchair' },
] as const satisfies readonly Amenity[]
