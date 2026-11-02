import { useId } from 'react'
import ActionLink from '@/components/ActionLink'
import type { Service } from '@/content/services'

type ServiceCardProps = {
  service: Service
  headingLevel?: 'h2' | 'h3'
}

export default function ServiceCard({ service, headingLevel: Heading = 'h3' }: ServiceCardProps) {
  const headingId = useId()

  return (
    <article aria-labelledby={headingId} className="flex min-w-0 flex-col rounded-lg bg-surface p-2 shadow-card">
      <div className="relative isolate flex aspect-3/4 min-w-0 flex-col justify-end rounded-sm bg-background p-4">
        {service.image ? (
          <img
            src={service.image.src}
            alt={service.image.alt}
            width={service.image.width}
            height={service.image.height}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 -z-10 h-full w-full rounded-sm object-cover"
          />
        ) : (
          <p className="my-auto py-6 text-center text-sm/normal text-text-muted">Development placeholder: {service.title} photo pending</p>
        )}
        <Heading id={headingId} className="rounded-sm bg-surface p-4 text-center font-bold wrap-anywhere [font-synthesis:weight]">{service.title}</Heading>
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-4 p-4 wrap-anywhere lg:p-6">
        <p>{service.description}</p>
        {service.practicalDetails.length > 0 && (
          <ul className="list-disc space-y-2 pl-5 text-sm/normal">
            {service.practicalDetails.map((detail) => <li key={detail}>{detail}</li>)}
          </ul>
        )}
        <div className="mt-auto pt-2">
          <ActionLink to={service.to} aria-label={`Explore ${service.title}`}>Explore service</ActionLink>
        </div>
      </div>
    </article>
  )
}
