import { createAsyncSlice } from "@/lib/asyncSlices";
import { PaymentMethod, SharedDataProp } from "@/definitions/data";
import { PaymentMethodsBaseState } from "../paymentMethodStore";
import Database from "@tauri-apps/plugin-sql";

type Data = PaymentMethod & SharedDataProp;

export const editPaymentMethodSlice = createAsyncSlice<
    PaymentMethodsBaseState, Data
>({
    execute: async ({ set, get }, values) => {
        const db = await Database.load('sqlite:datiles.db')
        const paymentMethodsState = get().paymentMethods

        if (values) {
            const queryResult = await db.execute(
                `
                UPDATE
                    payment_methods
                SET
                    name = ?
                WHERE
                    id = ?;
                `,
                [values.name, values.id]
            )

            if (queryResult.rowsAffected >= 1) {
                set((prev) => ({
                    ...prev,
                    paymentMethods: paymentMethodsState.map(i => {
                        if (i.id === values.id) {
                            return {...i, name: values.name }
                        } else {
                            return i
                        }
                    })
                }))
            }
        }
    }
})
