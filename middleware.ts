// Middleware runs before every page loads.
// Its one job here: keep the owner's Supabase sign-in fresh, so they stay
// signed in. Pages decide for themselves who may see them (lib/shop.ts).

import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'
import { supabaseIsSet, supabaseKeys } from '@/lib/env'

export async function middleware(request: NextRequest) {
  // No Supabase yet: the app runs on sample data, so there is nothing to refresh.
  if (!supabaseIsSet()) return NextResponse.next()

  const { url, anonKey } = supabaseKeys()

  let response = NextResponse.next({ request })

  const supabase = createServerClient(url, anonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll()
      },
      setAll(cookiesToSet, headers) {
        for (const { name, value } of cookiesToSet) request.cookies.set(name, value)
        response = NextResponse.next({ request })
        for (const { name, value, options } of cookiesToSet) {
          response.cookies.set(name, value, options)
        }
        // Stops a shared cache from handing one owner's session to someone else.
        for (const [key, value] of Object.entries(headers)) response.headers.set(key, value)
      },
    },
  })

  // Asking for the user refreshes the session cookie if it has expired.
  await supabase.auth.getUser()

  return response
}

export const config = {
  // Run on Node.js, like the rest of the app. Supabase works best there.
  runtime: 'nodejs',
  // Run on every page, but not on images and other static files.
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
}
