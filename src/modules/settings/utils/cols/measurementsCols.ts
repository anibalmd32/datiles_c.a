import { DataTableCol } from "@/components/shared/DataTable/DataTable";
import { MeasurementUnitData } from "@/definitions/data";

export const measurementsCols: DataTableCol<MeasurementUnitData>[] = [
    {
        label: "Nro",
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
];
