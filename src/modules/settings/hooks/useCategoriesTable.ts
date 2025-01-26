import { useCategories } from "@/modules/settings/Providers/CategoriesProvider";
import { categoriesMenu } from "../utils/menus/categoriesTableMenu";
import { categoriesCols } from "../utils/cols/categoriesCols";
import { categoryTableRows } from "../utils/rows/categoriesRows";
import { useAlert } from "@/hooks/useAlert";
import { CategoryData } from "@/definitions/data";

export const useCategoriesTable = () => {
    const { categories, deleteCategory, loadCategories, handleOpenEditForm } = useCategories()
    const { emitErrorAlert, emitSuccessAlert } = useAlert()

    const editAction = (row: CategoryData) => {
        handleOpenEditForm(row)
    }
    const deleteAction = async (row: CategoryData) => {
        await deleteCategory.run({
            onSuccess: () => emitSuccessAlert('Categoría eliminada'),
            onError: () => emitErrorAlert('Error al eliminar categoría')
        }, row)
    }

    const cols = categoriesCols;
    const rows = categoryTableRows(categories)
    const menu = categoriesMenu({ editAction, deleteAction })

    return {
        cols,
        rows,
        menu,
        loadingData: loadCategories.loading
    }
}