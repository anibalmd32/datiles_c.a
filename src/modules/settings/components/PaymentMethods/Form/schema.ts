import { PaymentMethod } from "@/definitions/data";
import { z } from "zod";

export const paymentMethodFormSchema = z.object({
    name: z.string().min(1, { message: 'Requerido '}),
    active: z.boolean(),
}) satisfies z.ZodSchema<PaymentMethod>
