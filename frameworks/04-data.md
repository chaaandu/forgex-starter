# Turn your flow into data

Your flow from [`03-flows.md`](03-flows.md) saves things and shows things. This page turns those things into **tables**: lists of rows, like a sheet in Google Sheets, where each row is one thing and each column is one detail about it.

Every `[bracket]` is yours to fill in.

## 1. Find the nouns

Read your core flow, step by step. Write down every thing a person makes, changes or looks at.

- [noun]
- [noun]
- [noun]

**Keep a noun as a table if** there can be more than one of it, and it needs to be there tomorrow. Cross out the rest: they're probably a column in another table.

## 2. One table per noun

| Table | One row is | Columns | Who owns it |
| --- | --- | --- | --- |
| [your_table] | [one ...] | [name, ...] | [the person signed in] |
| [ ] | [ ] | [ ] | [ ] |

Name tables in lower case, plural, with words joined by underscores: `[your_table]`, not `Your Table`.

## 3. What each row holds

For each table, list its columns and their types. Every table also gets `id`, `owner_id` and `created_at` for free from the copy block.

| Column | Type | Must it be filled in? | Example |
| --- | --- | --- | --- |
| [name] | [text] | [yes] | [an example value] |
| [ ] | [ ] | [ ] | [ ] |

The types you'll use most:

| Type | For | Example |
| --- | --- | --- |
| `text` | words | a name, a note |
| `int` | whole numbers | a count |
| `numeric(10, 2)` | money, in rupees | 245.50 |
| `boolean` | yes or no | true |
| `timestamptz` | a date and time | when something happened |
| `uuid` | a link to a row in another table | the id of that row |

## 4. Who owns each row

Every row has an `owner_id`: the person who was signed in when it was made. **Row-level security** (RLS), the rules in `supabase/migrations/`, lets each person see and change only their own rows.

- Does anyone other than the owner need to see a row? [no / yes: who, and which rows]

If yes, write it down and use [`../prompts/add-sign-in-roles.md`](../prompts/add-sign-in-roles.md) after card 10. Don't loosen the rules to make it work.

## 5. Links between tables

If one row belongs to another, like many [child rows] for one [parent row], the child table gets a column that holds the parent's id.

- [child_table].[parent]_id links to [parent_table].id

## 6. Copy the example table

The repo has one neutral table, `example_items`, set up 3 times over. Copy all 3 for each table you add, then rename:

| What | Copy | To |
| --- | --- | --- |
| The table and its RLS rules | the block at the bottom of `supabase/migrations/0001_base.sql` | a new file, `supabase/migrations/0002_[your_table].sql` |
| The reads and writes | `lib/data/example-items.ts` | `lib/data/[your-table].ts` |
| The screens | `app/(app)/example/` | `app/(app)/[your-screen]/` |

[`../prompts/add-a-table.md`](../prompts/add-a-table.md) does the first two with you, and [`../prompts/build-a-screen.md`](../prompts/build-a-screen.md) does the third.

**Before card 10**, the app is in sample mode: only the sample rows in `lib/data/[your-table].ts` matter. You write the migration file now, and run it in Supabase on card 10.
