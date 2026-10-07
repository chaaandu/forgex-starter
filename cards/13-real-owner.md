# Put it in your owner's hands

**Card 13** · Sat 24 Oct · Tools: your phone, your owner, Claude, Cursor

## The task

Give your app to one real owner for a day. Watch them use it, count what they do, and fix the one thing that got in their way most.

1. **Your owner.** Sit with them, and have them sign in on their own phone, with their own Google account. Don't explain the screens. Watch, and write down where they pause, ask or tap the wrong thing.
2. **Your owner.** Ask them to use it for real for the rest of the day, in their own way.
3. **You.** At the end of the day, write down the numbers: how many times they opened it, how many rows they made, how long each took, and what they said. Use their words.
4. **Claude.** Paste your notes and ask: what is the one change that would help most?
5. **Cursor.** Make that one change with the prompt below. Commit and push.

## Why it matters

What a real owner does with your app in one day is worth more than a week of building on your own. It's also the heart of your case study.

## Paste this into Cursor

```text
A real owner used my app today. Here is what I saw:
[your notes: where they paused, what they asked, what they tapped by mistake]
Their numbers: [opened it ... times, made ... rows, each took about ...]
What they said: [their words]

The one change I want to make is: [the change].
It's on the [screen name] screen, in app/(app)/[your-screen]/.
Make only that change. Keep sample mode working. Then tell me how to check
it on my phone, and what I should ask the owner tomorrow to see if it helped.
```

## When it works

- Your owner used your app on their own phone, with real data.
- You have numbers and quotes written down, from them, not from you.
- The change that would help them most is live.

## If it breaks

**The owner can't sign in.** Their Google account may be blocked because the app is still in testing. In Google Cloud Console, open **Google Auth Platform**, then **Audience**, and click **Publish app**.

**They used it once and then went back to their old way.** That's a real finding, not a failure. Ask them what made them go back, and write down their exact words for your case study.

## Commit now

```text
Fix [the change] after a day with [owner's first name]
```
