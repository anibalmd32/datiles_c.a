import { DataTableContextMenu } from "@/components/shared/DataTable/DataTable";
import { ProductData } from "@/definitions/data";

type ProductsMenuProps = {
  onEdit: (product: ProductData) => void;
  onDelete: (product: ProductData) => void;
};

export const productsMenu = ({
    onEdit,
    onDelete,
}: ProductsMenuProps): DataTableContextMenu<ProductData>[] => [
    {
        action: async (product) => onEdit(product),
        label: "Editar",
    },
    {
        action: async (product) => onDelete(product),
        label: "Eliminar",
    },
];
