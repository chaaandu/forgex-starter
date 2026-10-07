// A Supabase client for code that runs in the browser.
// The only place that needs it is the Google sign-in button.

import { createBrowserClient } from '@supabase/ssr'
import { supabaseKeys } from '@/lib/env'

export function createBrowserSupabase() {
  // NEXT_PUBLIC_ variables are safe to send to the browser.
  const { url, anonKey } = supabaseKeys()
  return createBrowserClient(url, anonKey)
}
