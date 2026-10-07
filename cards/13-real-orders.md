# Card 13 · Real orders, in the owner's hands

**Sat 24 Oct** · Tools: the owner's phone, Google, Supabase, Cursor

## The task

Give the app to one owner for a few hours of real orders. Watch, don't help, and count what happens.

1. **Cursor.** Before you go, paste the prompt below. It adds the last 7 days to the Today screen, so the numbers are there when you need them.
2. **The owner's phone.** Open your live link in Chrome or Safari. Let them sign in with their own Google account and name their shop.
3. **Supabase.** Their shop starts empty. Run `select id, name from shops;`, copy their shop's id, and run your card 11 products block with it.
4. **The shop.** Sit with them while orders come in. Don't touch the phone unless they're stuck. Count, on paper:
   - orders that came in, and orders that went into the app;
   - seconds per order, for 5 of them;
   - every time they asked you something, and what;
   - anything they said about it, word for word.
5. **Today screen.** At the end, compare its numbers with yours.

## Why it matters

What an owner does with the app, counted, is the strongest evidence you'll have for your case study and demo.

## Paste this into Cursor

```text
Add a Last 7 days section at the bottom of app/page.tsx with one row per day:
- the date, in India time;
- how many orders came in that day;
- that day's total in rupees;
- how many of those orders reached paid.
Load the orders with listOrdersSince in lib/data.ts, starting 6 days before
startOfTodayInIndia() from lib/format.ts. Show it as a plain table that fits
a phone 360px wide. Don't add packages.
```

## When it works

- The owner took real orders in the app without you.
- You have numbers like these: *18 orders came in over 3 hours, 14 went into the app, about 40 seconds each.*
- **Last 7 days** on the Today screen agrees with your paper count.

## If it breaks

**The owner signs in and sees no products.** They have their own shop now, and it's empty. Run your card 11 products block with their shop id, then reload.

**Google says access is blocked for the owner's account.** Your Google app is still in testing. In Google Cloud Console, open **Google Auth Platform**, then **Audience**, and click **Publish app**.

## Commit now

```text
Last 7 days on the Today screen
```
