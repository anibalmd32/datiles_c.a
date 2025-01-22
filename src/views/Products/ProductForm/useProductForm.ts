import { useForm } from "react-hook-form";
import { z } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod";
import { useProductsStore } from "@/stores/productsStore/useProductsStore";
import { productFormSchema } from "./productFormSchema";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { SelectOptionItem } from "@/components/shared/SelectOption/SelectOption";
import { useCategoriesStore } from "@/stores/categoriesStore/categoriesStore";

export const useProductForm = () => {
    const [productId, setProductId] = useState<number | null>(null)
    const [categoriesOptions, setCategoriesOptions] = useState<SelectOptionItem[]>([
        { label: '', value: '0' }
    ])

    const loadCategories = useCategoriesStore(store => store.loadCategories)
    const categories = useCategoriesStore(store => store.categories)

    const form = useForm<z.infer<typeof productFormSchema>>({
        defaultValues: {
            category_id: null,
            code: '',
            name: '',
            purchase_bs: '',
            purchase_usd: '',
            sale_bs: '',
            sale_usd: '',
            quantity: 0,
            unit_id: null,
        },
        resolver: zodResolver(productFormSchema),
    })

    const { toast } = useToast()

    const addProduct = useProductsStore(store => store.addProduct);
    

    const handleEdit = (productId: number) => {
        setProductId(productId)
    }

    const handleSubmit = form.handleSubmit(async (values) => {
        if (productId) {
            // TODO: editar el producto
        } else {
            addProduct.run({
                onSuccess: () => {
                    toast({
                        title: 'Éxito al agregar producto',
                        description: `El producto ${values.name} se agrego correctamente`
                    })
                    form.reset()
                },
                onError: (err) => {
                    toast({
                        title: 'Error al agregar producto',
                        description: `Ocurrió un error al agregar el producto ${values.name}: ${err}`,
                        variant: 'destructive'
                    })
                }
            }, values)
        }
    })

    useEffect(() => {
        loadCategories.run()

        if (!loadCategories.isLoading && categories.data.length > 0) {
            setCategoriesOptions(
                categories.data.map(c => ({
                    label: c.name,
                    value: String(c.id)
                }))
            )
        }
        console.log(categories)
    }, [loadCategories])

    useEffect(() => {
        const nameValue = form.getValues('name')
        const categoryValue = categories.data.find(c => c.id === form.getValues('category_id'))

        if (nameValue && categoryValue) {
            const codeValue = `${categoryValue.name.slice(0, 2)}-${nameValue.slice(0, 2)}`
            form.setValue('code', codeValue)
        }
    }, [form.watch('category_id'), form.watch('name')])

    return {
        form,
        handleEdit,
        handleSubmit,
        categoriesOptions
    }
}
