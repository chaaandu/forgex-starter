# Card 12 · Phone check, then send

**Fri 23 Oct, before 6 pm IST · Vercel workshop · Stop 2** · Tools: your phone, Cursor, Vercel

## The task

Use every screen on a real phone, through your live link. Fix what breaks. Then send your work before Stop 2, the second checkpoint.

1. **Your phone.** Open your live link in Chrome or Safari. Go through every screen with one thumb:
   - sign in with Google;
   - **Today**;
   - **New order**: copy a message from WhatsApp, paste it, pick items, save;
   - **Orders**: tap through the statuses, use the filter;
   - **Products**: add one, change it, delete it;
   - your own screen from card 5.
2. **Your phone.** Take a screenshot of anything that's cut off, too small to tap, or hidden by the keyboard.
3. **Cursor.** Paste the prompt below with what you found. Push, and check again on the phone.
4. **Vercel.** Open **Deployments** and check the latest one says **Ready** and matches your latest commit.
5. **Before 6 pm IST**, open Stops in the ForgeX portal and send stop 2. Your live link and repo link are already there if you added them to your steps.

## Why it matters

Owners run their shop from a phone, often with one hand busy. If a screen fails there, it fails.

## Paste this into Cursor

```text
I tested every screen of my app on my phone. Here's what went wrong:
[1. On New order, the keyboard covers the Save order button.]
[2. On Orders, a long customer name pushes the price off the screen.]
Fix these in the files that draw those screens.
Rules: tap targets at least 44px tall, text inputs at least 16px so the phone
doesn't zoom in, nothing wider than a 360px screen. Use the classes in
app/globals.css. Fix one problem at a time, and tell me the file and line of
each fix.
```

## When it works

- You can take a real order from start to finish on your phone, with one thumb, in under a minute.
- Nothing is cut off on any screen.
- The team has your live link and your repo link.

## If it breaks

**Google sign-in fails when you open the link from WhatsApp.** WhatsApp and Instagram can open links in their own browser, and Google blocks sign-in there. Tap **⋯** and choose **Open in Chrome** (or Safari). Tell your owner to do the same.

**The phone shows an older version.** Pull down to reload. If it's still old, check Vercel: the latest deploy may have failed, so the last good one is still live.

## Commit now

```text
Phone fixes from the Stop 2 check
```
