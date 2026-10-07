# Extra · Read a WhatsApp order with AI

**Any day after card 7** · Tools: Google AI Studio, Cursor, Vercel

## The task

Turn on AI, so the app reads a pasted WhatsApp message and fills in the items. Then teach it how your owner's customers write.

AI is an extra. The app works without it, and this card works on sample data too.

1. **Google AI Studio.** Go to [aistudio.google.com](https://aistudio.google.com), sign in, click **Get API key**, then **Create API key**. An **API key** is a password that lets your app use a service. Copy it, and never paste it into your code.
2. **Cursor.** Open `.env.local`. If you don't have one yet, copy `.env.example` and name the copy `.env.local`. Add the line `GEMINI_API_KEY=` followed by your key. An **env variable** is a setting kept outside your code, like this key.
3. **Terminal.** Stop the app with Ctrl+C and run `npm run dev` again.
4. **Browser.** Open **New order**. A **Read with AI** button now shows under the message box. Paste a message, tap it, check the items, fix anything wrong, and save.
5. **Cursor.** Paste 3 real messages that AI got wrong into the prompt below.
6. **Vercel.** Add `GEMINI_API_KEY` under **Settings**, then **Environment Variables**, and **Redeploy**.

Every time you save an AI order, the app counts how many lines you changed, added or removed. The Today screen shows the average. Close to 0 means AI reads your owner's orders well. That number belongs in your README.

## Why it matters

Typing every order by hand is where owners give up. If AI gets most lines right, entering an order takes seconds.

## Paste this into Cursor

```text
In lib/ai.ts, the instructions() function tells the AI how to read a WhatsApp order.
These real messages came out wrong:
[1. bhaiya 2 kilo atta aur ek dozen ande bhej do: it missed the eggs]
[2. 3 pkt maggi, 1 colgate: it didn't match pkt to packet]
[3. same as last time: it made up items]
Add short rules to instructions() so it handles these. For example: a dozen
means 12, pkt means packet, and if the message only says same as last time,
return no lines.
Keep the rest of lib/ai.ts the same. Don't add packages.
```

## When it works

- **Read with AI** fills in the items in a few seconds.
- Today shows a line like: *AI read 5 orders. You fixed 0.4 lines per order on average.*
- After your new rules, the same 3 messages come out right.

## If it breaks

**There's no Read with AI button.** The key isn't set where the app is running. On your laptop: check the line in `.env.local` says exactly `GEMINI_API_KEY=`, then restart `npm run dev`. On your live link: add it in Vercel, then **Redeploy**.

**It says AI could not read that.** The terminal, or **Logs** on Vercel, shows why:
- **API key not valid**: copy the key from AI Studio again.
- **429**: you've hit the free limit for now. Wait a minute, or try again tomorrow.
- **404, model not found**: set `GEMINI_MODEL` to a current Flash model listed in AI Studio.

## Commit now

```text
Teach the AI how our customers write
```
