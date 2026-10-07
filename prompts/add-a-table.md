# Add a table

**When to use it:** when `frameworks/04-data.md` has a table that doesn't exist yet.

Replace every `[bracket]`, brackets and all. Paste it into the chat in Cursor.

```text
I need a new table called [your_table]. One row is [one ...].
Its columns, from frameworks/04-data.md, are:
- [column] [type] [required or not] [any limit, like up to 120 characters]
- [column] [type] [required or not]
[If it links to another table: each row belongs to one row of [parent_table].]

Do 3 things:
1. Create supabase/migrations/0002_[your_table].sql (use the next free number)
   from the block under "COPY THIS BLOCK TO ADD YOUR OWN TABLE" at the bottom
   of supabase/migrations/0001_base.sql. Keep id, owner_id, created_at, the
   index, the revoke and grant lines, and all 4 RLS policies. If it links to
   another table, add the extra "with check" line shown at the very bottom of
   that file to the insert and update policies.
2. Create lib/data/[your-table].ts by copying lib/data/example-items.ts.
   Change the type, the columns, the statuses (if any) and SAMPLE_ROWS
   (3 neutral rows) to fit. Keep the sample-mode half and the Supabase half
   of every function, and keep the .eq('owner_id', ownerId) filters.
3. Don't change 0001_base.sql, and don't touch any screen yet.
Then explain, in plain words, what each RLS policy in the new file allows.
Remind me that the SQL only takes effect once I run it in the Supabase SQL Editor.
```

**When it works:** you have a new migration file and a new data file, and `npm run build` still passes. On card 10 or later, run the migration in Supabase.
