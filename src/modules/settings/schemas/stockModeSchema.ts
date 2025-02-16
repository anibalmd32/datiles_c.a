import { z } from "zod";

export const stockModeSchema = z.object({
    name: z.string().min(3, { message: "Debe tener al menos tres letras" }),
});

export type StockModeFormType = z.infer<typeof stockModeSchema>;
