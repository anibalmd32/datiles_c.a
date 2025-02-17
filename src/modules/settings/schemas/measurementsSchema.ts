import { z } from "zod";

export const measurementSchema = z.object({
    name: z.string().min(3, { message: "Debe tener al menos tres letras" }),
    stock_mode_id: z
        .number()
        .min(1, {
            message: "Debe estar relacionado con un modo de almacenamiento",
        }),
});

export type MeasurementFormType = z.infer<typeof measurementSchema>;
