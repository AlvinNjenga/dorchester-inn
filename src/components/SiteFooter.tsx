import { Link, NavLink } from 'react-router'
import logo from '@/assets/dorchester-logo.jpg'
import { businessInfo } from '@/content/business'
import { footerNavigationGroups } from '@/content/navigation'

const linkClass = 'inline-flex min-h-11 max-w-full items-center rounded-sm py-2 text-sm/normal text-surface no-underline underline-offset-4 hover:text-gold hover:underline focus-visible:text-gold aria-[current=page]:text-gold aria-[current=page]:underline wrap-anywhere'
const headingClass = 'font-body text-base/normal font-semibold tracking-wide text-surface'

export default function SiteFooter() {
  return (
    <footer className="bg-brand-logo text-background">
      <div className="site-container grid gap-10 py-16 text-center md:grid-cols-2 md:text-left lg:gap-12 lg:py-24 xl:grid-cols-[1.3fr_1fr_1fr_1.3fr]">
        <div className="min-w-0 space-y-6">
          <Link to="/" className="inline-flex max-w-full flex-col items-center gap-3 rounded-sm text-surface no-underline sm:flex-row">
            <img src={logo} alt="" width={300} height={291} className="h-16 w-auto shrink-0 object-contain" />
            <span className="min-w-0 max-w-full font-heading text-2xl font-semibold wrap-anywhere">{businessInfo.name}</span>
          </Link>
          <p className="mx-auto max-w-prose text-sm/7 md:mx-0">{businessInfo.description}</p>
          <Link to="/gallery" className={linkClass}>Explore our gallery</Link>
        </div>

        {footerNavigationGroups.map(group => (
          <nav key={group.id} aria-labelledby={`footer-${group.id}-title`} className="min-w-0">
            <h2 id={`footer-${group.id}-title`} className={headingClass}>{group.label}</h2>
            <ul role="list" className="mt-6">
              {group.links.map(link => <li key={link.to}>
                <NavLink to={link.to} end className={linkClass}>{link.label}</NavLink>
              </li>)}
            </ul>
          </nav>
        ))}

        <section aria-labelledby="footer-contact-title" className="min-w-0">
          <h2 id="footer-contact-title" className={headingClass}>Get in touch</h2>
          <address className="mt-6 space-y-4 text-sm/7 not-italic">
            <p className="mx-auto max-w-prose md:mx-0">{businessInfo.address}</p>
            <ul role="list">
              <li><a href={businessInfo.phone.href} className={linkClass}>{businessInfo.phone.label}</a></li>
              <li><a href={businessInfo.email.href} className={linkClass}>{businessInfo.email.label}</a></li>
            </ul>
          </address>
          <Link to="/contact" className={`${linkClass} mt-2`}>Contact us</Link>
        </section>
      </div>

      <div className="border-t border-surface/15">
        <div className="site-container py-6 text-center text-xs/normal md:text-left">
          <p>© {new Date().getFullYear()} {businessInfo.name}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
