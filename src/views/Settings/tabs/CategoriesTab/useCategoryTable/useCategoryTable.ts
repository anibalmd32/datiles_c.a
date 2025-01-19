import { categoryTableCols } from "./categoryTableCols";
import { generateCategoryTableRows } from "./CategoryTableRows";
import { useCategoriesStore } from "@/stores/categoriesStore/categoriesStore";

export const useCategoryTable = () => {
    const { categories } = useCategoriesStore()
    
    return {
        categoryTableCols,
        categoryTableRows: generateCategoryTableRows(categories.data)
    }
}
