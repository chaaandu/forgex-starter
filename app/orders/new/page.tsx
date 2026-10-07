// Screen: new order. Paste the WhatsApp message, pick what they ordered, save.
// The screen itself lives in NewOrderForm.tsx, because the plus and minus
// buttons need to run in the browser.

import { appConfig } from '@/lib/config'
import { aiIsOn } from '@/lib/env'
import { listProducts } from '@/lib/data'
import { getMyShop } from '@/lib/shop'
import NewOrderForm from './NewOrderForm'

export const metadata = { title: `New order · ${appConfig.name}` }

export default async function NewOrderPage() {
  const shop = await getMyShop()
  const products = await listProducts(shop.id)

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">New order</h1>
      {/* aiOn decides whether the "Read with AI" button shows. */}
      <NewOrderForm products={products} aiOn={aiIsOn()} />
    </div>
  )
}
