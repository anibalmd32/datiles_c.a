import { SubmitHandler, useForm } from "react-hook-form";
import { useCategories } from "../Providers/CategoriesProvider";
import { categorySchema, CategoryFormType } from "../schemas/categorySchema";
import { useAlert } from "@/hooks/useAlert";
import { zodResolver } from "@hookform/resolvers/zod";

export const useAddCategory = () => {
    const { addCategory } = useCategories()
    const { emitErrorAlert, emitSuccessAlert } = useAlert()

    const form = useForm<CategoryFormType>({
        defaultValues: { name: '' },
        resolver: zodResolver(categorySchema)
    })

    const submitHandler: SubmitHandler<CategoryFormType> = async (values) => {
        await addCategory.run({
            onSuccess: () => emitSuccessAlert('Categoría agregada con éxito'),
            onError: () => emitErrorAlert('No se pudo agregar la categoría'),
            onFinish: () => form.reset()
        }, values)
    }

    return {
        form,
        submitHandler,
    }
}
