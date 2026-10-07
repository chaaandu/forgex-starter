# Check every screen on your phone

**Card 12** · Fri 23 Oct, before 6 pm IST · Vercel session · **Phase 2 due** · Tools: your phone, Cursor, Vercel

## The task

Do your whole core flow on your phone, fix what doesn't fit, and send phase 2 before 6 pm IST.

1. **Your phone.** Open your live link. Sign in. Do your whole core flow with one thumb. Write down every place you zoom, scroll sideways, miss a button or squint.
2. **Cursor.** Paste the prompt below. It follows [`prompts/make-it-work-on-a-phone.md`](../prompts/make-it-work-on-a-phone.md).
3. **Cursor.** Commit and push. Do step 1 again on the new deploy.
4. **Before 6 pm IST**, check:
   - your core flow works end to end on your live link, signed in, on a phone;
   - what you save is still there after you sign out and back in;
   - a second Google account can't see your rows;
   - your latest commit is from today.
5. **ForgeX portal.** Open **Phases** and send phase 2.

## Why it matters

The people you're building for will only ever see your app on a phone. If it fails there, it fails.

## Paste this into Cursor

```text
Follow prompts/make-it-work-on-a-phone.md.
My screens are: [list the folders under app/(app)/].
On my phone, I saw:
- [screen]: [what's wrong]
- [screen]: [what's wrong]
- [screen]: [what's wrong]
Fix only how things fit, not what they do. List what you changed, screen by screen.
```

## When it works

- You can do the whole flow on your phone, with one thumb, without zooming.
- Nothing scrolls sideways, and every button is easy to hit.
- Phase 2 shows as sent in the portal.

## If it breaks

**The page is wider than the phone, and scrolls sideways.** Something has a fixed width, or a long word that won't wrap. Ask Cursor to find any `w-[...]` or fixed width in that screen, and to add `min-w-0` and `truncate` or `break-words` to long text.

**The phone zooms in when you tap a text box.** The text box is smaller than 16px. Give it the `field` class from `app/globals.css`, or use the `Field` component.

## Commit now

```text
Make every screen work on a phone
```
