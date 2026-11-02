import type { ComponentProps } from 'react'
import { Link, type LinkProps } from 'react-router'
import { cn } from '@/lib/utils'

type ActionLinkProps =
  | (LinkProps & { href?: never })
  | (ComponentProps<'a'> & { href: string; to?: never })

export default function ActionLink({ className, ...props }: ActionLinkProps) {
  const classes = cn('button-primary max-w-full', className)

  if (props.href !== undefined) {
    return <a {...props} className={classes} />
  }

  return <Link {...props} className={classes} />
}
