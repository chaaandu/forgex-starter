// Shown when the app needs Supabase and it isn't connected yet.
// It names the missing env variables and points to the README step that fixes it.

import { missingSupabaseVars } from '@/lib/env'

// Your README on GitHub. Change this to your own repo's link if you like.
export const README_URL = 'https://github.com/chaaandu/mesa-starter'

export default function SetupScreen({ title }: { title: string }) {
  const missing = missingSupabaseVars()

  return (
    <section className="box p-5">
      <h1 className="text-xl font-semibold">{title}</h1>
      <p className="mt-2 text-muted">
        The app is running. To sign in and save orders, it needs a Supabase project. These env
        variables aren&apos;t set yet:
      </p>
      <ul className="mt-3 space-y-1">
        {missing.map((name) => (
          <li key={name}>
            <code className="rounded bg-page px-2 py-1 text-sm">{name}</code>
          </li>
        ))}
      </ul>
      <ol className="mt-4 list-decimal space-y-1 pl-5 text-sm">
        <li>
          Make a Supabase project:{' '}
          <a className="text-brand underline" href={`${README_URL}#2-create-your-supabase-project`}>
            README step 2
          </a>
          .
        </li>
        <li>
          Add the variables on Vercel, or in <code>.env.local</code> on your laptop:{' '}
          <a className="text-brand underline" href={`${README_URL}#4-put-it-live-on-vercel`}>
            README step 4
          </a>
          .
        </li>
      </ol>
      <p className="mt-4 text-sm text-muted">
        Until then, every screen works on the sample data in <code>lib/sample.ts</code>.
      </p>
    </section>
  )
}
