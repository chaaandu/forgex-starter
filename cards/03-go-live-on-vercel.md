# Card 3 · Go live on Vercel

**Wed 14 Oct** · Tools: Vercel, GitHub, Cursor

## The task

Put your app on the internet. It runs on sample data for now, and that's fine.

Vercel puts your app online. To **deploy** is to build your code and publish it at a link.

1. **Cursor.** Run the prompt below first, to check the app builds.
2. **Vercel.** Go to [vercel.com](https://vercel.com) and sign up with GitHub. Pick the free **Hobby** plan.
3. **Vercel.** Click **Add New**, then **Project**. Find your repo and click **Import**.
4. **Vercel.** Leave **Environment Variables** empty for now. Click **Deploy**.
5. **Vercel.** Wait 1–2 minutes. Open your project. Your link shows under **Domains**, like `https://asha-bakes.vercel.app`.
6. **Your phone.** Open the same link.

Use the import, not the **Deploy with Vercel** button in the README. The button makes a second GitHub copy, and your work would end up split across two repos.

From now on, every push to GitHub deploys again on its own, in about a minute.

## Why it matters

A link on a phone is something an owner can try today, and the team checks it at every stop.

## Paste this into Cursor

```text
Before I put this app live on Vercel, check that it builds.
Run npm run build in the terminal and read the output.
If it fails, explain the error in one sentence and fix only that, with the
smallest change you can.
If it passes, tell me in one sentence what the ƒ (Dynamic) mark means in the
list of routes it prints.
```

## When it works

- Vercel shows your deployment as **Ready**.
- Your link opens on your phone, with the note **You're on sample data** at the top.
- The shop name you set on card 2 shows on the Today screen.

## If it breaks

**Your repo isn't in Vercel's list.** Click **Adjust GitHub App Permissions**. Give Vercel access to your repo, then come back and refresh.

**The deploy says Error.** Open it and read the **Building** log. The first red line names a file. Run `npm run build` on your laptop, fix the same error there, then commit and push again.

## Commit now

Add your live link near the top of `README.md`, then commit and push.

```text
Add the live link to the README
```
