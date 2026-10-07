# Build your core flow, part 2

**Card 8** · Mon 19 Oct · Tools: Cursor

## The task

Build the rest of your core flow, through to its end state.

1. **Your frameworks.** Open [`frameworks/03-flows.md`](../frameworks/03-flows.md). Today is every step left, and the end state.
2. **Cursor.** Paste the prompt below, once per screen.
3. **Browser.** Do the whole flow, start to end, in sample mode, at phone width. Then do it again with different data.
4. **Your frameworks.** Check [`frameworks/05-scope.md`](../frameworks/05-scope.md). Anything you added that isn't a must, move to should.
5. **Cursor.** Commit and push.

## Why it matters

Today your flow reaches its end state: the thing your owner would notice. Everything after this is making it real.

## Paste this into Cursor

```text
My core flow, from frameworks/03-flows.md, is:
[paste the whole flow].
Steps [1 to 2] are built, in app/(app)/[folders]. Today I'm building
steps [3 to 5] and the end state: [the end state].

For each screen left:
- The screen for step [number] is [screen name]. It shows [what's on it],
  and [changes / saves / deletes] [what].
Follow prompts/build-a-screen.md. Reuse the edit pattern in
app/(app)/example/[id]/page.tsx for any screen that changes one row.
Link the screens so the person can go through the whole flow without typing
an address. Keep sample mode working.
Then walk me through the whole flow, one tap at a time, and tell me where a
person might get stuck.
```

## When it works

- You can do your whole core flow on your phone, start to end, without typing an address.
- The end state shows somewhere you can see it.
- `npm run build` passes, and your live link does the same.

## If it breaks

**Clicking a row opens There's no page here.** The link and the folder don't match. A link to `/[your-screen]/abc` needs a folder `app/(app)/[your-screen]/[id]/` with a `page.tsx` in it.

**An edit saves, but the list still shows the old value.** Add `revalidatePath('/[your-screen]')` for the list's address after the save in `actions.ts`.

## Commit now

```text
Finish [flow name], through to [the end state]
```
