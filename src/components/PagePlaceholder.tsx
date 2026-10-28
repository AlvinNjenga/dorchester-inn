type PagePlaceholderProps = {
  title: string
}

export default function PagePlaceholder({ title }: PagePlaceholderProps) {
  return (
    <section className="space-y-4">
      <p className="text-sm font-semibold uppercase tracking-wide">
        Development placeholder
      </p>
      <h1>
        {title}
      </h1>
      <p>This page is under development. Content will be added in a later ticket.</p>
    </section>
  )
}
