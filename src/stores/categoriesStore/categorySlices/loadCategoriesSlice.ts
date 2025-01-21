import { createAsyncSlice } from "@/lib/asyncSlices";
import { CategoriesBaseState } from "../categoriesStore";
import { Category, SharedDataProp } from "@/definitions/data";
import { PaginatedData } from "@/definitions/helpers";
import Database from '@tauri-apps/plugin-sql'

export const loadCategoriesSlice = createAsyncSlice<CategoriesBaseState, PaginatedData<Category[]>>({
    execute: async ({ get, set }) => {
        const db = await Database.load('sqlite:datiles.db')
        const baseState = get().categories;

        const [totalCategoryStoredRows] = await db.select<Array<{ total: number }>>(`
                SELECT COUNT(*) AS total
                FROM categories;
            `
        )

        const totalCategoryPages = Math.ceil(totalCategoryStoredRows.total / baseState.pageSize);

        const paginatedCategories = await db.select<Array<Category & SharedDataProp>>(`
            SELECT *
            FROM categories
            ORDER BY id DESC
            LIMIT ? OFFSET ?;
        `, [baseState.pageSize, baseState.currentPage - 1])

        set((prev) => ({
            ...prev,
            categories: {
                ...baseState,
                data: [...paginatedCategories],
                totalPages: totalCategoryPages,
                nextPage: baseState.currentPage + 1,
                prevPage: baseState.currentPage - 1,
            }
        }))
    }
})
