import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

type CatalogueGridProps = {
  children: ReactNode
  columns?: 3 | 4
}

export default function CatalogueGrid({ children, columns = 3 }: CatalogueGridProps) {
  return (
    <div className={cn('grid min-w-0 grid-cols-1 items-stretch gap-6 md:grid-cols-2', columns === 4 ? 'lg:grid-cols-4' : 'lg:grid-cols-3')}>
      {children}
    </div>
  )
}
