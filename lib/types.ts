// The shapes of the data the app works with.
// They match the tables in supabase/migrations/0001_init.sql.

export type Shop = {
  id: string
  name: string
}

export type Product = {
  id: string
  name: string
  price: number
  unit: string
}

// The four steps an order goes through, in order.
export const STATUSES = ['new', 'ready', 'delivered', 'paid'] as const
export type Status = (typeof STATUSES)[number]

// One line of an order: what, how many, at what price.
// product_id is empty when the item isn't in your product list.
export type OrderLine = {
  product_id: string | null
  name: string
  qty: number
  price: number
}

export type Order = {
  id: string
  customer_name: string | null
  customer_phone: string | null
  status: Status
  total: number
  created_at: string
  items: OrderLine[]
  // The WhatsApp message the order came from, if there was one.
  raw_text: string | null
}
