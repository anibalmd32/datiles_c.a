import { SearchInput } from "@/components/shared/SearchInput/SearchInput";
import { useCategories } from "@/modules/settings/Providers/CategoriesProvider";

export function SearchCategoriesFilter() {
    const {
        filters: { search, setSearch },
    } = useCategories();
    return (
        <SearchInput
            onExternalChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar Categorías"
            value={search}
        />
    );
}
