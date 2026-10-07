'use server'

// What happens when you tap a status on an order.

import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import { setOrderStatus } from '@/lib/data'
import { getMyShop } from '@/lib/shop'
import { STATUSES } from '@/lib/types'

const StatusForm = z.object({
  id: z.string().min(1),
  status: z.enum(STATUSES),
})

export async function setStatusAction(formData: FormData) {
  const shop = await getMyShop()
  const { id, status } = StatusForm.parse({
    id: formData.get('id'),
    status: formData.get('status'),
  })
  await setOrderStatus(shop.id, id, status)
  revalidatePath('/orders')
  revalidatePath('/')
}
