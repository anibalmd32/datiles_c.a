import { createAsyncSlice } from "@/lib/asyncSlices";
import { PaymentMethod } from "@/definitions/data";
import { PaymentMethodsBaseState } from "../paymentMethodStore";
import Database from "@tauri-apps/plugin-sql";

export const addPaymentMethodSlice = createAsyncSlice<
    PaymentMethodsBaseState, PaymentMethod
>({
    execute: async ({}, values) => {
        const db = await Database.load('sqlite:datiles.db')

        if (values) {
            await db.execute(
                'INSERT INTO payment_methods(name, active) VALUES(?,?);',
                [values.name, values.active]
            )
        }
    }
})
