# The screen your user opens every day

**Card 9** · Tue 20 Oct · Tools: Claude, Cursor

## The task

Turn the home screen into the one your person needs when they open the app: what's waiting for them, and the one thing to do next.

1. **Claude.** Paste your research doc's notes on the owner's day, and your flow. Ask: when they open this app, what do they need to see first, and what will they tap?
2. **Cursor.** Paste the prompt below. It changes `app/(app)/page.tsx`, the placeholder that says **Your app starts here**.
3. **Browser.** Open the app fresh, at phone width. In 3 seconds, can you tell what to do?
4. **Cursor.** Commit and push.

## Why it matters

People come back to an app that shows them something useful the moment it opens. This is that screen.

## Paste this into Cursor

```text
Replace the placeholder home screen in app/(app)/page.tsx.
The person who opens it is [who, from frameworks/02-your-solution.md].
They usually open it [when, and where they are].
The first thing they need to see is [what, from your research].
The one thing they'll do next is [the action], which goes to [which screen].

- Follow the TODO comments in app/(app)/page.tsx. Keep getUserId() at the top.
- Read from lib/data/[your-table].ts, with the signed-in person's id.
- Use PageHeader, Card and EmptyState from components/. If there's nothing to
  show yet, EmptyState says what will show here and how to add the first one.
- Keep the SetupScreen line until card 10.
- Put the main action at the top, as a full-width button.
- It must read well on a phone 360px wide.
Don't change any other screen.
```

## When it works

- The home screen shows what your person needs first, from your sample rows.
- The main action is the first button on screen, and it opens the right screen.
- With no rows, it says what will show there and how to start.

## If it breaks

**The home screen shows nothing, but the other screen has rows.** The home screen may be filtering them out, for example by date or status. Ask Cursor to show you the filter, and test it with a sample row that should match.

**The build says userId is assigned a value but never used.** You still need the call, for the sign-in check. Use its answer: pass `userId` to your data function, as `app/(app)/example/page.tsx` does.

## Commit now

```text
Make home the screen [who] opens every day
```
