import { createAsyncSlice } from "@/lib/asyncSlices";
import Database from '@tauri-apps/plugin-sql'
import { ProductsBaseState } from "../useProductsStore";
import { Product, SharedDataProp } from "@/definitions/data";

export const addProductSlice = createAsyncSlice<
    ProductsBaseState,
    Product
>({
    execute: async ({ get, set }, values) => {
        const db = await Database.load('sqlite:datiles.db')
        const productsBaseSate = get().products

        if (values) {
            const queryResult = await db.execute(`
                INSERT INTO products (
                    name,
                    code,
                    category_id,
                    purchase_usd,
                    sale_usd,
                    purchase_bs,
                    sale_bs
                ) VALUES (?, ?, ?, ?, ?, ?, ?);
            `, [
                values.name,
                values.code,
                values.category_id,
                values.purchase_usd,
                values.sale_usd,
                values.purchase_bs,
                values.sale_bs
            ])

            if (queryResult.lastInsertId) {
                const lastInsertResult = await db.select<Array<Product & SharedDataProp>>(
                    'SELECT * FROM products WHERE id = ?;',
                    [queryResult.lastInsertId]
                )

                set((prev) => ({
                    ...prev,
                    products: {
                        ...productsBaseSate,
                        data: [...lastInsertResult, ...productsBaseSate.data]
                    }
                }))
            }
        }
    }
})