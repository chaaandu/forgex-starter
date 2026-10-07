# Build cards

One small task a day, from your own copy of the starter on 12 Oct to a 3-minute Loom demo on 26 Oct. Each card builds **your** solution, from your own research. None of them tells you what to build.

All dates are 2026. All times are IST.

| Card | Date | Task |
| --- | --- | --- |
| [1](01-make-your-copy.md) | Mon 12 Oct | Make your own copy of the starter |
| [2](02-run-it-in-cursor.md) | Tue 13 Oct · Cursor and GitHub Copilot session | Run it on your laptop with Cursor |
| [3](03-go-live-on-vercel.md) | Wed 14 Oct | Go live on Vercel |
| [4](04-make-it-yours.md) | Thu 15 Oct | Make it yours: name, colours and words |
| [5](05-first-screen-phase-1.md) | Fri 16 Oct, before 6 pm · **Phase 1 due** | Build the first screen of your flow |
| | Sat 17 Oct · **AI Sprint · Pitch day for phase 1** | Pitch for 3 minutes, with [`frameworks/06-pitch.md`](../frameworks/06-pitch.md). No card today |
| [6](06-your-data.md) | Sun 18 Oct | Turn your flow into data |
| [7](07-core-flow-part-1.md) | Sun 18 Oct | Build your core flow, part 1 |
| [8](08-core-flow-part-2.md) | Mon 19 Oct | Build your core flow, part 2 |
| [9](09-daily-screen.md) | Tue 20 Oct | The screen your user opens every day |
| [10](10-connect-supabase.md) | Wed 21 Oct · Google Cloud and Supabase session | Connect Supabase and Google sign-in |
| [11](11-real-data.md) | Thu 22 Oct | Real data from one owner |
| [12](12-phone-check-phase-2.md) | Fri 23 Oct, before 6 pm · Vercel session · **Phase 2 due** | Check every screen on your phone |
| [13](13-real-owner.md) | Sat 24 Oct | Put it in your owner's hands |
| [14](14-readme-case-study.md) | Sun 25 Oct | Write the README case study |
| [15](15-loom-demo-phase-3.md) | Mon 26 Oct, before 6 pm · **Phase 3 due** | Record the 3-minute demo on Loom |
| [Extra](extra-ai.md) | Any time | Use AI for one step of your flow (optional) |

**Mon 2 Nov is the Venture Building launch.** What you build here is where it starts.

## Before card 1

Your research comes first. Copy [`frameworks/01-research-doc.md`](../frameworks/01-research-doc.md) into a Google Doc, go through it with your mentor, then add the link in the ForgeX portal. By card 4, fill in your one line in [`frameworks/02-your-solution.md`](../frameworks/02-your-solution.md). Every card after that reads from it.

## How the cards fit together

- **Cards 1–9 need no database.** Until card 10, the app runs in **sample mode**, on made-up rows in `lib/data/`, and a dark note at the top of every screen says so. Everything you build in those days works and shows on your live link.
- **Card 10 connects Supabase.** Every file in `lib/data/` already has a Supabase half, so the app switches from sample mode to the database on its own once the keys are set. Nothing you built is lost.
- **Every screen starts as a copy of `app/(app)/example/`**, renamed to fit your flow. [`prompts/build-a-screen.md`](../prompts/build-a-screen.md) does it with you.
- **Building more than one flow?** Do cards 7 and 8 for each, starting with the one the others depend on.
- **Phases are sent in the ForgeX portal, under Phases**, before 6 pm IST on the day they're due.

## How to use a card

- Each card has the same parts: the task, why it matters, a prompt, what you'll see when it works, the 2 most likely errors, and a commit message.
- In a prompt, words in **[square brackets]** are yours to fill in, from your own frameworks. Replace them, brackets and all.
- Paste prompts into the chat in **Cursor**. They work in **GitHub Copilot Chat** too.
- Use **Claude** to think and plan: what to build, what an error means, whether a number adds up.
- If something breaks that the card doesn't cover, paste the whole error into Cursor with [`prompts/fix-an-error.md`](../prompts/fix-an-error.md).
- Commit and push at the end of every card. Your repo should show work on every day.
