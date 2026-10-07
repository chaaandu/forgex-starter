# Fix an error

**When to use it:** any time something breaks: a red screen, an error in the terminal, a failed deploy on Vercel, or a screen that does the wrong thing.

Copy the whole error, not the first line. Replace every `[bracket]`, brackets and all. Paste it into the chat in Cursor.

```text
Something broke. Help me understand it before you change anything.

What I did: [the last thing you changed, or the button you tapped]
Where: [on my laptop / on my live link / in the Vercel build]
What I expected: [ ]
What happened: [ ]
The full error:
[paste the whole error here]

1. Explain in plain words what the error means, and which file and line it
   points to.
2. Tell me the most likely cause, and the second most likely.
3. Propose the smallest change that fixes it. Show me the change and wait
   for me to say yes.
4. Tell me how to check it's fixed.
Don't change files I haven't mentioned unless you tell me why first.
Don't add packages, and don't run npm audit fix --force.
```

**When it works:** you know why it broke, the fix is a few lines, and `npm run build` passes again.

**Where errors show up:**

- **On your laptop:** the terminal where `npm run dev` is running, and the red box in the browser.
- **On your live link:** your project on Vercel, then **Logs**.
- **A failed deploy:** Vercel, **Deployments**, the one marked **Error**, then its build log.
