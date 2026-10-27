type PagePlaceholderProps = {
  title: string
}

export default function PagePlaceholder({ title }: PagePlaceholderProps) {
  return (
    <section className="space-y-4">
      <p className="text-sm font-semibold uppercase tracking-wide">
        Development placeholder
      </p>
      <h1 className="text-3xl font-semibold text-[var(--text-h)] sm:text-4xl">
        {title}
      </h1>
      <p>This page is under development. Content will be added in a later ticket.</p>
    </section>
  )
}
