// A Supabase client for server code: pages, server actions and API routes.
// It reads the signed-in owner from the cookies, so every query runs as them
// and the row-level security rules in the migration apply.

import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { supabaseKeys } from '@/lib/env'

export async function createClient() {
  const { url, anonKey } = supabaseKeys()
  const cookieStore = await cookies()

  return createServerClient(url, anonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll()
      },
      setAll(cookiesToSet) {
        try {
          for (const { name, value, options } of cookiesToSet) {
            cookieStore.set(name, value, options)
          }
        } catch {
          // Pages can't set cookies, only actions and routes can.
          // That's fine: middleware.ts refreshes the session cookie instead.
        }
      },
    },
  })
}
