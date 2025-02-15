import { useForm } from "react-hook-form";
import { ProductFormType, productSchema } from "../schemas/productSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAlert } from "@/hooks/useAlert";
import { useCategoryActions } from '@/modules/settings/stores/categoriesStore';
import { useMeasurementsActions } from "@/modules/settings/actions/measurementActions";
import { useEffect } from "react";
import { useProductsActions } from "../stores/productsStore";

export const useProductsForm = () => {
    const form = useForm<ProductFormType>({
        defaultValues: {
            category_id: undefined,
            code: '',
            iva: '',
            name: '',
            purchase_bs: '',
            purchase_usd: '',
            quantity: 0,
            revenue_usd: '',
            sale_usd: '',
            unit_id: undefined,
        },
        resolver: zodResolver(productSchema)
    })

    const { emitErrorAlert, emitSuccessAlert } = useAlert()

    const { addProducts } = useProductsActions()
    const { loadCategories } = useCategoryActions()
    const { loadMeasurements } = useMeasurementsActions()

    const onSubmit = form.handleSubmit(async (values) => {
        await addProducts.run({
            onSuccess: () => emitSuccessAlert('Producto agregado con éxito'),
            onError: () => emitErrorAlert('Error al agregar producto'),
            onFinish: () => form.reset()
        }, values)
    })

    useEffect(() => {
        console.log(addProducts)
        loadCategories.run()
        loadMeasurements.run()
    }, [])

    return {
        form,
        onSubmit,
    }
}
