# Add sign-in roles

**When to use it:** only if your flow needs two kinds of people to see different things, like [the owner] and [someone who helps them]. Do it after card 10.

Every table starts with one rule: you see only your own rows. Loosening it is the easiest way to leak someone's data. Write down why you need it in `frameworks/04-data.md` first.

Replace every `[bracket]`, brackets and all. Paste it into the chat in Cursor.

```text
My app needs 2 roles: [role one, like owner] and [role two].
- [role one] can see and change [which rows of which tables].
- [role two] can see [which rows of which tables] and change [which, or none].
- Someone becomes [role two] when [how: who decides, and how].

Read supabase/migrations/0001_base.sql (the profiles table and its RLS),
the other files in supabase/migrations/, lib/auth.ts and lib/data/.

Plan it first, and wait for me to say yes before you write anything:
1. A new migration, supabase/migrations/[next number]_roles.sql, that adds a
   role column to profiles with a check on the allowed values.
2. People must NOT be able to change their own role. The profiles update
   policy lets people update their own row, so revoke update on profiles
   from authenticated and grant update only on display_name.
   Roles are set by me in the Supabase SQL Editor, or by [how you decided above].
3. New RLS policies that give [role two] exactly the access above, and no more.
   Keep every existing policy. Don't use the service_role key anywhere.
4. A getRole() function in lib/auth.ts that reads the signed-in person's role.
   In sample mode it returns [the role to test with].
5. The screens that change, and how.
Then explain, in plain words, every policy and what it allows.
```

**When it works:** each role sees exactly what the plan says, and a person who isn't [role two] can't make themselves one.
