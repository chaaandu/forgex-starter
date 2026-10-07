// Screen: today. How many orders came in today, and what they add up to.
// "Today" means since midnight in India, whatever time zone the server is in.

import Link from 'next/link'
import { appConfig } from '@/lib/config'
import { supabaseIsSet } from '@/lib/env'
import { aiEditsSummary, listOrdersSince } from '@/lib/data'
import { dateInIndia, rupees, startOfTodayInIndia, timeInIndia } from '@/lib/format'
import { getMyShop } from '@/lib/shop'
import SetupScreen from '@/components/SetupScreen'
import StatusPill from '@/components/StatusPill'

export const metadata = { title: `Today · ${appConfig.name}` }

export default async function HomePage() {
  const shop = await getMyShop()
  const orders = await listOrdersSince(shop.id, startOfTodayInIndia())
  const total = orders.reduce((sum, order) => sum + order.total, 0)
  const ai = await aiEditsSummary(shop.id)

  return (
    <div className="space-y-6">
      {!supabaseIsSet() && <SetupScreen title="Next, connect Supabase" />}

      <section>
        <p className="text-sm text-muted">
          {shop.name} · {dateInIndia(new Date().toISOString())}
        </p>
        <div className="mt-2 grid grid-cols-2 gap-3">
          <div className="box p-4">
            <p className="text-sm text-muted">Orders today</p>
            <p className="mt-1 text-3xl font-semibold">{orders.length}</p>
          </div>
          <div className="box p-4">
            <p className="text-sm text-muted">Total today</p>
            <p className="mt-1 text-3xl font-semibold">{rupees(total)}</p>
          </div>
        </div>
      </section>

      <Link href="/orders/new" className="btn w-full">
        Add an order
      </Link>

      <section>
        <h2 className="font-semibold">Today&apos;s orders</h2>
        {orders.length === 0 ? (
          <p className="mt-2 text-muted">
            No orders yet today. They&apos;ll show here as you add them.
          </p>
        ) : (
          <ul className="box mt-2 divide-y divide-line">
            {orders.map((order) => (
              <li key={order.id} className="flex items-center justify-between gap-3 p-3">
                <div className="min-w-0">
                  <p className="truncate font-medium">{order.customer_name || 'No name'}</p>
                  <p className="text-sm text-muted">
                    {timeInIndia(order.created_at)} · {rupees(order.total)}
                  </p>
                </div>
                <StatusPill status={order.status} />
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Only shown once AI has read at least one order. */}
      {ai.aiOrders > 0 && (
        <p className="text-sm text-muted">
          AI read {ai.aiOrders} {ai.aiOrders === 1 ? 'order' : 'orders'}. You fixed{' '}
          {ai.averageEdits.toFixed(1)} lines per order on average.
        </p>
      )}
    </div>
  )
}
