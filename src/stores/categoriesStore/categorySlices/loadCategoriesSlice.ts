import { createAsyncSlice } from "@/lib/asyncSlices";
import { CategoriesBaseState } from "../categoriesStore";
import { Category, SharedDataProp } from "@/definitions/data";
import { db } from "@/lib/database";
import { PaginatedData } from "@/definitions/helpers";

export const loadCategoriesSlice = createAsyncSlice<CategoriesBaseState, PaginatedData<Category[]>>({
    execute: async ({ get, set }) => {

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
