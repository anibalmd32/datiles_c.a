import { useCategoriesStore } from "@/stores/categoriesStore/categoriesStore"

export const useCategoryFilter = () => {
    const { loadCategories, filters } = useCategoriesStore()

    const handleSearch = async (value: string) => {
        filters.setSearchValue(value)
        await loadCategories.run()
    }

    return {
        searchFilterValue: filters.searchValue,
        handleSearch,
    }
}