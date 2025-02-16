import { usePaymentMethods } from "../Providers/PaymentMethodsProvider";
import { PaymentMethodData } from "@/definitions/data";
import { useAlert } from "@/hooks/useAlert";

export const usePaymentMethodsList = () => {
    const { emitErrorAlert, emitSuccessAlert } = useAlert();
    const { deletePaymentMethod, handleOpenEditForm, updateStatus } =
    usePaymentMethods();

    const editAction = (row: PaymentMethodData) => {
        handleOpenEditForm(row);
    };

    const deleteAction = async (row: PaymentMethodData) => {
        await deletePaymentMethod.run(
            {
                onSuccess: () => emitSuccessAlert("Método de pago eliminado con éxito"),
                onError: () => emitErrorAlert("Error al eliminar método de pago"),
            },
            row,
        );
    };

    const handleActivePaymentMethod = async (id: number, status: boolean) => {
        const successAlertMsg = status
            ? "El método de pago se ha activado con éxito"
            : "El método de pago se ha desactivado con éxito";

        const errorAlertMsg = status
            ? "Error al activar el método de pago"
            : "Error al desactivar el método de pago";

        await updateStatus.run(
            {
                onSuccess: () => emitSuccessAlert(successAlertMsg),
                onError: () => emitErrorAlert(errorAlertMsg),
            },
            { id, status },
        );
    };

    return {
        editAction,
        deleteAction,
        handleActivePaymentMethod,
    };
};
