import { DataTableCol, DataTableRow, DataTableContextMenu } from "@/components/shared/DataTable/DataTable"
import { Category, SharedDataProp } from "@/definitions/data"
import { useCategoriesStore } from "@/stores/categoriesStore/categoriesStore"
import { formatEsFullDate } from "@/lib/utils";
import { useUpdateCategoryCtx } from "@/modules/settings/Providers/UpdateCategoryProvider";

export const useCategoryTable = () => {
    const categories = useCategoriesStore(store => store.categories)
    const loadCategories = useCategoriesStore(store => store.loadCategories)
    const updateCategoryContext = useUpdateCategoryCtx()

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
                console.log(row)
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
