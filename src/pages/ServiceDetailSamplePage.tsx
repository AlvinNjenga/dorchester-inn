import { data, useParams } from 'react-router'
import ServiceDetailLayout from '@/components/ServiceDetailLayout'
import { services, type ServiceDetail } from '@/content/services'
import { businessInfo } from '@/content/business'
import samplePhoto from '@/assets/royal-suburbs.webp'

export default function ServiceDetailSamplePage() {
  const { sampleSlug } = useParams<'sampleSlug'>()
  const service = services.find(item => item.slug === sampleSlug)
  const contactAction = { label: 'Contact the Dorchester Inn team', to: '/contact' }

  if (service) return <ServiceDetailLayout service={service} contactAction={contactAction} />

  if (sampleSlug === 'content-check') {
    const example: ServiceDetail = {
      ...services[0],
      title: 'Development layout preview with a longer heading and extended service information',
      description: 'Development-only image fixture: the Royal Suburbs rendering is supplied for layout testing and is not a photograph of the lounge or massage chair.',
      paragraphs: [businessInfo.description, `Dorchester Inn is located at ${businessInfo.address}`, 'Contact the team by phone or email with questions before travelling. Lounge access is included with your stay, with no additional access charge. Massage chair sessions last 15–30 minutes, with a discount available for staying guests; prices are to be confirmed.'],
      image: { src: samplePhoto, alt: 'Development image fixture: Royal Suburbs architectural rendering, not a service photograph', width: 500, height: 386 },
    }
    return <ServiceDetailLayout service={example} contactAction={{ label: 'Email the Dorchester Inn team with questions about the service before travelling', href: businessInfo.email.href }} />
  }

  if (sampleSlug === 'minimal') {
    return <ServiceDetailLayout service={{ ...services[0], practicalDetails: [] }} />
  }

  throw data('Development sample not found', { status: 404 })
}
