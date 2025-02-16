import { DataTableContextMenu } from "@/components/shared/DataTable/DataTable";
import { CategoryData } from "@/definitions/data";

type MenuActions = {
  editAction: (row: CategoryData) => void;
  deleteAction: (row: CategoryData) => Promise<void>;
};

export const categoriesMenu = ({
    editAction,
    deleteAction,
}: MenuActions): DataTableContextMenu<CategoryData>[] => {
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
