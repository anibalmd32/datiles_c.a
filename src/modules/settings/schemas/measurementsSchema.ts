import { z } from "zod";

export const measurementSchema = z.object({
    name: z.string().min(3, { message: "Debe tener al menos tres letras" }),
});

export type MeasurementFormType = z.infer<typeof measurementSchema>;
