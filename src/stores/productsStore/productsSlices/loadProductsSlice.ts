import { createAsyncSlice } from "@/lib/asyncSlices";
import Database from '@tauri-apps/plugin-sql'
import { ProductsBaseState } from "../useProductsStore";
import { PaginatedData } from "@/definitions/helpers";
import { Product, SharedDataProp } from "@/definitions/data";

export const loadProductsSlice = createAsyncSlice<
    ProductsBaseState,
    PaginatedData<Product[]>
>({
    execute: async ({ get, set }) => {
        const db = await Database.load('sqlite:datiles.db')
        const productsBaseSate = get().products

        const [totalStoredRows] = await db.select<Array<{ total: number }>>(`
            SELECT COUNT(*) AS total
            FROM products;   
        `)

        console.log('Total de filas', totalStoredRows)

        const [totalInvested] = await db.select<Array<{ total_purchase_usd: number; total_purchase_bs: number }>>(`
            SELECT 
                SUM(CAST(purchase_usd AS REAL)) AS total_purchase_usd, 
                SUM(CAST(purchase_bs AS REAL)) AS total_purchase_bs
            FROM products;
        `);

        console.log('Total invertido:', totalInvested)

        const totalPages = Math.ceil(totalStoredRows.total / productsBaseSate.pageSize);

        const paginatedData = await db.select<Array<Product & SharedDataProp>>(`
            SELECT *
            FROM products
            ORDER BY id DESC
            LIMIT ? OFFSET ?    
        `, [productsBaseSate.pageSize, productsBaseSate.currentPage - 1])

        
        console.log('Total de data:', paginatedData)

        set((prev) => ({
            ...prev,
            products: {
                ...productsBaseSate,
                data: [...paginatedData],
                totalPages,
                nextPage: productsBaseSate.currentPage + 1,
                prevPage: productsBaseSate.currentPage - 1,
            },
            totalInvested: {
                bs: totalInvested.total_purchase_bs ?? 0,
                usd: totalInvested.total_purchase_usd ?? 0,
            }
        }))
    }
})
