import { DataTableRow } from "@/components/shared/DataTable/DataTable";
import { Product, SharedDataProp } from "@/definitions/data";
import { formatEsFullDate } from "@/lib/utils";

export const createProductTableRows = (
    products: Array<Product & SharedDataProp & { category_name: string }>
): Array<DataTableRow<Product & SharedDataProp & { category_name: string }>> => {
    return products.map(p => {
        return {
            field: p,
            render: ({ colName, field }) => {
                if (colName === 'created_at') {
                    return <div className="text-center">{formatEsFullDate(field.created_at)}</div>
                } else {
                    return <div className="text-center">{String(field[colName])}</div>
                }
            }
        }
    })
}