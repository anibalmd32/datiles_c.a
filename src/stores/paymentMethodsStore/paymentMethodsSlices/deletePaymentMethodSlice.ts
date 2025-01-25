import { createAsyncSlice } from "@/lib/asyncSlices";
import { PaymentMethodsBaseState } from "../paymentMethodStore";
import Database from "@tauri-apps/plugin-sql";

export const deletePaymentMethodSlice = createAsyncSlice<
    PaymentMethodsBaseState,
    { paymentMethodId: number }
>({
    execute: async ({}, values) => {
        const db = await Database.load('sqlite:datiles.db')

        if (values?.paymentMethodId) {
            const queryResult = await db.execute(
                'DELETE FROM payment_methods WHERE id = ?',
                [values?.paymentMethodId]
            )

            if (queryResult.rowsAffected >= 1) {
                return { paymentMethodId: values.paymentMethodId }
            }
        }
    }
})
