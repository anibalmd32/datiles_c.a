import { z } from "zod";
import { Product } from "@/definitions/data";

export const productFormSchema: z.ZodType<Product> = z.object({
    code: z.string({
        required_error: 'Requerido',
    }).min(1, { message: 'Requerido' }),
    name: z.string({
        required_error: 'Requerido'
    }).min(1, { message: 'Requerido' }),
    purchase_bs: z.string({
        required_error: 'Requerido'
    }).min(1, { message: 'Requerido' }),
    purchase_usd: z.string({
        required_error: 'Requerido'
    }).min(1, { message: 'Requerido' }),
    sale_bs: z.string({
        required_error: 'Requerido'
    }).min(1, { message: 'Requerido' }),
    sale_usd: z.string({
        required_error: 'Requerido'
    }).min(1, { message: 'Requerido' }),
    category_id: z.number().nullable(),
})