import { useId } from 'react'
import ActionLink from '@/components/ActionLink'
import PageTitleBand from '@/components/PageTitleBand'
import SectionHeading from '@/components/SectionHeading'
import type { ServiceDetail } from '@/content/services'

type ServiceDetailLayoutProps = {
  service: ServiceDetail
  contactAction?: { label: string; to: string } | { label: string; href: string }
}

export default function ServiceDetailLayout({ service, contactAction }: ServiceDetailLayoutProps) {
  const id = useId()

  return (
    <>
      <PageTitleBand title={service.title} breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'Services', to: '/services' }]} />
      <div className="site-container space-y-12 py-12 lg:space-y-16 lg:py-20">
        <div className="grid min-w-0 items-start gap-8 lg:grid-cols-2 lg:gap-12">
          {service.image ? (
            <img src={service.image.src} alt={service.image.alt} width={service.image.width} height={service.image.height} loading="lazy" decoding="async" className="aspect-4/3 w-full rounded-lg object-cover" />
          ) : (
            <div className="flex aspect-4/3 items-center justify-center rounded-lg border border-border bg-surface p-8 text-center text-text-muted">
              <p>Development placeholder: {service.title} photograph pending</p>
            </div>
          )}
          <section aria-labelledby={`${id}-about`} className="min-w-0 space-y-6 wrap-anywhere">
            <SectionHeading id={`${id}-about`} title={`About ${service.title}`} align="left" />
            <p className="max-w-prose">{service.description}</p>
            {service.paragraphs?.map((paragraph, index) => <p key={index} className="max-w-prose">{paragraph}</p>)}
          </section>
        </div>
        {service.practicalDetails.length > 0 && (
          <section aria-labelledby={`${id}-details`} className="space-y-6 rounded-lg bg-surface p-6 md:p-8">
            <SectionHeading id={`${id}-details`} title="Practical information" align="left" />
            <ul className="max-w-prose list-disc space-y-3 pl-5">
              {service.practicalDetails.map(detail => <li key={detail}>{detail}</li>)}
            </ul>
          </section>
        )}
        {contactAction && (
          <section aria-labelledby={`${id}-contact`} className="space-y-6">
            <SectionHeading id={`${id}-contact`} title="Questions about this service?" align="left" />
            {'href' in contactAction
              ? <ActionLink href={contactAction.href}>{contactAction.label}</ActionLink>
              : <ActionLink to={contactAction.to}>{contactAction.label}</ActionLink>}
          </section>
        )}
      </div>
    </>
  )
}
