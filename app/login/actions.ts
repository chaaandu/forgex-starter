'use server'

// Signing out. Used by the "Sign out" link in the tabs.

import { redirect } from 'next/navigation'
import { supabaseIsSet } from '@/lib/env'
import { createClient } from '@/lib/supabase/server'

export async function signOut() {
  if (supabaseIsSet()) {
    const supabase = await createClient()
    await supabase.auth.signOut()
  }
  redirect('/login')
}
