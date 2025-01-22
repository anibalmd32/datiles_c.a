import { z } from "zod";
import { Product } from "@/definitions/data";

export const productFormSchema: z.ZodType<Product> = z.object({
    code: z.string().min(1, { message: 'Requerido' }),
    name: z.string().min(1, { message: 'Requerido' }),
    purchase_bs: z.string().min(1, { message: 'Requerido' }),
    purchase_usd: z.string().min(1, { message: 'Requerido' }),
    sale_bs: z.string().min(1, { message: 'Requerido' }),
    sale_usd: z.string().min(1, { message: 'Requerido' }),
    quantity: z.number().min(1, { message: 'Requerido' }),
    unit_id: z.number().nullable(),
    category_id: z.number().nullable(),
})