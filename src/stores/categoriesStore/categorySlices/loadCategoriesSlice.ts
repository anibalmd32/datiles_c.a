import { createAsyncSlice } from "@/lib/asyncSlices";
import { CategoriesBaseState } from "../categoriesStore";
import { Category, SharedDataProp } from "@/definitions/data";
import Database from '@tauri-apps/plugin-sql'

export const loadCategoriesSlice = createAsyncSlice<CategoriesBaseState, Category[]>({
    execute: async ({ get, set }) => {
        const db = await Database.load('sqlite:datiles.db')
        const paginationState = get().pagination
        const filtersBaseState = get().filters;

        let countSql = `
            SELECT COUNT(*) AS total
            FROM categories;
        `
        let countParams: Array<string | number> = []

        let selectSql = `
            SELECT *
            FROM categories
            ORDER BY id DESC
            LIMIT ? OFFSET ?;
        `
        let selectParams: Array<string | number> = [
            paginationState.pageSize,
            (paginationState.currentPage - 1) * paginationState.pageSize
        ]

        if (filtersBaseState.search?.trim()) {
            const searchValue = filtersBaseState.search.replace(/[%_]/g, "\\$&");

            countSql = `
                SELECT COUNT(*) AS total
                FROM categories
                WHERE name LIKE '%' || ? || '%';
            `
            countParams = [searchValue]

            selectSql = `
                SELECT *
                FROM categories
                WHERE name LIKE '%' || ? || '%'
                ORDER BY id DESC
                LIMIT ? OFFSET ?;
            `
            selectParams = [
                searchValue,
                paginationState.pageSize,
                (paginationState.currentPage - 1) * paginationState.pageSize
            ]
        }

        const [totalCategoryStoredRows] = await db.select<Array<{ total: number }>>(
            countSql,
            countParams
        )

        const totalPages = Math.ceil(totalCategoryStoredRows.total / paginationState.pageSize);

        const paginatedData = await db.select<Array<Category & SharedDataProp>>(
            selectSql,
            selectParams
        )

        set((prev) => ({
            ...prev,
            categories: [...paginatedData],
            pagination: {
                ...prev.pagination,
                totalPages
            }
        }))
    }
})
