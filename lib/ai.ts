// Ask an AI model one question and get text back.
//
// AI is optional, and off until you set a key (cards/extra-ai.md).
// AI_PROVIDER picks who answers:
//   gemini (the default) uses GEMINI_API_KEY, free from Google AI Studio
//   claude               uses ANTHROPIC_API_KEY, paid, from console.anthropic.com
//
// This file only runs on the server, so your keys never reach the browser.
//
// How to use it, from a server action or app/api/ai/route.ts:
//
//   const text = await askAI({
//     instructions: '[What the AI should do, in plain words]',
//     input: '[What the person typed or chose]',
//   })
//
// Write your instructions with prompts/use-ai-for-one-step.md.

import 'server-only'
import Anthropic from '@anthropic-ai/sdk'
import { z } from 'zod'
import { aiIsOn, aiProvider } from '@/lib/env'

// The models. Set GEMINI_MODEL or CLAUDE_MODEL to try a different one.
const GEMINI_MODEL = process.env.GEMINI_MODEL || 'gemini-3.8-flash'
const CLAUDE_MODEL = process.env.CLAUDE_MODEL || 'claude-haiku-4-5'

// The longest answer you'll get back, in tokens (about 3 words for every 4 tokens).
const MAX_TOKENS = 1024

export type AskAI = {
  // What the AI should do: its job, the rules and the shape of the answer.
  instructions: string
  // What it works on this time.
  input: string
}

// The one function the rest of the app calls.
export async function askAI({ instructions, input }: AskAI): Promise<string> {
  if (!aiIsOn()) throw new Error('AI is off. Set a key first: see cards/extra-ai.md.')
  return aiProvider() === 'claude' ? askClaude(instructions, input) : askGemini(instructions, input)
}

// Asks Gemini through its REST API. No extra package needed.
async function askGemini(instructions: string, input: string): Promise<string> {
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': process.env.GEMINI_API_KEY ?? '',
      },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: instructions }] },
        contents: [{ role: 'user', parts: [{ text: input }] }],
        generationConfig: { maxOutputTokens: MAX_TOKENS },
      }),
    },
  )

  if (!response.ok) {
    throw new Error(`Gemini answered ${response.status}: ${await response.text()}`)
  }

  // Zod checks the answer has the shape we expect before we read it.
  const body = z
    .object({
      candidates: z.array(
        z.object({ content: z.object({ parts: z.array(z.object({ text: z.string() })) }) }),
      ),
    })
    .parse(await response.json())

  return (body.candidates[0]?.content.parts ?? [])
    .map((part) => part.text)
    .join('')
    .trim()
}

// Asks Claude through the Anthropic SDK.
async function askClaude(instructions: string, input: string): Promise<string> {
  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })
  const response = await client.messages.create({
    model: CLAUDE_MODEL,
    max_tokens: MAX_TOKENS,
    system: instructions,
    messages: [{ role: 'user', content: input }],
  })

  return response.content
    .map((block) => (block.type === 'text' ? block.text : ''))
    .join('')
    .trim()
}
