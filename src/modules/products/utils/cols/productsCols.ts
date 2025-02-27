import { DataTableCol } from "@/components/shared/DataTable/DataTable";
import { ProductData } from "@/definitions/data";

export const productsCols: DataTableCol<ProductData>[] = [
    {
        label: "Código",
        name: "code",
        position: "center",
    },
    {
        label: "Nombre",
        name: "name",
        position: "center",
    },
    {
        label: "Precio de compra",
        name: "purchase_usd",
        position: "center",
    },
    {
        label: "IVA",
        name: "iva",
        position: "center",
    },
    {
        label: "Precio de venta por unidad",
        name: "sale_usd",
        position: "center",
    },
];
