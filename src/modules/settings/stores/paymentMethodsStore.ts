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
import { PaymentMethod, PaymentMethodData } from "@/definitions/data";

// State Definition
type StoreState = {
    paymentMethods: PaymentMethodData[]
    pagination: PaginationState;
    filters: FilterState
}

// Store instance
export const usePaymentMethodsStore = create<StoreState>()(
    subscribeWithSelector((...a) => ({
        paymentMethods: [],
        ...createFilterSlice()(...a),
        ...createPaginationSlice()(...a)
    }))
)

// Async actions that mutate the store
export const usePaymentMethodsActions = () => {
    const loadPaymentMethods = useAsyncExecute<PaymentMethod>({
        execute: async () => {
            const db = await Database.load('sqlite:datiles.db')
            const { pagination, filters } = usePaymentMethodsStore.getState()

            let countSql = `
                SELECT COUNT(*) AS total
                FROM payment_methods;
            `
            let countParams: Array<string | number> = []

            let selectSql = `
                SELECT *
                FROM payment_methods
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
                    FROM payment_methods
                    WHERE name LIKE '%' || ? || '%';
                `
                countParams = [searchValue]

                selectSql = `
                    SELECT *
                    FROM payment_methods
                    WHERE name LIKE '%' || ? || '%'
                    ORDER BY id DESC
                    LIMIT ? OFFSET ?;
                `
                selectParams = [
                    searchValue,
                    pagination.pageSize,
                    (pagination.currentPage - 1) * pagination.pageSize
                ]
            }

            const [totalCategoryStoredRows] = await db.select<Array<{ total: number }>>(
                countSql,
                countParams
            )

            const totalPages = Math.ceil(totalCategoryStoredRows.total / pagination.pageSize);

            const paginatedData = await db.select<Array<PaymentMethodData>>(
                selectSql,
                selectParams
            )

            usePaymentMethodsStore.setState((state) => ({
                ...state,
                paymentMethods: [...paginatedData.map(pm => {
                    const activeValue = String(pm.active)
                    if (activeValue === 'true') {
                        return {...pm, active: true}
                    }

                    if (activeValue === 'false') {
                        return {...pm, active: false}
                    }

                    return pm
                })],
                pagination: {
                    ...state.pagination,
                    totalPages
                }
            }))
        }
    })

    const addPaymentMethod = useAsyncExecute<PaymentMethod>({
        execute: async (values) => {
            if (values) {
                const db = await Database.load('sqlite:datiles.db')
                await db.execute(
                    'INSERT INTO payment_methods (name, active) VALUES (?, ?)',
                    [values.name, values.active]
                )
            }
        }
    })

    const deletePaymentMethod = useAsyncExecute<PaymentMethodData>({
        execute: async (values) => {
            if (values) {
                const db = await Database.load('sqlite:datiles.db')

                await db.execute(
                    'DELETE FROM payment_methods WHERE id = ?',
                    [values.id]
                )
            }
        }
    })

    const updatePaymentMethod = useAsyncExecute<PaymentMethodData>({
        execute: async (values) => {
            if (values) {
                const db = await Database.load('sqlite:datiles.db')
                const categoriesState = usePaymentMethodsStore.getState().paymentMethods

                const queryResult = await db.execute(
                    'UPDATE payment_methods SET name = ? WHERE id = ?;',
                    [values.name, values.id]
                )

                if (queryResult.rowsAffected >= 1) {
                    usePaymentMethodsStore.setState((prev) => ({
                        ...prev,
                        paymentMethods: [...categoriesState.map(category => {
                            if (category.id === values.id) {
                                return {...category, name: values.name}
                            } else {
                                return {...category}
                            }
                        })]
                    }))
                }
            }
        }
    })

    const updateStatus = useAsyncExecute<{ id: number, status: boolean }>({
        execute: async (values) => {
            if (values) {
                const db = await Database.load('sqlite:datiles.db')

                const queryResult = await db.execute(
                    'UPDATE payment_methods SET active = ? WHERE id = ?',
                    [values.status, values.id]
                )

                if (queryResult.rowsAffected >= 1) {
                    usePaymentMethodsStore.setState((state) => ({
                        ...state,
                        paymentMethods: state.paymentMethods.map(pm => {
                            if (pm.id === values.id) {
                                return {...pm, active: values.status}
                            } else {
                                return pm
                            }
                        })
                    }))
                }

            }
        }
    })

    useEffect(() => {
        const unsubscribe = usePaymentMethodsStore.subscribe(
            (state) => state.pagination.currentPage,
            () => {
                loadPaymentMethods.run()
            }
        )

        return () => {
            unsubscribe();
        };
    }, [])

    useEffect(() => {
        const unsubscribe = usePaymentMethodsStore.subscribe(
            (state) => state.filters.search,
            (newSearch, prevSearch) => {
                const state = usePaymentMethodsStore.getState()

                // Start search
                if (newSearch.trim() && !prevSearch.trim()) {
                    state.pagination.prevPage = state.pagination.currentPage
                    state.pagination.setCurrentPage(1)
                }

                // Input search cleared
                if (!newSearch.trim() && prevSearch.trim()) {
                    state.pagination.setCurrentPage(state.pagination.prevPage)
                }

                loadPaymentMethods.run()
            }
        )

        return () => unsubscribe()
    }, [])

    useEffect(() => {
        if (addPaymentMethod.finished && addPaymentMethod.success && !addPaymentMethod.loading) {
            loadPaymentMethods.run()
            addPaymentMethod.reset()
        }
    }, [addPaymentMethod.finished])

    useEffect(() => {
        if (deletePaymentMethod.finished && deletePaymentMethod.success && !deletePaymentMethod.loading) {
            loadPaymentMethods.run()
            deletePaymentMethod.reset()
        }
    }, [deletePaymentMethod.finished])

    return {
        loadPaymentMethods,
        addPaymentMethod,
        updatePaymentMethod,
        deletePaymentMethod,
        updateStatus,
    }
}
