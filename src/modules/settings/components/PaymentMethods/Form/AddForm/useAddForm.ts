import { useForm } from "react-hook-form";
import { paymentMethodFormSchema } from "../schema";
import { usePaymentMethodsStore } from "@/stores/paymentMethodsStore/paymentMethodStore";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";

export const useAddPaymentMethodForm = () => {
    const { toast } = useToast()

    const { addPaymentMethod, loadPaymentMethods } = usePaymentMethodsStore()

    const paymentMethodForm = useForm<z.infer<typeof paymentMethodFormSchema>>({
        defaultValues: {
            active: true,
            name: ''
        },
        resolver: zodResolver(paymentMethodFormSchema)
    })

    const handleSubmit = paymentMethodForm.handleSubmit((values) => {
        addPaymentMethod.run({
            onSuccess: () => {
                loadPaymentMethods.run()
                paymentMethodForm.reset()
                toast({ title: 'Método de pago agregado correctamente' })
            },
            onError: (err) => {
                toast({
                    title: 'Error al agregar método de pago',
                    description: err
                })
            }
        }, values)
    })

    return {
        paymentMethodForm,
        handleSubmit
    }
}
