import { SubmitHandler, useForm } from "react-hook-form";
import { usePaymentMethods } from "../Providers/PaymentMethodsProvider";
import { paymentMethodSchema, PaymentMethodFormType } from "../schemas/paymentMethodSchema";
import { useAlert } from "@/hooks/useAlert";
import { zodResolver } from "@hookform/resolvers/zod";

export const useAddPaymentMethod = () => {
    const { addPaymentMethod } = usePaymentMethods()
    const { emitErrorAlert, emitSuccessAlert } = useAlert()

    const form = useForm<PaymentMethodFormType>({
        defaultValues: { name: '' },
        resolver: zodResolver(paymentMethodSchema)
    })

    const submitHandler: SubmitHandler<PaymentMethodFormType> = async (values) => {
        await addPaymentMethod.run({
            onSuccess: () => emitSuccessAlert('Método de pago agregado con éxito'),
            onError: () => emitErrorAlert('No se pudo agregar el método de pago'),
            onFinish: () => form.reset()
        }, { active: true, name: values.name })
    }

    return {
        form,
        submitHandler,
    }
}
