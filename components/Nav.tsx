'use client'

// The tabs under the header. The tab for the screen you're on is underlined.
//
// TODO: add one line to TABS for each screen of your flow, like
//   { href: '/[your-screen]', label: '[Your screen]' },
// Remove the Example tab once you've copied it into your own screen.

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut } from '@/app/login/actions'

const TABS = [
  { href: '/', label: 'Home' },
  { href: '/example', label: 'Example' },
]

export default function Nav({ signedIn, sampleMode }: { signedIn: boolean; sampleMode: boolean }) {
  const pathname = usePathname()

  // No tabs until someone is signed in. In sample mode there is no sign-in.
  if (!sampleMode && !signedIn) return <div className="h-4" />

  return (
    <nav className="mx-auto flex max-w-2xl items-end gap-1 overflow-x-auto px-2 pt-3">
      {TABS.map((tab) => {
        // A tab is on for its own address and anything under it, like /example/123.
        const active = tab.href === '/' ? pathname === '/' : pathname.startsWith(tab.href)
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
