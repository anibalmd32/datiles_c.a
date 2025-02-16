import { z } from "zod";

const decimalRegex = /^[0-9]+(\.[0-9]{3})*(,[0-9]+)?$/;

export const productSchema = z.object({
    name: z.string().nonempty({ message: "El nombre es requerido" }),
    code: z.string().nullable(),
    purchase_usd: z
        .string()
        .regex(decimalRegex, {
            message: "Formato del monto invalido",
        })
        .nonempty({ message: "El precio de compra en USD es requerido" }),
    purchase_bs: z
        .string()
        .regex(decimalRegex, {
            message: "Formato del monto invalido",
        })
        .nonempty({
            message: "El precio de compra en BS es requerido",
        }),
    sale_usd: z
        .string()
        .regex(decimalRegex, {
            message: "Formato del monto invalido",
        })
        .nonempty({
            message: "El precio de venta en USD es requerido",
        }),
    category_id: z
        .number()
        .refine((value) => value !== null && value !== undefined, {
            message: "La categoría es requerida",
        }),
    quantity: z
        .number()
        .refine((value) => value !== null && value !== undefined, {
            message: "La cantidad es requerida",
        }),
    unit_id: z
        .number()
        .refine((value) => value !== null && value !== undefined, {
            message: "La unidad es requerida",
        }),
    iva: z
        .string()
        .regex(decimalRegex, {
            message: "Formato invalido",
        })
        .nonempty({
            message: "El IVA es requerido",
        }),
    revenue_usd: z
        .string()
        .regex(decimalRegex, {
            message: "Formato invalido",
        })
        .nonempty({
            message: "Requerido",
        }),
});

export type ProductFormType = z.infer<typeof productSchema>;
