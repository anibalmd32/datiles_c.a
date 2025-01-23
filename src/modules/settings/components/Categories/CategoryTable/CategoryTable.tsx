import { DataTable } from "@/components/shared/DataTable/DataTable";
import { useCategoryTable } from "./useCategoryTable";

export function CategoryTable() {
    const table = useCategoryTable()

    return (
        <DataTable
            cols={table.cols}
            contextMenuItems={table.menu}
            rows={table.rows}
            loading={table.loadingData}
        />
    )
}