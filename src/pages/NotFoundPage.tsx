import { Link } from 'react-router'

export default function NotFoundPage() {
  return (
    <section className="space-y-4">
      <h1>Page not found</h1>
      <p>This page could not be found. Choose a link below to continue.</p>
      <p className="flex flex-wrap gap-4">
        <Link className="underline" to="/">Go to Home</Link>
        <Link className="underline" to="/contact">Contact us</Link>
      </p>
    </section>
  )
}
