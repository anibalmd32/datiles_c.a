import { z } from "zod";

export const categorySchema = z.object({
    name: z.string().min(3, { message: 'Debe tener al menos tres letras' })
})

export type CategoryFormType = z.infer<typeof categorySchema>
