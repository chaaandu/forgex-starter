// Google sends the owner back here after they sign in.
// The address carries a one-time code. We swap it for a Supabase session,
// which signs the owner in, then go to the home screen.

import { NextResponse, type NextRequest } from 'next/server'
import { supabaseIsSet } from '@/lib/env'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')

  if (code && supabaseIsSet()) {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (!error) return NextResponse.redirect(`${origin}/`)
  }

  // No code, or the swap failed: back to sign-in with a note.
  return NextResponse.redirect(`${origin}/login?error=signin`)
}
