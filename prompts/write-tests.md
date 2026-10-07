# Write tests

**When to use it:** once your core flow works, before you put it in your owner's hands. A **test** is a small piece of code that checks another piece of code still does what it should.

Replace every `[bracket]`, brackets and all. Paste it into the chat in Cursor.

```text
Add a few tests to this app, and a short checklist for what code can't check.

1. If Vitest isn't installed, install it with npm install -D vitest, and add
   "test": "vitest run" to the scripts in package.json. Put tests in a
   tests/ folder. npm run build and npm run lint must still pass.
2. Write tests for the Zod checks in app/(app)/[your-screen]/actions.ts.
   A 'use server' file can only export async functions, so first move each
   schema into app/(app)/[your-screen]/schema.ts and import it in actions.ts.
   Test what it accepts and what it refuses:
   [the inputs that matter, like an empty title or a note that's too long].
3. Write tests for any function in lib/ that works something out:
   [the functions, if any].
4. Don't test Supabase or Google sign-in in code. Instead, write
   docs/TESTING.md: a checklist I follow by hand on my live link, covering
   my core flow from frameworks/03-flows.md step by step, a second Google
   account that must not see my rows, and the same flow on a phone.
Explain what each test checks, in one line each.
```

**When it works:** `npm test` passes, and you've followed `docs/TESTING.md` once on your live link.
