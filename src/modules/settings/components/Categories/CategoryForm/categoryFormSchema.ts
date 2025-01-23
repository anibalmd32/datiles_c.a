import { z } from 'zod'

export const categoryFormSchema = z.object({
    name: z.string({
        invalid_type_error: 'Debe ser letras',
        required_error: 'Debe introducir un nombre'
    }).min(3, {
        message: 'Debe tener al menos tres letras'
    })
})