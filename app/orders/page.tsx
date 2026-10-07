// Screen: all orders. Change a status in one tap. Filter by status.

import Link from 'next/link'
import { appConfig } from '@/lib/config'
import { listOrders } from '@/lib/data'
import { dateInIndia, rupees, timeInIndia } from '@/lib/format'
import { getMyShop } from '@/lib/shop'
import { STATUSES, type Status } from '@/lib/types'
import { setStatusAction } from './actions'

export const metadata = { title: `Orders · ${appConfig.name}` }

export default async function OrdersPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>
}) {
  const shop = await getMyShop()

  // The filter comes from the address, like /orders?status=ready
  const { status } = await searchParams
  const filter = STATUSES.find((s) => s === status)
  const orders = await listOrders(shop.id, filter)

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <h1 className="text-xl font-semibold">Orders</h1>
        <Link href="/orders/new" className="btn">
          New order
        </Link>
      </div>

      {/* Filter */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        <FilterLink label="All" href="/orders" active={!filter} />
        {STATUSES.map((s) => (
          <FilterLink key={s} label={s} href={`/orders?status=${s}`} active={filter === s} />
        ))}
      </div>

      {orders.length === 0 ? (
        <p className="text-muted">
          {filter ? `No ${filter} orders right now.` : 'No orders yet. Add your first one.'}
        </p>
      ) : (
        <ul className="space-y-3">
          {orders.map((order) => (
            <li key={order.id} className="box p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="truncate font-medium">{order.customer_name || 'No name'}</p>
                  <p className="text-sm text-muted">
                    {dateInIndia(order.created_at)}, {timeInIndia(order.created_at)}
                    {order.customer_phone && (
                      <>
                        {' · '}
                        <a className="text-brand underline" href={`tel:${order.customer_phone}`}>
                          {order.customer_phone}
                        </a>
                      </>
                    )}
                  </p>
                </div>
                <p className="shrink-0 font-semibold">{rupees(order.total)}</p>
              </div>

              <ul className="mt-2 text-sm">
                {order.items.map((item, i) => (
                  <li key={i}>
                    {item.qty} × {item.name}
                  </li>
                ))}
              </ul>

              {order.raw_text && (
                <details className="mt-2 text-sm">
                  <summary className="cursor-pointer text-muted">WhatsApp message</summary>
                  <p className="mt-1 whitespace-pre-wrap rounded-lg bg-page p-2">
                    {order.raw_text}
                  </p>
                </details>
              )}

              {/* One tap sets the status. The current one is filled in. */}
              <div className="mt-3 grid grid-cols-4 gap-1">
                {STATUSES.map((s) => (
                  <StatusButton key={s} orderId={order.id} status={s} current={order.status} />
                ))}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

function FilterLink({ label, href, active }: { label: string; href: string; active: boolean }) {
  return (
    <Link
      href={href}
      aria-current={active ? 'page' : undefined}
      className={`shrink-0 rounded-full border px-3 py-1.5 text-sm capitalize ${
        active ? 'border-brand bg-brand text-brand-ink' : 'border-line bg-card'
      }`}
    >
      {label}
    </Link>
  )
}

// A button that sets one status. Each one is its own small form.
function StatusButton(props: { orderId: string; status: Status; current: Status }) {
  const active = props.status === props.current
  return (
    <form action={setStatusAction}>
      <input type="hidden" name="id" value={props.orderId} />
      <input type="hidden" name="status" value={props.status} />
      <button
        aria-pressed={active}
        className={`min-h-11 w-full rounded-lg border text-sm capitalize ${
          active ? 'border-brand bg-brand font-semibold text-brand-ink' : 'border-line bg-card'
        }`}
      >
        {props.status}
      </button>
    </form>
  )
}
