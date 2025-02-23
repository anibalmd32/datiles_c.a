import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState,
} from "react";
import { AsyncAction } from "@/hooks/useAsyncExecute";
import { useProductsStore } from "../stores/productsStore";
import { useProductsActions } from "../actions/productsActions";
import { ProductData } from "@/definitions/data";
import { useAlert } from "@/hooks/useAlert";
import { FilterState } from "@/lib/filtersSlice";
import { PaginationState } from "@/lib/paginationSlice";
import { ProductFormType } from "../schemas/productSchema";

const ProductsContext = createContext(
    {} as {
        addProducts: AsyncAction<ProductFormType>;
        deleteProducts: AsyncAction<ProductData>;
        loadProducts: AsyncAction<ProductData>;
        updateProducts: AsyncAction<ProductData>;
        handleShowDeleteAlert: (item: ProductData) => void;
        onConfirmDelete: () => Promise<void>;
        showDeleteAlert: boolean;
        filters: FilterState;
        pagination: PaginationState;
        products: Array<ProductData>;
    },
);

export function ProductsProvider({ children }: { children: ReactNode }) {
    const [showDeleteAlert, setShowDeleteAlert] = useState(false);
    const [itemToDelete, setItemToDelete] = useState<ProductData | null>(null);

    const { addProducts, deleteProducts, loadProducts, updateProducts } =
        useProductsActions();

    const { filters, pagination, products } = useProductsStore();

    const { emitErrorAlert, emitSuccessAlert } = useAlert();

    const handleShowDeleteAlert = (item: ProductData) => {
        setItemToDelete(item);
        setShowDeleteAlert(true);
    };

    const onConfirmDelete = async () => {
        if (itemToDelete) {
            await deleteProducts.run(
                {
                    onSuccess: () => emitSuccessAlert("Producto eliminado."),
                    onError: () =>
                        emitErrorAlert("Error al eliminar el producto."),
                },
                itemToDelete,
            );
        }
    };

    useEffect(() => {
        loadProducts.run();
    }, []);

    return (
        <ProductsContext.Provider
            value={{
                addProducts,
                deleteProducts,
                loadProducts,
                updateProducts,
                handleShowDeleteAlert,
                onConfirmDelete,
                showDeleteAlert,
                filters,
                pagination,
                products,
            }}
        >
            {children}
        </ProductsContext.Provider>
    );
}

export const useProducts = () => useContext(ProductsContext);
