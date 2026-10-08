# Build my website

**When to use it:** for your website, the page that explains your product to anyone, apart from the app. Use it for version 1 before phase 1, then come back for version 2 (testimonials) and version 3 (results).

A **landing page** is one public page that says what your product is, who it's for and why it matters. It lives at its own address, so it works even when the app needs a sign-in.

Paste this into Cursor, then fill every `[bracket]` from `frameworks/02-your-solution.md`.

```text
Build a landing page for my product in a new route, app/(site)/welcome/page.tsx.
It must not need sign-in. Use the components in components/ and the colours in
app/globals.css. Mobile first: it should read well on a 390px phone.

My product: [name]
Who it's for: [which kirana owners, where]
The problem, in their words: [2 lines from my research]
My solution, in one line: [from 02-your-solution.md]
How it works, in 3 steps: [step 1], [step 2], [step 3]

Sections, in this order:
1. A headline that names the problem, and one line on the solution.
2. How it works, in 3 steps.
3. Who it's for.
4. [version 2: testimonials. One block per video, with the person's name and a link.]
5. [version 3: results. The numbers from real owners.]
6. A way to reach me or sign up: [phone, email or a form].

Keep each section short. No invented numbers or quotes: leave a clear
placeholder where I haven't got the real one yet.
```

**When it works:** `/welcome` opens on your phone without signing in, and someone who has never met you could say what your product does.

**Commit now:** `Add my website, version [1, 2 or 3]`
