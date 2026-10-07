# Use AI for one step

**When to use it:** optional. When one step of your flow is slow or hard for a person, and AI could do the first draft for them to check.

AI is off until you set a key (`cards/extra-ai.md`). Your app must still work when it's off.

Replace every `[bracket]`, brackets and all. Paste it into the chat in Cursor.

```text
Step [number] of my core flow in frameworks/03-flows.md is: [the step].
It's slow or hard because [why, from your research].
I want AI to [what AI should produce] from [what the person gives it].
The person always checks and can change the result before it's saved.

Read lib/ai.ts, app/api/ai/route.ts and app/(app)/[your-screen]/.
1. Write the instructions askAI() will get, as a constant next to where it's
   called: who the AI is helping, what it gets, exactly what to give back,
   and what to do when the input makes no sense. Don't change lib/ai.ts.
   Show me 3 example inputs and the answer you'd expect.
2. Call it from a server action in app/(app)/[your-screen]/actions.ts, with
   askAI({ instructions, input }). Keep getUserId() and a Zod check first.
   Or, if the screen needs it without a page reload, put the instructions in
   INSTRUCTIONS in app/api/ai/route.ts and call /api/ai from the screen.
3. Put the AI's answer in a form the person can change before they save.
4. If aiIsOn() from lib/env.ts is false, hide the AI button. If AI fails,
   keep what the person typed and say so.
Don't add packages. Don't put any key in the code.
```

**When it works:** the AI fills in a first draft in a few seconds, you can change it before saving, and with the key removed the screen works without AI.
