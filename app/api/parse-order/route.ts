// POST /api/parse-order
// Reads a WhatsApp message with AI and returns order lines as JSON.
//
// Send:    { "message": "2 boxes brownies and 1 kg truffle cake" }
// Get:     { "lines": [{ "product_id": "...", "name": "Brownies", "qty": 2, "price": 360 }] }
// AI off:  status 503, { "error": "ai_off", "message": "..." }
//
// The product list comes from the signed-in owner's shop, not from the request,
// so nobody can make the AI read against someone else's products.

import { NextResponse } from 'next/server'
import { z } from 'zod'
import { readOrderWithAi } from '@/lib/ai'
import { aiIsOn, aiProvider, supabaseIsSet } from '@/lib/env'
import { listProducts } from '@/lib/data'
import { createClient } from '@/lib/supabase/server'
import { sampleShop } from '@/lib/sample'

const Body = z.object({
  message: z.string().trim().min(1).max(2000),
})

export async function POST(request: Request) {
  // 1. Is AI on?
  if (!aiIsOn()) {
    const key = aiProvider() === 'claude' ? 'ANTHROPIC_API_KEY' : 'GEMINI_API_KEY'
    return NextResponse.json(
      { error: 'ai_off', message: `AI is off. Set ${key} to turn it on. See the README.` },
      { status: 503 },
    )
  }

  // 2. Whose shop is this for? On sample data, the sample shop.
  let shopId = sampleShop.id
  if (supabaseIsSet()) {
    const supabase = await createClient()
    const { data: userData } = await supabase.auth.getUser()
    if (!userData.user) {
      return NextResponse.json(
        { error: 'signed_out', message: 'Sign in again, then retry.' },
        { status: 401 },
      )
    }
    const { data: shop } = await supabase
      .from('shops')
      .select('id')
      .eq('owner_id', userData.user.id)
      .maybeSingle()
    if (!shop) {
      return NextResponse.json(
        { error: 'no_shop', message: 'Create your shop first.' },
        { status: 400 },
      )
    }
    shopId = (shop as { id: string }).id
  }

  // 3. Check the request with Zod.
  const parsed = Body.safeParse(await request.json().catch(() => null))
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'bad_message', message: 'Paste a message of up to 2,000 characters first.' },
      { status: 400 },
    )
  }

  // 4. Ask the AI, with your product list.
  try {
    const products = await listProducts(shopId)
    const lines = await readOrderWithAi(parsed.data.message, products)
    return NextResponse.json({ lines })
  } catch (error) {
    console.error('AI could not read the message:', error)
    return NextResponse.json(
      {
        error: 'ai_failed',
        message:
          'AI could not read that. Your message is still here. Pick the items yourself below.',
      },
      { status: 502 },
    )
  }
}
