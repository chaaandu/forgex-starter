# Make it work on a phone

**When to use it:** on card 12, and every time you finish a screen. The people you build for will open it on a phone.

First, look for yourself: open your live link on your phone, tap through your whole flow, and write down what's wrong. Replace every `[bracket]`, brackets and all. Paste it into the chat in Cursor.

```text
Make every screen of my app work on a phone 360px wide.
My screens are: [list the folders under app/(app)/].
What I saw on my phone: [what's wrong, screen by screen].

Check each screen, and fix what fails:
1. Nothing is wider than the screen. No sideways scrolling.
2. Every button and link is at least 44px tall, so a thumb can hit it.
   The .btn and .btn-quiet classes in app/globals.css already are.
3. Text boxes use the .field class, so they're 16px and the phone doesn't
   zoom in when you type.
4. Long names and notes wrap or shorten with an ellipsis. They never push
   the layout wider.
5. The main action on each screen is easy to reach with one thumb.
6. Text is readable on the colours in @theme in app/globals.css.
Use Tailwind classes and the components in components/. Don't add packages.
Don't change what any screen does, only how it fits.
List what you changed, screen by screen.
```

**When it works:** you can do your whole flow on your phone, with one thumb, without zooming or scrolling sideways.
