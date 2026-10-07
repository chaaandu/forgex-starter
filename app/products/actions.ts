'use server'

// What happens when you add, change or delete a product.
// Each one: find your shop, check the form with Zod, save, refresh the screen.

import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import { addProduct, deleteProduct, updateProduct } from '@/lib/data'
import { getMyShop } from '@/lib/shop'

// What a product form must contain. Zod turns the price text into a number.
const ProductForm = z.object({
  name: z.string().trim().min(1).max(80),
  price: z.coerce.number().min(0).max(10000000),
  unit: z.string().trim().min(1).max(30),
})

function readForm(formData: FormData) {
  return ProductForm.parse({
    name: formData.get('name'),
    price: formData.get('price'),
    unit: formData.get('unit'),
  })
}

function readId(formData: FormData): string {
  return z.string().min(1).parse(formData.get('id'))
}

export async function addProductAction(formData: FormData) {
  const shop = await getMyShop()
  await addProduct(shop.id, readForm(formData))
  revalidatePath('/products')
}

export async function updateProductAction(formData: FormData) {
  const shop = await getMyShop()
  await updateProduct(shop.id, readId(formData), readForm(formData))
  revalidatePath('/products')
}

export async function deleteProductAction(formData: FormData) {
  const shop = await getMyShop()
  await deleteProduct(shop.id, readId(formData))
  revalidatePath('/products')
}
