import { Input } from "@/components/ui/input";
import * as ShadForm from "@/components/ui/form";
import { Modal } from "@/components/shared/Modal/Modal";
import { Button } from "@/components/ui/button";
import { ArrowRightCircle } from "lucide-react";
import { LoaderSpinner } from "@/components/shared/LoaderSpinner/LoaderSpinner";
import { useMeasurementsUnitForm } from "../../hooks/useMeasurementUnitForm";

export function MeasurementUnitForm() {
    const {
        openForm,
        handleCloseEditForm,
        form,
        submitHandler,
        editDefaultValues,
    } = useMeasurementsUnitForm();

    return (
        <Modal
            isOpen={openForm}
            onClose={handleCloseEditForm}
            title={editDefaultValues?.id ? "Editar" : "Agregar"}
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
