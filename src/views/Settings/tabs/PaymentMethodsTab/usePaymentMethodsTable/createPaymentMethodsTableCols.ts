import { DataTableCol } from "@/components/shared/DataTable/DataTable";
import { PaymentMethod, SharedDataProp } from "@/definitions/data";

export function createPaymentMethodsTableCols(): DataTableCol<PaymentMethod & SharedDataProp>[] {
    return [
        {
            label: 'ID',
            name: 'id',
            position: 'center'
        },
        {
            label: 'Método de pago',
            name: 'name',
            position: 'center'
        },
        {
            label: 'Fecha de creación',
            name: 'created_at',
            position: 'center',
        },
        {
            label: 'Activo',
            name: 'active',
            position: 'center'
        }
    ]
}
