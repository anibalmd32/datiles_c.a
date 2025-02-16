import * as ShadForm from '@/components/ui/form'
import { Button } from "@/components/ui/button";
import { ArrowRightCircle } from "lucide-react";
import { LoaderSpinner } from "@/components/shared/LoaderSpinner/LoaderSpinner";
import { Input } from "@/components/ui/input";
import { useAddStockMode } from '../../hooks/useAddStockMode';
import { useEditStockMode } from '../../hooks/useEditStockMode';
import { Modal } from '@/components/shared/Modal/Modal';

export function AddStockModeForm() {
    const { form, submitHandler } = useAddStockMode()

    return (
        <ShadForm.Form {...form}>
            <form onSubmit={form.handleSubmit(submitHandler)} className="flex gap-2">
                <ShadForm.FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <ShadForm.FormItem className="w-full">
                            <ShadForm.FormControl>
                                <Input {...field} placeholder="Agregar modo de almacenamiento" />
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

export function EditStockModeForm() {
    const { form, openForm, setOpenForm, submitHandler } = useEditStockMode()

    return (
        <Modal
            isOpen={openForm}
            onClose={() => setOpenForm(false)}
            title="Editar Modo de Almacenamiento"
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

