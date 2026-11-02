import type { ComponentProps } from 'react'
import { cn } from '@/lib/utils'

export default function ActionButton({
  className,
  type = 'button',
  ...props
}: ComponentProps<'button'>) {
  return <button {...props} type={type} className={cn('button-primary max-w-full', className)} />
}
