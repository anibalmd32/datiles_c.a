import { productsCols } from "../utils/cols/productsCols";
import { productsRows } from "../utils/rows/productsRows";
import { productsMenu } from "../utils/menus/productsMenu";
import { useProducts } from "../providers/ProductsProviders";
import { useNavigate } from "react-router";

export const useProductsTable = () => {
    const { handleShowDeleteAlert, products, loadProducts } = useProducts()

    const navigate = useNavigate()

    const cols = productsCols
    const rows = productsRows(products)
    const menu = productsMenu({
        onDelete: handleShowDeleteAlert,
        onEdit: (item) => navigate(`/edit/${item.id}`)
    })

    return {
        cols,
        rows,
        menu,
        loadingData: loadProducts.loading
    }
}
