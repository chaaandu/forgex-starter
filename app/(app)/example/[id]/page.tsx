// Screen: one example row, at /example/[id]. Edit it, or delete it.
//
// COPY THIS FOLDER FOR EACH SCREEN OF YOUR FLOW, THEN RENAME.
// [id] in the folder name means this part of the address changes: /example/abc
// opens the row whose id is abc. Next.js hands it to the page as params.id.

import Link from 'next/link'
import { notFound } from 'next/navigation'
import { appConfig } from '@/lib/config'
import { getUserId } from '@/lib/auth'
import { EXAMPLE_STATUSES, getExampleItem } from '@/lib/data/example-items'
import Button from '@/components/Button'
import Card from '@/components/Card'
import Field from '@/components/Field'
import PageHeader from '@/components/PageHeader'
import { deleteItemAction, updateItemAction } from '../actions'

export const metadata = { title: `Edit · ${appConfig.name}` }

export default async function EditExamplePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  // 1. Who is this? Then load the row, only if it's theirs.
  const userId = await getUserId()
  const item = await getExampleItem(userId, id)
  if (!item) notFound()

  // 2. bind() fixes which row each action works on, so the form can't change it.
  const save = updateItemAction.bind(null, item.id)
  const remove = deleteItemAction.bind(null, item.id)

  return (
    <div className="space-y-6">
      <Link href="/example" className="inline-block text-sm text-brand underline">
        Back to the list
      </Link>

      <PageHeader title="Edit this item" />

      <Card>
        <form action={save} className="space-y-4">
          <Field label="Title" name="title" defaultValue={item.title} required maxLength={120} />
          <Field label="Note" name="note" defaultValue={item.note} multiline maxLength={1000} />
          <div>
            <label className="label" htmlFor="status">
              Status
            </label>
            <select id="status" name="status" className="field" defaultValue={item.status}>
              {EXAMPLE_STATUSES.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>
          <Button className="w-full">Save changes</Button>
        </form>
      </Card>

      <form action={remove}>
        <Button look="quiet" className="w-full">
          Delete this item
        </Button>
      </form>
    </div>
  )
}
