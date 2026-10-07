# Card 11 · Real data from one owner

**Thu 22 Oct** · Tools: Claude, Cursor, Supabase

## The task

Put one real owner's products in the database, enter a day of their real orders, and check the app agrees with their notebook.

1. **Claude.** Give Claude the photo of the owner's price list from card 6, or a new one. Ask for each product's name, price in rupees and unit.
2. **Cursor.** Paste the first prompt below. It adds your owner's products to `supabase/seed.sql`, a file of ready-made products.
3. **Supabase.** Open **SQL Editor** and run `select id, name from shops;`. Copy your shop's **id**, the long code that names it.
4. **Supabase.** Paste your new block from `seed.sql`. Replace `PASTE-YOUR-SHOP-ID-HERE` with your id, keeping the quotes. Click **Run**.
5. **Browser.** Enter one day of the owner's real orders, with their permission.
6. **You.** Add up the same day in the owner's notebook. Compare it with **Total today**.

## Why it matters

Sample data can't show you where the app is wrong. One owner's real day can.

## Paste this into Cursor

```text
Add a new block at the end of supabase/seed.sql for [Sharma General Store],
in exactly the same format as the kirana block: an insert into products with
'PASTE-YOUR-SHOP-ID-HERE'::uuid and a values list of (name, price, unit).
Here are the owner's real products:
[paste the list from Claude]
Prices are plain numbers in rupees. Don't change the other blocks.
```

**Did your card 5 screen use its own sample data?** It still reads `lib/sample.ts`. Move it to the database with this second prompt:

```text
My screen app/pickups/page.tsx reads samplePickups from lib/sample.ts.
Move it to Supabase, the same way products work:
1. Write supabase/migrations/0002_pickups.sql: a table with a shop_id that
   references shops, row-level security on, and the same 4 policies as the
   products table in 0001_init.sql, with comments in plain words.
2. In lib/data.ts, add list and add functions for it that use the sample data
   when Supabase isn't set, the same way listProducts and addProduct do.
3. Make the page use them.
Then tell me what to paste into the Supabase SQL Editor.
```

## When it works

- **Products** shows the owner's real list and prices.
- **Orders** holds a day of their real orders.
- **Total today** matches the notebook. If it doesn't, you've found something to ask the owner about.

## If it breaks

**Supabase says invalid input syntax for type uuid.** The placeholder is still there, or the quotes went missing. It should read like `'3f6c1a2e-8b1d-4c7a-9e0f-1234567890ab'::uuid`.

**Every product shows up twice.** The block ran twice. Run the `delete from products` line at the top of `seed.sql` with your shop id, then run your block once.

## Commit now

```text
Real products for Sharma General Store
```
