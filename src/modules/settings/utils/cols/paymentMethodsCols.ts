import { DataTableCol } from "@/components/shared/DataTable/DataTable";
import { PaymentMethodData } from "@/definitions/data";

export const paymentMethodsCols: DataTableCol<PaymentMethodData>[] = [
    {
        label: "ID",
        name: "id",
        position: "center",
    },
    {
        label: "Nombre",
        name: "name",
        position: "center",
    },
    {
        label: "Fecha de creación",
        name: "created_at",
        position: "center",
    },
    {
        label: "Activo",
        name: "active",
        position: "center",
    },
];
