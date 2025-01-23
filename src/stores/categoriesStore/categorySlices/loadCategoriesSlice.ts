import { createAsyncSlice } from "@/lib/asyncSlices";
import { CategoriesBaseState } from "../categoriesStore";
import { Category, SharedDataProp } from "@/definitions/data";
import { PaginatedData } from "@/definitions/helpers";
import Database from '@tauri-apps/plugin-sql'

export const loadCategoriesSlice = createAsyncSlice<CategoriesBaseState, PaginatedData<Category[]>>({
    execute: async ({ get, set }) => {
        const db = await Database.load('sqlite:datiles.db')
        const baseState = get().categories;
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
            baseState.pageSize,
            (baseState.currentPage - 1) * baseState.pageSize
        ]

        if (filtersBaseState.searchValue?.trim()) {
            const searchValue = filtersBaseState.searchValue.replace(/[%_]/g, "\\$&");

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
                baseState.pageSize,
                (baseState.currentPage - 1) * baseState.pageSize
            ]
        }

        const [totalCategoryStoredRows] = await db.select<Array<{ total: number }>>(
            countSql,
            countParams
        )

        const totalCategoryPages = Math.ceil(totalCategoryStoredRows.total / baseState.pageSize);

        const paginatedCategories = await db.select<Array<Category & SharedDataProp>>(
            selectSql,
            selectParams
        )

        set((prev) => ({
            ...prev,
            categories: {
                ...prev.categories,
                data: [...paginatedCategories],
                totalPages: totalCategoryPages,
            }
        }))
    }
})
