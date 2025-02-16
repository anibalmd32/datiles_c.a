import { DataTableContextMenu } from "@/components/shared/DataTable/DataTable";
import { MeasurementUnitData } from "@/definitions/data";

type MenuActions = {
  editAction: (row: MeasurementUnitData) => void;
  deleteAction: (row: MeasurementUnitData) => Promise<void>;
};

export const measurementsMenu = ({
    editAction,
    deleteAction,
}: MenuActions): DataTableContextMenu<MeasurementUnitData>[] => {
    return [
        {
            action: async (row) => editAction(row),
            label: "Editar",
        },
        {
            action: async (row) => await deleteAction(row),
            label: "Eliminar",
        },
    ];
};
