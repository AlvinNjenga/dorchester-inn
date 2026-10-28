import { matchPath } from 'react-router'
import type { NavigationItem } from '@/content/navigation'

// Match real destinations rather than broad prefixes, so an unknown room or
// service URL does not highlight a valid section on the recovery page.
export function isNavigationSectionActive(item: NavigationItem, pathname: string): boolean {
  if (item.kind !== 'group') return false
  return (item.to !== undefined && matchPath({ path: item.to, end: true }, pathname) !== null)
    || item.children.some(link => matchPath({ path: link.to, end: true }, pathname) !== null)
    || (item.id === 'discover' && matchPath({ path: '/blog/:slug', end: true }, pathname) !== null)
}
