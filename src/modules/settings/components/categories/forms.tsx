import { Input } from "@/components/ui/input";
import { useAddCategory } from "../../hooks/useAddCategory";
import * as ShadForm from "@/components/ui/form";
import { Modal } from "@/components/shared/Modal/Modal";
import { Button } from "@/components/ui/button";
import { ArrowRightCircle } from "lucide-react";
import { LoaderSpinner } from "@/components/shared/LoaderSpinner/LoaderSpinner";
import { useEditCategory } from "../../hooks/useEditCategory";
import { useCategories } from "../../Providers/CategoriesProvider";

export function AddCategoryForm() {
    const { form, submitHandler } = useAddCategory();

    return (
        <ShadForm.Form {...form}>
            <form onSubmit={form.handleSubmit(submitHandler)} className="flex gap-2">
                <ShadForm.FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <ShadForm.FormItem className="w-full">
                            <ShadForm.FormControl>
                                <Input {...field} placeholder="Agregar categoría" />
                            </ShadForm.FormControl>
                            <ShadForm.FormMessage />
                        </ShadForm.FormItem>
                    )}
                />
                <Button type="submit">
                    {form.formState.isSubmitting ? (
                        <LoaderSpinner color="white" />
                    ) : (
                        <ArrowRightCircle />
                    )}
                </Button>
            </form>
        </ShadForm.Form>
    );
}

export function EditCategoryForm() {
    const { form, submitHandler } = useEditCategory();
    const { openEditForm, handleCloseEditForm } = useCategories();

    return (
        <Modal
            isOpen={openEditForm}
            onClose={handleCloseEditForm}
            title="Editar categoría"
        >
            <ShadForm.Form {...form}>
                <form
                    onSubmit={form.handleSubmit(submitHandler)}
                    className="flex gap-2"
                >
                    <ShadForm.FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <ShadForm.FormItem className="w-full">
                                <ShadForm.FormControl>
                                    <Input {...field} />
                                </ShadForm.FormControl>
                                <ShadForm.FormMessage />
                            </ShadForm.FormItem>
                        )}
                    />
                    <Button type="submit">
                        {form.formState.isSubmitting ? (
                            <LoaderSpinner color="white" />
                        ) : (
                            <ArrowRightCircle />
                        )}
                    </Button>
                </form>
            </ShadForm.Form>
        </Modal>
    );
}
