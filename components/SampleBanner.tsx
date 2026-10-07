// A thin note at the top of every screen while the app runs in sample mode,
// before Supabase is connected.

import { README_URL } from '@/components/SetupScreen'

export default function SampleBanner() {
  return (
    <div className="bg-ink px-4 py-2 text-center text-sm text-page">
      You&apos;re in sample mode, so nothing is saved for good.{' '}
      <a href={`${README_URL}#2-create-your-supabase-project`} className="underline">
        Connect Supabase
      </a>
    </div>
  )
}
