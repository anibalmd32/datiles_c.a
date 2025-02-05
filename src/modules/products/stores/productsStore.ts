// React
import { useEffect } from "react";

// Zustand
import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

// Tauri db plugin
import Database from '@tauri-apps/plugin-sql'

// Libs
import { useAsyncExecute } from "@/hooks/useAsyncExecute";
import { createPaginationSlice, PaginationState } from "@/lib/paginationSlice";
import { createFilterSlice, FilterState } from "@/lib/filtersSlice";

// Data Definition
import { Product, ProductData, ProductDynamicValues } from "@/definitions/data";
import { useDolarStore } from "@/hooks/us-dolar-store";

// State Definition
type StoreState = {
    products: Array<ProductData & ProductDynamicValues>;
    pagination: PaginationState;
    filters: FilterState
}

// Store instance
export const useProductsStore = create<StoreState>()(
    subscribeWithSelector((...a) => ({
        products: [],
        ...createFilterSlice()(...a),
        ...createPaginationSlice()(...a)
    }))
)

// Async actions that mutate the store
export const useProductsActions = () => {

    const dolarPrice = useDolarStore(store => store.dolarPrice)

    const loadProducts = useAsyncExecute<Product>({
        execute: async () => {
            const db = await Database.load('sqlite:datiles.db')
            const { pagination, filters } = useProductsStore.getState()

            let countSql = `
                SELECT COUNT(*) AS total
                FROM products;
            `
            let countParams: Array<string | number> = []

            let selectSql = `
                SELECT *
                FROM products
                ORDER BY id DESC
                LIMIT ? OFFSET ?;
            `
            let selectParams: Array<string | number> = [
                pagination.pageSize,
                (pagination.currentPage - 1) * pagination.pageSize
            ]

            if (filters.search?.trim()) {
                const searchValue = filters.search.replace(/[%_]/g, "\\$&");

                countSql = `
                    SELECT COUNT(*) AS total
                    FROM products
                    WHERE name LIKE '%' || ? || '%';
                `
                countParams = [searchValue]

                selectSql = `
                    SELECT
                        p.*,
                        mu.name AS unit,
                        c.name AS category
                    FROM
                        products p
                    JOIN
                        measurement_units mu ON p.unit_id = mu.id
                    JOIN
                        categories c ON p.category_id = c.id
                    WHERE
                        name LIKE '%' || ? || '%'
                    ORDER BY id DESC
                    LIMIT ? OFFSET ?;
                `
                selectParams = [
                    searchValue,
                    pagination.pageSize,
                    (pagination.currentPage - 1) * pagination.pageSize
                ]
            }

            const [totalStoredRows] = await db.select<Array<{ total: number }>>(
                countSql,
                countParams
            )

            const totalPages = Math.ceil(totalStoredRows.total / pagination.pageSize);

            const paginatedData = await db.select<Array<ProductData>>(
                selectSql,
                selectParams
            )

            const productData: Array<ProductData & ProductDynamicValues> = paginatedData.map(item => ({
                ...item,
                sale_bs: String(Number(item.sale_usd) * Number(dolarPrice)),
                revenue_bs: String(Number(item.revenue_usd) * Number(dolarPrice))
            }))

            console.log('Resultado de cargar los productos', productData)

            useProductsStore.setState((state) => ({
                ...state,
                products: [...productData],
                pagination: {
                    ...state.pagination,
                    totalPages
                }
            }))
        }
    })

    const addProducts = useAsyncExecute<Product>({
        execute: async (values) => {
            if (values) {
                const db = await Database.load('sqlite:datiles.db')
                await db.execute(
                    `
                    INSERT INTO
                        products (
                            name,
                            code,
                            purchase_usd,
                            purchase_bs,
                            iva,
                            sale_usd,
                            quantity,
                            revenue_usd,
                            unit_id,
                            category_id
                        )
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                    `,
                    [
                        values.name,
                        values.code,
                        values.purchase_usd,
                        values.purchase_bs,
                        values.iva,
                        values.sale_usd,
                        values.quantity,
                        values.revenue_usd,
                        values.unit_id,
                        values.category_id,
                    ]
                )
            }
        }
    })

    const deleteProducts = useAsyncExecute<ProductData>({
        execute: async (values) => {
            if (values) {
                const db = await Database.load('sqlite:datiles.db')

                await db.execute(
                    'DELETE FROM products WHERE id = ?',
                    [values.id]
                )
            }
        }
    })

    const updateProducts = useAsyncExecute<ProductData>({
        execute: async (values) => {
            if (values) {
                const db = await Database.load('sqlite:datiles.db')
                const state = useProductsStore.getState().products

                const queryResult = await db.execute(
                    'UPDATE products SET name = ? WHERE id = ?;',
                    [values.name, values.id]
                )

                if (queryResult.rowsAffected >= 1) {
                    useProductsStore.setState((prev) => ({
                        ...prev,
                        products: [...state.map(product => {
                            if (product.id === values.id) {
                                return {...product, name: values.name}
                            } else {
                                return {...product}
                            }
                        })]
                    }))
                }
            }
        }
    })

    useEffect(() => {
        const unsubscribe = useProductsStore.subscribe(
            (state) => state.pagination.currentPage,
            () => {
                loadProducts.run()
            }
        )

        return () => {
            unsubscribe();
        };
    }, [])

    useEffect(() => {
        const unsubscribe = useProductsStore.subscribe(
            (state) => state.filters.search,
            (newSearch, prevSearch) => {
                const state = useProductsStore.getState()

                // Start search
                if (newSearch.trim() && !prevSearch.trim()) {
                    state.pagination.prevPage = state.pagination.currentPage
                    state.pagination.setCurrentPage(1)
                }

                // Input search cleared
                if (!newSearch.trim() && prevSearch.trim()) {
                    state.pagination.setCurrentPage(state.pagination.prevPage)
                }

                loadProducts.run()
            }
        )

        return () => unsubscribe()
    }, [])

    useEffect(() => {
        if (addProducts.finished && addProducts.success && !addProducts.loading) {
            loadProducts.run()
            addProducts.reset()
        }
    }, [addProducts.finished])

    useEffect(() => {
        if (deleteProducts.finished && deleteProducts.success && !deleteProducts.loading) {
            loadProducts.run()
            deleteProducts.reset()
        }
    }, [deleteProducts.finished])

    return {
        loadProducts,
        addProducts,
        updateProducts,
        deleteProducts
    }
}

