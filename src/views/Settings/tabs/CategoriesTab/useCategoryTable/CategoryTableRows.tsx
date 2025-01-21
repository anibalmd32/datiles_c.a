import { DataTableRow } from "@/components/shared/DataTable/DataTable";
import { Category, SharedDataProp } from "@/definitions/data";
import { formatEsFullDate } from "@/lib/utils";

export function generateCategoryTableRows(categories: Array<Category & SharedDataProp>): DataTableRow<Category & SharedDataProp>[] {
    return categories.map(category => {
        return {
            field: category,
            render: ({ colName, field }) => {
                if (colName === 'created_at') {
                    return <div className="text-center">{formatEsFullDate(field.created_at)}</div>
                } else if (colName !== 'updated_at') {
                    return <div className="text-center">{field[colName]}</div>
                }
            }
        }
    })
}
