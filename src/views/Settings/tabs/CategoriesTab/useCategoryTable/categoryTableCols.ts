import { DataTableCol } from "@/components/shared/DataTable/DataTable";
import { Category, SharedDataProp } from "@/definitions/data";

export const categoryTableCols: Array<DataTableCol<Category & SharedDataProp>> = [
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
