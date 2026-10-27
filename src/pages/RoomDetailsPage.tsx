import { data, useParams } from 'react-router'
import PagePlaceholder from '@/components/PagePlaceholder'
import { rooms } from '@/content/rooms'

export default function RoomDetailsPage() {
  const { roomSlug } = useParams<'roomSlug'>()
  const room = rooms.find((item) => item.slug === roomSlug)

  if (!room) {
    throw data('Room not found', { status: 404 })
  }

  return <PagePlaceholder title={room.title} />
}
