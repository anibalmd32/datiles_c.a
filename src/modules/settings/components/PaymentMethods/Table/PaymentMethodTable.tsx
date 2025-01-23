import { usePaymentMethodsTable } from "./usePaymentMethodsTable/usePaymentMethodsTable";
import { DataTable } from "@/components/shared/DataTable/DataTable";

export function PaymentMethodsTable() {
    const table = usePaymentMethodsTable();

    return (
        <div>
            <DataTable
                cols={table.cols}
                contextMenuItems={table.menu}
                rows={table.rows}
                loading={table.loadingData}
            />
        </div>
    )
}
