# Card 6 · Products that fit your business

**Sat 17 Oct** · Tools: Claude, Cursor

## The task

Swap the sample bakery products for the real products of the business you chose.

The app still runs on **sample data**: made-up rows kept in the file `lib/sample.ts`, until card 10 connects the database. Change them there.

1. **Your phone.** Get the real list: a photo of the price list, the menu, the rate card, or the shelf.
2. **Claude.** Give Claude the photo and ask for a list of 8 products, each with a name, a price in rupees and a unit (like `1 kg`, `box of 6` or `strip of 15`).
3. **Cursor.** Paste the prompt below, with your list.
4. **Browser.** Check **Products**, **New order** and **Orders** on `localhost:3000`.

## Why it matters

An owner judges the app in the first 5 seconds, by whether they recognise their own products.

## Paste this into Cursor

```text
Change the sample data in lib/sample.ts to fit [a kirana in Jayanagar, Bengaluru].
- Replace sampleProducts with these products, keeping the same shape: id, name,
  price as a plain number in rupees, unit. Use the ids p1, p2, p3 and so on.
  [paste the list from Claude]
- Change sampleShop.name to [Sharma General Store].
- Rewrite sampleOrders so every item is one of the new products, with realistic
  customer names and WhatsApp messages for this kind of shop. Keep each
  order's total equal to the sum of qty × price.
Only change lib/sample.ts.
```

## When it works

- **Products** lists your owner's products and prices.
- **New order** shows the same products, with plus and minus buttons.
- **Orders** shows sample orders that sound like this shop's customers.
- You didn't need to restart anything: the app picks up changes to `lib/sample.ts` when you save it.

## If it breaks

**Cursor's file shows red lines, or the app says a product is missing a property.** Every product needs `id`, `name`, `price` and `unit`. The price is a plain number: `1200`, not `'₹1,200'`.

**Today's total doesn't add up.** Some sample orders still use old products or old prices. Ask Cursor: *Check every order in sampleOrders against sampleProducts, and fix the items and totals.*

## Commit now

```text
Sample products for a kirana
```
