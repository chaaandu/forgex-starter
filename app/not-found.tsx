// Shown for an address that doesn't exist in the app.

import Link from 'next/link'

export default function NotFound() {
  return (
    <section className="box p-5">
      <h1 className="text-xl font-semibold">There&apos;s no page here</h1>
      <p className="mt-2 text-muted">Check the address, or go back home.</p>
      <Link href="/" className="btn mt-4">
        Go home
      </Link>
    </section>
  )
}
