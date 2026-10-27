import { data, useParams } from 'react-router'
import PagePlaceholder from '@/components/PagePlaceholder'
import { services } from '@/content/services'

export default function ServiceDetailsPage() {
  const { serviceSlug } = useParams<'serviceSlug'>()
  const service = services.find((item) => item.slug === serviceSlug)

  if (!service) {
    throw data('Service not found', { status: 404 })
  }

  return <PagePlaceholder title={service.title} />
}
