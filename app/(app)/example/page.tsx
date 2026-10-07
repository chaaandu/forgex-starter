// Screen: the example list, at /example. Shows every row, and a form to add one.
//
// COPY THIS FOLDER FOR EACH SCREEN OF YOUR FLOW, THEN RENAME.
// Copy app/(app)/example to app/(app)/[your-screen]. Then rename example_items,
// its fields (title, note, status) and the words on screen to your own.
// prompts/build-a-screen.md does it with you.
//
// The data is meaningless on purpose. It is here to show the pattern:
//   page.tsx       the list and the add form (this file)
//   [id]/page.tsx  one row, to edit or delete
//   actions.ts     what each form saves
//   lib/data/example-items.ts  the reads and writes, in sample mode and in Supabase

import Link from 'next/link'
import { appConfig } from '@/lib/config'
import { getUserId } from '@/lib/auth'
import { listExampleItems } from '@/lib/data/example-items'
import { dateInIndia } from '@/lib/format'
import Button from '@/components/Button'
import Card from '@/components/Card'
import EmptyState from '@/components/EmptyState'
import Field from '@/components/Field'
import PageHeader from '@/components/PageHeader'
import { addItemAction } from './actions'

export const metadata = { title: `Example · ${appConfig.name}` }

export default async function ExamplePage() {
  // 1. Who is this? Then load only their rows.
  const userId = await getUserId()
  const items = await listExampleItems(userId)

  return (
    <div className="space-y-6">
      <PageHeader
        title="Example items"
        text="A list, a form to add one, and a screen to edit or delete it."
      />

      {/* 2. The list. */}
      {items.length === 0 ? (
        <EmptyState title="Nothing here yet" text="Add your first one below." />
      ) : (
        <ul className="space-y-3">
          {items.map((item) => (
            <li key={item.id}>
              <Link href={`/example/${item.id}`} className="block">
                <Card className="hover:border-brand">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="truncate font-medium">{item.title}</p>
                      {item.note && <p className="mt-1 text-sm text-muted">{item.note}</p>}
                    </div>
                    <span className="shrink-0 rounded-full border border-line px-2.5 py-0.5 text-xs text-muted">
                      {item.status}
                    </span>
                  </div>
                  <p className="mt-2 text-xs text-muted">Added {dateInIndia(item.created_at)}</p>
                </Card>
              </Link>
            </li>
          ))}
        </ul>
      )}

      {/* 3. The add form. Each field's name="" is what actions.ts reads. */}
      <Card>
        <h2 className="font-semibold">Add one</h2>
        <form action={addItemAction} className="mt-3 space-y-4">
          <Field label="Title" name="title" placeholder="Example item D" required maxLength={120} />
          <Field
            label="Note"
            name="note"
            placeholder="Anything you like"
            multiline
            maxLength={1000}
          />
          <Button className="w-full">Add it</Button>
        </form>
      </Card>
    </div>
  )
}
