import { useProductsStore } from "@/stores/productsStore/useProductsStore";
import { createProductTableCols } from "./createProductTableCols";
import { createProductTableRows } from "./createProductTableRows";

export const useProductsTable = () => {
    const products = useProductsStore(store => store.products)

    const cols = createProductTableCols()
    const rows = createProductTableRows(products.data)

    return {
        cols,
        rows
    }
}
