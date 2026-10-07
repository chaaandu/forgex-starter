// Counts how many lines the owner changed after the AI read a message.
// This is your accuracy signal: 0 means the AI got the order exactly right.
//
// A line counts once if it was:
//   changed: same item, different quantity or price;
//   added:   the owner added an item the AI missed;
//   removed: the owner took out an item the AI got wrong.

import type { OrderLine } from '@/lib/types'

// Two lines are the same item if they share a product, or else the same name.
function keyFor(line: OrderLine): string {
  return line.product_id ?? `name:${line.name.trim().toLowerCase()}`
}

export function countEdits(aiLines: OrderLine[], confirmedLines: OrderLine[]): number {
  const fromAi = new Map(aiLines.map((line) => [keyFor(line), line]))
  const confirmed = new Map(confirmedLines.map((line) => [keyFor(line), line]))
  let edits = 0

  for (const [key, aiLine] of fromAi) {
    const kept = confirmed.get(key)
    if (!kept)
      edits += 1 // removed
    else if (kept.qty !== aiLine.qty || kept.price !== aiLine.price) edits += 1 // changed
  }
  for (const key of confirmed.keys()) {
    if (!fromAi.has(key)) edits += 1 // added
  }
  return edits
}
