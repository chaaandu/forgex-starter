// Reads a WhatsApp message with AI and turns it into order lines.
//
// AI is optional. It runs only when a key is set (see README, "Optional: turn
// on AI"). AI_PROVIDER picks who reads the message:
//   gemini (the default) uses GEMINI_API_KEY
//   claude               uses ANTHROPIC_API_KEY
//
// This file only runs on the server, so the keys never reach the browser.

import 'server-only'
import Anthropic from '@anthropic-ai/sdk'
import { zodOutputFormat } from '@anthropic-ai/sdk/helpers/zod'
import { z } from 'zod'
import { aiProvider } from '@/lib/env'
import type { OrderLine, Product } from '@/lib/types'

// The Gemini model. Set GEMINI_MODEL to try a different one.
const GEMINI_MODEL = process.env.GEMINI_MODEL || 'gemini-3.8-flash'
const CLAUDE_MODEL = 'claude-haiku-4-5'

// The shape we ask the AI for. Zod checks the answer really has this shape.
const AiAnswer = z.object({
  lines: z.array(
    z.object({
      product_id: z.string().nullable(), // an id from the product list, or null
      name: z.string(),
      qty: z.number(),
      price: z.number().nullable(), // only for items not in the list
    }),
  ),
})
type AiAnswer = z.infer<typeof AiAnswer>

// The instructions the AI gets with every message.
function instructions(products: Product[]): string {
  const list = products
    .map((p) => `- id: ${p.id} | ${p.name} | ${p.unit} | Rs ${p.price}`)
    .join('\n')

  return [
    'You read WhatsApp orders sent to a small shop in India.',
    'Messages may mix English, Hindi and other Indian languages, with typos and short forms.',
    'Turn the message into order lines.',
    'Match each item to the product list below and use its id as product_id.',
    'If an item is not in the list, set product_id to null, write its name, and set price to a number only if the message states one, else null.',
    'qty is a whole number. If the message gives no quantity, use 1.',
    'Ignore greetings, dates and delivery notes. If nothing is ordered, return an empty list.',
    '',
    'Product list:',
    list || '(no products yet)',
  ].join('\n')
}

// Asks Gemini through its REST API. No extra package needed.
async function askGemini(message: string, products: Product[]): Promise<AiAnswer> {
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': process.env.GEMINI_API_KEY ?? '',
      },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: instructions(products) }] },
        contents: [{ role: 'user', parts: [{ text: message }] }],
        generationConfig: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: 'OBJECT',
            properties: {
              lines: {
                type: 'ARRAY',
                items: {
                  type: 'OBJECT',
                  properties: {
                    product_id: { type: 'STRING', nullable: true },
                    name: { type: 'STRING' },
                    qty: { type: 'NUMBER' },
                    price: { type: 'NUMBER', nullable: true },
                  },
                  required: ['product_id', 'name', 'qty', 'price'],
                },
              },
            },
            required: ['lines'],
          },
        },
      }),
    },
  )

  if (!response.ok) {
    throw new Error(`Gemini answered ${response.status}: ${await response.text()}`)
  }

  const body: unknown = await response.json()
  const text = z
    .object({
      candidates: z.array(
        z.object({ content: z.object({ parts: z.array(z.object({ text: z.string() })) }) }),
      ),
    })
    .parse(body).candidates[0]?.content.parts[0]?.text

  return AiAnswer.parse(JSON.parse(text ?? '{}'))
}

// Asks Claude through the Anthropic SDK, with structured output.
async function askClaude(message: string, products: Product[]): Promise<AiAnswer> {
  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })
  const response = await client.messages.parse({
    model: CLAUDE_MODEL,
    max_tokens: 2000,
    system: instructions(products),
    messages: [{ role: 'user', content: message }],
    output_config: { format: zodOutputFormat(AiAnswer) },
  })

  if (!response.parsed_output) throw new Error('Claude did not return order lines.')
  return AiAnswer.parse(response.parsed_output)
}

// The one function the rest of the app calls.
// It cleans up what the AI said: names and prices come from your product list,
// quantities are whole numbers of at least 1, and unknown ids are dropped.
export async function readOrderWithAi(message: string, products: Product[]): Promise<OrderLine[]> {
  const answer =
    aiProvider() === 'claude'
      ? await askClaude(message, products)
      : await askGemini(message, products)

  const lines: OrderLine[] = []
  for (const line of answer.lines) {
    const qty = Math.max(1, Math.round(line.qty))
    const product = products.find((p) => p.id === line.product_id)

    const already = product && lines.find((l) => l.product_id === product.id)

    if (already) {
      already.qty += qty // the same product twice: add them up
    } else if (product) {
      lines.push({ product_id: product.id, name: product.name, qty, price: product.price })
    } else if (line.name.trim()) {
      lines.push({
        product_id: null,
        name: line.name.trim(),
        qty,
        price: Math.max(0, line.price ?? 0),
      })
    }
  }
  return lines
}
