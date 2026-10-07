# Turn your flow into data

**Card 6** · Sun 18 Oct · Tools: Claude, Cursor

## The task

Decide what your app keeps, as tables, and set them up in sample mode.

1. **Your frameworks.** Fill in [`frameworks/04-data.md`](../frameworks/04-data.md): the nouns in your core flow, one table per noun, the columns, and who owns each row.
2. **Claude.** Paste your flow and your tables, and ask: what's missing for the end state of my flow, and what could I cut?
3. **Cursor.** For each table, paste the prompt below. It follows [`prompts/add-a-table.md`](../prompts/add-a-table.md).
4. **Cursor.** Commit and push.

A **table** is a list of rows, like a sheet in Google Sheets: each row is one thing, each column one detail about it. The migration file you write today does nothing until you run it in Supabase on card 10.

## Why it matters

Every screen you build next reads or saves these rows. Get them right now, and the screens are quick.

## Paste this into Cursor

```text
From frameworks/04-data.md, I need a table called [your_table].
One row is [one ...]. Its columns are:
- [column] [type] [required or not]
- [column] [type] [required or not]
[If it links to another table: each row belongs to one row of [parent_table].]

Follow prompts/add-a-table.md:
1. Write supabase/migrations/0002_[your_table].sql from the copy block at the
   bottom of supabase/migrations/0001_base.sql. Number the next table 0003.
2. Write lib/data/[your-table].ts from lib/data/example-items.ts, with
   3 sample rows that fit my flow.
If I already made lib/data/[your-table].ts on card 5, update it to match
instead of making a new one.
Don't touch 0001_base.sql or any screen. Then explain each RLS policy in
the new file, in one line each.
```

## When it works

- `supabase/migrations/` has a new numbered file for each of your tables.
- `lib/data/` has one file per table, each with sample rows.
- `npm run build` still passes, and your card 5 screen still works.

## If it breaks

**The build says a type doesn't match, like Property 'title' does not exist.** A screen still uses the example's column names. Paste the error into Cursor and ask it to rename the fields in that screen to your table's columns.

**You're not sure a noun should be a table.** Ask: can there be more than one of it, and does it need to be there tomorrow? If both are yes, it's a table. If not, it's a column in another table.

## Commit now

```text
Add the [your_table] table, in sample mode
```
