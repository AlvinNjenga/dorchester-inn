import { useState } from 'react'
import { Link } from 'react-router'
import ActionButton from '@/components/ActionButton'
import ActionLink from '@/components/ActionLink'
import { businessInfo } from '@/content/business'
import SectionHeading from '@/components/SectionHeading'
import PageTitleBand from '@/components/PageTitleBand'
import StoryMosaic from '@/components/StoryMosaic'
import CatalogueGrid from '@/components/CatalogueGrid'
import RoomCard from '@/components/RoomCard'
import ServiceCard from '@/components/ServiceCard'
import AmenityTile from '@/components/AmenityTile'
import ContactTile from '@/components/ContactTile'
import { amenities } from '@/content/catalogue'
import { rooms } from '@/content/rooms'
import { serviceCatalogue } from '@/content/services'
import doubleRoomPhoto from '@/assets/double-room-photo.webp'
import royalSuburbs from '@/assets/royal-suburbs.webp'

export default function StyleSamplePage() {
  const [message, setMessage] = useState('No sample action taken yet.')

  return (
    <>
      <PageTitleBand
        title="Dorchester style sample"
        description="Development-only examples of the shared Dorchester styles and section components."
        breadcrumbs={[{ label: 'Home', to: '/' }]}
        currentLabel="Style sample"
      />
    <div className="site-container space-y-16 py-12 lg:space-y-24 lg:py-20">
      <section aria-labelledby="sample-title" className="space-y-6">
        <p className="text-sm/normal font-semibold uppercase tracking-wide">Development only</p>
        <h2 id="sample-title">Review the shared components</h2>
        <p className="max-w-prose">Temporary review page for shared styles. All examples are demonstration content. Tab through the controls to inspect keyboard focus, and hover over links and buttons to inspect their interaction styles.</p>
        <a href="#sample-controls">Jump to sample controls</a>
      </section>

      <section aria-labelledby="sample-contact-tiles" className="space-y-8">
        <SectionHeading id="sample-contact-tiles" title="Contact Dorchester Inn" description="Call or email the team with questions. Contact details can be selected and copied." />
        <CatalogueGrid>
          <ContactTile icon="phone" title="Phone" value={businessInfo.phone.label} action={{ label: 'Call Dorchester Inn', href: businessInfo.phone.href }} />
          <ContactTile icon="email" title="Email" value={businessInfo.email.label} action={{ label: 'Email Dorchester Inn', href: businessInfo.email.href }} />
          <ContactTile icon="address" title="Address" value={businessInfo.address} />
        </CatalogueGrid>
        <div className="space-y-3">
          <h3>Service-detail development previews</h3>
          <ul className="list-disc space-y-2 pl-5">
            <li><Link to="/__service-sample/lounge">Lounge detail preview</Link></li>
            <li><Link to="/__service-sample/massage-chair">Massage Chair detail preview</Link></li>
            <li><Link to="/__service-sample/content-check">Long content and image fixture</Link></li>
            <li><Link to="/__service-sample/minimal">Missing optional content preview</Link></li>
          </ul>
        </div>
      </section>

      <section aria-labelledby="sample-catalogue-grid" className="space-y-8">
        <SectionHeading id="sample-catalogue-grid" title="Room cards" description="Room catalogue preview with owner-approved nightly prices in US dollars and Kenyan shillings. Standard and Deluxe use the same photograph as their original room pages." />
        <CatalogueGrid>
          {rooms.map((room) => (
            <RoomCard key={room.slug} room={room} />
          ))}
        </CatalogueGrid>
      </section>

      <section aria-labelledby="sample-service-cards" className="space-y-8">
        <SectionHeading id="sample-service-cards" title="Services" description="Development catalogue preview. Lounge, Massage Chair and Bar photographs will be supplied later." />
        <CatalogueGrid>
          {serviceCatalogue.map((service) => <ServiceCard key={service.slug} service={service} />)}
        </CatalogueGrid>
      </section>

      <section aria-labelledby="sample-amenities" className="space-y-8">
        <SectionHeading id="sample-amenities" title="At Dorchester Inn" description="Confirmed facilities, presented as informational tiles." />
        <CatalogueGrid columns={4}>
          {amenities.map((amenity) => <AmenityTile key={amenity.id} amenity={amenity} />)}
        </CatalogueGrid>
      </section>

      <section aria-labelledby="sample-catalogue-variations" className="space-y-8">
        <SectionHeading
          id="sample-catalogue-variations"
          title="Catalogue content variations"
          description="Development-only layout checks using existing facts: a longer room title and description, a service without optional practical details or a photo, and a longer amenity label. These variations do not change the shared catalogue."
        />
        <CatalogueGrid>
          <RoomCard room={{
            ...rooms[0],
            title: `${rooms[0].title} at Dorchester Inn in Nairobi`,
            description: `${rooms[0].description} ${businessInfo.description} Contact the team with questions before making a stay request.`,
          }} />
          <ServiceCard service={{ ...serviceCatalogue[0], practicalDetails: [] }} />
          <AmenityTile amenity={{ id: 'sample-long-lounge-label', icon: 'armchair', label: 'Lounge access included with your stay at Dorchester Inn' }} />
        </CatalogueGrid>
      </section>

      <section aria-labelledby="sample-section-headings" className="space-y-8">
        <SectionHeading
          id="sample-section-headings"
          title="Discover Dorchester Inn"
          eyebrow="Section heading examples"
          description={businessInfo.description}
        />
        <div className="space-y-8 rounded-xl bg-surface p-6 md:p-8">
          <SectionHeading as="h3" align="left" title="Rooms" />
          <SectionHeading
            as="h3"
            align="left"
            title="Private rooms for backpackers and budget travellers visiting Nairobi"
            description="Dorchester Inn offers private rooms in Ruaraka, Nairobi, with an in-house bar and restaurant. Contact the team with questions about your stay before travelling."
          />
          <SectionHeading
            as="h3"
            title="Contact Dorchester Inn with questions about your stay in Nairobi"
            description={`Find us at ${businessInfo.address} You can contact the team by phone or email with questions before your visit.`}
          />
        </div>
      </section>

      <section aria-labelledby="sample-stories" className="space-y-8">
        <SectionHeading id="sample-stories" title="Story mosaic" description="Development preview using the supplied double-room and Royal Suburbs images to review the mosaic layout." />
        <StoryMosaic
          headingLevel="h3"
          items={[
            {
              id: 'private-rooms',
              title: 'Private rooms in Nairobi',
              paragraphs: [businessInfo.description],
              image: { src: doubleRoomPhoto, alt: 'Double bed with white bedding, a red runner and folded towels', width: 768, height: 576 },
              action: { label: 'Explore rooms', to: '/rooms' },
            },
            {
              id: 'contact-before-travelling',
              title: 'Contact Dorchester Inn with questions before travelling to Ruaraka',
              paragraphs: [
                `Dorchester Inn is located at ${businessInfo.address}`,
                'Contact the team by phone or email with questions about your stay. You can also browse the rooms and services pages to find the information you need before making a stay request.',
              ],
              image: { src: royalSuburbs, alt: 'Architectural rendering of Royal Suburbs by TSAVO', width: 500, height: 386 },
            },
          ]}
        />
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
            <ActionLink href="#sample-controls">Try the sample controls</ActionLink>
          </article>
          <article className="space-y-4 rounded-lg bg-primary-dark p-6 text-surface">
            <h3 className="text-surface">Navy surface</h3>
            <p>Explicit light text keeps this surface readable. The white inner focus band should remain visible around the action below.</p>
            <ActionLink href="#sample-controls">Inspect focus on navy</ActionLink>
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
          <ActionButton onClick={() => setMessage('Sample action activated. No information was sent.')}>Try sample action</ActionButton>
          <ActionButton disabled>Disabled action</ActionButton>
        </div>
        <p role="status">{message}</p>
        <div className="flex flex-wrap items-start gap-4">
          <ActionLink to="/rooms">Explore rooms</ActionLink>
          <ActionLink href={businessInfo.phone.href}>Call Dorchester Inn</ActionLink>
          <ActionLink href={businessInfo.email.href}>Email Dorchester Inn about your stay and any questions before travelling</ActionLink>
        </div>
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
    </>
  )
}
