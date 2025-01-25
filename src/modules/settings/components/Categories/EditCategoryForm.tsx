import { useForm, Controller, SubmitHandler } from "react-hook-form"
import { categoryFormSchema } from "./categoryFormSchema"
import { CategoryFormType } from "./categoryFormSchema"
import { CategoryData } from "./Categories"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect } from "react"
import { useCategoriesStore } from "@/stores/categoriesStore/categoriesStore"
import { useToast } from "@/hooks/use-toast"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { LoaderSpinner } from "@/components/shared/LoaderSpinner/LoaderSpinner"
import { ArrowRightCircle } from "lucide-react"

type Props = {
    defaultValues: CategoryData | undefined;
    closeForm?: () => void;
}

export function EditCategoryForm({ defaultValues, closeForm }: Props) {
    const { toast } = useToast()
    const { updateCategory } = useCategoriesStore()
    const form = useForm<CategoryFormType>({
        defaultValues: { name: '' },
        resolver: zodResolver(categoryFormSchema)
    })

    useEffect(() => {
        if (defaultValues) {
            form.reset({ name: defaultValues.name })
        }
    }, [defaultValues])

    const submitHandler: SubmitHandler<CategoryFormType> = async (values) => {
        await updateCategory.run({
            onSuccess: () => toast({ title: 'Categoría Actualizada con éxito' }),
            onError: () => toast({ title: 'Error al actualizar categoría', variant: 'destructive' }),
            onFinish: () => closeForm?.()
        }, { ...defaultValues, name: values.name })
    }

    return (
        <div className="w-full">
            <form
                autoComplete="off"
                onSubmit={form.handleSubmit(submitHandler)}
                className="flex justify-between gap-2 w-full"
            >
                <Controller
                    control={form.control}
                    name="name"
                    render={({ field, fieldState }) => (
                        <>
                            <Input {...field} placeholder="Agregar categoría" />
                            {fieldState.error?.message && (
                                <p className="text-red-500">{fieldState.error?.message}</p>
                            )}
                        </>
                    )}
                />

                <Button type="submit">
                    {
                        form.formState.isSubmitting
                            ? <LoaderSpinner color="white" />
                            : <ArrowRightCircle />
                    }
                </Button>
            </form>
        </div>
    )
}

