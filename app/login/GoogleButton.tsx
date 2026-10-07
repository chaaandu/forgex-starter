'use client'

// The "Sign in with Google" button.
// It sends the owner to Google, and Google sends them back to /auth/callback.

import { useState } from 'react'
import { createBrowserSupabase } from '@/lib/supabase/browser'

export default function GoogleButton() {
  const [busy, setBusy] = useState(false)

  async function signIn() {
    setBusy(true)
    const supabase = createBrowserSupabase()
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    })
  }

  return (
    <button className="btn w-full" onClick={signIn} disabled={busy}>
      {busy ? 'Opening Google…' : 'Sign in with Google'}
    </button>
  )
}
