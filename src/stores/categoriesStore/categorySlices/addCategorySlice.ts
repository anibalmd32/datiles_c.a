import { createAsyncSlice } from "@/lib/asyncSlices";
import { CategoriesBaseState } from "../categoriesStore";
import { Category } from "@/definitions/data";
import Database from '@tauri-apps/plugin-sql'

export const addCategorySlice = createAsyncSlice<CategoriesBaseState, Category>({
    execute: async ({}, values) => {
        if (values) {
            const db = await Database.load('sqlite:datiles.db')
            
            await db.execute(
                'INSERT INTO categories (name) VALUES (?)',
                [values.name]
            )
        }
    }
})
