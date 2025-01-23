import { useCategoriesStore } from "@/stores/categoriesStore/categoriesStore";

export const useCategoryPagination = () => {
    const { categories, setCurrentPage, loadCategories } = useCategoriesStore();

    const onChangePages = async (page: number) => {
        setCurrentPage(page)
        await loadCategories.run()
    }

    return {
        onChangePages,
        currentPage: categories.currentPage,
        totalPages: categories.totalPages
    }
}
