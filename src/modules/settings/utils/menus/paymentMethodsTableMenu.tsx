import { DataTableContextMenu } from "@/components/shared/DataTable/DataTable";
import { PaymentMethodData } from "@/definitions/data";

type MenuActions = {
    editAction: (row: PaymentMethodData) => void;
    deleteAction: (row: PaymentMethodData) => Promise<void>
}

export const paymentMethodMenu = ({
    editAction,
    deleteAction
}: MenuActions): DataTableContextMenu<PaymentMethodData>[] => {
    return [
        {
            action: async (row) => editAction(row),
            label: 'Editar'
        },
        {
            action: async (row) => await deleteAction(row),
            label: 'Eliminar'
        }
    ]
}
