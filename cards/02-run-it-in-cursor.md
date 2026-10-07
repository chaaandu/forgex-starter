# Card 2 · Run it on your laptop

**Tue 13 Oct · Cursor and Copilot session** · Tools: Cursor, Copilot, GitHub

## The task

Open your repo in Cursor and run the app on your laptop.

1. **Your laptop.** Install three things:
   - **Node.js**, the engine that runs the app's code: the LTS version from [nodejs.org](https://nodejs.org).
   - **Git**, which tracks your changes: from [git-scm.com](https://git-scm.com). Macs may offer to install it the first time it's needed.
   - **Cursor**, the code editor with AI built in: from [cursor.com](https://cursor.com).
2. **Cursor.** Sign in, and connect your GitHub account when it asks.
3. **Cursor.** Choose **Clone repo** and paste your repo's link, like `https://github.com/your-name/asha-bakes`. To **clone** is to download a copy of the repo to your laptop.
4. **Cursor.** Open the terminal: **View**, then **Terminal**. The **terminal** is where you type commands for your laptop to run.
5. **Terminal.** Type `npm install` and press Enter. **npm** downloads the packages the app needs. It takes a minute or two.
6. **Terminal.** Type `npm run dev` and press Enter.
7. **Browser.** Open [http://localhost:3000](http://localhost:3000). **localhost** means your own laptop: only you can see it.
8. **Cursor.** Open `lib/sample.ts`. Change `Sample home bakery` to the kind of shop you're building for. Save, and reload the browser.

**Copilot** works in VS Code and on github.com, where you can open any file and ask it to explain the code. Your session shows where each tool fits. Any prompt in these cards works in Copilot Chat too.

## Why it matters

Every change you make from now on starts here, and you'll see it on your laptop before anyone else does.

## Paste this into Cursor

Open the chat in Cursor (the AI panel on the right) and paste:

```text
Explain this project to me like I run a shop, not like I'm an engineer.
Read README.md, app/page.tsx, app/orders/new/NewOrderForm.tsx, lib/data.ts
and lib/sample.ts.
1. Which file draws each screen: Today, New order, Orders, Products?
2. Where does the data come from right now, before Supabase is connected?
3. What happens, file by file, when I tap Save order?
Answer in short numbered points. Don't change any files.
```

## When it works

- The terminal says **Ready** and shows `http://localhost:3000`.
- The browser shows the Today screen, with a dark note at the top: **You're on sample data**.
- Your new shop name shows on Today, above the two boxes.
- Add an order on **New order**, and it shows up on **Orders**.

## If it breaks

**The terminal says npm is not recognised, or command not found.** Node.js isn't installed, or Cursor was open while you installed it. Install the LTS version, then close and reopen Cursor.

**The terminal says port 3000 is in use.** The app is already running in another terminal. Next.js picks port 3001 instead and prints the address: open that one. Or go to the other terminal and press Ctrl+C to stop it.

## Commit now

A **commit** is a saved snapshot of your code with a message. To **push** is to send it to GitHub. In Cursor, open **Source Control** on the left, write the message, click **Commit**, then **Sync Changes**.

```text
Run it locally and rename the sample shop
```
