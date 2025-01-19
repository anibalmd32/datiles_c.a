import { DataTableRow } from "@/components/shared/DataTable/DataTable";
import { Category, SharedDataProp } from "@/definitions/data";

export function generateCategoryTableRows(categories: Array<Category & SharedDataProp>): DataTableRow<Category & SharedDataProp>[] {
    return categories.map(category => {
        return {
            field: category,
            render: ({ colName, field }) => {
                if (colName === 'created_at') {
                    const created_at = new Date(field.created_at).toLocaleDateString()
                    return <div className="text-center">{created_at}</div>
                } else if (colName !== 'updated_at') {
                    return <div className="text-center">{field[colName]}</div>
                }
            }
        }
    })
}
