import { useUpdateCategoryCtx } from "@/modules/settings/Providers/UpdateCategoryProvider";
import { useUpdateCategoryForm } from "./useUpdateCategoryForm";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function UpdateCategoryForm() {
    const updateContext = useUpdateCategoryCtx()
    const form = useUpdateCategoryForm()

    return (
        <Dialog
            open={updateContext.openUpdateCategory}
            onOpenChange={updateContext.handleCloseForm}
        >
            <DialogContent aria-describedby="Formulario de actualización de categoría">
                <DialogHeader>
                    <DialogTitle>
                        Actualizar el nombre de la categoría
                    </DialogTitle>
                </DialogHeader>

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
            </DialogContent>
        </Dialog>
    )
}
