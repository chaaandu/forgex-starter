// Screen: home, at /. The first thing someone sees once they're signed in.
//
// The (app) folder is a route group: the brackets keep it out of the address,
// so this file is the page at /, not /app. Every screen of your flow lives
// in this folder, next to example/.
//
// TODO, once you know your flow (frameworks/03-flows.md):
//   1. Replace the welcome below with the first thing your person needs to
//      see or do when they open the app.
//   2. If they come back every day, this is the screen they open (card 9).
//   3. Keep getUserId() at the top. It sends anyone who isn't signed in to
//      /login, and tells you whose rows to show.

import Link from 'next/link'
import { appConfig } from '@/lib/config'
import { supabaseIsSet } from '@/lib/env'
import { getUserId } from '@/lib/auth'
import Card from '@/components/Card'
import PageHeader from '@/components/PageHeader'
import SetupScreen from '@/components/SetupScreen'

export const metadata = { title: `Home · ${appConfig.name}` }

export default async function HomePage() {
  // Who is this? Signed-out people go to /login. In sample mode, everyone is
  // the sample person.
  await getUserId()

  return (
    <div className="space-y-6">
      {/* Only shown until Supabase is connected (card 10). */}
      {!supabaseIsSet() && <SetupScreen title="Next, connect Supabase" />}

      {/* TODO: everything from here down is a placeholder. Replace it with your first screen. */}
      <PageHeader
        title="Your app starts here"
        text="This is a base to build your own solution on, not a finished app."
      />

      <Card>
        <h2 className="font-semibold">How to build each screen</h2>
        <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm">
          <li>
            Fill in <code>frameworks/02-your-solution.md</code> from your research.
          </li>
          <li>
            Plan your screens and tables with <code>prompts/plan-my-app.md</code>.
          </li>
          <li>
            Copy <code>app/(app)/example</code> for each screen of your flow, then rename it.
          </li>
        </ol>
      </Card>

      <Link href="/example" className="btn w-full">
        Open the example
      </Link>
    </div>
  )
}
