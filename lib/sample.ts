// Sample data for a home baker.
//
// The app uses this file until you connect Supabase (README step 2, card 10).
// Change it freely: rename the products, change the prices, add orders.
// Every screen reads from here while Supabase isn't set up.
//
// Anything you add in the app while on sample data is kept in the server's
// memory only (see the top of lib/data.ts). It goes back to what this file
// says when the server restarts or when you save this file. That is expected.

import type { Order, Product, Shop } from '@/lib/types'
import { startOfTodayInIndia } from '@/lib/format'

export const sampleShop: Shop = {
  id: 'sample-shop',
  name: 'Sample home bakery',
}

export const sampleProducts: Product[] = [
  { id: 'p1', name: 'Chocolate truffle cake', price: 1200, unit: '1 kg' },
  { id: 'p2', name: 'Eggless vanilla cake', price: 450, unit: '500 g' },
  { id: 'p3', name: 'Brownies', price: 360, unit: 'box of 6' },
  { id: 'p4', name: 'Red velvet cupcakes', price: 480, unit: 'box of 6' },
  { id: 'p5', name: 'Choco chip cookies', price: 280, unit: '250 g' },
  { id: 'p6', name: 'Banana walnut loaf', price: 380, unit: '1 loaf' },
]

// A time earlier today in India, a given number of minutes ago.
// It never goes back past midnight, so the sample orders always count as today.
function earlierToday(minutesAgo: number): string {
  const midnight = startOfTodayInIndia().getTime()
  const then = Date.now() - minutesAgo * 60 * 1000
  return new Date(Math.max(then, midnight + 60 * 1000)).toISOString()
}

export const sampleOrders: Order[] = [
  {
    id: 'o1',
    customer_name: 'Priya',
    customer_phone: '98450 12345',
    status: 'new',
    total: 1560,
    created_at: earlierToday(20),
    items: [
      { product_id: 'p1', name: 'Chocolate truffle cake', qty: 1, price: 1200 },
      { product_id: 'p3', name: 'Brownies', qty: 1, price: 360 },
    ],
    raw_text: 'Hi aunty, 1 kg chocolate truffle for Saturday and one box brownies pls',
  },
  {
    id: 'o2',
    customer_name: 'Rahul',
    customer_phone: null,
    status: 'ready',
    total: 960,
    created_at: earlierToday(95),
    items: [{ product_id: 'p4', name: 'Red velvet cupcakes', qty: 2, price: 480 }],
    raw_text: '2 boxes red velvet cupcakes, will pick up at 6',
  },
  {
    id: 'o3',
    customer_name: 'Meera',
    customer_phone: '99001 23456',
    status: 'paid',
    total: 280,
    created_at: new Date(startOfTodayInIndia().getTime() - 3 * 60 * 60 * 1000).toISOString(),
    items: [{ product_id: 'p5', name: 'Choco chip cookies', qty: 1, price: 280 }],
    raw_text: null,
  },
]

// How many lines the owner fixed on each order the AI read.
// The home screen shows the average. 0 means the AI got it right.
export const sampleAiEdits: number[] = [0, 1]
