import { useUpdateCategoryCtx } from "@/modules/settings/Providers/UpdateCategoryProvider";
import { useUpdateCategoryForm } from "./useUpdateCategoryForm";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/shared/Modal/Modal";

export function UpdateCategoryForm() {
    const updateContext = useUpdateCategoryCtx()
    const form = useUpdateCategoryForm()

    return (
        <Modal
            isOpen={updateContext.openUpdateCategory}
            onClose={updateContext.handleCloseForm}
            title="Actualizar el nombre de la categoría"
        >
            <Form {...form.updateCategoryForm}>
                <form autoComplete="off" onSubmit={form.onSubmit} className="space-y-2">
                    <FormField
                        control={form.updateCategoryForm.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button type="submit">
                        Guardar
                    </Button>
                </form>
            </Form>
        </Modal>
    )
}
