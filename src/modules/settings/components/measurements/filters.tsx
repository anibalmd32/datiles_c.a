import { SearchInput } from "@/components/shared/SearchInput/SearchInput";
import { useMeasurements } from "@/modules/settings/Providers/MeasurementsProvider";

export function SearchMeasurementsFilter() {
    const { filters: { search, setSearch } } = useMeasurements()
    return (
        <SearchInput
            onExternalChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar unidades de medida"
            value={search}
        />
    )
}
