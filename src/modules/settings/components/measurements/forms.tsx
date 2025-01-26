import { Input } from "@/components/ui/input";
import { useAddMeasurement } from "../../hooks/useAddMeasurement";
import * as ShadForm from '@/components/ui/form'
import { Modal } from "@/components/shared/Modal/Modal";
import { Button } from "@/components/ui/button";
import { ArrowRightCircle } from "lucide-react";
import { LoaderSpinner } from "@/components/shared/LoaderSpinner/LoaderSpinner";
import { useEditMeasurement } from "../../hooks/useEditMeasurement";
import { useMeasurements } from "../../Providers/MeasurementsProvider";

export function AddMeasurementForm() {
    const { form, submitHandler } = useAddMeasurement()

    return (
        <ShadForm.Form {...form}>
            <form onSubmit={form.handleSubmit(submitHandler)} className="flex gap-2">
                <ShadForm.FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <ShadForm.FormItem className="w-full">
                            <ShadForm.FormControl>
                                <Input {...field} placeholder="Agregar unidad de medida" />
                            </ShadForm.FormControl>
                            <ShadForm.FormMessage />
                        </ShadForm.FormItem>
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
        </ShadForm.Form>
    )
}

export function EditMeasurementForm() {
    const { form, submitHandler } = useEditMeasurement()
    const { openEditForm, handleCloseEditForm } = useMeasurements()

    return (
        <Modal
            isOpen={openEditForm}
            onClose={handleCloseEditForm}
            title="Editar unidad de medida"
        >
            <ShadForm.Form {...form}>
                <form onSubmit={form.handleSubmit(submitHandler)} className="flex gap-2">
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
                        {
                            form.formState.isSubmitting
                                ? <LoaderSpinner color="white" />
                                : <ArrowRightCircle />
                        }
                    </Button>
                </form>
            </ShadForm.Form>
        </Modal>
    )
}

