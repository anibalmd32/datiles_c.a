import { useCategories } from "../Providers/CategoriesProvider";
import { useAlert } from "@/hooks/useAlert";
import { SubmitHandler, useForm } from "react-hook-form";
import { categorySchema, CategoryFormType } from "../schemas/categorySchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";

export const useEditCategory = () => {
    const { editDefaultValues, updateCategory, handleCloseEditForm } = useCategories()
    const { emitErrorAlert, emitSuccessAlert } = useAlert()

    const form = useForm<CategoryFormType>({
        defaultValues: { name: '' },
        resolver: zodResolver(categorySchema)
    })

    const submitHandler: SubmitHandler<CategoryFormType> = async (values) => {
        if (editDefaultValues) {
            await updateCategory.run({
                onSuccess: () => emitSuccessAlert('Categoría actualiza con éxito'),
                onError: () => emitErrorAlert('Error al actualizar categoría'),
                onFinish: () => handleCloseEditForm()
            }, {...editDefaultValues, name: values.name })
        }
    }

    useEffect(() => {
        if (editDefaultValues) {
            form.reset({ name: editDefaultValues.name })
        }
    }, [editDefaultValues])

    return {
        form,
        submitHandler,
    }
}