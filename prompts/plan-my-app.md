# Plan my app

**When to use it:** once `frameworks/02-your-solution.md` and `frameworks/03-flows.md` are filled in, before you write any code.

Replace every `[bracket]`, brackets and all. Paste it into the chat in Cursor.

```text
Read these files first:
- frameworks/02-your-solution.md (my solution)
- frameworks/03-flows.md (my core flow)
- frameworks/04-data.md (how to turn a flow into tables)
- README.md, the section "How to build each screen"
- app/(app)/example/ and lib/data/example-items.ts (the pattern every screen copies)

My one line is: [your one line from 02-your-solution.md].
My core flow is: [the flow name and its steps from 03-flows.md].

Plan the app. Don't write or change any code yet.
1. Screens: one row per screen. For each, give the folder under app/(app)/,
   which step of my flow it covers, what it shows, and what it saves.
   Copy app/(app)/example/ for each one.
2. Tables: one row per table. For each, give its name, what one row is,
   its columns with types, and who owns each row. Every table has id,
   owner_id and created_at, like example_items in
   supabase/migrations/0001_base.sql.
3. The order to build them, so that each day ends with something that works
   in sample mode.
4. What from my plan you would leave out to finish the core flow by 23 Oct.
Keep it short. Use plain words, and explain any technical term in one line.
If anything in my solution or flow is unclear, ask me before you plan.
```

**When it works:** you get two short tables and a build order. Copy the tables into `frameworks/04-data.md`.
