import { useId } from 'react'
import ActionLink from '@/components/ActionLink'
import type { Room } from '@/content/rooms'

type RoomCardProps = {
  room: Room
  headingLevel?: 'h2' | 'h3'
}

export default function RoomCard({ room, headingLevel: Heading = 'h3' }: RoomCardProps) {
  const headingId = useId()

  return (
    <article aria-labelledby={headingId} className="flex min-w-0 flex-col rounded-lg bg-surface p-2 shadow-card">
      <img
        src={room.image.src}
        alt={room.image.alt}
        width={room.image.width}
        height={room.image.height}
        loading="lazy"
        decoding="async"
        className="aspect-3/2 w-full rounded-sm object-cover"
      />
      <div className="flex min-w-0 flex-1 flex-col gap-4 p-4 wrap-anywhere lg:p-6">
        <Heading id={headingId} className="font-bold [font-synthesis:weight]">{room.title}</Heading>
        <p>{room.description}</p>
        <div className="mt-auto space-y-4 pt-2">
          <p className="text-primary">
            <span className="block font-semibold">USD ${room.price.usd.toLocaleString('en-US')} / KES {room.price.kes.toLocaleString('en-KE')}</span>
            <span className="text-sm/normal text-text-muted">per night</span>
          </p>
          <ActionLink to={`/rooms/${room.slug}`} aria-label={`View ${room.title}`}>View room</ActionLink>
        </div>
      </div>
    </article>
  )
}
