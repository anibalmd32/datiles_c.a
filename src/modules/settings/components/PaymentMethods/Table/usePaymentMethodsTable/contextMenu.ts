import { DataTableContextMenu } from "@/components/shared/DataTable/DataTable";
import { PaymentMethod, SharedDataProp } from "@/definitions/data";

type Data = PaymentMethod & SharedDataProp
type OnEditCb = (data: Data) => Promise<void>
type OnDeleteCb = (data: Data) => Promise<void>
type ContextMenu = DataTableContextMenu<Data>[]

export const paymentMethodContextualMenu = ({
    onDelete,
    onEdit
}: {
    onEdit: OnEditCb,
    onDelete: OnDeleteCb,
}): ContextMenu => {
    return [
        {
            label: 'Editar',
            action: async (row) => await onEdit(row),
        },
        {
            label: 'Eliminar',
            action: async (row) => await onDelete(row)
        }
    ]
}
