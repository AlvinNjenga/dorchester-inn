import { Armchair, BedDouble, Coffee, Utensils } from 'lucide-react'
import type { Amenity } from '@/content/catalogue'

const icons = {
  bed: BedDouble,
  coffee: Coffee,
  utensils: Utensils,
  armchair: Armchair,
}

export default function AmenityTile({ amenity }: { amenity: Amenity }) {
  const Icon = icons[amenity.icon]

  return (
    <div className="flex min-w-0 flex-col items-center justify-center gap-3 rounded-lg border border-border bg-surface p-6 text-center wrap-anywhere">
      <Icon aria-hidden="true" focusable="false" className="size-8 shrink-0 text-primary" strokeWidth={1.5} />
      <p className="font-medium text-primary">{amenity.label}</p>
    </div>
  )
}
