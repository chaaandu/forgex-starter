# Card 9 · Today's orders, and who still owes

**Tue 20 Oct** · Tools: Cursor, Claude

## The task

The Today screen already shows today's orders and today's total. Add the number your owner can't answer at the end of the day: how much is still to collect.

On this screen, today means since midnight in India, worked out in `startOfTodayInIndia()` in `lib/format.ts`. A server can sit in any time zone, so the app never trusts its clock to know when an Indian day starts.

1. **Cursor.** Paste the prompt below.
2. **Browser.** On **Orders**, mark one of today's orders **paid**. Go back to **Today**. The amount to collect should drop by that order's total.
3. **Claude.** Paste the list of today's sample orders and ask Claude to add up the unpaid ones. Check it matches the screen.

## Why it matters

The challenge names it: at the end of the day, the owner can't say what sold or who owes them.

## Paste this into Cursor

```text
On the Today screen, app/page.tsx, add a third box under the two at the top:
Still to collect: the total of today's orders whose status is not paid, and
how many orders that is.
In the list of today's orders, make the unpaid ones easy to spot.
Work it out from the orders the page already loads. Don't change lib/data.ts.
It must read well on a phone 360px wide.
```

## When it works

- Today shows 3 numbers: orders, total, and still to collect.
- Marking an order paid lowers the amount to collect.
- Your sum from Claude matches the screen.

## If it breaks

**The amount looks huge, like ₹1,2001,560.** The totals were joined as text instead of added as numbers. Ask Cursor to add them with `Number(order.total)`.

**Last night's order counts as today, or today's is missing.** The code worked out today from the laptop's clock. It must start from `startOfTodayInIndia()` in `lib/format.ts`, never from `new Date()` alone.

## Commit now

```text
Today shows what's still to collect
```
