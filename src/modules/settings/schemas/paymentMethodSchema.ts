import { z } from "zod";

export const paymentMethodSchema = z.object({
    name: z.string().min(3, { message: "Debe tener al menos tres letras" }),
});

export type PaymentMethodFormType = z.infer<typeof paymentMethodSchema>;
