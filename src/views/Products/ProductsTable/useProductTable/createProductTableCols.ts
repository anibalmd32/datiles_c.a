import { DataTableCol } from "@/components/shared/DataTable/DataTable";
import { Product, SharedDataProp } from "@/definitions/data";

export const createProductTableCols = (): Array<DataTableCol<Product & SharedDataProp>> => {
    return [
        {
            label: 'Código',
            name: 'code',
            position: 'center'
        },
        {
            label: 'Nombre',
            name: 'name',
            position: 'center'
        },
        {
            label: 'Precio de compra (dolares)',
            name: 'purchase_usd',
            position: 'center'
        },
        {
            label: 'Precio de compra (bolivares)',
            name: 'purchase_bs',
            position: 'center'
        },
        {
            label: 'Precio de venta (dolares)',
            name: 'sale_usd',
            position: 'center'
        },
        {
            label: 'Precio de venta (bolivares)',
            name: 'sale_bs',
            position: 'center'
        },
        {
            label: 'Categoría',
            name: 'category_id',
            position: 'center'
        },
        {
            label: 'Fecha',
            position: "center",
            name: "created_at"
        }
    ]
} 
