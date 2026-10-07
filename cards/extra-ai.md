# Use AI for one step of your flow

**Extra** · Any time · Optional · Tools: Google AI Studio, Cursor, Vercel

## The task

Turn AI on, and use it for one step of your flow where it saves your person real effort. AI is optional. Your app must work the same with it off.

1. **Your frameworks.** In [`frameworks/03-flows.md`](../frameworks/03-flows.md), find the one step that's slowest or hardest for your person. If none is, skip this card.
2. **Google AI Studio.** Go to [aistudio.google.com](https://aistudio.google.com), sign in, click **Get API key**, then **Create API key**. An **API key** is a password that lets your app use a service. Copy it, and never paste it into your code.
3. **Cursor.** Open `.env.local`. If you don't have one yet, copy `.env.example` and name the copy `.env.local`. Add the line `GEMINI_API_KEY=` followed by your key.
4. **Terminal.** Press Ctrl+C to quit the app, and run `npm run dev` again.
5. **Browser.** Open [http://localhost:3000/api/ai](http://localhost:3000/api/ai). It should say `"on":true`.
6. **Cursor.** Paste the prompt below. It follows [`prompts/use-ai-for-one-step.md`](../prompts/use-ai-for-one-step.md).
7. **Vercel.** Add `GEMINI_API_KEY` under **Settings**, then **Environment Variables**, and **Redeploy**.

How it works: `lib/ai.ts` has one function, `askAI({ instructions, input })`. You write the instructions, the person gives the input, and it gives back text. `app/api/ai/route.ts` is the address a screen can call. Gemini is the default. To use Claude, set `AI_PROVIDER=claude` and `ANTHROPIC_API_KEY` (paid, from [console.anthropic.com](https://console.anthropic.com)).

## Why it matters

AI is worth adding only where it saves your person real effort, and they can still check what it did.

## Paste this into Cursor

```text
Follow prompts/use-ai-for-one-step.md.
Step [number] of my core flow is: [the step].
It's slow or hard because [why, from your research].
I want AI to [what it should produce] from [what the person gives it].
It goes on the [screen name] screen, in app/(app)/[your-screen]/.
Here are 3 real inputs, and what a good answer looks like for each:
1. [input] -> [good answer]
2. [input] -> [good answer]
3. [input] -> [good answer]
```

## When it works

- `/api/ai` says `"on":true`, on your laptop and on your live link.
- AI fills in a first draft in a few seconds, and the person can change it before saving.
- With the key removed, the screen still works, without the AI button.
- Your 3 inputs come out close to the answers you wrote.

## If it breaks

**`/api/ai` says `"on":false`.** The key isn't set where the app is running. On your laptop: check the line in `.env.local` says exactly `GEMINI_API_KEY=` followed by the key, then restart `npm run dev`. On your live link: add it in Vercel, then **Redeploy**.

**AI says it did not answer.** The terminal, or **Logs** on Vercel, shows why:
- **API key not valid**: copy the key from AI Studio again.
- **429**: you've hit the free limit for now. Wait a minute, or try again tomorrow.
- **404, model not found**: set `GEMINI_MODEL` to a current Flash model listed in AI Studio.

## Commit now

```text
Use AI for [the step], with a check before saving
```
