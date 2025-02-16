import { SearchInput } from "@/components/shared/SearchInput/SearchInput";
import { useStockModesStore } from "../../stores/stockModesStore";

export function SearchStockMode() {
    const filters = useStockModesStore(store => store.filters)

    return (
        <SearchInput
            onExternalChange={(e) => filters.setSearch(e.target.value)}
            placeholder="Buscar Modo"
            value={filters.search}
        />
    )
}
