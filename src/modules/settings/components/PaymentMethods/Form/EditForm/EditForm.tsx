import { Modal } from "@/components/shared/Modal/Modal";
import * as Form from '@/components/ui/form'
import { useEditPaymentMethodForm } from "./useEditForm";
import { useUpdatePaymentMethodContext } from "@/modules/settings/Providers/UpdatePaymentMethodProvider";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function EditPaymentMethodForm() {
    const form = useEditPaymentMethodForm()
    const context = useUpdatePaymentMethodContext()

    return (
        <Modal
            isOpen={context.openUpdateForm}
            onClose={context.handleCloseForm}
            title="Editar método de pago"
        >
            <Form.Form {...form.editPaymentMethodForm}>
                <form
                    autoComplete="off"
                    className="space-y-2"
                    onSubmit={form.handleSubmit}
                >
                    <Form.FormField
                        control={form.editPaymentMethodForm.control}
                        name="name"
                        render={({ field }) => (
                            <Form.FormItem>
                                <Form.FormControl>
                                    <Input
                                        autoComplete="off"
                                        {...field}
                                    />
                                </Form.FormControl>
                            </Form.FormItem>
                        )}
                    />

                    <Button type="submit">
                        Guardar
                    </Button>
                </form>
            </Form.Form>
        </Modal>
    )
}
