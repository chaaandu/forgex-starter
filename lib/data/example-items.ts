// Every read and write for the example_items table, in one file.
//
// COPY THIS FILE FOR EACH TABLE YOU ADD, THEN RENAME.
// For a table called [your_table], make lib/data/[your-table].ts and change
// the names inside. prompts/add-a-table.md does it with you.
//
// Each function does one of two things, side by side:
//   1. SAMPLE MODE: before Supabase is connected, it uses the sample rows below,
//      kept in the server's memory.
//   2. SUPABASE: after, it asks your database.
// So a screen looks the same either way, and you can build it before you
// connect anything.
//
// Every Supabase query also filters by owner_id. The row-level security rules
// in supabase/migrations/0001_base.sql check it a second time, inside the
// database, so one person can never read another person's rows.

import { supabaseIsSet } from '@/lib/env'
import { createClient } from '@/lib/supabase/server'
import { SAMPLE_USER_ID } from '@/lib/auth'

// ---------- The shape of one row ----------

// The two statuses a row can have. They match the check in the migration.
// Rename them, or add more, once you know what your own flow needs.
export const EXAMPLE_STATUSES = ['open', 'done'] as const
export type ExampleStatus = (typeof EXAMPLE_STATUSES)[number]

// One row of example_items. The names match the columns in the migration.
export type ExampleItem = {
  id: string
  title: string
  note: string
  status: ExampleStatus
  created_at: string
}

// What a form sends when it adds or changes a row.
export type ExampleItemInput = {
  title: string
  note: string
  status: ExampleStatus
}

// ---------- 1. Sample mode: rows kept in memory ----------

// Meaningless on purpose. Replace them with rows that fit your own flow.
const SAMPLE_ROWS: ExampleItem[] = [
  {
    id: 'sample-1',
    title: 'Example item A',
    note: 'Open this to edit it. Rename the table once you know your flow.',
    status: 'open',
    created_at: '2026-10-12T04:30:00.000Z',
  },
  {
    id: 'sample-2',
    title: 'Example item B',
    note: 'Tap Delete to see how removing a row works.',
    status: 'open',
    created_at: '2026-10-12T05:00:00.000Z',
  },
  {
    id: 'sample-3',
    title: 'Example item C',
    note: 'This one is marked done.',
    status: 'done',
    created_at: '2026-10-12T05:30:00.000Z',
  },
]

// Next.js can load a file more than once while it runs, and each copy would
// keep its own list. So the sample rows live in one shared place for the whole
// server (globalThis). They start again from SAMPLE_ROWS when the server
// restarts or when you save this file. Nothing here is saved for good.
type SampleStore = { from: string; rows: (ExampleItem & { owner_id: string })[] }
const shared = globalThis as typeof globalThis & { exampleItemsStore?: SampleStore }

function sampleRows(): SampleStore['rows'] {
  const from = JSON.stringify(SAMPLE_ROWS)
  if (shared.exampleItemsStore?.from !== from) {
    shared.exampleItemsStore = {
      from,
      rows: SAMPLE_ROWS.map((row) => ({ ...row, owner_id: SAMPLE_USER_ID })),
    }
  }
  return shared.exampleItemsStore.rows
}

// ---------- 2. Supabase: the columns we read ----------

const COLUMNS = 'id, title, note, status, created_at'

// ---------- Read ----------

// All of one person's rows, newest first.
export async function listExampleItems(ownerId: string): Promise<ExampleItem[]> {
  // 1. Sample mode
  if (!supabaseIsSet()) {
    return sampleRows()
      .filter((row) => row.owner_id === ownerId)
      .sort((a, b) => b.created_at.localeCompare(a.created_at))
  }

  // 2. Supabase
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('example_items')
    .select(COLUMNS)
    .eq('owner_id', ownerId)
    .order('created_at', { ascending: false })
  if (error) throw new Error(`Could not load example_items: ${error.message}`)
  return data as ExampleItem[]
}

// One row, or null if it doesn't exist or isn't theirs.
export async function getExampleItem(ownerId: string, id: string): Promise<ExampleItem | null> {
  // 1. Sample mode
  if (!supabaseIsSet()) {
    return sampleRows().find((row) => row.id === id && row.owner_id === ownerId) ?? null
  }

  // 2. Supabase
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('example_items')
    .select(COLUMNS)
    .eq('id', id)
    .eq('owner_id', ownerId)
    .maybeSingle()
  // 22P02 means the id isn't a valid uuid, so there is no such row.
  if (error && error.code !== '22P02') {
    throw new Error(`Could not load the example item: ${error.message}`)
  }
  return (data as ExampleItem | null) ?? null
}

// ---------- Write ----------

export async function addExampleItem(ownerId: string, item: ExampleItemInput): Promise<void> {
  // 1. Sample mode
  if (!supabaseIsSet()) {
    sampleRows().push({
      id: crypto.randomUUID(),
      owner_id: ownerId,
      created_at: new Date().toISOString(),
      ...item,
    })
    return
  }

  // 2. Supabase. owner_id comes from the session (lib/auth.ts), never the form.
  const supabase = await createClient()
  const { error } = await supabase.from('example_items').insert({ owner_id: ownerId, ...item })
  if (error) throw new Error(`Could not add the example item: ${error.message}`)
}

export async function updateExampleItem(
  ownerId: string,
  id: string,
  item: ExampleItemInput,
): Promise<void> {
  // 1. Sample mode
  if (!supabaseIsSet()) {
    const found = sampleRows().find((row) => row.id === id && row.owner_id === ownerId)
    if (found) Object.assign(found, item)
    return
  }

  // 2. Supabase
  const supabase = await createClient()
  const { error } = await supabase
    .from('example_items')
    .update(item)
    .eq('id', id)
    .eq('owner_id', ownerId)
  if (error) throw new Error(`Could not save the example item: ${error.message}`)
}

export async function deleteExampleItem(ownerId: string, id: string): Promise<void> {
  // 1. Sample mode
  if (!supabaseIsSet()) {
    const rows = sampleRows()
    const index = rows.findIndex((row) => row.id === id && row.owner_id === ownerId)
    if (index >= 0) rows.splice(index, 1)
    return
  }

  // 2. Supabase
  const supabase = await createClient()
  const { error } = await supabase
    .from('example_items')
    .delete()
    .eq('id', id)
    .eq('owner_id', ownerId)
  if (error) throw new Error(`Could not delete the example item: ${error.message}`)
}
