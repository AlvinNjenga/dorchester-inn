import { Link, type To } from 'react-router'

type Breadcrumb = { label: string; to: To }

type PageTitleBandProps = {
  title: string
  description?: string
  breadcrumbs?: readonly Breadcrumb[]
  currentLabel?: string
}

export default function PageTitleBand({
  title,
  description,
  breadcrumbs,
  currentLabel = title,
}: PageTitleBandProps) {
  return (
    <header className="bg-background py-16 text-center lg:py-24">
      <div className="site-container space-y-6">
        <h1>{title}</h1>
        {description && <p className="mx-auto max-w-prose">{description}</p>}
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav aria-label="Breadcrumb">
            <ol className="mx-auto flex w-fit max-w-full flex-wrap items-center justify-center gap-x-3 gap-y-2 rounded-2xl bg-gold px-5 py-3 text-sm/normal text-primary">
              {breadcrumbs.map(({ label, to }, index) => (
                <li key={index} className="flex min-w-0 items-center gap-3">
                  <Link to={to} className="min-w-0 rounded-sm py-1">{label}</Link>
                  <span aria-hidden="true">›</span>
                </li>
              ))}
              <li aria-current="page" className="min-w-0 py-1 font-semibold">{currentLabel}</li>
            </ol>
          </nav>
        )}
      </div>
    </header>
  )
}
