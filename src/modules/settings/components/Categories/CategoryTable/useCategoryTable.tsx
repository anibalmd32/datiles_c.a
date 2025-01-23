import { DataTableCol, DataTableRow, DataTableContextMenu } from "@/components/shared/DataTable/DataTable"
import { Category, SharedDataProp } from "@/definitions/data"
import { useCategoriesStore } from "@/stores/categoriesStore/categoriesStore"
import { formatEsFullDate } from "@/lib/utils";
import { useUpdateCategoryCtx } from "@/modules/settings/Providers/UpdateCategoryProvider";
import { useToast } from "@/hooks/use-toast";

export const useCategoryTable = () => {
    const categories = useCategoriesStore(store => store.categories)
    const loadCategories = useCategoriesStore(store => store.loadCategories)
    const deleteCategory = useCategoriesStore(store => store.deleteCategory)
    const updateCategoryContext = useUpdateCategoryCtx()

    const { toast } = useToast()

    const cols: DataTableCol<Category & SharedDataProp>[] = [
        {
            label: 'ID',
            name: 'id',
            position: 'center'
        },
        {
            label: 'Nombre',
            name: 'name',
            position: 'center'
        },
        {
            label: 'Fecha de creación',
            name: 'created_at',
            position: 'center'
        }
    ]

    const rows: DataTableRow<Category & SharedDataProp>[] = categories.data.map(c => (
        {
            field: c,
            render: ({ colName, field }) => {
                switch (colName) {
                    case 'id':
                        return <div className="text-center">{field.id}</div>
                    case "name":
                        return <div className="text-center">{field.name}</div>
                    case "created_at":
                        return <div className="text-center">{formatEsFullDate(field.created_at)}</div>
                    default:
                        break
                }
            }
        }
    ))

    const menu: DataTableContextMenu<Category & SharedDataProp>[] = [
        {
            label: 'Editar',
            action: async (row) => {
                updateCategoryContext.handleOpenForm(row)
            }
        },
        {
            label: 'Eliminar',
            action: async (row) => {
                await deleteCategory.run({
                    onSuccess: () => {
                        toast({ title: 'Categoría eliminada' })
                    },
                    onError: (err) => {
                        toast({ title: 'Error al eliminar categoría', description: err})
                    }
                }, { id: row.id })

                await loadCategories.run()
            }
        }
    ]

    return {
        cols,
        rows,
        menu,
        loadingData: loadCategories.isLoading
    }
}
