import { Input } from "@/components/ui/input";
import { useAddPaymentMethod } from "../../hooks/useAddPaymentMethod";
import * as ShadForm from "@/components/ui/form";
import { Modal } from "@/components/shared/Modal/Modal";
import { Button } from "@/components/ui/button";
import { ArrowRightCircle } from "lucide-react";
import { LoaderSpinner } from "@/components/shared/LoaderSpinner/LoaderSpinner";
import { useEditPaymentMethod } from "../../hooks/useEditPaymentMethod";
import { usePaymentMethods } from "../../Providers/PaymentMethodsProvider";

export function AddPaymentMethodForm() {
    const { form, submitHandler } = useAddPaymentMethod();

    return (
        <ShadForm.Form {...form}>
            <form onSubmit={form.handleSubmit(submitHandler)} className="flex gap-2">
                <ShadForm.FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <ShadForm.FormItem className="w-full">
                            <ShadForm.FormControl>
                                <Input {...field} placeholder="Agregar método de pago" />
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

export function EditPaymentMethodForm() {
    const { form, submitHandler } = useEditPaymentMethod();
    const { openEditForm, handleCloseEditForm } = usePaymentMethods();

    return (
        <Modal
            isOpen={openEditForm}
            onClose={handleCloseEditForm}
            title="Editar Método de pago"
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
