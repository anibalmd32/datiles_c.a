import { useCategoriesStore } from '@/stores/categoriesStore/categoriesStore';
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { categoryFormSchema } from '../categoryFormSchema';

export const useAddCategory = () => {
    const { toast } = useToast()
    
    const addCategory= useCategoriesStore(store => store.addCategory)

    const addCategoryForm = useForm<z.infer<typeof categoryFormSchema>>({
        defaultValues: { name: '' },
        resolver: zodResolver(categoryFormSchema)
    })

    const onSubmit = addCategoryForm.handleSubmit(async (values) => {
        await addCategory.run({
            onSuccess: () => {
                toast({
                    title: 'Creada con éxito',
                    description: ` La categoría ${values.name} fue agregada con éxito`,
                    duration: 3000
                })
            },
            onError: (err) => {
                toast({
                    title: 'Error al crear categoría',
                    description: `Ocurrió un error al crear la categoría ${values.name}: ${err}`,
                    variant: 'destructive'
                })
            },
            onFinish: () => {
                addCategoryForm.reset()
            }
        }, values)
    })

    return {
        addCategoryForm,
        onSubmit,
    }
}
