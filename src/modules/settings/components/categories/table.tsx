import { DataTable } from "@/components/shared/DataTable/DataTable";
import { useCategoriesTable } from "../../hooks/useCategoriesTable";

export function CategoriesDataTable() {
    const { cols, loadingData, menu, rows } = useCategoriesTable()

    return (
        <DataTable
            cols={cols}
            contextMenuItems={menu}
            loading={loadingData}
            rows={rows}
        />
    )
}
