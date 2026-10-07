'use client'

// The New order screen, step by step:
//   1. Paste or type the WhatsApp message.
//   2. Optional: tap "Read with AI" to fill in the items for you.
//   3. Pick products and quantities with the plus and minus buttons.
//   4. Add the customer's name and phone if you have them, then save.

import Link from 'next/link'
import { useState, useTransition } from 'react'
import { rupees } from '@/lib/format'
import type { OrderLine, Product } from '@/lib/types'
import { createOrderAction } from './actions'

export default function NewOrderForm({ products, aiOn }: { products: Product[]; aiOn: boolean }) {
  const [message, setMessage] = useState('')
  // How many of each product, by product id. Missing means 0.
  const [qty, setQty] = useState<Record<string, number>>({})
  // Items the AI found that aren't in your products.
  const [extras, setExtras] = useState<OrderLine[]>([])
  // Exactly what the AI said, kept so we can count your changes.
  const [aiLines, setAiLines] = useState<OrderLine[] | null>(null)
  const [customerName, setCustomerName] = useState('')
  const [customerPhone, setCustomerPhone] = useState('')
  const [reading, setReading] = useState(false)
  const [note, setNote] = useState<string | null>(null)
  const [saving, startSaving] = useTransition()

  // The order as it stands: every product with a quantity, then the extras.
  const lines: OrderLine[] = [
    ...products
      .filter((p) => (qty[p.id] ?? 0) > 0)
      .map((p) => ({ product_id: p.id, name: p.name, qty: qty[p.id] ?? 0, price: p.price })),
    ...extras.filter((line) => line.qty > 0),
  ]
  const total = lines.reduce((sum, line) => sum + line.qty * line.price, 0)

  function changeQty(productId: string, change: number) {
    setQty((current) => ({
      ...current,
      [productId]: Math.max(0, (current[productId] ?? 0) + change),
    }))
  }

  function changeExtra(index: number, change: number) {
    setExtras((current) =>
      current.map((line, i) =>
        i === index ? { ...line, qty: Math.max(0, line.qty + change) } : line,
      ),
    )
  }

  // Sends the message to /api/parse-order and fills in what comes back.
  async function readWithAi() {
    setReading(true)
    setNote(null)
    try {
      const response = await fetch('/api/parse-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message }),
      })
      const body = (await response.json()) as { lines?: OrderLine[]; message?: string }
      if (!response.ok || !body.lines) {
        setNote(body.message ?? 'AI could not read that. Pick the items yourself below.')
        return
      }

      const fromAi = body.lines
      const nextQty: Record<string, number> = {}
      for (const line of fromAi) {
        if (line.product_id) nextQty[line.product_id] = line.qty
      }
      setQty(nextQty)
      setExtras(fromAi.filter((line) => line.product_id === null))
      setAiLines(fromAi)
      setNote(
        fromAi.length
          ? 'AI filled in the items. Check them before you save.'
          : 'AI found no items in that message. Pick them yourself below.',
      )
    } catch {
      setNote('AI could not be reached. Your message is still here. Pick the items yourself below.')
    } finally {
      setReading(false)
    }
  }

  function save() {
    setNote(null)
    startSaving(async () => {
      try {
        const result = await createOrderAction({
          message,
          lines,
          aiLines,
          customerName,
          customerPhone,
        })
        if (result?.error) setNote(result.error)
      } catch {
        setNote("That didn't save. Your order is still here. Try again in a moment.")
      }
    })
  }

  return (
    <div className="space-y-5">
      {/* 1. The message */}
      <div>
        <label className="label" htmlFor="message">
          WhatsApp message
        </label>
        <textarea
          id="message"
          className="field min-h-28"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Hi, 2 boxes of brownies for tomorrow evening pls"
          maxLength={4000}
        />
        {/* 2. AI, only if a key is set */}
        {aiOn && (
          <button
            type="button"
            className="btn-quiet mt-2 w-full"
            onClick={readWithAi}
            disabled={reading || !message.trim()}
          >
            {reading ? 'Reading…' : 'Read with AI'}
          </button>
        )}
      </div>

      {note && (
        <p className="rounded-lg bg-card p-3 text-sm" role="status">
          {note}
        </p>
      )}

      {/* 3. What they ordered */}
      <div>
        <p className="label">What they ordered</p>
        {products.length === 0 && extras.length === 0 ? (
          <p className="text-muted">
            Add your products first, on the{' '}
            <Link className="text-brand underline" href="/products">
              Products
            </Link>{' '}
            tab.
          </p>
        ) : (
          <ul className="box divide-y divide-line">
            {products.map((product) => (
              <QtyRow
                key={product.id}
                name={product.name}
                detail={`${product.unit} · ${rupees(product.price)}`}
                qty={qty[product.id] ?? 0}
                onMinus={() => changeQty(product.id, -1)}
                onPlus={() => changeQty(product.id, 1)}
              />
            ))}
            {extras.map((line, index) => (
              <QtyRow
                key={`extra-${index}`}
                name={line.name}
                detail={`Not in your products · ${rupees(line.price)}`}
                qty={line.qty}
                onMinus={() => changeExtra(index, -1)}
                onPlus={() => changeExtra(index, 1)}
              />
            ))}
          </ul>
        )}
      </div>

      {/* 4. Who it's for */}
      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <label className="label" htmlFor="customer-name">
            Customer name (optional)
          </label>
          <input
            id="customer-name"
            className="field"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            placeholder="Priya"
            maxLength={80}
          />
        </div>
        <div>
          <label className="label" htmlFor="customer-phone">
            Phone (optional)
          </label>
          <input
            id="customer-phone"
            className="field"
            type="tel"
            inputMode="tel"
            value={customerPhone}
            onChange={(e) => setCustomerPhone(e.target.value)}
            placeholder="98450 12345"
            maxLength={20}
          />
        </div>
      </div>

      <div className="flex items-center justify-between">
        <span className="text-muted">Total</span>
        <span className="text-xl font-semibold">{rupees(total)}</span>
      </div>

      <button className="btn w-full" onClick={save} disabled={saving || lines.length === 0}>
        {saving ? 'Saving…' : 'Save order'}
      </button>
    </div>
  )
}

// One row with a name, a minus button, the quantity and a plus button.
function QtyRow(props: {
  name: string
  detail: string
  qty: number
  onMinus: () => void
  onPlus: () => void
}) {
  return (
    <li className="flex items-center justify-between gap-3 p-3">
      <div className="min-w-0">
        <p className="truncate font-medium">{props.name}</p>
        <p className="text-sm text-muted">{props.detail}</p>
      </div>
      <div className="flex shrink-0 items-center gap-2">
        <button
          type="button"
          className="btn-quiet w-11 px-0 text-lg"
          onClick={props.onMinus}
          disabled={props.qty === 0}
          aria-label={`One less ${props.name}`}
        >
          −
        </button>
        <span className="w-6 text-center font-semibold" aria-live="polite">
          {props.qty}
        </span>
        <button
          type="button"
          className="btn-quiet w-11 px-0 text-lg"
          onClick={props.onPlus}
          aria-label={`One more ${props.name}`}
        >
          +
        </button>
      </div>
    </li>
  )
}
