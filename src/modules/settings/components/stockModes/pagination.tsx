import { DataPagination } from "@/components/shared/DataTable/DataPagination";
import { useStockModesStore } from "../../stores/stockModesStore";
import { useStockModeActions } from "../../actions/stockModeActions";

export function StockModePagination() {
    const pagination = useStockModesStore(store => store.pagination)
    const { currentPage, setCurrentPage, totalPages } = pagination
    const { load } = useStockModeActions()

    return (
        <DataPagination
            currentPage={currentPage}
            isLoadingData={load.loading}
            onPageChange={(page) => setCurrentPage(page)}
            totalPages={totalPages}
        />
    )
}
