import { useCategories } from "../../Providers/CategoriesProvider";
import { DataPagination } from "@/components/shared/DataTable/DataPagination";

export function CategoriesPagination() {
    const {
        pagination: { currentPage, totalPages, setCurrentPage },
        loadCategories,
    } = useCategories();

    return (
        <DataPagination
            currentPage={currentPage}
            isLoadingData={loadCategories.loading}
            onPageChange={(page) => setCurrentPage(page)}
            totalPages={totalPages}
        />
    );
}
