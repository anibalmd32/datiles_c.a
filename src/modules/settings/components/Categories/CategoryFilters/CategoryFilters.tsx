import { useCategoryFilter } from "./useCategoryFilters";
import { SearchInput } from "@/components/shared/SearchInput/SearchInput";

export function CategoryFilters() {
    const filters = useCategoryFilter()

    return (
        <div className="w-full">
            <SearchInput
                value={filters.searchFilterValue}
                onExternalChange={(e) => filters.handleSearch(e.target.value)}
                placeholder="Buscar Categoría"
            />
        </div>
    )
}
