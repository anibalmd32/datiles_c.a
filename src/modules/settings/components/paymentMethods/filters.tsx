import { SearchInput } from "@/components/shared/SearchInput/SearchInput";
import { usePaymentMethods } from "@/modules/settings/Providers/PaymentMethodsProvider";

export function SearchPaymentMethodsFilter() {
    const {
        filters: { search, setSearch },
    } = usePaymentMethods();
    return (
        <SearchInput
            onExternalChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar método de pago"
            value={search}
        />
    );
}
