import { useForm } from "react-hook-form";
import { ProductFormType, productSchema } from "../schemas/productSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAlert } from "@/hooks/useAlert";
import { useCategoryActions } from "@/modules/settings/stores/categoriesStore";
import { useEffect } from "react";
import { useProductsActions } from "../actions/productsActions";
import { useStockModeActions } from "@/modules/settings/actions/stockModeActions";

export const useProductsForm = () => {
    const form = useForm<ProductFormType>({
        defaultValues: {
            category_id: undefined,
            code: "",
            iva: "",
            name: "",
            purchase_bs: "0",
            purchase_usd: "",
            quantity: 0,
            measurement_unit_id: undefined,
            sale_usd: "0",
            unit_per_measurement: 0,
        },
        resolver: zodResolver(productSchema),
    });

    const { emitErrorAlert, emitSuccessAlert } = useAlert();

    const { addProducts } = useProductsActions();
    const { loadCategories } = useCategoryActions();
    const { load: loadStockMode } = useStockModeActions();

    const onSubmit = form.handleSubmit(async (values) => {
        await addProducts.run(
            {
                onSuccess: () =>
                    emitSuccessAlert("Producto agregado con éxito"),
                onError: () => emitErrorAlert("Error al agregar producto"),
                onFinish: () => form.reset(),
            },
            values,
        );
    });

    useEffect(() => {
        loadCategories.run();
        loadStockMode.run();
    }, []);

    return {
        form,
        onSubmit,
    };
};
