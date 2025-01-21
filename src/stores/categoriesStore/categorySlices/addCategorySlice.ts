import { createAsyncSlice } from "@/lib/asyncSlices";
import { CategoriesBaseState } from "../categoriesStore";
import { Category, SharedDataProp } from "@/definitions/data";
import Database from '@tauri-apps/plugin-sql'

export const addCategorySlice = createAsyncSlice<CategoriesBaseState, Category>({
    execute: async ({ get, set }, values) => {
        if (values) {
            const db = await Database.load('sqlite:datiles.db')
            const baseState = get().categories
            
            const queryResult = await db.execute(
                'INSERT INTO categories (name) VALUES (?)',
                [values.name]
            )

            console.log('Resultado de agregar:', queryResult)

            if (queryResult.lastInsertId) {
                const lastInsertResult = await db.select<Array<Category & SharedDataProp>>(
                    'SELECT * FROM categories WHERE id = ?',
                    [queryResult.lastInsertId]
                )

                set((prev) => ({
                    ...prev,
                    categories: {
                        ...baseState,
                        data: [...baseState.data, ...lastInsertResult]
                    }
                }))
            }
        }
    }
})
