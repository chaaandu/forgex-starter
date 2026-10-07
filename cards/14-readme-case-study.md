# Write the README case study

**Card 14** · Sun 25 Oct · Tools: Cursor, Claude, GitHub

## The task

Turn your README into the case study of your app: who it's for, what you found, what you built, and what happened when a real owner used it.

1. **Your frameworks.** Read [`frameworks/07-case-study.md`](../frameworks/07-case-study.md). It is the template.
2. **Your phone.** Take 2 or 3 screenshots of your flow, on your live link. Save them in `docs/screenshots/`.
3. **Cursor.** Paste the prompt below. It follows [`prompts/write-my-readme.md`](../prompts/write-my-readme.md) and moves the setup steps into `SETUP.md`.
4. **You.** Read the draft aloud. Fill every bracket left. Cut every sentence that isn't true or doesn't help.
5. **GitHub.** Commit and push, then open your repo on GitHub and read it as a stranger would.

## Why it matters

Your README is what anyone sees first when they open your work, long after the sprint. It should stand on its own.

## Paste this into Cursor

```text
Follow prompts/write-my-readme.md, using frameworks/07-case-study.md.
My research, in short: [the owners, the regulars, the moment, the quotes].
My owner's day with the app: [what they did, the numbers, what they said,
what broke, and what you changed].
My live link: [ ] · My Loom link: [add it on card 15]
My screenshots are in docs/screenshots/: [file names].
Never make up a number, a quote or a result. Leave a [bracket] where I gave you nothing.
```

## When it works

- Your README opens with your app's name, its one line and your live link.
- Every quote and number in it is real, and you can say where it came from.
- `SETUP.md` holds the setup steps, and the README links to it.

## If it breaks

**The screenshots don't show on GitHub.** The path in the README doesn't match the file. Paths are case-sensitive: `docs/screenshots/Home.png` and `docs/screenshots/home.png` are different files.

**The README is long, and nobody will read it.** Cut each section to its first 2 sentences, then add back only what someone would miss.

## Commit now

```text
Write the case study
```
