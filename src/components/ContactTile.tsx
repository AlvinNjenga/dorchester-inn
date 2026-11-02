import { useId } from 'react'
import { Mail, MapPin, Phone } from 'lucide-react'
import ActionLink from '@/components/ActionLink'

const icons = { phone: Phone, email: Mail, address: MapPin }

type ContactTileProps = {
  icon: keyof typeof icons
  title: string
  value: string
  action?: { label: string; href: string } | { label: string; to: string }
  headingLevel?: 'h2' | 'h3'
}

export default function ContactTile({ icon, title, value, action, headingLevel: Heading = 'h3' }: ContactTileProps) {
  const headingId = useId()
  const Icon = icons[icon]

  return (
    <article aria-labelledby={headingId} className="flex min-w-0 flex-col items-center gap-4 rounded-lg border border-border bg-surface p-6 text-center shadow-card wrap-anywhere">
      <Icon aria-hidden="true" focusable="false" className="size-8 shrink-0 text-primary" strokeWidth={1.5} />
      <Heading id={headingId}>{title}</Heading>
      <p className="max-w-prose select-text">{value}</p>
      {action && (
        <div className="mt-auto max-w-full pt-2">
          {'href' in action
            ? <ActionLink href={action.href}>{action.label}</ActionLink>
            : <ActionLink to={action.to}>{action.label}</ActionLink>}
        </div>
      )}
    </article>
  )
}
