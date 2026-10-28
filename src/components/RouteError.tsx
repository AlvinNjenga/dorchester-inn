import { isRouteErrorResponse, Link, useRouteError } from 'react-router'
import NotFoundPage from '@/pages/NotFoundPage'

export default function RouteError() {
  const error = useRouteError()
  const missing = isRouteErrorResponse(error) && error.status === 404

  if (missing) {
    return <NotFoundPage />
  }

  return (
    <section className="space-y-4 p-4">
      <h1>
        Unable to load this page
      </h1>
      <p>Please try again. If the problem continues, contact us.</p>
      <p className="flex flex-wrap gap-4">
        <Link className="underline" to="/">Go to Home</Link>
        <Link className="underline" to="/contact">Contact us</Link>
      </p>
    </section>
  )
}
