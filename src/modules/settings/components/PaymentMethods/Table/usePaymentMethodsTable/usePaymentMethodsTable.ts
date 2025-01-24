import { usePaymentMethodsStore } from "@/stores/paymentMethodsStore/paymentMethodStore";
import { paymentMethodCols } from "./paymentMethodsCols";
import { renderPaymentMethodsRows } from "./renderPaymentMethodsRows";
import { paymentMethodContextualMenu } from "./contextMenu";
import { useToast } from "@/hooks/use-toast";
import { useUpdatePaymentMethodContext } from "@/modules/settings/Providers/UpdatePaymentMethodProvider";
import { PaymentMethod, SharedDataProp } from "@/definitions/data";

type Data = PaymentMethod & SharedDataProp

export const usePaymentMethodsTable = () => {
    const { toast } = useToast()
    const { paymentMethods, changePaymentMethodStatus, loadPaymentMethods } = usePaymentMethodsStore()
    const { handleOpenForm } = useUpdatePaymentMethodContext()

    const handleChangePaymentMethodStatus = async (
        data: { id: number, status: boolean }
    ) => {
        await changePaymentMethodStatus.run({
            onSuccess: (res) => {
                if (res) {
                    const newStatusNumValue = res.status ? 1 : 0;

                    const changeStatusMessages = {
                        1: 'El método de pago se activo correctamente',
                        0: 'El método de pago se desactivo correctamente'
                    }

                    toast({ title: changeStatusMessages[newStatusNumValue] })
                }
            }
        }, data)
    }

    const handleEdit = async (row: Data) => {
        handleOpenForm(row)
    }
    const handleDelete = async () => {}

    return {
        cols: paymentMethodCols,
        rows: renderPaymentMethodsRows({
            data: paymentMethods,
            onChangeStatus: handleChangePaymentMethodStatus,
        }),
        menu: paymentMethodContextualMenu({
            onDelete: handleDelete,
            onEdit: handleEdit
        }),
        loadingData: loadPaymentMethods.isLoading
    }
}
