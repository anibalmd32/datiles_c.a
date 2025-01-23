import { createAsyncSlice } from "@/lib/asyncSlices";
import { PaymentMethodsBaseState } from "../paymentMethodStore";
import Database from "@tauri-apps/plugin-sql";

export const changePaymentMethodStatusSlice = createAsyncSlice<
    PaymentMethodsBaseState,
    { id: number, status: boolean }
>({
    execute: async ({ get, set }, values) => {
        const db = await Database.load('sqlite:datiles.db')
        const paymentMethodsState = get().paymentMethods

        if (values) {
            const queryResult = await db.execute(`
                UPDATE payment_methods
                SET active = ?
                WHERE id = ?;
            `, [values.status, values.id])

            if (queryResult.rowsAffected >=1 ) {
                set((prev) => ({
                    ...prev,
                    paymentMethods: paymentMethodsState.map(paymentMethod => {
                        if (paymentMethod.id === values.id) {
                            return {...paymentMethod, active: values.status}
                        } else {
                            return paymentMethod
                        }
                    })
                }))
            }
        }

        return values
    }
})
