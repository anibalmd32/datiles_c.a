import { DataTable } from "@/components/shared/DataTable/DataTable";
import { usePaymentMethodsTable } from "../../hooks/usePaymentMethodsTable";

export function PaymentMethodsDataTable() {
    const { cols, loadingData, menu, rows } = usePaymentMethodsTable()

    return (
        <DataTable
            cols={cols}
            contextMenuItems={menu}
            loading={loadingData}
            rows={rows}
        />
    )
}
