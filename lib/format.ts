// Small helpers for showing money and time the way people in India read them.

const INDIA = 'Asia/Kolkata'

// 1200 becomes ₹1,200 and 150000 becomes ₹1,50,000.
export function rupees(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 2,
    minimumFractionDigits: 0,
  }).format(amount)
}

// The time of day in India, like "4:05 pm".
export function timeInIndia(iso: string): string {
  return new Intl.DateTimeFormat('en-IN', {
    timeZone: INDIA,
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  })
    .format(new Date(iso))
    .toLowerCase()
}

// A short date in India, like "16 Oct".
export function dateInIndia(iso: string): string {
  return new Intl.DateTimeFormat('en-IN', {
    timeZone: INDIA,
    day: 'numeric',
    month: 'short',
  }).format(new Date(iso))
}

// Midnight today in India, as a moment in time.
// Servers often run on UTC, so "today" has to be worked out for India on purpose.
export function startOfTodayInIndia(): Date {
  // en-CA writes dates as 2026-10-16, which is easy to build on.
  const today = new Intl.DateTimeFormat('en-CA', { timeZone: INDIA }).format(new Date())
  return new Date(`${today}T00:00:00+05:30`)
}
