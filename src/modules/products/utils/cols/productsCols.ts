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
        label: "Precio de compra (USD)",
        name: "purchase_usd",
        position: "center",
    },
    {
        label: "Precio de compra (BS)",
        name: "purchase_bs",
        position: "center",
    },
    {
        label: "IVA",
        name: "iva",
        position: "center",
    },
    {
        label: "Precio de venta (USD)",
        name: "sale_usd",
        position: "center",
    },
];
