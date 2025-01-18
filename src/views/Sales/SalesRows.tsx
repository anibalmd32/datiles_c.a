import { InvoiceData } from "@/definitions/data";
import { DataTableRow } from "@/components/shared/DataTable/DataTable";

export function salesRows(invoicesData: InvoiceData[]): DataTableRow<InvoiceData>[] {
    return invoicesData.map(invoiceRow => {
        return {
            field: invoiceRow,
            render: ({ colName, field }) => (
                <div> {field[colName]} </div>
            ),
        }
    })
}
