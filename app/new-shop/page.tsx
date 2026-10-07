// Screen: create your shop. Shown once, right after the first sign-in.

import { redirect } from 'next/navigation'
import { appConfig } from '@/lib/config'
import { supabaseIsSet } from '@/lib/env'
import { createClient } from '@/lib/supabase/server'
import { getSignedInUser } from '@/lib/shop'
import { createShop } from './actions'

export const metadata = { title: `Your shop · ${appConfig.name}` }

export default async function NewShopPage() {
  // On sample data there is already a sample shop.
  if (!supabaseIsSet()) redirect('/')

  // Already have a shop? Then there's nothing to create.
  const user = await getSignedInUser()
  const supabase = await createClient()
  const { data: shop, error } = await supabase
    .from('shops')
    .select('id')
    .eq('owner_id', user.id)
    .maybeSingle()
  if (error) throw new Error(`Could not check for your shop: ${error.message}`)
  if (shop) redirect('/')

  return (
    <section className="box p-5">
      <h1 className="text-xl font-semibold">What is your shop called?</h1>
      <p className="mt-2 text-muted">
        Customers won&apos;t see this. It keeps your orders together.
      </p>
      <form action={createShop} className="mt-5 space-y-4">
        <div>
          <label className="label" htmlFor="name">
            Shop name
          </label>
          <input
            id="name"
            name="name"
            className="field"
            placeholder="Asha's Bakes"
            required
            maxLength={80}
          />
        </div>
        <button className="btn w-full">Create my shop</button>
      </form>
    </section>
  )
}
