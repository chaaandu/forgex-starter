# Connect Supabase and Google sign-in

**Card 10** · Wed 21 Oct · Google Cloud and Supabase session · Tools: Supabase, Google Cloud Console, Vercel, Cursor

## The task

Connect the real database and Google sign-in, so what people save is kept for good, and private to them.

1. **Supabase.** Do README step 2: create the project, then run `supabase/migrations/0001_base.sql` in the **SQL Editor**. Then run each of your own migration files, in number order.
2. **Google Cloud Console and Supabase.** Do README step 3: the OAuth client, and Google turned on in Supabase.
3. **Your laptop.** Copy `.env.example` to a new file, `.env.local`. Fill in `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`. Quit the app with Ctrl+C and run `npm run dev` again. An **env variable** is a setting kept outside your code, like these keys.
4. **Vercel.** Add the same two under **Settings**, then **Environment Variables**. Then **Deployments**, the **⋯** on the latest one, and **Redeploy**.
5. **Supabase.** Do README step 5: your live link and `http://localhost:3000/**` under **URL Configuration**.
6. **Cursor.** Paste the prompt below. It follows [`prompts/connect-supabase.md`](../prompts/connect-supabase.md).
7. **Your phone.** Sign in on your live link and do your whole flow.

You don't change your screens today. Every function in `lib/data/` already has a Supabase half. It switches over on its own once the keys are set.

## Why it matters

Until now, nothing was saved for good. From today, your owner's data stays, and only they can see it.

## Paste this into Cursor

```text
I've connected Supabase. Follow prompts/connect-supabase.md with me.
My tables are example_items, [your_table] and [any others].
My migration files are [list the files in supabase/migrations/], and I've
run [all of them / these ones] in the Supabase SQL Editor.
What I see now: [what happens when you sign in and use your flow].
Check that the column names in every lib/data/ file match its migration,
and tell me how to test row-level security with 2 Google accounts.
Don't change any code without asking me first.
```

## When it works

- The dark sample-mode note is gone, on your laptop and on your live link.
- **Sign in with Google** works, and you land on your home screen.
- What you save is still there after you reload, and after you sign out and in.
- A second Google account sees none of the first one's rows.

## If it breaks

**The app says That didn't work, and the logs say Could not find the table.** That migration hasn't run. Open it, copy the whole file into the Supabase **SQL Editor**, and click **Run**. The terminal on your laptop, or **Logs** on Vercel, names the table.

**After sign-in you land back on the sign-in screen, or on localhost.** Supabase doesn't trust your link yet. Redo README step 5, with your exact Vercel link followed by `/**`. For other sign-in errors, see the README's **If something breaks**.

## Commit now

`.env.local` is never committed: `.gitignore` keeps it out. Commit anything Cursor fixed.

```text
Connect Supabase and Google sign-in
```
