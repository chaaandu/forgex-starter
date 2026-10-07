// Every read and write the app makes, in one file.
//
// Each function does one of two things:
//   - before Supabase is connected, it uses the sample data in lib/sample.ts;
//   - after, it asks Supabase.
// So the screens look the same either way, and you can build them on sample
// data first.
//
// Every Supabase query also filters by shop_id. The row-level security rules
// in supabase/migrations/0001_init.sql make sure of it a second time.

import { supabaseIsSet } from '@/lib/env'
import { createClient } from '@/lib/supabase/server'
import { sampleAiEdits, sampleOrders, sampleProducts, sampleShop } from '@/lib/sample'
import type { Order, OrderLine, Product, Status } from '@/lib/types'

// ---------- Sample data, until Supabase is connected ----------

// Next.js can load a file more than once while it runs, and each copy would
// keep its own lists. So the sample lists live in one shared place for the
// whole server (globalThis). They start again from lib/sample.ts when you
// change that file, or when the server restarts.
type SampleStore = { from: string; products: Product[]; orders: Order[]; aiEdits: number[] }
const shared = globalThis as typeof globalThis & { sampleStore?: SampleStore }

function sample(): SampleStore {
  // What lib/sample.ts holds right now. Order times are left out, because
  // they're worked out fresh each time the file loads.
  const from = JSON.stringify([
    sampleShop,
    sampleProducts,
    sampleOrders.map((order) => ({ ...order, created_at: '' })),
    sampleAiEdits,
  ])
  if (shared.sampleStore?.from !== from) {
    shared.sampleStore = {
      from,
      products: structuredClone(sampleProducts),
      orders: structuredClone(sampleOrders),
      aiEdits: [...sampleAiEdits],
    }
  }
  return shared.sampleStore
}

// ---------- Products ----------

export async function listProducts(shopId: string): Promise<Product[]> {
  if (!supabaseIsSet()) {
    return [...sample().products].sort((a, b) => a.name.localeCompare(b.name))
  }

  const supabase = await createClient()
  const { data, error } = await supabase
    .from('products')
    .select('id, name, price, unit')
    .eq('shop_id', shopId)
    .order('name')
  if (error) throw new Error(`Could not load products: ${error.message}`)

  return (data as Product[]).map((p) => ({ ...p, price: Number(p.price) }))
}

type ProductInput = { name: string; price: number; unit: string }

export async function addProduct(shopId: string, product: ProductInput): Promise<void> {
  if (!supabaseIsSet()) {
    sample().products.push({ id: crypto.randomUUID(), ...product })
    return
  }

  const supabase = await createClient()
  const { error } = await supabase.from('products').insert({ shop_id: shopId, ...product })
  if (error) throw new Error(`Could not add the product: ${error.message}`)
}

export async function updateProduct(
  shopId: string,
  productId: string,
  product: ProductInput,
): Promise<void> {
  if (!supabaseIsSet()) {
    const found = sample().products.find((p) => p.id === productId)
    if (found) Object.assign(found, product)
    return
  }

  const supabase = await createClient()
  const { error } = await supabase
    .from('products')
    .update(product)
    .eq('id', productId)
    .eq('shop_id', shopId)
  if (error) throw new Error(`Could not save the product: ${error.message}`)
}

export async function deleteProduct(shopId: string, productId: string): Promise<void> {
  if (!supabaseIsSet()) {
    const products = sample().products
    const index = products.findIndex((p) => p.id === productId)
    if (index >= 0) products.splice(index, 1)
    return
  }

  const supabase = await createClient()
  const { error } = await supabase
    .from('products')
    .delete()
    .eq('id', productId)
    .eq('shop_id', shopId)
  if (error) throw new Error(`Could not delete the product: ${error.message}`)
}

// ---------- Orders ----------

// The columns we read for an order, with its items and its message.
const ORDER_COLUMNS =
  'id, customer_name, customer_phone, status, total, created_at, order_items(product_id, name, qty, price), messages(raw_text)'

// What a row looks like when it comes back from Supabase.
type OrderRow = {
  id: string
  customer_name: string | null
  customer_phone: string | null
  status: Status
  total: number
  created_at: string
  order_items: OrderLine[]
  messages: { raw_text: string } | null
}

function toOrder(row: OrderRow): Order {
  return {
    id: row.id,
    customer_name: row.customer_name,
    customer_phone: row.customer_phone,
    status: row.status,
    total: Number(row.total),
    created_at: row.created_at,
    items: row.order_items.map((item) => ({ ...item, price: Number(item.price) })),
    raw_text: row.messages?.raw_text ?? null,
  }
}

// The latest 100 orders, newest first. Pass a status to see only those.
export async function listOrders(shopId: string, status?: Status): Promise<Order[]> {
  if (!supabaseIsSet()) {
    return sample()
      .orders.filter((o) => !status || o.status === status)
      .sort((a, b) => b.created_at.localeCompare(a.created_at))
  }

  const supabase = await createClient()
  let query = supabase
    .from('orders')
    .select(ORDER_COLUMNS)
    .eq('shop_id', shopId)
    .order('created_at', { ascending: false })
    .limit(100)
  if (status) query = query.eq('status', status)

  const { data, error } = await query
  if (error) throw new Error(`Could not load orders: ${error.message}`)
  return (data as unknown as OrderRow[]).map(toOrder)
}

// Orders placed since a moment in time, newest first. Home uses it for today.
export async function listOrdersSince(shopId: string, since: Date): Promise<Order[]> {
  if (!supabaseIsSet()) {
    return sample()
      .orders.filter((o) => new Date(o.created_at) >= since)
      .sort((a, b) => b.created_at.localeCompare(a.created_at))
  }

  const supabase = await createClient()
  const { data, error } = await supabase
    .from('orders')
    .select(ORDER_COLUMNS)
    .eq('shop_id', shopId)
    .gte('created_at', since.toISOString())
    .order('created_at', { ascending: false })
  if (error) throw new Error(`Could not load today's orders: ${error.message}`)
  return (data as unknown as OrderRow[]).map(toOrder)
}

export async function setOrderStatus(
  shopId: string,
  orderId: string,
  status: Status,
): Promise<void> {
  if (!supabaseIsSet()) {
    const found = sample().orders.find((o) => o.id === orderId)
    if (found) found.status = status
    return
  }

  const supabase = await createClient()
  const { error } = await supabase
    .from('orders')
    .update({ status })
    .eq('id', orderId)
    .eq('shop_id', shopId)
  if (error) throw new Error(`Could not change the status: ${error.message}`)
}

type NewOrder = {
  message: string // the WhatsApp message, or '' if there wasn't one
  aiLines: OrderLine[] | null // what the AI read, or null if AI wasn't used
  lines: OrderLine[] // what the owner confirmed
  edits: number // how many lines the owner changed after the AI
  customerName: string | null
  customerPhone: string | null
  total: number
}

// Saves the message, then the order, then its items.
export async function saveOrder(shopId: string, order: NewOrder): Promise<void> {
  if (!supabaseIsSet()) {
    sample().orders.push({
      id: crypto.randomUUID(),
      customer_name: order.customerName,
      customer_phone: order.customerPhone,
      status: 'new',
      total: order.total,
      created_at: new Date().toISOString(),
      items: order.lines,
      raw_text: order.message || null,
    })
    if (order.aiLines && order.message) sample().aiEdits.push(order.edits)
    return
  }

  const supabase = await createClient()

  // 1. The raw message, kept exactly as it came in.
  let messageId: string | null = null
  if (order.message) {
    const { data, error } = await supabase
      .from('messages')
      .insert({
        shop_id: shopId,
        raw_text: order.message,
        ai_lines: order.aiLines,
        confirmed_lines: order.lines,
        edits: order.edits,
      })
      .select('id')
      .single()
    if (error) throw new Error(`Could not save the message: ${error.message}`)
    messageId = (data as { id: string }).id
  }

  // 2. The order itself, linked to the message.
  const { data: saved, error: orderError } = await supabase
    .from('orders')
    .insert({
      shop_id: shopId,
      customer_name: order.customerName,
      customer_phone: order.customerPhone,
      total: order.total,
      message_id: messageId,
    })
    .select('id')
    .single()
  if (orderError) {
    if (messageId) await supabase.from('messages').delete().eq('id', messageId)
    throw new Error(`Could not save the order: ${orderError.message}`)
  }
  const orderId = (saved as { id: string }).id

  // 3. One row per item.
  const { error: itemsError } = await supabase
    .from('order_items')
    .insert(order.lines.map((line) => ({ order_id: orderId, ...line })))
  if (itemsError) {
    // Don't leave half an order behind. Deleting the order deletes its items too.
    await supabase.from('orders').delete().eq('id', orderId)
    throw new Error(`Could not save the order's items: ${itemsError.message}`)
  }
}

// ---------- AI accuracy ----------

// How many orders the AI read, and how many lines the owner fixed on average.
export async function aiEditsSummary(
  shopId: string,
): Promise<{ aiOrders: number; averageEdits: number }> {
  let edits: number[]

  if (!supabaseIsSet()) {
    edits = sample().aiEdits
  } else {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('messages')
      .select('edits')
      .eq('shop_id', shopId)
      .not('ai_lines', 'is', null)
    if (error) throw new Error(`Could not load AI results: ${error.message}`)
    edits = (data as { edits: number }[]).map((row) => row.edits)
  }

  const total = edits.reduce((sum, n) => sum + n, 0)
  return {
    aiOrders: edits.length,
    averageEdits: edits.length ? total / edits.length : 0,
  }
}
