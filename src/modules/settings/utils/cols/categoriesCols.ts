import { DataTableCol } from "@/components/shared/DataTable/DataTable";
import { CategoryData } from "@/definitions/data";

export const categoriesCols: DataTableCol<CategoryData>[] = [
    {
        label: 'Nro',
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
