import { Link, useParams } from 'react-router'
import PagePlaceholder from '@/components/PagePlaceholder'

export default function ArticlePage() {
  const { slug } = useParams<'slug'>()

  return (
    <div className="mx-auto max-w-article space-y-4">
      <PagePlaceholder title="Blog article" />
      <p className="max-w-prose">Article slug: <span className="font-mono wrap-anywhere">{slug}</span></p>
      <Link className="underline" to="/blog">Back to Blog</Link>
    </div>
  )
}
