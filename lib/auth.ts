// Who is signed in.
//
// Every screen and every server action that reads or saves data starts by
// calling getUserId(). It answers one question: whose rows are these?
//
// Before Supabase is connected there is no sign-in, so everyone is the same
// sample person. After, it is the signed-in Google account, and anyone who
// isn't signed in is sent to /login.

import { redirect } from 'next/navigation'
import { supabaseIsSet } from '@/lib/env'
import { createClient } from '@/lib/supabase/server'

// The id every sample row belongs to, before Supabase is connected.
export const SAMPLE_USER_ID = 'sample-user'

// The signed-in person's id. Sends anyone who isn't signed in to /login.
// Always take the id from here, never from a form: a form can be changed by
// whoever fills it in.
export async function getUserId(): Promise<string> {
  if (!supabaseIsSet()) return SAMPLE_USER_ID

  const supabase = await createClient()
  const { data } = await supabase.auth.getUser()
  if (!data.user) redirect('/login')
  return data.user.id
}
