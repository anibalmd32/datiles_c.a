import { useProductsTable } from "../hooks/useProductsTable";
import { DataTable } from "@/components/shared/DataTable/DataTable";

export function ProductsTable() {
    const { cols, loadingData, menu, rows } = useProductsTable()

    return (
        <DataTable
            cols={cols}
            contextMenuItems={menu}
            loading={loadingData}
            rows={rows}
        />
    )
}
