# Connect Supabase

**When to use it:** on card 10, once you've done README steps 2, 3 and 5, or when your app still says sample mode after you connected it.

Replace every `[bracket]`, brackets and all. Paste it into the chat in Cursor.

```text
I've just connected Supabase to this app. Help me check it, step by step.
Don't change any code unless a step fails, and ask me before you do.

1. Read .env.example and lib/env.ts. Tell me exactly which 2 lines my
   .env.local needs. (I'll fill in the values myself. Never ask me to paste a key.)
2. Read supabase/migrations/. List every file, and tell me to run each one in
   the Supabase SQL Editor, in number order, if I haven't yet. My tables are:
   example_items, [your_table], [another table, if any].
3. Read lib/data/. For each file, check the column names in the Supabase half
   match the columns in its migration. List any that don't.
4. Read lib/auth.ts, app/login/ and app/auth/callback/route.ts. Tell me what
   should happen, screen by screen, when I sign in with Google.
5. Tell me how to check that row-level security works: what to add with one
   Google account, and what I should NOT see when I sign in with another.
I'm seeing: [what you see, or "nothing wrong yet"].
```

**When it works:** the dark sample-mode note is gone, you can sign in with Google, and a second Google account can't see the first one's rows.
