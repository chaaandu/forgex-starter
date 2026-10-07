// A small label showing an order's status.

import type { Status } from '@/lib/types'

export default function StatusPill({ status }: { status: Status }) {
  // Paid orders are done, so they get the brand colour.
  const done = status === 'paid'
  return (
    <span
      className={`shrink-0 rounded-full border px-2.5 py-0.5 text-xs font-medium capitalize ${
        done ? 'border-brand bg-brand text-brand-ink' : 'border-line text-muted'
      }`}
    >
      {status}
    </span>
  )
}
