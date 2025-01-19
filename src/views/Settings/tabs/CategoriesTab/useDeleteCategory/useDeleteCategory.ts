import { Category, SharedDataProp } from "@/definitions/data"
import { useToast } from "@/hooks/use-toast"
import { useCategoriesStore } from "@/stores/categoriesStore/categoriesStore"

export const useDeleteCategory = () => {
    const { toast } = useToast()

    const deleteCategory = useCategoriesStore(store => store.deleteCategory)

    const handleDeleteCategory = async (values: Category & SharedDataProp) => {
        await deleteCategory.run({
            onSuccess: () => {
                toast({
                    title: 'Eliminada con éxito',
                    description: `La categoría ${values.name} se ha eliminado`,
                    duration: 3000
                })
            },
            onError: (err) => {
                toast({
                    title: 'Error al eliminar',
                    description: `Error al eliminar la categoría ${values.name}: ${err}`,
                    variant: 'destructive'
                })
            }
        }, values)
    }

    return {
        handleDeleteCategory
    }
}