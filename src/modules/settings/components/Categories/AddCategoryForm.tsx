import { useForm, Controller, SubmitHandler } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Category, SharedDataProp } from "@/definitions/data"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect } from "react"
import { useCategoriesStore } from "@/stores/categoriesStore/categoriesStore"
import { useToast } from "@/hooks/use-toast"
import { LoaderSpinner } from "@/components/shared/LoaderSpinner/LoaderSpinner"
import { ArrowRightCircle } from "lucide-react"
import { z } from "zod"

const categoryFormSchema = z.object({
    name: z.string().min(3, { message: 'Debe tener al menos tres letras' })
})

type Props = {
    defaultData?: Category & SharedDataProp;
    closeForm?: () => void;
}

type FormType = z.infer<typeof categoryFormSchema>

export const AddCategoryForm = ({
    defaultData,
    closeForm
}: Props) => {
    const { addCategory, loadCategories, updateCategory } = useCategoriesStore()

    const { toast } = useToast()

    const categoryForm = useForm<FormType>({
        resolver: zodResolver(categoryFormSchema),
        defaultValues: { name: '' }
    })

    useEffect(() => {
        if (defaultData) {
            categoryForm.reset({ name: defaultData.name })
        }
    }, [defaultData])

    const handleAddCategory = async (values: FormType) => {
        await addCategory.run({
            onSuccess: async () => {
                await loadCategories.run()
                toast({ title: 'Categoría agregada con éxito' })
            },
            onError: () => toast({ title: 'No se pudo agregar la categoría', variant: 'destructive' }),
            onFinish: () => categoryForm.reset()
        }, values)
    }

    const handleEditCategory = async (values: FormType) => {
        await updateCategory.run({
            onSuccess: () => toast({ title: 'Categoría Actualizada con éxito' }),
            onError: () => toast({ title: 'Error al actualizar categoría', variant: 'destructive' }),
            onFinish: () => closeForm?.()
        }, { ...defaultData, name: values.name })
    }

    const handleSubmitForm: SubmitHandler<FormType> = async (values) => {
        if (defaultData) {
            await handleEditCategory(values)
        } else {
            await handleAddCategory(values)
        }
    }

    return (
        <div className="w-full">
            <form
                autoComplete="off"
                onSubmit={categoryForm.handleSubmit(handleSubmitForm)}
                className="flex justify-between gap-2 w-full"
            >
                <Controller
                    control={categoryForm.control}
                    name="name"
                    render={({ field, fieldState }) => (
                        <div className="flex flex-col">
                            <Input {...field} placeholder="Agregar categoría" />
                            {fieldState.error?.message && (
                                <p className="text-red-500">{fieldState.error?.message}</p>
                            )}
                        </div>
                    )}
                />

                <Button type="submit">
                    {
                        categoryForm.formState.isSubmitting
                            ? <LoaderSpinner color="white" />
                            : <ArrowRightCircle />
                    }
                </Button>
            </form>
        </div>
    )
}