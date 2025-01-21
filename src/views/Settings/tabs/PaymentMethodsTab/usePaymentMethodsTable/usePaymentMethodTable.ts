import { usePaymentMethodsStore } from "@/stores/paymentMethodsStore/paymentMethodStore";
import { createPaymentMethodsTableCols } from "./createPaymentMethodsTableCols";
import { createPaymentMethodsTableRows } from "./createPaymentMethodsTableRows";
import { useToast } from "@/hooks/use-toast";

export const usePaymentMethodTable = () => {
    const { toast } = useToast()
    const paymentMethods = usePaymentMethodsStore(store => store.paymentMethods)
    const changePaymentMethodStatus = usePaymentMethodsStore(store => store.changePaymentMethodStatus)

    const handleChangeStatus = async (data: { id: number, status: boolean }) => {
        await changePaymentMethodStatus.run({
            onSuccess: (a) => {
                if (a) {
                    const newStatusNumValue = a.status ? 1 : 0;

                    const changeStatusMessages = {
                        1: 'El método de pago se activo correctamente',
                        0: 'El método de pago se desactivo correctamente'
                    }
    
                    toast({
                        title: 'Éxito al cambiar el estado',
                        description: changeStatusMessages[newStatusNumValue]
                    })
                }
            },
            onError: () => {},
        }, data)
    } 

    const cols = createPaymentMethodsTableCols();
    const rows = createPaymentMethodsTableRows(paymentMethods.data, handleChangeStatus)

    return {
        cols,
        rows,
        currentPage: paymentMethods.currentPage,
        totalPages: paymentMethods.totalPages,
    }
}
