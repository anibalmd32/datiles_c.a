import { useCategoriesStore } from '@/stores/categoriesStore/categoriesStore';
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { categoryFormSchema } from '../categoryFormSchema';
import { useUpdateCategoryCtx } from '@/modules/settings/Providers/UpdateCategoryProvider';
import { useEffect } from 'react';

export const useUpdateCategoryForm = () => {

    const { toast } = useToast()

    const updateCategoryContext = useUpdateCategoryCtx()

    const updateCategory = useCategoriesStore(store => store.updateCategory)

    const updateCategoryForm = useForm<z.infer<typeof categoryFormSchema>>({
        defaultValues: { name: '' },
        resolver: zodResolver(categoryFormSchema),
    })

    useEffect(() => {
        if (updateCategoryContext.categoryToUpdateValues) {
            updateCategoryForm.setValue(
                'name',
                updateCategoryContext.categoryToUpdateValues.name
            )
        }
    }, [updateCategoryContext.categoryToUpdateValues])

    const onSubmit = updateCategoryForm.handleSubmit(async (values) => {
        await updateCategory.run({
            onSuccess: () => {
                toast({
                    title: 'Actualización exitosa',
                    description: `Se ha actualizado el nombre categoría ${updateCategoryContext.categoryToUpdateValues!.name} a ${values.name}`,
                    duration: 3000,
                })
            },
            onError: (err) => {
                toast({
                    title: 'Error al actualizar',
                    description: `Ha ocurrido un erro al actualizar la categoría ${updateCategoryContext.categoryToUpdateValues!.name}: ${err}`,
                    variant: 'destructive'
                })
            },
            onFinish: () => {
                updateCategoryForm.reset()
                updateCategoryContext.handleCloseForm()
            }
        }, {...updateCategoryContext.categoryToUpdateValues, name: values.name})
    })

    return {
        updateCategoryForm,
        onSubmit,
    }
}
