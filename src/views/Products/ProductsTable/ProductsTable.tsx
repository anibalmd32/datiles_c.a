import { useProductsStore } from "@/stores/productsStore/useProductsStore";
import { useProductsTable } from "./useProductTable/useProductTables";
import { DataTable } from "@/components/shared/DataTable/DataTable";
import { useEffect } from "react";

export function ProductsTable() {
    const loadProducts = useProductsStore(store => store.loadProducts)
    const table = useProductsTable()

    useEffect(() => {
        loadProducts.run()
    }, [loadProducts])


    return (
        <div>
            <DataTable
                cols={table.cols}
                rows={table.rows}
                loading={loadProducts.isLoading}
                contextMenuItems={[
                    {
                        action: async () => {},
                        label: 'Editar'
                    },
                    {
                        action: async () => {},
                        label: 'Eliminar'
                    }
                ]}
            />
        </div>
    )
}