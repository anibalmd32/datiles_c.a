import { createAsyncSlice } from "@/lib/asyncSlices";
import { CategoriesBaseState } from "../categoriesStore";
import { Category, SharedDataProp } from "@/definitions/data";
import Database from '@tauri-apps/plugin-sql'

export const deleteCategorySlice = createAsyncSlice<CategoriesBaseState, Category & SharedDataProp>({
    execute: async ({}, values) => {
        if (values) {
            const db = await Database.load('sqlite:datiles.db')
            
            await db.execute(
                'DELETE FROM categories WHERE id = ?',
                [values.id]
            )
        }
    }
})
