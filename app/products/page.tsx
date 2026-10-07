// Screen: your products. Add them, change them, delete them.

import { appConfig } from '@/lib/config'
import { listProducts } from '@/lib/data'
import { rupees } from '@/lib/format'
import { getMyShop } from '@/lib/shop'
import { addProductAction, deleteProductAction, updateProductAction } from './actions'

export const metadata = { title: `Products · ${appConfig.name}` }

export default async function ProductsPage() {
  const shop = await getMyShop()
  const products = await listProducts(shop.id)

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold">Products</h1>

      {/* Add a product */}
      <form action={addProductAction} className="box space-y-3 p-4">
        <div>
          <label className="label" htmlFor="new-name">
            Name
          </label>
          <input
            id="new-name"
            name="name"
            className="field"
            placeholder="Brownies"
            required
            maxLength={80}
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="label" htmlFor="new-price">
              Price in ₹
            </label>
            <input
              id="new-price"
              name="price"
              className="field"
              type="number"
              inputMode="decimal"
              min="0"
              step="0.01"
              placeholder="360"
              required
            />
          </div>
          <div>
            <label className="label" htmlFor="new-unit">
              Unit
            </label>
            <input
              id="new-unit"
              name="unit"
              className="field"
              placeholder="box of 6"
              required
              maxLength={30}
            />
          </div>
        </div>
        <button className="btn w-full">Add product</button>
      </form>

      {/* The list. Each product opens to show its edit form. */}
      {products.length === 0 ? (
        <p className="text-muted">No products yet. Add the 5 things you sell most.</p>
      ) : (
        <>
          <p className="text-sm text-muted">Tap a product to change or delete it.</p>
          <ul className="box -mt-3 divide-y divide-line">
            {products.map((product) => (
              <li key={product.id}>
                <details className="group">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-3 p-3">
                    <span className="min-w-0">
                      <span className="block truncate font-medium">{product.name}</span>
                      <span className="text-sm text-muted">{product.unit}</span>
                    </span>
                    <span className="shrink-0 font-medium">{rupees(product.price)}</span>
                  </summary>

                  <form action={updateProductAction} className="space-y-3 px-3 pb-4">
                    <input type="hidden" name="id" value={product.id} />
                    <input
                      name="name"
                      className="field"
                      defaultValue={product.name}
                      aria-label="Name"
                      required
                      maxLength={80}
                    />
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        name="price"
                        className="field"
                        type="number"
                        inputMode="decimal"
                        min="0"
                        step="0.01"
                        defaultValue={product.price}
                        aria-label="Price in rupees"
                        required
                      />
                      <input
                        name="unit"
                        className="field"
                        defaultValue={product.unit}
                        aria-label="Unit"
                        required
                        maxLength={30}
                      />
                    </div>
                    <div className="flex gap-3">
                      <button className="btn flex-1">Save changes</button>
                      <button formAction={deleteProductAction} className="btn-quiet flex-1">
                        Delete
                      </button>
                    </div>
                  </form>
                </details>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  )
}
