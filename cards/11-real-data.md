# Real data from one owner

**Card 11** · Thu 22 Oct · Tools: your phone, your owner, Supabase, Cursor

## The task

Put a week's worth of real data from one owner into your app, so it looks like their app, not a demo.

1. **Your owner.** Go back to one owner from your research. Show them the app on your phone. Ask for the real details your tables need, and ask if you may use them. Write down only what they're happy to share.
2. **Your live link.** Sign in with your own Google account and enter the rows through your own screens. If the screens are slow for this, note where: that's a finding.
3. **Supabase.** If there are more than about 20 rows, use the pattern in `supabase/seed.sql` instead: the prompt below writes the file for you.
4. **Cursor.** Replace the sample rows in each `lib/data/` file with 3 made-up rows in the same shape, so sample mode still looks real.
5. **Cursor.** Commit and push.

## Why it matters

A screen with real names and numbers shows you what's wrong with it in a way sample rows never do.

## Paste this into Cursor

```text
I have real data from one owner for my [your_table] table:
[paste it, or describe it: how many rows, what each holds]

1. Write supabase/seed_[your_table].sql in the same pattern as
   supabase/seed.sql, with PASTE-YOUR-USER-ID-HERE where my id goes.
   Use only the data above. Never make up a row.
2. In lib/data/[your-table].ts, replace SAMPLE_ROWS with 3 made-up rows in
   the same shape as the real ones. Use made-up names, not the owner's.
3. Tell me what in the real data didn't fit my columns: missing fields,
   values too long, or things the owner tracks that my app has no place for.
Never put the real data in any file except the seed file. I won't commit it.
```

## When it works

- Your app shows the owner's real rows when you sign in, on your live link.
- Sample mode still works on your laptop, with made-up rows in the same shape.
- You have a list of what didn't fit, for card 13.

## If it breaks

**The seed fails with invalid input syntax for type uuid.** The id is still `PASTE-YOUR-USER-ID-HERE`, or lost its quotes. Run `select id, email from auth.users;` in the SQL Editor, copy your id, and paste it between the single quotes.

**The seed runs, but you can't see the rows in the app.** They belong to a different account than the one you signed in with. Check the email next to the id you used.

## Commit now

Don't commit the owner's real data. Add the seed file's name to `.gitignore` if it holds anything they haven't agreed to share.

```text
Make sample mode look like real data
```
