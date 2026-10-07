# Build the first screen of your flow

**Card 5** · Fri 16 Oct, before 6 pm IST · **Phase 1 due** · Tools: Claude, Cursor, GitHub, Vercel

## The task

Build the first screen of your core flow, in sample mode. Then check your live link and your repo, and send phase 1 before 6 pm IST.

1. **Your frameworks.** Fill in your core flow in [`frameworks/03-flows.md`](../frameworks/03-flows.md). Step 1 is the screen you build today.
2. **Cursor.** Paste [`prompts/plan-my-app.md`](../prompts/plan-my-app.md) first if you haven't. Then paste the prompt below. It copies `app/(app)/example/` for your screen.
3. **Browser.** Check it on `localhost:3000`, at phone width.
4. **Cursor.** Commit and push. Vercel deploys it.
5. **Before 6 pm IST**, check:
   - your live link opens on your phone and shows the new screen;
   - your repo is public, and your latest commit is from today;
   - your README says who built it and links to your live link;
   - your research doc is shared, and its link is in the ForgeX portal.
6. **ForgeX portal.** Open **Phases** and send phase 1.

Supabase isn't connected yet, so the screen runs in **sample mode**, on made-up rows kept in `lib/data/`. Card 10 connects the real database.

**Tomorrow, Sat 17 Oct, is AI Sprint · Pitch day for phase 1.** You have 3 minutes, with this screen as your live demo. Prepare tonight with [`frameworks/06-pitch.md`](../frameworks/06-pitch.md).

## Why it matters

Your research found where it breaks. This is the first thing you build that answers it.

## Paste this into Cursor

```text
My one line, from frameworks/02-your-solution.md, is: [your one line].
The first step of my core flow, from frameworks/03-flows.md, is:
[step 1, in your words].
The screen for it is called [screen name]. It shows [what's on it], and
saves [what it saves, or nothing yet].

Follow prompts/build-a-screen.md:
- Copy app/(app)/example/ to app/(app)/[your-screen]/ and rename it.
- Copy lib/data/example-items.ts to lib/data/[your-table].ts, with 3 sample
  rows that fit my screen. Don't connect to Supabase yet.
- Use the components in components/ and the classes in app/globals.css.
- Add a tab for it to TABS in components/Nav.tsx.
- It must work on a phone 360px wide.
Leave app/(app)/example/ as it is. Then explain what you changed, file by
file, in plain words.
```

## When it works

- A new tab opens your screen, with your sample rows.
- It reads well at phone width.
- The same screen is on your live link.
- Phase 1 shows as sent in the portal.

## If it breaks

**The new tab opens a page that says There's no page here.** The folder name and the tab's link don't match. If the folder is `app/(app)/[your-screen]`, the tab's `href` in `components/Nav.tsx` must be `/[your-screen]`. The `(app)` part never shows in the address.

**It works on your laptop, but the live link shows the old app.** Either the push didn't happen, or the deploy failed. In Cursor, **Source Control** should have nothing left to sync. In Vercel, open **Deployments**: the latest one should say **Ready**. If it says **Error**, read its log.

## Commit now

```text
Add the [screen name] screen in sample mode
```
