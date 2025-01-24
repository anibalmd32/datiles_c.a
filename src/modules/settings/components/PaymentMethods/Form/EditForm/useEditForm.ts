import { usePaymentMethodsStore } from "@/stores/paymentMethodsStore/paymentMethodStore";
import { useUpdatePaymentMethodContext } from "@/modules/settings/Providers/UpdatePaymentMethodProvider";
import { useForm } from "react-hook-form";
import { paymentMethodFormSchema } from "../schema";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";

export const useEditPaymentMethodForm = () => {
    const { toast } = useToast()

    const ctx = useUpdatePaymentMethodContext()

    const { editPaymentMethod } = usePaymentMethodsStore()

    const editPaymentMethodForm = useForm<z.infer<typeof paymentMethodFormSchema>>({
        defaultValues: {
            active: true,
            name: ''
        },
        resolver: zodResolver(paymentMethodFormSchema)
    })

    useEffect(() => {
        if (ctx.paymentMethodToUpdateValues) {
            editPaymentMethodForm.setValue('name', ctx.paymentMethodToUpdateValues.name)
            editPaymentMethodForm.setValue('active', ctx.paymentMethodToUpdateValues.active)
        }
    }, [ctx.paymentMethodToUpdateValues])

    const handleSubmit = editPaymentMethodForm.handleSubmit(async (values) => {
        if (ctx.paymentMethodToUpdateValues) {

            await editPaymentMethod.run({
                onSuccess: () => {
                    toast({ title: 'Método de pago actualizado correctamente' })
                    ctx.handleCloseForm()
                    editPaymentMethodForm.reset()
                }
            }, {
                ...ctx.paymentMethodToUpdateValues,
                name: values.name,
                active: values.active
            })
        }
    })

    return {
        handleSubmit,
        editPaymentMethodForm
    }
}
