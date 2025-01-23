import { createAsyncSlice } from "@/lib/asyncSlices";
import { PaymentMethod, SharedDataProp } from "@/definitions/data";
import Database from '@tauri-apps/plugin-sql'
import { PaymentMethodsBaseState } from "../paymentMethodStore";

export const loadPaymentMethodsSlice = createAsyncSlice<
    PaymentMethodsBaseState,
    Array<PaymentMethod & SharedDataProp>
>({
    execute: async ({ get, set }) => {
        const db = await Database.load('sqlite:datiles.db')
        const filtersState = get().filters
        const paginationState = get().pagination

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
            paginationState.pageSize,
            (paginationState.currentPage - 1) * paginationState.pageSize
        ]

        if (filtersState.search?.trim()) {
            const searchValue = filtersState.search.replace(/[%_]/g, "\\$&");

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
                paginationState.pageSize,
                (paginationState.currentPage - 1) * paginationState.pageSize
            ]
        }

        const [totalStoredRows] = await db.select<Array<{ total: number }>>(
            countSql,
            countParams
        );

        const totalPages = Math.ceil(totalStoredRows.total / paginationState.pageSize);

        const paginatedData = await db.select<Array<PaymentMethod & SharedDataProp>>(
            selectSql,
            selectParams    
        )

        set((prev) => ({
            ...prev,
            paymentMethods: [...paginatedData.map(d => {
                // Este mapeo es necesario porque la DB devuelve true o false en string y no como un booleano
                const statusStr = String(d.active)

                if (statusStr === 'true') {
                    return {...d, active: true}
                } else {
                    return {...d, active: false}
                }
            })],
            pagination: {
                ...prev.pagination,
                totalPages
            }
        }))
    }
})
