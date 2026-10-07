'use server'

// Creates the signed-in owner's shop. Each owner can have one shop.

import { redirect } from 'next/navigation'
import { z } from 'zod'
import { createClient } from '@/lib/supabase/server'
import { getSignedInUser } from '@/lib/shop'

const ShopForm = z.object({
  name: z.string().trim().min(1).max(80),
})

export async function createShop(formData: FormData) {
  const user = await getSignedInUser()
  const { name } = ShopForm.parse({ name: formData.get('name') })

  const supabase = await createClient()
  // owner_id always comes from the session, never from the form.
  const { error } = await supabase.from('shops').insert({ owner_id: user.id, name })

  // 23505 means "already exists": this owner already has a shop, so carry on.
  if (error && error.code !== '23505') {
    throw new Error(`Could not create the shop: ${error.message}`)
  }
  redirect('/products')
}
