// /api/ai: the one address your screens call to use AI.
//
// GET  /api/ai   tells you whether AI is on. Open it in your browser to check.
//                { "on": true, "provider": "gemini" }
//
// POST /api/ai   asks the AI, using the INSTRUCTIONS below.
//   Send:        { "input": "[what the person typed]" }
//   Get:         { "text": "[the AI's answer]" }
//   AI off:      status 503, { "error": "ai_off", "message": "..." }
//
// The instructions live here, on the server, not in the browser. That way
// nobody can change what your AI is asked, or use your key for something else.
//
// TODO: once you know the one step of your flow that AI helps with, write
// INSTRUCTIONS with prompts/use-ai-for-one-step.md. Until then it is a
// placeholder.

import { NextResponse } from 'next/server'
import { z } from 'zod'
import { askAI } from '@/lib/ai'
import { aiIsOn, aiProvider, supabaseIsSet } from '@/lib/env'
import { createClient } from '@/lib/supabase/server'

const INSTRUCTIONS = [
  'You help inside a small app built by a student in India.',
  'Answer in plain English, in 3 short sentences or fewer.',
].join('\n')

// What a request must look like. Zod checks it before anything else runs.
const Body = z.object({
  input: z.string().trim().min(1).max(4000),
})

export async function GET() {
  return NextResponse.json({ on: aiIsOn(), provider: aiProvider() })
}

export async function POST(request: Request) {
  // 1. Is AI on?
  if (!aiIsOn()) {
    const key = aiProvider() === 'claude' ? 'ANTHROPIC_API_KEY' : 'GEMINI_API_KEY'
    return NextResponse.json(
      { error: 'ai_off', message: `AI is off. Set ${key} to turn it on. See cards/extra-ai.md.` },
      { status: 503 },
    )
  }

  // 2. Once Supabase is connected, only signed-in people may use your key.
  if (supabaseIsSet()) {
    const supabase = await createClient()
    const { data } = await supabase.auth.getUser()
    if (!data.user) {
      return NextResponse.json(
        { error: 'signed_out', message: 'Sign in again, then retry.' },
        { status: 401 },
      )
    }
  }

  // 3. Check the request.
  const parsed = Body.safeParse(await request.json().catch(() => null))
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'bad_input', message: 'Send some text of up to 4,000 characters.' },
      { status: 400 },
    )
  }

  // 4. Ask the AI.
  try {
    const text = await askAI({ instructions: INSTRUCTIONS, input: parsed.data.input })
    return NextResponse.json({ text })
  } catch (error) {
    console.error('AI did not answer:', error)
    return NextResponse.json(
      { error: 'ai_failed', message: 'AI did not answer. What you typed is safe. Try again.' },
      { status: 502 },
    )
  }
}
