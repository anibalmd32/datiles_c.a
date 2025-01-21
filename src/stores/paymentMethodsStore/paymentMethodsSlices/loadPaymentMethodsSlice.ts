import { createAsyncSlice } from "@/lib/asyncSlices";
import { PaymentMethod, SharedDataProp } from "@/definitions/data";
import { PaginatedData } from "@/definitions/helpers";
import Database from '@tauri-apps/plugin-sql'
import { PaymentMethodsBaseState } from "../paymentMethodStore";

export const loadPaymentMethodsSlice = createAsyncSlice<
    PaymentMethodsBaseState,
    PaginatedData<PaymentMethod[]>
>({
    execute: async ({ get, set }) => {
        const db = await Database.load('sqlite:datiles.db')
        const baseState = get().paymentMethods;

        const [totalStoredRows] = await db.select<Array<{ total: number }>>(`
            SELECT COUNT(*) AS total
            FROM payment_methods;    
        `);

        const totalPages = Math.ceil(totalStoredRows.total / baseState.pageSize);

        const paginatedData = await db.select<Array<PaymentMethod & SharedDataProp>>(`
            SELECT *
            FROM payment_methods
            ORDER BY id DESC
            LIMIT ? OFFSET ?;
        `, [baseState.pageSize, baseState.currentPage - 1])

        set((prev) => ({
            ...prev,
            paymentMethods: {
                ...baseState,
                data: [...paginatedData.map(d => {
                    // Este mapeo es necesario porque la DB devuelve true o false en string y no como un booleano
                    const statusStr = String(d.active)

                    if (statusStr === 'true') {
                        return {...d, active: true}
                    } else {
                        return {...d, active: false}
                    }
                })],
                totalPages,
                nextPage: baseState.currentPage + 1,
                prevPage: baseState.currentPage - 1,
            }
        }))
    }
})
