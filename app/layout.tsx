// The frame around every screen: the header, the tabs and the sample-data note.

import type { Metadata, Viewport } from 'next'
import './globals.css'
import { appConfig } from '@/lib/config'
import { supabaseIsSet } from '@/lib/env'
import { createClient } from '@/lib/supabase/server'
import Nav from '@/components/Nav'
import SampleBanner from '@/components/SampleBanner'

// Every screen shows fresh data, so build each one when it's asked for.
export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: appConfig.name,
  description: appConfig.tagline,
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  // Is someone signed in? Only possible once Supabase is connected.
  let signedIn = false
  if (supabaseIsSet()) {
    const supabase = await createClient()
    const { data } = await supabase.auth.getUser()
    signedIn = Boolean(data.user)
  }

  return (
    <html lang="en-IN">
      <body className="min-h-dvh">
        {!supabaseIsSet() && <SampleBanner />}
        <header className="border-b border-line bg-card">
          <div className="mx-auto max-w-2xl px-4 pt-4">
            <p className="text-lg font-semibold">{appConfig.name}</p>
            <p className="text-sm text-muted">{appConfig.tagline}</p>
          </div>
          <Nav signedIn={signedIn} sampleMode={!supabaseIsSet()} />
        </header>
        <main className="mx-auto max-w-2xl px-4 py-6">{children}</main>
      </body>
    </html>
  )
}
