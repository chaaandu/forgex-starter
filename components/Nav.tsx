'use client'

// The tabs under the header. The tab for the screen you're on is underlined.

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut } from '@/app/login/actions'

const TABS = [
  { href: '/', label: 'Today' },
  { href: '/orders/new', label: 'New order' },
  { href: '/orders', label: 'Orders' },
  { href: '/products', label: 'Products' },
]

export default function Nav({ signedIn, sampleMode }: { signedIn: boolean; sampleMode: boolean }) {
  const pathname = usePathname()

  // No tabs before someone is signed in and has a shop.
  const showTabs = sampleMode || (signedIn && pathname !== '/new-shop')
  if (!showTabs) return <div className="h-4" />

  return (
    <nav className="mx-auto flex max-w-2xl items-end gap-1 overflow-x-auto px-2 pt-3">
      {TABS.map((tab) => {
        const active = pathname === tab.href
        return (
          <Link
            key={tab.href}
            href={tab.href}
            aria-current={active ? 'page' : undefined}
            className={`shrink-0 border-b-2 px-3 pb-2 text-sm font-medium ${
              active ? 'border-brand text-brand' : 'border-transparent text-muted'
            }`}
          >
            {tab.label}
          </Link>
        )
      })}
      {signedIn && (
        <form action={signOut} className="ml-auto shrink-0 pb-2">
          <button className="px-3 text-sm text-muted">Sign out</button>
        </form>
      )}
    </nav>
  )
}
