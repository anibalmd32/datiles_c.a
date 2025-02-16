import { useCategories } from "@/modules/settings/Providers/CategoriesProvider";
import { useAlert } from "@/hooks/useAlert";
import { CategoryData } from "@/definitions/data";

export const useCategoriesList = () => {
    const { deleteCategory, handleOpenEditForm } = useCategories();
    const { emitErrorAlert, emitSuccessAlert } = useAlert();

    const editAction = (row: CategoryData) => {
        handleOpenEditForm(row);
    };
    const deleteAction = async (row: CategoryData) => {
        await deleteCategory.run(
            {
                onSuccess: () => emitSuccessAlert("Categoría eliminada"),
                onError: () => emitErrorAlert("Error al eliminar categoría"),
            },
            row,
        );
    };

    return {
        editAction,
        deleteAction,
    };
};
