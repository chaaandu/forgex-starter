# Make it yours: name, colours and words

**Card 4** · Thu 15 Oct · Tools: Cursor, Claude

## The task

Give the app your app's name, your colours and your words.

1. **Claude.** If you haven't yet, fill in the one line in [`frameworks/02-your-solution.md`](../frameworks/02-your-solution.md) from your research. Ask Claude to help you test it, not write it.
2. **Cursor.** Paste the prompt below.
3. **Browser.** Check every screen on `localhost:3000`, at phone width.
4. **Cursor.** Commit and push.

Three places hold it all:

- `lib/config.ts`: the name and tagline, in the header and the browser tab.
- `app/globals.css`: the 7 colours inside `@theme`, each with a note saying where it shows.
- `app/(app)/page.tsx`: the words on the home screen.

## Why it matters

The person you're building for should feel it was made for them, from the first screen.

## Paste this into Cursor

```text
I'm building an app for [who it's for, from frameworks/02-your-solution.md].
1. In lib/config.ts, change name to "[your app's name]" and tagline to
   "[one short line, in words that person would use]".
2. In app/globals.css, change the 7 colours inside @theme to suit
   [the feel you want, like calm and trustworthy, or bright and quick].
   Keep --color-brand-ink readable on --color-brand, and --color-ink readable
   on --color-page (contrast of at least 4.5 to 1).
3. In app/(app)/page.tsx, keep the heading "Your app starts here" for now.
   Change the line under it to one sentence about who this app is for.
Don't touch any other file. Tell me which lines you changed, and why you
picked each colour.
```

## When it works

- The header and the browser tab show your app's name.
- Buttons, links and the selected tab are in your colour.
- Text is easy to read on every screen, on your phone, outdoors.

## If it breaks

**The colours didn't change.** The dev server sometimes misses a CSS change. Press Ctrl+C in the terminal to quit it, run `npm run dev` again, and reload the browser.

**The build fails after the name change.** The name probably has a quote mark in it, like an apostrophe, that ended the text early. In `lib/config.ts`, write the name inside double quotes instead: `name: "[your app's name]"`.

## Commit now

```text
Make it [your app's name]: name, colours and words
```
