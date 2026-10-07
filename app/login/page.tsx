// Screen: sign in with Google.

import { redirect } from 'next/navigation'
import { appConfig } from '@/lib/config'
import { supabaseIsSet } from '@/lib/env'
import { createClient } from '@/lib/supabase/server'
import SetupScreen from '@/components/SetupScreen'
import GoogleButton from './GoogleButton'

export const metadata = { title: `Sign in · ${appConfig.name}` }

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>
}) {
  // Sign-in needs Supabase. Without it, explain what to set up.
  if (!supabaseIsSet()) return <SetupScreen title="Sign-in needs Supabase" />

  // Already signed in? Go straight to the home screen.
  const supabase = await createClient()
  const { data } = await supabase.auth.getUser()
  if (data.user) redirect('/')

  const { error } = await searchParams

  return (
    <section className="box p-5">
      <h1 className="text-xl font-semibold">Sign in to {appConfig.name}</h1>
      <p className="mt-2 text-muted">Use your Google account. Everything you add belongs to it.</p>
      {error && (
        <p className="mt-3 rounded-lg bg-page p-3 text-sm" role="alert">
          That sign-in didn&apos;t finish. Try again. If it keeps failing, check README step 5.
        </p>
      )}
      <div className="mt-5">
        <GoogleButton />
      </div>
    </section>
  )
}
