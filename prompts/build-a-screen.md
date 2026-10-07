# Build a screen

**When to use it:** for each screen of your flow, once you know what it shows and what it saves.

Replace every `[bracket]`, brackets and all. Paste it into the chat in Cursor.

```text
I'm building the [screen name] screen. It covers step [number] of my core flow
in frameworks/03-flows.md: [what the person does on this screen].
It shows [what's on it] and saves [what it saves, or nothing].
Its table is [your_table], with columns [columns, from frameworks/04-data.md].

Build it by copying the example pattern:
1. Copy the folder app/(app)/example/ to app/(app)/[your-screen]/.
   Rename every example_items, ExampleItem and "example" inside it to my table
   and screen. Keep the comments, and update them to match.
2. If lib/data/[your-table].ts doesn't exist yet, copy
   lib/data/example-items.ts to it and rename the same way. Change
   SAMPLE_ROWS to 3 rows that fit my screen. Keep both halves of every
   function: sample mode and Supabase.
3. Change the fields in the forms and the Zod check in actions.ts to my columns.
   Keep the same steps in every action: getUserId(), then Zod, then save, then
   revalidatePath.
4. Use the pieces in components/ (Button, Field, Card, EmptyState, PageHeader)
   and the classes in app/globals.css. Don't add packages.
5. Add one line to TABS in components/Nav.tsx for this screen.
6. It must work on a phone 360px wide.
Leave the example folder as it is. Then tell me, file by file, what you
changed, in plain words.
```

**When it works:** a new tab opens your screen, with your 3 sample rows, and you can add, edit and delete one.
