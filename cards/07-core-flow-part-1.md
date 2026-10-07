# Build your core flow, part 1

**Card 7** · Sun 18 Oct · Tools: Cursor

## The task

Build the screens for the first half of your core flow: from the trigger to the step where something is saved.

1. **Your frameworks.** Open [`frameworks/03-flows.md`](../frameworks/03-flows.md). Mark the steps for today: the first half, up to the first save.
2. **Cursor.** Paste the prompt below, once per screen. It follows [`prompts/build-a-screen.md`](../prompts/build-a-screen.md).
3. **Browser.** Do the steps yourself, in sample mode, at phone width. Each screen should lead to the next.
4. **Cursor.** Commit and push after each screen works.

Building more than one flow? Do this card and card 8 for each, starting with the one the others depend on.

## Why it matters

A flow is only useful if someone can go from start to finish. Today you build the start, and save the first real thing.

## Paste this into Cursor

```text
My core flow, from frameworks/03-flows.md, is:
[paste the whole flow: who, trigger, steps, end state].
Today I'm building steps [1 to 2] of it.

The screen for step [number] is [screen name], at app/(app)/[your-screen]/.
It shows [what's on it] and saves [what it saves] to [your_table].
When the person is done here, they go to [the next screen, or stay].

Follow prompts/build-a-screen.md. If the folder exists from card 5, change it
instead of copying again. Keep sample mode working: use lib/data/[your-table].ts.
After saving, send the person to the next screen with redirect() in
actions.ts, the way updateItemAction does in app/(app)/example/actions.ts.
Then tell me how to test the steps by hand, one tap at a time.
```

## When it works

- You can do the first half of your flow on `localhost:3000`, tap by tap.
- What you save shows up on the next screen.
- Your live link does the same after you push.

## If it breaks

**You save, and nothing shows up on the next screen.** The action didn't refresh it. In that screen's `actions.ts`, check there's a `revalidatePath('/[the next screen]')` after the save.

**The form says a field is missing, or the page errors on save.** The `name=""` on a field doesn't match what `actions.ts` reads with `formData.get()`. Make them the same word.

## Commit now

```text
Build steps [1 to 2] of [flow name]
```
