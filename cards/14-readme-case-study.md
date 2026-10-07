# Card 14 · Your README case study

**Sun 25 Oct** · Tools: Claude, Cursor, GitHub

## The task

Write the top of your README as a short case study: who it's for, what you found, what you built, and the numbers.

The **README** is the page GitHub shows first when someone opens your repo. Anyone who gets your link reads it before anything else.

1. **You.** Gather your notes: your research, what broke, your card 13 counts, and anything the owner said.
2. **Cursor.** Paste the prompt below with your notes. Check every sentence it writes against your notes.
3. **Your phone.** Take 2–3 screenshots of the app. Put them in `docs/screenshots/` and show them in the README.
4. **GitHub.** After you push, open your repo and read the README as a stranger would.

## Why it matters

A stranger should understand in 2 minutes who it's for, what broke, and whether your app fixed it.

## Paste this into Cursor

```text
Rewrite the top of README.md as a case study, above the setup steps, which stay.
Use only my notes below. Never invent a number, a quote or a finding: where my
notes don't say, write [ADD] so I can fill it in.
Sections, each under 80 words:
## Who it's for: one owner, their shop, where they are.
## What I found: where their day broke, with one detail from my research.
## What I built: what the app does, screen by screen, in the owner's words.
## The numbers: from my card 13 count, as a short list.
## Try it: my live link, [your link].
Plain words, short sentences, and "I" for what I did.
My notes:
[paste your notes]
```

## When it works

- Your repo opens on the case study, with screenshots.
- Every number in it is one you counted.
- Someone who has never met you can say who it's for and one number, after one read.

## If it breaks

**The screenshots show as broken images on GitHub.** The path must match the file exactly, capital letters included: `docs/screenshots/today.png` is not `Today.PNG`. Commit the images too, not only the README.

**The headings show up as ## marks.** A heading needs a space after `##` and must start its own line.

## Commit now

```text
Case study: who it's for, what I found, the numbers
```
