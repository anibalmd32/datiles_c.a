import { createAsyncSlice } from "@/lib/asyncSlices";
import { CategoriesBaseState } from "../categoriesStore";
import { Category, SharedDataProp } from "@/definitions/data";
import Database from '@tauri-apps/plugin-sql'

export const deleteCategorySlice = createAsyncSlice<CategoriesBaseState, Category & SharedDataProp>({
    execute: async ({ get, set }, values) => {
        if (values) {
            const db = await Database.load('sqlite:datiles.db')
            const baseState = get().categories;
            
            const queryResult = await db.execute(
                'DELETE FROM categories WHERE id = ?',
                [values.id]
            )

            if (queryResult.lastInsertId) {
                set((prev) => ({
                    ...prev,
                    categories: {
                        ...baseState,
                        data: baseState.data.filter(category => category.id !== queryResult.lastInsertId)
                    }
                }))
            }
        }
    }
})
