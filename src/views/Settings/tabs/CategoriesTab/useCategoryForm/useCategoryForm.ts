import { useForm } from 'react-hook-form'
import { categoryFormSchema } from "./categoryFormSchema";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { useCategoriesStore } from '@/stores/categoriesStore/categoriesStore';
import { useToast } from "@/hooks/use-toast";
import { useState } from 'react';

export const useCategoryForm = () => {
    const [categoryId, setCategoryId] = useState<number | null>(null)

    const { toast } = useToast()

    const { categories, updateCategory, addCategory } = useCategoriesStore()

    const categoryForm = useForm<z.infer<typeof categoryFormSchema>>({
            defaultValues: { name: '' },
        resolver: zodResolver(categoryFormSchema)
    })

    const handleEditCategory = (id: number) => setCategoryId(id)

    const handleSubmitCategory = categoryForm.handleSubmit(async (values: z.infer<typeof categoryFormSchema>) => {
        if (categoryId) {
            const categoryCurrentData = categories.data.find(category => category.id === categoryId)

            categoryCurrentData && await updateCategory.run({
                onSuccess: () => {
                    toast({
                        title: 'Actualización exitosa',
                        description: `Se ha actualizado el nombre categoría ${categoryCurrentData.name} a ${values.name}`,
                        duration: 3000,
                    })
                },
                onError: (err) => {
                    toast({
                        title: 'Error al actualizar',
                        description: `Ha ocurrido un erro al actualizar la categoría ${categoryCurrentData.name}: ${err}`,
                        variant: 'destructive'
                    })
                },
                onFinish: () => {
                    categoryForm.reset()
                    categoryForm.setValue('name', '')
                    setCategoryId(null)
                }
            }, {
                ...categoryCurrentData,
                name: values.name
            })

        } else {
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
                    categoryForm.reset()
                    categoryForm.setValue('name', '')
                }
            }, values)
        }
    })

    return {
        categoryForm,
        handleSubmitCategory,
        handleEditCategory,
        categoryId
    }
}