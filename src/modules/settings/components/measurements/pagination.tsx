import { useMeasurements } from "../../Providers/MeasurementsProvider";
import { DataPagination } from "@/components/shared/DataTable/DataPagination";

export function MeasurementsPagination() {
    const {
        pagination: { currentPage, totalPages, setCurrentPage },
        loadMeasurements,
    } = useMeasurements();

    return (
        <DataPagination
            currentPage={currentPage}
            isLoadingData={loadMeasurements.loading}
            onPageChange={(page) => setCurrentPage(page)}
            totalPages={totalPages}
        />
    );
}
