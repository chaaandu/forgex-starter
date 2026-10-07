'use server'

// What the example screens save: add, change and delete one row.
//
// COPY THIS FOLDER FOR EACH SCREEN OF YOUR FLOW, THEN RENAME.
// Copy app/(app)/example to app/(app)/[your-screen], and rename example_items
// to your own table everywhere. prompts/build-a-screen.md does it with you.
//
// A server action is a function that runs on the server when a form is sent.
// Every action here does the same 4 things, one after another:
//   1. Who is this? getUserId(), from the session. Never trust a form for this.
//   2. Is the input sensible? Zod checks it.
//   3. Save it, through lib/data/example-items.ts.
//   4. Refresh the screen, and go where the person expects next.

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { z } from 'zod'
import { getUserId } from '@/lib/auth'
import {
  EXAMPLE_STATUSES,
  addExampleItem,
  deleteExampleItem,
  updateExampleItem,
} from '@/lib/data/example-items'

// What a valid form looks like. Change the limits to fit your own fields.
const ItemForm = z.object({
  title: z.string().trim().min(1).max(120),
  note: z.string().trim().max(1000),
  status: z.enum(EXAMPLE_STATUSES),
})

// Reads the form's fields by their name="" in the page.
function readForm(formData: FormData) {
  return ItemForm.parse({
    title: formData.get('title'),
    note: formData.get('note') ?? '',
    status: formData.get('status') ?? 'open',
  })
}

export async function addItemAction(formData: FormData) {
  const userId = await getUserId()
  const item = readForm(formData)
  await addExampleItem(userId, item)
  revalidatePath('/example')
}

export async function updateItemAction(id: string, formData: FormData) {
  const userId = await getUserId()
  const item = readForm(formData)
  await updateExampleItem(userId, id, item)
  revalidatePath('/example')
  redirect('/example')
}

export async function deleteItemAction(id: string) {
  const userId = await getUserId()
  await deleteExampleItem(userId, id)
  revalidatePath('/example')
  redirect('/example')
}
