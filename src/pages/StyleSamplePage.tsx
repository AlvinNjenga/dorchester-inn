import { useState } from 'react'
import { Link } from 'react-router'

export default function StyleSamplePage() {
  const [message, setMessage] = useState('No sample action taken yet.')

  return (
    <div className="space-y-16 lg:space-y-24">
      <section aria-labelledby="sample-title" className="space-y-6">
        <p className="text-sm/normal font-semibold uppercase tracking-wide">Development only</p>
        <h1 id="sample-title">Dorchester style sample</h1>
        <p className="max-w-prose">Temporary review page for shared styles. All examples are demonstration content. Tab through the controls to inspect keyboard focus, and hover over links and buttons to inspect their interaction styles.</p>
        <a href="#sample-controls">Jump to sample controls</a>
      </section>

      <section aria-labelledby="sample-type" className="space-y-6">
        <h2 id="sample-type">Typography and reading rhythm</h2>
        <p className="font-heading text-hero font-medium text-primary">A welcoming place to pause</p>
        <h3>A longer heading that can wrap naturally on a narrow screen</h3>
        <div className="max-w-prose space-y-4">
          <p>Body text uses Inter with a comfortable line height. This longer paragraph helps us review reading width, line wrapping and spacing across screen sizes. It should remain easy to follow when the text is enlarged, without requiring horizontal scrolling.</p>
          <p><strong>Emphasis uses the supplied semibold weight.</strong> <span className="font-medium">Medium text uses Inter 500.</span> <Link to="/rooms">Browse the room placeholder</Link> to compare these defaults with an ordinary page.</p>
          <ul className="list-disc space-y-2 pl-6">
            <li>Readable text on ivory and white surfaces.</li>
            <li>Georgia and system sans-serif fallbacks when fonts are unavailable.</li>
            <li>Long text wraps: <span className="wrap-anywhere">sample-reference-with-a-deliberately-long-unbroken-identifier-for-overflow-review</span>.</li>
          </ul>
          <p className="text-sm/normal">Navigation-sized text, 14px at the default root size.</p>
          <p className="text-xs/normal">Small metadata, 12px at the default root size.</p>
        </div>
      </section>

      <section aria-labelledby="sample-surfaces" className="space-y-6">
        <h2 id="sample-surfaces">Surfaces and cards</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <article className="space-y-4 rounded-lg border border-border bg-surface p-6 shadow-card">
            <h3>White card on ivory</h3>
            <p>A subtle decorative border, an 8px radius and a restrained shadow. This text demonstrates the default body colour.</p>
            <a className="button-primary" href="#sample-controls">Try the sample controls</a>
          </article>
          <article className="space-y-4 rounded-lg bg-primary-dark p-6 text-surface">
            <h3 className="text-surface">Navy surface</h3>
            <p>Explicit light text keeps this surface readable. The white inner focus band should remain visible around the action below.</p>
            <a className="button-primary" href="#sample-controls">Inspect focus on navy</a>
          </article>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-lg bg-primary p-6 text-surface">Interface navy</div>
          <div className="rounded-lg bg-gold p-6 text-primary">Gold with navy text</div>
          <div className="rounded-lg border border-border bg-surface p-6">White surface</div>
        </div>
        <p className="text-sm/normal">Muted gold and pale borders are reserved for decoration, not small text or essential control boundaries.</p>
      </section>

      <section id="sample-controls" aria-labelledby="sample-controls-title" className="scroll-mt-6 space-y-6">
        <h2 id="sample-controls-title">Controls and states</h2>
        <p className="max-w-prose">These controls are local examples. They send no information. Hover, Tab and activate the enabled button to review its behaviour; disabled controls should be skipped by keyboard navigation.</p>
        <div className="flex flex-wrap gap-4">
          <button type="button" className="button-primary" onClick={() => setMessage('Sample action activated. No information was sent.')}>Try sample action</button>
          <button type="button" className="button-primary" disabled>Disabled action</button>
        </div>
        <p role="status">{message}</p>
        <div className="grid max-w-article gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <label htmlFor="sample-name" className="block font-medium text-primary">Name</label>
            <input id="sample-name" className="form-control" placeholder="Example name" autoComplete="off" aria-describedby="sample-name-help" />
            <p id="sample-name-help" className="text-sm/normal">A visible label stays available after typing.</p>
          </div>
          <div className="space-y-2">
            <label htmlFor="sample-select" className="block font-medium text-primary">Sample preference</label>
            <select id="sample-select" className="form-control" defaultValue="">
              <option value="">Choose an example</option>
              <option value="one">First example</option>
              <option value="two">Second example with a longer label</option>
            </select>
          </div>
          <div className="space-y-2 md:col-span-2">
            <label htmlFor="sample-message" className="block font-medium text-primary">Sample message</label>
            <textarea id="sample-message" className="form-control" placeholder="Type a longer message to inspect wrapping and resizing." />
          </div>
          <div className="space-y-2">
            <label htmlFor="sample-disabled" className="block font-medium text-primary">Disabled input</label>
            <input id="sample-disabled" className="form-control" value="Unavailable example" disabled />
          </div>
        </div>
      </section>

      <section aria-labelledby="sample-reading" className="mx-auto max-w-article space-y-6 rounded-xl bg-surface p-6 md:p-8">
        <h2 id="sample-reading">A narrower reading panel</h2>
        <p className="max-w-prose">This panel has an 800px cap including its padding. The surrounding page uses the shared main container, while the text remains constrained for comfortable reading. At mobile widths, the panel fits the available space.</p>
        <Link to="/">Return to Home</Link>
      </section>
    </div>
  )
}
