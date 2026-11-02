import { cn } from '@/lib/utils'

type SectionHeadingProps = {
  title: string
  id?: string
  eyebrow?: string
  description?: string
  as?: 'h2' | 'h3'
  align?: 'left' | 'center'
  className?: string
}

export default function SectionHeading({
  title,
  id,
  eyebrow,
  description,
  as: Heading = 'h2',
  align = 'center',
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn('min-w-0 space-y-4 wrap-anywhere', align === 'center' ? 'text-center' : 'text-left', className)}>
      {eyebrow && <p className="text-sm/normal font-semibold uppercase tracking-wide text-primary">{eyebrow}</p>}
      <Heading id={id}>{title}</Heading>
      {description && (
        <p className={cn('max-w-prose', align === 'center' && 'mx-auto')}>{description}</p>
      )}
    </div>
  )
}
