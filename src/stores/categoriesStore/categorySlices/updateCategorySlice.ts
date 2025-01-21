import { createAsyncSlice } from "@/lib/asyncSlices";
import { CategoriesBaseState } from "../categoriesStore";
import { Category, SharedDataProp } from "@/definitions/data";
import Database from '@tauri-apps/plugin-sql'

export const updateCategorySlice = createAsyncSlice<CategoriesBaseState, Category & SharedDataProp>({
    execute: async ({ get, set }, values) => {
        if (values) {
            const db = await Database.load('sqlite:datiles.db')
            const baseState = get().categories;

            const queryResult = await db.execute(
                'UPDATE categories SET name = ? WHERE id = ?;',
                [values.name, values.id]
            )

            if (queryResult.rowsAffected >= 1) {
                set((prev) => ({
                    ...prev,
                    categories: {
                        ...baseState,
                        data: baseState.data.map(category => {
                            if (category.id === values.id) {
                                return { ...category, name: values.name }
                            } else {
                                return category
                            }
                        })
                    }
                }))
            }
        }
    }
})
