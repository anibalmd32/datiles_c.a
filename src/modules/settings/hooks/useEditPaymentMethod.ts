import { usePaymentMethods } from "../Providers/PaymentMethodsProvider";
import { useAlert } from "@/hooks/useAlert";
import { SubmitHandler, useForm } from "react-hook-form";
import {
    paymentMethodSchema,
    PaymentMethodFormType,
} from "../schemas/paymentMethodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";

export const useEditPaymentMethod = () => {
    const { editDefaultValues, updatePaymentMethod, handleCloseEditForm } =
    usePaymentMethods();
    const { emitErrorAlert, emitSuccessAlert } = useAlert();

    const form = useForm<PaymentMethodFormType>({
        defaultValues: { name: "" },
        resolver: zodResolver(paymentMethodSchema),
    });

    const submitHandler: SubmitHandler<PaymentMethodFormType> = async (
        values,
    ) => {
        if (editDefaultValues) {
            await updatePaymentMethod.run(
                {
                    onSuccess: () =>
                        emitSuccessAlert("Método de pago actualizo con éxito"),
                    onError: () =>
                        emitErrorAlert("Error al actualizar el método de pago"),
                    onFinish: () => handleCloseEditForm(),
                },
                { ...editDefaultValues, name: values.name },
            );
        }
    };

    useEffect(() => {
        if (editDefaultValues) {
            form.reset({ name: editDefaultValues.name });
        }
    }, [editDefaultValues]);

    return {
        form,
        submitHandler,
    };
};
