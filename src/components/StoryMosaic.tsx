import { useId } from 'react'
import type { To } from 'react-router'
import ActionLink from '@/components/ActionLink'
import SectionHeading from '@/components/SectionHeading'
import { cn } from '@/lib/utils'

export type StoryMosaicItem = {
  id: string
  title: string
  paragraphs: readonly string[]
  image: {
    src: string
    alt: string
    width: number
    height: number
  } | { placeholder: string }
  action?: { label: string; to: To }
}

type StoryMosaicProps = {
  items: readonly StoryMosaicItem[]
  headingLevel?: 'h2' | 'h3'
}

export default function StoryMosaic({ items, headingLevel = 'h2' }: StoryMosaicProps) {
  const instanceId = useId()

  if (items.length === 0) return null

  return (
    <div className="rounded-xl bg-surface p-2 shadow-card">
      {items.map((item, index) => {
        const headingId = `${instanceId}-${item.id}`
        return (
          <section key={item.id} aria-labelledby={headingId} className="grid min-w-0 md:grid-cols-2">
            <div className={cn('relative aspect-4/3 min-w-0 self-stretch md:aspect-auto md:min-h-80', index % 2 === 1 && 'md:col-start-2 md:row-start-1')}>
              {'src' in item.image ? (
                <img
                  src={item.image.src}
                  alt={item.image.alt}
                  width={item.image.width}
                  height={item.image.height}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 h-full w-full rounded-sm object-cover"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center rounded-sm bg-background p-8 text-center text-sm/normal text-text-muted">
                  {item.image.placeholder}
                </div>
              )}
            </div>
            <div className={cn('min-w-0 self-center space-y-6 p-6 wrap-anywhere lg:p-12', index % 2 === 1 && 'md:col-start-1 md:row-start-1')}>
              <SectionHeading id={headingId} title={item.title} as={headingLevel} align="left" />
              {item.paragraphs.length > 0 && (
                <div className="max-w-prose space-y-4">
                  {item.paragraphs.map((paragraph, paragraphIndex) => <p key={paragraphIndex}>{paragraph}</p>)}
                </div>
              )}
              {item.action && <ActionLink to={item.action.to}>{item.action.label}</ActionLink>}
            </div>
          </section>
        )
      })}
    </div>
  )
}
