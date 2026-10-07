// Reads the env variables the app needs.
// An env variable is a setting you keep outside the code, such as a key.
// On your laptop they live in .env.local. On Vercel they live in
// Project Settings, Environment Variables.

// Supabase's public key. Newer Supabase projects call it the publishable key,
// so either name works.
function anonKeyValue(): string | undefined {
  return (
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
  )
}

// The two variables Supabase needs. Without them the app runs in sample mode.
export function missingSupabaseVars(): string[] {
  const missing: string[] = []
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) missing.push('NEXT_PUBLIC_SUPABASE_URL')
  if (!anonKeyValue()) missing.push('NEXT_PUBLIC_SUPABASE_ANON_KEY')
  return missing
}

// True when both Supabase variables are set.
export function supabaseIsSet(): boolean {
  return missingSupabaseVars().length === 0
}

// The Supabase address and key. Only call this after supabaseIsSet() is true.
export function supabaseKeys(): { url: string; anonKey: string } {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const anonKey = anonKeyValue()
  if (!url || !anonKey) {
    throw new Error(`Missing ${missingSupabaseVars().join(' and ')}. See README step 4.`)
  }
  return { url, anonKey }
}

// Which AI answers askAI() in lib/ai.ts: 'gemini' (the default) or 'claude'.
export type AiProvider = 'gemini' | 'claude'

export function aiProvider(): AiProvider {
  return process.env.AI_PROVIDER === 'claude' ? 'claude' : 'gemini'
}

// AI is on only when the key for the chosen provider is set.
export function aiIsOn(): boolean {
  if (aiProvider() === 'claude') return Boolean(process.env.ANTHROPIC_API_KEY)
  return Boolean(process.env.GEMINI_API_KEY)
}
