# Card 5 · Your first screen

**Fri 16 Oct, before 6 pm IST · Phase 1** · Tools: Claude, Cursor, GitHub, Vercel

## The task

Build the first screen of your flow: the one your research pointed to. Then check your live link and your repo before phase 1 is due at 6 pm, when the team looks at both.

1. **Claude.** Tell Claude who you're building for and where their day breaks. Ask: what is the one screen that would help at that exact moment? Keep it to one screen.
2. **Cursor.** If that screen already exists in the starter (New order, Orders, Today, Products), ask Cursor to change that file instead. If it's new, paste the prompt below.
3. **Browser.** Check it on `localhost:3000`, at phone width.
4. **Cursor.** Commit and push. **Vercel** deploys it.
5. **Before 6 pm IST**, check:
   - your live link opens on your phone and shows the new screen;
   - your repo is public;
   - your latest commit is from today;
   - the first lines of your README say who you're building for.
6. **ForgeX portal.** Open Phases and send phase 1. Your repo and live link are already filled in if you added them to your steps.

Supabase isn't connected yet, so the screen runs on **sample data**: made-up rows kept in `lib/sample.ts`. Card 10 connects the real database, and card 11 moves your screen's data across.

## Why it matters

Your research found where it breaks. This is the first thing you build that answers it.

## Paste this into Cursor

```text
I'm building for [a home baker in Pune who takes about 20 cake orders a week on WhatsApp].
My research found it breaks when [she forgets which orders are for pickup tomorrow].
The first screen of my flow is [a list of tomorrow's pickups: name, item, time].

Build that screen in this Next.js app.
- Make one new file, app/pickups/page.tsx (name the folder after my screen),
  as a server component.
- Use sample data only. If you need new data, add a type to lib/types.ts and a
  plain exported array to lib/sample.ts. Don't connect to Supabase.
- Use the classes in app/globals.css (.box, .btn, .btn-quiet, .field) and the
  colours in @theme. Don't add packages.
- Add a tab for it to the TABS list in components/Nav.tsx.
- It must work on a phone 360px wide.
Then explain what you changed, file by file, in plain words.
```

## When it works

- A new tab shows in the app, and it opens your screen with sample data.
- It reads well at phone width.
- The same screen is on your live link.

## If it breaks

**The new tab opens a page that says There's no page here.** The folder name and the tab's link don't match. If the folder is `app/pickups`, the tab's `href` in `components/Nav.tsx` must be `/pickups`.

**It works on your laptop, but the live link shows the old app.** Either the push didn't happen, or the deploy failed. In Cursor, **Source Control** should have nothing left to sync. In Vercel, open **Deployments**: the latest one should say **Ready**. If it says **Error**, read its log.

## Commit now

```text
Add the pickups screen with sample data
```
