# Go live on Vercel

**Card 3** · Wed 14 Oct · Tools: Vercel, GitHub, Cursor

## The task

Put your app on the internet, in sample mode. You'll connect the database on card 10.

Vercel puts your app on the internet. To **deploy** is to build your code and publish it at a link.

1. **Vercel.** Go to [vercel.com](https://vercel.com) and sign up with GitHub. Pick the free **Hobby** plan.
2. **Vercel.** Click **Add New**, then **Project**. Find your repo and click **Import**. If it isn't listed, click **Adjust GitHub App Permissions** and give Vercel access to it.
3. **Vercel.** Leave **Environment Variables** empty for now. Click **Deploy** and wait 1–2 minutes.
4. **Your phone.** Open the link Vercel gives you, like `https://your-app.vercel.app`. Open **Example** and add an item.
5. **Cursor.** Paste the prompt below to put your live link in the README, then commit and push. Vercel deploys again on every push.

This is README step 4, without the env variables.

## Why it matters

From today, anyone can open your app on their phone. Every phase is judged on this link.

## Paste this into Cursor

```text
My app is live at [your Vercel link].
1. In README.md, under the line that says who built it, add:
   Live: [your Vercel link]
2. Run npm run build in the terminal, and tell me if anything fails.
   This is the same check Vercel runs before it deploys.
Don't change any other file.
```

## When it works

- Your Vercel link opens on your phone and shows **Your app starts here**, with the sample-mode note at the top.
- The README on GitHub shows your live link.
- In Vercel, **Deployments** shows your latest push as **Ready**.

## If it breaks

**Vercel says the build failed.** Open the failed deployment and read its build log, from the first red line. Paste it into Cursor with [`prompts/fix-an-error.md`](../prompts/fix-an-error.md). Run `npm run build` on your laptop to see the same error.

**The item you added disappeared.** That's sample mode: nothing is saved for good until card 10, and Vercel can start a fresh copy of your app at any time.

## Commit now

```text
Add the live link
```
