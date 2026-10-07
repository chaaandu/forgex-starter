'use server'

// Saves a new order: the WhatsApp message, the order and its items.

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { z } from 'zod'
import { listProducts, saveOrder } from '@/lib/data'
import { countEdits } from '@/lib/edits'
import { getMyShop } from '@/lib/shop'
import type { OrderLine } from '@/lib/types'

// What one order line must look like.
const Line = z.object({
  product_id: z.string().min(1).max(64).nullable(),
  name: z.string().trim().min(1).max(80),
  qty: z.number().int().min(1).max(999),
  price: z.number().min(0).max(10000000),
})

// What the New order screen sends.
const NewOrder = z.object({
  message: z.string().trim().max(4000),
  lines: z.array(Line).min(1).max(100),
  aiLines: z.array(Line).max(100).nullable(), // null when AI wasn't used
  customerName: z.string().trim().max(80),
  customerPhone: z.string().trim().max(20),
})

export async function createOrderAction(input: z.input<typeof NewOrder>) {
  const shop = await getMyShop()
  const order = NewOrder.parse(input)

  // Names and prices of your products come from your list, not from the browser.
  const products = await listProducts(shop.id)
  const lines: OrderLine[] = []
  for (const line of order.lines) {
    if (line.product_id === null) {
      lines.push(line) // an item that isn't in your products
      continue
    }
    const product = products.find((p) => p.id === line.product_id)
    if (!product)
      return { error: 'One of those products has been deleted. Check the list and try again.' }
    lines.push({ product_id: product.id, name: product.name, qty: line.qty, price: product.price })
  }

  const total = lines.reduce((sum, line) => sum + line.qty * line.price, 0)

  await saveOrder(shop.id, {
    message: order.message,
    aiLines: order.aiLines,
    lines,
    // How many lines you changed after the AI read the message.
    edits: order.aiLines ? countEdits(order.aiLines, lines) : 0,
    customerName: order.customerName || null,
    customerPhone: order.customerPhone || null,
    total: Math.round(total * 100) / 100,
  })

  revalidatePath('/')
  revalidatePath('/orders')
  redirect('/orders')
}
