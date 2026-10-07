# Card 10 · Connect Supabase and Google sign-in

**Wed 21 Oct · Google Cloud and Supabase session** · Tools: Supabase, Google Cloud Console, Vercel, Cursor

## The task

Connect the real database and turn on Google sign-in. After today, orders are saved for good, and each owner sees only their own.

Supabase gives the app a **database**, the place where shops, products and orders are kept, and handles sign-in. Google Cloud Console is where you tell Google about your app.

Follow the README in your repo. It has every click:

1. **Supabase.** README step 2: make the project and run the **migration**, a file of database code that creates your tables (`supabase/migrations/0001_init.sql`). Copy the Project URL and the publishable key.
2. **Google Cloud Console.** README step 3: make the **OAuth client**, your app's ID with Google. Then **Supabase**: turn on Google and paste its ID and secret.
3. **Vercel.** Your app is already live, so add the keys to it. **Env variables** (environment variables) are settings kept outside your code, so keys never reach GitHub.
   - Open your project, then **Settings**, then **Environment Variables**.
   - Add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
   - Open **Deployments**, click **⋯** on the latest one, and choose **Redeploy**.
4. **Supabase.** README step 5: add your Vercel link and `http://localhost:3000/**` to the redirect URLs.
5. **Cursor.** On your laptop, copy `.env.example` to a new file called `.env.local` and fill in the same 2 values. Stop the app with Ctrl+C and run `npm run dev` again.
6. **Browser.** Sign in with Google, name your shop, and add one product.

The app now reads from Supabase instead of `lib/sample.ts`. You didn't change any code: `lib/data.ts` checks for the keys and switches on its own.

## Why it matters

Until now nothing was saved for good. From today, an owner can trust the app with real orders.

## Paste this into Cursor

```text
I've run supabase/migrations/0001_init.sql in Supabase.
Explain its row-level security rules to me in plain words:
1. Why can't one owner see another owner's orders?
2. How is order_items protected, when it has no shop_id of its own?
3. What could go wrong if a policy had "using" but no "with check"?
Then read lib/data.ts and tell me which functions stop using lib/sample.ts
now that the Supabase env variables are set.
Don't change any files.
```

## When it works

- The note **You're on sample data** is gone, on your laptop and on your live link.
- **Sign in with Google** works, and the app asks for your shop's name.
- A product you add is still there after you reload.
- Sign in with a second Google account: it gets its own empty shop and can't see yours.

## If it breaks

**The live link still says you're on sample data.** The new env variables need a new deploy. Check both names are spelt exactly right, then **Redeploy**. On your laptop, check the file is called `.env.local`, then restart `npm run dev`.

**Google says redirect_uri_mismatch.** The redirect URI in your Google OAuth client must be exactly the Callback URL that Supabase shows on its Google provider page, ending in `/auth/v1/callback`.

For other errors, see **If something breaks** in the README.

## Commit now

`.env.local` stays on your laptop and never goes to GitHub. Add a line to your README saying owners sign in with Google, then commit.

```text
Connect Supabase and Google sign-in
```
