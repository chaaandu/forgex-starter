# Card 4 · Your shop's name and colours

**Thu 15 Oct** · Tools: Claude, Cursor, Vercel

## The task

Give the app your shop's name and colours. Two files hold everything:

- `lib/config.ts`, lines 7 and 8: the app's name and tagline.
- `app/globals.css`, lines 12 to 18: the 7 colours, inside the block that starts `@theme`. Each line has a note saying where that colour shows.

A colour is written as a **hex code**: a `#` and 6 letters or digits, like `#2f5d50`.

1. **Claude.** If the shop has a signboard, bag or logo, take a photo. Ask Claude for 7 hex codes that match it: a brand colour, text on it, page, card, main text, quiet text, borders.
2. **Cursor.** Paste the prompt below, with your shop and colours filled in.
3. **Browser.** Check every screen on `localhost:3000`.
4. **Cursor.** Commit and push. **Vercel** deploys it, and your live link updates in about a minute.

## Why it matters

An owner trusts a tool that looks like their shop. A stranger's colours make it feel like someone else's.

## Paste this into Cursor

```text
I'm building an order app for [a home baker in Pune called Asha's Bakes].
1. In lib/config.ts, change name to [Asha's Bakes] and the tagline to one short
   line this owner would say about the app.
2. In app/globals.css, change the 7 colours inside @theme to [these hex codes /
   colours that suit this shop]. Keep --color-brand-ink readable on
   --color-brand, and --color-ink readable on --color-page: a contrast of at
   least 4.5 to 1.
Don't touch any other file. Tell me which lines you changed.
```

## When it works

- The header and the browser tab show your shop's name.
- Buttons, the selected tab and links are in your brand colour.
- Text is easy to read on every screen, on your phone too.

## If it breaks

**The name has an apostrophe, and now the app shows Unexpected token.** In `lib/config.ts`, `'Asha's Bakes'` ends the text at the apostrophe. Use double quotes around it instead: `"Asha's Bakes"`.

**The colours didn't change.** Check the hex code has a `#` and 6 characters, and the line still ends in `;`. The line must stay inside the `@theme { }` block. Save the file and reload.

## Commit now

```text
Make it Asha's Bakes: name and colours
```
