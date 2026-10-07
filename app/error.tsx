'use client'

// Shown when a screen hits an error it can't recover from.
// The details go to the terminal (on your laptop) or the Vercel logs (when live).

export default function ErrorScreen({ reset }: { error: Error; reset: () => void }) {
  return (
    <section className="box p-5">
      <h1 className="text-xl font-semibold">That didn&apos;t work</h1>
      <p className="mt-2 text-muted">
        Nothing you saved before is lost. Try again. If it keeps happening, check the terminal or
        the Vercel logs for the exact error.
      </p>
      <button className="btn mt-4" onClick={reset}>
        Try again
      </button>
    </section>
  )
}
