// Who is signed in, and which shop is theirs.
// Every screen that shows shop data starts by calling getMyShop().

import { redirect } from 'next/navigation'
import type { User } from '@supabase/supabase-js'
import { supabaseIsSet } from '@/lib/env'
import { createClient } from '@/lib/supabase/server'
import { sampleShop } from '@/lib/sample'
import type { Shop } from '@/lib/types'

// The signed-in owner. Sends anyone who isn't signed in to /login.
export async function getSignedInUser(): Promise<User> {
  const supabase = await createClient()
  const { data } = await supabase.auth.getUser()
  if (!data.user) redirect('/login')
  return data.user
}

// The signed-in owner's shop.
// Sends them to /login if they aren't signed in, and to /new-shop if they
// haven't made a shop yet. Without Supabase, it returns the sample shop.
export async function getMyShop(): Promise<Shop> {
  if (!supabaseIsSet()) return sampleShop

  const user = await getSignedInUser()
  const supabase = await createClient()
  const { data: shop, error } = await supabase
    .from('shops')
    .select('id, name')
    .eq('owner_id', user.id)
    .maybeSingle()

  if (error) throw new Error(`Could not load your shop: ${error.message}`)
  if (!shop) redirect('/new-shop')
  return shop as Shop
}
